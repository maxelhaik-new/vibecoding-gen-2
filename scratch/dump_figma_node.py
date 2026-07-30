import os
import requests
import json
import sys

FIGMA_TOKEN = os.environ.get("FIGMA_TOKEN", "")
FILE_KEY = "X29iTl53DAreMnpHDehsTx"
NODE_ID = "484:2875"

headers = {"X-Figma-Token": FIGMA_TOKEN}
url = f"https://api.figma.com/v1/files/{FILE_KEY}/nodes?ids={NODE_ID}&depth=6"

print(f"Fetching node {NODE_ID}...")
r = requests.get(url, headers=headers)
if r.status_code != 200:
    print(f"Error: {r.status_code}")
    print(r.text)
    sys.exit(1)

data = r.json()
node_data = data.get("nodes", {}).get(NODE_ID, {}).get("document", {})

def print_tree(node, indent=""):
    name = node.get("name", "Unnamed")
    ntype = node.get("type", "UNKNOWN")
    print(f"{indent}- {name} ({ntype}) [ID: {node.get('id')}]")
    for child in node.get("children", []):
        print_tree(child, indent + "  ")

print_tree(node_data)
