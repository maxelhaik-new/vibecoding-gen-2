#!/usr/bin/env python3
import os
import sys
import argparse
import json
import hashlib
import subprocess
import concurrent.futures
import time
import re
from pathlib import Path
from typing import List, Dict, Optional, Any, Union, Type
from pydantic import BaseModel, Field
from google.genai.errors import ServerError, ClientError

# ── 1. Load .env (root directory) ──
try:
    from dotenv import load_dotenv
except ImportError:
    print("[Error] python-dotenv is missing. Run: pip3 install python-dotenv")
    sys.exit(1)

env_path = Path(__file__).parent.parent / ".env"
if not env_path.exists():
    print(f"[Error] .env file not found at: {env_path}")
    sys.exit(1)
load_dotenv(dotenv_path=env_path)

# ── 2. Import google-genai ──
try:
    from google import genai
    from google.genai import types
except ImportError:
    print("[Error] google-genai SDK is missing. Run: pip3 install google-genai")
    sys.exit(1)

# ── 2b. Import anthropic (Claude) ──
try:
    import anthropic
except ImportError:
    anthropic = None

# ── 3. Define Pydantic Models for Structured Output ──
class SlideField(BaseModel):
    key: str = Field(description="The placeholder key (e.g., 'Titre', 'Intro', 'Titre 1', 'Texte 1', 'Picto 1')")
    value: str = Field(description="The text content or icon identifier")

class Slide(BaseModel):
    template: str = Field(description="The exact name of the Figma template from templates.json, e.g., 'VIBECODING - COVER'")
    content: List[SlideField] = Field(description="List of text fields and pictograms in the template.")
    image_concept: Optional[str] = Field(None, description="Detailed metaphorical concept in English for the image generator, if the template includes an image. Should be visual and descriptive.")
    image_style: Optional[str] = Field(None, description="The style to use for generating the image, e.g. 'woodcut', 'editorial', 'constructivist', 'chiaroscuro', 'grainy-editorial', 'pedagogical', 'offset-screenprint'.")
    image_ratio: Optional[str] = Field(None, description="The aspect ratio of the image, e.g., '1:1', '16:9', '2:3', '3:4', '4:3', etc. chosen based on the template requirements.")

class Lesson(BaseModel):
    lessonTitle: str = Field(description="The overall title of the lesson")
    slides: List[Slide]

# Model for Phase 1: DECOUPE (Structure-only)
class DecoupedSlide(BaseModel):
    title: str = Field(description="Title or main concept of the slide")
    template: str = Field(description="The exact name of the Figma template to use according to templates_charter.md rules")

class DecoupedLesson(BaseModel):
    lessonTitle: str = Field(description="The overall title of the lesson")
    slides: List[DecoupedSlide]

class TextCorrection(BaseModel):
    corrected_value: str = Field(description="The rewritten text strictly respecting the character count limits and brand voice")

# ── 4. Helper to load and hash reference files for cache management ──
def get_extracted_templates(template_names: List[str]) -> List[Dict]:
    root_dir = Path(__file__).parent.parent
    templates_path = root_dir / "templates.json"
    if not templates_path.exists():
        print(f"[Error] templates.json missing: {templates_path}")
        sys.exit(1)
    with open(templates_path, "r", encoding="utf-8") as f:
        all_templates = json.load(f)
    
    extracted = [t for t in all_templates if t.get("name") in template_names]
    return extracted

def load_reference_files(with_full_templates: bool = True, extracted_templates: Optional[List[Dict]] = None, only_charter: bool = False) -> tuple[str, str]:
    root_dir = Path(__file__).parent.parent
    files = {}
    if only_charter:
        files["templates_charter.md"] = root_dir / "templates_charter.md"
    else:
        files["brand_voice.md"] = root_dir / "brand_voice.md"
        files["icon_mapping.md"] = root_dir / "icon_mapping.md"
    
    merged_content = ""
    for name, path in files.items():
        if not path.exists():
            print(f"[Error] Reference file missing: {path}")
            sys.exit(1)
        with open(path, "r", encoding="utf-8") as f:
            merged_content += f"\n\n=== FILE: {name} ===\n" + f.read()
            
    if with_full_templates:
        templates_path = root_dir / "templates.json"
        if templates_path.exists():
            with open(templates_path, "r", encoding="utf-8") as f:
                merged_content += f"\n\n=== FILE: templates.json ===\n" + f.read()
    elif extracted_templates:
        merged_content += f"\n\n=== EXTRACTED TEMPLATES (Only the needed templates rules) ===\n" + json.dumps(extracted_templates, indent=2, ensure_ascii=False)
            
    content_hash = hashlib.sha256(merged_content.encode("utf-8")).hexdigest()
    return merged_content, content_hash

# ── 5. Cache management logic ──
CACHE_METADATA_FILE = Path(__file__).parent / ".gemini_cache_metadata.json"

def get_or_create_cache(client: genai.Client, model: str, force_new: bool = False, with_full_templates: bool = True, extracted_templates: Optional[List[Dict]] = None, only_charter: bool = False, system_instruction: str = "You are an expert pedagogical course generator for Wemodo and Vibe Coding.") -> str:
    if model.startswith("claude-"):
        return None
    merged_context, current_hash = load_reference_files(with_full_templates, extracted_templates, only_charter=only_charter)
    
    metadata = {}
    if CACHE_METADATA_FILE.exists() and not force_new:
        try:
            with open(CACHE_METADATA_FILE, "r") as f:
                metadata = json.load(f)
        except Exception:
            pass
            
    cache_name = metadata.get("cache_name")
    saved_hash = metadata.get("hash")
    saved_model = metadata.get("model")
    
    if cache_name and saved_hash == current_hash and saved_model == model:
        try:
            client.caches.get(name=cache_name)
            print(f"[Cache] Reusing existing prompt cache: {cache_name}")
            return cache_name
        except Exception as e:
            print(f"[Cache] Saved cache {cache_name} is no longer valid ({e}). Creating a new one...")
            
    print("[Cache] Creating a new prompt cache for static references...")
    
    try:
        cache = client.caches.create(
            model=model,
            config=types.CreateCachedContentConfig(
                contents=[merged_context],
                system_instruction=system_instruction,
                ttl="3600s",
                display_name="vibe_coding_bulk_generation_cache"
            )
        )
        
        with open(CACHE_METADATA_FILE, "w") as f:
            json.dump({"cache_name": cache.name, "hash": current_hash, "model": model}, f)
            
        print(f"[Cache] Prompt cache created successfully: {cache.name}")
        return cache.name
    except Exception as e:
        print(f"[Error] Failed to create prompt cache: {e}")
        print("[Warning] Proceeding without cache (may result in higher latency and costs).")
        return None

