#!/usr/bin/env python3
"""
generate_intro_slide.py
Extracts existing slides from Figma for a given lesson, then calls the LLM (Claude)
to write the intro slide JSON (VIBECODING - INTRO) summarizing the main topics.

Usage:
  python3 scripts/generate_intro_slide.py <lesson_code>
"""

import os
import sys
import json
from pathlib import Path

# Try importing dependencies
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

# Load env variables
env_path = Path(__file__).parent.parent / ".env"
load_dotenv(dotenv_path=env_path)

# Reuse figma extraction logic from scripts/extract_figma_lesson.py
sys.path.append(str(Path(__file__).parent))
try:
    from extract_figma_lesson import find_lesson_node_id, extract_lesson_slides
except ImportError:
    print("[Error] Could not import figma extractor from extract_figma_lesson.py")
    sys.exit(1)

def load_brand_voice() -> str:
    path = Path(__file__).parent.parent / "brand_voice.md"
    if path.exists():
        return path.read_text(encoding="utf-8")
    return ""

def load_intro_limits() -> dict:
    # Hardcoded limits directly extracted from templates.json for speed and token economy
    return {
        "Titre": {"min_lenght": 24, "max_lenght": 46},
        "Intro": {"min_lenght": 145, "max_lenght": 271},
        "Titre 1": {"min_lenght": 13, "max_lenght": 29},
        "Texte 1": {"min_lenght": 73, "max_lenght": 137},
        "Titre 2": {"min_lenght": 13, "max_lenght": 29},
        "Texte 2": {"min_lenght": 74, "max_lenght": 140},
        "Titre 3": {"min_lenght": 13, "max_lenght": 29},
        "Texte 3": {"min_lenght": 74, "max_lenght": 138}
    }

