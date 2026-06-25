#!/usr/bin/env python3
"""
generate_local_objectif_l1.py
Generates or updates the M[x]C[y]L1 (Objective Lesson) for a chapter
based on the other existing lessons (L2, L3, etc.) in the same chapter directory.

Usage:
  python3 scripts/generate_local_objectif_l1.py <lesson_code_from_chapter>
  Example: python3 scripts/generate_local_objectif_l1.py M1C4L2
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

def resolve_chapter_paths(lesson_code: str):
    root_dir = Path(__file__).parent.parent
    parsed = parse_lesson_slug(lesson_code)
    if not parsed:
        raise ValueError(f"Could not parse lesson code: {lesson_code}")
    
    m, c, l = parsed
    chapter_dir = root_dir / f"M{m}" / f"M{m}C{c}"
    if not chapter_dir.exists():
        raise ValueError(f"Chapter directory does not exist: {chapter_dir}")
        
    l1_dir = chapter_dir / f"M{m}C{c}L1"
    l1_final_path = l1_dir / f"FINAL_M{m}C{c}L1.json"
    
    return chapter_dir, l1_final_path, m, c

def extract_chapter_context(chapter_dir: Path, current_m: int, current_c: int) -> str:
    print(f"Scanning chapter directory for content slides: {chapter_dir.name}")
    lessons_data = []
    
    # List all subdirectories matching M{m}C{c}L{l} where l > 1
    for item in sorted(chapter_dir.iterdir()):
        if item.is_dir() and re.match(rf"M{current_m}C{current_c}L(\d+)", item.name):
            parsed = parse_lesson_slug(item.name)
            if parsed and parsed[2] > 1:
                l_num = parsed[2]
                final_json = item / f"FINAL_M{current_m}C{current_c}L{l_num}.json"
                plan_md = item / f"PLAN_M{current_m}C{current_c}L{l_num}.md"
                
                if final_json.exists():
                    try:
                        with open(final_json, "r", encoding="utf-8") as f:
                            data = json.load(f)
                        slides_texts = []
                        for idx, s in enumerate(data.get("slides", [])):
                            template = s.get("template", "").upper()
                            if "COVER" in template or "INTRO" in template or "FIN" in template:
                                continue
                            content = s.get("content", {})
                            texts = [f"{k}: {v}" for k, v in content.items() if v and isinstance(v, str)]
                            slides_texts.append(f"  Slide {idx+1} ({s.get('template')}):\n    " + "\n    ".join(texts))
                        lessons_data.append(f"=== Lesson L{l_num} (JSON Source) ===\n" + "\n".join(slides_texts))
                    except Exception as e:
                        print(f"Warning: Failed to parse {final_json.name}: {e}")
                elif plan_md.exists():
                    try:
                        content = plan_md.read_text(encoding="utf-8")
                        lessons_data.append(f"=== Lesson L{l_num} (PLAN Markdown Source) ===\n{content}")
                    except Exception as e:
                        print(f"Warning: Failed to read {plan_md.name}: {e}")
                        
    return "\n\n".join(lessons_data)

def get_chapter_title_from_plan(current_m: int, current_c: int) -> str:
    root_dir = Path(__file__).parent.parent
    plan_path = root_dir / "plan-formation-vibe-coding.md"
    if not plan_path.exists():
        return "L'importance de la veille technologique"
        
    try:
        content = plan_path.read_text(encoding="utf-8")
        # Search for lines like "### Chapitre 4 — L'importance de la veille même pendant votre formation"
        pattern = rf"###\s+Chapitre\s+{current_c}\s+—\s+([^\n]+)"
        match = re.search(pattern, content, re.IGNORECASE)
        if match:
            return match.group(1).strip()
    except Exception as e:
        print(f"Warning reading plan file for chapter title: {e}")
        
    return "L'importance de la veille technologique"

def main():
    parser = argparse.ArgumentParser(description="Generate/Correct Chapter Objective L1 Lesson locally")
    parser.add_argument("lesson", help="Lesson code inside the target chapter (e.g. M1C4L2 or M1C4L3)")
    args = parser.parse_args()
    
    try:
        chapter_dir, l1_final_path, m, c = resolve_chapter_paths(args.lesson)
    except Exception as e:
        print(f"[Error] {e}")
        sys.exit(1)
        
    chapter_context = extract_chapter_context(chapter_dir, m, c)
    if not chapter_context:
        print(f"[Error] No other written lessons (L2, L3...) found in {chapter_dir}. Write them first.")
        sys.exit(1)
        
    chapter_title = get_chapter_title_from_plan(m, c)
    
    # Load brand voice
    brand_voice_path = Path(__file__).parent.parent / "brand_voice.md"
    brand_voice = brand_voice_path.read_text(encoding="utf-8") if brand_voice_path.exists() else ""
    
    limits = {
        "CoverTitre": {"min": 33, "max": 63}, # COVER CHAP Titre limits
        "Titre": {"min": 17, "max": 38},      # OBJECTIF CHAP Titre limits
        "Intro": {"min": 103, "max": 193},    # OBJECTIF CHAP Intro limits
        "Titre 1": {"min": 27, "max": 51},
        "Titre 2": {"min": 27, "max": 51},
        "Titre 3": {"min": 27, "max": 51},
        "Titre 4": {"min": 27, "max": 51},
        "Titre 5": {"min": 27, "max": 51},
        "Titre 6": {"min": 27, "max": 51}
    }
    
    system_instruction = f"""You are a professional educational course content writer for Wemodo.
Your goal is to write a single chapter objectives lesson JSON (L1) containing two slides: "VIBECODING - COVER CHAP" and "VIBECODING - OBJECTIF CHAP" based on the context of the other lessons in the chapter.

