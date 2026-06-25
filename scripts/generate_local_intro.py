#!/usr/bin/env python3
"""
generate_local_intro.py
Generates the VIBECODING - INTRO slide based on local PLAN_*.md or FINAL_*.json files.
Optimized for low token consumption.

Usage:
  python3 scripts/generate_local_intro.py <lesson_code> [--update]
"""

import os
import sys
import json
import argparse
import re
from pathlib import Path

# Load dotenv
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

env_path = Path(__file__).parent.parent / ".env"
load_dotenv(dotenv_path=env_path)

def parse_lesson_slug(name: str):
    name_clean = name.strip().upper().replace(" ", "").replace("✅", "")
    match = re.search(r"M(\d+)C(\d+)L(\d+)", name_clean)
    if match:
        return int(match.group(1)), int(match.group(2)), int(match.group(3))
    return None

def resolve_lesson_paths(lesson_code: str):
    root_dir = Path(__file__).parent.parent
    parsed = parse_lesson_slug(lesson_code)
    if not parsed:
        raise ValueError(f"Could not parse lesson code: {lesson_code}")
    
    m, c, l = parsed
    lesson_key = f"M{m}C{c}L{l}"
    lesson_dir = root_dir / f"M{m}" / f"M{m}C{c}" / f"M{m}C{c}L{l}"
    
    plan_path = lesson_dir / f"PLAN_{lesson_key}.md"
    final_path = lesson_dir / f"FINAL_{lesson_key}.json"
    
    return plan_path, final_path, lesson_key

def extract_core_from_final(final_path: Path) -> str:
    print(f"Loading content from local FINAL JSON: {final_path.name}")
    with open(final_path, "r", encoding="utf-8") as f:
        data = json.load(f)
    
    slides = data.get("slides", [])
    core_slides = []
    
    for idx, s in enumerate(slides):
        template = s.get("template", "").upper()
        if "INTRO" in template or "COVER" in template or "FIN" in template:
            continue
        
        # Gather all text content inside the slide
        content = s.get("content", {})
        texts = []
        for key, val in content.items():
            if val and isinstance(val, str):
                val_clean = val.strip()
                if val_clean and not (val_clean.isdigit() and len(val_clean) <= 2):
                    texts.append(f"{key}: {val_clean}")
                    
        core_slides.append(f"Slide {idx + 1} ({s.get('template')}):\n  " + "\n  ".join(texts))
        
    return "\n\n".join(core_slides)

def extract_core_from_plan(plan_path: Path) -> str:
    print(f"Loading content from local PLAN markdown: {plan_path.name}")
    content = plan_path.read_text(encoding="utf-8")
    
    # Simple regex parsing to extract slides sections and exclude cover/intro/fin
    slides_raw = re.split(r"^##\s+Slide\s+", content, flags=re.MULTILINE)
    core_slides = []
    
    for section in slides_raw[1:]:
        lines = section.strip().split("\n")
        header = lines[0].strip()
        
        # Check if it's cover, intro, or finish
        h_upper = header.upper()
        if "INTRO" in h_upper or "COVER" in h_upper or "FIN" in h_upper:
            continue
            
        body = "\n".join(lines[1:]).strip()
        core_slides.append(f"Slide Plan: {header}\n{body}")
        
    return "\n\n".join(core_slides)

def main():
    parser = argparse.ArgumentParser(description="Generate/Correct Intro Slide locally")
    parser.add_argument("lesson", help="Lesson code (e.g. M1C4L3)")
    parser.add_argument("--update", action="store_true", help="Directly update the local FINAL file with the generated slide")
    args = parser.parse_args()
    
    try:
        plan_path, final_path, lesson_key = resolve_lesson_paths(args.lesson)
    except Exception as e:
        print(f"[Error] {e}")
        sys.exit(1)
        
    # Decide source
    source_context = ""
    if final_path.exists():
        source_context = extract_core_from_final(final_path)
    elif plan_path.exists():
        source_context = extract_core_from_plan(plan_path)
    else:
        print(f"[Error] No local PLAN or FINAL file found for lesson {args.lesson}.")
        sys.exit(1)
        
    # Load brand voice
    brand_voice_path = Path(__file__).parent.parent / "brand_voice.md"
    brand_voice = brand_voice_path.read_text(encoding="utf-8") if brand_voice_path.exists() else ""
    
    limits = {
        "Titre": {"min": 24, "max": 46},
        "Intro": {"min": 145, "max": 271},
        "Titre 1": {"min": 13, "max": 29},
        "Texte 1": {"min": 73, "max": 137},
        "Titre 2": {"min": 13, "max": 29},
        "Texte 2": {"min": 74, "max": 140},
        "Titre 3": {"min": 13, "max": 29},
        "Texte 3": {"min": 74, "max": 138}
    }
    
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
- "Titre": {limits['Titre']['min']} to {limits['Titre']['max']} characters.
- "Intro": {limits['Intro']['min']} to {limits['Intro']['max']} characters.
- "Titre 1": {limits['Titre 1']['min']} to {limits['Titre 1']['max']} characters.
- "Texte 1": {limits['Texte 1']['min']} to {limits['Texte 1']['max']} characters.
- "Titre 2": {limits['Titre 2']['min']} to {limits['Titre 2']['max']} characters.
- "Texte 2": {limits['Texte 2']['min']} to {limits['Texte 2']['max']} characters.
- "Titre 3": {limits['Titre 3']['min']} to {limits['Titre 3']['max']} characters.
- "Texte 3": {limits['Texte 3']['min']} to {limits['Texte 3']['max']} characters.

