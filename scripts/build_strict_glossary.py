import glob
import json
import os

# 100% Strict Parsing of local FINAL_*.json lesson files in M1-M4
json_files = sorted(glob.glob("M[1-4]/**/FINAL_*.json", recursive=True))

verified_lessons = []
for fpath in json_files:
    if "CLAUDE" in fpath or "GEMINI" in fpath:
        continue
    try:
        with open(fpath, "r", encoding="utf-8") as f:
            data = json.load(f)
            if isinstance(data, list):
                continue
            slug = data.get("lessonSlug", "").upper()
            title = data.get("lessonTitle", "") or slug
            slides = data.get("slides", [])
            verified_lessons.append({
                "file": fpath,
                "slug": slug,
                "title": title,
                "slides": slides
            })
    except Exception as e:
        pass

print(f"Loaded {len(verified_lessons)} strict lesson JSON files.")

all_terms = []

for les in verified_lessons:
    code_title = f"{les['slug']} — {les['title']}" if les['slug'] not in les['title'] else les['title']
    
    for slide in les["slides"]:
        if not isinstance(slide, dict):
            continue
        template = slide.get("template", "")
        content = slide.get("content", {})
        if not isinstance(content, dict):
            continue
            
        # Extract explicit definition templates
        concept_val = content.get("Concept", "") or content.get("Titre 1", "") or content.get("Titre", "")
        texte_val = content.get("Texte", "") or content.get("Intro", "") or content.get("Texte 1", "") or content.get("Définition", "")
        
        if any(t in template for t in ["DEFINITION", "CONCEPT", "4 BLOCS", "INTRO", "DUO", "EXPLICATION"]):
            if isinstance(concept_val, str) and isinstance(texte_val, str):
                if len(concept_val) > 2 and len(texte_val) > 15 and not concept_val.startswith("M") and not "objectif" in concept_val.lower():
                    clean_def = texte_val.replace("\n", " ").strip()
                    all_terms.append({
                        "mot": concept_val.strip(),
                        "statut": "Défini",
                        "definition": clean_def,
                        "ref": code_title,
                        "template": template
                    })

print(f"Extracted {len(all_terms)} strict terms directly from JSON slide contents.")

# Clean and deduplicate by 'mot'
dedup = {}
for item in all_terms:
    m = item["mot"]
    if m not in dedup:
        dedup[m] = item

sorted_keys = sorted(dedup.keys(), key=lambda x: x.lstrip(".").lower())

md_lines = []
md_lines.append("# 📚 Glossaire Strict (100% Extrait des JSONs Locaux M1-M4)")
md_lines.append("\nCe glossaire contient uniquement les termes présentés et définis dans les diapositives des fichiers `FINAL_*.json` des Modules 1 à 4.\n")
md_lines.append("| Mot / Concept | Statut | Définition | Référence de la leçon (JSON Local) |")
md_lines.append("| :--- | :--- | :--- | :--- |")

for k in sorted_keys:
    it = dedup[k]
    mot_val = it['mot']
    stat_val = it['statut']
    def_val = it['definition']
    ref_val = it['ref']
    md_lines.append(f"| **{mot_val}** | `{stat_val}` | {def_val} | {ref_val} |")

target_path = "/Users/maximeelhaik/Documents/VIBE CODING GENERATION/glossaire_formation_vibe_coding.md"
with open(target_path, "w", encoding="utf-8") as f:
    f.write("\n".join(md_lines))

print(f"✅ glossaire_formation_vibe_coding.md mis à jour avec {len(dedup)} termes 100% authentiques.")
