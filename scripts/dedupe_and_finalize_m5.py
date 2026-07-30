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

def fetch_all_m5():
    records = []
    offset = None
    while True:
        url = f"https://api.airtable.com/v0/{BASE_ID}/{urllib.parse.quote(TABLE_NAME)}?filterByFormula=" + urllib.parse.quote("FIND('Module 5', {Module}) > 0")
        if offset:
            url += f"&offset={offset}"
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            records.extend(data.get("records", []))
            offset = data.get("offset")
            if not offset:
                break
    return records

def delete_record(rec_id):
    url = f"https://api.airtable.com/v0/{BASE_ID}/{urllib.parse.quote(TABLE_NAME)}/{rec_id}"
    req = urllib.request.Request(url, headers=headers, method="DELETE")
    with urllib.request.urlopen(req) as resp:
        pass

def main():
    print("==================================================================")
    print("NETTOYAGE DES DOUBLONS & FINALISATION DU CHAPITRE 7")
    print("==================================================================")

    all_recs = fetch_all_m5()

    # 1. Deduplicate new lessons N° 1..5 across all chapters
    by_chap_title = {}
    for r in all_recs:
        ch = r["fields"].get("Chapitre", "")
        num = r["fields"].get("N° leçons", 99)
        title = r["fields"].get("Nom de la leçon", "")
        if num < 10:
            key = (ch, title)
            by_chap_title.setdefault(key, []).append(r["id"])

    deleted_count = 0
    for key, ids in by_chap_title.items():
        if len(ids) > 1:
            # keep first, delete rest
            for delete_id in ids[1:]:
                delete_record(delete_id)
                deleted_count += 1
                print(f"  🗑️ Doublon supprimé : {key[1]} (ID: {delete_id})")

    print(f"\n✅ {deleted_count} doublons supprimés.")

    # 2. Create Chapitre 7 lessons if not already present
    c7_lessons = [
        {"Nom de la leçon": "Les objectifs du chapitre : Déploiement en production & Réussir son projet certifiant", "N° leçons": 1, "Type": "📺 Leçon "},
        {"Nom de la leçon": "Déployer en production sur Vercel avec HTTPS", "N° leçons": 2, "Type": "⚙️ Logiciel"},
        {"Nom de la leçon": "Publier le dépôt GitHub propre avec un README détaillé", "N° leçons": 3, "Type": "📺 Leçon "},
        {"Nom de la leçon": "Enregistrer la vidéo de démonstration du projet fil rouge", "N° leçons": 4, "Type": "📝 Cas Pratique"},
        {"Nom de la leçon": "Auto-évaluation sur la grille certifiante & Préparation au QCM", "N° leçons": 5, "Type": "📺 Leçon "}
    ]

    c7_sample_id = "recqoQ8YZjRStv9qN"
    url_sample = f"https://api.airtable.com/v0/{BASE_ID}/{urllib.parse.quote(TABLE_NAME)}/{c7_sample_id}"
    req_sample = urllib.request.Request(url_sample, headers=headers)
    with urllib.request.urlopen(req_sample) as resp:
        sample_fields = json.loads(resp.read().decode('utf-8'))["fields"]

    all_recs = fetch_all_m5()
    c7_recs = [r for r in all_recs if r["fields"].get("Chapitre") == "À SUPP - Chapitre 6 : Projet guidé : Outil interne métier"]
    existing_c7_titles = {r["fields"].get("Nom de la leçon") for r in c7_recs}

    patch_url = f"https://api.airtable.com/v0/{BASE_ID}/{urllib.parse.quote(TABLE_NAME)}"
    for nl in c7_lessons:
        if nl["Nom de la leçon"] in existing_c7_titles:
            print(f"  ℹ️ Leçon C7 déjà présente : '{nl['Nom de la leçon']}'")
            continue

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
        with urllib.request.urlopen(req_post) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            rec_created = data["records"][0]
            print(f"  ✅ C7 N° {nl['N° leçons']} créé : '{nl['Nom de la leçon']}' (ID: {rec_created['id']})")

    print("\n==================================================================")
    print("🎉 SUCCÈS NETTOYAGE ET FINALISATION C7 TERMINÉS !")
    print("==================================================================")

if __name__ == "__main__":
    main()
