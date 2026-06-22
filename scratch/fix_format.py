import json

with open("scratch/figma_node_data.json", "r", encoding="utf-8") as f:
    data = json.load(f)

node_id = "460:1423"
document = data.get("nodes", {}).get(node_id, {}).get("document", {})

def extract_texts(node):
    texts = []
    if node.get("type") == "TEXT":
        chars = node.get("characters", "").strip()
        style = node.get("style", {})
        bounds = node.get("absoluteBoundingBox", {}) or {"x": 0, "y": 0}
        font_size = style.get("fontSize", 0)
        font_weight = style.get("fontWeight", 400)
        if chars:
            texts.append({
                "text": chars,
                "fontSize": font_size,
                "fontWeight": font_weight,
                "y": bounds.get("y", 0),
                "x": bounds.get("x", 0)
            })
    for child in node.get("children", []):
        texts.extend(extract_texts(child))
    return texts

output = ["# Retranscription des Exemples de Slides d'Introduction (Figma)\n", 
          "Ce document compile la retranscription textuelle des slides d'introduction extraites du nœud Figma `460:1423`. Ces exemples servent de référence pour la structure et la charte d'écriture des templates d'introduction (`VIBECODING - INTRO`).\n",
          "---\n"]

slides = document.get("children", [])
for i, slide in enumerate(slides, 1):
    output.append(f"## Slide {i} : {slide.get('name')}")
    
    texts = extract_texts(slide)
    # Sort texts primarily by roughly Y coordinate (grouping same lines), then by X coordinate
    texts.sort(key=lambda t: (round(t['y']/20)*20, t['x']))
    
    output.append("\n### Textes :")
    for t in texts:
        text_content = t['text'].replace('\n', ' ')
        # Label based on font size roughly
        label = "Texte"
        if t['fontSize'] >= 60:
            label = "Titre principal"
        elif t['fontSize'] >= 35:
            label = "Titre de bloc"
        elif t['fontSize'] <= 25:
            label = "Légende / Source"
            
        output.append(f"*   **{label}** ({t['fontSize']}px): {text_content}")
    
    output.append("\n---\n")

with open("retranscription_intros_explorees.md", "w", encoding="utf-8") as f:
    f.write("\n".join(output))

print("Fixed formatting.")
