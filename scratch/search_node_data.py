import json

with open("scratch/figma_node_data.json", "r", encoding="utf-8") as f:
    data = json.load(f)

nodes = data.get("nodes", {})
print("Nodes keys:", list(nodes.keys()))

for node_id, node_val in nodes.items():
    print(f"Node: {node_id}")
    doc = node_val.get("document", {})
    print(f"  Document Name: {doc.get('name')}, Type: {doc.get('type')}")
    # Print all text nodes under doc
    def print_texts(n):
        if n.get("type") == "TEXT":
            print(f"    - [{n.get('name')}] (ID: {n.get('id')}): \"{n.get('characters').strip()}\"")
        for c in n.get("children", []):
            print_texts(c)
    print_texts(doc)
