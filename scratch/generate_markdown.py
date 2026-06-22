import json

with open("scratch/figma_node_data.json", "r", encoding="utf-8") as f:
    data = json.load(f)

node_id = "460:1423"
document = data.get("nodes", {}).get(node_id, {}).get("document", {})

def extract_texts(node):
    texts = []
    if node.get("type") == "TEXT":
        chars = node.get("characters", "").strip()
        if chars:
            texts.append((node.get("name"), chars))
    for child in node.get("children", []):
        texts.extend(extract_texts(child))
    return texts

output = ["# Retranscription des Exemples de Slides d'Introduction (Figma)\n", 
          "Ce document compile la retranscription textuelle des slides d'introduction extraites du nœud Figma `460:1423`. Ces exemples servent de référence pour la structure et la charte d'écriture des templates d'introduction (`VIBECODING - INTRO`).\n",
          "---\n"]

slides = document.get("children", [])
for i, slide in enumerate(slides, 1):
    output.append(f"## Slide {i} : {slide.get('name')}")
    output.append("**Template Figma associé :** `INTRO` (ou similaire)")
    output.append("\n### Champs de texte et contenu :")
    
    texts = extract_texts(slide)
    for name, text in texts:
        text = text.replace('\n', ' ')
        output.append(f"*   **{name}** : `{text}`")
    
    output.append("\n---\n")

with open("retranscription_intros_explorees.md", "w", encoding="utf-8") as f:
    f.write("\n".join(output))

print("Successfully generated markdown for all slides.")
