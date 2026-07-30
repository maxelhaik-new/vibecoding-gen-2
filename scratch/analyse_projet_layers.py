import json
import re
from pathlib import Path

output_path = Path(__file__).parent.parent / "scratch" / "figma_output.json"
with open(output_path, "r", encoding="utf-8") as f:
    data = json.load(f)

node = data["nodes"][0]
children = node.get("children", [])

def classify_node(node):
    name = node.get("name", "").strip().lower()
    ntype = node.get("type", "")
    
    # Detect images
    has_image_fill = False
    if "fills" in node and isinstance(node["fills"], list):
        for fill in node["fills"]:
            if fill.get("type") == "IMAGE":
                has_image_fill = True
                break
    
    image_keywords = ["image", "photo", "visuel", "illustration", "mockup", "screenshot"]
    if has_image_fill or any(kw in name for kw in image_keywords):
        if ntype != "TEXT":
            return "image"
            
    # Detect pictos
    picto_keywords = ["mdi:", "iconify:", "picto", "icon", "svg", "logo"]
    if any(kw in name for kw in picto_keywords):
        return "picto"
        
    if ntype == "TEXT":
        chars = node.get("characters", "").strip()
        # skip pure numbers
        if chars.isdigit() or node.get("name", "").strip().isdigit():
            return None
        return "text"
        
    return None

def collect_layers(node, text_layers, picto_layers, image_layers, picto_counter, parent_block=None):
    name = node.get("name", "")
    match = re.search(r'(?:bloc|colonne|item|point|étape|step)\s*(\d+)', name, re.IGNORECASE)
    if match:
        parent_block = int(match.group(1))
        
    kind = classify_node(node)
    if kind == "text":
        text_layers.append({
            "name": node["name"],
            "placeholder": node.get("characters", "")
        })
    elif kind == "picto":
        idx = parent_block if parent_block is not None else picto_counter[0]
        if parent_block is None:
            picto_counter[0] += 1
        picto_layers.append({
            "key": f"Picto {idx}",
            "name": name
        })
    elif kind == "image":
        if not any(img["name"] == name for img in image_layers):
            image_layers.append({
                "name": name,
                "placeholder": name
            })
            
    for child in node.get("children", []):
        collect_layers(child, text_layers, picto_layers, image_layers, picto_counter, parent_block)

# Sort templates by left position
slides = []
for child in children:
    name = child.get("name", "")
    if name.startswith("PROJET -"):
        css = child.get("cssStyles", {})
        left_val = float(css.get("left", "0px").replace("px", ""))
        slides.append((name, left_val, child))
slides.sort(key=lambda x: x[1])

print("STRUCTURE DES TEMPLATES DE PROJET FIL ROUGE :\n")
for name, left_val, child in slides:
    text_layers = []
    picto_layers = []
    image_layers = []
    picto_counter = [1]
    
    collect_layers(child, text_layers, picto_layers, image_layers, picto_counter)
    
    print(f"=== Template: {name} ===")
    print("  Text Layers:")
    for t in text_layers:
        snippet = t['placeholder'].replace('\n', ' ')[:60]
        print(f"    - '{t['name']}': \"{snippet}...\"")
    if picto_layers:
        print("  Picto Layers:")
        for p in picto_layers:
            print(f"    - {p['key']} (layer: '{p['name']}')")
    if image_layers:
        print("  Image Layers:")
        for i in image_layers:
            print(f"    - Layer: '{i['name']}'")
    print()
