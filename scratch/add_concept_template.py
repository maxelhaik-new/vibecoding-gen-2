import json

template_file = "/Users/maximeelhaik/Documents/VIBE CODING GENERATION/templates.json"

new_template = {
  "name": "VIBECODING - CONCEPT",
  "status": "validé",
  "description": "Template pour slide de type vibecoding - concept.",
  "text_layers": [
    {
      "key": "Titre",
      "original_placeholder": "Nom de concept pour commencer",
      "target_lenght": 29,
      "min_lenght": 20,
      "max_lenght": 44
    },
    {
      "key": "Intro",
      "original_placeholder": "Ici on peut trouver une phrase importante qui résume le concept.",
      "target_lenght": 64,
      "min_lenght": 45,
      "max_lenght": 83
    },
    {
      "key": "Texte 1",
      "original_placeholder": "Le New York Times a poursuivi OpenAI et Microsoft en justice pour une raison simple mais explosive : OpenAI a utilisé des millions d'articles du journal (enquêtes, analyses, archives) pour entraîner ChatGPT, sans demander l'autorisation ni payer de licence. Le problème ? Maintenant, ChatGPT peut générer des résumés d'actualités ou des textes similaires aux articles originaux, sans renvoyer vers le NYT et sans partager de revenus. ",
      "target_lenght": 382,
      "min_lenght": 267,
      "max_lenght": 497
    }
  ]
}

try:
    with open(template_file, "r", encoding="utf-8") as f:
        templates = json.load(f)
    
    # Check if already exists, if so update it
    exists = False
    for idx, t in enumerate(templates):
        if t["name"] == "VIBECODING - CONCEPT":
            templates[idx] = new_template
            exists = True
            break
            
    if not exists:
        templates.append(new_template)
        
    with open(template_file, "w", encoding="utf-8") as f:
        json.dump(templates, f, indent=2, ensure_ascii=False)
        
    print("VIBECODING - CONCEPT template successfully integrated in templates.json")
except Exception as e:
    print(f"Error: {e}")
