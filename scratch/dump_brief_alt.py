import os
import json
import urllib.request

url = "https://api.figma.com/v1/files/X29iTl53DAreMnpHDehsTx?depth=5"
req = urllib.request.Request(url, headers={"X-Figma-Token": os.environ.get("FIGMA_TOKEN", "")})

with urllib.request.urlopen(req) as resp:
    data = json.loads(resp.read().decode())

def search(node):
    name = node.get("name", "")
    id_ = node.get("id", "")
    if "brief" in name.lower() and "alt" in name.lower():
        print(f"FOUND: '{name}' ({id_})")
        dump(node)
    for c in node.get("children", []):
        search(c)

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

search(data.get("document", {}))
