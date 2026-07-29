import glob
import json
import os

# Get ALL FINAL lesson JSON files
json_files = sorted(glob.glob("M[1-4]/**/FINAL_*.json", recursive=True))

verified_lessons = []
for fpath in json_files:
    if "CLAUDE" in fpath or "GEMINI" in fpath:
        continue
    try:
        with open(fpath, "r", encoding="utf-8") as f:
            data = json.load(f)
            if isinstance(data, list):
                continue
            slug = data.get("lessonSlug", "").upper()
            title = data.get("lessonTitle", "") or slug
            slides = data.get("slides", [])
            verified_lessons.append({
                "file": fpath,
                "slug": slug,
                "title": title,
                "slides": slides
            })
    except Exception as e:
        pass

# 1. Terms EXPLICITLY DEFINED in concept/definition templates
defined_terms = {}

for les in verified_lessons:
    code_title = f"{les['slug']} — {les['title']}" if les['slug'] not in les['title'] else les['title']
    for slide in les["slides"]:
        if not isinstance(slide, dict):
            continue
        template = slide.get("template", "")
        content = slide.get("content", {})
        if not isinstance(content, dict):
            continue
            
        concept_val = content.get("Concept", "") or content.get("Titre 1", "") or content.get("Titre", "")
        texte_val = content.get("Texte", "") or content.get("Intro", "") or content.get("Texte 1", "") or content.get("Définition", "")
        
        if any(t in template for t in ["DEFINITION", "CONCEPT", "4 BLOCS", "INTRO", "DUO", "EXPLICATION"]):
            if isinstance(concept_val, str) and isinstance(texte_val, str):
                if len(concept_val) > 2 and len(texte_val) > 15 and not concept_val.startswith("M") and not "objectif" in concept_val.lower():
                    clean_mot = concept_val.strip()
                    clean_def = texte_val.replace("\n", " ").strip()
                    if clean_mot not in defined_terms:
                        defined_terms[clean_mot] = {
                            "mot": clean_mot,
                            "statut": "Défini",
                            "definition": clean_def,
                            "ref": code_title
                        }

# 2. Terms PRESENT/CITED in lesson texts but WITHOUT explicit definition slide
cited_terms_candidates = [
    {
        "mot": ".gitignore",
        "keywords": [".gitignore"],
        "definition": "Fichier texte spécifiant les fichiers, dossiers temporaires et secrets que Git doit ignorer lors du suivi de version.",
        "type": "Fichier de Config Git"
    },
    {
        "mot": "Bac à sable (Sandboxing)",
        "keywords": ["bac à sable", "sandbox"],
        "definition": "Environnement d'exécution isolé restreignant les accès système et réseau d'un agent IA pour éviter tout risque lors de l'exécution de code.",
        "type": "Sécurité / IDE"
    },
    {
        "mot": "Dépôt Git (Repository)",
        "keywords": ["dépôt", "repository", "repo"],
        "definition": "Dossier de projet sous contrôle de version Git stockant l'intégralité du code source, des branches et de l'historique des commits.",
        "type": "Concept Git"
    },
    {
        "mot": "HTTP / HTTPS",
        "keywords": ["http", "https"],
        "definition": "HyperText Transfer Protocol. Protocole réseau régissant l'échange de données chiffrées (HTTPS) ou non entre un client web et un serveur.",
        "type": "Protocole Web"
    },
    {
        "mot": "localhost & Port réseau",
        "keywords": ["localhost", "port"],
        "definition": "Adresse d'hôte interne (localhost) et canal numérique (port) permettant de tester et faire tourner un serveur web sur sa propre machine.",
        "type": "Réseau Local"
    },
    {
        "mot": "Méthodes HTTP (GET, POST, PUT, DELETE)",
        "keywords": ["get", "post", "put", "delete"],
        "definition": "Verbes standards spécifiés dans une requête HTTP indiquant au serveur s'il doit lire (GET), créer (POST), modifier (PUT) ou supprimer (DELETE) une donnée.",
        "type": "Verbes Web / API"
    },
    {
        "mot": "RAG (Retrieval-Augmented Generation)",
        "keywords": ["rag"],
        "definition": "Technique permettant à un agent IA d'extraire dynamiquement des documents pertinents ou du code depuis le projet pour enrichir son prompt.",
        "type": "Concept IA"
    },
    {
        "mot": "Refactorisation (Refactoring)",
        "keywords": ["refactorisation", "refactoring"],
        "definition": "Réécriture du code source pour en améliorer la lisibilité, l'architecture et les performances sans altérer le comportement externe.",
        "type": "Méthode de Code"
    }
]

cited_terms = {}
for c in cited_terms_candidates:
    matched_lessons = []
    for les in verified_lessons:
        code_title = f"{les['slug']} — {les['title']}" if les['slug'] not in les['title'] else les['title']
        text_blobs = []
        for s in les["slides"]:
            if isinstance(s, dict) and isinstance(s.get("content"), dict):
                for v in s["content"].values():
                    if isinstance(v, str):
                        text_blobs.append(v)
        full_text = " ".join(text_blobs).lower()
        if any(kw in full_text for kw in c["keywords"]):
            matched_lessons.append(code_title)
            
    if matched_lessons:
        sample_refs = ", ".join(matched_lessons[:2])
        cited_terms[c["mot"]] = {
            "mot": c["mot"],
            "statut": "Non défini (Cité)",
            "definition": c["definition"],
            "ref": f"Cité dans {sample_refs}"
        }

# Combine both dictionary sets
all_entries = {}
for k, v in defined_terms.items():
    all_entries[k] = v

for k, v in cited_terms.items():
    if k not in all_entries:
        all_entries[k] = v

sorted_keys = sorted(all_entries.keys(), key=lambda x: x.lstrip(".").lower())

md_lines = []
md_lines.append("# 📚 Glossaire Officiel de la Formation Vibe Coding")
md_lines.append("\nCe glossaire regroupe les termes de vos leçons locales (Modules 1 à 4), triés par **ordre alphabétique**, avec la distinction exacte du **Statut** (`Défini` par une slide explicite vs `Non défini (Cité)` dans le texte des diapositives).\n")
md_lines.append("| Mot / Concept | Statut | Définition | Référence de la leçon (JSON Local) |")
md_lines.append("| :--- | :--- | :--- | :--- |")

for k in sorted_keys:
    it = all_entries[k]
    mot_val = it['mot']
    stat_val = it['statut']
    def_val = it['definition']
    ref_val = it['ref']
    md_lines.append(f"| **{mot_val}** | `{stat_val}` | {def_val} | {ref_val} |")

target_path = "/Users/maximeelhaik/Documents/VIBE CODING GENERATION/glossaire_formation_vibe_coding.md"
with open(target_path, "w", encoding="utf-8") as f:
    f.write("\n".join(md_lines))

print(f"✅ Glossaire rééquilibré dans {target_path} ({len(defined_terms)} Défini + {len(cited_terms)} Non défini = {len(all_entries)} au total).")
