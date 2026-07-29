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

# Inspect rec1NNGhQsflcnmGw to see what type Module and Chapitre fields are
url = f"https://api.airtable.com/v0/{BASE_ID}/{urllib.parse.quote(TABLE_NAME)}?maxRecords=1"
req = urllib.request.Request(url, headers=headers)
with urllib.request.urlopen(req) as resp:
    data = json.loads(resp.read().decode('utf-8'))
    rec = data["records"][0]
    print("Record sample fields:", json.dumps(rec["fields"], indent=2, ensure_ascii=False))

# Test creating 1 single record to catch 422 detail
test_payload = {
    "records": [
        {
            "fields": {
                "Nom de la leçon": "Test Leçon M5C1",
                "N° leçons": 1,
                "Type": rec["fields"].get("Type"),
                "Module": rec["fields"].get("Module"),
                "Chapitre": rec["fields"].get("Chapitre"),
                "PHASE": rec["fields"].get("PHASE"),
                "État": rec["fields"].get("État")
            }
        }
    ]
}

post_url = f"https://api.airtable.com/v0/{BASE_ID}/{urllib.parse.quote(TABLE_NAME)}"
try:
    post_req = urllib.request.Request(post_url, data=json.dumps(test_payload).encode('utf-8'), headers=headers, method="POST")
    with urllib.request.urlopen(post_req) as resp:
        print("Succès création !", resp.read().decode('utf-8'))
except urllib.error.HTTPError as e:
    err_body = e.read().decode('utf-8')
    print(f"Code d'erreur {e.code}: {err_body}")
