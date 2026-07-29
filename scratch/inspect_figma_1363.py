import json
import urllib.request

url = "https://api.figma.com/v1/files/X29iTl53DAreMnpHDehsTx/nodes?ids=1363:4433&depth=4"
req = urllib.request.Request(url, headers={"X-Figma-Token": "REMOVED_SECRET"})

with urllib.request.urlopen(req) as resp:
    data = json.loads(resp.read().decode())

nodes = data.get("nodes", {}).get("1363:4433", {}).get("document", {}).get("children", [])

print(f"Total children in section 1363:4433: {len(nodes)}")
for c in nodes:
    print(c.get("name"), c.get("id"))
    for sub in c.get("children", []):
        if sub.get("type") == "TEXT":
            print("  TEXT:", sub.get("name"), "->", repr(sub.get("characters")))
