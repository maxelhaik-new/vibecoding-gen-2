import os
import json
import urllib.request

url = "https://api.figma.com/v1/files/X29iTl53DAreMnpHDehsTx/nodes?ids=1363:4725,1363:4794&depth=6"
req = urllib.request.Request(url, headers={"X-Figma-Token": os.environ.get("FIGMA_TOKEN", "")})

with urllib.request.urlopen(req) as resp:
    data = json.loads(resp.read().decode())

def dump_node(n, indent=0):
    prefix = "  " * indent
    name = n.get("name", "")
    ntype = n.get("type", "")
    id_ = n.get("id", "")
    chars = n.get("characters")
    if ntype == "TEXT":
        print(f"{prefix}💬 [TEXT] '{name}' -> {repr(chars)}")
    else:
        print(f"{prefix}🖼️ [{ntype}] '{name}' (id={id_})")
    for c in n.get("children", []):
        dump_node(c, indent + 1)

for nid, val in data.get("nodes", {}).items():
    doc = val.get("document", {})
    print("========================================")
    print(f"Node {nid}: {doc.get('name')}")
    dump_node(doc)
