# -*- coding: utf-8 -*-
"""
Structure de données pour la plateforme de quiz Vibe Coding (Certification IQ Project).
Ce fichier regroupe les questions d'entraînement organisées par bloc de compétences (C1 à C6)
ainsi que la configuration du grand examen blanc de 50 questions.
"""

QUIZ_DATA = {
    "modules": [
        {
            "id": "c1",
            "code": "C1",
            "title": "Cadrer un produit numérique",
            "subtitle": "Brief, parcours utilisateur & Prompt Zéro",
            "description": "Formalisation des besoins utilisateurs, user stories et structure complète du Prompt Zéro.",
            "icon": "🎯",
            "color": "var(--color-brand-purple)",
            "badge": "Compétence 1",
            "questions": [
                {
                    "id": 101,
                    "text": "Quelle est la fonction essentielle d'un « Prompt Zéro » lors du démarrage d'un projet de développement ?",
                    "options": [
                        "Compiler et déployer automatiquement les conteneurs Docker de l'infrastructure",
                        "Définir le rôle, l'architecture cible, la stack technique et les règles globales",
                        "Générer directement l'ensemble des fichiers de code front-end et back-end finaux",
                        "Extraire les maquettes graphiques Figma pour les convertir en assets vectoriels"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Le Prompt Zéro sert de socle de cadrage : il pose le périmètre fonctionnel, les standards d'architecture et les contraintes techniques avant toute génération de code."
                },
                {
                    "id": 102,
                    "text": "Comment structurer efficacement la priorisation des fonctionnalités d'un MVP avant le prototypage ?",
                    "options": [
                        "Classer les fonctionnalités par ordre alphabétique dans le backlog du projet",
                        "Sélectionner les tâches selon le temps d'exécution estimé de chaque modèle d'IA",
                        "Organiser les besoins selon la valeur métier apportée aux parcours utilisateurs",
                        "Développer en priorité les composants graphiques les plus complexes visuellement"
                    ],
                    "correctAnswer": 2,
                    "explanation": "La priorisation d'un MVP repose sur la valeur apportée aux personas cibles et sur la couverture des scénarios d'usage critiques, et non sur des priorités arbitraires."
                },
                {
                    "id": 103,
                    "text": "Pour transmettre un parcours utilisateur sans ambiguïté à un LLM, quel format est le plus adapté ?",
                    "options": [
                        "Un diagramme textuel Mermaid détaillant les étapes et embranchements logiques",
                        "Une capture d'écran compressée d'un tableau blanc virtuel sans légende écrite",
                        "Un enregistrement audio décrivant oralement la navigation étape par étape",
                        "Un document binaire propriétaire nécessitant une licence logicielle externe"
                    ],
                    "correctAnswer": 0,
                    "explanation": "Les diagrammes textuels comme Mermaid sont nativement interprétables par les modèles de langage et explicitent rigoureusement les transitions d'état."
                },
                {
                    "id": 104,
                    "text": "Quels composants structurent un prompt de développement complet et directement opérationnel ?",
                    "options": [
                        "Un ensemble de mots-clés génériques associés au lien vers la documentation",
                        "L'instruction de commande brute complétée par la clé d'authentification API",
                        "L'extrait du dépôt de code source accompagné d'une demande de refactorisation",
                        "Le rôle attribué, l'objectif précis, les contraintes et les conditions de succès"
                    ],
                    "correctAnswer": 3,
                    "explanation": "Un prompt de qualité industrielle spécifie le rôle, le contexte d'exécution, la tâche attendue, les contraintes techniques strictes et les conditions de succès."
                },
                {
                    "id": 105,
                    "text": "Quel est le rôle principal d'un fichier de règles contextuelles (ex. AGENTS.md) dans un dépôt ?",
                    "options": [
                        "Fournir un garde-fou persistant imposant les standards d'architecture et de code",
                        "Accélérer l'installation des dépendances Node.js en gérant le cache du compilateur",
                        "Remplacer l'utilisation du gestionnaire de versions Git pour le suivi du projet",
                        "Configurer automatiquement les variables d'environnement sur le serveur distant"
                    ],
                    "correctAnswer": 0,
                    "explanation": "Un fichier comme AGENTS.md maintient le contexte et les directives du projet entre les sessions, évitant les régressions architecturales de l'assistant IA."
                }
            ]
        },
        {
            "id": "c2",
            "code": "C2",
            "title": "Générer et itérer un prototype fonctionnel",
            "subtitle": "Itérations IA, résolution de bugs & rollbacks",
            "description": "Itérations avec l'IA, résolution méthodique des erreurs et gestion des rollbacks.",
            "icon": "⚡",
            "color": "var(--color-brand-purple)",
            "badge": "Compétence 2",
            "questions": [
                {
                    "id": 201,
                    "text": "Face à une erreur récurrente de code produite par un assistant IA, quelle démarche adopter ?",
                    "options": [
                        "Isoler le composant défaillant, fournir le log d'erreur exact et cadrer la demande",
                        "Réitérer la même consigne textuelle à plusieurs reprises dans la même session",
                        "Désactiver le typage strict du projet afin de masquer l'affichage de l'anomalie",
                        "Réinitialiser l'environnement complet et changer immédiatement de framework web"
                    ],
                    "correctAnswer": 0,
                    "explanation": "Le débogage méthodique avec une IA repose sur l'isolation du périmètre, la fourniture des messages d'erreur complets et une consigne de correction ciblée."
                },
                {
                    "id": 202,
                    "text": "Dans un workflow de génération de code assisté par IA, à quel moment déclencher un rollback ?",
                    "options": [
                        "À la fin de chaque journée de développement avant de fermer l'éditeur de texte",
                        "Uniquement après la mise en production lors de la découverte d'une faille critique",
                        "Dès qu'une itération dégrade le code existant et s'avère plus coûteuse à réparer",
                        "Dès qu'une dépendance logicielle tierce publie un correctif de sécurité mineur"
                    ],
                    "correctAnswer": 2,
                    "explanation": "Revenir rapidement à un état stable (via Git ou checkpoint) évite l'accumulation d'erreurs en cascade après une itération infructueuse."
                },
                {
                    "id": 203,
                    "text": "En ingénierie de code avec les LLM, que caractérise précisément le terme « hallucination » ?",
                    "options": [
                        "Un ralentissement temporaire de l'inférence lié à une congestion du réseau distant",
                        "Une erreur de compilation générée par un typage incorrect dans le code source écrit",
                        "L'invention de bibliothèques, de fonctions ou de paramètres syntaxiquement crédibles",
                        "Une incompatibilité entre deux versions majeures d'un système de gestion de paquets"
                    ],
                    "correctAnswer": 2,
                    "explanation": "L'hallucination désigne la production par le modèle d'APIs, de paquets ou de paramètres inexistants, formulés avec une structure apparemment valide."
                }
            ]
        },
        {
            "id": "c3",
            "code": "C3",
            "title": "Configurer un environnement local & Git",
            "subtitle": "Git, branches, architecture & documentation",
            "description": "Clonage local, gestion des branches Git, architecture modulaire et fichier README.",
            "icon": "💻",
            "color": "var(--color-brand-purple)",
            "badge": "Compétence 3",
            "questions": [
                {
                    "id": 301,
                    "text": "Quelle commande Git télécharge la totalité d'un dépôt distant sur votre poste local ?",
                    "options": [
                        "git clone <url_du_depot>",
                        "git fetch --all-tags",
                        "git pull origin main",
                        "git checkout -b local"
                    ],
                    "correctAnswer": 0,
                    "explanation": "`git clone` crée une copie locale intégrale du dépôt distant avec tout son historique de commits."
                },
                {
                    "id": 302,
                    "text": "Quelle est la vocation principale d'un fichier README.md à la racine d'une application ?",
                    "options": [
                        "Stocker les clés secrètes et les certificats TLS pour l'environnement de production",
                        "Définir les règles de linting automatique appliquées lors de la phase de pré-commit",
                        "Gérer l'indexation du site web par les moteurs de recherche et les robots d'exploration",
                        "Documenter l'installation, les variables requises, le lancement et l'architecture"
                    ],
                    "correctAnswer": 3,
                    "explanation": "Le fichier README.md fournit la documentation indispensable pour permettre à tout développeur d'installer, configurer et exécuter le projet sans friction."
                },
                {
                    "id": 303,
                    "text": "Pourquoi est-il recommandé d'isoler chaque nouvelle fonctionnalité sur une branche Git dédiée ?",
                    "options": [
                        "Pour réduire la taille totale du dossier .git lors des transferts vers le serveur",
                        "Pour forcer le système de build à recompiler l'ensemble des modules du projet",
                        "Pour développer sans impacter la branche stable et faciliter la revue avant fusion",
                        "Pour contourner les mécanismes de sécurité mis en place sur le dépôt distant"
                    ],
                    "correctAnswer": 2,
                    "explanation": "Travailler sur des branches isolées préserve la branche de référence (main/master) de toute régression instable tant que le code n'est pas validé."
                }
            ]
        },
        {
            "id": "c4",
            "code": "C4",
            "title": "Interfacer avec des services externes",
            "subtitle": "API REST, MCP, Supabase & authentification",
            "description": "Connexion d'API REST, protocoles MCP, base de données Supabase et authentification.",
            "icon": "🔌",
            "color": "var(--color-brand-purple)",
            "badge": "Compétence 4",
            "questions": [
                {
                    "id": 401,
                    "text": "Dans l'écosystème des agents autonomes, que définit le protocole MCP (Model Context Protocol) ?",
                    "options": [
                        "Un protocole de compression réseau dédié aux flux vidéo haute définition",
                        "Un système de cache distribué pour accélérer les transactions en base SQL",
                        "Un format de fichier binaire propriétaire destiné aux modèles de vision",
                        "Un standard ouvert permettant aux LLM de communiquer avec des outils et API"
                    ],
                    "correctAnswer": 3,
                    "explanation": "Le Model Context Protocol (MCP) standardise la connexion entre modèles d'IA et sources de données ou outils locaux et distants."
                },
                {
                    "id": 402,
                    "text": "Dans une architecture BaaS Supabase, quel moteur relationnel sous-jacent stocke les données ?",
                    "options": [
                        "PostgreSQL",
                        "MongoDB",
                        "SQLite",
                        "Redis"
                    ],
                    "correctAnswer": 0,
                    "explanation": "Supabase repose directement sur le moteur relationnel open-source PostgreSQL, héritant de sa robustesse, de ses types avancés et de ses extensions."
                },
                {
                    "id": 403,
                    "text": "Selon les standards REST, quelle méthode HTTP convient pour créer une nouvelle ressource ?",
                    "options": [
                        "PATCH",
                        "POST",
                        "GET",
                        "PUT"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Dans une API REST conventionnelle, POST est la méthode standard pour créer une entité sur le serveur."
                }
            ]
        },
        {
            "id": "c5",
            "code": "C5",
            "title": "Déployer en production & Sécurité",
            "subtitle": "Vercel, HTTPS, .env.local & RLS Supabase",
            "description": "Déploiement sur Vercel, isolation des clés secrètes (.env) et politiques de sécurité RLS.",
            "icon": "🛡️",
            "color": "var(--color-brand-purple)",
            "badge": "Compétence 5",
            "questions": [
                {
                    "id": 501,
                    "text": "Dans une base de données cloud (ex. Supabase), pourquoi activer la Row Level Security (RLS) ?",
                    "options": [
                        "Pour accélérer les requêtes SQL en indexant automatiquement chaque clé primaire",
                        "Pour compresser les sauvegardes périodiques stockées sur le serveur d'archivage",
                        "Pour restreindre l'accès aux lignes de données selon l'identité de l'utilisateur",
                        "Pour autoriser l'exécution de requêtes arbitraires depuis n'importe quel client web"
                    ],
                    "correctAnswer": 2,
                    "explanation": "La RLS applique des règles d'autorisation directement au niveau de la base : un utilisateur ne peut lire ou modifier que les enregistrements auxquels il a droit."
                },
                {
                    "id": 502,
                    "text": "Où doivent résider les clés secrètes d'API (ex. OPENAI_API_KEY) d'une application web ?",
                    "options": [
                        "Dans les constantes exportées d'un fichier JavaScript intégré au bundle front-end",
                        "Dans les attributs data des balises HTML visibles dans l'inspecteur du navigateur",
                        "Dans un cookie accessible en lecture côté client sans directive de protection",
                        "Dans un fichier .env non versionné et dans les variables d'environnement serveur"
                    ],
                    "correctAnswer": 3,
                    "explanation": "Les clés secrètes ne doivent jamais être exposées côté client ni commitées dans Git ; elles sont injectées côté serveur via les variables d'environnement."
                },
                {
                    "id": 503,
                    "text": "Quel est le bénéfice fondamental apporté par le protocole HTTPS sur un service web en ligne ?",
                    "options": [
                        "Optimiser le rendu graphique des animations CSS en délégant le calcul au GPU distant",
                        "Chiffrer le trafic pour empêcher l'interception ou la modification frauduleuse des données",
                        "Augmenter automatiquement la bande passante allouée par le fournisseur d'accès internet",
                        "Désactiver les mécanismes de mise en cache du navigateur pour rafraîchir le contenu"
                    ],
                    "correctAnswer": 1,
                    "explanation": "HTTPS établit une couche de chiffrement TLS garantissant la confidentialité et l'intégrité des échanges entre le navigateur et le serveur."
                }
            ]
        },
        {
            "id": "c6",
            "code": "C6",
            "title": "Veille, Choix des modèles & Éthique",
            "subtitle": "Comparatifs LLM, RGPD, coûts & hallucinations",
            "description": "Comparatif des LLM, arbitrage des coûts/latence, prévention des hallucinations et conformité RGPD.",
            "icon": "🧠",
            "color": "var(--color-brand-purple)",
            "badge": "Compétence 6",
            "questions": [
                {
                    "id": 601,
                    "text": "Quels paramètres techniques et économiques guident la sélection d'un LLM pour un usage précis ?",
                    "options": [
                        "L'ancienneté historique du framework de déploiement et la réputation de son fondateur",
                        "Le volume de campagnes publicitaires diffusées par le fournisseur sur les réseaux sociaux",
                        "L'équilibre entre capacités de raisonnement, latence, fenêtre de contexte et coût token",
                        "Le nombre total de lignes de code présentes dans le dépôt open-source du projet hôte"
                    ],
                    "correctAnswer": 2,
                    "explanation": "Le choix d'un modèle découle d'un compromis rigoureux : précision technique requise, temps de réponse attendu, taille du contexte et budget d'inférence par requête."
                },
                {
                    "id": 602,
                    "text": "Conformément aux principes du RGPD, comment traiter les données personnelles d'utilisateurs ?",
                    "options": [
                        "Transmettre toutes les informations collectées aux modèles tiers sans clause de protection",
                        "Minimiser les données, recueillir le consentement et restreindre les transferts non sécurisés",
                        "Masquer les mentions légales et refuser l'exercice du droit d'accès aux personnes inscrites",
                        "Conserver l'historique complet des saisies sans limitation de durée ni chiffrement au repos"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Le RGPD impose la collecte minimale, la transparence, une base légale claire (ex. consentement) et l'interdiction de divulguer des données personnelles à des services non sécurisés."
                },
                {
                    "id": 603,
                    "text": "En quoi consiste le principe de « minimisation des données » lors de la conception d'un formulaire ?",
                    "options": [
                        "Restreindre la collecte aux seules données strictement requises pour le service rendu",
                        "Réduire le nombre de caractères autorisés dans chaque champ de saisie textuelle",
                        "Limiter l'accès au formulaire à une plage horaire définie au cours de la journée",
                        "Sauvegarder les données de formulaire sous forme d'archives compressées au format gzip"
                    ],
                    "correctAnswer": 0,
                    "explanation": "La minimisation impose de ne collecter que les données indispensables à la réalisation de la finalité annoncée à l'utilisateur."
                }
            ]
        }
    ],
    "finalExam": {
        "id": "final-exam",
        "code": "EXAM",
        "title": "Grand Examen Blanc (50 Questions)",
        "subtitle": "Simulation d'épreuve en conditions réelles",
        "description": "50 questions aléatoires sans remise couvrant l'intégralité des 6 compétences clés.",
        "icon": "🏆",
        "targetQuestionsCount": 50
    }
}
