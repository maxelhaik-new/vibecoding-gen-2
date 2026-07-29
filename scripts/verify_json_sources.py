import os
import glob
import json

# Get ALL FINAL lesson JSON files
json_files = sorted(glob.glob("M[1-4]/**/FINAL_*.json", recursive=True))

print(f"Total FINAL lesson JSON files found: {len(json_files)}")

# Map each file to its title, slug, and text content
lesson_data = []
for fpath in json_files:
    if "CLAUDE" in fpath or "GEMINI" in fpath:
        continue
    try:
        with open(fpath, "r", encoding="utf-8") as f:
            data = json.load(f)
            slug = data.get("lessonSlug", "")
            title = data.get("lessonTitle", "")
            slides = data.get("slides", [])
            text_blobs = []
            for s in slides:
                content = s.get("content", {})
                for k, v in content.items():
                    if isinstance(v, str):
                        text_blobs.append(v)
            full_text = " ".join(text_blobs)
            lesson_data.append({
                "path": fpath,
                "slug": slug,
                "title": title,
                "full_text": full_text
            })
    except Exception as e:
        print(f"Error reading {fpath}: {e}")

print(f"Loaded {len(lesson_data)} verified lesson JSONs.")

# Check specific terms
query_terms = ["expo go", "expo", "http", "méthode", "methodes http", "get", "post", "put", "delete", "webcontainers", "rag", "refactoring", "refactorisation", ".gitignore", "bac à sable"]

print("\n--- EXACT TERM MATCHES IN FINAL_*.json ---")
for qt in query_terms:
    matches = []
    for l in lesson_data:
        if qt.lower() in l["full_text"].lower() or qt.lower() in l["title"].lower():
            matches.append(l)
    print(f"\n🔍 Query: '{qt}' -> Found in {len(matches)} JSON lesson(s)")
    for m in matches[:3]:
        print(f"   • File: {m['path']} | Title: '{m['title']}'")