# ── 6. Image template checking ──
def template_needs_image(template_name: str) -> bool:
    img_templates = ["PHOTO", "IMAGE", "USE CASE", "FOCUS OUTIL", "PODIUM"]
    return any(p in template_name.upper() for p in img_templates)

def template_image_ratio(template_name: str) -> str:
    root_dir = Path(__file__).parent.parent
    templates_path = root_dir / "templates.json"
    if not templates_path.exists():
        return "1:1"
    try:
        with open(templates_path, "r", encoding="utf-8") as f:
            all_templates = json.load(f)
        for t in all_templates:
            if t.get("name") == template_name:
                img_layers = t.get("image_layers", [])
                if img_layers:
                    return img_layers[0].get("ratio", "1:1")
    except Exception:
        pass
    return "1:1"  # Default fallback

# ── 7. Core Phase Executions & Retry Logic ──
def call_model_with_retry(client: genai.Client, model: str, prompt: str, config: types.GenerateContentConfig, max_retries: int = 5) -> any:
    delay = 2.0
    for attempt in range(max_retries):
        try:
            return client.models.generate_content(model=model, contents=prompt, config=config)
        except (ServerError, ClientError) as e:
            status_code = getattr(e, "code", None) or getattr(e, "status_code", None)
            if status_code in [429, 500, 503] or "503" in str(e) or "429" in str(e):
                if attempt == max_retries - 1:
                    raise e
                print(f"     [Warning] API error {status_code or e}. Retrying in {delay}s...")
                time.sleep(delay)
                delay *= 2
            else:
                raise e
        except Exception as e:
            if attempt == max_retries - 1:
                raise e
            print(f"     [Warning] Unexpected error {e}. Retrying in {delay}s...")
            time.sleep(delay)
            delay *= 2

def get_anthropic_client():
    global anthropic
    if anthropic is None:
        print("[Error] anthropic SDK is missing. Run: pip3 install anthropic")
        sys.exit(1)
    api_key = os.environ.get("ANTHROPIC_API_KEY")
    if not api_key:
        print("[Error] ANTHROPIC_API_KEY environment variable is not defined.")
        sys.exit(1)
    return anthropic.Anthropic(api_key=api_key)

def clean_json_response(text: str) -> str:
    text = text.strip()
    
    # Try using regex to find content inside markdown json blocks
    match = re.search(r"```json\s*(.*?)\s*```", text, re.DOTALL)
    if match:
        text = match.group(1).strip()
    else:
        match_generic = re.search(r"```\s*(.*?)\s*```", text, re.DOTALL)
        if match_generic:
            text = match_generic.group(1).strip()
            
    # Extract substring starting at first '{'
    start_idx = text.find("{")
    if start_idx == -1:
        return text
    text = text[start_idx:].strip()
    
    # Try to parse directly
    try:
        json.loads(text)
        return text
    except Exception:
        pass
        
    # Attempt to fix truncated JSON by closing open brackets/braces in reverse order
    stack = []
    in_string = False
    escape = False
    
    for i, char in enumerate(text):
        if escape:
            escape = False
            continue
        if char == '\\':
            escape = True
            continue
        if char == '"':
            in_string = not in_string
            continue
        if not in_string:
            if char in '{[':
                stack.append(char)
            elif char in '}]':
                if stack:
                    top = stack[-1]
                    if (char == '}' and top == '{') or (char == ']' and top == '['):
                        stack.pop()
                        
    fixed_text = text
    if in_string:
        fixed_text += '"'
        
    while stack:
        top = stack.pop()
        if top == '{':
            fixed_text += '}'
        elif top == '[':
            fixed_text += ']'
            
    return fixed_text


def call_claude_model_with_retry(model: str, system_instruction: str, prompt: str, schema_class, max_retries: int = 1) -> str:
    client = get_anthropic_client()
    
    # Define a tool called submit_lesson with the dynamic Pydantic schema
    tools = [
        {
            "name": "submit_lesson",
            "description": "Submit the completed lesson content structure following the schema",
            "input_schema": schema_class.model_json_schema()
        }
    ]
    
    params = {
        "model": model,
        "max_tokens": 8192,
        "system": [
            {
                "type": "text",
                "text": system_instruction,
                "cache_control": {"type": "ephemeral"}
            }
        ],
        "messages": [
            {"role": "user", "content": prompt}
        ],
        "tools": tools,
        "tool_choice": {"type": "tool", "name": "submit_lesson"},
        "temperature": 0.2
    }
    
    delay = 2.0
    for attempt in range(max_retries):
        try:
            response = client.messages.create(**params)
            tool_use_blocks = [block for block in response.content if block.type == "tool_use"]
            if not tool_use_blocks:
                # Fallback to text parsing if no tool use was returned
                raw_text = response.content[0].text
                clean_text = clean_json_response(raw_text)
                json.loads(clean_text)
                return clean_text
                
            tool_input = tool_use_blocks[0].input
            # Validate input using Pydantic model
            schema_class.model_validate(tool_input)
            return json.dumps(tool_input, ensure_ascii=False)
            
        except Exception as e:
            try:
                print(f"     [Claude Debug] Exception: {e}")
                if 'response' in locals():
                    print(f"     [Claude Debug] Response content: {response.content}")
            except Exception as debug_err:
                print(f"     [Claude Debug Error] Failed to print debug info: {debug_err}")
                
            if "temperature" in str(e).lower():
                if "temperature" in params:
                    del params["temperature"]
                    try:
                        response = client.messages.create(**params)
                        tool_use_blocks = [block for block in response.content if block.type == "tool_use"]
                        if tool_use_blocks:
                            tool_input = tool_use_blocks[0].input
                            schema_class.model_validate(tool_input)
                            return json.dumps(tool_input, ensure_ascii=False)
                    except Exception as inner_e:
                        e = inner_e
            if attempt == max_retries - 1:
                raise e
            print(f"     [Claude Warning] API error: {e}. Retrying in {delay}s...")
            time.sleep(delay)
            delay *= 2



