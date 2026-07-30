import os
import json
import urllib.request

url = "https://api.figma.com/v1/files/X29iTl53DAreMnpHDehsTx/nodes?ids=1115:19262&depth=10"
req = urllib.request.Request(url, headers={"X-Figma-Token": os.environ.get("FIGMA_TOKEN", "")})

with urllib.request.urlopen(req) as resp:
    data = json.loads(resp.read().decode())

node = data.get("nodes", {}).get("1115:19262", {}).get("document", {})

print(f"Node Name: {node.get('name')} | Type: {node.get('type')}")

def dump(n, depth=0):
    indent = "  " * depth
    name = n.get("name", "")
    ntype = n.get("type", "")
    id_ = n.get("id", "")
    chars = n.get("characters")
    
    if ntype == "TEXT":
        print(f"{indent}💬 [TEXT] '{name}' (id={id_}) -> {repr(chars)}")
    else:
        print(f"{indent}🖼️ [{ntype}] '{name}' (id={id_})")
        
    for c in n.get("children", []):
        dump(c, depth + 1)

dump(node)
