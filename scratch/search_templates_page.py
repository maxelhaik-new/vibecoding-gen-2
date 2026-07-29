import json
import urllib.request

url = "https://api.figma.com/v1/files/X29iTl53DAreMnpHDehsTx?depth=4"
req = urllib.request.Request(url, headers={"X-Figma-Token": "REMOVED_SECRET"})

with urllib.request.urlopen(req) as resp:
    data = json.loads(resp.read().decode())

def search_nodes(node):
    name = node.get("name", "")
    id_ = node.get("id", "")
    if any(k in name.upper() for k in ["PERSONA", "USER STORIES", "USER STORY"]):
        print(f"FOUND: '{name}' (id={id_}, type={node.get('type')})")
    for c in node.get("children", []):
        search_nodes(c)

document = data.get("document", {})
search_nodes(document)