def run_phase_decoupe(client: genai.Client, model: str, outline: str, cache_name: Optional[str]) -> DecoupedLesson:
    prompt = (
        f"Analyze the following outline and structure it into slides by choosing only the template names.\n\n"
        f"Outline:\n{outline}\n\n"
        "Remember to select the correct template for each slide according to templates_charter.md.\n"
        "DO NOT write the slide contents at this step, only return the list of slides with their titles and templates chosen."
    )
    
    # Load templates from templates.json to validate
    root_dir = Path(__file__).parent.parent
    templates_path = root_dir / "templates.json"
    valid_names = set()
    if templates_path.exists():
        try:
            with open(templates_path, "r", encoding="utf-8") as f:
                all_templates = json.load(f)
            valid_names = {t.get("name") for t in all_templates if t.get("status") == "validé"}
        except Exception as e:
            print(f"  [Warning] Failed to load templates.json for validation: {e}")

    lesson = None
    if model.startswith("claude-"):
        merged_context, _ = load_reference_files(with_full_templates=False, only_charter=True)
        system_instruction = (
            "You are an expert pedagogical course structurer. Your objective is to map an outline into a logical sequence of visual slides using the provided templates, ensuring structural diversity.\n\n"
            f"Here are the reference styles and guidelines:\n{merged_context}"
        )
        json_text = call_claude_model_with_retry(
            model=model,
            system_instruction=system_instruction,
            prompt=prompt,
            schema_class=DecoupedLesson
        )
        lesson = DecoupedLesson.model_validate_json(json_text)
    else:
        config = types.GenerateContentConfig(
            response_mime_type="application/json",
            response_schema=DecoupedLesson,
            temperature=0.2,
        )
        if cache_name:
            config.cached_content = cache_name
        
        response = call_model_with_retry(client, model, prompt, config)
        lesson = DecoupedLesson.model_validate_json(response.text)

    # Validate and auto-correct templates
    correction_map = {
        "VIBECODING - 2 BLOC - EVOLUTION": "VIBECODING - PROCESS",
        "VIBECODING - 2 BLOCS - EVOLUTION": "VIBECODING - PROCESS",
        "VIBECODING - 3 BLOCS - LARGE TEXT": "VIBECODING - 3 COLONNES",
    }
    
    for slide in lesson.slides:
        # Check if template needs correction
        if slide.template in correction_map:
            old = slide.template
            slide.template = correction_map[slide.template]
            print(f"  [Auto-Correction] Mapped invalid template '{old}' to '{slide.template}'")
        
        # Verify it's a valid template
        if valid_names and slide.template not in valid_names:
            matched = False
            for val_name in valid_names:
                if val_name.lower().strip() == slide.template.lower().strip():
                    slide.template = val_name
                    matched = True
                    break
            if not matched:
                raise ValueError(f"Template '{slide.template}' is not a valid template. Valid options are: {', '.join(sorted(list(valid_names)))}")

    return lesson

