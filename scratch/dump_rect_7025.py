import json
from pathlib import Path

output_path = Path(__file__).parent.parent / "scratch" / "figma_output.json"
with open(output_path, "r", encoding="utf-8") as f:
    data = json.load(f)

node = data["nodes"][0]
children = node.get("children", [])

for child in children:
    if child.get("name") == "PROJET - BRIEF":
        for sub in child.get("children", []):
            if "Rectangle 7025" in sub.get("name", ""):
                print(json.dumps(sub, indent=2))
