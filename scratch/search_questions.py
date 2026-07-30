import os
import json
import urllib.request

url = "https://api.figma.com/v1/files/X29iTl53DAreMnpHDehsTx?depth=3"
req = urllib.request.Request(url, headers={"X-Figma-Token": os.environ.get("FIGMA_TOKEN", "")})

with urllib.request.urlopen(req) as resp:
    data = json.loads(resp.read().decode())

def search_questions(node):
    name = node.get("name", "")
    id_ = node.get("id", "")
    if "Question" in name or "EXERCICE PRATIQUE" in name:
        print(f"Match: '{name}' (id={id_}, type={node.get('type')})")
    for c in node.get("children", []):
        search_questions(c)

document = data.get("document", {})
search_questions(document)