def validate_and_correct_lesson_lengths(client: genai.Client, lesson: Lesson, extracted_templates: List[Dict], model: str) -> Lesson:
    print("\n  [Validation] Checking character counts for all slides...")
    
    # Index template definitions by name
    templates_by_name = {t["name"]: t for t in extracted_templates}
    
    # Load brand voice guidelines for correction context
    root_dir = Path(__file__).parent.parent
    brand_voice_path = root_dir / "brand_voice.md"
    brand_voice_content = ""
    if brand_voice_path.exists():
        try:
            with open(brand_voice_path, "r", encoding="utf-8") as f:
                brand_voice_content = f.read()
        except Exception as e:
            print(f"    [Warning] Could not load brand_voice.md for validation: {e}")

    any_corrections_made = False
    
    for slide_idx, slide in enumerate(lesson.slides):
        template_name = slide.template
        template_def = templates_by_name.get(template_name)
        if not template_def:
            continue
            
        # Get expected text layers from template definition
        text_layers = {layer["key"]: layer for layer in template_def.get("text_layers", [])}
        
        # Check text fields in slide content
        for field in slide.content:
            key = field.key
            value = field.value
            
            if key in text_layers:
                layer_def = text_layers[key]
                min_len = layer_def.get("min_lenght")
                max_len = layer_def.get("max_lenght")
                target_len = layer_def.get("target_lenght", min_len)
                
                if min_len is None or max_len is None:
                    continue
                    
                val_len = len(value) if value else 0
                
                # Check bounds
                if val_len < min_len or val_len > max_len:
                    print(f"    [Out of bounds] Slide {slide_idx+1} ({template_name}) -> Field '{key}': length {val_len} (limits: {min_len}-{max_len})")
                    print(f"      Current value: \"{value}\"")
                    
                    corrected_value = value
                    success = False
                    for attempt in range(1, 4):
                        print(f"      Attempt {attempt}/3 to correct '{key}'...")
                        
                        prompt = (
                            f"You are a professional pedagogical writer. The following text in our lesson draft is outside the allowed character limits for the template '{template_name}', field '{key}'.\n\n"
                            f"Field definition:\n"
                            f"- Target length: {target_len} characters\n"
                            f"- Strict minimum: {min_len} characters\n"
                            f"- Strict maximum: {max_len} characters\n\n"
                            f"Current text:\n"
                            f"\"{corrected_value}\" (Length: {len(corrected_value)} characters)\n\n"
                            f"Please rewrite this text so that its length is strictly between {min_len} and {max_len} characters (aim for around {target_len} characters).\n\n"
                            f"CRITICAL RULES:\n"
                            f"1. Follow the brand voice guidelines (active, direct, infinitives for lists, no 'tu' or 'vous', professional and concise).\n"
                            f"2. Keep the exact same pedagogical meaning and context.\n"
                            f"3. Do not include any quotes, markdown formatting, or introduction. Just output the corrected text."
                        )
                        
                        system_instruction = (
                            "You are a strict text shortener/optimizer. Your ONLY goal is to rewrite the input text to fit the requested length constraints while preserving the meaning and the brand voice."
                        )
                        if brand_voice_content:
                            system_instruction += f"\n\nHere is the brand voice reference:\n{brand_voice_content}"
                            
                        try:
                            if model.startswith("claude-"):
                                json_text = call_claude_model_with_retry(
                                    model=model,
                                    system_instruction=system_instruction,
                                    prompt=prompt,
                                    schema_class=TextCorrection,
                                    max_retries=2
                                )
                                corr_obj = TextCorrection.model_validate_json(json_text)
                                candidate = corr_obj.corrected_value.strip()
                            else:
                                config = types.GenerateContentConfig(
                                    response_mime_type="application/json",
                                    response_schema=TextCorrection,
                                    temperature=0.1,
                                    system_instruction=system_instruction
                                )
                                response = call_model_with_retry(client, model, prompt, config)
                                corr_obj = TextCorrection.model_validate_json(response.text)
                                candidate = corr_obj.corrected_value.strip()
                                
                            cand_len = len(candidate)
                            if min_len <= cand_len <= max_len:
                                print(f"      [Correction Success] New length: {cand_len} (limits: {min_len}-{max_len}). Value: \"{candidate}\"")
                                corrected_value = candidate
                                success = True
                                break
                            else:
                                print(f"      [Warning] Candidate length {cand_len} still outside limits. Retrying...")
                                corrected_value = candidate
                        except Exception as e:
                            print(f"      [Error] Exception during correction: {e}")
                            
                    if success:
                        field.value = corrected_value
                        any_corrections_made = True
                    else:
                        print(f"      [Warning] Failed to correct automatically. Keeping best effort: \"{corrected_value}\" ({len(corrected_value)} chars)")
                        field.value = corrected_value

    if any_corrections_made:
        print("  [Validation] Character counts successfully validated and corrected where needed.")
    else:
        print("  [Validation] All character counts are already within limits.")
        
    return lesson

