import re
import math

def evaluate_calc(expr, is_x):
    base = 1920 if is_x else 1080
    expr = expr.replace('calc(', '').rstrip(')')
    expr = expr.replace('%', f'*{base}/100')
    expr = expr.replace('px', '')
    try:
        val = eval(expr)
        return val
    except Exception as e:
        return 0

def get_px(val_str, is_x):
    if not val_str: return 0
    if 'calc' in val_str:
        return evaluate_calc(val_str, is_x)
    elif val_str.endswith('%'):
        try:
            p = float(val_str.replace('%', ''))
            return p * (1920 if is_x else 1080) / 100
        except:
            return 0
    elif val_str.endswith('px'):
        try:
            return float(val_str.replace('px', ''))
        except:
            return 0
    else:
        try:
            return float(val_str)
        except:
            return 0

def parse_style_block(css_text):
    style = {}
    for line in css_text.split(';'):
        line = line.strip()
        if not line: continue
        if ':' in line:
            parts = line.split(':', 1)
            style[parts[0].strip()] = parts[1].strip()
    return style

with open('/Users/maximeelhaik/Documents/VIBE CODING GENERATION/Imports/Template Import.css', 'r', encoding='utf-8') as f:
    content = f.read()

template_chunks = re.split(r'/\*\s*(VIBECODING\s*-\s*[^*]+)\s*\*/', content)
templates = {}

for i in range(1, len(template_chunks), 2):
    name = template_chunks[i].strip()
    css_body = template_chunks[i+1]
    
    blocks = []
    block_chunks = re.split(r'/\*\s*([^*]+)\s*\*/', css_body)
    
    for j in range(1, len(block_chunks), 2):
        block_name = block_chunks[j].strip()
        if "leading-trim" in block_name or "ou " in block_name or block_name.startswith("identique"):
            continue
        style = parse_style_block(block_chunks[j+1])
        if style:
            blocks.append({"name": block_name, "style": style})
    
    # Heuristic for text width
    for block in blocks:
        if 'width' in block['style'] and 'left' in block['style'] and 'top' in block['style']:
            t_left = get_px(block['style']['left'], True)
            t_top = get_px(block['style']['top'], False)
            t_width = get_px(block['style']['width'], True)
            
            # Find a larger background block that contains this block
            best_container = None
            for other in blocks:
                if other == block: continue
                if 'width' in other['style'] and 'height' in other['style'] and 'left' in other['style'] and 'top' in other['style']:
                    o_left = get_px(other['style']['left'], True)
                    o_top = get_px(other['style']['top'], False)
                    o_width = get_px(other['style']['width'], True)
                    o_height = get_px(other['style']['height'], False)
                    
                    if o_width > t_width and o_left <= t_left and o_top <= t_top + 20 and (o_left + o_width) >= (t_left + t_width) - 5:
                        if not best_container or (o_width * o_height < get_px(best_container['style']['width'], True) * get_px(best_container['style']['height'], False)):
                            best_container = other
            
            if best_container and name == 'VIBECODING - 3 BLOCS - PHOTO' and 'Titre' in block['name']:
                c_left = get_px(best_container['style']['left'], True)
                c_width = get_px(best_container['style']['width'], True)
                new_width = c_width - (t_left - c_left) - 10
                print(f"[{name}] {block['name']}: {t_width}px -> {new_width}px (contained in {best_container['name']} {c_width}px)")
