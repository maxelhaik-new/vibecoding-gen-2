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

# Fetch records for Chapitre 1
formula = "FIND('Chapitre 1', {Chapitre}) > 0"
url = f"https://api.airtable.com/v0/{BASE_ID}/{urllib.parse.quote(TABLE_NAME)}?filterByFormula=" + urllib.parse.quote(formula)

req = urllib.request.Request(url, headers=headers)
with urllib.request.urlopen(req) as resp:
    data = json.loads(resp.read().decode('utf-8'))
    records = data.get("records", [])
    print(f"Trouvé {len(records)} leçons existantes dans Chapitre 1 :")
    for r in records:
        f = r["fields"]
        print(f"ID: {r['id']} | N°: {f.get('N° leçons')} | Nom: '{f.get('Nom de la leçon')}' | Chapitre: '{f.get('Chapitre')}' | Type: '{f.get('Type')}'")
