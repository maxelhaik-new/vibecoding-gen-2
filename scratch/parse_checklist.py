import json
import math
import re

def calc_limits(text: str) -> dict:
    length = len(text)
    target = length
    if length < 30:
        min_l = max(5, math.floor(length * 0.7))
        max_l = math.ceil(length * 1.5)
    else:
        min_l = max(5, math.floor(length * 0.7))
        max_l = math.ceil(length * 1.3)
    return {"target_lenght": target, "min_lenght": min_l, "max_lenght": max_l}

def is_pure_number(s: str) -> bool:
    return bool(re.fullmatch(r"\d+", s.strip()))

def get_closest_ratio(width: float, height: float) -> str:
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

def classify_node(node: dict) -> str:
    name = node.get("name", "").strip().lower()
    ntype = node.get("type", "")
    
    # Detect image layers
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
            
    # Detect picto layers
    picto_keywords = ["mdi:", "iconify:", "picto", "icon", "svg", "logo"]
    if any(kw in name for kw in picto_keywords):
        return "picto"
        
    if ntype != "TEXT":
        return None
        
    # Exclude pure number layers (Figma bullet numerals)
    chars = node.get("characters", "")
    if is_pure_number(node.get("name", "")) or is_pure_number(chars):
        return None
        
    return "text"

def collect_layers(node: dict, text_layers: list, picto_layers: list, image_layers: list, picto_counter: list, parent_block: int = None):
    name = node.get("name", "")
    match = re.search(r'(?:bloc|colonne|item|point|étape|step)\s*(\d+)', name, re.IGNORECASE)
    if match:
        parent_block = int(match.group(1))

    kind = classify_node(node)
    if kind == "text":
        chars = node.get("characters", "")
        entry = {"key": node["name"], "original_placeholder": chars}
        entry.update(calc_limits(chars))
        text_layers.append(entry)
    elif kind == "picto":
        idx = parent_block if parent_block is not None else picto_counter[0]
        if parent_block is None:
            picto_counter[0] += 1
        picto_layers.append({
            "key": f"Picto {idx}",
            "original_placeholder": node.get("name", f"Picto {idx}")
        })
    elif kind == "image":
        if not any(img["key"] == "image" for img in image_layers):
            bbox = node.get("absoluteBoundingBox") or {}
            width = bbox.get("width")
            height = bbox.get("height")
            ratio = get_closest_ratio(width, height) if width and height else "1:1"
            img_entry = {"key": "image", "original_placeholder": node.get("name", "image"), "ratio": ratio}
            if width and height:
                img_entry["width"] = round(width, 1)
                img_entry["height"] = round(height, 1)
            image_layers.append(img_entry)

    for child in node.get("children", []):
        collect_layers(child, text_layers, picto_layers, image_layers, picto_counter, parent_block)

def main():
    with open("scratch/checklist_corrected_data.json", "r", encoding="utf-8") as f:
        data = json.load(f)
        
    node = list(data["nodes"].values())[0]["document"]
    print("Frame Name:", node.get("name"))
    print("Frame ID:", node.get("id"))
    
    text_layers = []
    picto_layers = []
    image_layers = []
    collect_layers(node, text_layers, picto_layers, image_layers, [1])
    
    print("\n--- TEXT LAYERS ---")
    for tl in text_layers:
        print(f"Key: {tl['key']}")
        print(f"  Placeholder: {repr(tl['original_placeholder'])}")
        print(f"  Limits: min={tl['min_lenght']}, target={tl['target_lenght']}, max={tl['max_lenght']}")
        
    print("\n--- PICTO LAYERS ---")
    for pl in picto_layers:
        print(pl)
        
    print("\n--- IMAGE LAYERS ---")
    for il in image_layers:
        print(il)

if __name__ == "__main__":
    main()