def run_phase_ecris(client: genai.Client, model: str, outline: str, structure: DecoupedLesson, cache_name: Optional[str]) -> Lesson:
    prompt = (
        "ACT AS AN ELITE PEDAGOGICAL WRITER AND REWRITE THE DRAFT CONTENT FOR EACH SLIDE. DO NOT SIMPLY COPY OR MERELY COMPRESS THE OUTLINE. "
        "YOU MUST TRANSFIGURE THE TEXT TO CONFORM TO WEMODO'S BRAND VOICE AND CHARACTER LIMITS.\n\n"
        f"Original Outline (Raw material containing facts, data, and structures):\n{outline}\n\n"
        f"Slide Sequence Structure:\n{structure.model_dump_json(indent=2)}\n\n"
        "=== MANDATORY BRAND VOICE RULES ===\n"
        "1. NO DIRECT ADDRESS: Never use 'vous' or 'tu' (and their verbs) in the slides, EXCEPT after a right arrow (→) in tips/conseils which use the imperative second-person plural.\n"
        "2. CONCISION: Target short, punchy sentences. Maximum 15 words per sentence. Strip all corporate/academic fluff (e.g., 'Il est crucial de', 'Dans cette leçon nous allons...').\n"
        "3. CORE FACTS: Every slide must contain concrete data points (exact numbers, named companies/people, dates, sources). Never generic statements.\n"
        "4. NARRATIVE DRIVERS: Use short transitional questions like 'Le problème ?', 'Comment faire ?', 'Ça s'applique quand ?' to guide the flow.\n"
        "5. BULLET POINTS VS PARAGRAPHS: Do not write literary essays. If the template uses multiple blocks, start with lists, nouns, or active infinitives.\n"
        "6. THE BULLE RULE: A 'Bulle' or 'Texte Bulle' must NEVER be a summary. It must provide a fresh angle, a critical question, or an actionable takeaway.\n\n"
        "=== SPECIAL TEMPLATE RULES ===\n"
        "For 'VIBECODING - INTRO':\n"
        "  - The 'Intro' field must pose the context and end with an invitation to start using a movement verb (e.g., 'Voyons...', 'Découvrons...', 'Faisons le point...').\n"
        "  - The fields 'Texte 1', 'Texte 2', 'Texte 3' MUST strictly start with one of: 'Voyons...', 'Zoom sur...', 'Focus sur...', 'Découvrons...', 'Apprenons à...'.\n"
        "  - NON-SPOIL RULE: Never name specific tools or examples that will be revealed in the subsequent slides. Keep it intriguing and high-level.\n\n"
        "=== IMAGE RULES ===\n"
        "For any slide requiring an image (e.g., USE CASE, PHOTO, IMAGE, FOCUS OUTIL, PODIUM):\n"
        "  - You must generate a highly descriptive 'image_concept' in English (as a prompt for a visual metaphor, not a generic computer screen).\n"
        "  - You must select a valid 'image_style' (woodcut | editorial | constructivist | chiaroscuro | grainy-editorial | pedagogical | offset-screenprint).\n"
        "  - The 'Source' field must strictly respect: 'Source : [Sujet court] - Illustration générée par IA - Maxime Elhaik'.\n\n"
        "=== CHAR-LIMIT SAFETY ===\n"
        "LLMs underestimate character counts. To prevent overflow and validation failure, aim for the target_lenght (which is shorter than max_lenght). "
        "Strictly respect the min_lenght and max_lenght of each field.\n\n"
        "=== FEW-SHOT STYLE REFERENCE EXAMPLES ===\n\n"
        "Example 1: USE CASE (Fact-heavy, narrative pivot)\n"
        "{\n"
        "  \"Titre\": \"Le cas du New York Times\",\n"
        "  \"Intro\": \"NEW YORK TIMES VS OPENAI\",\n"
        "  \"Texte 1\": \"Le New York Times a poursuivi OpenAI et Microsoft en justice. OpenAI a entraîné ses modèles sur des millions d'articles du journal, sans autorisation ni licence. Le problème ? Maintenant, ChatGPT peut générer des résumés d'actualités complets sans renvoyer vers le NYT, détournant ainsi son audience et ses revenus.\",\n"
        "  \"Texte Bulle\": \"Le procès pose une question fondamentale : un modèle d'IA peut-il apprendre sur des contenus protégés pour ensuite les concurrencer directement ?\",\n"
        "  \"Source\": \"Source : Procès NYT - Illustration générée par IA - Maxime Elhaik\"\n"
        "}\n\n"
        "Example 2: VIBECODING - INTRO (Non-spoil, exact prefixes)\n"
        "{\n"
        "  \"Titre\": \"Le Vibe Coding en 2026\",\n"
        "  \"Intro\": \"La création de logiciel se démocratise sous l'impulsion des assistants génératifs. Voyons comment se positionner dans ce nouvel écosystème.\",\n"
        "  \"Titre 1\": \"L'essor des micro-outils\",\n"
        "  \"Texte 1\": \"Voyons comment des profils non techniques créent des applications ciblées en quelques heures.\",\n"
        "  \"Titre 2\": \"La barrière technique s'effondre\",\n"
        "  \"Texte 2\": \"Zoom sur la connexion simplifiée aux bases de données et aux API tierces.\",\n"
        "  \"Titre 3\": \"Les limites de l'autonomie\",\n"
        "  \"Texte 3\": \"Focus sur le rôle indispensable de l'architecte humain pour stabiliser le code.\"\n"
        "}\n\n"
        "Example 3: MULTI-BLOCS (Nominal, uppercase titles)\n"
        "{\n"
        "  \"Titre\": \"Limites graphiques de l'IA\",\n"
        "  \"Intro\": \"Les modèles de génération d'images butent encore sur plusieurs défis techniques.\",\n"
        "  \"Titre 1\": \"INTÉGRATION DU TEXTE\",\n"
        "  \"Texte 1\": \"Génération de lettres et typographies : on obtient souvent des résultats illisibles nécessitant retouche.\",\n"
        "  \"Titre 2\": \"COHÉRENCE DU STYLE\",\n"
        "  \"Texte 2\": \"Maintenir le même personnage sur plusieurs visuels reste difficile malgré l'usage de seeds.\"\n"
        "}"
    )
    template_names = [slide.template for slide in structure.slides]
    extracted = get_extracted_templates(template_names)
    
    if model.startswith("claude-"):
        # Load static context (no extracted templates) to ensure the system prompt is identical across lessons
        static_context, _ = load_reference_files(with_full_templates=False, extracted_templates=None)
        system_instruction = (
            "You are an expert pedagogical content writer. Your objective is to draft concise and precise slide contents that strictly adhere to the character limits and tone guidelines.\n\n"
            f"Here are the reference styles and guidelines:\n{static_context}"
        )
        
        # Inject the dynamic templates rules at the beginning of the user prompt
        templates_context = f"\n\n=== EXTRACTED TEMPLATES (Only the needed templates rules) ===\n" + json.dumps(extracted, indent=2, ensure_ascii=False)
        prompt_with_templates = (
            f"{prompt}\n\n"
            f"{templates_context}"
        )
        
        json_text = call_claude_model_with_retry(
            model=model,
            system_instruction=system_instruction,
            prompt=prompt_with_templates,
            schema_class=Lesson
        )
        return Lesson.model_validate_json(json_text)

    config = types.GenerateContentConfig(
        response_mime_type="application/json",
        response_schema=Lesson,
        temperature=0.2,
    )
    if cache_name:
        config.cached_content = cache_name
        
    response = call_model_with_retry(client, model, prompt, config)
    return Lesson.model_validate_json(response.text)

def get_content_as_dict(content_field) -> dict:
    if isinstance(content_field, list):
        return {item.get("key"): item.get("value") for item in content_field if isinstance(item, dict) and "key" in item}
    elif isinstance(content_field, dict):
        return content_field
    return {}