CRITICAL: Do NOT write your character counting thoughts, reasoning, drafts, or calculations in the output response. Perform all planning and counting internally. Your output response must contain ONLY the raw JSON block.

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

    prompt = f"""Generate the introduction slide JSON for the lesson "{lesson_key}" based on the following local content slides:

{source_context}

Please ensure that you strictly follow the character count limits and the writing guidelines. Count characters carefully!
"""

    # Call Claude
    api_key = os.environ.get("ANTHROPIC_API_KEY")
    if not api_key:
        print("[Error] ANTHROPIC_API_KEY environment variable is not defined.")
        sys.exit(1)

    client = anthropic.Anthropic(api_key=api_key)
    model = os.environ.get("CLAUDE_MODEL", "claude-3-5-sonnet-latest")

    print("Generating VIBECODING - INTRO slide...")
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
        start = raw_text.find("{")
        end = raw_text.rfind("}")
        if start == -1 or end == -1:
            print("[Error] Claude did not return a valid JSON block.")
            print(raw_text)
            sys.exit(1)
            
        clean_text = raw_text[start:end+1]
        intro_slide_json = json.loads(clean_text)
        
        # Self-correction loop
        attempts = 3
        all_passed = False
        for attempt in range(attempts):
            content_dict = intro_slide_json.get("content", {})
            fails = []
            for key, val in content_dict.items():
                length = len(val)
                limit = limits.get(key, {})
                if not (limit["min"] <= length <= limit["max"]):
                    fails.append(f"'{key}' has {length} characters (must be between {limit['min']} and {limit['max']}; content: \"{val}\")")
            
            if not fails:
                all_passed = True
                break
                
            print(f"Character count audit failed (attempt {attempt + 1}/{attempts}):")
            for f in fails:
                print(f"  - {f}")
            print("Requesting self-correction from Claude...")
            
            correction_prompt = f"""Your previous output failed the character limit checks for these fields:
{chr(10).join(fails)}

Previous output content:
{json.dumps(intro_slide_json, indent=2, ensure_ascii=False)}

Please modify only the failing fields to strictly respect their character limits while maintaining the pedagogical meaning and rules (starts with "Voyons/Zoom sur/etc." and is curiosity-inducing). Keep non-failing fields exactly the same.
Return ONLY the corrected JSON block."""
            
            response = client.messages.create(
                model=model,
                max_tokens=1000,
                system=system_instruction,
                messages=[
                    {"role": "user", "content": prompt},
                    {"role": "assistant", "content": raw_text},
                    {"role": "user", "content": correction_prompt}
                ],
                temperature=0.2
            )
            raw_text = response.content[0].text
            start = raw_text.find("{")
            end = raw_text.rfind("}")
            if start != -1 and end != -1:
                clean_text = raw_text[start:end+1]
                intro_slide_json = json.loads(clean_text)
            else:
                print("[Error] Failed to parse JSON during correction attempt.")
                
        # Final Verification
        print("\n" + "=" * 50)
        print("CHARACTER COUNT AUDIT:")
        print("=" * 50)
        content_dict = intro_slide_json.get("content", {})
        for key, val in content_dict.items():
            length = len(val)
            limit = limits.get(key, {})
            passed = limit["min"] <= length <= limit["max"]
            status = "PASS" if passed else "FAIL"
            print(f"- {key}: {length} chars (Target: {limit['min']}-{limit['max']}) -> {status}")

        print("\n" + "=" * 50)
        print("GENERATED INTRO SLIDE JSON:")
        print("=" * 50)
        print(json.dumps(intro_slide_json, indent=2, ensure_ascii=False))
        print("=" * 50)
        
        # If --update is specified and FINAL exists, rewrite it
        if args.update and final_path.exists():
            with open(final_path, "r", encoding="utf-8") as f:
                final_data = json.load(f)
            
            slides = final_data.get("slides", [])
            # Find and replace the VIBECODING - INTRO slide
            intro_found = False
            for idx, s in enumerate(slides):
                if s.get("template", "").upper() == "VIBECODING - INTRO":
                    # Update fields, retaining any existing keys like image_concept etc.
                    s["content"] = intro_slide_json["content"]
                    intro_found = True
                    print(f"Updated VIBECODING - INTRO slide in FINAL json (index {idx}).")
                    break
            
            # If not found, insert at index 1 (usually after cover)
            if not intro_found:
                new_slide = {
                    "template": "VIBECODING - INTRO",
                    "content": intro_slide_json["content"],
                    "image_concept": None,
                    "image_style": None,
                    "image_ratio": None
                }
                slides.insert(1, new_slide)
                print("Inserted VIBECODING - INTRO slide at index 1 in FINAL json.")
                
            final_data["slides"] = slides
            with open(final_path, "w", encoding="utf-8") as f:
                json.dump(final_data, f, indent=2, ensure_ascii=False)
            print("Successfully updated FINAL JSON file on disk!")
            
    except Exception as e:
        print(f"Error occurred: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()