Here is the Brand Voice and editorial charter:
{brand_voice}

Specific Writing Rules for the L1 Lesson:
1. Cover Slide (VIBECODING - COVER CHAP):
   - The field "Titre" must be the main title of the chapter.
   - It MUST respect the character limits: {limits['CoverTitre']['min']} to {limits['CoverTitre']['max']} characters.
2. Objective Slide (VIBECODING - OBJECTIF CHAP):
   - "Titre": Usually "Les objectifs du chapitre". Must be between {limits['Titre']['min']} and {limits['Titre']['max']} characters.
   - "Intro": A summary introduction explaining why these objectives matter. Must be between {limits['Intro']['min']} and {limits['Intro']['max']} characters.
   - "Titre 1" to "Titre 6": 6 distinct, concrete educational objectives representing what the student will learn throughout the chapter's lessons. 
   - No numbers should be prefixed (Figma handles numbers).
   - Use active infinitive verbs (e.g., "Saisir...", "Identifier...", "Mettre en place...").
   - Each objective ("Titre 1" to "Titre 6") must strictly be between {limits['Titre 1']['min']} and {limits['Titre 1']['max']} characters.

CRITICAL: Do NOT write your character counting thoughts, reasoning, drafts, or calculations in the output response. Perform all planning and counting internally. Your output response must contain ONLY the raw JSON block.

Format of expected output JSON:
{{
  "CoverTitre": "Chapter Title here",
  "ObjectifContent": {{
    "Titre": "Les objectifs du chapitre",
    "Intro": "...",
    "Titre 1": "...",
    "Titre 2": "...",
    "Titre 3": "...",
    "Titre 4": "...",
    "Titre 5": "...",
    "Titre 6": "..."
  }}
}}
"""

    prompt = f"""Generate the L1 objective lesson JSON for Chapter M{m}C{c} based on the following other lessons content:
Suggested Chapter Title: "{chapter_title}"

{chapter_context}

Please ensure that you strictly follow the character count limits and the writing guidelines. Count characters carefully!
"""

    # Call Claude
    api_key = os.environ.get("ANTHROPIC_API_KEY")
    if not api_key:
        print("[Error] ANTHROPIC_API_KEY environment variable is not defined.")
        sys.exit(1)

    client = anthropic.Anthropic(api_key=api_key)
    model = os.environ.get("CLAUDE_MODEL", "claude-3-5-sonnet-latest")

    print(f"Generating VIBECODING - COVER CHAP & OBJECTIF CHAP slides for chapter M{m}C{c}...")
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
        raw_json = json.loads(clean_text)
        
        # Self-correction loop
        attempts = 3
        all_passed = False
        for attempt in range(attempts):
            fails = []
            
            cover_t = raw_json.get("CoverTitre", "")
            if not (limits["CoverTitre"]["min"] <= len(cover_t) <= limits["CoverTitre"]["max"]):
                fails.append(f"'CoverTitre' has {len(cover_t)} characters (must be between {limits['CoverTitre']['min']} and {limits['CoverTitre']['max']}; content: \"{cover_t}\")")
                
            obj_content = raw_json.get("ObjectifContent", {})
            for key, val in obj_content.items():
                length = len(val)
                limit = limits.get(key, {})
                if limit and not (limit["min"] <= length <= limit["max"]):
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
{json.dumps(raw_json, indent=2, ensure_ascii=False)}

Please modify only the failing fields to strictly respect their character limits while maintaining the pedagogical meaning and rules (Starts with infinitive verbs for objectives Titre 1-6). Keep non-failing fields exactly the same.
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
                raw_json = json.loads(clean_text)
            else:
                print("[Error] Failed to parse JSON during correction attempt.")
                
        # Audit logs printing
        print("\n" + "=" * 50)
        print("CHARACTER COUNT AUDIT:")
        print("=" * 50)
        
        cover_t = raw_json.get("CoverTitre", "")
        passed = limits["CoverTitre"]["min"] <= len(cover_t) <= limits["CoverTitre"]["max"]
        print(f"- CoverTitre: {len(cover_t)} chars (Target: {limits['CoverTitre']['min']}-{limits['CoverTitre']['max']}) -> {'PASS' if passed else 'FAIL'}")
        
        obj_content = raw_json.get("ObjectifContent", {})
        for key, val in obj_content.items():
            length = len(val)
            limit = limits.get(key, {})
            passed = limit["min"] <= length <= limit["max"]
            print(f"- {key}: {length} chars (Target: {limit['min']}-{limit['max']}) -> {'PASS' if passed else 'FAIL'}")
            
        # Structure the final output lesson json
        final_lesson_data = {
            "lessonTitle": f"M{m}C{c}L1",
            "slides": [
                {
                    "template": "VIBECODING - COVER CHAP",
                    "content": {
                        "Titre": raw_json.get("CoverTitre", "")
                    },
                    "image_concept": None,
                    "image_style": None,
                    "image_ratio": None
                },
                {
                    "template": "VIBECODING - OBJECTIF CHAP",
                    "content": raw_json.get("ObjectifContent", {}),
                    "image_concept": None,
                    "image_style": None,
                    "image_ratio": None
                }
            ]
        }
        
        # Write to disk
        l1_final_path.parent.mkdir(parents=True, exist_ok=True)
        with open(l1_final_path, "w", encoding="utf-8") as f:
            json.dump(final_lesson_data, f, indent=2, ensure_ascii=False)
            
        print("\n" + "=" * 50)
        print(f"[Success] Created/Updated lesson L1 at: {l1_final_path.relative_to(Path(__file__).parent.parent)}")
        print("=" * 50)
        
    except Exception as e:
        print(f"Error occurred: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()
