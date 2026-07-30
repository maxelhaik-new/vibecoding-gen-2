import os
import json
import urllib.request

url = "https://api.figma.com/v1/files/X29iTl53DAreMnpHDehsTx/nodes?ids=1363:4975&depth=1"
req = urllib.request.Request(url, headers={"X-Figma-Token": os.environ.get("FIGMA_TOKEN", "")})

with urllib.request.urlopen(req) as resp:
    data = json.loads(resp.read().decode())

print(json.dumps(data, indent=2)[:2000])
