import re

with open('/Users/maximeelhaik/Documents/VIBE CODING GENERATION/scripts/generate_layouts.py', 'r', encoding='utf-8') as f:
    content = f.read()

patch = """
    for block in template_data.get('blocks', []):
        name = block['name']
        style = block['style']
        
        # Filter hidden elements
        if style.get('visibility') == 'hidden' or style.get('display') == 'none':
            continue
            
        is_text_field = name in text_keys
        
        # HEURISTIC: Find containing box to expand width for text fields
        if is_text_field and 'width' in style and 'left' in style and 'top' in style:
            try:
                def get_px(val_str, is_x):
                    if not val_str: return 0
                    if 'calc' in val_str:
                        base = 1920 if is_x else 1080
                        expr = val_str.replace('calc(', '').rstrip(')')
                        expr = expr.replace('%', f'*{base}/100').replace('px', '')
                        return eval(expr)
                    elif val_str.endswith('%'):
                        return float(val_str.replace('%', '')) * (1920 if is_x else 1080) / 100
                    elif val_str.endswith('px'):
                        return float(val_str.replace('px', ''))
                    return float(val_str)
                    
                t_left = get_px(style['left'], True)
                t_top = get_px(style['top'], False)
                t_width = get_px(style['width'], True)
                
                best_container = None
                for other in template_data.get('blocks', []):
                    if other == block or other['name'] in text_keys: continue
                    o_style = other['style']
                    if 'width' in o_style and 'height' in o_style and 'left' in o_style and 'top' in o_style:
                        o_left = get_px(o_style['left'], True)
                        o_top = get_px(o_style['top'], False)
                        o_width = get_px(o_style['width'], True)
                        o_height = get_px(o_style['height'], False)
                        
                        # Check if text is inside this container
                        if o_width > t_width and o_left <= t_left and o_top <= t_top + 30 and (o_left + o_width) >= (t_left + t_width) - 10:
                            if not best_container or (o_width * o_height < get_px(best_container['style']['width'], True) * get_px(best_container['style']['height'], False)):
                                best_container = other
                
                if best_container:
                    c_left = get_px(best_container['style']['left'], True)
                    c_width = get_px(best_container['style']['width'], True)
                    new_width = c_width - (t_left - c_left) - 10
                    style['width'] = f"{new_width}px"
            except Exception as e:
                print("Heuristic error:", e)

"""

# We replace the beginning of the for loop in generate_react_component
target = """
    for block in template_data.get('blocks', []):
        name = block['name']
        style = block['style']
        
        # Filter hidden elements
        if style.get('visibility') == 'hidden' or style.get('display') == 'none':
            continue
            
        is_text_field = name in text_keys
"""

if target in content:
    content = content.replace(target, patch)
    with open('/Users/maximeelhaik/Documents/VIBE CODING GENERATION/scripts/generate_layouts.py', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Patched generate_layouts.py")
else:
    print("Target not found")
