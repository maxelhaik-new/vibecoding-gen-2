import json
import urllib.request

url = "https://api.figma.com/v1/files/X29iTl53DAreMnpHDehsTx?depth=2"
req = urllib.request.Request(url, headers={"X-Figma-Token": "REMOVED_SECRET"})

with urllib.request.urlopen(req) as resp:
    data = json.loads(resp.read().decode())

document = data.get("document", {})
for page in document.get("children", []):
    print(f"PAGE: '{page.get('name')}' ({page.get('id')})")
    for child in page.get("children", []):
        name = child.get("name", "")
        if "VIBECODING" in name.upper() or "PERSONA" in name.upper() or "USER" in name.upper():
            print(f"  -> FRAME: '{name}' ({child.get('id')})")
