import urllib.request
import json

file_key = "X29iTl53DAreMnpHDehsTx"
node_id = "460:1423"
token = "REMOVED_SECRET"

url = f"https://api.figma.com/v1/files/{file_key}/nodes?ids={node_id}"

req = urllib.request.Request(url)
req.add_header("X-Figma-Token", token)

try:
    with urllib.request.urlopen(req) as response:
        if response.status == 200:
            data = json.loads(response.read().decode('utf-8'))
            with open("scratch/figma_node_data.json", "w", encoding="utf-8") as f:
                json.dump(data, f, indent=2, ensure_ascii=False)
            print("Successfully fetched and saved Figma node data to scratch/figma_node_data.json")
        else:
            print(f"Failed to fetch Figma data. Status code: {response.status}")
except Exception as e:
    print(f"Error occurred: {e}")
