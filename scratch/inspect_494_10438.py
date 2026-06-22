import json

with open("scratch/figma_node_494_10438.json", "r", encoding="utf-8") as f:
    data = json.load(f)

# The node data is nested under nodes -> 494:10438 -> document
node_id = "494:10438"
node_info = data.get("nodes", {}).get(node_id, {})
document = node_info.get("document", {})

print(f"Name: {document.get('name')}, Type: {document.get('type')}, ID: {document.get('id')}")

def print_texts(node, indent=""):
    if node.get("type") == "TEXT":
        print(f"{indent}- [{node.get('name')}] (ID: {node.get('id')}): \"{node.get('characters').strip()}\"")
    for c in node.get("children", []):
        print_texts(c, indent + "  ")

print_texts(document)
