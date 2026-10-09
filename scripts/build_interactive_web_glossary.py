import re
import json
import os
import shutil
import sys

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SCRIPTS_DIR = os.path.join(BASE_DIR, 'scripts')
if SCRIPTS_DIR not in sys.path:
    sys.path.insert(0, SCRIPTS_DIR)
from quiz_data import QUIZ_DATA
GLOSSARY_PATH = os.path.join(BASE_DIR, 'glossaire_formation_vibe_coding.md')
OUTPUT_PATH = os.path.join(BASE_DIR, 'glossaire_interactive.html')
INDEX_PATH = os.path.join(BASE_DIR, 'index.html')
SCRATCH_EXPORT_DIR = os.path.join(BASE_DIR, 'scratch', 'glossaire-vibecoding-export')
SCRIPTS_DIR = os.path.join(BASE_DIR, 'scripts')

# --- 1. CHARGEMENT DU GLOSSAIRE ---
with open(GLOSSARY_PATH, 'r', encoding='utf-8') as f:
    lines = f.readlines()

table_lines = [l.strip() for l in lines if l.strip().startswith('|')]
glossary_rows = []
glossary_categories_set = set()
alphabet_set = set()

for line in table_lines[2:]:
    parts = [p.strip() for p in line.split('|')[1:-1]]
    if len(parts) >= 5:
        word_raw, statut, category, definition, ref = parts[0], parts[1], parts[2], parts[3], parts[4]
        word = re.sub(r'\*\*(.*?)\*\*', r'\1', word_raw)
        cat_clean = category.replace('`', '').strip()
        
        mod_match = re.search(r'(M[1-4])', ref)
        mod_code = mod_match.group(1) if mod_match else "Autre"
        
        glossary_categories_set.add(cat_clean)
        
        first_char = word.strip().lstrip('.').lstrip('(')[0].upper()
        if first_char.isalpha():
            alphabet_set.add(first_char)
        
        glossary_rows.append({
            'id': len(glossary_rows) + 1,
            'word': word,
            'statut': statut.replace('`', ''),
            'category': cat_clean,
            'definition': definition,
            'ref': ref,
            'module': mod_code
        })

glossary_categories_list = sorted(list(glossary_categories_set))
alphabet_list = sorted(list(alphabet_set))

# --- 2. BIBLIOTHÈQUE DE PROMPTS VIBE CODING ---
prompts_data = [
    {
        "id": "vercel-ai-studio-arch",
        "title": "Adaptation architecture Vercel & Google AI Studio",
        "description": "Migration vers une architecture serverless compatible Vercel sans casser le fonctionnement dans Google AI Studio.",
        "prompt": "Adapte l'architecture du projet pour un déploiement Vercel sans casser le comportement actuel dans Google AI studio. Créé les fonctions serverless dans /api et les fichiers nécéssaires.",
        "tags": ["Déploiement", "Vercel", "Serverless", "Google AI Studio"]
    },
    {
        "id": "schema-mermaid-parcours-wander",
        "title": "Schéma Mermaid : Parcours utilisateur Wander (Flowchart TD)",
        "description": "Génération d'un diagramme Mermaid détaillant les étapes clés et distinguant les actions utilisateur des traitements système.",
        "prompt": "Génère-moi un schéma Mermaid (flowchart TD) du parcours utilisateur de mon application Wander. Voici les étapes : 1. Inscription. 2. Formulaire avec 4 champs. 3. Appel de l'API OpenAI. 4. Affichage des résultats. 5. Sauvegarde dans Supabase. Mets en évidence les actions système et les actions utilisateur.",
        "tags": ["Conception", "Mermaid", "Architecture", "UX"]
    },
    {
        "id": "test-crud-supabase-ts",
        "title": "Validation CRUD Supabase (scripts/test-crud.ts)",
        "description": "Création et exécution d'un script de test automatisé validant les opérations Create, Read, Update et Delete sur une table Supabase.",
        "prompt": "Crée un script de test scripts/test-crud.ts qui valide les 4 opérations CRUD (Create, Read, Update, Delete) sur notre table Supabase, puis exécute-le.",
        "tags": ["Test", "Supabase", "TypeScript", "Backend", "CRUD"]
    },
    {
        "id": "prompt-zero-cadrage",
        "title": "Prompt Zéro : Cadrage initial et architecture",
        "description": "Cadrer le projet avec l'agent avant d'écrire la moindre ligne de code.",
        "prompt": "Agis en tant qu'architecte logiciel et formateur Vibe Coding. Nous allons initialiser un nouveau projet web. Ne génère aucun code pour l'instant. Pose 3 questions ciblées pour valider le périmètre fonctionnel, les outils retenus et la structure des données avant de rédiger le plan d'action.",
        "tags": ["Exemple", "Cadrage", "Méthode"]
    },
    {
        "id": "decoupage-modulaire-clean",
        "title": "Refactoring modulaire d'un composant monolithique",
        "description": "Découper un composant trop volumineux en briques indépendantes.",
        "prompt": "Ce composant dépasse 300 lignes et cumule trop de responsabilités. Analyse sa structure et découpe-le en sous-composants réutilisables dans un sous-dossier dédié, sans modifier aucune fonctionnalité visuelle ni logique métier. Présente d'abord le plan de découpe.",
        "tags": ["Exemple", "Refactoring", "Clean Code", "Frontend"]
    },
    {
        "id": "analyse-resolution-bug",
        "title": "Diagnostic d'erreur console et correction ciblée",
        "description": "Identifier la cause racine d'un bug sans casser les fonctionnalités existantes.",
        "prompt": "Voici le message d'erreur console exact et le contexte du problème : [COLLER L'ERREUR ICI]. Analyse la chaîne d'exécution, explique la cause racine en une phrase simple, puis propose la correction minimale nécessaire sans introduire de régression.",
        "tags": ["Exemple", "Débogage", "Maintenance"]
    },
    {
        "id": "isolation-secrets-env",
        "title": "Migration et isolation des secrets dans .env.local",
        "description": "Sécuriser les clés API et paramètres sensibles hors du code source public.",
        "prompt": "Audit le code pour repérer toutes les clés d'API, secrets ou URLs sensibles codés en dur. Déplace-les dans un fichier .env.local, crée un gabarit .env.example avec des valeurs fictives documentées, et adapte le code pour consommer ces variables de façon sécurisée.",
        "tags": ["Exemple", "Sécurité", "Architecture"]
    },
    {
        "id": "composant-ui-accessible",
        "title": "Composant UI accessible, responsive et mobile-first",
        "description": "Créer un composant autonome avec gestion clavier, ARIA et responsive.",
        "prompt": "Crée un composant d'interface [NOM DU COMPOSANT] en respectant une approche mobile-first stricte. Il doit s'adapter à toutes les largeurs d'écran, respecter les standards d'accessibilité (contraste, focus visible, balises sémantiques) et être entièrement autonome.",
        "tags": ["Exemple", "UI / UX", "Frontend", "Accessibilité"]
    },
    {
        "id": "mock-api-front-first",
        "title": "Mise en place d'un service mock de données",
        "description": "Simuler une API avec latence réseau pour développer l'interface en avance.",
        "prompt": "Nous développons l'interface avant le serveur. Crée un service de données fictives (mock) réaliste avec un délai simulé de 300ms pour imiter une requête réseau réelle. Gère les états de chargement, de succès et un cas d'erreur simulé pour tester la robustesse de l'affichage.",
        "tags": ["Exemple", "Mock", "Architecture", "Frontend"]
    },
    {
        "id": "optimisation-performance-web",
        "title": "Audit et optimisation de la vitesse d'affichage",
        "description": "Fluidifier l'application et supprimer les ralentissements sur mobile.",
        "prompt": "Analyse les performances de cette page web. Repère les goulots d'étranglement (chargements superflus, recalculs de style, taille des assets) et applique les optimisations prioritaires pour rendre l'interface instantanée, même avec un réseau mobile bridé.",
        "tags": ["Exemple", "Performance", "Frontend", "Mobile"]
    },
    {
        "id": "securisation-formulaire-xss",
        "title": "Validation stricte et assainissement d'un formulaire",
        "description": "Empêcher les injections de code et valider les saisies utilisateurs.",
        "prompt": "Audit et renforce la sécurité de ce formulaire. Mets en place une validation stricte côté client (formats attendus, longueur maximale) et assainis les données avant tout affichage ou envoi pour prévenir les attaques de type injection XSS.",
        "tags": ["Exemple", "Sécurité", "Frontend"]
    },
    {
        "id": "export-donnees-client",
        "title": "Fonctionnalité d'export de données (CSV / JSON)",
        "description": "Générer et télécharger un fichier de données directement depuis le navigateur.",
        "prompt": "Ajoute une action permettant à l'utilisateur d'exporter la liste des éléments actuellement filtrés dans un fichier CSV ou JSON téléchargeable en un clic, exécuté directement côté navigateur sans dépendance lourde.",
        "tags": ["Exemple", "Fonctionnalité", "Data"]
    },
    {
        "id": "theme-sombre-persistant",
        "title": "Interrupteur Mode Sombre / Clair avec localStorage",
        "description": "Gestion fluide de thème avec détection système et persistance.",
        "prompt": "Implémente un interrupteur de thème clair / sombre basé sur les variables CSS de la charte. L'état doit être mémorisé dans le localStorage et respecter par défaut la préférence système (prefers-color-scheme) au premier chargement de la page.",
        "tags": ["Exemple", "UI / UX", "Frontend"]
    }
]

prompt_tags_set = set()
for p in prompts_data:
    for t in p["tags"]:
        prompt_tags_set.add(t)

prompt_tags_list = sorted(list(prompt_tags_set))


# --- 3. BOÎTE À OUTILS & LIENS DE CONNEXION ---
tools_data = [
    {
        "id": "google-ai-pro",
        "name": "Google AI Pro",
        "category": "IA & Modèles",
        "description": "Forfait Gemini Pro pour débloquer les modèles IA avancés et bénéficier de quotas de requêtes étendus pour vos sessions de code.",
        "url": "https://one.google.com/ai",
        "actionText": "S'abonner à Google AI Pro",
        "icon": "🧠"
    },
    {
        "id": "google-ai-studio",
        "name": "Google AI Studio",
        "category": "IA & Modèles",
        "description": "Console développeur de Google pour tester vos prompts système, prototyper et générer vos clés d'API Gemini gratuites.",
        "url": "https://aistudio.google.com/apps",
        "actionText": "Accéder à AI Studio",
        "icon": "⚡"
    },
    {
        "id": "google-antigravity",
        "name": "Google Antigravity",
        "category": "IA & Modèles",
        "description": "L'IDE agentique nouvelle génération de Google pour orchestrer et exécuter des agents IA autonomes directement dans votre code local.",
        "url": "https://antigravity.google/download/",
        "actionText": "Télécharger Antigravity",
        "icon": "👾"
    },
    {
        "id": "github",
        "name": "GitHub",
        "category": "Code & Déploiement",
        "description": "Plateforme incontournable d'hébergement Git pour versionner votre code source, sécuriser l'historique et collaborer avec vos agents IA.",
        "url": "https://github.com/signup",
        "actionText": "Créer un compte GitHub",
        "icon": "🐙"
    },
    {
        "id": "vercel",
        "name": "Vercel",
        "category": "Code & Déploiement",
        "description": "Plateforme cloud pour déployer vos applications web en continu avec certificats HTTPS automatiques, CDN mondial et Serverless.",
        "url": "https://vercel.com/signup",
        "actionText": "Créer un compte Vercel",
        "icon": "▲"
    },
    {
        "id": "supabase",
        "name": "Supabase",
        "category": "Backend & Monétisation",
        "description": "Backend as a Service complet : base de données relationnelle PostgreSQL Cloud, authentification sécurisée et Row Level Security (RLS).",
        "url": "https://supabase.com/dashboard/sign-up",
        "actionText": "Créer un compte Supabase",
        "icon": "⚡"
    },
    {
        "id": "stripe",
        "name": "Stripe",
        "category": "Backend & Monétisation",
        "description": "Infrastructure de paiement en ligne de référence pour encaisser vos premiers clients, gérer les abonnements et monétiser vos projets.",
        "url": "https://dashboard.stripe.com/register",
        "actionText": "Créer un compte Stripe",
        "icon": "💳"
    }
]
tools_json = json.dumps(tools_data, ensure_ascii=False)

terms_json = json.dumps(glossary_rows, ensure_ascii=False)
prompts_json = json.dumps(prompts_data, ensure_ascii=False)
quiz_json = json.dumps(QUIZ_DATA, ensure_ascii=False)

