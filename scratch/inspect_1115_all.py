import os
import json
import urllib.request

url = "https://api.figma.com/v1/files/X29iTl53DAreMnpHDehsTx/nodes?ids=1115:19262&depth=10"
req = urllib.request.Request(url, headers={"X-Figma-Token": os.environ.get("FIGMA_TOKEN", "")})

with urllib.request.urlopen(req) as resp:
    data = json.loads(resp.read().decode())

node = data.get("nodes", {}).get("1115:19262", {}).get("document", {})

def dump_all(n, level=0):
    indent = "  " * level
    name = n.get("name", "")
    ntype = n.get("type", "")
    id_ = n.get("id", "")
    chars = n.get("characters")
    
    if ntype == "TEXT":
        print(f"{indent}💬 [TEXT] '{name}' (id={id_}) -> {repr(chars)}")
    else:
        print(f"{indent}🖼️ [{ntype}] '{name}' (id={id_})")
        
    for c in n.get("children", []):
        dump_all(c, level + 1)

dump_all(node)
