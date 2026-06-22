#!/usr/bin/env python3
import sys
import os
import json
import argparse
import requests

def hex_to_figma_color(hex_str):
    hex_str = hex_str.lstrip('#')
    r = int(hex_str[0:2], 16) / 255.0
    g = int(hex_str[2:4], 16) / 255.0
    b = int(hex_str[4:6], 16) / 255.0
    return {"r": r, "g": g, "b": b, "a": 1.0}

def figma_to_hex(color):
    r = int(color.get("r", 0) * 255)
    g = int(color.get("g", 0) * 255)
    b = int(color.get("b", 0) * 255)
    return f"#{r:02x}{g:02x}{b:02x}"

def map_color_to_new_da(color_hex):
    # Map colors to the new DA palette
    # New DA colors:
    # - Brand Blue: #0c8ce9
    # - Dark BG / Card BG: #2c2c2c
    # - Border / Grey: #444444
    # - Background: #F2F3F6
    # - Dark text: #1c1c1c
    # - White / Light: #ffffff
    c = color_hex.lower()
    if c == "#ffffff":
        return "#ffffff"
    # If it is a shade of very light grey
    if c in ["#f2f3f6", "#f7f7f7", "#f0f0f0", "#fafafa", "#eeeeee"]:
        return "#f2f3f6"
    # If it is a shade of dark grey/black
    if c in ["#000000", "#111111", "#1a1a1a", "#1c1c1c", "#222222", "#2c2c2c", "#333333"]:
        return "#1c1c1c"
    # If it is a primary color (e.g. old branding color like blue, orange, red, purple)
    # Map it to new brand blue #0c8ce9
    return "#0c8ce9"

def map_font_weight_to_style(weight):
    # Basic Sans Alt styles: Bold, Regular, Medium, Light
    if weight >= 700:
        return "Bold"
    elif weight >= 500:
        return "Medium"
    else:
        return "Regular"