html_content = f"""<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
  <title>Le Glossaire & Bibliothèque de Prompts Vibe Coding</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cousine:wght@400;700&family=Plus+Jakarta+Sans:wght@500;600;700;800;900&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    :root {{
      --color-brand-purple: #6634D9;
      --color-brand-fig: #18093B;
      --color-brand-sunny: #FFFF77;
      --color-brand-pink: #FFB2B2;
      --color-pink-20: #FCF1F0;
      --color-bg-light: #F8FAFC;
      --color-card-bg: #FFFFFF;
      --color-border: #E2E8F0;
      --color-border-dark: #CBD5E1;
      --color-text-dark: #18093B;
      --color-text-muted: #64748B;
      --font-main: 'Basic Sans Alt', 'Plus Jakarta Sans', 'Inter', -apple-system, sans-serif;
      --font-code: 'Cousine', monospace;
    }}

    * {{
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      -webkit-tap-highlight-color: transparent;
    }}

    body {{
      font-family: var(--font-main);
      background-color: var(--color-bg-light);
      color: var(--color-text-dark);
      line-height: 1.5;
      padding: 0;
      margin: 0;
    }}

    .app-viewport {{
      width: 100%;
      max-width: 960px;
      margin: 0 auto;
      padding: 1rem 1rem 3rem 1rem;
    }}

    @media (min-width: 640px) {{
      .app-viewport {{
        padding: 2rem 1.5rem 4rem 1.5rem;
      }}
    }}

    /* Header */
    header {{
      background: var(--color-brand-fig);
      color: #FFFFFF;
      padding: 1.5rem 1.25rem;
      border: 3px solid var(--color-brand-fig);
      box-shadow: 4px 4px 0px var(--color-brand-purple);
      margin-bottom: 1rem;
    }}

    .header-top {{
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.5rem;
    }}

    .brand-badge {{
      background: var(--color-brand-sunny);
      color: var(--color-brand-fig);
      font-weight: 900;
      font-size: 0.75rem;
      padding: 0.25rem 0.6rem;
      border: 1px solid var(--color-brand-fig);
      text-transform: uppercase;
    }}

    h1 {{
      font-size: clamp(1.4rem, 4.5vw, 2.1rem);
      font-weight: 900;
      line-height: 1.15;
      text-transform: uppercase;
      letter-spacing: -0.02em;
    }}

    .header-desc {{
      margin-top: 0.4rem;
      font-size: 0.92rem;
      font-weight: 600;
      color: var(--color-brand-sunny);
    }}

    /* Navigation Tabs */
    .tab-nav {{
      display: flex;
      gap: 0.5rem;
      margin-bottom: 1.25rem;
      border-bottom: 3px solid var(--color-brand-fig);
      padding-bottom: 0.5rem;
      overflow-x: auto;
    }}

    .tab-btn {{
      background: #FFFFFF;
      color: var(--color-brand-fig);
      border: 2px solid var(--color-brand-fig);
      padding: 0.65rem 1.1rem;
      font-family: var(--font-main);
      font-weight: 800;
      font-size: 0.92rem;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      text-transform: uppercase;
      letter-spacing: 0.02em;
      transition: all 0.15s ease;
      white-space: nowrap;
      box-shadow: 2px 2px 0px var(--color-brand-fig);
    }}

    .tab-btn:hover {{
      background: var(--color-pink-20);
    }}

    .tab-btn.active {{
      background: var(--color-brand-purple);
      color: #FFFFFF;
      border-color: var(--color-brand-fig);
      box-shadow: 2px 2px 0px var(--color-brand-fig);
    }}

    .tab-badge {{
      background: var(--color-brand-fig);
      color: var(--color-brand-sunny);
      padding: 0.1rem 0.4rem;
      font-size: 0.75rem;
      font-weight: 900;
    }}

    .tab-btn.active .tab-badge {{
      background: var(--color-brand-sunny);
      color: var(--color-brand-fig);
    }}

    /* Shared Search & Filter Boxes */
    .search-filter-section {{
      background: #FFFFFF;
      border: 2px solid var(--color-brand-fig);
      box-shadow: 4px 4px 0px var(--color-brand-fig);
      padding: 1.25rem;
      margin-bottom: 1.25rem;
      display: flex;
      flex-direction: column;
      gap: 0.85rem;
    }}

    .search-box {{
      position: relative;
      width: 100%;
    }}

    .search-input {{
      width: 100%;
      padding: 0.85rem 1rem 0.85rem 2.75rem;
      font-family: var(--font-main);
      font-size: 1rem;
      font-weight: 600;
      color: var(--color-brand-fig);
      background: #FFFFFF;
      border: 2px solid var(--color-brand-fig);
      outline: none;
      transition: border-color 0.2s, box-shadow 0.2s;
    }}

    .search-input:focus {{
      border-color: var(--color-brand-purple);
      box-shadow: 0 0 0 3px rgba(102, 52, 217, 0.2);
    }}

    .search-icon {{
      position: absolute;
      left: 0.9rem;
      top: 50%;
      transform: translateY(-50%);
      font-size: 1.1rem;
      color: var(--color-brand-fig);
      pointer-events: none;
    }}

    .clear-btn {{
      position: absolute;
      right: 0.75rem;
      top: 50%;
      transform: translateY(-50%);
      background: #E2E8F0;
      border: none;
      color: #475569;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      cursor: pointer;
      font-weight: bold;
      display: none;
      align-items: center;
      justify-content: center;
      font-size: 0.8rem;
    }}

    .toggle-filters-btn {{
      background: #F1F5F9;
      color: var(--color-brand-fig);
      border: 1px solid var(--color-brand-fig);
      padding: 0.6rem 1rem;
      font-family: var(--font-main);
      font-size: 0.85rem;
      font-weight: 800;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      text-transform: uppercase;
      letter-spacing: 0.02em;
      transition: background 0.15s ease;
    }}

    .toggle-filters-btn:hover {{
      background: #E2E8F0;
    }}

    .toggle-icon {{
      font-size: 0.75rem;
      transition: transform 0.2s ease;
    }}

    .toggle-icon.open {{
      transform: rotate(180deg);
    }}

    .filters-panel {{
      display: flex;
      flex-direction: column;
      gap: 1rem;
      padding-top: 0.5rem;
      border-top: 1px dashed var(--color-border);
    }}

    .filters-panel.collapsed {{
      display: none;
    }}

    .filter-group {{
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
    }}

    .filter-label {{
      font-size: 0.8rem;
      font-weight: 800;
      text-transform: uppercase;
      color: var(--color-brand-fig);
      letter-spacing: 0.03em;
    }}

    .pills-row {{
      display: flex;
      gap: 0.4rem;
      overflow-x: auto;
      padding-bottom: 0.4rem;
      scrollbar-width: thin;
      -webkit-overflow-scrolling: touch;
    }}

    .pills-row::-webkit-scrollbar {{
      height: 4px;
    }}
    .pills-row::-webkit-scrollbar-thumb {{
      background: var(--color-brand-purple);
    }}

    .pill-btn {{
      background: #F1F5F9;
      color: var(--color-brand-fig);
      border: 1px solid var(--color-brand-fig);
      padding: 0.3rem 0.75rem;
      font-family: var(--font-main);
      font-size: 0.82rem;
      font-weight: 700;
      cursor: pointer;
      white-space: nowrap;
      transition: all 0.15s ease;
      flex-shrink: 0;
    }}

    .pill-btn:hover {{
      background: #E2E8F0;
    }}

    .pill-btn.active {{
      background: var(--color-brand-fig);
      color: var(--color-brand-sunny);
    }}

    .pill-btn.tag-exemple {{
      border-color: #be123c;
    }}
    .pill-btn.tag-exemple.active {{
      background: #be123c;
      color: #FFFFFF;
    }}

    .alpha-bar {{
      display: flex;
      gap: 0.3rem;
      overflow-x: auto;
      padding-bottom: 0.3rem;
    }}

    .alpha-btn {{
      min-width: 32px;
      height: 32px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background: #F1F5F9;
      color: var(--color-brand-fig);
      border: 1px solid var(--color-brand-fig);
      font-family: var(--font-main);
      font-size: 0.85rem;
      font-weight: 800;
      cursor: pointer;
      flex-shrink: 0;
    }}

    .alpha-btn.active {{
      background: var(--color-brand-purple);
      color: #FFFFFF;
      border-color: var(--color-brand-fig);
    }}

    .results-bar {{
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
      padding: 0 0.25rem;
      font-size: 0.85rem;
      font-weight: 700;
      color: var(--color-text-muted);
    }}

    .counter-tag {{
      background: var(--color-brand-purple);
      color: #FFFFFF;
      padding: 0.15rem 0.55rem;
      font-weight: 800;
    }}

    /* Tab Content Wrappers */
    .tab-view {{
      display: none;
    }}
    .tab-view.active {{
      display: block;
    }}

    /* Cards - Glossaire */
    .cards-container {{
      display: flex;
      flex-direction: column;
      gap: 0.9rem;
    }}

    .card-item {{
      background: var(--color-card-bg);
      border: 1px solid var(--color-border);
      border-left: 4px solid var(--color-brand-purple);
      padding: 1.1rem 1.25rem;
      box-shadow: 0 2px 6px rgba(0,0,0,0.04);
      transition: transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }}

    .card-item:hover {{
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(0,0,0,0.08);
      border-color: var(--color-brand-fig);
    }}

    .card-header {{
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 0.75rem;
      flex-wrap: wrap;
    }}

    .term-title {{
      font-size: 1.2rem;
      font-weight: 800;
      color: var(--color-brand-fig);
      letter-spacing: -0.01em;
      word-break: break-word;
    }}

    .type-badge {{
      background: var(--color-brand-fig);
      color: var(--color-brand-sunny);
      font-weight: 800;
      font-size: 0.72rem;
      padding: 0.2rem 0.6rem;
      border: 1px solid var(--color-brand-fig);
      text-transform: uppercase;
      white-space: nowrap;
    }}

    .term-def {{
      font-size: 0.95rem;
      font-weight: 500;
      color: var(--color-brand-fig);
      line-height: 1.5;
    }}

    .card-footer {{
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-top: 0.25rem;
      padding-top: 0.5rem;
      border-top: 1px dashed var(--color-border);
      font-size: 0.8rem;
      font-weight: 700;
      flex-wrap: wrap;
    }}

    .ref-code {{
      background: var(--color-brand-purple);
      color: #FFFFFF;
      padding: 0.15rem 0.5rem;
      font-size: 0.75rem;
      font-weight: 900;
    }}

    .ref-title {{
      color: var(--color-text-muted);
      font-weight: 600;
    }}


    /* Cards - Tools Section */
    .tools-intro-banner {{
      background: var(--color-pink-20);
      border: 2px solid var(--color-brand-fig);
      box-shadow: 3px 3px 0px var(--color-brand-fig);
      padding: 1.15rem 1.35rem;
      margin-bottom: 1.25rem;
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
    }}

    .tools-intro-badge {{
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      font-size: 0.75rem;
      font-weight: 800;
      text-transform: uppercase;
      color: var(--color-brand-purple);
    }}

    .tools-intro-title {{
      font-size: 1.05rem;
      font-weight: 800;
      color: var(--color-brand-fig);
    }}

    .tools-intro-desc {{
      font-size: 0.88rem;
      color: var(--color-text-dark);
      line-height: 1.45;
    }}

    .tools-grid {{
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(285px, 1fr));
      gap: 1rem;
      margin-top: 1rem;
    }}

    .tool-card {{
      background: var(--color-card-bg);
      border: 1px solid var(--color-border);
      border-left: 4px solid var(--color-brand-purple);
      box-shadow: 0 2px 6px rgba(0,0,0,0.04);
      padding: 1.25rem 1.35rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 1rem;
      transition: transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease;
    }}

    .tool-card:hover {{
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(0,0,0,0.08);
      border-color: var(--color-brand-fig);
    }}

    .tool-card-header {{
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 0.5rem;
    }}

    .tool-card-title {{
      font-size: 1.15rem;
      font-weight: 800;
      color: var(--color-brand-fig);
      display: flex;
      align-items: center;
      gap: 0.45rem;
      line-height: 1.25;
    }}

    .tool-card-badge {{
      background: #F1F5F9;
      color: var(--color-brand-fig);
      border: 1px solid var(--color-border-dark);
      font-size: 0.70rem;
      font-weight: 800;
      padding: 0.15rem 0.45rem;
      text-transform: uppercase;
      white-space: nowrap;
    }}

    .tool-card-desc {{
      font-size: 0.90rem;
      color: var(--color-text-muted);
      line-height: 1.45;
      font-weight: 500;
    }}

    .tool-card-footer {{
      display: flex;
      flex-direction: column;
      gap: 0.45rem;
      padding-top: 0.6rem;
      border-top: 1px dashed var(--color-border);
    }}

    .tool-card-btn {{
      background: var(--color-brand-purple);
      color: #FFFFFF;
      text-decoration: none;
      padding: 0.65rem 1rem;
      font-family: var(--font-main);
      font-weight: 800;
      font-size: 0.88rem;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.45rem;
      border: 2px solid var(--color-brand-fig);
      box-shadow: 2px 2px 0px var(--color-brand-fig);
      transition: all 0.15s ease;
      cursor: pointer;
    }}

    .tool-card-btn:hover {{
      background: var(--color-brand-fig);
      color: #FFFFFF;
      transform: translateY(-1px);
      box-shadow: 3px 3px 0px var(--color-brand-fig);
    }}

    .tool-card-url {{
      font-family: var(--font-code);
      font-size: 0.75rem;
      color: var(--color-text-muted);
      text-align: center;
    }}

    /* Cards - Prompts Library (Bordures subtiles & fond gris très clair) */
    .prompt-card {{
      background: var(--color-card-bg);
      border: 1px solid var(--color-border);
      border-left: 4px solid var(--color-brand-purple);
      box-shadow: 0 2px 6px rgba(0,0,0,0.04);
      padding: 1.2rem 1.35rem;
      display: flex;
      flex-direction: column;
      gap: 0.85rem;
      transition: transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease;
    }}

    .prompt-card:hover {{
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(0,0,0,0.08);
      border-color: var(--color-brand-fig);
    }}

    .prompt-header {{
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 0.75rem;
      flex-wrap: wrap;
    }}

    .prompt-title {{
      font-size: 1.18rem;
      font-weight: 800;
      color: var(--color-brand-fig);
      letter-spacing: -0.01em;
      line-height: 1.3;
    }}

    .prompt-desc {{
      font-size: 0.92rem;
      color: var(--color-text-muted);
      font-weight: 500;
      line-height: 1.45;
    }}

    .prompt-tags {{
      display: flex;
      gap: 0.35rem;
      flex-wrap: wrap;
    }}

    .prompt-tag-badge {{
      background: #F1F5F9;
      color: var(--color-brand-fig);
      border: 1px solid var(--color-border-dark);
      font-size: 0.72rem;
      font-weight: 800;
      padding: 0.15rem 0.5rem;
      text-transform: uppercase;
      cursor: pointer;
      transition: background 0.15s ease, border-color 0.15s ease;
    }}

    .prompt-tag-badge:hover {{
      background: #E2E8F0;
      border-color: var(--color-brand-fig);
    }}

    .prompt-tag-badge.badge-example {{
      background: #ffe4e6;
      color: #be123c;
      border-color: #fda4af;
    }}

    /* Zone de texte du prompt : FOND GRIS TRÈS CLAIR (pas rose) & Police Cousine */
    .prompt-box-wrapper {{
      position: relative;
    }}

    .prompt-text-block {{
      font-family: var(--font-code);
      font-size: 0.93rem;
      line-height: 1.55;
      background: #F8FAFC; /* Gris très clair neutre */
      border: 1px solid var(--color-border);
      color: #18093B;
      padding: 0.95rem 1.1rem;
      white-space: pre-wrap;
      word-break: break-word;
      user-select: text;
    }}

    .prompt-actions {{
      display: flex;
      gap: 0.6rem;
      flex-wrap: wrap;
      align-items: center;
    }}

    .btn-copy-prompt {{
      background: var(--color-brand-fig);
      color: var(--color-brand-sunny);
      border: 1px solid var(--color-brand-fig);
      padding: 0.5rem 0.95rem;
      font-family: var(--font-main);
      font-size: 0.82rem;
      font-weight: 800;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      text-transform: uppercase;
      transition: all 0.15s ease;
    }}

    .btn-copy-prompt:hover {{
      background: #251052;
      transform: translateY(-1px);
    }}

    .btn-copy-prompt.copied {{
      background: #15803d;
      color: #FFFFFF;
      border-color: #15803d;
    }}

    .btn-share-prompt {{
      background: #FFFFFF;
      color: var(--color-brand-fig);
      border: 1px solid var(--color-border-dark);
      padding: 0.5rem 0.85rem;
      font-family: var(--font-main);
      font-size: 0.8rem;
      font-weight: 700;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      text-transform: uppercase;
      transition: background 0.15s ease, border-color 0.15s ease;
    }}

    .btn-share-prompt:hover {{
      background: #F1F5F9;
      border-color: var(--color-brand-fig);
    }}

    .btn-share-prompt.copied {{
      background: #dcfce7;
      color: #166534;
      border-color: #86efac;
    }}

    /* Navigation Mode Isolé : Simple bouton de retour (plus de bandeau jaune) */
    .isolated-nav {{
      display: none;
      margin-bottom: 1rem;
    }}

    .isolated-nav.active {{
      display: flex;
      align-items: center;
    }}

    .btn-back-all {{
      background: #FFFFFF;
      color: var(--color-brand-fig);
      border: 1px solid var(--color-border-dark);
      padding: 0.55rem 1rem;
      font-family: var(--font-main);
      font-size: 0.85rem;
      font-weight: 800;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      transition: background 0.15s ease, border-color 0.15s ease;
      box-shadow: 0 1px 3px rgba(0,0,0,0.04);
    }}

    .btn-back-all:hover {{
      background: #F1F5F9;
      border-color: var(--color-brand-fig);
    }}

    /* Surlignage de recherche */
    mark {{
      background: var(--color-brand-sunny);
      color: var(--color-brand-fig);
      padding: 0;
      margin: 0;
      font-weight: inherit;
      font-style: inherit;
    }}

    .empty-state {{
      background: #FFFFFF;
      border: 2px dashed var(--color-border);
      padding: 3rem 1.5rem;
      text-align: center;
      display: none;
    }}

    .empty-title {{
      font-size: 1.2rem;
      font-weight: 800;
      color: var(--color-brand-fig);
      margin-bottom: 0.5rem;
    }}

    .empty-desc {{
      font-size: 0.9rem;
      color: var(--color-text-muted);
      margin-bottom: 1rem;
    }}

    .reset-btn {{
      background: var(--color-brand-purple);
      color: var(--color-brand-sunny);
      border: 2px solid var(--color-brand-fig);
      padding: 0.6rem 1.2rem;
      font-family: var(--font-main);
      font-weight: 800;
      font-size: 0.85rem;
      cursor: pointer;
      text-transform: uppercase;
    }}

    /* Toast notification */
    .toast-msg {{
      position: fixed;
      bottom: 1.5rem;
      right: 1.5rem;
      background: var(--color-brand-fig);
      color: var(--color-brand-sunny);
      border: 2px solid var(--color-brand-sunny);
      padding: 0.75rem 1.25rem;
      font-weight: 800;
      font-size: 0.88rem;
      box-shadow: 4px 4px 0px var(--color-brand-purple);
      z-index: 1000;
      transform: translateY(150%);
      transition: transform 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      pointer-events: none;
    }}

    .toast-msg.show {{
      transform: translateY(0);
    }}

    /* ============================================== */
    /* STYLES DU QUIZ (NEOBRUTALISME ADAPTÉ)          */
    /* ============================================== */
    .quiz-screen {{
      display: none;
    }}
    .quiz-screen.active {{
      display: block;
    }}

    /* Grille des modules */
    .quiz-modules-grid {{
      display: grid;
      grid-template-columns: 1fr;
      gap: 1.25rem;
    }}
    @media (min-width: 640px) {{
      .quiz-modules-grid {{
        grid-template-columns: repeat(2, 1fr);
      }}
    }}

    .quiz-module-card {{
      background: var(--color-card-bg);
      border: 1px solid var(--color-border);
      border-left: 4px solid var(--color-brand-purple);
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
      padding: 1.25rem 1.35rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 0.85rem;
      transition: transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease;
      cursor: pointer;
    }}
    .quiz-module-card:hover {{
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
      border-color: var(--color-brand-fig);
    }}
    .quiz-module-card:focus-visible {{
      outline: 2px solid var(--color-brand-purple);
      outline-offset: 2px;
    }}
    .quiz-module-top {{
      display: flex;
      justify-content: space-between;
      align-items: center;
    }}
    .quiz-module-code {{
      background: var(--color-brand-purple) !important;
      color: #FFFFFF !important;
      font-weight: 800;
      font-size: 0.75rem;
      padding: 0.18rem 0.55rem;
      border: none;
      letter-spacing: 0.04em;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }}
    .quiz-module-count {{
      font-size: 0.75rem;
      font-weight: 800;
      color: var(--color-text-muted);
      text-transform: uppercase;
    }}
    .quiz-module-title {{
      font-size: 1.08rem;
      font-weight: 800;
      color: var(--color-brand-fig);
      line-height: 1.3;
    }}
    .quiz-module-desc {{
      font-size: 0.88rem;
      color: #475569;
      line-height: 1.45;
      flex-grow: 1;
    }}
    .quiz-module-footer {{
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 0.75rem;
      border-top: 1px dashed var(--color-border);
      gap: 0.5rem;
      flex-wrap: wrap;
    }}
    .btn-start-module {{
      background: #FFFFFF;
      color: var(--color-brand-fig);
      border: 1px solid var(--color-border);
      padding: 0.42rem 0.85rem;
      font-family: var(--font-main);
      font-size: 0.82rem;
      font-weight: 800;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      text-transform: uppercase;
      transition: all 0.15s ease;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
      margin-left: auto;
    }}
    .btn-start-module:hover {{
      background: var(--color-brand-fig);
      color: var(--color-brand-sunny);
      border-color: var(--color-brand-fig);
      transform: translateY(-1px);
      box-shadow: 0 4px 10px rgba(24, 9, 59, 0.15);
    }}

    /* Score badges / pills */
    .quiz-score-pill {{
      font-size: 0.76rem;
      font-weight: 800;
      padding: 0.2rem 0.55rem;
      border: 1px solid transparent;
      display: inline-flex;
      align-items: center;
      gap: 0.3rem;
      text-transform: uppercase;
    }}
    .quiz-score-pill.neutral {{
      background: #F1F5F9;
      color: var(--color-text-muted);
      border-color: var(--color-border);
    }}
    .quiz-score-pill.success {{
      background: #DCFCE7;
      color: #15803D;
      border-color: #86EFAC;
    }}
    .quiz-score-pill.warning {{
      background: #FEF3C7;
      color: #92400E;
      border-color: #FCD34D;
    }}

    /* Carte mise en avant : Simulation Officielle (placée sous les 6 modules) */
    .quiz-featured-card {{
      background: var(--color-card-bg);
      border: 1px solid var(--color-border);
      border-left: 6px solid var(--color-brand-purple);
      box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
      padding: 1.4rem 1.5rem;
      margin-bottom: 2rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      transition: transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease;
      cursor: pointer;
    }}
    .quiz-featured-card:hover {{
      transform: translateY(-2px);
      box-shadow: 0 8px 22px rgba(102, 52, 217, 0.12);
      border-color: var(--color-brand-purple);
    }}
    .quiz-featured-card:focus-visible {{
      outline: 2px solid var(--color-brand-purple);
      outline-offset: 2px;
    }}
    .quiz-featured-header {{
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 0.75rem;
      flex-wrap: wrap;
    }}
    .quiz-featured-badge {{
      background: var(--color-brand-fig);
      color: var(--color-brand-sunny);
      font-weight: 800;
      font-size: 0.72rem;
      padding: 0.2rem 0.6rem;
      border: 1px solid var(--color-brand-fig);
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }}
    .quiz-featured-title {{
      font-size: clamp(1.2rem, 3vw, 1.55rem);
      font-weight: 800;
      text-transform: uppercase;
      color: var(--color-brand-fig);
      line-height: 1.25;
      letter-spacing: -0.01em;
    }}
    .quiz-featured-desc {{
      font-size: 0.92rem;
      color: #475569;
      line-height: 1.5;
      margin-top: 0.35rem;
    }}
    .quiz-featured-footer {{
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 0.75rem;
      padding-top: 0.85rem;
      border-top: 1px dashed var(--color-border);
    }}
    .quiz-featured-meta {{
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.82rem;
      font-weight: 700;
      color: var(--color-text-muted);
    }}
    .btn-launch-exam {{
      background: var(--color-brand-purple);
      color: #FFFFFF;
      border: 1px solid var(--color-brand-purple);
      padding: 0.65rem 1.25rem;
      font-family: var(--font-main);
      font-weight: 800;
      font-size: 0.88rem;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      text-transform: uppercase;
      box-shadow: 0 2px 8px rgba(102, 52, 217, 0.25);
      transition: all 0.15s ease;
    }}
    .btn-launch-exam:hover {{
      background: #5325b8;
      border-color: #5325b8;
      transform: translateY(-1px);
      box-shadow: 0 4px 14px rgba(102, 52, 217, 0.35);
    }}

    /* ============================================== */
    /* ÉCRAN GAMEPLAY                                  */
    /* ============================================== */
    .quiz-game-header {{
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
      gap: 0.75rem;
      flex-wrap: wrap;
    }}
    .btn-back-modules {{
      background: #FFFFFF;
      color: var(--color-brand-fig);
      border: 1px solid var(--color-border);
      padding: 0.45rem 0.9rem;
      font-family: var(--font-main);
      font-size: 0.82rem;
      font-weight: 800;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      text-transform: uppercase;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
      transition: all 0.15s ease;
    }}
    .btn-back-modules:hover {{
      background: #F1F5F9;
      border-color: var(--color-brand-fig);
    }}
    .quiz-stats-group {{
      display: flex;
      gap: 0.5rem;
      align-items: center;
    }}
    .quiz-stat-pill {{
      background: #FFFFFF;
      border: 1px solid var(--color-border);
      padding: 0.35rem 0.75rem;
      font-size: 0.8rem;
      font-weight: 800;
      color: var(--color-brand-fig);
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);
      text-transform: uppercase;
    }}
    .quiz-stat-pill.highlight {{
      background: var(--color-brand-purple);
      color: #FFFFFF;
      border-color: var(--color-brand-purple);
    }}

    /* Barre de progression (P2: GPU-accelerated transform) */
    .quiz-progress-bar-container {{
      width: 100%;
      height: 8px;
      background: #E2E8F0;
      border: 1px solid var(--color-border);
      margin-bottom: 1.25rem;
      overflow: hidden;
      border-radius: 4px;
    }}
    .quiz-progress-fill {{
      height: 100%;
      background: var(--color-brand-purple);
      width: 100%;
      transform-origin: left;
      transform: scaleX(0);
      transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    }}

    /* Carte de la question (P2 + Quieter : fond doux et sobre) */
    .quiz-question-box {{
      background: var(--color-card-bg);
      border: 1px solid var(--color-border);
      border-left: 4px solid var(--color-brand-purple);
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
      padding: 1.4rem 1.5rem;
      margin-bottom: 1.25rem;
    }}
    @media (min-width: 640px) {{
      .quiz-question-box {{
        padding: 1.8rem 1.85rem;
      }}
    }}
    .quiz-question-meta {{
      font-size: 0.78rem;
      font-weight: 800;
      text-transform: uppercase;
      color: var(--color-brand-purple);
      margin-bottom: 0.6rem;
      letter-spacing: 0.05em;
    }}
    .quiz-question-text {{
      font-size: clamp(1.15rem, 3.2vw, 1.4rem);
      font-weight: 800;
      color: var(--color-brand-fig);
      line-height: 1.4;
      letter-spacing: -0.01em;
    }}

    /* Options de réponse (Quieter : style épuré, doux au hover) */
    .quiz-options-list {{
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }}
    .quiz-option-btn {{
      background: var(--color-card-bg);
      border: 1px solid var(--color-border);
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.03);
      padding: 0.95rem 1.15rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      cursor: pointer;
      font-family: var(--font-main);
      text-align: left;
      transition: all 0.15s ease;
      user-select: none;
    }}
    .quiz-option-btn:hover:not(.disabled) {{
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(102, 52, 217, 0.08);
      border-color: var(--color-brand-purple);
      background: #F8FAFC;
    }}
    .quiz-option-btn:focus-visible {{
      outline: 2px solid var(--color-brand-purple);
      outline-offset: 2px;
    }}
    .quiz-option-btn:active:not(.disabled) {{
      transform: translateY(0);
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
    }}
    .quiz-option-content {{
      display: flex;
      align-items: center;
      gap: 0.85rem;
      flex-grow: 1;
    }}
    .quiz-option-letter {{
      background: #F1F5F9;
      color: var(--color-brand-fig);
      border: 1px solid var(--color-border);
      width: 28px;
      height: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 800;
      font-size: 0.82rem;
      flex-shrink: 0;
      transition: all 0.15s ease;
    }}
    .quiz-option-btn:hover:not(.disabled) .quiz-option-letter {{
      border-color: var(--color-brand-purple);
      color: var(--color-brand-purple);
    }}
    .quiz-option-text {{
      font-size: 0.95rem;
      font-weight: 600;
      color: var(--color-brand-fig);
      line-height: 1.4;
    }}
    .quiz-option-status-icon {{
      font-size: 1.2rem;
      font-weight: 900;
      display: none;
      flex-shrink: 0;
    }}
    .quiz-option-btn.selected-correct {{
      background: #F0FDF4 !important;
      border-color: #22C55E !important;
      box-shadow: 0 4px 12px rgba(34, 197, 94, 0.15) !important;
    }}
    .quiz-option-btn.selected-correct .quiz-option-letter {{
      background: #16A34A;
      color: #FFFFFF;
      border-color: #16A34A;
    }}
    .quiz-option-btn.selected-correct .quiz-option-status-icon {{
      display: block;
      color: #16A34A;
    }}
    .quiz-option-btn.selected-wrong {{
      background: #FEF2F2 !important;
      border-color: #EF4444 !important;
      box-shadow: 0 4px 12px rgba(239, 68, 68, 0.15) !important;
    }}
    .quiz-option-btn.selected-wrong .quiz-option-letter {{
      background: #DC2626;
      color: #FFFFFF;
      border-color: #DC2626;
    }}
    .quiz-option-btn.selected-wrong .quiz-option-status-icon {{
      display: block;
      color: #DC2626;
    }}
    .quiz-option-btn.dimmed {{
      opacity: 0.45;
      cursor: default;
    }}
    .quiz-option-btn.disabled {{
      pointer-events: none;
    }}

    /* ============================================== */
    /* MODAL EXPLICATION PÉDAGOGIQUE (P1 + P2)        */
    /* ============================================== */
    .quiz-modal-backdrop {{
      position: fixed;
      inset: 0;
      background: rgba(24, 9, 59, 0.55);
      backdrop-filter: blur(4px);
      -webkit-backdrop-filter: blur(4px);
      z-index: 2000;
      display: none;
      align-items: center;
      justify-content: center;
      padding: 1rem;
    }}
    .quiz-modal-backdrop.open {{
      display: flex;
    }}
    .quiz-modal-card {{
      background: #FFFFFF;
      border: 1px solid var(--color-border);
      box-shadow: 0 16px 36px rgba(24, 9, 59, 0.2);
      width: 100%;
      max-width: 520px;
      position: relative;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      animation: modalPop 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    }}
    @keyframes modalPop {{
      0% {{ transform: scale(0.95); opacity: 0; }}
      100% {{ transform: scale(1); opacity: 1; }}
    }}
    .quiz-modal-accent {{
      height: 6px;
      width: 100%;
    }}
    .quiz-modal-accent.success {{
      background: #22C55E;
    }}
    .quiz-modal-accent.error {{
      background: #EF4444;
    }}
    .quiz-modal-body {{
      padding: 1.5rem 1.6rem 1.75rem 1.6rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      gap: 0.85rem;
    }}
    .quiz-modal-emoji {{
      font-size: 3rem;
      line-height: 1;
      margin-top: 0.25rem;
    }}
    .quiz-modal-title {{
      font-size: 1.85rem;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: -0.02em;
      line-height: 1.1;
    }}
    .quiz-modal-title.success {{
      color: #16A34A;
    }}
    .quiz-modal-title.error {{
      color: #DC2626;
    }}
    .quiz-modal-subtitle {{
      font-size: 0.82rem;
      font-weight: 800;
      text-transform: uppercase;
      color: var(--color-brand-fig);
      letter-spacing: 0.04em;
      opacity: 0.8;
    }}
    .quiz-modal-divider {{
      width: 48px;
      height: 2px;
      background: var(--color-border);
      margin: 0.2rem auto;
    }}
    .quiz-modal-explanation {{
      font-size: 0.95rem;
      font-weight: 500;
      color: var(--color-brand-fig);
      line-height: 1.55;
      background: #F8FAFC;
      border: 1px solid var(--color-border);
      border-left: 3px solid var(--color-brand-purple);
      padding: 1rem 1.15rem;
      text-align: left;
      width: 100%;
      box-sizing: border-box;
    }}
    .btn-quiz-next {{
      background: var(--color-brand-purple);
      color: #FFFFFF;
      border: 1px solid var(--color-brand-purple);
      padding: 0.75rem 1.5rem;
      font-family: var(--font-main);
      font-weight: 800;
      font-size: 0.95rem;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      text-transform: uppercase;
      box-shadow: 0 2px 8px rgba(102, 52, 217, 0.25);
      width: 100%;
      transition: all 0.15s ease;
      margin-top: 0.5rem;
    }}
    .btn-quiz-next:hover {{
      background: #5325b8;
      border-color: #5325b8;
      transform: translateY(-1px);
      box-shadow: 0 4px 14px rgba(102, 52, 217, 0.35);
    }}
    .btn-quiz-next:focus-visible {{
      outline: 2px solid var(--color-brand-purple);
      outline-offset: 2px;
    }}

    /* ============================================== */
    /* ÉCRAN BILAN & CLASSEMENT (Quieter)              */
    /* ============================================== */
    .quiz-bilan-card {{
      background: var(--color-card-bg);
      border: 1px solid var(--color-border);
      border-left: 4px solid var(--color-brand-purple);
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
      padding: 1.5rem;
      margin-bottom: 1.5rem;
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
    }}
    @media (min-width: 640px) {{
      .quiz-bilan-card {{
        padding: 2rem;
      }}
    }}
    .quiz-bilan-score-box {{
      display: flex;
      align-items: baseline;
      gap: 0.5rem;
    }}
    .quiz-bilan-big-score {{
      font-size: clamp(3.5rem, 10vw, 5.5rem);
      font-weight: 900;
      line-height: 1;
      color: var(--color-brand-fig);
      letter-spacing: -0.03em;
    }}
    .quiz-bilan-score-total {{
      font-size: clamp(1.5rem, 4vw, 2.2rem);
      font-weight: 800;
      color: var(--color-text-muted);
    }}
    .quiz-bilan-badge {{
      background: var(--color-brand-sunny);
      color: var(--color-brand-fig);
      border: 1px solid var(--color-brand-fig);
      font-weight: 800;
      font-size: 0.95rem;
      padding: 0.3rem 0.7rem;
      align-self: flex-start;
      text-transform: uppercase;
    }}
    .quiz-bilan-comment {{
      font-size: 1.05rem;
      font-weight: 700;
      color: var(--color-brand-fig);
      border-left: 4px solid var(--color-brand-purple);
      padding-left: 0.85rem;
      line-height: 1.45;
    }}

    /* Formulaire d'enregistrement de score */
    .quiz-save-box {{
      background: #F8FAFC;
      border: 1px dashed var(--color-border);
      padding: 1rem 1.25rem;
      display: flex;
      flex-direction: column;
      gap: 0.6rem;
    }}
    .quiz-save-label {{
      font-size: 0.8rem;
      font-weight: 800;
      text-transform: uppercase;
      color: var(--color-brand-fig);
    }}
    .quiz-save-inputs {{
      display: flex;
      gap: 0.5rem;
    }}
    .quiz-pseudo-input {{
      flex: 1;
      padding: 0.6rem 0.85rem;
      border: 1px solid var(--color-border);
      font-family: var(--font-main);
      font-weight: 600;
      font-size: 0.95rem;
      outline: none;
      transition: border-color 0.15s ease, box-shadow 0.15s ease;
    }}
    .quiz-pseudo-input:focus {{
      border-color: var(--color-brand-purple);
      box-shadow: 0 0 0 2px rgba(102, 52, 217, 0.15);
    }}
    .btn-save-score {{
      background: var(--color-brand-purple);
      color: #FFFFFF;
      border: 1px solid var(--color-brand-purple);
      padding: 0.6rem 1.15rem;
      font-family: var(--font-main);
      font-weight: 800;
      font-size: 0.85rem;
      cursor: pointer;
      text-transform: uppercase;
      transition: all 0.15s ease;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }}
    .btn-save-score:hover:not(:disabled) {{
      background: #5325b8;
    }}
    .btn-save-score:disabled {{
      opacity: 0.5;
      cursor: not-allowed;
    }}

    /* Actions bilan */
    .quiz-bilan-actions {{
      display: flex;
      gap: 0.75rem;
      flex-wrap: wrap;
    }}
    .btn-quiz-retry {{
      background: var(--color-brand-purple);
      color: #FFFFFF;
      border: 1px solid var(--color-brand-purple);
      padding: 0.65rem 1.25rem;
      font-family: var(--font-main);
      font-weight: 800;
      font-size: 0.88rem;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      text-transform: uppercase;
      box-shadow: 0 2px 6px rgba(102, 52, 217, 0.2);
      transition: all 0.15s ease;
    }}
    .btn-quiz-retry:hover {{
      background: #5325b8;
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(102, 52, 217, 0.3);
    }}
    .btn-quiz-return-modules {{
      background: #FFFFFF;
      color: var(--color-brand-fig);
      border: 1px solid var(--color-border);
      padding: 0.65rem 1.25rem;
      font-family: var(--font-main);
      font-weight: 800;
      font-size: 0.88rem;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      text-transform: uppercase;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
      transition: all 0.15s ease;
    }}
    .btn-quiz-return-modules:hover {{
      background: #F1F5F9;
      border-color: var(--color-brand-fig);
      transform: translateY(-1px);
    }}

    /* Classement local */
    .quiz-leaderboard-card {{
      background: var(--color-card-bg);
      border: 1px solid var(--color-border);
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
      padding: 1.25rem;
      display: flex;
      flex-direction: column;
      gap: 0.85rem;
    }}
    .quiz-leaderboard-header {{
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.95rem;
      font-weight: 800;
      text-transform: uppercase;
      color: var(--color-brand-fig);
      padding-bottom: 0.5rem;
      border-bottom: 1px solid var(--color-border);
    }}
    .quiz-leaderboard-list {{
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
      max-height: 280px;
      overflow-y: auto;
    }}
    .quiz-leaderboard-row {{
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.55rem 0.85rem;
      border: 1px solid var(--color-border);
      background: #FFFFFF;
    }}
    .quiz-leaderboard-rank {{
      font-weight: 800;
      font-size: 0.82rem;
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid var(--color-border);
      background: #F8FAFC;
      margin-right: 0.5rem;
    }}
    .quiz-leaderboard-rank.rank-1 {{
      background: var(--color-brand-sunny);
      border-color: var(--color-brand-fig);
    }}
    .quiz-leaderboard-rank.rank-2 {{
      background: #E2E8F0;
    }}
    .quiz-leaderboard-rank.rank-3 {{
      background: var(--color-brand-pink);
    }}
    .quiz-leaderboard-name {{
      font-weight: 700;
      font-size: 0.88rem;
      color: var(--color-brand-fig);
    }}
    .quiz-leaderboard-score {{
      font-weight: 800;
      font-size: 0.92rem;
      color: var(--color-brand-purple);
    }}


  </style>
</head>
<body>

  <div class="app-viewport">
    
    <!-- En-tête -->
    <header>
      <div class="header-top">
        <span class="brand-badge">Formation Vibe Coding</span>
        <span style="font-weight: 800; font-size: 0.85rem;">Espace Apprenant • v2.2</span>
      </div>
      <h1 id="mainTitle">Le Glossaire Vibe Coding</h1>
      <div class="header-desc" id="mainSubtitle">57 notions clés et boîte à outils pour le Vibe Coding</div>
    </header>

    <!-- Navigation entre Onglets -->
    <nav class="tab-nav">
      <button class="tab-btn active" id="tabBtnGlossary" data-target="glossaryView">
        <span>📖 Glossaire</span>
        <span class="tab-badge">{len(glossary_rows)}</span>
      </button>
      <button class="tab-btn" id="tabBtnPrompts" data-target="promptsView">
        <span>⚡ Bibliothèque de Prompts</span>
        <span class="tab-badge">{len(prompts_data)}</span>
      </button>
      <button class="tab-btn" id="tabBtnQuizz" data-target="quizzView">
        <span>🎯 Entraînement Quizz</span>
        <span class="tab-badge">50Q</span>
      </button>
      <button class="tab-btn" id="tabBtnTools" data-target="toolsView">
        <span>🛠️ Outils & Accès</span>
        <span class="tab-badge">{len(tools_data)}</span>
      </button>
    </nav>

    <!-- Navigation retour Mode Isolé (Simple bouton, plus de carte jaune) -->
    <div class="isolated-nav" id="isolatedNav">
      <button class="btn-back-all" id="btnBackAll">← Retour à tous les prompts ({len(prompts_data)})</button>
    </div>

    <!-- ============================================== -->
    <!-- ONGLET 1 : GLOSSAIRE                           -->
    <!-- ============================================== -->
    <div class="tab-view active" id="glossaryView">
      
      <div class="search-filter-section">
        <div class="search-box">
          <span class="search-icon">🔍</span>
          <input type="text" id="glossarySearchInput" class="search-input" placeholder="Rechercher par 1ère lettre (ex: B) ou mot-clé..." autocomplete="off">
          <button id="glossaryClearBtn" class="clear-btn" title="Effacer">✕</button>
        </div>

        <button id="toggleGlossaryFiltersBtn" class="toggle-filters-btn" aria-expanded="false">
          <span>🎛️ Index A-Z & Filtres Avancés</span>
          <span id="toggleGlossaryIcon" class="toggle-icon">▼</span>
        </button>

        <div id="glossaryFiltersPanel" class="filters-panel collapsed">
          <div class="filter-group">
            <div class="filter-label">Index Alphabétique :</div>
            <div class="alpha-bar" id="alphaBar">
              <button class="alpha-btn active" data-letter="ALL">TOUS</button>
"""

