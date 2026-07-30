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

remaining_chapters = [
    {
        "code": "M5C4",
        "airtable_chap_name": "Chapitre 4 : La sécurité (RLS) par la faille",
        "sample_rec_id": "recjCu2YL9Sb5opyh",
        "new_lessons": [
            {"Nom de la leçon": "Les objectifs du chapitre : Authentification & Espace Membre Privé", "N° leçons": 1, "Type": "📺 Leçon "},
            {"Nom de la leçon": "Comprendre la gestion de session et l'identité utilisateur", "N° leçons": 2, "Type": "📺 Leçon "},
            {"Nom de la leçon": "Connecter la page de connexion & inscription avec l'agent IA", "N° leçons": 3, "Type": "⚙️ Logiciel"},
            {"Nom de la leçon": "Protéger les routes privées et le dashboard de l'application", "N° leçons": 4, "Type": "⚙️ Logiciel"},
            {"Nom de la leçon": "Lier les données créées dans le Front-end à l'ID utilisateur", "N° leçons": 5, "Type": "⚙️ Logiciel"}
        ]
    },
    {
        "code": "M5C5",
        "airtable_chap_name": "Chapitre 5 : Connecter le monde extérieur (API, MCP & variables d'environnement)",
        "sample_rec_id": "recURZ08Q9o3TWgMD",
        "new_lessons": [
            {"Nom de la leçon": "Les objectifs du chapitre : Sécuriser les données par la faille (RLS)", "N° leçons": 1, "Type": "📺 Leçon "},
            {"Nom de la leçon": "Démontrer la faille : accéder aux données d'un autre utilisateur", "N° leçons": 2, "Type": "⚙️ Logiciel"},
            {"Nom de la leçon": "Générer et appliquer les règles RLS SQL avec l'agent IA", "N° leçons": 3, "Type": "⚙️ Logiciel"},
            {"Nom de la leçon": "Auditer et valider l'étanchéité totale de l'application dans l'UI", "N° leçons": 4, "Type": "📝 Cas Pratique"}
        ]
    },
    {
        "code": "M5C6",
        "airtable_chap_name": "Chapitre 6 : Projet guidé : Application CRUD avec Auth & RLS",
        "sample_rec_id": "recqwczEUbjMxXtfm",
        "new_lessons": [
            {"Nom de la leçon": "Les objectifs du chapitre : Connecter le monde extérieur (API & Secrets)", "N° leçons": 1, "Type": "📺 Leçon "},
            {"Nom de la leçon": "Qu'est-ce qu'une API REST et comment l'interroger avec l'IA ?", "N° leçons": 2, "Type": "📺 Leçon "},
            {"Nom de la leçon": "Sécuriser ses clés API & secrets dans le fichier .env.local", "N° leçons": 3, "Type": "⚙️ Logiciel"},
            {"Nom de la leçon": "Brancher un service tiers au projet fil rouge (Stripe, Resend, API métier)", "N° leçons": 4, "Type": "⚙️ Logiciel"}
        ]
    },
    {
        "code": "M5C7",
        "airtable_chap_name": "À SUPP - Chapitre 6 : Projet guidé : Outil interne métier",
        "sample_rec_id": "recqoQ8YZjRStv9qN",
        "new_lessons": [
            {"Nom de la leçon": "Les objectifs du chapitre : Déploiement en production & Réussir son projet certifiant", "N° leçons": 1, "Type": "📺 Leçon "},
            {"Nom de la leçon": "Déployer en production sur Vercel avec HTTPS", "N° leçons": 2, "Type": "⚙️ Logiciel"},
            {"Nom de la leçon": "Publier le dépôt GitHub propre avec un README détaillé", "N° leçons": 3, "Type": "📺 Leçon "},
            {"Nom de la leçon": "Enregistrer la vidéo de démonstration du projet fil rouge", "N° leçons": 4, "Type": "📝 Cas Pratique"},
            {"Nom de la leçon": "Auto-évaluation sur la grille certifiante & Préparation au QCM", "N° leçons": 5, "Type": "📺 Leçon "}
        ]
    }
]

def main():
    print("==================================================================")
    print("CRÉATION DES LEÇONS POUR LES CHAPITRES 4 À 7")
    print("==================================================================")

    for c in remaining_chapters:
        code = c["code"]
        chap_name = c["airtable_chap_name"]
        sample_id = c["sample_rec_id"]
        new_lessons = c["new_lessons"]

        print(f"\n📌 Processing {code} - '{chap_name}'...")

        url_sample = f"https://api.airtable.com/v0/{BASE_ID}/{urllib.parse.quote(TABLE_NAME)}/{sample_id}"
        req_sample = urllib.request.Request(url_sample, headers=headers)
        with urllib.request.urlopen(req_sample) as resp:
            sample_fields = json.loads(resp.read().decode('utf-8'))["fields"]

        for nl in new_lessons:
            payload = {
                "records": [
                    {
                        "fields": {
                            "Nom de la leçon": nl["Nom de la leçon"],
                            "N° leçons": nl["N° leçons"],
                            "Type": nl["Type"],
                            "Module": sample_fields.get("Module"),
                            "Chapitre": sample_fields.get("Chapitre"),
                            "PHASE": sample_fields.get("PHASE", "MVP"),
                            "État": "⏳ À ficher"
                        }
                    }
                ]
            }
            req_post = urllib.request.Request(patch_url, data=json.dumps(payload).encode('utf-8'), headers=headers, method="POST")
            try:
                with urllib.request.urlopen(req_post) as resp:
                    data = json.loads(resp.read().decode('utf-8'))
                    rec_created = data["records"][0]
                    print(f"  ✅ N° {nl['N° leçons']} créé : '{nl['Nom de la leçon']}' (ID: {rec_created['id']})")
            except urllib.error.HTTPError as e:
                print(f"  ❌ Erreur sur '{nl['Nom de la leçon']}': {e.code} - {e.read().decode('utf-8')}")

    print("\n==================================================================")
    print("🎉 SUCCÈS TOTAL : LEÇONS DES CHAPITRES 4 À 7 CRÉÉES !")
    print("==================================================================")

if __name__ == "__main__":
    main()
