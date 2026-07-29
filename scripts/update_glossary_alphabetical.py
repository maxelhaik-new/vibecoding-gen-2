import json

# Complete master glossary data including previously defined terms + Group 1 terms
# Each entry has: mot, status ("Défini" or "Non défini (Cité)"), type, definition, ref

glossary_entries = [
    # Previously defined terms
    {
        "mot": "AGENTS.md",
        "statut": "Défini",
        "type": "Fichier de Contexte / Méthode",
        "definition": "Fichier de configuration situé à la racine d'un projet définissant la charte, la pile technique, les contraintes et les règles de comportement pour l'agent IA.",
        "ref": "M4C3L1 — Les objectifs du chapitre : La gestion des agents IA dans un IDE local"
    },
    {
        "mot": "Antigravity",
        "statut": "Défini",
        "type": "IDE / Agent SOTA",
        "definition": "Environnement de développement agentique local conçu par la Vibe Coding Académie permettant de piloter des sous-agents autonomes et d'exécuter des workflows complexes.",
        "ref": "M4C1L1 — Les objectifs du chapitre : Découvrir les bases d'Antigravity"
    },
    {
        "mot": "API (Application Programming Interface)",
        "statut": "Défini",
        "type": "Architecture",
        "definition": "Ensemble de règles et de protocoles permettant à deux applications ou services informatiques de communiquer et d'échanger des données.",
        "ref": "M4C4L4 — Connecter l'interface Front-end au serveur local"
    },
    {
        "mot": "Back-end",
        "statut": "Défini",
        "type": "Architecture",
        "definition": "Partie invisible d'une application s'exécutant sur un serveur pour traiter la logique métier, interagir avec la base de données et sécuriser les accès.",
        "ref": "M1C3L1 — Différencier le Front-end et le Back-end"
    },
    {
        "mot": "Bolt.new",
        "statut": "Défini",
        "type": "Outil / Plateforme",
        "definition": "IDE web basé sur WebContainers exécutant Node.js directement dans le navigateur pour construire et tester des applications rapidement.",
        "ref": "M2C3L1 — Prise en main de Bolt.new"
    },
    {
        "mot": "Branche Git",
        "statut": "Défini",
        "type": "Concept Git",
        "definition": "Ligne de développement indépendante permettant de travailler sur une nouvelle fonctionnalité sans impacter le code principal.",
        "ref": "M4C4L7 — Maîtriser Git local (Commits & Branches) sur un projet Full-Stack"
    },
    {
        "mot": "Browser Agent",
        "statut": "Défini",
        "type": "Outil IA",
        "definition": "Sous-agent IA capable de naviguer de manière autonome sur le web, d'inspecter le DOM, de prendre des captures d'écran et de tester des interfaces.",
        "ref": "M4C3L6 — Comprendre et utiliser un Browser Agent"
    },
    {
        "mot": "Claude 3.5 Sonnet",
        "statut": "Défini",
        "type": "Modèle IA",
        "definition": "Modèle de langage développé par Anthropic reconnue pour ses performances exceptionnelles en génération de code, raisonnement logique et vision.",
        "ref": "M3C2L1 — Prise en main de Cursor pour le mobile"
    },
    {
        "mot": "Commit",
        "statut": "Défini",
        "type": "Concept Git",
        "definition": "Sauvegarde instantanée et horodatée d'un ensemble de modifications apportées aux fichiers d'un projet Git avec un message explicatif.",
        "ref": "M4C1L8 — Sauvegarder son travail : réaliser ses premiers commits avec l'agent"
    },
    {
        "mot": "Composant UI",
        "statut": "Défini",
        "type": "Concept Web",
        "definition": "Brique autonome et réutilisable d'une interface utilisateur (ex: un bouton, un tableau, une carte d'information, un formulaire).",
        "ref": "M2C2L3 — Modifier et affiner le design en langage naturel"
    },
    {
        "mot": "Contexte (Context Window)",
        "statut": "Défini",
        "type": "Concept IA",
        "definition": "Fenêtre de mémoire vive d'un LLM, mesurée en tokens, représentant la quantité d'informations (prompt + fichiers + historique) que l'IA peut traiter simultanément.",
        "ref": "M1C2L3 — Gérer le contexte et la mémoire de l'agent"
    },
    {
        "mot": "Cross-Platform (Multi-plateforme)",
        "statut": "Défini",
        "type": "Architecture",
        "definition": "Capacité d'un code source unique à s'exécuter et fonctionner sur plusieurs systèmes d'exploitation distincts (iOS, Android, Web).",
        "ref": "M3C1L1 — Introduction à la création d'applications mobiles"
    },
    {
        "mot": "CSS (Cascading Style Sheets)",
        "statut": "Défini",
        "type": "Langage",
        "definition": "Langage de feuilles de style utilisé pour décrire la présentation visuelle, les couleurs, les polices et la mise en page d'un document HTML.",
        "ref": "M1C3L3 — Les bases du CSS : le style et la mise en page"
    },
    {
        "mot": "Cursor",
        "statut": "Défini",
        "type": "IDE / Outil",
        "definition": "Éditeur de code intelligent basé sur VS Code intégrant nativement des agents d'IA pour générer, modifier et déboguer du code en local.",
        "ref": "M3C2L1 — Prise en main de Cursor pour le mobile"
    },
    {
        "mot": "DOM (Document Object Model)",
        "statut": "Défini",
        "type": "Concept Web",
        "definition": "Représentation en mémoire sous forme d'arbre hiérarchique de la structure HTML d'une page web, manipulable en temps réel par JavaScript.",
        "ref": "M1C3L4 — Les bases du JavaScript : rendre l'interface dynamique"
    },
    {
        "mot": "Endpoint",
        "statut": "Défini",
        "type": "Architecture / Web",
        "definition": "URL spécifique d'une API où un client peut envoyer des requêtes (GET, POST, PUT, DELETE) pour accéder à des ressources ou déclencher une action.",
        "ref": "M4C4L4 — Connecter l'interface Front-end au serveur local"
    },
    {
        "mot": "Expo",
        "statut": "Défini",
        "type": "Outil / Framework",
        "definition": "Plateforme et ensemble d'outils pour React Native facilitant le développement, la prévisualisation en direct (Expo Go) et le build d'applications mobiles.",
        "ref": "M3C1L2 — Découvrir l'écosystème Expo & React Native"
    },
    {
        "mot": "Expo Go",
        "statut": "Défini",
        "type": "Outil Mobile",
        "definition": "Application mobile permettant de tester instantanément une application React Native en cours de développement via le scan d'un QR code.",
        "ref": "M3C1L2 — Découvrir l'écosystème Expo & React Native"
    },
    {
        "mot": "Express.js",
        "statut": "Défini",
        "type": "Framework Backend",
        "definition": "Framework minimaliste et flexible pour Node.js fournissant un ensemble de fonctionnalités pour construire des API REST et des applications web.",
        "ref": "M4C4L3 — Générer son premier serveur local (Node.js/Express) avec l'agent"
    },
    {
        "mot": "Fichier .env (.env.local)",
        "statut": "Défini",
        "type": "Sécurité / Configuration",
        "definition": "Fichier texte de configuration utilisé pour stocker les variables d'environnement confidentielles (clés API, mots de passe) hors du code source.",
        "ref": "M4C4L5 — Isoler ses secrets et variables locales dans .env.local"
    },
    {
        "mot": "Front-end",
        "statut": "Défini",
        "type": "Architecture",
        "definition": "Partie visible et interactive d'une application exécutée directement dans le navigateur de l'utilisateur (HTML, CSS, JavaScript).",
        "ref": "M1C3L1 — Différencier le Front-end et le Back-end"
    },
    {
        "mot": "Git",
        "statut": "Défini",
        "type": "Outil / VCS",
        "definition": "Système de contrôle de version distribué permettant d'enregistrer l'historique des modifications du code source et de collaborer.",
        "ref": "M4C1L8 — Sauvegarder son travail : réaliser ses premiers commits avec l'agent"
    },
    {
        "mot": "GitHub",
        "statut": "Défini",
        "type": "Plateforme / Collaboration",
        "definition": "Service web d'hébergement de projets informatiques utilisant le système de contrôle de version Git pour la sauvegarde et le travail en équipe.",
        "ref": "M4C1L8 — Sauvegarder son travail : réaliser ses premiers commits avec l'agent"
    },
    {
        "mot": "Hallucination IA",
        "statut": "Défini",
        "type": "Concept IA / Risque",
        "definition": "Phénomène par lequel un modèle de langage invente avec assurance des informations inexactes, des paquets logiciels inexistants ou du code invalide.",
        "ref": "M1C2L5 — Identifier les pièges et limites de l'IA"
    },
    {
        "mot": "HTML (HyperText Markup Language)",
        "statut": "Défini",
        "type": "Langage",
        "definition": "Langage de balisage standard permettant de structurer le contenu d'une page web (titres, paragraphes, boutons, formulaires).",
        "ref": "M1C3L2 — Les bases du HTML : la structure d'une page web"
    },
    {
        "mot": "IA Générative (LLM)",
        "statut": "Défini",
        "type": "Concept IA",
        "definition": "Large Language Model. Modèle d'intelligence artificielle entraîné sur d'immenses corpus de texte capables de comprendre, générer et transformer du texte, du code et de la logique.",
        "ref": "M1C1L3 — Comprendre le rôle de l'IA dans la création de logiciels"
    },
    {
        "mot": "IDE Agentique",
        "statut": "Défini",
        "type": "Concept / Outil",
        "definition": "Environnement de développement intégré où les agents d'IA ont un accès direct au système de fichiers, au terminal et à l'exécution de commandes.",
        "ref": "M4C1L2 — Pourquoi utiliser un IDE agentique local ?"
    },
    {
        "mot": "JavaScript (JS)",
        "statut": "Défini",
        "type": "Langage",
        "definition": "Langage de programmation dynamique permettant d'ajouter de l'interactivité, de manipuler la page web et de communiquer avec des API.",
        "ref": "M1C3L4 — Les bases du JavaScript : rendre l'interface dynamique"
    },
    {
        "mot": "JSON (JavaScript Object Notation)",
        "statut": "Défini",
        "type": "Format de données",
        "definition": "Format d'échange de données textuel léger, lisible par l'homme et facile à analyser par les machines, basé sur des paires clé-valeur.",
        "ref": "M1C3L4 — Les bases du JavaScript : rendre l'interface dynamique"
    },
    {
        "mot": "Layout / Flexbox",
        "statut": "Défini",
        "type": "Concept Web / Mobile",
        "definition": "Modèle de mise en page unidimensionnel permettant d'aligner et de distribuer l'espace entre des éléments dans un conteneur.",
        "ref": "M3C3L1 — Concevoir l'interface mobile"
    },
    {
        "mot": "Logs d'erreur",
        "statut": "Défini",
        "type": "Débogage",
        "definition": "Enregistrement chronologique des événements et messages d'erreur générés par un serveur ou une application pour diagnostiquer les dysfonctionnements.",
        "ref": "M4C4L6 — Déboguer la chaîne Front-Back et lire les logs d'erreur"
    },
    {
        "mot": "Lovable",
        "statut": "Défini",
        "type": "Outil / Plateforme",
        "definition": "Plateforme web de Vibe Coding permettant de générer des applications Full-Stack réactives en langage naturel intégrées avec Supabase et GitHub.",
        "ref": "M2C2L1 — Prise en main de Lovable : l'interface et les fonctionnalités"
    },
    {
        "mot": "Mode Chat",
        "statut": "Défini",
        "type": "Mode IDE",
        "definition": "Mode d'interaction conversationnel permettant d'analyser du code, de poser des questions ou d'obtenir des explications sans modifier les fichiers.",
        "ref": "M4C2L3 — Le mode Chat : dialoguer et questionner son agent"
    },
    {
        "mot": "Mode Composer",
        "statut": "Défini",
        "type": "Mode IDE",
        "definition": "Mode d'édition directe permettant à l'agent de créer et modifier automatiquement des fichiers dans l'arborescence du projet.",
        "ref": "M4C2L4 — Le mode Composer : générer et modifier du code"
    },
    {
        "mot": "Mode Plan",
        "statut": "Défini",
        "type": "Mode IDE",
        "definition": "Mode stratégique dans lequel l'agent formule une feuille de route détaillée des modifications avant d'exécuter la moindre écriture.",
        "ref": "M4C2L6 — Le mode Plan : Relire un et accepter un plan de modification"
    },
    {
        "mot": "No-Code / Low-Code",
        "statut": "Défini",
        "type": "Méthode",
        "definition": "Approche de création d'applications reposant sur des interfaces visuelles ou des briques pré-construites pour réduire ou éliminer la rédaction manuelle de code.",
        "ref": "M2C1L1 — Comparatif des plateformes de Vibe Coding Web"
    },
    {
        "mot": "Node.js",
        "statut": "Défini",
        "type": "Environnement d'exécution",
        "definition": "Environnement d'exécution JavaScript côté serveur basé sur le moteur V8 de Google Chrome, permettant de créer des API et des serveurs web.",
        "ref": "M4C4L3 — Générer son premier serveur local (Node.js/Express) avec l'agent"
    },
    {
        "mot": "PostgreSQL (SQL)",
        "statut": "Défini",
        "type": "Base de données",
        "definition": "Système de gestion de base de données relationnelle open-source réputé pour sa robustesse, sa conformité SQL et sa gestion de la sécurité.",
        "ref": "Introduit au M5 (M5C3L4 — Structurer les tables SQL)"
    },
    {
        "mot": "Prompt Engineering",
        "statut": "Défini",
        "type": "Méthode",
        "definition": "Discipline technique visant à concevoir, structurer et optimiser de manière systématique les requêtes fournies aux modèles de langage pour maximiser la précision des réponses.",
        "ref": "M1C2L1 — Découvrir l'art du Prompt Engineering"
    },
    {
        "mot": "Prompting",
        "statut": "Défini",
        "type": "Méthode",
        "definition": "Art de rédiger des consignes, du contexte et des contraintes textuelles claires à destination d'un modèle d'IA pour obtenir un résultat précis et exploitable.",
        "ref": "M1C2L1 — Découvrir l'art du Prompt Engineering"
    },
    {
        "mot": "React",
        "statut": "Défini",
        "type": "Framework / Bibliothèque",
        "definition": "Bibliothèque JavaScript open-source développée par Meta pour créer des interfaces utilisateur réactives basées sur des composants.",
        "ref": "M2C2L2 — Générer sa première application web avec Lovable"
    },
    {
        "mot": "React Native",
        "statut": "Défini",
        "type": "Framework",
        "definition": "Framework open-source de Meta permettant de créer des applications mobiles natives iOS et Android en utilisant JavaScript et React.",
        "ref": "M3C1L1 — Introduction à la création d'applications mobiles"
    },
    {
        "mot": "Responsive Design",
        "statut": "Défini",
        "type": "Méthode / Design",
        "definition": "Technique de conception web garantissant l'affichage optimal d'une application sur tous les écrans (desktop, tablette, mobile).",
        "ref": "M2C2L3 — Modifier et affiner le design en langage naturel"
    },
    {
        "mot": "Row Level Security (RLS)",
        "statut": "Défini",
        "type": "Sécurité",
        "definition": "Fonctionnalité de sécurité au niveau de la base de données PostgreSQL restreignant l'accès aux lignes d'une table selon l'identité de l'utilisateur connecté.",
        "ref": "Introduit au M5 (M5C5L1 — Sécuriser les données par la faille)"
    },
    {
        "mot": "SKILL (Compétence Agent)",
        "statut": "Défini",
        "type": "Extension IA",
        "definition": "Module de connaissances ou script réutilisable permettant d'étendre les capacités d'un agent IA pour une tâche ou un domaine d'expertise précis.",
        "ref": "M4C3L8 — Comprendre et utiliser des SKILLS"
    },
    {
        "mot": "Sous-Agent (Subagent)",
        "statut": "Défini",
        "type": "Concept IA",
        "definition": "Instance fille d'un agent IA lancée pour accomplir une tâche spécifique en arrière-plan de manière autonome sans bloquer le fil principal.",
        "ref": "M4C3L4 — Les sous-agents et la parallélisation de tâches"
    },
    {
        "mot": "Supabase",
        "statut": "Défini",
        "type": "BaaS (Backend-as-a-Service)",
        "definition": "Alternative open-source à Firebase fournissant une base de données PostgreSQL cloud, l'authentification, le stockage et les API instantanées.",
        "ref": "Introduit au M5 (M5C3L1 — Connecter la base de données Cloud)"
    },
    {
        "mot": "Tailwind CSS",
        "statut": "Défini",
        "type": "Framework / Outil",
        "definition": "Framework CSS orienté 'utility-first' permettant de styliser rapidement des composants web directement dans les classes HTML/JSX.",
        "ref": "M2C2L2 — Générer sa première application web avec Lovable"
    },
    {
        "mot": "Terminal / CLI",
        "statut": "Défini",
        "type": "Outil / Interface",
        "definition": "Command Line Interface. Interface textuelle permettant de piloter le système d'exploitation et d'exécuter des scripts ou des outils serveur.",
        "ref": "M4C1L6 — Comprendre le terminal & les commandes clés du Vibe Coder"
    },
    {
        "mot": "Token",
        "statut": "Défini",
        "type": "Concept IA / Métrique",
        "definition": "Unité de base de traitement du texte par un LLM, correspondant approximativement à un mot ou un morceau de mot (1000 tokens ≈ 750 mots).",
        "ref": "M1C2L3 — Gérer le contexte et la mémoire de l'agent"
    },
    {
        "mot": "v0 (by Vercel)",
        "statut": "Défini",
        "type": "Outil / Plateforme",
        "definition": "Générateur d'interfaces utilisateur alimenté par l'IA créant du code React et Tailwind CSS de haute qualité prêt à l'emploi.",
        "ref": "M2C4L1 — Prise en main de v0 by Vercel"
    },
    {
        "mot": "Vercel",
        "statut": "Défini",
        "type": "Hébergement / Cloud",
        "definition": "Plateforme cloud de déploiement automatique d'applications web et d'API optimisée pour les frameworks modernes (Next.js, React).",
        "ref": "Introduit au M5 (M5C7L2 — Déployer en production sur Vercel)"
    },
    {
        "mot": "Vibe Coding",
        "statut": "Défini",
        "type": "Méthode / Philosophie",
        "definition": "Approche de développement informatique consistant à piloter des agents IA en langage naturel pour concevoir, coder et déboguer des applications sans écrire manuellement chaque ligne de code.",
        "ref": "M1C1L2 — Qu'est-ce que le Vibe Coding ?"
    },

    # ----------------------------------------------------
    # NEW GROUP 1 TERMS (CITÉS DANS LE COURS, À DÉFINIR)
    # ----------------------------------------------------
    {
        "mot": ".gitignore",
        "statut": "Non défini (Cité)",
        "type": "Fichier de Configuration / Git",
        "definition": "Fichier texte placé à la racine d'un projet spécifiant les fichiers, dossiers temporaires et secrets que Git doit ignorer lors du suivi de version.",
        "ref": "Cité dans M2C5L3 & M3C4L6 — Configuration du dépôt et masquage des fichiers locaux"
    },
    {
        "mot": "Bac à sable (Sandboxing)",
        "statut": "Non défini (Cité)",
        "type": "Sécurité / IDE",
        "definition": "Environnement d'exécution isolé restreignant les accès système, réseau et fichiers d'un agent IA pour éviter tout risque lors de la génération de code.",
        "ref": "Cité dans M1C4L5 & M1C5L5 — Sécuriser les commandes et l'exécution d'agents"
    },
    {
        "mot": "Dépôt Git (Repository)",
        "statut": "Non défini (Cité)",
        "type": "Concept Git",
        "definition": "Dossier de projet sous contrôle de version Git stockant l'intégralité du code source, des branches et de l'historique complet des commits.",
        "ref": "Cité dans M1C1L4, M1C1L6 & M1C4L3 — Clonage et sauvegarde de projet"
    },
    {
        "mot": "HTTP / HTTPS",
        "statut": "Non défini (Cité)",
        "type": "Protocole Web",
        "definition": "HyperText Transfer Protocol. Protocole de communication réseau régissant l'échange de données chiffrées (HTTPS) ou non entre un client web et un serveur.",
        "ref": "Cité dans M1C3L5 & M1C4L6 — Les requêtes web et la sécurisation des échanges"
    },
    {
        "mot": "localhost & Port réseau",
        "statut": "Non défini (Cité)",
        "type": "Réseau Local",
        "definition": "Adresse d'hôte interne (localhost) et canal numérique (port, ex: 3000) permettant de tester et faire tourner un serveur web sur sa propre machine.",
        "ref": "Cité dans M1C4L6 & M1C3L5 — Exécution et test de serveurs locaux"
    },
    {
        "mot": "Méthodes HTTP (GET, POST, PUT, DELETE)",
        "statut": "Non défini (Cité)",
        "type": "Verbes Web / API",
        "definition": "Actions standards spécifiées dans une requête HTTP indiquant au serveur s'il doit lire (GET), créer (POST), modifier (PUT) ou supprimer (DELETE) une donnée.",
        "ref": "Cité dans M1C3L5, M1C4L2 & M1C4L6 — Interroger et manipuler les données d'une API"
    },
    {
        "mot": "RAG (Retrieval-Augmented Generation)",
        "statut": "Non défini (Cité)",
        "type": "Concept IA",
        "definition": "Technique permettant à un agent IA d'extraire dynamiquement des documents pertinents ou du code depuis le projet pour enrichir son prompt avant de répondre.",
        "ref": "Cité dans M1C4L3 & M1C4L6 — Injection de contexte et recherche documentaire IA"
    },
    {
        "mot": "Refactorisation (Refactoring)",
        "statut": "Non défini (Cité)",
        "type": "Méthode de Code",
        "definition": "Réécriture du code source pour en améliorer la lisibilité, l'architecture et les performances sans altérer le comportement fonctionnel externe.",
        "ref": "Cité dans M1C2L7, M2C4L9 & M4C5L2 — Nettoyer et restructurer le code avec l'agent"
    },
    {
        "mot": "WebContainers",
        "statut": "Non défini (Cité)",
        "type": "Technologie Web",
        "definition": "Technologie développée par StackBlitz permettant d'exécuter un environnement Node.js complet directement dans le moteur du navigateur web.",
        "ref": "Cité dans M1C2L8 & M2C3L1 — Prise en main des IDE web (Bolt.new)"
    }
]

