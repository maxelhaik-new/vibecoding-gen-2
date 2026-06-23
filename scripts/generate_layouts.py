import json
import re
import os

CSS_FILE = "/Users/maximeelhaik/Documents/VIBE CODING GENERATION/Imports/Template Import.css"
JSON_FILE = "/Users/maximeelhaik/Documents/VIBE CODING GENERATION/templates.json"
OUT_DIR = "/Users/maximeelhaik/Documents/VIBE CODING GENERATION/studio/src/components/layouts"

def parse_css_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Split by VIBECODING templates
    template_chunks = re.split(r'/\*\s*(VIBECODING\s*-\s*[^*]+)\s*\*/', content)
    
    templates = {}
    
    # template_chunks[0] is everything before the first template
    for i in range(1, len(template_chunks), 2):
        name = template_chunks[i].strip()
        css_body = template_chunks[i+1]
        
        # Parse blocks inside the template
        # A block starts with /* name */ and ends before the next /* name */
        blocks = []
        block_chunks = re.split(r'/\*\s*([^*]+)\s*\*/', css_body)
        
        # The first chunk before any sub-comment is the root style
        root_style = parse_style_block(block_chunks[0])
        
        for j in range(1, len(block_chunks), 2):
            block_name = block_chunks[j].strip()
            # Ignore standard CSS comments if they contain multiline text not matching an element
            if "leading-trim" in block_name or "ou " in block_name or block_name.startswith("identique"):
                continue
            
            style = parse_style_block(block_chunks[j+1])
            if style:
                blocks.append({
                    "name": block_name,
                    "style": style
                })
        
        templates[name] = {
            "root_style": root_style,
            "blocks": blocks
        }
    
    return templates

def parse_style_block(css_text):
    style = {}
    for line in css_text.split(';'):
        line = line.strip()
        if not line: continue
        if ':' in line:
            parts = line.split(':', 1)
            key = parts[0].strip()
            val = parts[1].strip()
            style[key] = val
    return style

def camel_case(s):
    # Convert "VIBECODING - COVER CHAP" to "CoverChap"
    s = s.replace("VIBECODING - ", "")
    parts = re.split(r'[^a-zA-Z0-9]+', s)
    res = ''.join(p.capitalize() for p in parts if p)
    if res and res[0].isdigit():
        res = "Layout" + res
    return res

def evaluate_calc(expr, is_x):
    # e.g. calc(50% - 1298px/2 - 211px)
    # replace 50% with 1920/2 or 1080/2
    base = 1920 if is_x else 1080
    expr = expr.replace('calc(', '').rstrip(')')
    expr = expr.replace('%', f'*{base}/100')
    expr = expr.replace('px', '')
    try:
        val = eval(expr)
        return val
    except Exception as e:
        print(f"Error evaluating {expr}: {e}")
        return 0

def px_to_cq(val_str, is_x):
    if not val_str: return val_str
    
    if 'calc' in val_str:
        px_val = evaluate_calc(val_str, is_x)
    elif val_str.endswith('%'):
        # For left/top %, just return it or convert to cqw
        try:
            p = float(val_str.replace('%', ''))
            return f"{p}cqw" if is_x else f"{p}cqh"
        except:
            return val_str
    elif val_str.endswith('px'):
        try:
            px_val = float(val_str.replace('px', ''))
        except:
            return val_str
    else:
        return val_str
        
    divider = 19.2 if is_x else 10.8
    cq_val = px_val / divider
    
    unit = 'cqw' if is_x else 'cqh'
    return f"{round(cq_val, 2)}{unit}"

def format_color(color_str):
    if color_str.startswith('var('):
        return color_str
    return color_str

