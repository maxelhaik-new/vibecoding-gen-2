import json
import urllib.request

url = "https://api.figma.com/v1/files/X29iTl53DAreMnpHDehsTx/nodes?ids=1363:4964&depth=6"
req = urllib.request.Request(url, headers={"X-Figma-Token": "REMOVED_SECRET"})

with urllib.request.urlopen(req) as resp:
    data = json.loads(resp.read().decode())

def dump_node(n, indent=0):
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
        dump_node(c, indent + 1)

node = data.get("nodes", {}).get("1363:4964", {}).get("document", {})
dump_node(node)
