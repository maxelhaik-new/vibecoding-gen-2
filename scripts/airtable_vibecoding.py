import os
import json
import urllib.request
import urllib.parse

AIRTABLE_API_KEY = os.environ.get("AIRTABLE_API_KEY", "")
BASE_ID = "appt360zhTgDY1t4B"
TABLE_NAME = "📟 Vibecoding"
TABLE_ID = "tbla9YhakVEJfrOP8"

class AirtableVibecodingClient:
    def __init__(self, api_key=AIRTABLE_API_KEY, base_id=BASE_ID):
        self.api_key = api_key
        self.base_id = base_id
        self.table_name = TABLE_NAME
        self.headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json"
        }

    def fetch_records(self, max_records=None, formula=None):
        """Lit les enregistrements de la table Vibecoding uniquement."""
        url = f"https://api.airtable.com/v0/{self.base_id}/{urllib.parse.quote(self.table_name)}"
        params = []
        if max_records:
            params.append(f"maxRecords={max_records}")
        if formula:
            params.append(f"filterByFormula={urllib.parse.quote(formula)}")
        if params:
            url += "?" + "&".join(params)

        req = urllib.request.Request(url, headers=self.headers)
        with urllib.request.urlopen(req) as response:
            data = json.loads(response.read().decode('utf-8'))
            return data.get("records", [])

if __name__ == "__main__":
    client = AirtableVibecodingClient()
    records = client.fetch_records(max_records=3)
    print(f"Connexion Airtable configurée avec succès ! {len(records)} leçons lues.")
