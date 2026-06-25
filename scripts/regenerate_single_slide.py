#!/usr/bin/env python3
import os
import sys
import json
import argparse
from pathlib import Path

try:
    from dotenv import load_dotenv
except ImportError:
    print("[Error] 'python-dotenv' missing. Run: pip3 install python-dotenv")
    sys.exit(1)

try:
    import anthropic
except ImportError:
    print("[Error] 'anthropic' missing. Run: pip3 install anthropic")
    sys.exit(1)

# Load environment variables
env_path = Path(__file__).parent.parent / ".env"
load_dotenv(dotenv_path=env_path)

def parse_lesson_slug(slug: str):
    import re
    match = re.search(r"m(\d+)c(\d+)l(\d+)", slug.lower())
    if match:
        return int(match.group(1)), int(match.group(2)), int(match.group(3))
    return None

def main():
    parser = argparse.ArgumentParser(description="Régénère une seule slide d'une leçon via Claude.")
    parser.add_argument("lesson", help="Slug de la leçon (ex: m1c5l5)")
    parser.add_argument("slide_index", type=int, help="Index de la slide à modifier (0-based)")
    parser.add_argument("--instruction", help="Consigne spécifique de réécriture", default="")
    args = parser.parse_args()

    # 1. Resolve lesson paths
    parsed = parse_lesson_slug(args.lesson)
    if not parsed:
        print(f"[Error] Impossible de parser le slug de leçon: {args.lesson}")
        sys.exit(1)
    
    m, c, l = parsed
    root_dir = Path(__file__).parent.parent
    final_file = root_dir / f"M{m}" / f"M{m}C{c}" / f"M{m}C{c}L{l}" / f"FINAL_M{m}C{c}L{l}.json"

    if not final_file.exists():
        print(f"[Error] Le fichier FINAL n'existe pas: {final_file}")
        sys.exit(1)

    # 2. Load lesson data
    with open(final_file, "r", encoding="utf-8") as f:
        lesson_data = json.load(f)

    slides = lesson_data.get("slides", [])
    if args.slide_index < 0 or args.slide_index >= len(slides):
        print(f"[Error] Index de slide invalide: {args.slide_index} (total: {len(slides)} slides)")
        sys.exit(1)

    slide = slides[args.slide_index]
    template_name = slide.get("template")

    # 3. Find template rules in templates.json
    templates_file = root_dir / "templates.json"
    template_rule = None
    if templates_file.exists():
        with open(templates_file, "r", encoding="utf-8") as f:
            all_templates = json.load(f)
            for t in all_templates:
                if t.get("name") == template_name:
                    template_rule = t
                    break

    if not template_rule:
        print(f"[Warning] Règles non trouvées pour le template {template_name} dans templates.json")

    # 4. Load brand voice
    brand_voice_file = root_dir / "brand_voice.md"
    brand_voice = brand_voice_file.read_text(encoding="utf-8") if brand_voice_file.exists() else ""

    # Build the prompt
    api_key = os.environ.get("ANTHROPIC_API_KEY")
    if not api_key:
        print("[Error] ANTHROPIC_API_KEY non configurée dans .env")
        sys.exit(1)

    client = anthropic.Anthropic(api_key=api_key)
    model = os.environ.get("CLAUDE_MODEL", "claude-3-5-sonnet-latest")

    # Provide context of the surrounding slides
    surrounding_context = []
    for idx, s in enumerate(slides):
        if idx == args.slide_index:
            surrounding_context.append(f"--- [SLIDE À RÉÉCRIRE (Index {idx})] Template: {s['template']} ---")
        else:
            surrounding_context.append(f"Slide {idx} (Template: {s['template']}): {s.get('content', {})}")

    context_str = "\n".join(surrounding_context)

    limits_str = ""
    if template_rule:
        limits_str += "Limites de caractères pour chaque champ (espaces inclus) :\n"
        for field in template_rule.get("text_layers", []):
            limits_str += f"- '{field['key']}': min {field.get('min_lenght', 0)} à max {field.get('max_lenght', 999)} caractères. (Placeholders: {field.get('original_placeholder')})\n"
        if template_rule.get("picto_layers"):
            limits_str += "Champs d'icônes attendus :\n"
            for layer in template_rule.get("picto_layers", []):
                limits_str += f"- '{layer['key']}' (Original: {layer.get('original_placeholder')})\n"

    system_instruction = f"""You are a professional pedagogical writer. Your goal is to rewrite a single slide inside a course lesson.
You must strictly respect the Brand Voice guidelines and characters limit constraints.

Here is the Brand Voice:
{brand_voice}

Mandatory Rules:
1. Keep the output strictly in JSON format.
2. Return ONLY the content dictionary representing the slide fields.
3. Keep the content punchy, conversationally fluent, and fact-heavy.
4. NO DIRECT ADDRESS (No "vous" or "tu" unless in a tip after a right arrow ->).
5. Respect the limits. Underestimate rather than overflow.
"""

    prompt = f"""We are rewriting Slide Index {args.slide_index} in the lesson.
Ecosystem context of the lesson:
{context_str}

{limits_str}

Template to use: "{template_name}"
Current contents of the slide:
{json.dumps(slide.get('content', {}), indent=2, ensure_ascii=False)}

User instruction for the rewrite:
"{args.instruction or 'Rewrite the slide contents to make them punchy and perfectly aligned with the brand voice.'}"

Please generate the new JSON content dictionary for this slide.
Ensure any expected icons or pictograms are preserved or filled using appropriate icons starting with "mdi:".
If the template expects 'image_concept' (like USE CASE, CONCEPT, or PHOTO templates), also include "image_concept", "image_style" (woodcut | editorial | constructivist | chiaroscuro | grainy-editorial | pedagogical | offset-screenprint), and "image_ratio" as root-level keys of your JSON alongside "content".

Return ONLY the raw JSON object. Do not explain your choices.
"""

    print(f"Calling Claude ({model}) to rewrite slide {args.slide_index}...")
    try:
        response = client.messages.create(
            model=model,
            max_tokens=1500,
            system=system_instruction,
            messages=[
                {"role": "user", "content": prompt}
            ],
            temperature=0.2
        )
        
        raw_text = response.content[0].text
        
        # Clean potential markdown wrappers and extract JSON block
        def clean_json_response(text: str) -> str:
            start = text.find("{")
            end = text.rfind("}")
            if start != -1 and end != -1:
                return text[start:end+1]
            return text
            
        clean_text = clean_json_response(raw_text)
        new_slide_data = json.loads(clean_text)

        # Merge or update the slide content
        new_content = new_slide_data.get("content", new_slide_data)
        
        # Keep non-content fields like image_concept if they are generated
        slide["content"] = new_content
        for key in ["image_concept", "image_style", "image_ratio"]:
            if key in new_slide_data:
                slide[key] = new_slide_data[key]

        # Write back to FINAL file
        with open(final_file, "w", encoding="utf-8") as f:
            json.dump(lesson_data, f, indent=2, ensure_ascii=False)

        print(f"[Success] Slide {args.slide_index} updated successfully in {final_file}!")
        print(json.dumps(slide, indent=2, ensure_ascii=False))

    except Exception as e:
        print(f"[Error] Failed to regenerate slide: {e}")
        if 'raw_text' in locals():
            print("Raw output from Claude:")
            print(raw_text)
        sys.exit(1)

if __name__ == "__main__":
    main()
