import json
from pathlib import Path

def main():
    templates_path = Path("/Users/maximeelhaik/Documents/VIBE CODING GENERATION/templates.json")
    
    with open(templates_path, "r", encoding="utf-8") as f:
        templates = json.load(f)
        
    updated_count = 0
    
    for t in templates:
        if t["name"] == "VIBECODING - CHECKLIST":
            t["text_layers"] = [
                {
                    "key": "Texte Intro",
                    "original_placeholder": "Une stratégie qui n'est pas passée \npar le filtre de votre esprit critique \nest une stratégie morte-née. \nL'IA génère du volume et la création rapide, vous devez rester maître des choix en connaissant les riques.",
                    "target_lenght": 212,
                    "min_lenght": 148,
                    "max_lenght": 276
                },
                {
                    "key": "Intro",
                    "original_placeholder": "L'IA est un assistant \nde création, \npas un conseiller\nstratégique.",
                    "target_lenght": 67,
                    "min_lenght": 46,
                    "max_lenght": 88
                },
                {
                    "key": "Titre",
                    "original_placeholder": "La posture à adopter pour la stratégie",
                    "target_lenght": 38,
                    "min_lenght": 26,
                    "max_lenght": 50
                },
                {
                    "key": "Texte 5",
                    "original_placeholder": "Vérifier chaque chiffre cité par l'outil.",
                    "target_lenght": 41,
                    "min_lenght": 28,
                    "max_lenght": 54
                },
                {
                    "key": "Texte 4",
                    "original_placeholder": "Vérifier chaque chiffre cité par l'outil.",
                    "target_lenght": 41,
                    "min_lenght": 28,
                    "max_lenght": 54
                },
                {
                    "key": "Texte 3",
                    "original_placeholder": "Vérifier chaque chiffre cité par l'outil.",
                    "target_lenght": 41,
                    "min_lenght": 28,
                    "max_lenght": 54
                },
                {
                    "key": "Texte 2",
                    "original_placeholder": "Vérifier chaque chiffre cité par l'outil.",
                    "target_lenght": 41,
                    "min_lenght": 28,
                    "max_lenght": 54
                },
                {
                    "key": "Texte 1",
                    "original_placeholder": "Vérifier chaque chiffre cité par l'outil.",
                    "target_lenght": 41,
                    "min_lenght": 28,
                    "max_lenght": 54
                },
                {
                    "key": "Nom Checklist",
                    "original_placeholder": "Checklist de validation",
                    "target_lenght": 23,
                    "min_lenght": 16,
                    "max_lenght": 35
                }
            ]
            t["picto_layers"] = [
                {"key": "Picto 1", "original_placeholder": "mdi:check-decagram"},
                {"key": "Picto 2", "original_placeholder": "mdi:check-decagram"},
                {"key": "Picto 3", "original_placeholder": "mdi:check-decagram"},
                {"key": "Picto 4", "original_placeholder": "mdi:check-decagram"},
                {"key": "Picto 5", "original_placeholder": "mdi:check-decagram"}
            ]
            updated_count += 1
            print("Successfully updated VIBECODING - CHECKLIST in templates.json")
            
        elif t["name"] == "VIBECODING - CHIFFRES":
            # Let's rebuild the text_layers for VIBECODING - CHIFFRES
            # Order: Texte 3, Titre 3, Chiffre 3, Texte 2, Titre 2, Chiffre 2, Texte 1, Titre 1, Chiffre 1, Titre, Intro
            t["text_layers"] = [
                {
                    "key": "Texte 3",
                    "original_placeholder": "Utilisateurs actifs \nqui créent quotidiennement \nsur la plateforme OpenAI.",
                    "target_lenght": 74,
                    "min_lenght": 51,
                    "max_lenght": 97
                },
                {
                    "key": "Titre 3",
                    "original_placeholder": "SECONDES",
                    "target_lenght": 8,
                    "min_lenght": 5,
                    "max_lenght": 12
                },
                {
                    "key": "Chiffre 3",
                    "original_placeholder": "12M",
                    "target_lenght": 3,
                    "min_lenght": 1,
                    "max_lenght": 4
                },
                {
                    "key": "Texte 2",
                    "original_placeholder": "Utilisateurs actifs \nqui créent quotidiennement \nsur la plateforme OpenAI.",
                    "target_lenght": 74,
                    "min_lenght": 51,
                    "max_lenght": 97
                },
                {
                    "key": "Titre 2",
                    "original_placeholder": "GPT IMAGE",
                    "target_lenght": 9,
                    "min_lenght": 6,
                    "max_lenght": 14
                },
                {
                    "key": "Chiffre 2",
                    "original_placeholder": "75%",
                    "target_lenght": 3,
                    "min_lenght": 1,
                    "max_lenght": 4
                },
                {
                    "key": "Texte 1",
                    "original_placeholder": "Utilisateurs actifs \nqui créent quotidiennement \nsur la plateforme OpenAI.",
                    "target_lenght": 74,
                    "min_lenght": 51,
                    "max_lenght": 97
                },
                {
                    "key": "Titre 1",
                    "original_placeholder": "M D’utilisateurs",
                    "target_lenght": 16,
                    "min_lenght": 11,
                    "max_lenght": 24
                },
                {
                    "key": "Chiffre 1",
                    "original_placeholder": "10x",
                    "target_lenght": 3,
                    "min_lenght": 1,
                    "max_lenght": 4
                },
                {
                    "key": "Titre",
                    "original_placeholder": "GPT Image en quelques chiffres",
                    "target_lenght": 30,
                    "min_lenght": 21,
                    "max_lenght": 39
                },
                {
                    "key": "Intro",
                    "original_placeholder": "Pour un candidat qui postule, l’enjeu est important et la tâche complexe. Il doit comprendre les attentes du recruteur.",
                    "target_lenght": 119,
                    "min_lenght": 83,
                    "max_lenght": 155
                }
            ]
            updated_count += 1
            print("Successfully updated VIBECODING - CHIFFRES in templates.json")
            
    if updated_count == 2:
        with open(templates_path, "w", encoding="utf-8") as f:
            json.dump(templates, f, ensure_ascii=False, indent=2)
        print("templates.json file updated successfully!")
    else:
        print(f"Error: Only updated {updated_count} templates.")

if __name__ == "__main__":
    main()
