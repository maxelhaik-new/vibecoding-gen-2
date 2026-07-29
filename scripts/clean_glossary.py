import json
import re

# Comprehensive list of genuine technical terms, vocabulary, concepts, tools, languages, architectures, and methodologies for the Vibe Coding course
# Filter out persona names, slide section titles, lesson titles, and generic phrases.

clean_terms_db = [
    {
        "mot": ".env (.env.local)",
        "statut": "Défini",
        "type": "Sécurité / Configuration",
        "definition": "Fichier texte confidentiel stockant les variables d'environnement et clés API hors du code source.",
        "ref": "M4C4L5 — Isoler ses secrets et variables locales dans .env.local"
    },
    {
        "mot": ".gitignore",
        "statut": "Non défini (Cité)",
        "type": "Fichier de Config Git",
        "definition": "Fichier spécifiant les dossiers temporaires, clés API et dépendances que Git doit ignorer lors des commits.",
        "ref": "Cité dans M2C5L3 & M3C4L6 — Masquage des fichiers sensibles et secrets"
    },
    {
        "mot": "AGENTS.md",
        "statut": "Défini",
        "type": "Fichier de Contexte / Méthode",
        "definition": "Fichier de cadrage à la racine du projet définissant les règles, la stack et les comportements pour l'agent IA.",
        "ref": "M4C3L1 — La gestion des agents IA dans un IDE local"
    },
    {
        "mot": "Antigravity",
        "statut": "Défini",
        "type": "IDE / Agent SOTA",
        "definition": "Environnement de développement agentique local permettant d'orchestrer des sous-agents autonomes et des workflows complexes.",
        "ref": "M4C1L1 — Découvrir les bases d'Antigravity"
    },
    {
        "mot": "API (Application Programming Interface)",
        "statut": "Défini",
        "type": "Architecture",
        "definition": "Ensemble de règles et protocoles permettant à des applications ou services informatiques de communiquer et d'échanger des données.",
        "ref": "M4C4L4 — Connecter l'interface Front-end au serveur local"
    },
    {
        "mot": "Bac à sable (Sandboxing)",
        "statut": "Non défini (Cité)",
        "type": "Sécurité / IDE",
        "definition": "Environnement d'exécution isolé restreignant les accès réseau et système d'un agent IA pour sécuriser les commandes.",
        "ref": "Cité dans M1C4L5 & M1C5L5 — Sécurisation des agents et de l'exécution local"
    },
    {
        "mot": "Back-end",
        "statut": "Défini",
        "type": "Architecture",
        "definition": "Partie serveur d'une application gérant la logique métier, la base de données et la sécurité des accès.",
        "ref": "M1C3L1 — Différencier le Front-end et le Back-end"
    },
    {
        "mot": "Bolt.new",
        "statut": "Défini",
        "type": "Outil / Plateforme",
        "definition": "IDE web basé sur WebContainers exécutant Node.js directement dans le navigateur pour prototyper rapidement.",
        "ref": "M2C3L1 — Prise en main de Bolt.new"
    },
    {
        "mot": "Branche Git",
        "statut": "Défini",
        "type": "Concept Git",
        "definition": "Ligne de développement indépendante isolant une nouvelle fonctionnalité avant sa fusion dans le code principal.",
        "ref": "M4C4L7 — Maîtriser Git local (Commits & Branches)"
    },
    {
        "mot": "Browser Agent",
        "statut": "Défini",
        "type": "Outil IA",
        "definition": "Sous-agent IA capable de naviguer de façon autonome sur le web, d'inspecter le DOM et de tester des interfaces.",
        "ref": "M4C3L6 — Comprendre et utiliser un Browser Agent"
    },
    {
        "mot": "Claude 3.5 Sonnet",
        "statut": "Défini",
        "type": "Modèle IA",
        "definition": "Modèle de langage d'Anthropic reconnu pour ses capacités avancées en génération de code et raisonnement.",
        "ref": "M3C2L1 — Prise en main de Cursor pour le mobile"
    },
    {
        "mot": "Commit",
        "statut": "Défini",
        "type": "Concept Git",
        "definition": "Sauvegarde instantanée et horodatée d'un ensemble de modifications apportées au code source avec un message descriptif.",
        "ref": "M4C1L8 — Réaliser ses premiers commits avec l'agent"
    },
    {
        "mot": "Composant UI",
        "statut": "Défini",
        "type": "Concept Web",
        "definition": "Brique autonome et réutilisable d'une interface utilisateur (ex: bouton, carte, formulaire).",
        "ref": "M2C2L3 — Modifier et affiner le design en langage naturel"
    },
    {
        "mot": "Contexte (Context Window)",
        "statut": "Défini",
        "type": "Concept IA",
        "definition": "Fenêtre de mémoire vive d'un LLM, mesurée en tokens, représentant la quantité maximale d'informations traitées simultanément.",
        "ref": "M1C2L3 — Gérer le contexte et la mémoire de l'agent"
    },
    {
        "mot": "Cross-Platform",
        "statut": "Défini",
        "type": "Architecture",
        "definition": "Capacité d'un code source unique à s'exécuter sur plusieurs systèmes d'exploitation (iOS, Android, Web).",
        "ref": "M3C1L1 — Introduction à la création d'applications mobiles"
    },
    {
        "mot": "CSS (Cascading Style Sheets)",
        "statut": "Défini",
        "type": "Langage",
        "definition": "Langage informatique décrivant la présentation visuelle, les couleurs et la mise en page d'un document HTML.",
        "ref": "M1C3L3 — Les bases du CSS"
    },
    {
        "mot": "Cursor",
        "statut": "Défini",
        "type": "IDE / Outil",
        "definition": "Éditeur de code intelligent intégrant nativement des agents IA pour éditer et déboguer du code en local.",
        "ref": "M3C2L1 — Prise en main de Cursor pour le mobile"
    },
    {
        "mot": "Dépôt Git (Repository)",
        "statut": "Non défini (Cité)",
        "type": "Concept Git",
        "definition": "Dossier de projet sous contrôle de version Git stockant le code, les branches et l'historique complet des commits.",
        "ref": "Cité dans M1C1L4 & M1C4L3 — Clonage et gestion de dépôts"
    },
    {
        "mot": "DOM (Document Object Model)",
        "statut": "Défini",
        "type": "Concept Web",
        "definition": "Représentation sous forme d'arbre hiérarchique de la structure HTML d'une page, manipulable par JavaScript.",
        "ref": "M1C3L4 — Les bases du JavaScript"
    },
    {
        "mot": "Endpoint",
        "statut": "Défini",
        "type": "Architecture / Web",
        "definition": "URL d'une API où un client envoie des requêtes réseau pour interagir avec une ressource ou un serveur.",
        "ref": "M4C4L4 — Connecter l'interface Front-end au serveur local"
    },
    {
        "mot": "Expo",
        "statut": "Défini",
        "type": "Outil / Framework",
        "definition": "Plateforme et écosystème facilitant le développement, le test et la compilation d'applications React Native.",
        "ref": "M3C1L2 — Découvrir l'écosystème Expo & React Native"
    },
    {
        "mot": "Express.js",
        "statut": "Défini",
        "type": "Framework Backend",
        "definition": "Framework serveur léger pour Node.js permettant de créer des API REST et de gérer les routes web.",
        "ref": "M4C4L3 — Générer son premier serveur local (Node.js/Express)"
    },
    {
        "mot": "Front-end",
        "statut": "Défini",
        "type": "Architecture",
        "definition": "Partie cliente visuelle d'une application exécutée directement dans le navigateur (HTML, CSS, JS).",
        "ref": "M1C3L1 — Différencier le Front-end et le Back-end"
    },
    {
        "mot": "Git",
        "statut": "Défini",
        "type": "Outil / VCS",
        "definition": "Système de contrôle de version distribué enregistrant l'historique des modifications du code source.",
        "ref": "M4C1L8 — Sauvegarder son travail avec Git"
    },
    {
        "mot": "GitHub",
        "statut": "Défini",
        "type": "Plateforme / Cloud",
        "definition": "Plateforme cloud d'hébergement et de collaboration autour de dépôts Git.",
        "ref": "M4C1L8 — Sauvegarder son travail avec Git"
    },
    {
        "mot": "Hallucination IA",
        "statut": "Défini",
        "type": "Concept IA / Risque",
        "definition": "Génération par l'IA d'informations, paquets ou lignes de code inexacts présentés avec assurance.",
        "ref": "M1C2L5 — Identifier les pièges et limites de l'IA"
    },
    {
        "mot": "HTML (HyperText Markup Language)",
        "statut": "Défini",
        "type": "Langage",
        "definition": "Langage de balisage standard structurant les éléments et le contenu d'une page web.",
        "ref": "M1C3L2 — Les bases du HTML"
    },
    {
        "mot": "HTTP / HTTPS",
        "statut": "Non défini (Cité)",
        "type": "Protocole Web",
        "definition": "Protocole de transfert de données régissant les échanges sécurisés (HTTPS) entre client et serveur.",
        "ref": "Cité dans M1C1L4 & M1C3L5 — Les échanges de données réseau"
    },
    {
        "mot": "IA Générative (LLM)",
        "statut": "Défini",
        "type": "Concept IA",
        "definition": "Modèle d'IA entraîné sur d'immenses corpus de texte capables de comprendre et générer du code et du texte.",
        "ref": "M1C1L3 — Comprendre le rôle de l'IA dans la création de logiciels"
    },
    {
        "mot": "IDE Agentique",
        "statut": "Défini",
        "type": "Concept / Outil",
        "definition": "Environnement de développement où l'IA dispose d'accès directs aux fichiers, au terminal et aux commandes.",
        "ref": "M4C1L2 — Pourquoi utiliser un IDE agentique local ?"
    },
    {
        "mot": "Injection SQL",
        "statut": "Défini",
        "type": "Sécurité Web",
        "definition": "Faille de sécurité où un attaquant injecte du code SQL malveillant dans un formulaire pour manipuler la base de données.",
        "ref": "M2C5L6 — La chaîne de confiance et la sécurité"
    },
    {
        "mot": "JavaScript (JS)",
        "statut": "Défini",
        "type": "Langage",
        "definition": "Langage de programmation dynamique apportant l'interactivité et la logique métier au web.",
        "ref": "M1C3L4 — Les bases du JavaScript"
    },
    {
        "mot": "JSON (JavaScript Object Notation)",
        "statut": "Défini",
        "type": "Format de données",
        "definition": "Format texte d'échange de données léger structuré sous forme de paires clé-valeur.",
        "ref": "M1C3L4 — Les bases du JavaScript"
    },
    {
        "mot": "Layout / Flexbox",
        "statut": "Défini",
        "type": "Concept Web / Mobile",
        "definition": "Modèle de mise en page structurant l'alignement et la distribution de l'espace des éléments UI.",
        "ref": "M3C3L1 — Concevoir l'interface mobile"
    },
    {
        "mot": "localhost & Port réseau",
        "statut": "Non défini (Cité)",
        "type": "Réseau Local",
        "definition": "Adresse d'hôte interne (localhost) et canal virtuel (port) permettant de tester des serveurs web en local.",
        "ref": "Cité dans M1C4L6 & M1C3L5 — Serveurs locaux et ports d'écoute"
    },
    {
        "mot": "Logs d'erreur",
        "statut": "Défini",
        "type": "Débogage",
        "definition": "Historique chronologique des événements et erreurs émis par un serveur ou une application.",
        "ref": "M4C4L6 — Déboguer la chaîne Front-Back et lire les logs"
    },
    {
        "mot": "Lovable",
        "statut": "Défini",
        "type": "Outil / Plateforme",
        "definition": "Plateforme web de Vibe Coding générant des applications web réactives en langage naturel.",
        "ref": "M2C2L1 — Prise en main de Lovable"
    },
    {
        "mot": "Mode Chat",
        "statut": "Défini",
        "type": "Mode IDE",
        "definition": "Mode conversationnel permettant d'interroger l'agent et d'analyser le code sans modifier les fichiers.",
        "ref": "M4C2L3 — Le mode Chat"
    },
    {
        "mot": "Mode Composer",
        "statut": "Défini",
        "type": "Mode IDE",
        "definition": "Mode d'édition directe autorisant l'agent à créer et modifier automatiquement des fichiers du projet.",
        "ref": "M4C2L4 — Le mode Composer"
    },
    {
        "mot": "Mode Plan",
        "statut": "Défini",
        "type": "Mode IDE",
        "definition": "Mode stratégique dans lequel l'agent formule une feuille de route détaillée avant d'écrire du code.",
        "ref": "M4C2L6 — Le mode Plan"
    },
    {
        "mot": "No-Code / Low-Code",
        "statut": "Défini",
        "type": "Méthode",
        "definition": "Approche de création logicielle basée sur des interfaces visuelles réduisant la rédaction manuelle de code.",
        "ref": "M2C1L1 — Comparatif des plateformes de Vibe Coding Web"
    },
    {
        "mot": "Node.js",
        "statut": "Défini",
        "type": "Environnement d'exécution",
        "definition": "Environnement d'exécution JavaScript côté serveur basé sur le moteur V8 de Chrome.",
        "ref": "M4C4L3 — Générer son premier serveur local (Node.js/Express)"
    },
    {
        "mot": "Prompt Engineering",
        "statut": "Défini",
        "type": "Méthode",
        "definition": "Discipline visant à concevoir, structurer et optimiser les consignes envoyées aux LLM.",
        "ref": "M1C2L1 — Découvrir l'art du Prompt Engineering"
    },
    {
        "mot": "Prompt Zero",
        "statut": "Défini",
        "type": "Méthode Prompting",
        "definition": "Prompt initial fixant le cadre fonctionnel, la stack technique et les règles d'un nouveau projet.",
        "ref": "M2C3L4 — Découvrir le Prompt Zero"
    },
    {
        "mot": "Prompting",
        "statut": "Défini",
        "type": "Méthode",
        "definition": "Art d'exprimer des consignes et contraintes textuelles claires à destination d'une IA.",
        "ref": "M1C2L1 — Découvrir l'art du Prompt Engineering"
    },
    {
        "mot": "RAG (Retrieval-Augmented Generation)",
        "statut": "Non défini (Cité)",
        "type": "Concept IA",
        "definition": "Technique d'injection dynamique de contexte documentaire ou de code dans le prompt avant réponse.",
        "ref": "Cité dans M1C4L3 & M1C4L6 — Injection documentaire"
    },
    {
        "mot": "React",
        "statut": "Défini",
        "type": "Framework / Bibliothèque",
        "definition": "Bibliothèque JavaScript open-source développée par Meta pour créer des interfaces basées sur des composants.",
        "ref": "M2C2L2 — Générer sa première application web avec Lovable"
    },
    {
        "mot": "React Native",
        "statut": "Défini",
        "type": "Framework",
        "definition": "Framework de Meta permettant de développer des applications mobiles natives iOS et Android en JavaScript.",
        "ref": "M3C1L1 — Introduction à la création d'applications mobiles"
    },
    {
        "mot": "Refactorisation (Refactoring)",
        "statut": "Non défini (Cité)",
        "type": "Méthode de Code",
        "definition": "Réécriture du code pour améliorer sa lisibilité et sa structure sans en modifier le comportement externe.",
        "ref": "Cité dans M1C2L7 & M4C5L2 — Nettoyage et restructuration du code"
    },
    {
        "mot": "Responsive Design",
        "statut": "Défini",
        "type": "Méthode / Design",
        "definition": "Conception d'interface s'adaptant automatiquement à toutes les tailles d'écrans (mobile, tablette, desktop).",
        "ref": "M2C2L3 — Modifier et affiner le design"
    },
    {
        "mot": "SKILL (Compétence Agent)",
        "statut": "Défini",
        "type": "Extension IA",
        "definition": "Module de connaissances ou script réutilisable étendant les capacités d'un agent sur une tâche précise.",
        "ref": "M4C3L8 — Comprendre et utiliser des SKILLS"
    },
    {
        "mot": "Sous-Agent (Subagent)",
        "statut": "Défini",
        "type": "Concept IA",
        "definition": "Instance fille d'un agent IA exécutant une tâche en arrière-plan sans bloquer la session principale.",
        "ref": "M4C3L4 — Les sous-agents et la parallélisation de tâches"
    },
    {
        "mot": "Tailwind CSS",
        "statut": "Défini",
        "type": "Framework CSS",
        "definition": "Framework CSS orienté utilitaires facilitant la stylisation des composants web dans les classes.",
        "ref": "M2C2L2 — Générer sa première application web avec Lovable"
    },
    {
        "mot": "Terminal / CLI",
        "statut": "Défini",
        "type": "Outil / Interface",
        "definition": "Interface textuelle permettant d'exécuter des commandes système et de piloter des outils et serveurs.",
        "ref": "M4C1L6 — Comprendre le terminal & les commandes clés"
    },
    {
        "mot": "Token",
        "statut": "Défini",
        "type": "Concept IA / Métrique",
        "definition": "Unité minimale de texte traitée par un LLM (1000 tokens ≈ 750 mots).",
        "ref": "M1C2L3 — Gérer le contexte et la mémoire de l'agent"
    },
    {
        "mot": "v0 (by Vercel)",
        "statut": "Défini",
        "type": "Outil / Plateforme",
        "definition": "Générateur d'interfaces UI alimenté par l'IA créant du code React et Tailwind CSS de haute qualité.",
        "ref": "M2C4L1 — Prise en main de v0 by Vercel"
    },
    {
        "mot": "Vibe Coding",
        "statut": "Défini",
        "type": "Méthode / Philosophie",
        "definition": "Développement logiciel guidé par des agents IA en langage naturel pour créer, modifier et tester des applications.",
        "ref": "M1C1L2 — Qu'est-ce que le Vibe Coding ?"
    }
]

