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

def print_tree(node, indent=0):
    name = node.get("name", "")
    ntype = node.get("type", "")
    chars = f" (chars: '{node.get('characters')}')" if ntype == "TEXT" else ""
    print("  " * indent + f"- {name} [{ntype}]{chars}")
    for child in node.get("children", []):
        print_tree(child, indent + 1)

if brief_node:
    print("TREE FOR PROJET - BRIEF:")
    print_tree(brief_node)
else:
    print("PROJET - BRIEF not found")
