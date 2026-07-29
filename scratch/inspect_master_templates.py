import json
import urllib.request

url = "https://api.figma.com/v1/files/X29iTl53DAreMnpHDehsTx/nodes?ids=1387:6836,1387:6881&depth=6"
req = urllib.request.Request(url, headers={"X-Figma-Token": "REMOVED_SECRET"})

with urllib.request.urlopen(req) as resp:
    data = json.loads(resp.read().decode())

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

nodes = data.get("nodes", {})
for node_id, node_data in nodes.items():
    doc = node_data.get("document", {})
    print(f"\n=================== NODE {node_id} : {doc.get('name')} ===================")
    dump(doc)
