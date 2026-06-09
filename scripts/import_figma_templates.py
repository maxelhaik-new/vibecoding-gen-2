#!/usr/bin/env python3
"""
import_figma_templates.py
Importation des templates depuis la section Figma validée et mise à jour de templates.json.

Usage:
  python3 scripts/import_figma_templates.py
"""

import json
import os
import re
import sys
import math
from pathlib import Path
from typing import Optional, Union, List, Dict

try:
    import requests
except ImportError:
    print("[Erreur] 'requests' manquant. Lancez : pip3 install requests")
    sys.exit(1)

try:
    from dotenv import load_dotenv
except ImportError:
    pass
else:
    load_dotenv(dotenv_path=Path(__file__).parent.parent / ".env")

# ─── Configuration ─────────────────────────────────────────────────────────────
FIGMA_TOKEN = "REMOVED_SECRET"
FILE_KEY    = "X29iTl53DAreMnpHDehsTx"
SECTION_ID  = "236:11789"
TEMPLATES_PATH = Path(__file__).parent.parent / "templates.json"

HEADERS = {"X-Figma-Token": FIGMA_TOKEN}
BASE_URL = "https://api.figma.com/v1"

# ─── Helpers ────────────────────────────────────────────────────────────────────

def figma_nodes(node_ids: List[str], depth: int = 10) -> Dict:
    """Fetch multiple nodes in a single API call."""
    ids = ",".join(node_ids)
    url = f"{BASE_URL}/files/{FILE_KEY}/nodes?ids={ids}&depth={depth}"
    r = requests.get(url, headers=HEADERS, timeout=30)
    r.raise_for_status()
    return r.json().get("nodes", {})


def calc_limits(text: str) -> Dict:
    """Compute min/max/target character limits from a placeholder text."""
    length = len(text)
    target = length
    if length < 30:
        # Short titles: looser max
        min_l = max(5, math.floor(length * 0.7))
        max_l = math.ceil(length * 1.5)
    else:
        min_l = max(5, math.floor(length * 0.7))
        max_l = math.ceil(length * 1.3)
    return {"target_lenght": target, "min_lenght": min_l, "max_lenght": max_l}


def is_pure_number(s: str) -> bool:
    return bool(re.fullmatch(r"\d+", s.strip()))


def normalize_name(name: str) -> str:
    return name.strip().lower()


def classify_node(node: dict) -> Optional[str]:
    """Return 'text', 'picto', 'image', or None for irrelevant nodes."""
    name = normalize_name(node.get("name", ""))
    ntype = node.get("type", "")

    # Detect image layers (fills of type IMAGE or matching keywords)
    has_image_fill = False
    if "fills" in node and isinstance(node["fills"], list):
        for fill in node["fills"]:
            if fill.get("type") == "IMAGE":
                has_image_fill = True
                break

    image_keywords = ["image", "photo", "visuel", "illustration", "mockup", "screenshot"]
    if has_image_fill or any(kw in name for kw in image_keywords):
        if ntype != "TEXT":
            return "image"

    if ntype != "TEXT":
        return None

    # Detect picto layers
    picto_keywords = ["mdi:", "iconify:", "picto", "icon", "svg", "logo"]
    if any(kw in name for kw in picto_keywords):
        return "picto"

    # Exclude pure number layers (Figma bullet numerals)
    chars = node.get("characters", "")
    if is_pure_number(node.get("name", "")) or is_pure_number(chars):
        return None

    return "text"


def collect_layers(node: dict, text_layers: list, picto_layers: list, image_layers: list, picto_counter: list):
    """Recursively traverse a node tree and collect layers."""
    kind = classify_node(node)
    if kind == "text":
        chars = node.get("characters", "")
        entry = {"key": node["name"], "original_placeholder": chars}
        entry.update(calc_limits(chars))
        text_layers.append(entry)
    elif kind == "picto":
        idx = picto_counter[0]
        picto_counter[0] += 1
        picto_layers.append({
            "key": f"Picto {idx}",
            "original_placeholder": node.get("name", f"Picto {idx}")
        })
    elif kind == "image":
        # Deduplicate so we don't add multiple entries for the same logical image if nested
        if not any(img["key"] == "image" for img in image_layers):
            image_layers.append({
                "key": "image",
                "original_placeholder": node.get("name", "image")
            })

    for child in node.get("children", []):
        collect_layers(child, text_layers, picto_layers, image_layers, picto_counter)


