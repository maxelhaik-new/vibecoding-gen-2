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

# Fetch sample record from M5C1
url_get = f"https://api.airtable.com/v0/{BASE_ID}/{urllib.parse.quote(TABLE_NAME)}/rec7mIAkFYoUuowbW"
req_get = urllib.request.Request(url_get, headers=headers)
with urllib.request.urlopen(req_get) as resp:
    sample = json.loads(resp.read().decode('utf-8'))["fields"]

l1_payload = {
    "records": [
        {
            "fields": {
                "Nom de la leçon": "Les objectifs du chapitre : Cadrer son projet certifiant & Définir le produit",
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
    post_req = urllib.request.Request(post_url, data=json.dumps(l1_payload).encode('utf-8'), headers=headers, method="POST")
    with urllib.request.urlopen(post_req) as resp:
        print("SUCCÈS :", resp.read().decode('utf-8'))
except urllib.error.HTTPError as e:
    print(f"Erreur HTTP {e.code}: {e.read().decode('utf-8')}")
