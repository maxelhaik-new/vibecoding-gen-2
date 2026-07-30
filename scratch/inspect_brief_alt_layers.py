import os
import json
import urllib.request

url = "https://api.figma.com/v1/files/X29iTl53DAreMnpHDehsTx/nodes?ids=1387:6047&depth=6"
req = urllib.request.Request(url, headers={"X-Figma-Token": os.environ.get("FIGMA_TOKEN", "")})

with urllib.request.urlopen(req) as resp:
    data = json.loads(resp.read().decode())

doc = data.get("nodes", {}).get("1387:6047", {}).get("document", {})

def dump(n, indent=0):
    prefix = "  " * indent
    name = n.get("name", "")
    ntype = n.get("type", "")
    id_ = n.get("id", "")
    chars = n.get("characters")
    if ntype == "TEXT":
        print(f"{prefix}💬 [TEXT] '{name}' (id={id_}) -> {repr(chars)}")
    else:
        print(f"{prefix}🖼️ [{ntype}] '{name}' (id={id_})")
    for c in n.get("children", []):
        dump(c, indent + 1)

print("NODE NAME:", doc.get("name"))
dump(doc)