class SlideAdapter:
    def __init__(self, token, file_key):
        self.token = token
        self.file_key = file_key
        self.headers = {"X-Figma-Token": self.token}

    def fetch_node(self, node_id):
        url = f"https://api.figma.com/v1/files/{self.file_key}/nodes?ids={node_id}&depth=6"
        r = requests.get(url, headers=self.headers)
        if r.status_code != 200:
            raise Exception(f"Figma API Error: {r.status_code} - {r.text}")
        data = r.json()
        return data.get("nodes", {}).get(node_id, {}).get("document", {})

    def extract_all_elements(self, node, elements=None):
        if elements is None:
            elements = []
        
        # Add element
        elements.append(node)
        
        # Recurse children
        if "children" in node:
            for child in node["children"]:
                self.extract_all_elements(child, elements)
        return elements

    def process_slide(self, slide_node):
        slide_id = slide_node.get("id")
        slide_name = slide_node.get("name")
        slide_bounds = slide_node.get("absoluteBoundingBox", {"x": 0, "y": 0, "width": 1920, "height": 1080})
        
        # Extract all text nodes
        all_nodes = self.extract_all_elements(slide_node)
        text_nodes = [n for n in all_nodes if n.get("type") == "TEXT"]
        
        # Sort text nodes by vertical position
        text_nodes.sort(key=lambda n: n.get("absoluteBoundingBox", {}).get("y", 0))
        
        # Identify Title and Intro
        # Heuristic: Title is the largest font size >= 40px at the top
        title_node = None
        intro_node = None
        
        large_texts = [n for n in text_nodes if n.get("style", {}).get("fontSize", 0) >= 36]
        if large_texts:
            title_node = large_texts[0]
            
        # Intro is a medium size text below Title
        if title_node:
            title_y = title_node.get("absoluteBoundingBox", {}).get("y", 0)
            remaining_texts = [n for n in text_nodes if n.get("id") != title_node.get("id") and n.get("absoluteBoundingBox", {}).get("y", 0) >= title_y]
            medium_texts = [n for n in remaining_texts if 15 <= n.get("style", {}).get("fontSize", 0) <= 35]
            if medium_texts:
                intro_node = medium_texts[0]
        else:
            if text_nodes:
                title_node = text_nodes[0]
                if len(text_nodes) > 1:
                    intro_node = text_nodes[1]

        title_text = title_node.get("characters", "").strip() if title_node else ""
        intro_text = intro_node.get("characters", "").strip() if intro_node else ""

        # Identify blocks / items for heuristic matching
        other_texts = [n for n in text_nodes if n.get("id") not in [getattr(title_node, "id", None), getattr(intro_node, "id", None)]]
        
        # Exclude elements in the header area (y < 250 relative) or matching title/intro text
        def is_header_element(node):
            if not node.get("absoluteBoundingBox"):
                return False
            local_y = node["absoluteBoundingBox"]["y"] - slide_bounds["y"]
            local_x = node["absoluteBoundingBox"]["x"] - slide_bounds["x"]
            # Exclude if in header zone
            if local_y < 240:
                return True
            # Exclude if matches Title or Intro text
            if node.get("characters") in [title_text, intro_text]:
                return True
            return False

        # --- LOGIC A: HEURISTIC TEMPLATE MATCHING ---
        matched_template = None
        content_payload = {"Titre": title_text}
        if intro_text:
            content_payload["Intro"] = intro_text

        # Group other texts by horizontal proximity (to detect columns/blocks)
        blocks = []
        block_candidates = [n for n in other_texts if not is_header_element(n)]
        
        # Sort block candidates by x coordinate then y
        block_candidates.sort(key=lambda n: (n.get("absoluteBoundingBox", {}).get("x", 0), n.get("absoluteBoundingBox", {}).get("y", 0)))
        
        # Group texts into blocks if they are close horizontally
        current_block = []
        for node in block_candidates:
            if not current_block:
                current_block.append(node)
            else:
                last_node = current_block[-1]
                last_x = last_node.get("absoluteBoundingBox", {}).get("x", 0)
                curr_x = node.get("absoluteBoundingBox", {}).get("x", 0)
                # If within 250px horizontally, group together as same block/column
                if abs(curr_x - last_x) < 250:
                    current_block.append(node)
                else:
                    blocks.append(current_block)
                    current_block = [node]
        if current_block:
            blocks.append(current_block)

        # Sort blocks by horizontal position
        blocks.sort(key=lambda b: b[0].get("absoluteBoundingBox", {}).get("x", 0) if b else 0)

        # For each block, sort its texts vertically (first is title, second is text description)
        parsed_blocks = []
        for b in blocks:
            b.sort(key=lambda n: n.get("absoluteBoundingBox", {}).get("y", 0))
            if len(b) >= 2:
                parsed_blocks.append({
                    "title": b[0].get("characters", "").strip(),
                    "text": "\n".join([n.get("characters", "").strip() for n in b[1:]])
                })
            elif len(b) == 1:
                parsed_blocks.append({
                    "title": b[0].get("characters", "").strip(),
                    "text": ""
                })

        num_blocks = len(parsed_blocks)
        if num_blocks == 3:
            matched_template = "VIBECODING - 3 BLOCS - LARGE TEXT"
            for idx, pb in enumerate(parsed_blocks):
                content_payload[f"Titre {idx+1}"] = pb["title"]
                content_payload[f"Texte {idx+1}"] = pb["text"]
                content_payload[f"Picto {idx+1}"] = "mdi:arrow-right-bold-circle-outline"
        elif num_blocks == 4:
            matched_template = "VIBECODING - 4 BLOCS - TITLE 2 LINES"
            for idx, pb in enumerate(parsed_blocks):
                content_payload[f"Titre {idx+1}"] = pb["title"]
                content_payload[f"Texte {idx+1}"] = pb["text"]
                content_payload[f"Picto {idx+1}"] = "mdi:arrow-right-bold-circle-outline"
        elif num_blocks == 5:
            matched_template = "VIBECODING - 5 BLOCS"
            for idx, pb in enumerate(parsed_blocks):
                content_payload[f"Titre {idx+1}"] = pb["title"]
                content_payload[f"Texte {idx+1}"] = pb["text"]
                content_payload[f"Picto {idx+1}"] = "mdi:arrow-right-bold-circle-outline"
        elif num_blocks == 0 and not intro_text:
            matched_template = "VIBECODING - COVER"
        else:
            matched_template = "VIBECODING - CONCEPT"
            content_payload["Texte 1"] = "\n".join([n.get("characters", "").strip() for n in block_candidates])

        # --- LOGIC B: BLANK TEMPLATE + CUSTOM ELEMENTS ---
        custom_elements = []
        
        # Traverse direct children of slide frame (excluding root and background/header elements)
        for child in slide_node.get("children", []):
            child_name = child.get("name", "")
            child_type = child.get("type", "")
            child_bounds = child.get("absoluteBoundingBox")
            
            if not child_bounds:
                continue
                
            local_x = child_bounds["x"] - slide_bounds["x"]
            local_y = child_bounds["y"] - slide_bounds["y"]
            w = child_bounds["width"]
            h = child_bounds["height"]
            
            # Exclude full background
            if abs(w - 1920) < 10 and abs(h - 1080) < 10:
                continue
                
            # Exclude header components and shapes
            if local_y < 240 and (child_type == "RECTANGLE" or child_type == "FRAME" or "header" in child_name.lower() or "titre" in child_name.lower()):
                continue
                
            # Exclude Title and Intro texts
            if child_type == "TEXT" and (child.get("characters") in [title_text, intro_text]):
                continue

            # Process valid children
            def convert_to_custom(node):
                nb = node.get("absoluteBoundingBox")
                if not nb:
                    return None
                    
                lx = nb["x"] - slide_bounds["x"]
                ly = nb["y"] - slide_bounds["y"]
                nw = nb["width"]
                nh = nb["height"]
                
                props = {
                    "x": lx,
                    "y": ly,
                    "width": nw,
                    "height": nh
                }
                
                # Fills mapping
                fills = node.get("fills", [])
                mapped_fills = []
                for f in fills:
                    if f.get("type") == "SOLID":
                        hex_col = figma_to_hex(f.get("color", {}))
                        new_hex = map_color_to_new_da(hex_col)
                        mapped_fills.append({
                            "type": "SOLID",
                            "color": hex_to_figma_color(new_hex),
                            "opacity": f.get("opacity", 1.0)
                        })
                if mapped_fills:
                    props["fills"] = mapped_fills
                    
                # Text properties
                if node.get("type") == "TEXT":
                    props["characters"] = node.get("characters", "")
                    style = node.get("style", {})
                    props["fontSize"] = style.get("fontSize", 14)
                    props["textAlignHorizontal"] = style.get("textAlignHorizontal", "LEFT")
                    props["textAlignVertical"] = style.get("textAlignVertical", "TOP")
                    
                    # Force Basic Sans Alt font family
                    weight = style.get("fontWeight", 400)
                    mapped_style = map_font_weight_to_style(weight)
                    props["fontName"] = {
                        "family": "Basic Sans Alt",
                        "style": mapped_style
                    }
                    return {
                        "action": "create_node",
                        "node_type": "TEXT",
                        "name": node.get("name", "Text"),
                        "properties": props
                    }
                    
                elif node.get("type") in ["RECTANGLE", "FRAME", "GROUP", "INSTANCE"]:
                    # Create a rectangle or frame
                    return {
                        "action": "create_node",
                        "node_type": "RECTANGLE" if node.get("type") == "RECTANGLE" else "FRAME",
                        "name": node.get("name", "Shape"),
                        "properties": props
                    }
                return None

            # Add to custom elements
            custom = convert_to_custom(child)
            if custom:
                custom_elements.append(custom)

        blank_slide_payload = {
            "template": "VIBECODING - VIDE",
            "content": {
                "Titre": title_text,
                "Intro": intro_text
            },
            "custom_elements": custom_elements
        }

        # Return both options
        return {
            "slideName": slide_name,
            "slideId": slide_id,
            "logicA": {
                "template": matched_template,
                "content": content_payload
            },
            "logicB": blank_slide_payload
        }

