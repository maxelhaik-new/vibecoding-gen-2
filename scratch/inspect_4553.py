import os
import json
import urllib.request

url = "https://api.figma.com/v1/files/X29iTl53DAreMnpHDehsTx/nodes?ids=1363:4553&depth=5"
req = urllib.request.Request(url, headers={"X-Figma-Token": os.environ.get("FIGMA_TOKEN", "")})

with urllib.request.urlopen(req) as resp:
    data = json.loads(resp.read().decode())

node = data.get("nodes", {}).get("1363:4553", {}).get("document", {})

print(f"Node Name: {node.get('name')}")
def dump_texts(n):
    if n.get("type") == "TEXT":
        print(f"Key: {n.get('name')} | Chars ({len(n.get('characters',''))}): {repr(n.get('characters'))}")
    for c in n.get("children", []):
        dump_texts(c)

dump_texts(node)
