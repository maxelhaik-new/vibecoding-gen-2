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

# Fetch a sample record from Chapitre 2
url = f"https://api.airtable.com/v0/{BASE_ID}/{urllib.parse.quote(TABLE_NAME)}/recOeI4ayQaEcYRAz"
req = urllib.request.Request(url, headers=headers)
with urllib.request.urlopen(req) as resp:
    sample = json.loads(resp.read().decode('utf-8'))["fields"]

print("Sample fields of Chapitre 2:", json.dumps(sample, indent=2, ensure_ascii=False))

payload = {
    "records": [
        {
            "fields": {
                "Nom de la leçon": "Les objectifs du chapitre : Générer l'Interface Utilisateur (Front-end & UX)",
                "N° leçons": 1,
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
        print("SUCCÈS :", resp.read().decode('utf-8'))
except urllib.error.HTTPError as e:
    err_body = e.read().decode('utf-8')
    print(f"Erreur HTTP {e.code}: {err_body}")
