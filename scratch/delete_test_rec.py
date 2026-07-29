import json
import urllib.request
import urllib.parse

AIRTABLE_API_KEY = "REMOVED_SECRET"
BASE_ID = "appt360zhTgDY1t4B"
TABLE_NAME = "📟 Vibecoding"

headers = {
    "Authorization": f"Bearer {AIRTABLE_API_KEY}"
}

rec_id = "recwEWVWCjguycJkM"
url = f"https://api.airtable.com/v0/{BASE_ID}/{urllib.parse.quote(TABLE_NAME)}/{rec_id}"
req = urllib.request.Request(url, headers=headers, method="DELETE")
with urllib.request.urlopen(req) as resp:
    print(resp.read().decode('utf-8'))