for letter in alphabet_list:
    html_content += f'              <button class="alpha-btn" data-letter="{letter}">{letter}</button>\n'

html_content += f"""            </div>
          </div>

          <div class="filter-group">
            <div class="filter-label">Filtrer par Module :</div>
            <div class="pills-row" id="modulePills">
              <button class="pill-btn active" data-module="ALL">Tous les modules</button>
              <button class="pill-btn" data-module="M1">Module 1 (Bases)</button>
              <button class="pill-btn" data-module="M2">Module 2 (Web)</button>
              <button class="pill-btn" data-module="M3">Module 3 (Mobile)</button>
              <button class="pill-btn" data-module="M4">Module 4 (Agents)</button>
            </div>
          </div>

          <div class="filter-group">
            <div class="filter-label">Filtrer par Thématique :</div>
            <div class="pills-row" id="categoryPills">
              <button class="pill-btn active" data-cat="ALL">Toutes les thématiques</button>
"""

for cat in glossary_categories_list:
    html_content += f'              <button class="pill-btn" data-cat="{cat}">{cat}</button>\n'

html_content += f"""            </div>
          </div>
        </div>
      </div>

      <div class="results-bar">
        <span>Résultats du glossaire :</span>
        <span class="counter-tag" id="glossaryCounterTag">{len(glossary_rows)} termes</span>
      </div>

      <div class="cards-container" id="glossaryCardsContainer"></div>

      <div class="empty-state" id="glossaryEmptyState">
        <div class="empty-title">Aucun terme ne correspond à la recherche</div>
        <div class="empty-desc">Essayez avec d'autres mots-clés ou réinitialisez les filtres.</div>
        <button class="reset-btn" id="glossaryResetBtn">Réinitialiser les filtres</button>
      </div>

    </div>

    <!-- ============================================== -->
    <!-- ONGLET 2 : BIBLIOTHÈQUE DE PROMPTS             -->
    <!-- ============================================== -->
    <div class="tab-view" id="promptsView">
      
      <div class="search-filter-section" id="promptsFilterSection">
        <div class="search-box">
          <span class="search-icon">🔍</span>
          <input type="text" id="promptsSearchInput" class="search-input" placeholder="Rechercher dans les prompts (mot-clé, Vercel, refactoring...)" autocomplete="off">
          <button id="promptsClearBtn" class="clear-btn" title="Effacer">✕</button>
        </div>

        <div class="filter-group">
          <div class="filter-label">Filtrer par Tag / Sujet :</div>
          <div class="pills-row" id="promptTagPills">
            <button class="pill-btn active" data-tag="ALL">Tous ({len(prompts_data)})</button>
"""

