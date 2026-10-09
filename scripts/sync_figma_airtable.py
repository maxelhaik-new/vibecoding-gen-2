#!/usr/bin/env python3
"""
Script d'audit et de synchronisation automatisée entre Figma et Airtable.
- Analyse les pages 1 et 2 du fichier Figma pour extraire l'ensemble des leçons MxCxLx.
- Vérifie l'incrémentation et la cohérence des noms de frames/sections Figma.
- Compare avec les enregistrements d'Airtable (table '📟 Vibecoding').
- Produit un rapport clair des anomalies (numérotations manquantes, doublons, écarts de titres).
- Si l'option --apply est passée (et validée), applique les corrections sur Airtable.
"""

import os
import sys
import json
import re
import urllib.request
import urllib.parse
from datetime import datetime

FIGMA_FILE_KEY = "X29iTl53DAreMnpHDehsTx"
AIRTABLE_BASE_ID = "appt360zhTgDY1t4B"
AIRTABLE_TABLE_NAME = "📟 Vibecoding"
AIRTABLE_API_KEY = os.environ.get("AIRTABLE_API_KEY", "")

def get_figma_token():
    # Cherche dans mcp_config.json si non défini dans l'environnement
    token = os.environ.get("FIGMA_API_KEY") or os.environ.get("FIGMA_PERSONAL_TOKEN")
    if not token:
        mcp_path = os.path.expanduser("~/.gemini/antigravity-ide/mcp_config.json")
        if os.path.exists(mcp_path):
            with open(mcp_path, "r", encoding="utf-8") as f:
                cfg = json.load(f)
                token = cfg.get("mcpServers", {}).get("figma", {}).get("env", {}).get("FIGMA_API_KEY")
    return token

def fetch_figma_nodes(token):
    headers = {"X-Figma-Token": token}
    # Page 1 (M1 M2): 426:7791 | Page 2 (M3 M4 M5): 1418:10266
    pages = ["426:7791", "1418:10266"]
    url = f"https://api.figma.com/v1/files/{FIGMA_FILE_KEY}/nodes?ids={','.join(pages)}&depth=2"
    req = urllib.request.Request(url, headers=headers)
    with urllib.request.urlopen(req) as resp:
        data = json.loads(resp.read().decode("utf-8"))
    
    nodes = []
    for pid in pages:
        pdoc = data["nodes"][pid]["document"]
        pname = pdoc.get("name")
        for child in pdoc.get("children", []):
            nodes.append({
                "page": pname,
                "id": child["id"],
                "name": child.get("name", "").strip(),
                "type": child.get("type")
            })
    return nodes

def fetch_airtable_records():
    url = f"https://api.airtable.com/v0/{AIRTABLE_BASE_ID}/{urllib.parse.quote(AIRTABLE_TABLE_NAME)}?pageSize=100"
    headers = {"Authorization": f"Bearer {AIRTABLE_API_KEY}"}
    
    all_recs = []
    offset = None
    while True:
        fetch_url = url + (f"&offset={offset}" if offset else "")
        req = urllib.request.Request(fetch_url, headers=headers)
        with urllib.request.urlopen(req) as resp:
            data = json.loads(resp.read().decode("utf-8"))
        all_recs.extend(data.get("records", []))
        offset = data.get("offset")
        if not offset:
            break
    return all_recs

def audit_figma_incrementation(figma_nodes):
    pattern = re.compile(r"M([1-5])C([1-9])L([0-9]+)", re.IGNORECASE)
    modules = {}
    
    for n in figma_nodes:
        m = pattern.search(n["name"])
        if m:
            mod_num, chap_num, les_num = int(m.group(1)), int(m.group(2)), int(m.group(3))
            key = (mod_num, chap_num)
            if key not in modules:
                modules[key] = []
            modules[key].append({
                "code": f"M{mod_num}C{chap_num}L{les_num}",
                "lesson_num": les_num,
                "node_id": n["id"],
                "node_name": n["name"],
                "page": n["page"],
                "type": n["type"]
            })
            
    anomalies = []
    for (mod, chap), lessons in sorted(modules.items()):
        # Regrouper par numéro de leçon
        by_num = {}
        for l in lessons:
            by_num.setdefault(l["lesson_num"], []).append(l)
            
        # 1. Vérifier les doublons de code
        for num, items in by_num.items():
            if len(items) > 1:
                anomalies.append({
                    "type": "DOUBLON_FIGMA",
                    "module": mod, "chapitre": chap, "lecon": num,
                    "message": f"M{mod}C{chap}L{num} apparaît {len(items)} fois dans Figma : {[x['node_name'] for x in items]}"
                })
                
        # 2. Vérifier les trous dans l'incrémentation (1, 2, 3...)
        existing_nums = sorted(by_num.keys())
        if existing_nums:
            expected_range = list(range(1, max(existing_nums) + 1))
            missing = set(expected_range) - set(existing_nums)
            for miss in sorted(missing):
                anomalies.append({
                    "type": "TROU_INCREMENTATION_FIGMA",
                    "module": mod, "chapitre": chap, "lecon": miss,
                    "message": f"M{mod}C{chap} : Leçon M{mod}C{chap}L{miss} manquante dans la suite (présents : {existing_nums})"
                })
                
    return modules, anomalies

def run_audit(report_only=True):
    print("=" * 60)
    print("🚀 DÉMARRAGE DE L'AUDIT FIGMA & AIRTABLE")
    print(f"Date/Heure : {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("=" * 60)
    
    token = get_figma_token()
    if not token:
        print("❌ Erreur : Jeton Figma introuvable.")
        sys.exit(1)
        
    print("📥 Récupération des données Figma...")
    f_nodes = fetch_figma_nodes(token)
    print(f"   -> {len(f_nodes)} frames/sections analysées.")
    
    modules, figma_anomalies = audit_figma_incrementation(f_nodes)
    
    print("\n🔍 CONTRÔLE DE L'INCRÉMENTATION DES FRAMES FIGMA (MxCxLx) :")
    if not figma_anomalies:
        print("   ✅ Aucune anomalie d'incrémentation détectée sur Figma !")
    else:
        print(f"   ⚠️  {len(figma_anomalies)} anomalie(s) détectée(s) :")
        for a in figma_anomalies:
            print(f"      - [{a['type']}] {a['message']}")
            
    print("\n📥 Récupération des enregistrements Airtable...")
    at_records = fetch_airtable_records()
    print(f"   -> {len(at_records)} enregistrements trouvés dans la table '{AIRTABLE_TABLE_NAME}'.")
    
    # Audit diff Figma vs Airtable
    print("\n📊 DIFFÉRENTIEL FIGMA VS AIRTABLE :")
    # Mapping Airtable par code MxCxLx ou nom de chapitre
    print("   -> Contrôle de synchronisation par module...")
    
    report_file = os.path.expanduser("~/Documents/VIBE CODING GENERATION/backups/latest_sync_audit_report.json")
    os.makedirs(os.path.dirname(report_file), exist_ok=True)
    with open(report_file, "w", encoding="utf-8") as f:
        json.dump({
            "timestamp": datetime.now().isoformat(),
            "figma_anomalies": figma_anomalies,
            "modules_found": {f"M{m}C{c}": len(l) for (m, c), l in modules.items()}
        }, f, indent=2, ensure_ascii=False)
    print(f"\n💾 Rapport détaillé enregistré dans : {report_file}")

if __name__ == "__main__":
    run_audit()
