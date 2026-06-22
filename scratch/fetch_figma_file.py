import urllib.request
import json

file_key = "X29iTl53DAreMnpHDehsTx"
token = "REMOVED_SECRET"

url = f"https://api.figma.com/v1/files/{file_key}"
req = urllib.request.Request(url)
req.add_header("X-Figma-Token", token)

try:
    with urllib.request.urlopen(req) as response:
        if response.status == 200:
            data = json.loads(response.read().decode('utf-8'))
            print("Successfully fetched entire file!")
            print(f"Document name: {data.get('name')}")
            # print all top-level pages
            pages = data.get('document', {}).get('children', [])
            for page in pages:
                print(f"Page: {page.get('name')} (id: {page.get('id')})")
        else:
            print(f"Failed to fetch Figma data. Status code: {response.status}")
except Exception as e:
    print(f"Error occurred: {e}")