for tag in prompt_tags_list:
    is_ex = 'tag-exemple' if tag == 'Exemple' else ''
    html_content += f'            <button class="pill-btn {is_ex}" data-tag="{tag}">{tag}</button>\n'

html_content += f"""          </div>
        </div>
      </div>

      <div class="results-bar">
        <span>Prompts disponibles :</span>
        <span class="counter-tag" id="promptsCounterTag">{len(prompts_data)} prompts</span>
      </div>

      <div class="cards-container" id="promptsCardsContainer"></div>

      <div class="empty-state" id="promptsEmptyState">
        <div class="empty-title">Aucun prompt ne correspond à vos critères</div>
        <div class="empty-desc">Modifiez votre recherche ou réinitialisez les filtres.</div>
        <button class="reset-btn" id="promptsResetBtn">Afficher tous les prompts</button>
      </div>

    </div>
    <!-- ============================================== -->
    <!-- ONGLET 3 : ENTRAÎNEMENT QUIZZ (CERTIFICATION)  -->
    <!-- ============================================== -->
    <div class="tab-view" id="quizzView">
      
      <!-- ÉCRAN 1 : LISTE DES MODULES -->
      <div id="quizScreenModules" class="quiz-screen active">
        <div class="quiz-modules-grid" id="quizModulesGrid"></div>

        <div class="quiz-featured-card" id="cardFinalExam" onclick="startQuiz('final-exam')" style="margin-top: 1.5rem;" tabindex="0" role="button" aria-label="Grand Examen Blanc (50 Questions)" onkeydown="if(event.key==='Enter'||event.key===' '){{event.preventDefault();startQuiz('final-exam');}}">
          <div class="quiz-featured-header">
            <div style="display:flex; align-items:center; gap:0.6rem;">
              <span class="quiz-featured-badge">Simulation Officielle</span>
              <span style="font-size:0.82rem; font-weight:700; color:var(--color-text-muted);">50 Questions • Tirage aléatoire</span>
            </div>
            <span class="quiz-score-pill neutral" id="examBestScoreBadge">Non complété</span>
          </div>
          <div>
            <div class="quiz-featured-title">Grand Examen Blanc (50 Questions)</div>
            <div class="quiz-featured-desc">
              Épreuve globale chronométrée couvrant l'ensemble des compétences C1 à C6. Simulation intégrale des conditions d'évaluation avec bilan détaillé et explications à l'issue du test.
            </div>
          </div>
          <div class="quiz-featured-footer">
            <div class="quiz-featured-meta">
              <span>⏱️ 60 secondes / question</span>
              <span>•</span>
              <span>Seuil de validation : 75% (38/50)</span>
            </div>
            <button class="btn-launch-exam" type="button" tabindex="-1">
              <span>Lancer l'Examen Blanc (50 Q)</span>
              <span>→</span>
            </button>
          </div>
        </div>
      </div>

      <!-- ÉCRAN 2 : JEU / GAMEPLAY -->
      <div id="quizScreenGame" class="quiz-screen">
        <div class="quiz-game-header">
          <button class="btn-back-modules" id="btnBackToModules" onclick="returnToModules()">
            <span>← Modules</span>
          </button>
          <div style="display:flex; align-items:center; gap:0.5rem;">
            <span class="quiz-module-code" id="quizGameModuleCode">C1</span>
            <span style="font-weight: 900; font-size: 0.95rem; text-transform: uppercase; color: var(--color-brand-fig);" id="quizGameModuleTitle">Cadrer un produit</span>
          </div>
          <div class="quiz-stats-group">
            <span class="quiz-stat-pill" id="quizScorePill">Score : 0 / 10</span>
            <span class="quiz-stat-pill highlight" id="quizProgressPill">0%</span>
          </div>
        </div>

        <div class="quiz-progress-bar-container">
          <div class="quiz-progress-fill" id="quizProgressFill"></div>
        </div>

        <div class="quiz-question-box">
          <div class="quiz-question-meta" id="quizQuestionMeta">Question 1 sur 10</div>
          <div class="quiz-question-text" id="quizQuestionText">Chargement...</div>
        </div>

        <div class="quiz-options-list" id="quizOptionsList"></div>
      </div>

      <!-- ÉCRAN 3 : BILAN & CLASSEMENT -->
      <div id="quizScreenBilan" class="quiz-screen">
        <div class="quiz-bilan-card">
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem;">
            <div style="font-weight: 900; font-size: 1.25rem; text-transform: uppercase; color: var(--color-brand-fig);">
              Bilan de votre entraînement
            </div>
            <span class="quiz-bilan-badge" id="quizBilanPercentage">100%</span>
          </div>

          <div class="quiz-bilan-score-box">
            <span class="quiz-bilan-big-score" id="quizBilanScore">0</span>
            <span class="quiz-bilan-score-total" id="quizBilanTotal">/ 0</span>
          </div>

          <div class="quiz-bilan-comment" id="quizBilanComment">
            Commentaire...
          </div>

          <div class="quiz-save-box" id="quizSaveBox">
            <span class="quiz-save-label">Enregistrer votre performance :</span>
            <div class="quiz-save-inputs">
              <input type="text" id="quizPseudoInput" class="quiz-pseudo-input" placeholder="Votre prénom ou pseudo..." maxlength="25" autocomplete="name" onkeydown="if(event.key==='Enter')handleSaveScore()">
              <button class="btn-save-score" id="btnSaveQuizScore" onclick="handleSaveScore()">Enregistrer</button>
            </div>
          </div>

          <div class="quiz-bilan-actions">
            <button class="btn-quiz-retry" onclick="retryCurrentQuiz()">
              <span>🔄 Recommencer ce quiz</span>
            </button>
            <button class="btn-quiz-return-modules" onclick="returnToModules()">
              <span>← Retour à la liste des modules</span>
            </button>
          </div>
        </div>

        <!-- TABLEAU DE CLASSEMENT LOCAL -->
        <div class="quiz-leaderboard-card">
          <div class="quiz-leaderboard-header">
            <span>🏆 Meilleurs scores enregistrés (Local)</span>
          </div>
          <div class="quiz-leaderboard-list" id="quizLeaderboardList">
            <div style="font-size:0.85rem; color:var(--color-text-muted); font-weight:600; padding:0.5rem 0;">
              Aucun score enregistré pour l'instant.
            </div>
          </div>
        </div>
      </div>

    </div>

    <!-- ============================================== -->
    <!-- ONGLET 4 : OUTILS & LIENS DE CONNEXION          -->
    <!-- ============================================== -->
    <div class="tab-view" id="toolsView">
      
      <div class="tools-intro-banner">
        <div class="tools-intro-badge">✨ Guide officiel des inscriptions</div>
        <div class="tools-intro-title">Pourquoi cette boîte à outils ?</div>
        <div class="tools-intro-desc">
          Pour concevoir, déployer et monétiser vos applications, ces 7 services composent votre stack complète. Cliquez directement sur chaque bouton pour ouvrir la page officielle de création de compte sans chercher les URLs.
        </div>
      </div>

      <div class="search-filter-section">
        <div class="search-box">
          <span class="search-icon">🔍</span>
          <input type="text" id="toolsSearchInput" class="search-input" placeholder="Rechercher un outil (ex: GitHub, Supabase, Stripe...)" autocomplete="off">
          <button id="toolsClearBtn" class="clear-btn" title="Effacer">✕</button>
        </div>
        <span class="counter-tag" id="toolsCounterTag">{len(tools_data)} outils</span>
      </div>

      <div class="filter-pills" id="toolsCategoryPills" style="margin-bottom: 1.25rem;">
        <button class="filter-pill active" data-category="ALL">Tous ({len(tools_data)})</button>
        <button class="filter-pill" data-category="IA & Modèles">IA & Modèles (3)</button>
        <button class="filter-pill" data-category="Code & Déploiement">Code & Déploiement (2)</button>
        <button class="filter-pill" data-category="Backend & Monétisation">Backend & Monétisation (2)</button>
      </div>

      <div class="tools-grid" id="toolsContainer"></div>

      <div class="empty-state" id="toolsEmptyState">
        <div class="empty-title">Aucun outil ne correspond à votre recherche</div>
        <div class="empty-desc">Modifiez vos mots-clés ou réinitialisez les filtres.</div>
        <button class="reset-btn" id="toolsResetBtn">Afficher tous les outils</button>
      </div>

    </div>

  </div>

  <div class="toast-msg" id="toastMsg">Notification</div>
  <!-- POPUP MODAL EXPLICATION PÉDAGOGIQUE -->
  <div class="quiz-modal-backdrop" id="quizExplanationModal">
    <div class="quiz-modal-card" role="dialog" aria-modal="true" aria-labelledby="quizModalTitle">
      <div class="quiz-modal-accent" id="quizModalAccent"></div>
      <div class="quiz-modal-body">
        <div class="quiz-modal-emoji" id="quizModalEmoji">🎉</div>
        <div class="quiz-modal-title" id="quizModalTitle">Bravo !</div>
        <div class="quiz-modal-subtitle" id="quizModalSubtitle">C'est la bonne réponse !</div>
        <div class="quiz-modal-divider"></div>
        <div class="quiz-modal-explanation" id="quizModalExplanation">Explication...</div>
        <button class="btn-quiz-next" id="btnQuizNext" onclick="nextQuizQuestion()">
          <span>Question suivante</span>
          <span style="opacity:0.65; font-size:0.75rem; font-weight:700; margin-left:0.3rem;">[Espace]</span>
          <span>→</span>
        </button>
      </div>
    </div>
  </div>

  <script>
    const GLOSSARY_DATA = {terms_json};
    const PROMPTS_DATA = {prompts_json};
    const QUIZ_DATA = {quiz_json};

    // État global
    let currentTab = 'glossary';
    let isolatedPromptId = null;

    // État Glossaire
    let activeModule = 'ALL';
    let activeCategory = 'ALL';
    let activeLetter = 'ALL';
    let glossaryQuery = '';

    // État Prompts
    let activePromptTag = 'ALL';
    let promptsQuery = '';

    // Éléments Onglets
    const tabBtnGlossary = document.getElementById('tabBtnGlossary');
    const tabBtnPrompts = document.getElementById('tabBtnPrompts');
    const tabBtnQuizz = document.getElementById('tabBtnQuizz');
    const glossaryView = document.getElementById('glossaryView');
    const promptsView = document.getElementById('promptsView');
    const quizzView = document.getElementById('quizzView');
    const mainTitle = document.getElementById('mainTitle');
    const mainSubtitle = document.getElementById('mainSubtitle');
    const isolatedNav = document.getElementById('isolatedNav');
    const btnBackAll = document.getElementById('btnBackAll');
    const toastMsg = document.getElementById('toastMsg');
    const TOOLS_DATA = {tools_json};
    let activeToolCategory = 'ALL';
    let toolsQuery = '';

    const tabBtnTools = document.getElementById('tabBtnTools');
    const toolsView = document.getElementById('toolsView');
    const toolsSearchInput = document.getElementById('toolsSearchInput');
    const toolsClearBtn = document.getElementById('toolsClearBtn');
    const toolsContainer = document.getElementById('toolsContainer');
    const toolsCounterTag = document.getElementById('toolsCounterTag');
    const toolsEmptyState = document.getElementById('toolsEmptyState');
    const toolsResetBtn = document.getElementById('toolsResetBtn');
    const toolsCategoryPills = document.getElementById('toolsCategoryPills');


    // Éléments Glossaire
    const glossarySearchInput = document.getElementById('glossarySearchInput');
    const glossaryClearBtn = document.getElementById('glossaryClearBtn');
    const glossaryCardsContainer = document.getElementById('glossaryCardsContainer');
    const glossaryCounterTag = document.getElementById('glossaryCounterTag');
    const glossaryEmptyState = document.getElementById('glossaryEmptyState');
    const glossaryResetBtn = document.getElementById('glossaryResetBtn');
    const toggleGlossaryFiltersBtn = document.getElementById('toggleGlossaryFiltersBtn');
    const glossaryFiltersPanel = document.getElementById('glossaryFiltersPanel');
    const toggleGlossaryIcon = document.getElementById('toggleGlossaryIcon');

    // Éléments Prompts
    const promptsSearchInput = document.getElementById('promptsSearchInput');
    const promptsClearBtn = document.getElementById('promptsClearBtn');
    const promptsFilterSection = document.getElementById('promptsFilterSection');
    const promptsCardsContainer = document.getElementById('promptsCardsContainer');
    const promptsCounterTag = document.getElementById('promptsCounterTag');
    const promptsEmptyState = document.getElementById('promptsEmptyState');
    const promptsResetBtn = document.getElementById('promptsResetBtn');
    const promptTagPills = document.getElementById('promptTagPills');

    // --- GESTION DES NOTIFICATIONS TOAST ---
    function showToast(text) {{
      toastMsg.textContent = text;
      toastMsg.classList.add('show');
      setTimeout(() => {{
        toastMsg.classList.remove('show');
      }}, 2200);
    }}

    // --- NAVIGATION ONGLETS ---
    function switchTab(tabName, updateUrl = true) {{
      currentTab = tabName;
      tabBtnGlossary.classList.remove('active');
      tabBtnPrompts.classList.remove('active');
      tabBtnQuizz.classList.remove('active');
      tabBtnTools.classList.remove('active');
      glossaryView.classList.remove('active');
      promptsView.classList.remove('active');
      quizzView.classList.remove('active');
      toolsView.classList.remove('active');

      if (tabName === 'prompts') {{
        tabBtnPrompts.classList.add('active');
        promptsView.classList.add('active');
        mainTitle.textContent = "Bibliothèque de Prompts";
        mainSubtitle.textContent = "Prompts Vibe Coding prêts à copier pour vos sessions de code";
      }} else if (tabName === 'quizz') {{
        tabBtnQuizz.classList.add('active');
        quizzView.classList.add('active');
        mainTitle.textContent = "Entraînement Quizz Certification";
        mainSubtitle.textContent = "Préparez l'épreuve QCM de 50 questions de la certification Vibe Coding";
        renderQuizModuleList();
      }} else {{
        tabBtnGlossary.classList.add('active');
        glossaryView.classList.add('active');
        mainTitle.textContent = "Le Glossaire Vibe Coding";
        mainSubtitle.textContent = "57 notions clés et définitions pour le Vibe Coding";
        isolatedPromptId = null;
        isolatedNav.classList.remove('active');
        promptsFilterSection.style.display = 'flex';
      }}

      if (updateUrl && !isolatedPromptId) {{
        const url = new URL(window.location);
        url.searchParams.set('tab', tabName);
        url.searchParams.delete('prompt');
        history.replaceState(null, '', url.toString());
      }}
    }}

    tabBtnGlossary.addEventListener('click', () => switchTab('glossary'));
    tabBtnPrompts.addEventListener('click', () => switchTab('prompts'));
    tabBtnQuizz.addEventListener('click', () => switchTab('quizz'));
    tabBtnTools.addEventListener('click', () => switchTab('tools'));

    // --- RENDU GLOSSAIRE ---
    function matchWordStart(fullText, query) {{
      if (!query) return true;
      const q = escapeRegExp(query.trim().toLowerCase());
      const regex = new RegExp(`(?:^|[^a-zA-Z0-9à-ÿÀ-Ÿ])${{q}}`, 'i');
      return regex.test(fullText);
    }}

    function renderGlossary() {{
      const query = glossaryQuery.trim().toLowerCase();
      
      const filtered = GLOSSARY_DATA.filter(item => {{
        const matchMod = (activeModule === 'ALL' || item.module === activeModule);
        const matchCat = (activeCategory === 'ALL' || item.category === activeCategory);
        
        let matchAlpha = true;
        if (activeLetter !== 'ALL') {{
          const cleanWord = item.word.replace(/^[^a-zA-Z0-9]+/, '');
          matchAlpha = cleanWord.toUpperCase().startsWith(activeLetter);
        }}

        const textToSearch = item.word + ' ' + item.category + ' ' + item.definition + ' ' + item.ref;
        const matchSearch = matchWordStart(textToSearch, query);

        return matchMod && matchCat && matchAlpha && matchSearch;
      }});

      glossaryCounterTag.textContent = `${{filtered.length}} terme${{filtered.length > 1 ? 's' : ''}}`;

      if (filtered.length === 0) {{
        glossaryCardsContainer.style.display = 'none';
        glossaryEmptyState.style.display = 'block';
        return;
      }}

      glossaryCardsContainer.style.display = 'flex';
      glossaryEmptyState.style.display = 'none';

      glossaryCardsContainer.innerHTML = filtered.map(item => {{
        let wordHtml = escapeHtml(item.word);
        let defHtml = escapeHtml(item.definition);

        if (query !== '') {{
          const qEscaped = escapeRegExp(query);
          const regex = new RegExp(`(^|[^a-zA-Z0-9à-ÿÀ-Ÿ])(${{qEscaped}})`, 'gi');
          wordHtml = wordHtml.replace(regex, '$1<mark>$2</mark>');
          defHtml = defHtml.replace(regex, '$1<mark>$2</mark>');
        }}

        const refParts = item.ref.split('—');
        const code = refParts[0] ? refParts[0].trim() : item.ref;
        const title = refParts[1] ? refParts[1].trim() : '';

        return `
          <div class="card-item">
            <div class="card-header">
              <div class="term-title">${{wordHtml}}</div>
              <span class="type-badge">${{escapeHtml(item.category)}}</span>
            </div>
            <div class="term-def">${{defHtml}}</div>
            <div class="card-footer">
              <span class="ref-code">${{escapeHtml(code)}}</span>
              ${{title ? `<span class="ref-title">${{escapeHtml(title)}}</span>` : ''}}
            </div>
          </div>
        `;
      }}).join('');
    }}


    // --- RENDU BOÎTE À OUTILS ---
    function renderTools() {{
      const q = toolsQuery.trim().toLowerCase();
      const filtered = TOOLS_DATA.filter(t => {{
        const matchCat = (activeToolCategory === 'ALL' || t.category === activeToolCategory);
        const matchSearch = !q || (t.name.toLowerCase().includes(q) || t.description.toLowerCase().includes(q) || t.category.toLowerCase().includes(q));
        return matchCat && matchSearch;
      }});

      toolsCounterTag.textContent = `${{filtered.length}} outil${{filtered.length > 1 ? 's' : ''}}`;

      if (filtered.length === 0) {{
        toolsContainer.style.display = 'none';
        toolsEmptyState.style.display = 'block';
        return;
      }}

      toolsContainer.style.display = 'grid';
      toolsEmptyState.style.display = 'none';

      toolsContainer.innerHTML = filtered.map(t => `
        <div class="tool-card">
          <div>
            <div class="tool-card-header">
              <div class="tool-card-title">
                <span>${{t.icon}}</span>
                <span>${{escapeHtml(t.name)}}</span>
              </div>
              <span class="tool-card-badge">${{escapeHtml(t.category_badge)}}</span>
            </div>
            <div class="tool-card-desc" style="margin-top: 0.65rem;">
              ${{escapeHtml(t.description)}}
            </div>
          </div>
          <div class="tool-card-footer">
            <a href="${{t.url}}" target="_blank" rel="noopener noreferrer" class="tool-card-btn">
              <span>${{escapeHtml(t.actionText)}}</span>
              <span>↗</span>
            </a>
            <div class="tool-card-url">${{escapeHtml(t.cleanUrl)}}</div>
          </div>
        </div>
      `).join('');
    }}

    // Événements Outils
    toolsSearchInput.addEventListener('input', (e) => {{
      toolsQuery = e.target.value;
      toolsClearBtn.style.display = toolsQuery ? 'block' : 'none';
      renderTools();
    }});

    toolsClearBtn.addEventListener('click', () => {{
      toolsSearchInput.value = '';
      toolsQuery = '';
      toolsClearBtn.style.display = 'none';
      toolsSearchInput.focus();
      renderTools();
    }});

    toolsResetBtn.addEventListener('click', () => {{
      toolsSearchInput.value = '';
      toolsQuery = '';
      toolsClearBtn.style.display = 'none';
      activeToolCategory = 'ALL';
      document.querySelectorAll('#toolsCategoryPills .filter-pill').forEach(b => {{
        b.classList.toggle('active', b.dataset.category === 'ALL');
      }});
      renderTools();
    }});

    toolsCategoryPills.addEventListener('click', (e) => {{
      const btn = e.target.closest('.filter-pill');
      if (!btn) return;
      activeToolCategory = btn.dataset.category;
      document.querySelectorAll('#toolsCategoryPills .filter-pill').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderTools();
    }});

    // --- RENDU BIBLIOTHÈQUE DE PROMPTS ---
    function renderPrompts() {{
      const query = promptsQuery.trim().toLowerCase();

      // Cas Vue Isolée par URL
      if (isolatedPromptId) {{
        const singlePrompt = PROMPTS_DATA.find(p => p.id === isolatedPromptId);
        if (singlePrompt) {{
          promptsFilterSection.style.display = 'none';
          isolatedNav.classList.add('active');
          promptsCounterTag.textContent = '1 prompt isolé';
          promptsCardsContainer.style.display = 'flex';
          promptsEmptyState.style.display = 'none';

          promptsCardsContainer.innerHTML = renderSinglePromptCard(singlePrompt, true);
          return;
        }}
      }}

      promptsFilterSection.style.display = 'flex';
      isolatedNav.classList.remove('active');

      const filtered = PROMPTS_DATA.filter(item => {{
        const matchTag = (activePromptTag === 'ALL' || item.tags.includes(activePromptTag));
        
        const fullText = (item.title + ' ' + item.description + ' ' + item.prompt + ' ' + item.tags.join(' ')).toLowerCase();
        const matchSearch = (query === '' || fullText.includes(query));

        return matchTag && matchSearch;
      }});

      promptsCounterTag.textContent = `${{filtered.length}} prompt${{filtered.length > 1 ? 's' : ''}}`;

      if (filtered.length === 0) {{
        promptsCardsContainer.style.display = 'none';
        promptsEmptyState.style.display = 'block';
        return;
      }}

      promptsCardsContainer.style.display = 'flex';
      promptsEmptyState.style.display = 'none';

      promptsCardsContainer.innerHTML = filtered.map(item => renderSinglePromptCard(item, false, query)).join('');
    }}

    function renderSinglePromptCard(item, isIsolated = false, query = '') {{
      let titleHtml = escapeHtml(item.title);
      let descHtml = escapeHtml(item.description);
      let promptHtml = escapeHtml(item.prompt);

      if (query !== '') {{
        const qEscaped = escapeRegExp(query);
        const regex = new RegExp(`(${{qEscaped}})`, 'gi');
        titleHtml = titleHtml.replace(regex, '<mark>$1</mark>');
        descHtml = descHtml.replace(regex, '<mark>$1</mark>');
        promptHtml = promptHtml.replace(regex, '<mark>$1</mark>');
      }}

      const tagsHtml = item.tags.map(t => {{
        const isEx = (t === 'Exemple');
        return `<span class="prompt-tag-badge ${{isEx ? 'badge-example' : ''}}" data-tag="${{escapeHtml(t)}}">${{escapeHtml(t)}}</span>`;
      }}).join('');

      return `
        <div class="prompt-card" id="prompt-${{item.id}}">
          <div class="prompt-header">
            <div class="prompt-title">${{titleHtml}}</div>
            <div class="prompt-tags">${{tagsHtml}}</div>
          </div>
          <div class="prompt-desc">${{descHtml}}</div>
          <div class="prompt-box-wrapper">
            <pre class="prompt-text-block" id="text-${{item.id}}"><code>${{promptHtml}}</code></pre>
          </div>
          <div class="prompt-actions">
            <button class="btn-copy-prompt" onclick="copyPromptText('${{item.id}}', this)">
              <span>📋 Copier le prompt</span>
            </button>
            <button class="btn-share-prompt" onclick="sharePrompt('${{item.id}}', this)">
              <span>🔗 Partager ce prompt</span>
            </button>
          </div>
        </div>
      `;
    }}

    // --- ACTIONS PROMPT : COPIER ET PARTAGER ---
    function copyPromptText(promptId, btn) {{
      const item = PROMPTS_DATA.find(p => p.id === promptId);
      if (!item) return;

      navigator.clipboard.writeText(item.prompt).then(() => {{
        btn.classList.add('copied');
        btn.innerHTML = '<span>✅ Copié dans le presse-papier !</span>';
        showToast('Prompt copié avec succès !');
        setTimeout(() => {{
          btn.classList.remove('copied');
          btn.innerHTML = '<span>📋 Copier le prompt</span>';
        }}, 2500);
      }}).catch(() => {{
        showToast('Erreur lors de la copie');
      }});
    }}

    function sharePrompt(promptId, btn) {{
      const shareUrl = `${{window.location.origin}}${{window.location.pathname}}?prompt=${{encodeURIComponent(promptId)}}`;
      navigator.clipboard.writeText(shareUrl).then(() => {{
        btn.classList.add('copied');
        btn.innerHTML = '<span>🔗 Lien copié !</span>';
        showToast('Lien isolé copié dans le presse-papier !');
        setTimeout(() => {{
          btn.classList.remove('copied');
          btn.innerHTML = '<span>🔗 Partager ce prompt</span>';
        }}, 2500);
      }}).catch(() => {{
        showToast('Erreur lors de la copie du lien');
      }});
    }}

    btnBackAll.addEventListener('click', () => {{
      isolatedPromptId = null;
      const url = new URL(window.location);
      url.searchParams.delete('prompt');
      url.searchParams.set('tab', 'prompts');
      history.replaceState(null, '', url.toString());
      renderPrompts();
    }});

    // Clic sur un tag de carte pour filtrer
    promptsCardsContainer.addEventListener('click', (e) => {{
      const tagBadge = e.target.closest('.prompt-tag-badge');
      if (!tagBadge) return;
      const tag = tagBadge.getAttribute('data-tag');
      if (!tag) return;
      
      activePromptTag = tag;
      document.querySelectorAll('#promptTagPills .pill-btn').forEach(b => {{
        b.classList.toggle('active', b.getAttribute('data-tag') === tag);
      }});
      renderPrompts();
    }});

    // Filtres tags Prompts
    promptTagPills.addEventListener('click', (e) => {{
      const btn = e.target.closest('.pill-btn');
      if (!btn) return;
      document.querySelectorAll('#promptTagPills .pill-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activePromptTag = btn.getAttribute('data-tag');
      renderPrompts();
    }});

    // Recherche Prompts
    promptsSearchInput.addEventListener('input', (e) => {{
      promptsQuery = e.target.value;
      promptsClearBtn.style.display = promptsQuery ? 'flex' : 'none';
      renderPrompts();
    }});

    promptsClearBtn.addEventListener('click', () => {{
      promptsSearchInput.value = '';
      promptsQuery = '';
      promptsClearBtn.style.display = 'none';
      promptsSearchInput.focus();
      renderPrompts();
    }});

    promptsResetBtn.addEventListener('click', () => {{
      promptsQuery = '';
      promptsSearchInput.value = '';
      promptsClearBtn.style.display = 'none';
      activePromptTag = 'ALL';
      isolatedPromptId = null;
      document.querySelectorAll('#promptTagPills .pill-btn').forEach(b => b.classList.remove('active'));
      document.querySelector('#promptTagPills .pill-btn[data-tag="ALL"]').classList.add('active');
      
      const url = new URL(window.location);
      url.searchParams.delete('prompt');
      url.searchParams.set('tab', 'prompts');
      history.replaceState(null, '', url.toString());
      
      renderPrompts();
    }});

    // --- RECHERCHE ET FILTRES GLOSSAIRE ---
    toggleGlossaryFiltersBtn.addEventListener('click', () => {{
      const isCollapsed = glossaryFiltersPanel.classList.contains('collapsed');
      if (isCollapsed) {{
        glossaryFiltersPanel.classList.remove('collapsed');
        toggleGlossaryIcon.classList.add('open');
        toggleGlossaryFiltersBtn.setAttribute('aria-expanded', 'true');
      }} else {{
        glossaryFiltersPanel.classList.add('collapsed');
        toggleGlossaryIcon.classList.remove('open');
        toggleGlossaryFiltersBtn.setAttribute('aria-expanded', 'false');
      }}
    }});

    glossarySearchInput.addEventListener('input', (e) => {{
      glossaryQuery = e.target.value;
      glossaryClearBtn.style.display = glossaryQuery ? 'flex' : 'none';
      renderGlossary();
    }});

    glossaryClearBtn.addEventListener('click', () => {{
      glossarySearchInput.value = '';
      glossaryQuery = '';
      glossaryClearBtn.style.display = 'none';
      glossarySearchInput.focus();
      renderGlossary();
    }});

    document.getElementById('alphaBar').addEventListener('click', (e) => {{
      const btn = e.target.closest('.alpha-btn');
      if (!btn) return;
      document.querySelectorAll('.alpha-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeLetter = btn.getAttribute('data-letter');
      renderGlossary();
    }});

    document.getElementById('modulePills').addEventListener('click', (e) => {{
      const btn = e.target.closest('.pill-btn');
      if (!btn) return;
      document.querySelectorAll('#modulePills .pill-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeModule = btn.getAttribute('data-module');
      renderGlossary();
    }});

    document.getElementById('categoryPills').addEventListener('click', (e) => {{
      const btn = e.target.closest('.pill-btn');
      if (!btn) return;
      document.querySelectorAll('#categoryPills .pill-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCategory = btn.getAttribute('data-cat');
      renderGlossary();
    }});

    glossaryResetBtn.addEventListener('click', () => {{
      glossaryQuery = '';
      glossarySearchInput.value = '';
      glossaryClearBtn.style.display = 'none';
      activeModule = 'ALL';
      activeCategory = 'ALL';
      activeLetter = 'ALL';
      
      document.querySelectorAll('#glossaryView .pill-btn, #glossaryView .alpha-btn').forEach(b => b.classList.remove('active'));
      document.querySelector('#modulePills .pill-btn[data-module="ALL"]').classList.add('active');
      document.querySelector('#categoryPills .pill-btn[data-cat="ALL"]').classList.add('active');
      document.querySelector('#alphaBar .alpha-btn[data-letter="ALL"]').classList.add('active');
      
      renderGlossary();
    }});


    // ==============================================
    // LOGIQUE & MOTEUR DU QUIZ DE CERTIFICATION
    // ==============================================
    const QUIZ_STORAGE_KEY = 'vibecoding_quiz_scores_v1';
    const QUIZ_LAST_USER_KEY = 'vibecoding_quiz_last_user';

    let activeQuizModule = null;
    let activeQuizQuestions = [];
    let currentQuestionIndex = 0;
    let quizScore = 0;
    let quizSelectedOption = null;
    let quizHasValidated = false;
    let quizTimerInterval = null;
    let quizTimeLeft = 10;

    // --- Persistance localStorage ---
    function getQuizStoredScores() {{
      try {{
        const raw = localStorage.getItem(QUIZ_STORAGE_KEY);
        return raw ? JSON.parse(raw) : {{}};
      }} catch (e) {{
        return {{}};
      }}
    }}

    function getModuleBestScore(moduleId) {{
      const scores = getQuizStoredScores();
      const list = scores[moduleId] || [];
      if (list.length === 0) return null;
      return list.reduce((best, cur) => cur.percentage > best.percentage ? cur : best, list[0]);
    }}

    function saveQuizScoreRecord(moduleId, pseudo, score, total) {{
      const scores = getQuizStoredScores();
      if (!scores[moduleId]) scores[moduleId] = [];
      const percentage = Math.round((score / total) * 100);
      const record = {{
        pseudo: pseudo.trim() || 'Apprenant',
        score,
        total,
        percentage,
        date: new Date().toLocaleDateString('fr-FR', {{ day: '2-digit', month: '2-digit', year: 'numeric' }})
      }};
      scores[moduleId].unshift(record);
      // Trier par meilleur pourcentage puis date récente
      scores[moduleId].sort((a, b) => b.percentage - a.percentage);
      scores[moduleId] = scores[moduleId].slice(0, 15);
      try {{
        localStorage.setItem(QUIZ_STORAGE_KEY, JSON.stringify(scores));
        localStorage.setItem(QUIZ_LAST_USER_KEY, pseudo.trim());
      }} catch (e) {{}}
      return record;
    }}

    function shuffleQuizArray(array) {{
      const arr = [...array];
      for (let i = arr.length - 1; i > 0; i--) {{
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }}
      return arr;
    }}

    // --- Rendu de l'écran des modules ---
    function renderQuizModuleList() {{
      const grid = document.getElementById('quizModulesGrid');
      const examBadge = document.getElementById('examBestScoreBadge');
      
      // Best score examen blanc
      const examBest = getModuleBestScore('final-exam');
      if (examBest) {{
        const isHigh = examBest.percentage >= 75;
        examBadge.textContent = `Score : ${{examBest.score}}/${{examBest.total}} (${{examBest.percentage}}%)`;
        examBadge.className = `quiz-score-pill ${{isHigh ? 'success' : 'warning'}}`;
        examBadge.removeAttribute('style');
      }} else {{
        examBadge.textContent = 'Non complété';
        examBadge.className = 'quiz-score-pill neutral';
        examBadge.removeAttribute('style');
      }}

      // Rendu des 6 modules
      grid.innerHTML = QUIZ_DATA.modules.map(mod => {{
        const best = getModuleBestScore(mod.id);
        let bestScoreHtml = `<span class="quiz-score-pill neutral">Non complété</span>`;
        if (best) {{
          const isHigh = best.percentage >= 75;
          bestScoreHtml = `<span class="quiz-score-pill ${{isHigh ? 'success' : 'warning'}}">Score : ${{best.score}}/${{best.total}} (${{best.percentage}}%)</span>`;
        }}

        const seriesCount = mod.questionsPerSeries || 10;

        return `
          <div class="quiz-module-card" onclick="startQuiz('${{mod.id}}')" tabindex="0" role="button" aria-label="Module ${{escapeHtml(mod.code)}} : ${{escapeHtml(mod.title)}}" onkeydown="if(event.key==='Enter'||event.key===' '){{event.preventDefault();startQuiz('${{mod.id}}');}}">
            <div>
              <div class="quiz-module-top">
                <span class="quiz-module-code">${{escapeHtml(mod.code)}}</span>
                <span class="quiz-module-count">${{seriesCount}} questions / série</span>
              </div>
              <div class="quiz-module-title" style="margin-top:0.6rem;">${{escapeHtml(mod.title)}}</div>
              <div class="quiz-module-desc" style="margin-top:0.35rem;">${{escapeHtml(mod.description)}}</div>
            </div>
            <div class="quiz-module-footer">
              ${{bestScoreHtml}}
              <button class="btn-start-module" type="button" tabindex="-1">
                <span>S'entraîner</span>
                <span>→</span>
              </button>
            </div>
          </div>
        `;
      }}).join('');

      document.getElementById('quizScreenModules').style.display = 'block';
      document.getElementById('quizScreenGame').style.display = 'none';
      document.getElementById('quizScreenBilan').style.display = 'none';
    }}

    // --- Lancement du Quiz ---
    function startQuiz(moduleId) {{
      clearInterval(quizTimerInterval);
      currentQuestionIndex = 0;
      quizScore = 0;
      quizSelectedOption = null;
      quizHasValidated = false;

      if (moduleId === 'final-exam') {{
        activeQuizModule = QUIZ_DATA.finalExam;
        let pool = [];
        QUIZ_DATA.modules.forEach(m => pool.push(...m.questions));
        const targetCount = QUIZ_DATA.finalExam.targetQuestionsCount || 50;
        let examQuestions = [];
        // Constituer un examen blanc de 50 questions (dupliquer/mélanger si pool < 50)
        while (examQuestions.length < targetCount && pool.length > 0) {{
          const shuffledPool = shuffleQuizArray(pool);
          const needed = targetCount - examQuestions.length;
          examQuestions.push(...shuffledPool.slice(0, needed));
        }}
        activeQuizQuestions = examQuestions;
      }} else {{
        activeQuizModule = QUIZ_DATA.modules.find(m => m.id === moduleId);
        if (!activeQuizModule) return;
        const targetCount = activeQuizModule.questionsPerSeries || 10;
        let seriesQuestions = [];
        // Constituer une série de 10 questions pour le module (dupliquer/mélanger si questions < 10)
        while (seriesQuestions.length < targetCount && activeQuizModule.questions.length > 0) {{
          const shuffled = shuffleQuizArray(activeQuizModule.questions);
          const needed = targetCount - seriesQuestions.length;
          seriesQuestions.push(...shuffled.slice(0, needed));
        }}
        activeQuizQuestions = seriesQuestions;
      }}

      document.getElementById('quizScreenModules').style.display = 'none';
      document.getElementById('quizScreenBilan').style.display = 'none';
      document.getElementById('quizScreenGame').style.display = 'block';

      renderCurrentQuestion();
    }}

    // --- Rendu de la question en cours ---
    function renderCurrentQuestion() {{
      clearInterval(quizTimerInterval);
      quizSelectedOption = null;
      quizHasValidated = false;

      if (currentQuestionIndex >= activeQuizQuestions.length) {{
        finishQuiz();
        return;
      }}

      const q = activeQuizQuestions[currentQuestionIndex];
      const total = activeQuizQuestions.length;
      const pct = Math.round((currentQuestionIndex / total) * 100);

      document.getElementById('quizGameModuleCode').textContent = activeQuizModule.code;
      document.getElementById('quizGameModuleTitle').textContent = activeQuizModule.title;
      document.getElementById('quizScorePill').textContent = `Score : ${{quizScore}} / ${{total}}`;
      document.getElementById('quizProgressPill').textContent = `${{pct}}%`;
      document.getElementById('quizProgressFill').style.transform = `scaleX(${{pct / 100}})`;

      document.getElementById('quizQuestionMeta').textContent = `Question ${{currentQuestionIndex + 1}} sur ${{total}} • ${{activeQuizModule.code}}`;
      document.getElementById('quizQuestionText').textContent = q.text;

      const letters = ['A', 'B', 'C', 'D'];
      const optionsContainer = document.getElementById('quizOptionsList');
      optionsContainer.innerHTML = q.options.map((opt, idx) => `
        <div class="quiz-option-btn" id="quizOpt-${{idx}}" onclick="selectQuizOption(${{idx}})" tabindex="0" role="button" aria-label="Option ${{letters[idx]}} : ${{escapeHtml(opt)}}" onkeydown="if(event.key==='Enter'||event.key===' '){{event.preventDefault();selectQuizOption(${{idx}});}}">
          <div class="quiz-option-content">
            <span class="quiz-option-letter">${{letters[idx]}}</span>
            <span class="quiz-option-text">${{escapeHtml(opt)}}</span>
          </div>
          <span class="quiz-option-status-icon" id="quizOptIcon-${{idx}}"></span>
        </div>
      `).join('');
    }}

    // --- Sélection d'une réponse ---
    function selectQuizOption(index) {{
      if (quizSelectedOption !== null || quizHasValidated) return;
      quizSelectedOption = index;

      const q = activeQuizQuestions[currentQuestionIndex];
      const isCorrect = (index === q.correctAnswer);
      if (isCorrect) {{
        quizScore++;
        document.getElementById('quizScorePill').textContent = `Score : ${{quizScore}} / ${{activeQuizQuestions.length}}`;
      }}

      // Feedback visuel sur les cartes d'options
      q.options.forEach((_, idx) => {{
        const btn = document.getElementById(`quizOpt-${{idx}}`);
        const icon = document.getElementById(`quizOptIcon-${{idx}}`);
        btn.classList.add('disabled');

        if (idx === q.correctAnswer) {{
          btn.classList.add('selected-correct');
          icon.textContent = '✓';
        }} else if (idx === index) {{
          btn.classList.add('selected-wrong');
          icon.textContent = '✕';
        }} else {{
          btn.classList.add('dimmed');
        }}
      }});

      // Affichage du modal d'explication après 550ms
      setTimeout(() => {{
        showExplanationModal(isCorrect, q);
      }}, 550);
    }}

    // --- Modal d'explication pédagogique (Lecture confortable sans auto-advance stressant) ---
    function showExplanationModal(isCorrect, question) {{
      quizHasValidated = true;
      const modal = document.getElementById('quizExplanationModal');
      const accent = document.getElementById('quizModalAccent');
      const emoji = document.getElementById('quizModalEmoji');
      const title = document.getElementById('quizModalTitle');
      const subtitle = document.getElementById('quizModalSubtitle');
      const explanation = document.getElementById('quizModalExplanation');
      const nextBtn = document.getElementById('btnQuizNext');

      accent.className = `quiz-modal-accent ${{isCorrect ? 'success' : 'error'}}`;
      emoji.textContent = isCorrect ? '🎉' : '🧐';
      title.className = `quiz-modal-title ${{isCorrect ? 'success' : 'error'}}`;
      title.textContent = isCorrect ? 'Bravo !' : 'Dommage...';
      subtitle.textContent = isCorrect 
        ? "C'est une excellente réponse !" 
        : `La bonne réponse était : ${{question.options[question.correctAnswer]}}`;
      explanation.textContent = question.explanation;

      modal.classList.add('open');
      if (nextBtn) nextBtn.focus();
    }}

    function nextQuizQuestion() {{
      const modal = document.getElementById('quizExplanationModal');
      modal.classList.remove('open');
      currentQuestionIndex++;
      renderCurrentQuestion();
    }}

    // --- GESTION DU CLAVIER (P1 Accessibility) ---
    document.addEventListener('keydown', function(event) {{
      const modal = document.getElementById('quizExplanationModal');
      const isModalOpen = modal && modal.classList.contains('open');

      // Si le modal d'explication est ouvert : Espace, Entrée ou Échap passent à la suite
      if (isModalOpen) {{
        if (event.key === ' ' || event.key === 'Enter' || event.key === 'Escape') {{
          event.preventDefault();
          nextQuizQuestion();
        }}
        return;
      }}

      // Ignorer si le focus est dans un champ texte (ex: pseudo input)
      const activeTag = document.activeElement ? document.activeElement.tagName : '';
      if (activeTag === 'INPUT' || activeTag === 'TEXTAREA') return;

      // Si l'écran gameplay est actif : touches 1-4 ou A-D pour sélectionner une réponse
      const gameScreen = document.getElementById('quizScreenGame');
      if (gameScreen && gameScreen.style.display === 'block' && !quizHasValidated) {{
        const key = event.key.toLowerCase();
        let optIndex = -1;
        if (key === '1' || key === 'a') optIndex = 0;
        else if (key === '2' || key === 'b') optIndex = 1;
        else if (key === '3' || key === 'c') optIndex = 2;
        else if (key === '4' || key === 'd') optIndex = 3;

        if (optIndex >= 0 && activeQuizQuestions && activeQuizQuestions[currentQuestionIndex]) {{
          const numOptions = activeQuizQuestions[currentQuestionIndex].options.length;
          if (optIndex < numOptions) {{
            event.preventDefault();
            selectQuizOption(optIndex);
          }}
        }}
      }}
    }});

    // --- Écran Bilan ---
    function finishQuiz() {{
      clearInterval(quizTimerInterval);
      document.getElementById('quizScreenGame').style.display = 'none';
      document.getElementById('quizScreenBilan').style.display = 'block';

      const total = activeQuizQuestions.length;
      const pct = Math.round((quizScore / total) * 100);

      document.getElementById('quizBilanScore').textContent = quizScore;
      document.getElementById('quizBilanTotal').textContent = `/ ${{total}}`;
      document.getElementById('quizBilanPercentage').textContent = `${{pct}}%`;

      let comment = "📚 Entraînement nécessaire : reprenez les notions clés du glossaire et retentez une série !";
      if (pct >= 50) comment = "👍 Bonnes bases, mais plusieurs points méritent d'être consolidés pour atteindre les 75% requis.";
      if (pct >= 75) comment = "🚀 Excellent résultat ! Vous franchissez le seuil de validation de 75% requis pour la certification.";
      if (pct === 100) comment = `🏆 Score parfait (${{quizScore}}/${{total}}) ! Maîtrise absolue des concepts Vibe Coding.`;
      document.getElementById('quizBilanComment').textContent = comment;

      // Pré-remplir pseudo
      const lastUser = localStorage.getItem(QUIZ_LAST_USER_KEY) || '';
      const input = document.getElementById('quizPseudoInput');
      input.value = lastUser;
      input.disabled = false;
      const btnSave = document.getElementById('btnSaveQuizScore');
      btnSave.disabled = false;
      btnSave.textContent = "Enregistrer";

      renderQuizLeaderboard(activeQuizModule.id);
    }}

    function handleSaveScore() {{
      const input = document.getElementById('quizPseudoInput');
      const pseudo = input.value.trim();
      if (!pseudo) {{
        input.focus();
        return;
      }}
      saveQuizScoreRecord(activeQuizModule.id, pseudo, quizScore, activeQuizQuestions.length);
      input.disabled = true;
      const btn = document.getElementById('btnSaveQuizScore');
      btn.disabled = true;
      btn.textContent = "Score enregistré ✓";
      renderQuizLeaderboard(activeQuizModule.id);
      showToast("Score enregistré dans le classement !");
    }}

    function renderQuizLeaderboard(moduleId) {{
      const listContainer = document.getElementById('quizLeaderboardList');
      const scores = getQuizStoredScores();
      const list = scores[moduleId] || [];

      if (list.length === 0) {{
        listContainer.innerHTML = `<div style="font-size:0.85rem; color:var(--color-text-muted); font-weight:600; padding:0.5rem 0;">Aucun score enregistré pour ce module.</div>`;
        return;
      }}

      listContainer.innerHTML = list.map((item, idx) => `
        <div class="quiz-leaderboard-row">
          <div style="display:flex; align-items:center;">
            <span class="quiz-leaderboard-rank rank-${{idx + 1}}">${{idx + 1}}</span>
            <div style="display:flex; flex-direction:column;">
              <span class="quiz-leaderboard-name">${{escapeHtml(item.pseudo)}}</span>
              <span style="font-size:0.72rem; color:var(--color-text-muted); font-weight:700;">${{escapeHtml(item.date)}}</span>
            </div>
          </div>
          <span class="quiz-leaderboard-score">${{item.score}}/${{item.total}} (${{item.percentage}}%)</span>
        </div>
      `).join('');
    }}

    function returnToModules() {{
      clearInterval(quizTimerInterval);
      document.getElementById('quizExplanationModal').classList.remove('open');
      renderQuizModuleList();
    }}

    function retryCurrentQuiz() {{
      if (activeQuizModule) {{
        startQuiz(activeQuizModule.id);
      }}
    }}

    // Utilitaires
    function escapeRegExp(string) {{
      return string.replace(/[.*+?^${{}}()|[\\]\\\\]/g, '\\\\$&');
    }}

    function escapeHtml(str) {{
      return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
    }}

    // --- INITIALISATION AU CHARGEMENT (Gestion de l'URL) ---
    function init() {{
      const params = new URLSearchParams(window.location.search);
      const promptParam = params.get('prompt');
      const tabParam = params.get('tab');

      if (promptParam) {{
        isolatedPromptId = promptParam;
        switchTab('prompts', false);
      }} else if (tabParam === 'prompts') {{
        switchTab('prompts', false);
      }} else if (tabParam === 'quizz') {{
        switchTab('quizz', false);
      }} else {{
        switchTab('glossary', false);
      }}

      renderGlossary();
      renderPrompts();
    }}

    init();
  </script>

</body>
</html>
"""

