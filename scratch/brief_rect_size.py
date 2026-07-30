import json
from pathlib import Path

output_path = Path(__file__).parent.parent / "scratch" / "figma_output.json"
with open(output_path, "r", encoding="utf-8") as f:
    data = json.load(f)

node = data["nodes"][0]
children = node.get("children", [])

brief_node = None
for child in children:
    if child.get("name") == "PROJET - BRIEF":
        brief_node = child
        break

if brief_node:
    for child in brief_node.get("children", []):
        if "Rectangle" in child.get("name", ""):
            print(f"Name: {child.get('name')}, BBox: {child.get('absoluteBoundingBox')}")
