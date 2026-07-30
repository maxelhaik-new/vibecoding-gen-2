import json
import re
import math
from pathlib import Path

# Paths
templates_path = Path(__file__).parent.parent / "templates.json"
figma_output_path = Path(__file__).parent.parent / "scratch" / "figma_output.json"

# Load existing templates
with open(templates_path, "r", encoding="utf-8") as f:
    existing_templates = json.load(f)

# Convert to map to avoid duplicates
templates_map = {t["name"]: t for t in existing_templates}

# Load figma output
with open(figma_output_path, "r", encoding="utf-8") as f:
    figma_data = json.load(f)

node = figma_data["nodes"][0]
children = node.get("children", [])

# Helpers from import_figma_templates.py
def calc_limits(text):
    length = len(text)
    target = length
    if length < 30:
        min_l = max(5, math.floor(length * 0.7))
        max_l = math.ceil(length * 1.5)
    else:
        min_l = max(5, math.floor(length * 0.7))
        max_l = math.ceil(length * 1.3)
    return {"target_lenght": target, "min_lenght": min_l, "max_lenght": max_l}

def get_closest_ratio(width, height):
    ratios = {
        "1:1": 1.0,
        "16:9": 16.0 / 9.0,
        "9:16": 9.0 / 16.0,
        "4:3": 4.0 / 3.0,
        "3:4": 3.0 / 4.0,
        "3:2": 3.0 / 2.0,
        "2:3": 2.0 / 3.0,
    }
    target = width / height
    closest_name = "1:1"
    min_diff = float('inf')
    for name, val in ratios.items():
        diff = abs(target - val)
        if diff < min_diff:
            min_diff = diff
            closest_name = name
    return closest_name

def is_pure_number(s):
    return bool(re.fullmatch(r"\d+", s.strip()))

def normalize_name(name):
    return name.strip().lower()

def classify_node(node):
    name = normalize_name(node.get("name", ""))
    ntype = node.get("type", "")

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

    picto_keywords = ["mdi:", "iconify:", "picto", "icon", "svg", "logo"]
    if any(kw in name for kw in picto_keywords):
        return "picto"

    if ntype != "TEXT":
        return None

    chars = node.get("characters", "")
    if is_pure_number(node.get("name", "")) or is_pure_number(chars):
        return None

    return "text"

def collect_layers(node, text_layers, picto_layers, image_layers, picto_counter, parent_block=None):
    name = node.get("name", "")
    match = re.search(r'(?:bloc|colonne|item|point|étape|step)\s*(\d+)', name, re.IGNORECASE)
    if match:
        parent_block = int(match.group(1))

    kind = classify_node(node)
    if kind == "text":
        chars = node.get("characters", "")
        # Check if already added to avoid duplicate layer keys in text_layers
        if not any(t["key"] == node["name"] for t in text_layers):
            entry = {"key": node["name"], "original_placeholder": chars}
            entry.update(calc_limits(chars))
            text_layers.append(entry)
    elif kind == "picto":
        if parent_block is not None:
            idx = parent_block
        else:
            idx = picto_counter[0]
            picto_counter[0] += 1
        if not any(p["key"] == f"Picto {idx}" for p in picto_layers):
            picto_layers.append({
                "key": f"Picto {idx}",
                "original_placeholder": node.get("name", f"Picto {idx}")
            })
    elif kind == "image":
        if not any(img["key"] == "image" for img in image_layers):
            bbox = node.get("absoluteBoundingBox") or {}
            width = bbox.get("width")
            height = bbox.get("height")
            ratio = "1:1"
            if width and height:
                ratio = get_closest_ratio(width, height)
            
            image_entry = {
                "key": "image",
                "original_placeholder": node.get("name", "image"),
                "ratio": ratio
            }
            if width and height:
                image_entry["width"] = round(width, 1)
                image_entry["height"] = round(height, 1)
            image_layers.append(image_entry)

    for child in node.get("children", []):
        collect_layers(child, text_layers, picto_layers, image_layers, picto_counter, parent_block)

# Process all templates starting with "PROJET -"
added_count = 0
updated_count = 0

for child in children:
    name = child.get("name", "")
    if name.startswith("PROJET -"):
        text_layers = []
        picto_layers = []
        image_layers = []
        picto_counter = [1]
        
        collect_layers(child, text_layers, picto_layers, image_layers, picto_counter)
        
        new_entry = {
            "name": name,
            "status": "validé",
            "description": f"Template spécial de projet fil rouge pour slide de type {name.lower().replace('projet - ', '')}.",
            "text_layers": text_layers,
        }
        if picto_layers:
            new_entry["picto_layers"] = picto_layers
        if image_layers:
            new_entry["image_layers"] = image_layers
            
        if name in templates_map:
            updated_count += 1
        else:
            added_count += 1
            
        templates_map[name] = new_entry

# Convert map back to list (preserving the original order and putting new templates at the end)
# or keeping a consistent sorting where "PROJET -" are kept at the end
final_list = []
# First standard templates
for t in existing_templates:
    if not t["name"].startswith("PROJET -"):
        final_list.append(templates_map.get(t["name"], t))

# Then project templates
for name, entry in templates_map.items():
    if name.startswith("PROJET -"):
        final_list.append(entry)

with open(templates_path, "w", encoding="utf-8") as f:
    json.dump(final_list, f, ensure_ascii=False, indent=2)

print(f"Merge completed! Added {added_count} templates, updated {updated_count} templates.")
print(f"Total templates in templates.json: {len(final_list)}")
