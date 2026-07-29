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

patch_url = f"https://api.airtable.com/v0/{BASE_ID}/{urllib.parse.quote(TABLE_NAME)}"

patch_payload = {
    "records": [
        {"id": "rec9QtojTrvzd73lC", "fields": {"N° leçons": 10}}
    ]
}

req = urllib.request.Request(patch_url, data=json.dumps(patch_payload).encode('utf-8'), headers=headers, method="PATCH")
with urllib.request.urlopen(req) as resp:
    print("✅ rec9QtojTrvzd73lC passé à N° 10.")
