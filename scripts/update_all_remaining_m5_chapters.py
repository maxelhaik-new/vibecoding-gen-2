import os
import json
import urllib.request
import urllib.parse
import urllib.error

AIRTABLE_API_KEY = os.environ.get("AIRTABLE_API_KEY", "")
BASE_ID = "appt360zhTgDY1t4B"
TABLE_NAME = "📟 Vibecoding"

headers = {
    "Authorization": f"Bearer {AIRTABLE_API_KEY}",
    "Content-Type": "application/json"
}

patch_url = f"https://api.airtable.com/v0/{BASE_ID}/{urllib.parse.quote(TABLE_NAME)}"
MODULE_NAME = "Module 5 : Passer en production & réussir son projet certifiant"

# Full 7-chapter mapping for Airtable
chapters_data = [
    {
        "chap_code": "M5C2",
        "airtable_chap_name": "Chapitre 2 : Concevoir le backend & l'architecture",
        "existing_rec_ids": ["recOeI4ayQaEcYRAz", "recVMS2n1fjjmaFR3", "recJilKoRIHeJQuNd", "recvetyO0PpklbFBg", "rec5qVQuGkUshHbxY", "rec2cJnKJGs1fX7yv"],
        "new_lessons": [
            {"Nom de la leçon": "Les objectifs du chapitre : Générer l'Interface Utilisateur (Front-end & UX)", "N° leçons": 1, "Type": "📺 Leçon "},
            {"Nom de la leçon": "Générer la structure et le design system de l'application", "N° leçons": 2, "Type": "⚙️ Logiciel"},
            {"Nom de la leçon": "Créer les composants UI métier (Tableaux, Formulaires, Cartes)", "N° leçons": 3, "Type": "⚙️ Logiciel"},
            {"Nom de la leçon": "Itérer sur l'ergonomie visuelle et corriger les bugs de style", "N° leçons": 4, "Type": "⚙️ Logiciel"},
            {"Nom de la leçon": "Rendre l'interface dynamique et réactive en Front-end", "N° leçons": 5, "Type": "⚙️ Logiciel"}
        ]
    },
    {
        "chap_code": "M5C3",
        "airtable_chap_name": "Chapitre 3 : Gérer l'authentification des utilisateurs",
        "existing_rec_ids": ["recMjHMYMFxGPI51H", "recWGVADb4H15JCUG", "recU6aD5Q1xujacTs", "rechDgMixJR0t7y1a", "recn72rD50f37HJaJ"],
        "new_lessons": [
            {"Nom de la leçon": "Les objectifs du chapitre : Connecter la base de données Cloud (Supabase BaaS)", "N° leçons": 1, "Type": "📺 Leçon "},
            {"Nom de la leçon": "Front-end vs Back-end : pourquoi le navigateur ne suffit plus ?", "N° leçons": 2, "Type": "📺 Leçon "},
            {"Nom de la leçon": "Créer et configurer son projet Supabase", "N° leçons": 3, "Type": "⚙️ Logiciel"},
            {"Nom de la leçon": "Structurer les tables SQL du projet fil rouge avec l'agent IA", "N° leçons": 4, "Type": "⚙️ Logiciel"},
            {"Nom de la leçon": "Connecter les formulaires Front-end à la base de données", "N° leçons": 5, "Type": "⚙️ Logiciel"}
        ]
    },
    {
        "chap_code": "M5C4",
        "airtable_chap_name": "Chapitre 4 : La sécurité (RLS) par la faille",
        "existing_rec_ids": ["recjCu2YL9Sb5opyh", "recY26EoUAoI9uG3u", "recRJJ11UmzYnIjQL", "rec3V6SzMOotWkEyP", "rec9VqnXZ8MNzi2Je"],
        "new_lessons": [
            {"Nom de la leçon": "Les objectifs du chapitre : Authentification & Espace Membre Privé", "N° leçons": 1, "Type": "📺 Leçon "},
            {"Nom de la leçon": "Comprendre la gestion de session et l'identité utilisateur", "N° leçons": 2, "Type": "📺 Leçon "},
            {"Nom de la leçon": "Connecter la page de connexion & inscription avec l'agent IA", "N° leçons": 3, "Type": "⚙️ Logiciel"},
            {"Nom de la leçon": "Protéger les routes privées et le dashboard de l'application", "N° leçons": 4, "Type": "⚙️ Logiciel"},
            {"Nom de la leçon": "Lier les données créées dans le Front-end à l'ID utilisateur", "N° leçons": 5, "Type": "⚙️ Logiciel"}
        ]
    },
    {
        "chap_code": "M5C5",
        "airtable_chap_name": "Chapitre 5 : Connecter le monde extérieur (API, MCP & variables d'environnement)",
        "existing_rec_ids": ["recURZ08Q9o3TWgMD", "rect384FGbnqvD6cN", "recK5pVXl4l23Cp1x", "reciYoUfh6ervGob5", "recfSIpvaH5DX72Fe", "recquaeeBRwxBMRt9"],
        "new_lessons": [
            {"Nom de la leçon": "Les objectifs du chapitre : Sécuriser les données par la faille (RLS)", "N° leçons": 1, "Type": "📺 Leçon "},
            {"Nom de la leçon": "Démontrer la faille : accéder aux données d'un autre utilisateur", "N° leçons": 2, "Type": "⚙️ Logiciel"},
            {"Nom de la leçon": "Générer et appliquer les règles RLS SQL avec l'agent IA", "N° leçons": 3, "Type": "⚙️ Logiciel"},
            {"Nom de la leçon": "Auditer et valider l'étanchéité totale de l'application dans l'UI", "N° leçons": 4, "Type": "📝 Cas Pratique"}
        ]
    },
    {
        "chap_code": "M5C6",
        "airtable_chap_name": "Chapitre 6 : Projet guidé : Application CRUD avec Auth & RLS",
        "existing_rec_ids": ["recqwczEUbjMxXtfm", "recAq6odgAsZw5tzI", "rec3SOJw4q1bs2gcX", "recUINxvO61Mtr85Y", "recBzMuYAECesXN21"],
        "new_lessons": [
            {"Nom de la leçon": "Les objectifs du chapitre : Connecter le monde extérieur (API & Secrets)", "N° leçons": 1, "Type": "📺 Leçon "},
            {"Nom de la leçon": "Qu'est-ce qu'une API REST et comment l'interroger avec l'IA ?", "N° leçons": 2, "Type": "📺 Leçon "},
            {"Nom de la leçon": "Sécuriser ses clés API & secrets dans le fichier .env.local", "N° leçons": 3, "Type": "⚙️ Logiciel"},
            {"Nom de la leçon": "Brancher un service tiers au projet fil rouge (Stripe, Resend, API métier)", "N° leçons": 4, "Type": "⚙️ Logiciel"}
        ]
    },
    {
        "chap_code": "M5C7",
        "airtable_chap_name": "À SUPP - Chapitre 6 : Projet guidé : Outil interne métier",
        "existing_rec_ids": ["recqoQ8YZjRStv9qN", "recrBKOCdzKxY1dEY", "recFWGOFBi4sZordt", "rec396l9XsaJlqmLc", "recW2fpO9dlqynTPW"],
        "new_lessons": [
            {"Nom de la leçon": "Les objectifs du chapitre : Déploiement en production & Réussir son projet certifiant", "N° leçons": 1, "Type": "📺 Leçon "},
            {"Nom de la leçon": "Déployer en production sur Vercel avec HTTPS", "N° leçons": 2, "Type": "⚙️ Logiciel"},
            {"Nom de la leçon": "Publier le dépôt GitHub propre avec un README détaillé", "N° leçons": 3, "Type": "📺 Leçon "},
            {"Nom de la leçon": "Enregistrer la vidéo de démonstration du projet fil rouge", "N° leçons": 4, "Type": "📝 Cas Pratique"},
            {"Nom de la leçon": "Auto-évaluation sur la grille certifiante & Préparation au QCM", "N° leçons": 5, "Type": "📺 Leçon "}
        ]
    }
]

