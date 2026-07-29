import json
import urllib.request
import urllib.error
import urllib.parse

AIRTABLE_API_KEY = "REMOVED_SECRET"
BASE_ID = "appt360zhTgDY1t4B"
TABLE_NAME = "📟 Vibecoding"

headers = {
    "Authorization": f"Bearer {AIRTABLE_API_KEY}",
    "Content-Type": "application/json"
}

# Copy exact fields from existing M5C1 record rec1NNGhQsflcnmGw
url_get = f"https://api.airtable.com/v0/{BASE_ID}/{urllib.parse.quote(TABLE_NAME)}/rec1NNGhQsflcnmGw"
req_get = urllib.request.Request(url_get, headers=headers)
with urllib.request.urlopen(req_get) as resp:
    sample = json.loads(resp.read().decode('utf-8'))["fields"]

payload = {
    "records": [
        {
            "fields": {
                "Nom de la leçon": "Découvrir le projet fil rouge & les exigences de la certification",
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
        print("SUCCÈS CRÉATION M5C1 :", resp.read().decode('utf-8'))
except urllib.error.HTTPError as e:
    err_body = e.read().decode('utf-8')
    print(f"Erreur HTTP {e.code}: {err_body}")