def main():
    parser = argparse.ArgumentParser(description="Adapte les anciennes slides à la nouvelle DA.")
    parser.add_argument("--node-id", required=True, help="ID du nœud de la slide ou section dans Figma (ex: 484:3989)")
    args = parser.parse_args()

    token = "REMOVED_SECRET"
    file_key = "X29iTl53DAreMnpHDehsTx"

    adapter = SlideAdapter(token, file_key)
    
    print(f"Fetching Figma node {args.node_id}...")
    try:
        node_data = adapter.fetch_node(args.node_id)
    except Exception as e:
        print(f"Error fetching node: {e}", file=sys.stderr)
        sys.exit(1)

    # Determine if it is a Section/Frame containing multiple slides or a single Slide Frame
    slides_to_process = []
    has_slide_children = "children" in node_data and any(
        child.get("type") in ["FRAME", "COMPONENT", "INSTANCE"] and child.get("absoluteBoundingBox", {}).get("width") == 1920
        for child in node_data.get("children", [])
    )
    if node_data.get("type") == "SECTION" or has_slide_children:
        print(f"Detected container: {node_data.get('name')} ({node_data.get('type')})")
        for child in node_data.get("children", []):
            if child.get("type") in ["FRAME", "COMPONENT", "INSTANCE"] and child.get("absoluteBoundingBox", {}).get("width") == 1920:
                slides_to_process.append(child)
        # Sort slides by horizontal position
        slides_to_process.sort(key=lambda s: s.get("absoluteBoundingBox", {}).get("x", 0))
    else:
        slides_to_process.append(node_data)

    print(f"Found {len(slides_to_process)} slide(s) to process.")
    
    output_lessons = {
        "lessonTitle": "M1C1L1", # Default fallback
        "slides": []
    }
    
    logic_b_slides = []

    for idx, slide in enumerate(slides_to_process):
        print(f"\nProcessing slide {slide.get('name')}...")
        res = adapter.process_slide(slide)
        
        # We output both options in a structured readable way
        print(f"--- OPTION A (Template Mapped: {res['logicA']['template']}) ---")
        print(json.dumps(res['logicA'], indent=2, ensure_ascii=False))
        
        print(f"--- OPTION B (Template VIDE with Custom Elements) ---")
        # Let's print a truncated version of logic B custom elements if it's too long
        b_copy = dict(res['logicB'])
        b_copy['custom_elements'] = f"... {len(res['logicB']['custom_elements'])} custom elements generated ..."
        print(json.dumps(b_copy, indent=2, ensure_ascii=False))
        
        # Save both options
        output_lessons["slides"].append(res['logicA'])
        logic_b_slides.append(res['logicB'])
        
    # Write full JSON of both options to scratch directory for agent access
    os.makedirs("scratch", exist_ok=True)
    with open("scratch/adapted_option_a.json", "w", encoding="utf-8") as f:
        json.dump(output_lessons, f, indent=2, ensure_ascii=False)
        
    with open("scratch/adapted_option_b.json", "w", encoding="utf-8") as f:
        json.dump({"lessonTitle": "M1C1L1", "slides": logic_b_slides}, f, indent=2, ensure_ascii=False)
        
    print("\nSaved full outputs to scratch/adapted_option_a.json and scratch/adapted_option_b.json.")

if __name__ == "__main__":
    main()
