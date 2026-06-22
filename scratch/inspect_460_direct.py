import json

with open("scratch/figma_node_data.json", "r", encoding="utf-8") as f:
    data = json.load(f)

nodes = data.get("nodes", {})
node_id = "460:1423"
doc = nodes.get(node_id, {}).get("document", {})

print(f"Node Name: {doc.get('name')}, Type: {doc.get('type')}")
for c in doc.get("children", []):
    print(f"  Child: {c.get('name')} (ID: {c.get('id')}), type: {c.get('type')}")
    # print children if group or frame
    if c.get("type") in ["GROUP", "FRAME"]:
        for sc in c.get("children", []):
            print(f"    Subchild: {sc.get('name')} (ID: {sc.get('id')}), type: {sc.get('type')}")
