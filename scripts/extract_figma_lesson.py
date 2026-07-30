import os
#!/usr/bin/env python3
import sys
import json
import urllib.request
import urllib.parse

# Configuration
FILE_KEY = "X29iTl53DAreMnpHDehsTx"
TOKEN = os.environ.get("FIGMA_TOKEN", "")
THEORY_PAGE_ID = "426:7791"

def figma_api_request(path: str):
    url = f"https://api.figma.com/v1/{path}"
    req = urllib.request.Request(url)
    req.add_header("X-Figma-Token", TOKEN)
    with urllib.request.urlopen(req) as response:
        if response.status == 200:
            return json.loads(response.read().decode('utf-8'))
        else:
            raise Exception(f"Figma API returned status code {response.status}")

def find_lesson_node_id(lesson_code: str):
    # Normalize lesson code: remove whitespaces, punctuation, check prefix
    clean_code = lesson_code.strip().upper().replace(" ", "").replace("✅", "")
    
    print(f"Searching for lesson frame matching: {clean_code}...")
    page_data = figma_api_request(f"files/{FILE_KEY}/nodes?ids={THEORY_PAGE_ID}&depth=2")
    children = page_data.get("nodes", {}).get(THEORY_PAGE_ID, {}).get("document", {}).get("children", [])
    
    # Try exact match first
    for child in children:
        c_name = child.get("name", "").strip().upper().replace(" ", "").replace("✅", "")
        # Check if the child name starts with or contains the lesson code
        if clean_code in c_name:
            print(f"Found node matching '{child.get('name')}' (ID: {child.get('id')})")
            return child.get("id"), child.get("name")
            
    return None, None

def extract_texts_from_node(node):
    texts = []
    
    if node.get("type") == "TEXT":
        # Extract the character details
        characters = node.get("characters", "").strip()
        if characters:
            texts.append({
                "layer_name": node.get("name"),
                "text": characters,
                "fontSize": node.get("style", {}).get("fontSize"),
                "x": node.get("absoluteBoundingBox", {}).get("x", 0)
            })
            
    for child in node.get("children", []):
        texts.extend(extract_texts_from_node(child))
        
    return texts

def extract_lesson_slides(node_id: str):
    print(f"Fetching complete data for node {node_id} (depth=4)...")
    node_data = figma_api_request(f"files/{FILE_KEY}/nodes?ids={node_id}&depth=4")
    lesson_doc = node_data.get("nodes", {}).get(node_id, {}).get("document", {})
    
    # Slides are immediate children of the lesson frame
    slides_children = lesson_doc.get("children", [])
    
    # Filter slides: usually frames
    slides = [c for c in slides_children if c.get("type") == "FRAME"]
    
    # Sort slides visually from left to right (by X coordinate)
    def get_x_coord(s):
        bbox = s.get("absoluteBoundingBox")
        return bbox.get("x", 0) if bbox else 0
        
    slides.sort(key=get_x_coord)
    
    extracted_slides = []
    for idx, slide in enumerate(slides):
        slide_name = slide.get("name", f"Slide {idx + 1}")
        slide_id = slide.get("id")
        
        # Sort text layers inside the slide top-to-bottom or left-to-right
        text_layers = extract_texts_from_node(slide)
        
        # Determine the template from slide name (e.g. VIBECODING - COVER)
        template_name = slide_name
        
        extracted_slides.append({
            "slide_index": idx,
            "slide_id": slide_id,
            "template": template_name,
            "texts": text_layers
        })
        
    return extracted_slides

def main():
    if len(sys.argv) < 2:
        print("Usage: python3 scripts/extract_figma_lesson.py <lesson_code> [json/text]")
        print("Example: python3 scripts/extract_figma_lesson.py M1C2L2")
        sys.exit(1)
        
    lesson_code = sys.argv[1]
    format_type = sys.argv[2] if len(sys.argv) > 2 else "text"
    
    node_id, full_name = find_lesson_node_id(lesson_code)
    if not node_id:
        print(f"Error: Lesson frame matching '{lesson_code}' not found on theory page.")
        sys.exit(1)
        
    try:
        slides = extract_lesson_slides(node_id)
    except Exception as e:
        print(f"Error extracting slides: {e}")
        sys.exit(1)
        
    if format_type.lower() == "json":
        print(json.dumps(slides, indent=2, ensure_ascii=False))
    else:
        print("=" * 60)
        print(f"LESSON: {full_name} (ID: {node_id})")
        print("=" * 60)
        
        for slide in slides:
            print(f"\n[Slide {slide['slide_index'] + 1}] Template: {slide['template']} (ID: {slide['slide_id']})")
            print("-" * 40)
            # Filter unique texts to avoid duplication of elements (like background indicators)
            seen_texts = set()
            for text_layer in slide["texts"]:
                content = text_layer["text"]
                if content in seen_texts:
                    continue
                seen_texts.add(content)
                # Exclude purely static numbers or digits if they represent bullet counters
                if content.isdigit() and len(content) <= 2:
                    continue
                print(f"  * {text_layer['layer_name']}: {content}")
                
if __name__ == "__main__":
    main()
