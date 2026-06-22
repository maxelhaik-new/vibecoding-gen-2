import os
import re
import shutil
from pathlib import Path

def parse_lesson_slug(name):
    # Matches patterns like m1c2l3 or M1C2L3
    match = re.match(r'm(\d+)c(\d+)l(\d+)', name, re.IGNORECASE)
    if match:
        m, c, l = match.groups()
        return int(m), int(c), int(l)
    if "test_lesson" in name.lower():
        return 0, 0, 0
    return None

def migrate():
    root = Path(__file__).parent.parent
    inputs_dir = root / "inputs"
    outputs_dir = root / "outputs"
    
    # We want to process all lesson files
    all_lessons = set()
    
    if inputs_dir.exists():
        for f in inputs_dir.glob("*.md"):
            slug = f.stem.lower()
            all_lessons.add(slug)
            
    if outputs_dir.exists():
        for f in outputs_dir.glob("*.json"):
            name = f.stem.lower()
            # remove suffix _draft or _structure
            name = name.replace("_draft", "").replace("_structure", "")
            all_lessons.add(name)
            
    print(f"Found lessons to migrate: {all_lessons}")
    
    for lesson in all_lessons:
        parsed = parse_lesson_slug(lesson)
        if not parsed:
            print(f"Skipping unknown lesson format: {lesson}")
            continue
            
        m, c, l = parsed
        target_dir = root / f"M{m}" / f"M{m}C{c}" / f"M{m}C{c}L{l}"
        target_dir.mkdir(parents=True, exist_ok=True)
        
        # Determine source names
        plan_src = inputs_dir / f"{lesson}.md"
        struct_src = outputs_dir / f"{lesson}_structure.json"
        draft_src = outputs_dir / f"{lesson}_draft.json"
        final_src = outputs_dir / f"{lesson}.json"
        
        # Determine destination names
        plan_dst = target_dir / f"PLAN_M{m}C{c}L{l}.md"
        struct_dst = target_dir / f"STRUCTURE_M{m}C{c}L{l}.json"
        draft_dst = target_dir / f"DRAFT_M{m}C{c}L{l}.json"
        final_dst = target_dir / f"FINAL_M{m}C{c}L{l}.json"
        
        # Move files if they exist
        if plan_src.exists():
            shutil.move(str(plan_src), str(plan_dst))
            print(f"Moved {plan_src.name} -> {plan_dst.relative_to(root)}")
        if struct_src.exists():
            shutil.move(str(struct_src), str(struct_dst))
            print(f"Moved {struct_src.name} -> {struct_dst.relative_to(root)}")
        if draft_src.exists():
            shutil.move(str(draft_src), str(draft_dst))
            print(f"Moved {draft_src.name} -> {draft_dst.relative_to(root)}")
        if final_src.exists():
            shutil.move(str(final_src), str(final_dst))
            print(f"Moved {final_src.name} -> {final_dst.relative_to(root)}")

    # Clean up empty inputs/outputs directories
    if inputs_dir.exists() and not any(inputs_dir.iterdir()):
        inputs_dir.rmdir()
        print("Removed empty inputs/ directory")
    if outputs_dir.exists() and not any(outputs_dir.iterdir()):
        outputs_dir.rmdir()
        print("Removed empty outputs/ directory")

if __name__ == "__main__":
    migrate()
