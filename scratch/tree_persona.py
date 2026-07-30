import json
from pathlib import Path

output_path = Path(__file__).parent.parent / "scratch" / "figma_output.json"
with open(output_path, "r", encoding="utf-8") as f:
    data = json.load(f)

node = data["nodes"][0]
children = node.get("children", [])

persona_node = None
for child in children:
    if child.get("name") == "PROJET - PERSONA":
        persona_node = child
        break

def print_tree(node, indent=0):
    name = node.get("name", "")
    ntype = node.get("type", "")
    chars = f" (chars: '{node.get('characters')}')" if ntype == "TEXT" else ""
    print("  " * indent + f"- {name} [{ntype}]{chars}")
    for child in node.get("children", []):
        print_tree(child, indent + 1)

if persona_node:
    print("TREE FOR PROJET - PERSONA:")
    print_tree(persona_node)
else:
    print("PROJET - PERSONA not found")
