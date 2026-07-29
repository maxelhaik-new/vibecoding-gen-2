import json
import urllib.request

url = "https://api.figma.com/v1/files/X29iTl53DAreMnpHDehsTx/nodes?ids=1361:12363&depth=4"
req = urllib.request.Request(url, headers={"X-Figma-Token": "REMOVED_SECRET"})

with urllib.request.urlopen(req) as resp:
    data = json.loads(resp.read().decode())

nodes = data.get("nodes", {}).get("1361:12363", {}).get("document", {}).get("children", [])

print(f"Total children in section: {len(nodes)}")

def print_tree(node, indent=0):
    ntype = node.get("type")
    name = node.get("name", "")
    id_ = node.get("id")
    chars = node.get("characters", "")
    
    prefix = "  " * indent
    if ntype == "FRAME":
        print(f"{prefix}🖼️ [FRAME] {name} ({id_})")
    elif ntype == "TEXT":
        print(f"{prefix}💬 [TEXT] {name}: \"{chars}\"")
    else:
        # print(f"{prefix}[{ntype}] {name}")
        pass
        
    for child in node.get("children", []):
        print_tree(child, indent + 1)

for child in nodes:
    print_tree(child)
