import re

with open('/Users/maximeelhaik/Documents/VIBE CODING GENERATION/scripts/generate_layouts.py', 'r', encoding='utf-8') as f:
    content = f.read()

patch = """
        if is_text_field:
            is_main_title = (name.lower() == 'titre') and ('COVER' not in template_name)
            
            lines.append(f"        <EditableField")
            lines.append(f"          fieldKey=\\"{name}\\"")
            lines.append(f"          value={{content['{name}'] || ''}}")
            lines.append(f"          onChange={{(val) => onChange('{name}', val)}}")
            lines.append(f"          rule={{rules['{name}']}}")
            lines.append(f"          placeholder=\\"{name}\\"")
            lines.append(f"          style={{{{\n")
            if 'color' in style:
                lines.append(f"            color: '{style['color']}',")
            lines.append(f"            textAlign: '{style.get('text-align', 'left')}',")
            lines.append(f"            padding: '0px',")
            lines.append(f"            background: 'transparent',")
            lines.append(f"            border: 'none',")
            if is_main_title:
                lines.append(f"            whiteSpace: 'nowrap',")
                lines.append(f"            width: '1800px',")
            lines.append(f"          }}}}")
            lines.append(f"        />")
"""

target = """
        if is_text_field:
            lines.append(f"        <EditableField")
            lines.append(f"          fieldKey=\\"{name}\\"")
            lines.append(f"          value={{content['{name}'] || ''}}")
            lines.append(f"          onChange={{(val) => onChange('{name}', val)}}")
            lines.append(f"          rule={{rules['{name}']}}")
            lines.append(f"          placeholder=\\"{name}\\"")
            lines.append(f"          style={{{{\n")
            if 'color' in style:
                lines.append(f"            color: '{style['color']}',")
            lines.append(f"            textAlign: '{style.get('text-align', 'left')}',")
            lines.append(f"            padding: '0px',")
            lines.append(f"            background: 'transparent',")
            lines.append(f"            border: 'none',")
            lines.append(f"          }}}}")
            lines.append(f"        />")
"""

if target in content:
    content = content.replace(target, patch)
    with open('/Users/maximeelhaik/Documents/VIBE CODING GENERATION/scripts/generate_layouts.py', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Patched generate_layouts.py")
else:
    print("Target not found")