# 1. Export des données pour l'architecture modulaire components/
app_data_js = f"""// Données officielles de la plateforme Vibe Coding (Généré automatiquement)
export const GLOSSARY_DATA = {json.dumps(glossary_rows, ensure_ascii=False, indent=2)};

export const PROMPTS_DATA = {json.dumps(prompts_data, ensure_ascii=False, indent=2)};

export const QUIZ_DATA = {json.dumps(QUIZ_DATA, ensure_ascii=False, indent=2)};

export const TOOLS_DATA = {json.dumps(tools_data, ensure_ascii=False, indent=2)};
"""
os.makedirs(os.path.join(BASE_DIR, 'data'), exist_ok=True)
with open(os.path.join(BASE_DIR, 'data', 'app-data.js'), 'w', encoding='utf-8') as f:
    f.write(app_data_js)

modular_html_shell = """<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0">
  <title>Plateforme Formation Vibe Coding — Glossaire, Prompts, Outils & Quizz</title>
  
  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cousine:wght@400;700&family=Plus+Jakarta+Sans:wght@500;600;700;800;900&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  
  <!-- Modular Stylesheets (Standard 2026 Layout) -->
  <link rel="stylesheet" href="css/tokens.css">
  <link rel="stylesheet" href="css/layout.css">
  <link rel="stylesheet" href="css/components.css">
</head>
<body>

  <!-- Wide App Viewport (1440px / Standard 2026) -->
  <div class="app-viewport">
    
    <!-- Mount : Header Component -->
    <div id="appHeaderMount"></div>

    <!-- Mount : Tab Navigation Component -->
    <div id="appNavMount"></div>

    <!-- Mount : Views Components -->
    <main id="appMainContent">
      <section class="tab-view active" id="viewGlossary"></section>
      <section class="tab-view" id="viewPrompts"></section>
      <section class="tab-view" id="viewQuizz"></section>
      <section class="tab-view" id="viewTools"></section>
    </main>

  </div>

  <!-- Main ES Module Assembler (Zero Monolith Architecture) -->
  <script type="module" src="js/app.js"></script>

</body>
</html>
"""

