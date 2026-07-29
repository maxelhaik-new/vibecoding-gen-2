import os
import glob
import json

# Terms to verify across all lesson files and plan documents
terms = [
    # Category 1
    "System Prompt", "Consignes Système", "Few-Shot", "Zero-Shot", "RAG", "Refactorisation", "Refactoring",
    # Category 2
    "JSX", "State", "Props", "Hook", "useState", "useEffect", "NPM", "package.json", "node_modules", "WebContainers",
    # Category 3
    "Hot Reloading", "Fast Refresh", "APK", "IPA", "Metro Bundler",
    # Category 4
    "HTTP", "HTTPS", "GET", "POST", "PUT", "DELETE", "Code de statut", "404", "500", "CORS", "Middleware", "localhost", "127.0.0.1", "Port",
    # Category 5
    "Git Push", "Git Pull", "Git Merge", "Pull Request", "PR", ".gitignore", "Dépôt", "Repository",
    # Category 6
    "Sandboxing", "Bac à sable", "Linter", "ESLint"
]

# Load all lesson JSONs and MD plan files
files_to_search = glob.glob("M[1-4]/**/*.json", recursive=True) + glob.glob("*.md")

all_content = []
file_contents = {}

for fpath in files_to_search:
    try:
        with open(fpath, "r", encoding="utf-8") as f:
            content = f.read()
            file_contents[fpath] = content
    except Exception as e:
        pass

print(f"Loaded {len(file_contents)} files to search.")

print("\n--- OCCURRENCE AUDIT IN M1-M4 LESSONS & DOCS ---")
verified_present = []
not_found_explicitly = []

for term in terms:
    found_in_files = []
    for fpath, content in file_contents.items():
        if term.lower() in content.lower():
            found_in_files.append(fpath)
            
    if found_in_files:
        verified_present.append((term, len(found_in_files), found_in_files[:2]))
    else:
        not_found_explicitly.append(term)

print("\n✅ TERMS EXPLICITLY PRESENT IN M1-M4 MATERIAL:")
for term, count, samples in verified_present:
    sample_names = [os.path.basename(s) for s in samples]
    print(f"  • '{term}' -> Found in {count} file(s) (e.g. {', '.join(sample_names)})")

print("\n⚠️ TERMS NOT FOUND EXPLICITLY IN M1-M4 LESSON TEXTS:")
for term in not_found_explicitly:
    print(f"  • '{term}'")
