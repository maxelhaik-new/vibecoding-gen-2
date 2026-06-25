#!/usr/bin/env python3
"""
import_lesson_from_figma.py
Fetches a lesson frame from Figma, parses its slides and layers, 
reconstructs the FINAL_<lesson>.json structure, and writes/overwrites it locally.

Usage:
  python3 scripts/import_lesson_from_figma.py <lesson_code>
"""

import sys
import json
import re
from pathlib import Path

# Reuse logic from scripts/extract_figma_lesson.py
sys.path.append(str(Path(__file__).parent))
try:
    from extract_figma_lesson import find_lesson_node_id, extract_figma_lesson, figma_api_request, extract_texts_from_node
except ImportError:
    # Redefine extract_lesson_slides if needed or fallback
    pass

FILE_KEY = "X29iTl53DAreMnpHDehsTx"

def parse_lesson_slug(name: str):
    name_clean = name.strip().upper().replace(" ", "").replace("✅", "")
    match = re.search(r"M(\d+)C(\d+)L(\d+)", name_clean)
    if match:
        return int(match.group(1)), int(match.group(2)), int(match.group(3))
    return None

def resolve_final_path(lesson_code: str) -> Path:
    root_dir = Path(__file__).parent.parent
    parsed = parse_lesson_slug(lesson_code)
    if not parsed:
        raise ValueError(f"Could not parse lesson code: {lesson_code}")
    
    m, c, l = parsed
    lesson_key = f"M{m}C{c}L{l}"
    lesson_dir = root_dir / f"M{m}" / f"M{m}C{c}" / f"M{m}C{c}L{l}"
    lesson_dir.mkdir(parents=True, exist_ok=True)
    return lesson_dir / f"FINAL_{lesson_key}.json"

def main():
    if len(sys.argv) < 2:
        print("Usage: python3 scripts/import_lesson_from_figma.py <lesson_code>")
        print("Example: python3 scripts/import_lesson_from_figma.py M1C5L5")
        sys.exit(1)
        
    lesson_code = sys.argv[1]
    
    # 1. Resolve path
    try:
        final_path = resolve_final_path(lesson_code)
    except Exception as e:
        print(f"[Error] {e}")
        sys.exit(1)
        
    # Import from extract_figma_lesson
    from extract_figma_lesson import find_lesson_node_id, extract_lesson_slides
    
    node_id, full_name = find_lesson_node_id(lesson_code)
    if not node_id:
        print(f"[Error] Lesson matching '{lesson_code}' not found in Figma.")
        sys.exit(1)
        
    print(f"Extracting slides from Figma node {node_id}...")
    try:
        raw_slides = extract_lesson_slides(node_id)
    except Exception as e:
        print(f"[Error] Failed to fetch slides: {e}")
        sys.exit(1)
        
    # 2. Reconstruct JSON
    slides_json = []
    
    # Load templates mapping to know templates rules if needed, 
    # but we can also just map whatever text layer names exist.
    for s in raw_slides:
        template = s["template"]
        # Clean slide name if figma has slide index prefixes like "6. VIBECODING - ..."
        template_clean = re.sub(r'^\d+\.\s*', '', template).strip()
        
        # Build content
        content = {}
        for text in s["texts"]:
            name = text["layer_name"]
            # Exclude purely static numbers or digits if they represent bullet counters
            val = text["text"].strip()
            if val.isdigit() and len(val) <= 2:
                continue
            # Store in content dictionary
            content[name] = val
            
        slide_obj = {
            "template": template_clean,
            "content": content,
            "image_concept": None,
            "image_style": None,
            "image_ratio": None
        }
        slides_json.append(slide_obj)
        
    lesson_data = {
        "lessonTitle": lesson_code.upper(),
        "slides": slides_json
    }
    
    # 3. Write locally
    with open(final_path, "w", encoding="utf-8") as f:
        json.dump(lesson_data, f, indent=2, ensure_ascii=False)
        
    print(f"\n[Success] Recreated JSON for {lesson_code.upper()} from Figma!")
    print(f"Saved locally to: {final_path.relative_to(Path(__file__).parent.parent)}")
    print(f"Total slides imported: {len(slides_json)}")

if __name__ == "__main__":
    main()
