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

formula = "AND(FIND('Module 5', {Module}) > 0, FIND('Chapitre 1', {Chapitre}) > 0)"
url = f"https://api.airtable.com/v0/{BASE_ID}/{urllib.parse.quote(TABLE_NAME)}?filterByFormula=" + urllib.parse.quote(formula) + "&sort%5B0%5D%5Bfield%5D=N%C2%B0+le%C3%A7ons&sort%5B0%5D%5Bdirection%5D=asc"

req = urllib.request.Request(url, headers=headers)
with urllib.request.urlopen(req) as resp:
    data = json.loads(resp.read().decode('utf-8'))
    records = data.get("records", [])
    print(f"============================================================")
    print(f"  ÉTAT ACTUEL DE AIRTABLE - MODULE 5 / CHAPITRE 1 ({len(records)} LEÇONS)")
    print(f"============================================================")
    for r in records:
        f = r["fields"]
        print(f"N° {f.get('N° leçons'):<2} | ID: {r['id']} | [{f.get('Type','').strip()}] | '{f.get('Nom de la leçon')}'")
