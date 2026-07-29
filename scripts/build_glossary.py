import os
import glob
import json
import re

# Comprehensive list of glossary terms across Modules 1, 2, 3, 4
# We scan all JSON files and construct the definitive reference glossary

json_files = glob.glob("M[1-4]/**/*.json", recursive=True)
final_files = [f for f in json_files if "FINAL_" in os.path.basename(f) and not "CLAUDE" in f and not "GEMINI" in f]

# Build mapping of lessonSlug / slide content to lessonTitle
lessons_db = []

for filepath in sorted(final_files):
    try:
        with open(filepath, "r", encoding="utf-8") as f:
            data = json.load(f)
            slug = data.get("lessonSlug", "").upper()
            title = data.get("lessonTitle", "")
            slides = data.get("slides", [])
            lessons_db.append({
                "filepath": filepath,
                "slug": slug,
                "title": title,
                "slides": slides
            })
    except Exception as e:
        print(f"Error loading {filepath}: {e}")

# Helper to find reference lesson
def find_reference_lesson(term_keywords):
    for les in lessons_db:
        for slide in les["slides"]:
            content_str = json.dumps(slide.get("content", {}), ensure_ascii=False).lower()
            if any(kw.lower() in content_str for kw in term_keywords):
                return les["title"]
    return None

