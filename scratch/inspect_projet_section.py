import os
import json
import urllib.request
from pathlib import Path

# Load env variables manually from .env if it exists
env_path = Path(__file__).parent.parent / ".env"
figma_token = os.environ.get("FIGMA_TOKEN", "")

if not figma_token and env_path.exists():
    with open(env_path, "r") as f:
        for line in f:
            if line.strip().startswith("FIGMA_TOKEN="):
                figma_token = line.split("=", 1)[1].strip().strip('"').strip("'")
                break

if not figma_token:
    # Try reading from system environment or check if it's stored elsewhere
    # (Sometimes it's configured in terminal)
    pass

FILE_KEY = "X29iTl53DAreMnpHDehsTx"
NODE_ID = "1672:8232"

headers = {"X-Figma-Token": figma_token}
url = f"https://api.figma.com/v1/files/{FILE_KEY}/nodes?ids={NODE_ID}&depth=3"

print(f"Using FIGMA_TOKEN: {figma_token[:8]}... if any")
print("Fetching node data from Figma...")
req = urllib.request.Request(url, headers=headers)
try:
    with urllib.request.urlopen(req, timeout=30) as resp:
        data = json.loads(resp.read().decode("utf-8"))
        node_data = data.get("nodes", {}).get(NODE_ID, {})
        document = node_data.get("document", {})
        children = document.get("children", [])
        print(f"Found {len(children)} children in node {NODE_ID}:")
        for child in children:
            print(f"- Name: '{child.get('name')}', Type: {child.get('type')}, ID: {child.get('id')}")
except Exception as e:
    print("Error:", e)