# Sort alphabetically by term
sorted_terms = sorted(clean_terms_db, key=lambda x: x["mot"].lstrip(".").lower())

md_lines = []
md_lines.append("# 📚 Glossaire Officiel de la Formation Vibe Coding")
md_lines.append("\nCe glossaire regroupe exclusivement le **vocabulaire technique, les outils, langages, architectures et méthodes** enseignés dans les **Modules 1, 2, 3 et 4**, classés par **ordre alphabétique**.\n")
md_lines.append("| Mot / Concept | Statut | Type de terme | Définition | Référence de la leçon |")
md_lines.append("| :--- | :--- | :--- | :--- | :--- |")

for item in sorted_terms:
    mot = item["mot"]
    statut = f"`{item['statut']}`"
    ttype = f"`{item['type']}`"
    definition = item["definition"]
    ref = item["ref"]
    md_lines.append(f"| **{mot}** | {statut} | {ttype} | {definition} | {ref} |")

target_path = "/Users/maximeelhaik/Documents/VIBE CODING GENERATION/glossaire_formation_vibe_coding.md"
with open(target_path, "w", encoding="utf-8") as f:
    f.write("\n".join(md_lines))

print(f"✅ Grand nettoyage terminé ! Glossaire purifié avec {len(sorted_terms)} termes techniques réels.")