# Master Glossary Terms Database (Extracted & Consolidated from M1-M4 lessons)
glossary_raw = [
    # --- MODULE 1 : Fondations & Culture Vibe Coding ---
    {
        "mot": "Vibe Coding",
        "type": "Méthode / Philosophie",
        "definition": "Approche de développement informatique consistant à piloter des agents IA en langage naturel pour concevoir, coder et déboguer des applications sans écrire manuellement chaque ligne de code.",
        "keywords": ["Vibe Coding", "développement assisté", "langage naturel"],
        "ref": "M1C1L2 — Qu'est-ce que le Vibe Coding ?"
    },
    {
        "mot": "IA Générative (LLM)",
        "type": "Concept IA",
        "definition": "Large Language Model. Modèle d'intelligence artificielle entraîné sur d'immenses corpus de texte capables de comprendre, générer et transformer du texte, du code et de la logique.",
        "keywords": ["LLM", "Large Language Model", "IA Générative"],
        "ref": "M1C1L3 — Comprendre le rôle de l'IA dans la création de logiciels"
    },
    {
        "mot": "Prompting",
        "type": "Méthode",
        "definition": "Art de rédiger des consignes, du contexte et des contraintes textuelles claires à destination d'un modèle d'IA pour obtenir un résultat précis et exploitable.",
        "keywords": ["Prompting", "consignes", "prompt"],
        "ref": "M1C2L1 — Découvrir l'art du Prompt Engineering"
    },
    {
        "mot": "Prompt Engineering",
        "type": "Méthode",
        "definition": "Discipline technique visant à concevoir, structurer et optimiser de manière systématique les requêtes fournies aux modèles de langage pour maximiser la précision des réponses.",
        "keywords": ["Prompt Engineering", "structurer", "optimiser"],
        "ref": "M1C2L1 — Découvrir l'art du Prompt Engineering"
    },
    {
        "mot": "Hallucination IA",
        "type": "Concept IA / Risque",
        "definition": "Phénomène par lequel un modèle de langage invente avec assurance des informations inexactes, des paquets logiciels inexistants ou du code invalide.",
        "keywords": ["Hallucination", "invente", "inexactes"],
        "ref": "M1C2L5 — Identifier les pièges et limites de l'IA"
    },
    {
        "mot": "Contexte (Context Window)",
        "type": "Concept IA",
        "definition": "Fenêtre de mémoire vive d'un LLM, mesurée en tokens, représentant la quantité d'informations (prompt + fichiers + historique) que l'IA peut traiter simultanément.",
        "keywords": ["Contexte", "Context Window", "mémoire", "tokens"],
        "ref": "M1C2L3 — Gérer le contexte et la mémoire de l'agent"
    },
    {
        "mot": "Token",
        "type": "Concept IA / Métrique",
        "definition": "Unité de base de traitement du texte par un LLM, correspondant approximativement à un mot ou un morceau de mot (1000 tokens ≈ 750 mots).",
        "keywords": ["Token", "unité", "traitement"],
        "ref": "M1C2L3 — Gérer le contexte et la mémoire de l'agent"
    },
    {
        "mot": "Front-end",
        "type": "Architecture",
        "definition": "Partie visible et interactive d'une application exécutée directement dans le navigateur de l'utilisateur (HTML, CSS, JavaScript).",
        "keywords": ["Front-end", "navigateur", "visuelle", "UI"],
        "ref": "M1C3L1 — Différencier le Front-end et le Back-end"
    },
    {
        "mot": "Back-end",
        "type": "Architecture",
        "definition": "Partie invisible d'une application s'exécutant sur un serveur pour traiter la logique métier, interagir avec la base de données et sécuriser les accès.",
        "keywords": ["Back-end", "serveur", "base de données", "logique métier"],
        "ref": "M1C3L1 — Différencier le Front-end et le Back-end"
    },
    {
        "mot": "HTML (HyperText Markup Language)",
        "type": "Langage",
        "definition": "Langage de balisage standard permettant de structurer le contenu d'une page web (titres, paragraphes, boutons, formulaires).",
        "keywords": ["HTML", "balisage", "structure"],
        "ref": "M1C3L2 — Les bases du HTML : la structure d'une page web"
    },
    {
        "mot": "CSS (Cascading Style Sheets)",
        "type": "Langage",
        "definition": "Langage de feuilles de style utilisé pour décrire la présentation visuelle, les couleurs, les polices et la mise en page d'un document HTML.",
        "keywords": ["CSS", "style", "couleurs", "mise en page"],
        "ref": "M1C3L3 — Les bases du CSS : le style et la mise en page"
    },
    {
        "mot": "JavaScript (JS)",
        "type": "Langage",
        "definition": "Langage de programmation dynamique permettant d'ajouter de l'interactivité, de manipuler la page web et de communiquer avec des API.",
        "keywords": ["JavaScript", "interactivité", "dynamique"],
        "ref": "M1C3L4 — Les bases du JavaScript : rendre l'interface dynamique"
    },
    {
        "mot": "DOM (Document Object Model)",
        "type": "Concept Web",
        "definition": "Représentation en mémoire sous forme d'arbre hiérarchique de la structure HTML d'une page web, manipulable en temps réel par JavaScript.",
        "keywords": ["DOM", "Document Object Model", "arbre"],
        "ref": "M1C3L4 — Les bases du JavaScript : rendre l'interface dynamique"
    },

    # --- MODULE 2 : Génération Web Rapid & Prototypage (Lovable, Bolt, v0) ---
    {
        "mot": "No-Code / Low-Code",
        "type": "Méthode",
        "definition": "Approche de création d'applications reposant sur des interfaces visuelles ou des briques pré-construites pour réduire ou éliminer la rédaction manuelle de code.",
        "keywords": ["No-Code", "Low-Code", "interfaces visuelles"],
        "ref": "M2C1L1 — Comparatif des plateformes de Vibe Coding Web"
    },
    {
        "mot": "Lovable",
        "type": "Outil / Plateforme",
        "definition": "Plateforme web de Vibe Coding permettant de générer des applications Full-Stack réactives en langage naturel intégrées avec Supabase et GitHub.",
        "keywords": ["Lovable", "plateforme"],
        "ref": "M2C2L1 — Prise en main de Lovable : l'interface et les fonctionnalités"
    },
    {
        "mot": "Bolt.new",
        "type": "Outil / Plateforme",
        "definition": "IDE web basé sur WebContainers exécutant Node.js directement dans le navigateur pour construire et tester des applications rapidement.",
        "keywords": ["Bolt.new", "WebContainers"],
        "ref": "M2C3L1 — Prise en main de Bolt.new"
    },
    {
        "mot": "v0 (by Vercel)",
        "type": "Outil / Plateforme",
        "definition": "Générateur d'interfaces utilisateur alimenté par l'IA créant du code React et Tailwind CSS de haute qualité prêt à l'emploi.",
        "keywords": ["v0", "Vercel", "Tailwind"],
        "ref": "M2C4L1 — Prise en main de v0 by Vercel"
    },
    {
        "mot": "Tailwind CSS",
        "type": "Framework / Outil",
        "definition": "Framework CSS orienté 'utility-first' permettant de styliser rapidement des composants web directement dans les classes HTML/JSX.",
        "keywords": ["Tailwind", "utility-first"],
        "ref": "M2C2L2 — Générer sa première application web avec Lovable"
    },
    {
        "mot": "React",
        "type": "Framework / Bibliothèque",
        "definition": "Bibliothèque JavaScript open-source développée par Meta pour créer des interfaces utilisateur réactives basées sur des composants.",
        "keywords": ["React", "composants", "JSX"],
        "ref": "M2C2L2 — Générer sa première application web avec Lovable"
    },
    {
        "mot": "Composant UI",
        "type": "Concept Web",
        "definition": "Brique autonome et réutilisable d'une interface utilisateur (ex: un bouton, un tableau, une carte d'information, un formulaire).",
        "keywords": ["Composant", "réutilisable", "brique"],
        "ref": "M2C2L3 — Modifier et affiner le design en langage naturel"
    },
    {
        "mot": "Responsive Design",
        "type": "Méthode / Design",
        "definition": "Technique de conception web garantissant l'affichage optimal d'une application sur tous les écrans (desktop, tablette, mobile).",
        "keywords": ["Responsive", "mobile", "écran"],
        "ref": "M2C2L3 — Modifier et affiner le design en langage naturel"
    },

    # --- MODULE 3 : Prototypage Mobile & Multi-plateforme (Cursor / Claude / Expo) ---
    {
        "mot": "React Native",
        "type": "Framework",
        "definition": "Framework open-source de Meta permettant de créer des applications mobiles natives iOS et Android en utilisant JavaScript et React.",
        "keywords": ["React Native", "iOS", "Android"],
        "ref": "M3C1L1 — Introduction à la création d'applications mobiles"
    },
    {
        "mot": "Expo",
        "type": "Outil / Framework",
        "definition": "Plateforme et ensemble d'outils pour React Native facilitant le développement, la prévisualisation en direct (Expo Go) et le build d'applications mobiles.",
        "keywords": ["Expo", "Expo Go", "développement mobile"],
        "ref": "M3C1L2 — Découvrir l'écosystème Expo & React Native"
    },
    {
        "mot": "Expo Go",
        "type": "Outil Mobile",
        "definition": "Application mobile permettant de tester instantanément une application React Native en cours de développement via le scan d'un QR code.",
        "keywords": ["Expo Go", "QR code", "test"],
        "ref": "M3C1L2 — Découvrir l'écosystème Expo & React Native"
    },
    {
        "mot": "Cursor",
        "type": "IDE / Outil",
        "definition": "Éditeur de code intelligent basé sur VS Code intégrant nativement des agents d'IA pour générer, modifier et déboguer du code en local.",
        "keywords": ["Cursor", "VS Code", "IDE"],
        "ref": "M3C2L1 — Prise en main de Cursor pour le mobile"
    },
    {
        "mot": "Claude 3.5 Sonnet",
        "type": "Modèle IA",
        "definition": "Modèle de langage développé par Anthropic reconnue pour ses performances exceptionnelles en génération de code, raisonnement logique et vision.",
        "keywords": ["Claude 3.5", "Sonnet", "Anthropic"],
        "ref": "M3C2L1 — Prise en main de Cursor pour le mobile"
    },
    {
        "mot": "Cross-Platform (Multi-plateforme)",
        "type": "Architecture",
        "definition": "Capacité d'un code source unique à s'exécuter et fonctionner sur plusieurs systèmes d'exploitation distincts (iOS, Android, Web).",
        "keywords": ["Cross-Platform", "multi-plateforme", "iOS", "Android"],
        "ref": "M3C1L1 — Introduction à la création d'applications mobiles"
    },
    {
        "mot": "Layout / Flexbox",
        "type": "Concept Web / Mobile",
        "definition": "Modèle de mise en page unidimensionnel permettant d'aligner et de distribuer l'espace entre des éléments dans un conteneur.",
        "keywords": ["Flexbox", "Layout", "aligner"],
        "ref": "M3C3L1 — Concevoir l'interface mobile"
    },

    # --- MODULE 4 : Maîtriser Antigravity & Environnement Local ---
    {
        "mot": "Antigravity",
        "type": "IDE / Agent SOTA",
        "definition": "Environnement de développement agentique local conçu par la Vibe Coding Académie permettant de piloter des sous-agents autonomes et d'exécuter des workflows complexes.",
        "keywords": ["Antigravity", "IDE agentique", "sous-agents"],
        "ref": "M4C1L1 — Les objectifs du chapitre : Découvrir les bases d'Antigravity"
    },
    {
        "mot": "IDE Agentique",
        "type": "Concept / Outil",
        "definition": "Environnement de développement intégré où les agents d'IA ont un accès direct au système de fichiers, au terminal et à l'exécution de commandes.",
        "keywords": ["IDE Agentique", "environnement", "terminal"],
        "ref": "M4C1L2 — Pourquoi utiliser un IDE agentique local ?"
    },
    {
        "mot": "AGENTS.md",
        "type": "Fichier de Contexte / Méthode",
        "definition": "Fichier de configuration situé à la racine d'un projet définissant la charte, la pile technique, les contraintes et les règles de comportement pour l'agent IA.",
        "keywords": ["AGENTS.md", "règles", "contexte"],
        "ref": "M4C3L1 — Les objectifs du chapitre : La gestion des agents IA dans un IDE local"
    },
    {
        "mot": "Sous-Agent (Subagent)",
        "type": "Concept IA",
        "definition": "Instance fille d'un agent IA lancée pour accomplir une tâche spécifique en arrière-plan de manière autonome sans bloquer le fil principal.",
        "keywords": ["Sous-agent", "Subagent", "tâche spécifique"],
        "ref": "M4C3L4 — Les sous-agents et la parallélisation de tâches"
    },
    {
        "mot": "Browser Agent",
        "type": "Outil IA",
        "definition": "Sous-agent IA capable de naviguer de manière autonome sur le web, d'inspecter le DOM, de prendre des captures d'écran et de tester des interfaces.",
        "keywords": ["Browser Agent", "naviguer", "DOM"],
        "ref": "M4C3L6 — Comprendre et utiliser un Browser Agent"
    },
    {
        "mot": "SKILL (Compétence Agent)",
        "type": "Extension IA",
        "definition": "Module de connaissances ou script réutilisable permettant d'étendre les capacités d'un agent IA pour une tâche ou un domaine d'expertise précis.",
        "keywords": ["SKILL", "Compétence", "extension"],
        "ref": "M4C3L8 — Comprendre et utiliser des SKILLS"
    },
    {
        "mot": "Mode Chat",
        "type": "Mode IDE",
        "definition": "Mode d'interaction conversationnel permettant d'analyser du code, de poser des questions ou d'obtenir des explications sans modifier les fichiers.",
        "keywords": ["Mode Chat", "conversationnel", "analyser"],
        "ref": "M4C2L3 — Le mode Chat : dialoguer et questionner son agent"
    },
    {
        "mot": "Mode Composer",
        "type": "Mode IDE",
        "definition": "Mode d'édition directe permettant à l'agent de créer et modifier automatiquement des fichiers dans l'arborescence du projet.",
        "keywords": ["Mode Composer", "édition", "modifier"],
        "ref": "M4C2L4 — Le mode Composer : générer et modifier du code"
    },
    {
        "mot": "Mode Plan",
        "type": "Mode IDE",
        "definition": "Mode stratégique dans lequel l'agent formule une feuille de route détaillée des modifications avant d'exécuter la moindre écriture.",
        "keywords": ["Mode Plan", "feuille de route", "planification"],
        "ref": "M4C2L6 — Le mode Plan : Relire un et accepter un plan de modification"
    },
    {
        "mot": "Git",
        "type": "Outil / VCS",
        "definition": "Système de contrôle de version distribué permettant d'enregistrer l'historique des modifications du code source et de collaborer.",
        "keywords": ["Git", "contrôle de version", "historique"],
        "ref": "M4C1L8 — Sauvegarder son travail : réaliser ses premiers commits avec l'agent"
    },
    {
        "mot": "Commit",
        "type": "Concept Git",
        "definition": "Sauvegarde instantanée et horodatée d'un ensemble de modifications apportées aux fichiers d'un projet Git avec un message explicatif.",
        "keywords": ["Commit", "sauvegarde", "historique"],
        "ref": "M4C1L8 — Sauvegarder son travail : réaliser ses premiers commits avec l'agent"
    },
    {
        "mot": "Branche Git",
        "type": "Concept Git",
        "definition": "Ligne de développement indépendante permettant de travailler sur une nouvelle fonctionnalité sans impacter le code principal.",
        "keywords": ["Branche", "développement", "fonctionnalité"],
        "ref": "M4C4L7 — Maîtriser Git local (Commits & Branches) sur un projet Full-Stack"
    },
    {
        "mot": "Terminal / CLI",
        "type": "Outil / Interface",
        "definition": "Command Line Interface. Interface textuelle permettant de piloter le système d'exploitation et d'exécuter des scripts ou des outils serveur.",
        "keywords": ["Terminal", "CLI", "commandes"],
        "ref": "M4C1L6 — Comprendre le terminal & les commandes clés du Vibe Coder"
    },
    {
        "mot": "Node.js",
        "type": "Environnement d'exécution",
        "definition": "Environnement d'exécution JavaScript côté serveur basé sur le moteur V8 de Google Chrome, permettant de créer des API et des serveurs web.",
        "keywords": ["Node.js", "serveur", "V8"],
        "ref": "M4C4L3 — Générer son premier serveur local (Node.js/Express) avec l'agent"
    },
    {
        "mot": "Express.js",
        "type": "Framework Backend",
        "definition": "Framework minimaliste et flexible pour Node.js fournissant un ensemble de fonctionnalités pour construire des API REST et des applications web.",
        "keywords": ["Express", "framework", "API"],
        "ref": "M4C4L3 — Générer son premier serveur local (Node.js/Express) avec l'agent"
    },
    {
        "mot": "Fichier .env (.env.local)",
        "type": "Sécurité / Configuration",
        "definition": "Fichier texte de configuration utilisé pour stocker les variables d'environnement confidentielles (clés API, mots de passe) hors du code source.",
        "keywords": [".env", ".env.local", "secrets", "variables"],
        "ref": "M4C4L5 — Isoler ses secrets et variables locales dans .env.local"
    },
    {
        "mot": "API (Application Programming Interface)",
        "type": "Architecture",
        "definition": "Ensemble de règles et de protocoles permettant à deux applications ou services informatiques de communiquer et d'échanger des données.",
        "keywords": ["API", "communication", "données"],
        "ref": "M4C4L4 — Connecter l'interface Front-end au serveur local"
    },
    {
        "mot": "Endpoint",
        "type": "Architecture / Web",
        "definition": "URL spécifique d'une API où un client peut envoyer des requêtes (GET, POST, PUT, DELETE) pour accéder à des ressources ou déclencher une action.",
        "keywords": ["Endpoint", "URL", "requête"],
        "ref": "M4C4L4 — Connecter l'interface Front-end au serveur local"
    },
    {
        "mot": "Logs d'erreur",
        "type": "Débogage",
        "definition": "Enregistrement chronologique des événements et messages d'erreur générés par un serveur ou une application pour diagnostiquer les dysfonctionnements.",
        "keywords": ["Logs", "erreur", "diagnostiquer"],
        "ref": "M4C4L6 — Déboguer la chaîne Front-Back et lire les logs d'erreur"
    },

    # --- NOTIONS TRANSVERSALES & DE REPRÉCISION POUR L'APPRENANT ---
    {
        "mot": "Supabase",
        "type": "BaaS (Backend-as-a-Service)",
        "definition": "Alternative open-source à Firebase fournissant une base de données PostgreSQL cloud, l'authentification, le stockage et les API instantanées.",
        "keywords": ["Supabase", "BaaS", "PostgreSQL"],
        "ref": "Nouveau / Défi au M5 (M5C3L1 — Connecter la base de données Cloud)"
    },
    {
        "mot": "PostgreSQL (SQL)",
        "type": "Base de données",
        "definition": "Système de gestion de base de données relationnelle open-source réputé pour sa robustesse, sa conformité SQL et sa gestion de la sécurité.",
        "keywords": ["PostgreSQL", "SQL", "base de données"],
        "ref": "Nouveau / Défi au M5 (M5C3L4 — Structurer les tables SQL)"
    },
    {
        "mot": "Row Level Security (RLS)",
        "type": "Sécurité",
        "definition": "Fonctionnalité de sécurité au niveau de la base de données PostgreSQL restreignant l'accès aux lignes d'une table selon l'identité de l'utilisateur connecté.",
        "keywords": ["RLS", "Row Level Security", "sécurité"],
        "ref": "Nouveau / Défi au M5 (M5C5L1 — Sécuriser les données par la faille)"
    },
    {
        "mot": "Vercel",
        "type": "Hébergement / Cloud",
        "definition": "Plateforme cloud de déploiement automatique d'applications web et d'API optimisée pour les frameworks modernes (Next.js, React).",
        "keywords": ["Vercel", "déploiement", "hébergement"],
        "ref": "Nouveau / Défi au M5 (M5C7L2 — Déployer en production sur Vercel)"
    },
    {
        "mot": "JSON (JavaScript Object Notation)",
        "type": "Format de données",
        "definition": "Format d'échange de données textuel léger, lisible par l'homme et facile à analyser par les machines, basé sur des paires clé-valeur.",
        "keywords": ["JSON", "données", "format"],
        "ref": "M1C3L4 — Les bases du JavaScript : rendre l'interface dynamique"
    },
    {
        "mot": "GitHub",
        "type": "Plateforme / Collaboration",
        "definition": "Service web d'hébergement de projets informatiques utilisant le système de contrôle de version Git pour la sauvegarde et le travail en équipe.",
        "keywords": ["GitHub", "hébergement", "Git"],
        "ref": "M4C1L8 — Sauvegarder son travail : réaliser ses premiers commits avec l'agent"
    }
]

# Generate Markdown File Content
md_lines = []
md_lines.append("# 📚 Glossaire Officiel de la Formation Vibe Coding")
md_lines.append("\nCe glossaire regroupe l'ensemble des termes techniques, outils, concepts IA, langages, méthodes et architectures enseignés au cours des **Modules 1, 2, 3 et 4**.\n")

md_lines.append("| Mot / Concept | Type de terme | Définition | Référence de la leçon |")
md_lines.append("| :--- | :--- | :--- | :--- |")

for item in glossary_raw:
    mot = item["mot"]
    ttype = item["type"]
    definition = item["definition"].replace("\n", " ")
    ref = item["ref"]
    md_lines.append(f"| **{mot}** | `{ttype}` | {definition} | {ref} |")

glossary_content = "\n".join(md_lines)

# Write to glossaire_formation_vibe_coding.md
target_path = "/Users/maximeelhaik/Documents/VIBE CODING GENERATION/glossaire_formation_vibe_coding.md"
with open(target_path, "w", encoding="utf-8") as f:
    f.write(glossary_content)

print(f"✅ Glossaire généré avec succès dans {target_path} ({len(glossary_raw)} termes recensés).")