def enforce_lesson_structure(structure_data: DecoupedLesson, lesson_slug: str) -> DecoupedLesson:
    parsed = parse_lesson_slug(lesson_slug)
    is_classic = parsed is not None and parsed[2] > 1
    
    if is_classic:
        # 1. Enforce Cover at index 0
        cover_index = -1
        for idx, slide in enumerate(structure_data.slides):
            if slide.template == "VIBECODING - COVER":
                cover_index = idx
                break
        
        if cover_index != -1:
            if cover_index != 0:
                print(f"  [Pipeline Enforcer] Moving existing Cover slide to position 1.")
                cover_slide = structure_data.slides.pop(cover_index)
                structure_data.slides.insert(0, cover_slide)
        else:
            print(f"  [Pipeline Enforcer] Missing Cover slide. Injecting VIBECODING - COVER at position 1.")
            cover_slide = DecoupedSlide(
                title=lesson_slug.upper(),
                template="VIBECODING - COVER"
            )
            structure_data.slides.insert(0, cover_slide)
            
        # 2. Enforce Intro at index 1
        intro_index = -1
        for idx, slide in enumerate(structure_data.slides):
            if idx > 0 and slide.template == "VIBECODING - INTRO":
                intro_index = idx
                break
        
        if intro_index != -1:
            if intro_index != 1:
                print(f"  [Pipeline Enforcer] Moving existing Intro slide to position 2.")
                intro_slide = structure_data.slides.pop(intro_index)
                structure_data.slides.insert(1, intro_slide)
        else:
            print(f"  [Pipeline Enforcer] Classic lesson detected without introductory slide. Injecting VIBECODING - INTRO at position 2.")
            intro_slide = DecoupedSlide(
                title="Introduction au sujet",
                template="VIBECODING - INTRO"
            )
            structure_data.slides.insert(1, intro_slide)

        # 3. Enforce Fin at the end (index -1)
        fin_index = -1
        for idx, slide in enumerate(structure_data.slides):
            if slide.template == "VIBECODING - FIN":
                fin_index = idx
                break
        
        if fin_index != -1:
            if fin_index != len(structure_data.slides) - 1:
                print(f"  [Pipeline Enforcer] Moving existing Fin slide to the end.")
                fin_slide = structure_data.slides.pop(fin_index)
                structure_data.slides.append(fin_slide)
        else:
            print(f"  [Pipeline Enforcer] Classic lesson detected without Fin slide. Injecting VIBECODING - FIN at the end.")
            fin_slide = DecoupedSlide(
                title="En résumé",
                template="VIBECODING - FIN"
            )
            structure_data.slides.append(fin_slide)
            
    return structure_data

