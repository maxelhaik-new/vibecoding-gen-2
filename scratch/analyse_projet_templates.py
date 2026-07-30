import json
from pathlib import Path

output_path = Path(__file__).parent.parent / "scratch" / "figma_output.json"
with open(output_path, "r", encoding="utf-8") as f:
    data = json.load(f)

node = data["nodes"][0]
children = node.get("children", [])

# Parse children and get their positions
slides = []
for child in children:
    name = child.get("name", "")
    if name.startswith("PROJET -"):
        css = child.get("cssStyles", {})
        left_str = css.get("left", "0px")
        left_val = float(left_str.replace("px", ""))
        slides.append((name, left_val, child))

# Sort by X coordinate (left)
slides.sort(key=lambda x: x[1])

print("Slides in order of X coordinate (left to right):")
for name, left_val, child in slides:
    print(f"- {name} (left: {left_val})")
