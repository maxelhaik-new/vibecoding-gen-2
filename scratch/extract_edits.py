import json

def decode_val(val):
    if not isinstance(val, str):
        return val
    if val.startswith('"') and val.endswith('"'):
        try:
            return json.loads(val)
        except:
            pass
    return val

# Load current edits
with open('studio/src/current_edits.json', 'r') as f:
    edits = json.load(f)

# Write to App_edits.md
with open('studio/src/App_edits.md', 'w', encoding='utf-8') as f:
    f.write('# Agent UI Edits to App.tsx\n\n')
    for edit in edits:
        step = edit['step_index']
        desc = edit['description']
        target = decode_val(edit['target'])
        repl = decode_val(edit['replacement'])
        start = edit['start']
        end = edit['end']
        
        f.write(f'## Step {step}: {desc}\n')
        f.write(f'Lines: {start} - {end}\n\n')
        f.write('### Target Content:\n```tsx\n')
        f.write(target)
        f.write('\n```\n\n')
        f.write('### Replacement Content:\n```tsx\n')
        f.write(repl)
        f.write('\n```\n\n')
        f.write('---\n\n')

print('Extraction completed successfully!')
