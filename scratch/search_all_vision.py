import json

with open("scratch/figma_node_484_2875.json", "r", encoding="utf-8") as f:
    data = json.load(f)

# Search recursively for "vision" or "intelligence" in the document and print parent frame details
doc = data.get("document", {})

def search_text_and_parents(node, parent_chain=[]):
    if node.get("type") == "TEXT":
        chars = node.get("characters", "")
        if "vision" in chars.lower() or "intelligence" in chars.lower():
            print(f"Found TEXT: ID={node.get('id')} Name='{node.get('name')}' chars='{chars.strip()}'")
            print("  Parent Chain:")
            for p in parent_chain:
                print(f"    - ID={p.get('id')} Name='{p.get('name')}' Type={p.get('type')}")
    
    for child in node.get("children", []):
        search_text_and_parents(child, parent_chain + [node])

search_text_and_parents(doc)
