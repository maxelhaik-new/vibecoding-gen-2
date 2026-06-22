import json

with open("scratch/figma_node_data.json", "r", encoding="utf-8") as f:
    data = json.load(f)

# The node data is nested under nodes -> node_id -> document
node_id = "460:1423"
node_info = data.get("nodes", {}).get(node_id, {})
document = node_info.get("document", {})

print(f"Slide Name: {document.get('name')}")
print(f"Type: {document.get('type')}")
print("-" * 50)

def extract_elements(node):
    elements = []
    
    # Extract text content and styling
    if node.get("type") == "TEXT":
        style = node.get("style", {})
        fills = node.get("fills", [])
        color_str = "Unknown"
        if fills and fills[0].get("type") == "SOLID":
            color = fills[0].get("color", {})
            r = int(color.get("r", 0) * 255)
            g = int(color.get("g", 0) * 255)
            b = int(color.get("b", 0) * 255)
            color_str = f"RGB({r}, {g}, {b})"
            
        elements.append({
            "type": "TEXT",
            "name": node.get("name"),
            "text": node.get("characters"),
            "fontFamily": style.get("fontFamily"),
            "fontSize": style.get("fontSize"),
            "fontWeight": style.get("fontWeight"),
            "color": color_str,
            "bounds": node.get("absoluteBoundingBox")
        })
    elif node.get("type") == "RECTANGLE" or node.get("type") == "IMAGE":
        fills = node.get("fills", [])
        fill_type = fills[0].get("type") if fills else "NONE"
        elements.append({
            "type": node.get("type"),
            "name": node.get("name"),
            "fillType": fill_type,
            "bounds": node.get("absoluteBoundingBox")
        })
        
    # Recurse children
    for child in node.get("children", []):
        elements.extend(extract_elements(child))
        
    return elements

all_elements = extract_elements(document)

print(f"Total elements found: {len(all_elements)}")
print("\n--- Text Elements ---")
for el in all_elements:
    if el["type"] == "TEXT":
        print(f"[{el['name']}] (Font: {el['fontFamily']} {el['fontSize']}px, Weight: {el['fontWeight']}, Color: {el['color']})")
        print(f"   Content: \"{el['text'].strip()}\"")
        print("-" * 30)

print("\n--- Visual Elements (Shapes/Images) ---")
for el in all_elements:
    if el["type"] != "TEXT":
        print(f"[{el['name']}] Type: {el['type']}, Fill: {el['fillType']}")
