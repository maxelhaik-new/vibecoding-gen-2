import urllib.request
import json
import os

file_key = "X29iTl53DAreMnpHDehsTx"
token = os.environ.get("FIGMA_TOKEN", "")

pages = {
    "Page 1 - M1 M2 (Théorie)": "426:7791",
    "Refonte leçons IA": "550:637"
}

for name, page_id in pages.items():
    print(f"\nFetching page: {name} ({page_id})...")
    url = f"https://api.figma.com/v1/files/{file_key}/nodes?ids={page_id}&depth=2"
    req = urllib.request.Request(url)
    req.add_header("X-Figma-Token", token)
    try:
        with urllib.request.urlopen(req) as response:
            if response.status == 200:
                data = json.loads(response.read().decode('utf-8'))
                node_data = data.get("nodes", {}).get(page_id, {})
                document = node_data.get("document", {})
                children = document.get("children", [])
                print(f"Page '{name}' has {len(children)} immediate children:")
                for i, child in enumerate(children[:50]):
                    print(f"  - [{child.get('name')}] (Type: {child.get('type')}, ID: {child.get('id')})")
                if len(children) > 50:
                    print(f"  ... and {len(children) - 50} more children")
            else:
                print(f"Failed. Status: {response.status}")
    except Exception as e:
        print(f"Error fetching page {name}: {e}")