def main():
    if len(sys.argv) < 2:
        print("Usage: python3 scripts/generate_intro_slide.py <lesson_code>")
        print("Example: python3 scripts/generate_intro_slide.py M1C2L2")
        sys.exit(1)

    lesson_code = sys.argv[1]

    # 1. Fetch from Figma
    node_id, full_name = find_lesson_node_id(lesson_code)
    if not node_id:
        print(f"Error: Lesson frame matching '{lesson_code}' not found on theory page.")
        sys.exit(1)

    print(f"Extracting slides for {full_name} from Figma...")
    try:
        slides = extract_lesson_slides(node_id)
    except Exception as e:
        print(f"Error extracting slides: {e}")
        sys.exit(1)

    if not slides:
        print("Error: No slides found in Figma for this lesson.")
        sys.exit(1)

    # Prepare slides text content representation for prompt
    figma_text_summary = []
    for s in slides:
        # Ignore cover, intro, and fin slides when understanding the core content of the lesson
        t_upper = s['template'].upper()
        if "INTRO" in t_upper or "COVER" in t_upper or "FIN" in t_upper:
            continue
        
        slide_rep = f"Slide {s['slide_index'] + 1} (Template: {s['template']}):\n"
        seen = set()
        for text in s["texts"]:
            content = text["text"].strip()
            if content in seen or (content.isdigit() and len(content) <= 2):
                continue
            seen.add(content)
            slide_rep += f"  - {text['layer_name']}: {content}\n"
        figma_text_summary.append(slide_rep)

    figma_slides_context = "\n".join(figma_text_summary)
    
    # 2. Call Claude
    api_key = os.environ.get("ANTHROPIC_API_KEY")
    if not api_key:
        print("[Error] ANTHROPIC_API_KEY environment variable is not defined.")
        sys.exit(1)

    client = anthropic.Anthropic(api_key=api_key)
    model = os.environ.get("CLAUDE_MODEL", "claude-3-5-sonnet-latest")

    brand_voice = load_brand_voice()
    limits = load_intro_limits()

    system_instruction = f"""You are a professional educational course content writer for Wemodo.
Your goal is to write a single introductory slide using the template "VIBECODING - INTRO" based on the content of the lesson's core body slides.

Here is the Brand Voice and editorial charter:
{brand_voice}

Specific Writing Rules for the Intro Slide:
1. The general "Intro" paragraph must provide an overview and conclude with an invitation to start (e.g., using "Voyons comment...", "Découvrons...", "Faisons le point...", "Faisons le tour...").
2. The description texts ("Texte 1", "Texte 2", "Texte 3") must strictly start with or use one of these specific pedagogical formulations:
   - "Voyons..."
   - "Zoom sur..."
   - "Focus sur..."
   - "Découvrons..."
   - "Apprenons à..."
   Do NOT use other styles of starting phrases. Make sure they flow naturally.
3. **Curiosity / Non-Spoil Rule**: The description texts ("Texte 1", "Texte 2", "Texte 3") must NOT name or list specific examples, individual names, or answers that will be taught in the subsequent slides. Instead, they should frame the topic generally to create curiosity or raise a question (e.g., do NOT write "Voyons trois projets réels — app médicale, curation de données, micro-SaaS", but write "Voyons trois projets réels lancés par des non-développeurs et qui se sont démarqués par leur originalité.").
4. Do NOT use numbers in lists or titles (Figma components handle numbers natively).
5. Use active infinitive verbs for action items.
6. Every field MUST strictly respect the character limits below (inclusive of whitespaces and punctuation):
- "Titre": {limits['Titre']['min_lenght']} to {limits['Titre']['max_lenght']} characters. (Example: "Ce qu'on va découvrir dans la leçon")
- "Intro": {limits['Intro']['min_lenght']} to {limits['Intro']['max_lenght']} characters. (2-3 sentences max)
- "Titre 1": {limits['Titre 1']['min_lenght']} to {limits['Titre 1']['max_lenght']} characters.
- "Texte 1": {limits['Texte 1']['min_lenght']} to {limits['Texte 1']['max_lenght']} characters.
- "Titre 2": {limits['Titre 2']['min_lenght']} to {limits['Titre 2']['max_lenght']} characters.
- "Texte 2": {limits['Texte 2']['min_lenght']} to {limits['Texte 2']['max_lenght']} characters.
- "Titre 3": {limits['Titre 3']['min_lenght']} to {limits['Titre 3']['max_lenght']} characters.
- "Texte 3": {limits['Texte 3']['min_lenght']} to {limits['Texte 3']['max_lenght']} characters.

CRITICAL: Do NOT write your character counting thoughts, reasoning, drafts, or calculations in the output response. Perform all planning and counting internally. Your output response must contain ONLY the raw JSON block. Do not wrap the JSON in markdown code blocks unless it is the only text returned.

Format of expected output JSON:
{{
  "template": "VIBECODING - INTRO",
  "content": {{
    "Titre": "...",
    "Intro": "...",
    "Titre 1": "...",
    "Texte 1": "...",
    "Titre 2": "...",
    "Texte 2": "...",
    "Titre 3": "...",
    "Texte 3": "..."
  }}
}}
"""

    prompt = f"""Generate the introduction slide JSON for the lesson "{full_name}" based on the following slides currently on Figma:

{figma_slides_context}
Please ensure that you strictly follow the character count limits and the writing guidelines. Count characters carefully!
"""

    print("Generating intro slide content via Claude...")
    try:
        response = client.messages.create(
            model=model,
            max_tokens=2000,
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

        # Parse and pretty print the JSON
        intro_slide_json = json.loads(clean_text)
        
        # Verify limits locally and display character count report
        print("\n" + "=" * 50)
        print("CHARACTER COUNT AUDIT:")
        print("=" * 50)
        content_dict = intro_slide_json.get("content", {})
        all_passed = True
        for key, val in content_dict.items():
            length = len(val)
            limit = limits.get(key, {})
            passed = limit.get("min_lenght", 0) <= length <= limit.get("max_lenght", 999)
            status = "PASS" if passed else "FAIL"
            print(f"- {key}: {length} chars (Target: {limit.get('min_lenght', 0)}-{limit.get('max_lenght', 999)}) -> {status}")
            if not passed:
                all_passed = False

        print("\n" + "=" * 50)
        print("GENERATED INTRO SLIDE JSON:")
        print("=" * 50)
        print(json.dumps(intro_slide_json, indent=2, ensure_ascii=False))
        print("=" * 50)
        
        if not all_passed:
            print("\n[WARNING] Some fields did not pass the character count audit. Please adjust manually if needed.")

    except Exception as e:
        print(f"Error calling Claude: {e}")
        if 'raw_text' in locals():
            print("Raw text returned by Claude was:")
            print(raw_text)
        sys.exit(1)

if __name__ == "__main__":
    main()
