import os
import json
import urllib.request
import urllib.parse

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

def delete_rec(rec_id):
    url = f"https://api.airtable.com/v0/{BASE_ID}/{urllib.parse.quote(TABLE_NAME)}/{rec_id}"
    req = urllib.request.Request(url, headers=headers, method="DELETE")
    with urllib.request.urlopen(req) as resp:
        pass

all_recs = fetch_all_m5()

seen = {}
to_delete = []

for r in all_recs:
    num = r["fields"].get("N° leçons", 99)
    if num < 10:
        ch = r["fields"].get("Chapitre", "")
        title = r["fields"].get("Nom de la leçon", "")
        key = (ch, title)
        if key in seen:
            to_delete.append((r["id"], title))
        else:
            seen[key] = r["id"]

print(f"Purge de {len(to_delete)} doublons résiduels...")
for rid, t in to_delete:
    delete_rec(rid)
    print(f"  🗑️ Supprimé ID {rid} : '{t}'")

print("✅ Purge terminée !")
