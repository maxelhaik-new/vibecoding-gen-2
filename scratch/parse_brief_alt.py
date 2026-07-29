import requests
import json
import math
from pathlib import Path

FIGMA_TOKEN = "REMOVED_SECRET"
FILE_KEY    = "X29iTl53DAreMnpHDehsTx"
NODE_ID     = "1387:6047"

url = f"https://api.figma.com/v1/files/{FILE_KEY}/nodes?ids={NODE_ID}&depth=10"
headers = {"X-Figma-Token": FIGMA_TOKEN}

r = requests.get(url, headers=headers)
data = r.json()

node_data = data.get("nodes", {}).get("1387:6047", {}).get("document", {})
template_name = node_data.get("name", "VIBECODING - BRIEF ALT")

text_layers = []
image_layers = []

def calc_limits(text: str):
    length = len(text)
    if length < 30:
        min_l = max(5, math.floor(length * 0.7))
        max_l = math.ceil(length * 1.5)
    else:
        min_l = max(5, math.floor(length * 0.7))
        max_l = math.ceil(length * 1.3)
    return {"target_lenght": length, "min_lenght": min_l, "max_lenght": max_l}

def traverse(node):
    node_type = node.get("type")
    name = node.get("name", "")
    lower_name = name.lower()
    
    if node_type == "TEXT":
        chars = node.get("characters", "")
        if not (chars.strip().isdigit() and len(chars.strip()) <= 2):
            limits = calc_limits(chars)
            key_name = name if name and not name.startswith("FRAME") else chars[:30]
            text_layers.append({
                "key": key_name,
                "original_placeholder": chars,
                "target_lenght": limits["target_lenght"],
                "min_lenght": limits["min_lenght"],
                "max_lenght": limits["max_lenght"]
            })
    
    elif node_type in ["RECTANGLE", "FRAME", "VECTOR"]:
        bbox = node.get("absoluteBoundingBox", {})
        w = bbox.get("width", 0)
        h = bbox.get("height", 0)
        
        if (100 < w < 1000 and 100 < h < 1000):
            ratio_val = w / h if h > 0 else 1.0
            if abs(ratio_val - 0.75) < 0.2:
                ratio_str = "3:4"
            elif abs(ratio_val - 1.0) < 0.15:
                ratio_str = "1:1"
            elif abs(ratio_val - 1.33) < 0.15:
                ratio_str = "4:3"
            else:
                ratio_str = "3:4"
                
            if not any(img["key"] == "image" for img in image_layers):
                image_layers.append({
                    "key": "image",
                    "original_placeholder": name,
                    "ratio": ratio_str,
                    "width": w,
                    "height": h
                })
                
    if "children" in node:
        for child in node["children"]:
            traverse(child)

traverse(node_data)

new_entry = {
    "name": template_name,
    "status": "validé",
    "description": f"Template pour slide de type {template_name.lower()}.",
    "text_layers": text_layers,
    "image_layers": image_layers
}

templates_path = Path("/Users/maximeelhaik/Documents/VIBE CODING GENERATION/templates.json")
with open(templates_path, "r", encoding="utf-8") as f:
    templates_list = json.load(f)

existing_idx = None
for idx, t in enumerate(templates_list):
    if t.get("name") == template_name:
        existing_idx = idx
        break

if existing_idx is not None:
    templates_list[existing_idx] = new_entry
    print(f"Updated template {template_name} at index {existing_idx}")
else:
    templates_list.append(new_entry)
    print(f"Added template {template_name}")

with open(templates_path, "w", encoding="utf-8") as f:
    json.dump(templates_list, f, indent=2, ensure_ascii=False)

print("Saved updated templates.json successfully.")