# ─── Main ───────────────────────────────────────────────────────────────────────

def main():
    # 1. Fetch the section's direct children (depth=2 for quick listing)
    print(f"\n[1/4] Récupération de la section {SECTION_ID}...")
    section_data = figma_nodes([SECTION_ID], depth=2)
    section_doc = list(section_data.values())[0]["document"]
    raw_children = section_doc.get("children", [])
    frames = [c for c in raw_children if c.get("type") == "FRAME"]
    print(f"       {len(frames)} templates FRAME trouvés dans la section Figma.")

    # 2. Fetch each frame individually with full depth for layer extraction
    print(f"\n[2/4] Récupération des calques de chaque template...")
    frame_ids = [f["id"] for f in frames]

    # Batch into groups of 10 to avoid URL-length limits
    def chunked(lst, n):
        for i in range(0, len(lst), n):
            yield lst[i:i+n]

    full_nodes = {}
    for batch in chunked(frame_ids, 10):
        batch_data = figma_nodes(batch, depth=10)
        full_nodes.update(batch_data)

    # 3. Load existing templates.json
    print(f"\n[3/4] Chargement de templates.json existant...")
    if TEMPLATES_PATH.exists():
        with open(TEMPLATES_PATH, "r", encoding="utf-8") as f:
            existing_templates = json.load(f)
        # templates.json can be a list or a dict
        if isinstance(existing_templates, list):
            existing_map = {t["name"]: t for t in existing_templates}
        else:
            existing_map = existing_templates
    else:
        existing_map = {}

    # Build set of Figma template names
    figma_names = {f["name"] for f in frames}

    # 4. Process each frame
    print(f"\n[4/4] Synchronisation des templates...")
    added, updated, unchanged = [], [], []

    new_templates_map = {}

    for frame in frames:
        name = frame["name"]
        frame_id = frame["id"]

        # Get full node data
        full_node = full_nodes.get(frame_id, {}).get("document", frame)

        text_layers = []
        picto_layers = []
        image_layers = []
        picto_counter = [1]

        for child in full_node.get("children", []):
            collect_layers(child, text_layers, picto_layers, image_layers, picto_counter)

        new_entry = {
            "name": name,
            "status": "validé",
            "description": f"Template pour slide de type {name.lower().replace(' - ', ' - ')}.",
            "text_layers": text_layers,
        }
        if picto_layers:
            new_entry["picto_layers"] = picto_layers
        if image_layers:
            new_entry["image_layers"] = image_layers

        if name not in existing_map:
            added.append(name)
        else:
            # Check if meaningfully different
            old_text_count = len(existing_map[name].get("text_layers", []))
            new_text_count = len(text_layers)
            old_image_count = len(existing_map[name].get("image_layers", []))
            new_image_count = len(image_layers)
            if old_text_count != new_text_count or old_image_count != new_image_count:
                updated.append(f"{name} ({old_text_count}→{new_text_count} champs texte, {old_image_count}→{new_image_count} images)")
            else:
                unchanged.append(name)

        new_templates_map[name] = new_entry

    # Detect removed templates
    removed = [name for name in existing_map if name not in figma_names]

    # Build final ordered list (preserve Figma section order)
    final_list = [new_templates_map[f["name"]] for f in frames]

    # Write output
    with open(TEMPLATES_PATH, "w", encoding="utf-8") as f:
        json.dump(final_list, f, ensure_ascii=False, indent=2)

    # Print diff report
    print("\n" + "="*60)
    print("RAPPORT DE SYNCHRONISATION")
    print("="*60)
    print(f"✅ {len(final_list)} templates écrits dans templates.json")
    if added:
        print(f"\n🆕 Ajoutés ({len(added)}) :")
        for n in added: print(f"   + {n}")
    if updated:
        print(f"\n🔄 Mis à jour ({len(updated)}) :")
        for n in updated: print(f"   ~ {n}")
    if removed:
        print(f"\n🗑️  Supprimés ({len(removed)}) :")
        for n in removed: print(f"   - {n}")
    if unchanged:
        print(f"\n✓ Inchangés : {len(unchanged)}")
    print("="*60)
    print(f"\nFichier mis à jour : {TEMPLATES_PATH}")


if __name__ == "__main__":
    main()

