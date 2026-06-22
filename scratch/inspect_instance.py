import json

with open("scratch/figma_node_484_2875.json", "r", encoding="utf-8") as f:
    data = json.load(f)

# Let's find node 484:3280 and print its full hierarchy and types
doc = data.get("document", {})
canvas = doc.get("children", [])[1]
section = canvas.get("children", [])[0]

slide = None
for child in section.get("children", []):
    if child.get("id") == "484:3280":
        slide = child
        break

if slide:
    print(f"Slide: {slide.get('name')} (ID: {slide.get('id')}), type: {slide.get('type')}")
    # Let's print children details (type, id, name)
    for c in slide.get("children", []):
        print(f"  Child: {c.get('name')} (ID: {c.get('id')}), type: {c.get('type')}")
        if c.get("type") == "INSTANCE":
            print(f"    Component ID: {c.get('componentId')}")
            for sc in c.get("children", []):
                print(f"      Subchild: {sc.get('name')} (ID: {sc.get('id')}), type: {sc.get('type')}")
                # And deep search for text
                def print_instance_texts(node, indent="        "):
                    if node.get("type") == "TEXT":
                        print(f"{indent}- [{node.get('name')}] (ID: {node.get('id')}): \"{node.get('characters').strip()}\"")
                    for child_node in node.get("children", []):
                        print_instance_texts(child_node, indent + "  ")
                print_instance_texts(sc)
else:
    print("Slide 484:3280 not found")
