import json

with open("scratch/figma_node_484_2875.json", "r", encoding="utf-8") as f:
    data = json.load(f)

doc = data.get("document", {})
canvas = doc.get("children", [])[1]
section = canvas.get("children", [])[0]

def print_texts(node, indent=""):
    if node.get("type") == "TEXT":
        print(f"{indent}- [{node.get('name')}] (ID: {node.get('id')}): \"{node.get('characters').strip()}\"")
    for c in node.get("children", []):
        print_texts(c, indent + "  ")

for child in section.get("children", []):
    if child.get("type") == "FRAME":
        print(f"\nFrame: name='{child.get('name')}', id='{child.get('id')}'")
        print_texts(child, "  ")