# Sort alphabetically by 'mot' (case insensitive, ignoring leading dots)
def get_sort_key(item):
    mot = item["mot"].lstrip(".")
    return mot.lower()

sorted_glossary = sorted(glossary_entries, key=get_sort_key)

# Generate Markdown content
md_lines = []
md_lines.append("# 📚 Glossaire Officiel de la Formation Vibe Coding")
md_lines.append("\nCe glossaire regroupe l'ensemble des termes techniques, outils, concepts IA, langages, méthodes et architectures des **Modules 1, 2, 3 et 4**, classés par **ordre alphabétique**.\n")
md_lines.append("| Mot / Concept | Statut | Type de terme | Définition | Référence de la leçon (Code & Nom) |")
md_lines.append("| :--- | :--- | :--- | :--- | :--- |")

for item in sorted_glossary:
    mot = item["mot"]
    statut = f"`{item['statut']}`"
    ttype = f"`{item['type']}`"
    definition = item["definition"].replace("\n", " ")
    ref = item["ref"]
    md_lines.append(f"| **{mot}** | {statut} | {ttype} | {definition} | {ref} |")

glossary_content = "\n".join(md_lines)

# Write to glossaire_formation_vibe_coding.md
target_path = "/Users/maximeelhaik/Documents/VIBE CODING GENERATION/glossaire_formation_vibe_coding.md"
with open(target_path, "w", encoding="utf-8") as f:
    f.write(glossary_content)

print(f"✅ Glossaire mis à jour et trié par ordre alphabétique dans {target_path} ({len(sorted_glossary)} termes).")
