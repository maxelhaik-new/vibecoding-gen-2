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

# 1. Fetch current 5 records of M5C1
formula = "AND(FIND('Module 5', {Module}) > 0, FIND('Chapitre 1', {Chapitre}) > 0)"
url = f"https://api.airtable.com/v0/{BASE_ID}/{urllib.parse.quote(TABLE_NAME)}?filterByFormula=" + urllib.parse.quote(formula)

req = urllib.request.Request(url, headers=headers)
with urllib.request.urlopen(req) as resp:
    data = json.loads(resp.read().decode('utf-8'))
    existing_records = data.get("records", [])

print(f"--- 1. MISE À JOUR DES {len(existing_records)} LEÇONS EXISTANTES DU M5C1 VERS LE N° 10 ---")
patch_payload = {
    "records": [
        {
            "id": r["id"],
            "fields": {
                "N° leçons": 10
            }
        } for r in existing_records
    ]
}

patch_url = f"https://api.airtable.com/v0/{BASE_ID}/{urllib.parse.quote(TABLE_NAME)}"
patch_req = urllib.request.Request(patch_url, data=json.dumps(patch_payload).encode('utf-8'), headers=headers, method="PATCH")

with urllib.request.urlopen(patch_req) as resp:
    res = json.loads(resp.read().decode('utf-8'))
    print(f"✅ {len(res.get('records', []))} leçons existantes réorientées vers le N° 10 à la fin du chapitre.")

print("\n--- 2. CRÉATION DES 3 NOUVELLES LEÇONS DU M5C1 DE LA NOUVELLE ARCHITECTURE ---")
new_lessons = [
    {
        "fields": {
            "Nom de la leçon": "Découvrir le projet fil rouge & les exigences de la certification",
            "N° leçons": 1,
            "Type": "📺 Leçon ",
            "Module": "Module 5 : Passer en production & réussir son projet certifiant",
            "Chapitre": "Chapitre 1 : Projet final certifiant 🏆",
            "PHASE": "MVP",
            "État": "⏳ À ficher",
            "isWritten": 0
        }
    },
    {
        "fields": {
            "Nom de la leçon": "Choisir et cadrer son application métier (Dossier de cadrage)",
            "N° leçons": 2,
            "Type": "📺 Leçon ",
            "Module": "Module 5 : Passer en production & réussir son projet certifiant",
            "Chapitre": "Chapitre 1 : Projet final certifiant 🏆",
            "PHASE": "MVP",
            "État": "⏳ À ficher",
            "isWritten": 0
        }
    },
    {
        "fields": {
            "Nom de la leçon": "Structurer les règles contextuelles de son projet (AGENTS.md)",
            "N° leçons": 3,
            "Type": "📺 Leçon ",
            "Module": "Module 5 : Passer en production & réussir son projet certifiant",
            "Chapitre": "Chapitre 1 : Projet final certifiant 🏆",
            "PHASE": "MVP",
            "État": "⏳ À ficher",
            "isWritten": 0
        }
    }
]

post_payload = {"records": new_lessons}
post_req = urllib.request.Request(patch_url, data=json.dumps(post_payload).encode('utf-8'), headers=headers, method="POST")

with urllib.request.urlopen(post_req) as resp:
    res_post = json.loads(resp.read().decode('utf-8'))
    created = res_post.get("records", [])
    print(f"✅ {len(created)} nouvelles leçons créées avec succès dans M5C1 :")
    for c in created:
        f = c["fields"]
        print(f"   - ID: {c['id']} | N° {f['N° leçons']} | {f['Nom de la leçon']}")