with open(OUTPUT_PATH, 'w', encoding='utf-8') as f:
    f.write(modular_html_shell)

with open(INDEX_PATH, 'w', encoding='utf-8') as f:
    f.write(modular_html_shell)

# Copier également vers le dossier d'export git et le dossier scripts
if os.path.exists(SCRATCH_EXPORT_DIR):
    with open(os.path.join(SCRATCH_EXPORT_DIR, 'index.html'), 'w', encoding='utf-8') as f:
        f.write(html_content)
    with open(os.path.join(SCRATCH_EXPORT_DIR, 'glossaire_interactive.html'), 'w', encoding='utf-8') as f:
        f.write(html_content)
    export_scripts_dir = os.path.join(SCRATCH_EXPORT_DIR, 'scripts')
    if os.path.exists(export_scripts_dir):
        export_script_file = os.path.join(export_scripts_dir, 'build_interactive_web_glossary.py')
        if os.path.abspath(__file__) != os.path.abspath(export_script_file):
            shutil.copy2(__file__, export_script_file)
        quiz_data_src = os.path.join(SCRIPTS_DIR, 'quiz_data.py')
        if os.path.exists(quiz_data_src):
            shutil.copy2(quiz_data_src, os.path.join(export_scripts_dir, 'quiz_data.py'))

if os.path.exists(SCRIPTS_DIR):
    scripts_file = os.path.join(SCRIPTS_DIR, 'build_interactive_web_glossary.py')
    if os.path.abspath(__file__) != os.path.abspath(scripts_file):
        shutil.copy2(__file__, scripts_file)

print("Application interactive mise à jour avec succès (bordures subtiles, fond gris très clair, bouton retour isolé direct).")
