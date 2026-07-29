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

# Fetch all records of Module 5 to get distinct Type values
url = f"https://api.airtable.com/v0/{BASE_ID}/{urllib.parse.quote(TABLE_NAME)}?filterByFormula=" + urllib.parse.quote("FIND('Module 5', {Module}) > 0")
req = urllib.request.Request(url, headers=headers)

with urllib.request.urlopen(req) as resp:
    data = json.loads(resp.read().decode('utf-8'))
    records = data.get("records", [])

types_seen = set()
for r in records:
    t = r["fields"].get("Type")
    if t:
        types_seen.add(repr(t))

print("Valeurs exactes de 'Type' trouvées dans Airtable :")
for t in types_seen:
    print(f" - {t}")
