import urllib.request
import json

file_key = "X29iTl53DAreMnpHDehsTx"
node_id = "137:23738"
token = "REMOVED_SECRET"

url = f"https://api.figma.com/v1/files/{file_key}/nodes?ids={node_id}"

req = urllib.request.Request(url)
req.add_header("X-Figma-Token", token)

try:
    with urllib.request.urlopen(req) as response:
        if response.status == 200:
            data = json.loads(response.read().decode('utf-8'))
            with open("scratch/checklist_corrected_data.json", "w", encoding="utf-8") as f:
                json.dump(data, f, indent=2, ensure_ascii=False)
            print("Successfully fetched checklist node data!")
        else:
            print(f"Failed. Status: {response.status}")
except Exception as e:
    print(f"Error: {e}")
