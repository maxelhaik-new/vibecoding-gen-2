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

# Filter active new lessons (N° leçons < 10)
active_recs = [r for r in all_recs if r["fields"].get("N° leçons", 99) < 10]

print("==================================================================")
print(f"AUDIT COMPLET D'UNICITÉ DES LEÇONS CRÉÉES ({len(active_recs)} LEÇONS)")
print("==================================================================")

# 1. Check title occurrences across active lessons
title_counts = {}
for r in active_recs:
    title = r["fields"].get("Nom de la leçon", "")
    ch = r["fields"].get("Chapitre", "")
    title_counts.setdefault(title, []).append((r["id"], ch, r["fields"].get("N° leçons")))

duplicates_found = False
for title, occurrences in title_counts.items():
    if len(occurrences) > 1:
        duplicates_found = True
        print(f"\n⚠️ DOUBLON DÉTECTÉ POUR : '{title}' ({len(occurrences)} occurrences)")
        for rec_id, ch, num in occurrences:
            print(f"   - ID: {rec_id} | Chapitre: '{ch}' | N° {num}")

if not duplicates_found:
    print("\n✅ AUCUN DOUBLON DE TITRE DÉTECTÉ DANS TOUT LE MODULE 5 !")

# 2. Check per-chapter sequence (N° 1 to N)
print("\n------------------------------------------------------------------")
print("VÉRIFICATION DES SÉQUENCES PAR CHAPITRE :")
print("------------------------------------------------------------------")

by_chap = {}
for r in active_recs:
    ch = r["fields"].get("Chapitre", "")
    by_chap.setdefault(ch, []).append(r)

for ch_name, recs in sorted(by_chap.items()):
    recs_sorted = sorted(recs, key=lambda x: x["fields"].get("N° leçons", 99))
    nums = [r["fields"].get("N° leçons") for r in recs_sorted]
    print(f"\n📂 {ch_name} ({len(recs_sorted)} leçons) -> N° présents: {nums}")
    for r in recs_sorted:
        f = r["fields"]
        print(f"   N° {f.get('N° leçons')} | [{f.get('Type')}] | {f.get('Nom de la leçon')}")
