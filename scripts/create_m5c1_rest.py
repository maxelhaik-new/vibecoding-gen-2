import os
import json
import urllib.request
import urllib.error
import urllib.parse

AIRTABLE_API_KEY = os.environ.get("AIRTABLE_API_KEY", "")
BASE_ID = "appt360zhTgDY1t4B"
TABLE_NAME = "📟 Vibecoding"

headers = {
    "Authorization": f"Bearer {AIRTABLE_API_KEY}",
    "Content-Type": "application/json"
}

# Fetch exact fields from an existing M5C1 record
url_get = f"https://api.airtable.com/v0/{BASE_ID}/{urllib.parse.quote(TABLE_NAME)}/rec1NNGhQsflcnmGw"
req_get = urllib.request.Request(url_get, headers=headers)
with urllib.request.urlopen(req_get) as resp:
    sample = json.loads(resp.read().decode('utf-8'))["fields"]

payload = {
    "records": [
        {
            "fields": {
                "Nom de la leçon": "Choisir et cadrer son application métier (Dossier de cadrage)",
                "N° leçons": 2,
                "Type": sample.get("Type"),
                "Module": sample.get("Module"),
                "Chapitre": sample.get("Chapitre"),
                "PHASE": sample.get("PHASE"),
                "État": sample.get("État")
            }
        },
        {
            "fields": {
                "Nom de la leçon": "Structurer les règles contextuelles de son projet (AGENTS.md)",
                "N° leçons": 3,
                "Type": sample.get("Type"),
                "Module": sample.get("Module"),
                "Chapitre": sample.get("Chapitre"),
                "PHASE": sample.get("PHASE"),
                "État": sample.get("État")
            }
        }
    ]
}

post_url = f"https://api.airtable.com/v0/{BASE_ID}/{urllib.parse.quote(TABLE_NAME)}"
try:
    post_req = urllib.request.Request(post_url, data=json.dumps(payload).encode('utf-8'), headers=headers, method="POST")
    with urllib.request.urlopen(post_req) as resp:
        res = json.loads(resp.read().decode('utf-8'))
        records = res.get("records", [])
        print(f"✅ {len(records)} leçons complémentaires créées avec succès dans M5C1 :")
        for r in records:
            f = r["fields"]
            print(f"   - ID: {r['id']} | N° {f.get('N° leçons')} | Nom: '{f.get('Nom de la leçon')}'")
except urllib.error.HTTPError as e:
    err_body = e.read().decode('utf-8')
    print(f"Erreur HTTP {e.code}: {err_body}")