def generate_react_component(template_name, template_data, json_template):
    comp_name = f"{camel_case(template_name)}Layout"
    
    text_keys = [layer['key'] for layer in json_template.get('text_layers', [])]
    
    lines = [
        "import React from 'react';",
        "import { EditableField } from '../EditableField';",
        "import { SlideFieldRule } from '../../types';",
        "",
        "interface LayoutProps {",
        "  content: Record<string, string>;",
        "  onChange: (key: string, value: string) => void;",
        "  rules: Record<string, SlideFieldRule>;",
        "}",
        "",
        f"export const {comp_name}: React.FC<LayoutProps> = ({{ content, onChange, rules }}) => {{",
        "  return (",
        "    <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden', backgroundColor: '#FFFFFF' }}>"
    ]
    
    # Root style (if there is a background color)
    root = template_data.get('root_style', {})
    bg = root.get('background', '')
    if bg:
        lines.append("      {/* Background layer */}")
        lines.append(f"      <div style={{{{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, background: '{bg}', zIndex: -1 }}}} />")
        
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
                        
                        # Check if text is inside this container vertically and horizontally, and container is not the full slide background
                        if o_width < 1800 and o_width > t_width and o_left <= t_left and (o_left + o_width) >= (t_left + t_width) - 10 and o_top <= t_top + 10 and (o_top + o_height) >= t_top:
                            if not best_container or (o_width * o_height < get_px(best_container['style']['width'], True) * get_px(best_container['style']['height'], False)):
                                best_container = other
                
                if best_container:
                    c_left = get_px(best_container['style']['left'], True)
                    c_width = get_px(best_container['style']['width'], True)
                    new_width = c_width - (t_left - c_left) - 10
                    style['width'] = f"{new_width}px"
            except Exception as e:
                print("Heuristic error:", e)

        is_main_title = is_text_field and (name.lower() in ['titre', 'titre de la slide', 'focus sur caude (anthropic)', 'focus sur claude (anthropic)']) and ('COVER' not in template_name)
        
        s_left = px_to_cq(style.get('left', ''), True)
        s_right = px_to_cq(style.get('right', ''), True)
        s_top = px_to_cq(style.get('top', ''), False)
        s_bottom = px_to_cq(style.get('bottom', ''), False)
        s_width = px_to_cq(style.get('width', ''), True)
        s_height = px_to_cq(style.get('height', ''), False)
        
        # Override title width and position for non-cover slides
        if is_main_title:
            s_left = '5.21cqw'
            s_width = '89.58cqw'
            s_right = ''
            
        div_style = [
            f"position: '{style.get('position', 'absolute')}'",
        ]
        if not is_text_field:
            div_style.append("pointerEvents: 'none'")
        if s_left: div_style.append(f"left: '{s_left}'")
        if s_right: div_style.append(f"right: '{s_right}'")
        if s_top: div_style.append(f"top: '{s_top}'")
        if s_bottom: div_style.append(f"bottom: '{s_bottom}'")
        if s_width: div_style.append(f"width: '{s_width}'")
        if s_height: div_style.append(f"height: '{s_height}'")
        
        # Map specific css properties
        if 'background' in style:
            div_style.append(f"background: '{style['background']}'")
        if 'border-radius' in style:
            # Convert border-radius if it's px, keep as is if %. Using simple px_to_cq for x
            br = style['border-radius']
            if 'px' in br:
                # Just use VW/CQW for uniform scaling, or keep raw.
                div_style.append(f"borderRadius: '{px_to_cq(br, True)}'")
            else:
                div_style.append(f"borderRadius: '{br}'")
        if 'transform' in style:
            div_style.append(f"transform: '{style['transform']}'")
        if 'opacity' in style:
            div_style.append(f"opacity: {style['opacity']}")
            
        if 'font-family' in style:
            div_style.append(f"fontFamily: 'var(--font-family-slides)'")
        if 'font-weight' in style:
            div_style.append(f"fontWeight: {style['font-weight']}")
        if 'font-size' in style:
            div_style.append(f"fontSize: '{px_to_cq(style['font-size'], True)}'")
        if 'line-height' in style:
            lh = style['line-height'].replace('%', '')
            if '%' in style['line-height']:
                div_style.append(f"lineHeight: {float(lh)/100}")
            elif 'px' in style['line-height']:
                # convert to ratio of font size or just use raw
                div_style.append(f"lineHeight: '1.2'") # fallback
            else:
                div_style.append(f"lineHeight: '{style['line-height']}'")
        if 'letter-spacing' in style:
            div_style.append(f"letterSpacing: '{style['letter-spacing']}'")
        if 'color' in style:
            div_style.append(f"color: '{style['color']}'")
        if 'text-align' in style:
            div_style.append(f"textAlign: '{style['text-align']}'")
            
        div_style.append("display: 'flex'")
        div_style.append("alignItems: 'center'")
        # Default text alignment if not provided
        if 'text-align' not in style and is_text_field:
            div_style.append("justifyContent: 'flex-start'")
        
        style_str = ",\n          ".join(div_style)
        
        lines.append(f"      {{/* {name} */}}")
        lines.append(f"      <div")
        lines.append(f"        style={{{{\n          {style_str}\n        }}}}")
        lines.append(f"      >")
        
        if is_text_field:
            name_lower = name.lower()
            should_not_wrap = is_main_title or any(term in name_lower for term in ['mot', 'chiffre', 'rang', 'nom checklist', 'bullet']) or (template_name == 'VIBECODING - OBJECTIF CHAP' and 'titre' in name_lower)
            
            lines.append(f"        <EditableField")
            lines.append(f"          fieldKey=\"{name}\"")
            lines.append(f"          value={{content['{name}'] || ''}}")
            lines.append(f"          onChange={{(val) => onChange('{name}', val)}}")
            lines.append(f"          rule={{rules['{name}']}}")
            lines.append(f"          placeholder=\"{name}\"")
            if should_not_wrap:
                lines.append(f"          multiline={{false}}")
            lines.append(f"          style={{{{\n")
            if 'color' in style:
                lines.append(f"            color: '{style['color']}',")
            lines.append(f"            textAlign: '{style.get('text-align', 'left')}',")
            lines.append(f"            padding: '0px',")
            lines.append(f"            background: 'transparent',")
            lines.append(f"            border: 'none',")
            lines.append(f"            width: '100%',")
            if should_not_wrap:
                lines.append(f"            whiteSpace: 'nowrap',")
            lines.append(f"          }}}}")
            lines.append(f"        />")
        else:
            # Maybe it's an image block, we can just leave it as a div
            pass
            
        lines.append(f"      </div>")
        
    lines.append("    </div>")
    lines.append("  );")
    lines.append("};")
    lines.append("")
    lines.append(f"export default {comp_name};")
    
    filepath = os.path.join(OUT_DIR, f"{comp_name}.tsx")
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write("\n".join(lines))
    return comp_name

def main():
    if not os.path.exists(OUT_DIR):
        os.makedirs(OUT_DIR)
        
    with open(JSON_FILE, 'r', encoding='utf-8') as f:
        templates_json = json.load(f)
        
    templates_css = parse_css_file(CSS_FILE)
    
    generated_components = []
    
    for json_t in templates_json:
        name = json_t['name']
        if name in templates_css:
            comp_name = generate_react_component(name, templates_css[name], json_t)
            generated_components.append({
                "name": name,
                "comp": comp_name
            })
            print(f"Generated {comp_name}")
        else:
            print(f"Template {name} not found in CSS.")
            
    # Optionally, generate an index.ts or update SlideCard.tsx mapping
    print("\n--- Component Mapping for SlideCard.tsx ---")
    for gc in generated_components:
        print(f"import {gc['comp']} from './layouts/{gc['comp']}';")
        
    print("\n")
    for gc in generated_components:
        print(f"    case '{gc['name']}':")
        print(f"      return <{gc['comp']} content={{slide.content}} onChange={{handleContentChange}} rules={{rules}} />;")

if __name__ == "__main__":
    main()