def run_update():
    print("==================================================================")
    print("EXÉCUTION DE LA MISE À JOUR AIRTABLE POUR LES CHAPITRES 2 À 7")
    print("==================================================================")
    
    for c in chapters_data:
        chap_name = c["airtable_chap_name"]
        existing_ids = c["existing_rec_ids"]
        new_less = c["new_lessons"]
        
        print(f"\n📌 Traitement de : '{chap_name}'...")
        
        # 1. Update existing records N° to 10
        if existing_ids:
            patch_payload = {
                "records": [
                    {
                        "id": rec_id,
                        "fields": {
                            "N° leçons": 10
                        }
                    } for rec_id in existing_ids
                ]
            }
            req_patch = urllib.request.Request(patch_url, data=json.dumps(patch_payload).encode('utf-8'), headers=headers, method="PATCH")
            with urllib.request.urlopen(req_patch) as resp:
                print(f"  ✅ {len(existing_ids)} leçons existantes réorientées vers le N° 10.")

        # 2. Create new lessons
        records_to_create = []
        for nl in new_less:
            records_to_create.append({
                "fields": {
                    "Nom de la leçon": nl["Nom de la leçon"],
                    "N° leçons": nl["N° leçons"],
                    "Type": nl["Type"],
                    "Module": MODULE_NAME,
                    "Chapitre": chap_name,
                    "PHASE": "MVP",
                    "État": "⏳ À ficher",
                    "isWritten": 0
                }
            })
            
        req_post = urllib.request.Request(patch_url, data=json.dumps(records_to_create).encode('utf-8'), headers=headers, method="POST")
        with urllib.request.urlopen(post_req) if False else urllib.request.urlopen(req_post) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            print(f"  ✅ {len(data.get('records', []))} nouvelles leçons créées.")

    print("\n==================================================================")
    print("🎉 MISE À JOUR AIRTABLE DU MODULE 5 TERMINÉE AVEC SUCCÈS !")
    print("==================================================================")

if __name__ == "__main__":
    run_update()