# ── 8. Process single lesson workflow ──
def generate_lesson_workflow(client: genai.Client, model_decoupe: str, model_ecris: str, plan_file: Path, final_file: Path, lesson_slug: str, phase: str, force_new_cache: bool = False, generate_image: bool = False, no_correct: bool = False):
    print(f"\n[Pipeline] Processing Lesson {lesson_slug.upper()} (Phase: {phase}, Models: Decoupe={model_decoupe}/Ecris={model_ecris}, Generate-Image: {generate_image}, No-Correct: {no_correct})")
    
    if not plan_file.exists() and (phase == "decoupe" or phase == "all"):
        print(f"[Error] Plan file not found at: {plan_file}")
        sys.exit(1)
        
    if plan_file.exists():
        with open(plan_file, "r", encoding="utf-8") as f:
            outline = f.read()
    else:
        outline = ""

    lesson_data = None

    # 1. DECOUPE Phase
    if phase == "decoupe" or phase == "all":
        system_inst_decoupe = "You are an expert pedagogical course structurer. Your objective is to map an outline into a logical sequence of visual slides using the provided templates, ensuring structural diversity."
        cache_decoupe = get_or_create_cache(client, model_decoupe, force_new=force_new_cache, with_full_templates=False, only_charter=True, system_instruction=system_inst_decoupe)
        structure_data = run_phase_decoupe(client, model_decoupe, outline, cache_decoupe)
        structure_data = enforce_lesson_structure(structure_data, lesson_slug)
        
        # Format as final JSON outline with empty content in-memory
        lesson_data = {
            "lessonTitle": lesson_slug.upper(),
            "slides": [
                {
                    "template": slide.template,
                    "title": slide.title
                }
                for slide in structure_data.slides
            ]
        }
        
        if phase == "decoupe":
            final_file.parent.mkdir(parents=True, exist_ok=True)
            with open(final_file, "w", encoding="utf-8") as f:
                json.dump(lesson_data, f, indent=2, ensure_ascii=False)
            print(f"  [Decoupe Success] Initial structure saved to: {final_file}")
            return

    # 2. ECRIS Phase
    if phase == "ecris" or phase == "all":
        if phase == "ecris":
            if not final_file.exists():
                print(f"[Error] Final file not found for writing phase at: {final_file}. Run 'decoupe' first.")
                sys.exit(1)
            with open(final_file, "r", encoding="utf-8") as f:
                lesson_data = json.load(f)
            
        # Reconstruct DecoupedLesson for the prompt from in-memory lesson_data
        slides_structure = []
        old_slides = lesson_data.get("slides", [])
        for s in old_slides:
            content_dict = get_content_as_dict(s.get("content"))
            # Robust fallback for slide titles
            title = (
                s.get("title") or 
                content_dict.get("Titre") or 
                content_dict.get("Titre 1") or 
                content_dict.get("Intro") or 
                content_dict.get("Titre Bulle") or 
                ""
            )
            slides_structure.append(DecoupedSlide(title=title, template=s.get("template", "")))
            
        structure_data = DecoupedLesson(
            lessonTitle=lesson_data.get("lessonTitle", ""),
            slides=slides_structure
        )
        structure_data = enforce_lesson_structure(structure_data, lesson_slug)
            
        # Extract templates dynamically
        template_names = [slide.template for slide in structure_data.slides]
        extracted = get_extracted_templates(template_names)
        print(f"  [Extraction] Extracted {len(extracted)} relevant templates from templates.json local-only.")
        
        system_inst_ecris = "You are an expert pedagogical content writer. Your objective is to draft concise and precise slide contents that strictly adhere to the character limits and tone guidelines."
        cache_ecris = get_or_create_cache(client, model_ecris, force_new=True, with_full_templates=False, extracted_templates=None, system_instruction=system_inst_ecris)
        
        lesson_obj = run_phase_ecris(client, model_ecris, outline, structure_data, cache_ecris)
        new_lesson_data = lesson_obj.model_dump()
        
        # Helper to merge old image metadata and paths back to protect them
        def safe_merge_slides(old_list, new_list):
            for i, new_s in enumerate(new_list):
                if i < len(old_list):
                    old_s = old_list[i]
                    # Preserve custom generator fields if present in old and not generated in new
                    if old_s.get("image_concept") and not new_s.get("image_concept"):
                        new_s["image_concept"] = old_s["image_concept"]
                    if old_s.get("image_style") and not new_s.get("image_style"):
                        new_s["image_style"] = old_s["image_style"]
                    if old_s.get("image_ratio") and not new_s.get("image_ratio"):
                        new_s["image_ratio"] = old_s["image_ratio"]
                    
                    # Convert content representations to dict for comparison
                    old_c = get_content_as_dict(old_s.get("content", {}))
                    new_c = new_s.get("content", {})
                    if isinstance(new_c, dict):
                        # Preserve "image" field or asset URL key
                        for k, v in old_c.items():
                            if k.lower() in ["image", "image_url"]:
                                new_c[k] = v
        
        # Normalize serialized content to dictionary format for immediate draft writing
        import copy
        draft_data = copy.deepcopy(new_lesson_data)
        for s in draft_data.get("slides", []):
            if "content" in s:
                s["content"] = get_content_as_dict(s["content"])
        
        # Merge existing metadata into draft
        safe_merge_slides(old_slides, draft_data.get("slides", []))
            
        # Write draft to file IMMEDIATELY so it can be loaded in Figma
        with open(final_file, "w", encoding="utf-8") as f:
            json.dump(draft_data, f, indent=2, ensure_ascii=False)
        print(f"  [Ecris Success] Draft contents written directly to: {final_file}")

        # Apply corrections if not disabled
        if not no_correct:
            lesson_obj = validate_and_correct_lesson_lengths(client, lesson_obj, extracted, model_ecris)
            corrected_data = lesson_obj.model_dump()
            
            # Normalize and write corrected data
            for s in corrected_data.get("slides", []):
                if "content" in s:
                    s["content"] = get_content_as_dict(s["content"])
            
            # Merge existing metadata into corrected final JSON
            safe_merge_slides(old_slides, corrected_data.get("slides", []))
            
            with open(final_file, "w", encoding="utf-8") as f:
                json.dump(corrected_data, f, indent=2, ensure_ascii=False)
            print(f"  [Ecris Success] Corrected contents updated in: {final_file}")
            
        if phase == "ecris":
            return

    # 3. GENERE Phase
    if phase == "genere" or phase == "all":
        if phase == "genere":
            if not final_file.exists():
                print(f"[Error] Final file not found for generating phase at: {final_file}. Run 'ecris' first.")
                sys.exit(1)
            with open(final_file, "r", encoding="utf-8") as f:
                lesson_data = json.load(f)
        
        # Normalize slides content from file to dict
        for s in lesson_data.get("slides", []):
            if "content" in s:
                s["content"] = get_content_as_dict(s["content"])
            
        slides = lesson_data.get("slides", [])
        total_slides = len(slides)
        
        if not generate_image:
            # Skip image generation and do NOT pop helper/temporary fields (so they can be generated later)
            final_file.parent.mkdir(parents=True, exist_ok=True)
            with open(final_file, "w", encoding="utf-8") as f:
                json.dump(lesson_data, f, indent=2, ensure_ascii=False)
            print(f"[Pipeline Phase GENERE Skipped] Image generation skipped. Metadata preserved in: {final_file}")
            return
            
        import re
        image_tasks = []
        for idx, slide in enumerate(slides, start=1):
            template = slide.get("template", "")
            concept = slide.get("image_concept")
            style = slide.get("image_style") or "chiaroscuro"
            ratio = slide.get("image_ratio") or template_image_ratio(template)
            
            if template_needs_image(template) or concept:
                if not concept:
                    concept = f"Metaphorical illustration representing {lesson_data.get('lessonTitle', 'concepts')}"
                
                # Make a clean slug of the concept (first 5 words, alphanumeric only)
                clean_concept = re.sub(r'[^a-zA-Z0-9\s]', '', concept).lower()
                concept_slug = "_".join(clean_concept.split()[:5])
                timestamp = int(time.time() * 1000)  # Use millisecond resolution to ensure uniqueness
                img_filename = f"vibe_{lesson_slug}_slide_{idx}_{style}_{concept_slug}_{timestamp}.png"
                image_tasks.append((idx, template, concept, style, ratio, img_filename, slide.get("content", {})))
                
        if image_tasks:
            print(f"  -> Generating {len(image_tasks)} images in parallel...")
            
            def run_image_gen(task):
                idx, template, concept, style, ratio, img_filename, content = task
                img_path = Path("assets") / img_filename
                img_path.parent.mkdir(parents=True, exist_ok=True)
                
                cmd = [
                    sys.executable,
                    str(Path(__file__).parent / "generate_nano_banana.py"),
                    "--concept", concept,
                    "--style", style,
                    "--bg", "none",
                    "--output", str(img_path)
                ]
                if ratio:
                    cmd.extend(["--aspect-ratio", ratio])
                
                try:
                    subprocess.run(cmd, capture_output=True, text=True, check=True)
                    content["image"] = f"http://localhost:8080/assets/{img_filename}"
                    concept_short = concept[:60].strip().rstrip(".")
                    content["Source"] = f"Source : {concept_short} - Illustration générée par IA - Maxime Elhaik"
                    print(f"     [Image Success] Slide {idx}/{total_slides} ({template}) saved at: {img_path}")
                except subprocess.CalledProcessError as e:
                    print(f"     [Image Error] Slide {idx}/{total_slides} failed: {e.stderr}")
 
            with concurrent.futures.ThreadPoolExecutor(max_workers=len(image_tasks)) as img_executor:
                img_executor.map(run_image_gen, image_tasks)

        # Clean up helper/temporary fields
        lesson_data["lessonTitle"] = lesson_slug.upper()
        for slide in slides:
            slide.pop("image_concept", None)
            slide.pop("image_style", None)
            slide.pop("image_ratio", None)
            slide.pop("title", None) # Clean up temporary helper title
            
        final_file.parent.mkdir(parents=True, exist_ok=True)
        with open(final_file, "w", encoding="utf-8") as f:
            json.dump(lesson_data, f, indent=2, ensure_ascii=False)
            
        print(f"[Pipeline Phase GENERE Success] Final lesson output saved to: {final_file}")

