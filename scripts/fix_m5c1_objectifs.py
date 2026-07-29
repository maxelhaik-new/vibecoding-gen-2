import json
import urllib.request
import urllib.parse

AIRTABLE_API_KEY = "REMOVED_SECRET"
BASE_ID = "appt360zhTgDY1t4B"
TABLE_NAME = "📟 Vibecoding"

headers = {
    "Authorization": f"Bearer {AIRTABLE_API_KEY}",
    "Content-Type": "application/json"
}

patch_url = f"https://api.airtable.com/v0/{BASE_ID}/{urllib.parse.quote(TABLE_NAME)}"

# 1. Shift rec7mIAkFYoUuowbW -> N° 2, recQDlj9xhfDEUloR -> N° 3, recO35RYrPXq4N3jJ -> N° 4
shift_payload = {
    "records": [
        {"id": "rec7mIAkFYoUuowbW", "fields": {"N° leçons": 2}},
        {"id": "recQDlj9xhfDEUloR", "fields": {"N° leçons": 3}},
        {"id": "recO35RYrPXq4N3jJ", "fields": {"N° leçons": 4}}
    ]
}

req_patch = urllib.request.Request(patch_url, data=json.dumps(shift_payload).encode('utf-8'), headers=headers, method="PATCH")
with urllib.request.urlopen(req_patch) as resp:
    print("✅ Leçons 1, 2, 3 du M5C1 décalées vers 2, 3, 4.")

# 2. Create new L1 record for M5C1
l1_payload = {
    "records": [
        {
            "fields": {
                "Nom de la leçon": "Les objectifs du chapitre : Cadrer son projet certifiant & Définir le produit",
                "N° leçons": 1,
                "Type": "📺 Leçon ",
                "Module": "Module 5 : Passer en production & réussir son projet certifiant",
                "Chapitre": "Chapitre 1 : Projet final certifiant 🏆",
                "PHASE": "MVP",
                "État": "⏳ À ficher",
                "isWritten": 0
            }
        }
    ]
}

req_post = urllib.request.Request(patch_url, data=json.dumps(l1_payload).encode('utf-8'), headers=headers, method="POST")
with urllib.request.urlopen(req_post) as resp:
    data = json.loads(resp.read().decode('utf-8'))
    rec = data["records"][0]
    print(f"✅ Leçon L1 Objectifs créée avec succès pour M5C1 (ID: {rec['id']}).")
