import os
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

# Fetch 1 record for Module 5 to test patch capability (we will update and restore the same field)
url = f"https://api.airtable.com/v0/{BASE_ID}/{urllib.parse.quote(TABLE_NAME)}?filterByFormula=" + urllib.parse.quote("FIND('Module 5', {Module}) > 0")
req = urllib.request.Request(url, headers=headers)
try:
    with urllib.request.urlopen(req) as resp:
        data = json.loads(resp.read().decode('utf-8'))
        records = data.get("records", [])
        print(f"Trouvé {len(records)} enregistrements pour Module 5.")
        if records:
            rec = records[0]
            rec_id = rec["id"]
            current_nom = rec["fields"].get("Nom de la leçon")
            print(f"Test de mise à jour sur le record {rec_id} (Nom actuel: '{current_nom}')...")
            
            # Patch request with same data to test write permission
            patch_url = f"https://api.airtable.com/v0/{BASE_ID}/{urllib.parse.quote(TABLE_NAME)}"
            patch_payload = {
                "records": [
                    {
                        "id": rec_id,
                        "fields": {
                            "Nom de la leçon": current_nom
                        }
                    }
                ]
            }
            patch_data = json.dumps(patch_payload).encode('utf-8')
            patch_req = urllib.request.Request(patch_url, data=patch_data, headers=headers, method="PATCH")
            with urllib.request.urlopen(patch_req) as patch_resp:
                res = json.loads(patch_resp.read().decode('utf-8'))
                print("ACCÈS EN ÉCRITURE CONFIRMÉ AVEC SUCCÈS !")
except Exception as e:
    print(f"Erreur d'accès : {e}")
