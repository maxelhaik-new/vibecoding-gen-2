import os
import json
import re

def clean_text(text):
    if not isinstance(text, str):
        return text
    # Match "Principe clé :" or "Principe clé:" case-insensitive
    # handles line breaks like \u2028 or normal spaces
    pattern = r'^(?:Principe\s+clé\s*:\s*|Principe\s+cle\s*:\s*)'
    
    # If the text starts with the prefix
    match = re.match(pattern, text, re.IGNORECASE)
    if match:
        cleaned = text[match.end():].strip()
        # Capitalize the first letter of the cleaned text
        if cleaned:
            cleaned = cleaned[0].upper() + cleaned[1:]
        return cleaned
    
    # Also replace occurrences inside text if any (e.g. within paragraph)
    pattern_middle = r'(?:Principe\s+clé\s*:\s*|Principe\s+cle\s*:\s*)'
    cleaned = re.sub(pattern_middle, '', text, flags=re.IGNORECASE)
    return cleaned

def clean_json_structure(data):
    if isinstance(data, dict):
        return {k: clean_json_structure(v) for k, v in data.items()}
    elif isinstance(data, list):
        return [clean_json_structure(item) for item in data]
    elif isinstance(data, str):
        return clean_text(data)
    return data

def process_file(filepath):
    print(f"Traitement de {filepath}...")
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        cleaned_data = clean_json_structure(data)
        
        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(cleaned_data, f, ensure_ascii=False, indent=2)
    except Exception as e:
        print(f"Erreur lors du traitement de {filepath}: {e}")

def main():
    root_dir = "/Users/maximeelhaik/Documents/VIBE CODING GENERATION"
    
    # 1. Clean templates.json
    templates_path = os.path.join(root_dir, "templates.json")
    if os.path.exists(templates_path):
        process_file(templates_path)
        
    # 2. Clean all JSON files in M1
    m1_dir = os.path.join(root_dir, "M1")
    for root, dirs, files in os.walk(m1_dir):
        for file in files:
            if file.endswith('.json') and (file.startswith('FINAL_') or file.startswith('STRUCTURE_')):
                filepath = os.path.join(root, file)
                process_file(filepath)

if __name__ == "__main__":
    main()
