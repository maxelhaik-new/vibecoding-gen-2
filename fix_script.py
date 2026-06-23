import re

with open('scripts/generate_layouts.py', 'r') as f:
    content = f.read()

content = content.replace(
    'def camel_case(s):',
    '''def camel_case(s):
    s = s.replace("VIBECODING - ", "")
    parts = re.split(r'[^a-zA-Z0-9]+', s)
    res = ''.join(p.capitalize() for p in parts if p)
    if res and res[0].isdigit():
        res = "Layout" + res
    return res'''
)

# Wait, replacing the whole function is easier if I just find it.
