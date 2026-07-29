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

all_recs = fetch_all_m5()

# Group by Chapitre
by_chap = {}
for r in all_recs:
    ch = r["fields"].get("Chapitre", "SANS CHAPITRE")
    by_chap.setdefault(ch, []).append(r)

print(f"==================================================================")
print(f"BUREAU DE VÉRIFICATION AIRTABLE — MODULE 5 ({len(all_recs)} LEÇONS)")
print(f"==================================================================")

for ch_name, recs in sorted(by_chap.items()):
    print(f"\n📂 {ch_name} ({len(recs)} leçons) :")
    recs_sorted = sorted(recs, key=lambda x: (x["fields"].get("N° leçons", 99), x["fields"].get("Nom de la leçon", "")))
    for r in recs_sorted:
        f = r["fields"]
        num = f.get("N° leçons", "?")
        t = f.get("Type", "N/A")
        name = f.get("Nom de la leçon", "Sans nom")
        print(f"  - N° {num:<2} | [{t}] | {name}")
