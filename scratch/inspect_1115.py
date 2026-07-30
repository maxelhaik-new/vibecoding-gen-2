import os
import json
import urllib.request

url = "https://api.figma.com/v1/files/X29iTl53DAreMnpHDehsTx/nodes?ids=1115:19262&depth=6"
req = urllib.request.Request(url, headers={"X-Figma-Token": os.environ.get("FIGMA_TOKEN", "")})

with urllib.request.urlopen(req) as resp:
    data = json.loads(resp.read().decode())

node = data.get("nodes", {}).get("1115:19262", {}).get("document", {})

print(f"Node Name: {node.get('name')} | Type: {node.get('type')}")

def dump_node(n, indent=0):
    ntype = n.get("type")
    name = n.get("name", "")
    id_ = n.get("id")
    chars = n.get("characters")
    prefix = "  " * indent
    if ntype == "TEXT":
        print(f"{prefix}💬 [TEXT] '{name}' -> {repr(chars)}")
    elif ntype in ("FRAME", "GROUP", "COMPONENT"):
        print(f"{prefix}🖼️ [{ntype}] '{name}' ({id_})")
        
    for c in n.get("children", []):
        dump_node(c, indent + 1)

dump_node(node)