def parse_lesson_slug(name: str):
    name_clean = Path(name).stem
    name_clean = name_clean.replace("PLAN_", "").replace("STRUCTURE_", "").replace("DRAFT_", "").replace("FINAL_", "")
    match = re.match(r'm(\d+)c(\d+)l(\d+)', name_clean, re.IGNORECASE)
    if match:
        m, c, l = match.groups()
        return int(m), int(c), int(l)
    if "test_lesson" in name_clean.lower() or "m0c0l0" in name_clean.lower():
        return 0, 0, 0
    return None

def resolve_lesson_files(input_str: str) -> tuple[Path, Path, str]:
    root_dir = Path(__file__).parent.parent
    
    path_val = Path(input_str)
    if path_val.exists() and path_val.is_file():
        parsed = parse_lesson_slug(path_val.name)
        if parsed:
            m, c, l = parsed
            lesson_key = f"m{m}c{c}l{l}"
            lesson_dir = path_val.parent
            return (
                lesson_dir / f"PLAN_{lesson_key.upper()}.md",
                lesson_dir / f"FINAL_{lesson_key.upper()}.json",
                lesson_key
            )
            
    parsed = parse_lesson_slug(input_str)
    if parsed is not None:
        m, c, l = parsed
        lesson_key = f"m{m}c{c}l{l}"
        lesson_dir = root_dir / f"M{m}" / f"M{m}C{c}" / f"M{m}C{c}L{l}"
        lesson_dir.mkdir(parents=True, exist_ok=True)
        return (
            lesson_dir / f"PLAN_{lesson_key.upper()}.md",
            lesson_dir / f"FINAL_{lesson_key.upper()}.json",
            lesson_key
        )
        
    raise ValueError(f"Could not parse lesson identifier (e.g. M1C2L1) from: {input_str}")

# ── 9. Main logic ──
def main():
    parser = argparse.ArgumentParser(
        description="Bulk course outline processing and slide generator with dynamic template caching"
    )
    parser.add_argument("--input", default="all",
                        help="Lesson ID (e.g. m1c2l3), PLAN path, or 'all' to run recursively (default: all)")
    parser.add_argument("--force-new-cache", action="store_true",
                        help="Force creation of a new prompt cache")
    parser.add_argument("--model", default=None,
                        help="Gemini or Claude model to use (overrides .env settings if specified)")
    parser.add_argument("--phase", choices=["decoupe", "ecris", "genere", "all"], default="all",
                        help="The pipeline phase to execute: decoupe, ecris, genere, or all (default: all)")
    parser.add_argument("--image", action="store_true",
                        help="Generate slide images and clean up prompt metadata fields")
    parser.add_argument("--no-correct", action="store_true",
                        help="Disable automatic text length validation and correction")
                        
    args = parser.parse_args()
    
    # Resolve models based on provider (GEMINI or CLAUDE)
    gemini_default_model = os.environ.get("GEMINI_TEXT_MODEL", "gemini-pro-latest")
    claude_default_model = os.environ.get("CLAUDE_MODEL", "claude-sonnet-4-6")
    
    if args.model:
        model_decoupe = args.model
        model_ecris = args.model
    else:
        # Resolve decoupe model
        provider_decoupe = os.environ.get("PHASE_DECOUPE_PROVIDER", "GEMINI").upper()
        if provider_decoupe == "CLAUDE":
            model_decoupe = claude_default_model
        else:
            model_decoupe = gemini_default_model
            
        # Resolve ecris model
        provider_ecris = os.environ.get("PHASE_ECRIS_PROVIDER", "GEMINI").upper()
        if provider_ecris == "CLAUDE":
            model_ecris = claude_default_model
        else:
            model_ecris = gemini_default_model

    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        print("[Error] GEMINI_API_KEY environment variable is not defined.")
        sys.exit(1)
        
    client = genai.Client(api_key=api_key)
    
    root_dir = Path(__file__).parent.parent
    lessons_to_process = []
    
    if args.input.lower() == "all":
        # Find all PLAN_*.md files recursively
        for plan_path in root_dir.glob("**/PLAN_*.md"):
            try:
                resolved = resolve_lesson_files(str(plan_path))
                lessons_to_process.append(resolved)
            except Exception as e:
                print(f"[Warning] Skipping plan file {plan_path}: {e}")
    else:
        try:
            resolved = resolve_lesson_files(args.input)
            lessons_to_process.append(resolved)
        except Exception as e:
            print(f"[Error] Failed to resolve input {args.input}: {e}")
            sys.exit(1)
            
    if not lessons_to_process:
        print(f"[Warning] No lessons found to process for input: {args.input}")
        return
        
    print(f"[Pipeline] Found {len(lessons_to_process)} lessons to process. Phase: {args.phase}")
    
    for plan_file, final_file, lesson_slug in lessons_to_process:
        try:
            generate_lesson_workflow(
                client=client,
                model_decoupe=model_decoupe,
                model_ecris=model_ecris,
                plan_file=plan_file,
                final_file=final_file,
                lesson_slug=lesson_slug,
                phase=args.phase,
                force_new_cache=args.force_new_cache,
                generate_image=args.image,
                no_correct=args.no_correct
            )
        except Exception as e:
            print(f"[Error] Failed to generate lesson phase for {lesson_slug}: {e}")
            import traceback
            traceback.print_exc()
        
if __name__ == "__main__":
    main()
