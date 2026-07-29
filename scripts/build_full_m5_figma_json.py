import json

m5_json_data = {
  "moduleTitle": "Module 5 : Full-Stack, Sécurité & Déploiement : Réussir son Projet Certifiant",
  "moduleSlug": "module-5",
  "lessons": [
    # ----------------------------------------------------
    # CHAPITRE 1
    # ----------------------------------------------------
    {
      "lessonSlug": "m5c1l1",
      "lessonTitle": "M5C1L1 — Les objectifs du chapitre : Cadrer son projet certifiant & Définir le produit",
      "lessonType": "theorique",
      "slides": [
        {
          "template": "VIBECODING - COVER",
          "content": {
            "Titre": "Les objectifs du chapitre : Cadrer son projet certifiant & Définir le produit"
          }
        },
        {
          "template": "VIBECODING - INTRO",
          "content": {
            "Titre": "De quoi parlons-nous ?",
            "Intro": "Ce premier chapitre pose le socle du projet fil rouge certifiant. Voyons les 3 objectifs clés pour cadrer l'application métier et formaliser les consignes d'IA.",
            "Titre 1": "Exigences certification",
            "Texte 1": "Voyons les règles des épreuves et les critères d'évaluation de la certification.",
            "Titre 2": "Dossier de cadrage",
            "Texte 2": "Zoom sur la formalisation du besoin et du parcours utilisateur.",
            "Titre 3": "Règles contextuelles",
            "Texte 3": "Découvrons comment paramétrer les consignes de l'agent dans AGENTS.md."
          }
        },
        {
          "template": "VIBECODING - 4 BLOCS",
          "content": {
            "Titre": "Les objectifs du chapitre",
            "Intro": "Quatre étapes clés pour démarrer son projet sur des bases solides.",
            "Titre 1": "Comprendre la certification",
            "Texte 1": "Analyser la grille d'évaluation et les deux épreuves du diplôme.",
            "Picto 1": "mdi:clipboard-check-outline",
            "Titre 2": "Choisir l'application",
            "Texte 2": "Sélectionner un projet métier pertinent et adapté au Vibe Coding.",
            "Picto 2": "mdi:lightbulb-on-outline",
            "Titre 3": "Rédiger le cadrage",
            "Texte 3": "Compléter le dossier de cadrage avec objectifs et périmètre.",
            "Picto 3": "mdi:file-document-edit-outline",
            "Titre 4": "Définir AGENTS.md",
            "Texte 4": "Fixer les règles contextuelles et techniques pour l'agent IA.",
            "Picto 4": "mdi:cog-box"
          }
        },
        {
          "template": "VIBECODING - FIN",
          "content": {
            "Titre": "En résumé",
            "Intro": "Un cadrage clair et un fichier AGENTS.md bien structuré évitent les dérives lors du développement. En définissant le besoin et les règles dès le départ, on s'assure d'une collaboration efficace avec l'agent IA tout au long du projet fil rouge.",
            "Titre Bulle": "EN BREF",
            "Texte Bulle": "Une fois le cadrage posé, on passe directement à la création de l'interface utilisateur dans le Chapitre 2 !"
          }
        }
      ]
    },
    {
      "lessonSlug": "m5c1l2",
      "lessonTitle": "M5C1L2 — Découvrir le projet fil rouge & les exigences de la certification",
      "lessonType": "theorique",
      "slides": [
        {
          "template": "VIBECODING - COVER",
          "content": {
            "Titre": "Découvrir le projet fil rouge & les exigences de la certification"
          }
        }
      ]
    },
    {
      "lessonSlug": "m5c1l3",
      "lessonTitle": "M5C1L3 — Choisir et cadrer son application métier (Dossier de cadrage)",
      "lessonType": "theorique",
      "slides": [
        {
          "template": "VIBECODING - COVER",
          "content": {
            "Titre": "Choisir et cadrer son application métier (Dossier de cadrage)"
          }
        }
      ]
    },
    {
      "lessonSlug": "m5c1l4",
      "lessonTitle": "M5C1L4 — Structurer les règles contextuelles de son projet (AGENTS.md)",
      "lessonType": "theorique",
      "slides": [
        {
          "template": "VIBECODING - COVER",
          "content": {
            "Titre": "Structurer les règles contextuelles de son projet (AGENTS.md)"
          }
        }
      ]
    },

    # ----------------------------------------------------
    # CHAPITRE 2
    # ----------------------------------------------------
    {
      "lessonSlug": "m5c2l1",
      "lessonTitle": "M5C2L1 — Les objectifs du chapitre : Générer l'Interface Utilisateur (Front-end & UX)",
      "lessonType": "theorique",
      "slides": [
        {
          "template": "VIBECODING - COVER",
          "content": {
            "Titre": "Les objectifs du chapitre : Générer l'Interface Utilisateur (Front-end & UX)"
          }
        },
        {
          "template": "VIBECODING - INTRO",
          "content": {
            "Titre": "De quoi parlons-nous ?",
            "Intro": "Ce chapitre transforme le cadrage en une interface utilisateur moderne et réactive. Voyons les 3 étapes pour concevoir le Front-end sans coder à la main.",
            "Titre 1": "Design system",
            "Texte 1": "Voyons comment prompter la structure visuelle et la charte graphique.",
            "Titre 2": "Composants métier",
            "Texte 2": "Zoom sur la création des formulaires, cartes et tableaux de données.",
            "Titre 3": "Dynamisme Front-end",
            "Texte 3": "Découvrons comment rendre l'interface interactive avant le branchement backend."
          }
        },
        {
          "template": "VIBECODING - 4 BLOCS",
          "content": {
            "Titre": "Les objectifs du chapitre",
            "Intro": "Quatre priorités pour réussir l'expérience utilisateur de son projet fil rouge.",
            "Titre 1": "Définir la charte",
            "Texte 1": "Établir les couleurs, la typographie et les composants de base.",
            "Picto 1": "mdi:palette-swatch-outline",
            "Titre 2": "Construire les écrans",
            "Texte 2": "Générer les vues métier principales du parcours utilisateur.",
            "Picto 2": "mdi:view-dashboard-variant-outline",
            "Titre 3": "Corriger le style",
            "Texte 3": "Ajuster l'ergonomie visuelle et affiner les détails UI avec l'agent.",
            "Picto 3": "mdi:auto-fix",
            "Titre 4": "Simuler les états",
            "Texte 4": "Gérer les modales, le chargement et la réactivité de l'écran.",
            "Picto 4": "mdi:lightning-bolt-outline"
          }
        },
        {
          "template": "VIBECODING - FIN",
          "content": {
            "Titre": "En résumé",
            "Intro": "L'interface Front-end donne vie au produit et matérialise le parcours utilisateur. Grâce au Vibe Coding, on obtient une application visuellement terminée et fluide, prête à recevoir sa base de données serveur.",
            "Titre Bulle": "EN BREF",
            "Texte Bulle": "L'interface est prête : dans le Chapitre 3, on la connecte à la base de données cloud Supabase !"
          }
        }
      ]
    },
    {
      "lessonSlug": "m5c2l2",
      "lessonTitle": "M5C2L2 — Générer la structure et le design system de l'application",
      "lessonType": "logiciel",
      "slides": [
        {"template": "VIBECODING - COVER", "content": {"Titre": "Générer la structure et le design system de l'application"}},
        {"template": "VIBECODING - DEMO", "content": {}}
      ]
    },
    {
      "lessonSlug": "m5c2l3",
      "lessonTitle": "M5C2L3 — Créer les composants UI métier (Tableaux, Formulaires, Cartes)",
      "lessonType": "logiciel",
      "slides": [
        {"template": "VIBECODING - COVER", "content": {"Titre": "Créer les composants UI métier (Tableaux, Formulaires, Cartes)"}},
        {"template": "VIBECODING - DEMO", "content": {}}
      ]
    },
    {
      "lessonSlug": "m5c2l4",
      "lessonTitle": "M5C2L4 — Itérer sur l'ergonomie visuelle et corriger les bugs de style",
      "lessonType": "logiciel",
      "slides": [
        {"template": "VIBECODING - COVER", "content": {"Titre": "Itérer sur l'ergonomie visuelle et corriger les bugs de style"}},
        {"template": "VIBECODING - DEMO", "content": {}}
      ]
    },
    {
      "lessonSlug": "m5c2l5",
      "lessonTitle": "M5C2L5 — Rendre l'interface dynamique et réactive en Front-end",
      "lessonType": "logiciel",
      "slides": [
        {"template": "VIBECODING - COVER", "content": {"Titre": "Rendre l'interface dynamique et réactive en Front-end"}},
        {"template": "VIBECODING - DEMO", "content": {}}
      ]
    },

    # ----------------------------------------------------
    # CHAPITRE 3
    # ----------------------------------------------------
    {
      "lessonSlug": "m5c3l1",
      "lessonTitle": "M5C3L1 — Les objectifs du chapitre : Connecter la base de données Cloud (Supabase BaaS)",
      "lessonType": "theorique",
      "slides": [
        {
          "template": "VIBECODING - COVER",
          "content": {
            "Titre": "Les objectifs du chapitre : Connecter la base de données Cloud (Supabase BaaS)"
          }
        },
        {
          "template": "VIBECODING - INTRO",
          "content": {
            "Titre": "De quoi parlons-nous ?",
            "Intro": "Ce chapitre introduit la persistance des données serveur. Voyons les 3 étapes pour interconnecter l'interface Front-end avec Supabase.",
            "Titre 1": "Rôle du Back-end",
            "Texte 1": "Voyons pourquoi le navigateur seul ne permet pas de conserver les données.",
            "Titre 2": "Projet Supabase",
            "Texte 2": "Zoom sur la création de la base cloud et la configuration des clés.",
            "Titre 3": "Modélisation SQL",
            "Texte 3": "Découvrons comment générer la structure des tables avec l'agent IA."
          }
        },
        {
          "template": "VIBECODING - 4 BLOCS",
          "content": {
            "Titre": "Les objectifs du chapitre",
            "Intro": "Quatre piliers pour rendre son application capable de stocker ses informations.",
            "Titre 1": "Comprendre le BaaS",
            "Texte 1": "Saisir les avantages d'un Backend-as-a-Service pour aller vite.",
            "Picto 1": "mdi:cloud-outline",
            "Titre 2": "Configurer Supabase",
            "Texte 2": "Créer l'instance cloud et récupérer l'URL ainsi que la clé anon.",
            "Picto 2": "mdi:database-cog-outline",
            "Titre 3": "Créer les tables SQL",
            "Texte 3": "Générer et exécuter le schéma SQL du projet fil rouge.",
            "Picto 3": "mdi:table-furniture",
            "Titre 4": "Lier les formulaires",
            "Texte 4": "Connecter les actions de l'écran à la base de données.",
            "Picto 4": "mdi:swap-horizontal"
          }
        },
        {
          "template": "VIBECODING - FIN",
          "content": {
            "Titre": "En résumé",
            "Intro": "Supabase permet d'adosser une base de données relationnelle robuste à son application Front-end sans gérer de serveurs complexes. Les données saisies dans l'interface sont désormais conservées durablement.",
            "Titre Bulle": "EN BREF",
            "Texte Bulle": "La base de données enregistre nos données : dans le Chapitre 4, on sécurise l'accès avec l'espace membre et l'authentification !"
          }
        }
      ]
    },
    {
      "lessonSlug": "m5c3l2",
      "lessonTitle": "M5C3L2 — Front-end vs Back-end : pourquoi le navigateur ne suffit plus ?",
      "lessonType": "theorique",
      "slides": [
        {"template": "VIBECODING - COVER", "content": {"Titre": "Front-end vs Back-end : pourquoi le navigateur ne suffit plus ?"}}
      ]
    },
    {
      "lessonSlug": "m5c3l3",
      "lessonTitle": "M5C3L3 — Créer et configurer son projet Supabase",
      "lessonType": "logiciel",
      "slides": [
        {"template": "VIBECODING - COVER", "content": {"Titre": "Créer et configurer son projet Supabase"}},
        {"template": "VIBECODING - DEMO", "content": {}}
      ]
    },
    {
      "lessonSlug": "m5c3l4",
      "lessonTitle": "M5C3L4 — Structurer les tables SQL du projet fil rouge avec l'agent IA",
      "lessonType": "logiciel",
      "slides": [
        {"template": "VIBECODING - COVER", "content": {"Titre": "Structurer les tables SQL du projet fil rouge avec l'agent IA"}},
        {"template": "VIBECODING - DEMO", "content": {}}
      ]
    },
    {
      "lessonSlug": "m5c3l5",
      "lessonTitle": "M5C3L5 — Connecter les formulaires Front-end à la base de données",
      "lessonType": "logiciel",
      "slides": [
        {"template": "VIBECODING - COVER", "content": {"Titre": "Connecter les formulaires Front-end à la base de données"}},
        {"template": "VIBECODING - DEMO", "content": {}}
      ]
    },

    # ----------------------------------------------------
    # CHAPITRE 4
    # ----------------------------------------------------
    {
      "lessonSlug": "m5c4l1",
      "lessonTitle": "M5C4L1 — Les objectifs du chapitre : Authentification & Espace Membre Privé",
      "lessonType": "theorique",
      "slides": [
        {
          "template": "VIBECODING - COVER",
          "content": {
            "Titre": "Les objectifs du chapitre : Authentification & Espace Membre Privé"
          }
        },
        {
          "template": "VIBECODING - INTRO",
          "content": {
            "Titre": "De quoi parlons-nous ?",
            "Intro": "Ce chapitre sécurise l'accès à l'application. Voyons les 3 étapes pour identifier chaque utilisateur et privatiser le dashboard.",
            "Titre 1": "Identité & Session",
            "Texte 1": "Voyons comment les jetons de connexion protègent l'accès aux données.",
            "Titre 2": "Pages de connexion",
            "Texte 2": "Zoom sur l'intégration du formulaire d'inscription et d'authentification.",
            "Titre 3": "Routes privées",
            "Texte 3": "Découvrons comment restreindre les vues réservées aux membres connectés."
          }
        },
        {
          "template": "VIBECODING - 4 BLOCS",
          "content": {
            "Titre": "Les objectifs du chapitre",
            "Intro": "Quatre exigences pour gérer l'accès et la confidentialité des utilisateurs.",
            "Titre 1": "Gérer les sessions",
            "Texte 1": "Comprendre le mécanisme de jetons JWT et la persistance de connexion.",
            "Picto 1": "mdi:key-wireless",
            "Titre 2": "Intégrer Auth",
            "Texte 2": "Connecter Supabase Auth à la page de connexion de l'application.",
            "Picto 2": "mdi:account-lock-outline",
            "Titre 3": "Protéger le Dashboard",
            "Texte 3": "Bloquer l'accès aux pages sensibles pour les visiteurs anonymes.",
            "Picto 3": "mdi:shield-lock-outline",
            "Titre 4": "Associer auth.uid()",
            "Texte 4": "Rattacher chaque donnée créée à l'identifiant de son propriétaire.",
            "Picto 4": "mdi:account-arrow-right-outline"
          }
        },
        {
          "template": "VIBECODING - FIN",
          "content": {
            "Titre": "En résumé",
            "Intro": "L'authentification transforme une interface ouverte en un produit SaaS ou une application métier sécurisée. Seuls les comptes enregistrés peuvent accéder aux fonctionnalités réservées.",
            "Titre Bulle": "EN BREF",
            "Texte Bulle": "L'authentification bloque les écrans, mais les données sont-elles vraiment étanches ? Découvrons la faille RLS dans le Chapitre 5 !"
          }
        }
      ]
    },
    {
      "lessonSlug": "m5c4l2",
      "lessonTitle": "M5C4L2 — Comprendre la gestion de session et l'identité utilisateur",
      "lessonType": "theorique",
      "slides": [
        {"template": "VIBECODING - COVER", "content": {"Titre": "Comprendre la gestion de session et l'identité utilisateur"}}
      ]
    },
    {
      "lessonSlug": "m5c4l3",
      "lessonTitle": "M5C4L3 — Connecter la page de connexion & inscription avec l'agent IA",
      "lessonType": "logiciel",
      "slides": [
        {"template": "VIBECODING - COVER", "content": {"Titre": "Connecter la page de connexion & inscription avec l'agent IA"}},
        {"template": "VIBECODING - DEMO", "content": {}}
      ]
    },
    {
      "lessonSlug": "m5c4l4",
      "lessonTitle": "M5C4L4 — Protéger les routes privées et le dashboard de l'application",
      "lessonType": "logiciel",
      "slides": [
        {"template": "VIBECODING - COVER", "content": {"Titre": "Protéger les routes privées et le dashboard de l'application"}},
        {"template": "VIBECODING - DEMO", "content": {}}
      ]
    },
    {
      "lessonSlug": "m5c4l5",
      "lessonTitle": "M5C4L5 — Lier les données créées dans le Front-end à l'ID utilisateur",
      "lessonType": "logiciel",
      "slides": [
        {"template": "VIBECODING - COVER", "content": {"Titre": "Lier les données créées dans le Front-end à l'ID utilisateur"}},
        {"template": "VIBECODING - DEMO", "content": {}}
      ]
    },

    # ----------------------------------------------------
    # CHAPITRE 5
    # ----------------------------------------------------
    {
      "lessonSlug": "m5c5l1",
      "lessonTitle": "M5C5L1 — Les objectifs du chapitre : Sécuriser les données par la faille (RLS)",
      "lessonType": "theorique",
      "slides": [
        {
          "template": "VIBECODING - COVER",
          "content": {
            "Titre": "Les objectifs du chapitre : Sécuriser les données par la faille (RLS)"
          }
        },
        {
          "template": "VIBECODING - INTRO",
          "content": {
            "Titre": "De quoi parlons-nous ?",
            "Intro": "Ce chapitre aborde le critère éliminatoire de la certification. Voyons les 3 étapes pour tester la faille de sécurité et verrouiller l'accès aux données avec le RLS.",
            "Titre 1": "Démontrer la faille",
            "Texte 1": "Voyons la vulnérabilité majeure qui permet d'usurper les données d'autrui.",
            "Titre 2": "Règles SQL RLS",
            "Texte 2": "Zoom sur la création des politiques de sécurité Row Level Security.",
            "Titre 3": "Audit & Validation",
            "Texte 3": "Découvrons comment vérifier l'étanchéité absolue de l'application."
          }
        },
        {
          "template": "VIBECODING - 4 BLOCS",
          "content": {
            "Titre": "Les objectifs du chapitre",
            "Intro": "Quatre étapes indispensables pour valider le critère éliminatoire CE5.3.5.",
            "Titre 1": "Repérer la vulnérabilité",
            "Texte 1": "Constater qu'un utilisateur peut lire les données d'un autre sans RLS.",
            "Picto 1": "mdi:bug-outline",
            "Titre 2": "Activer le RLS",
            "Texte 2": "Activer Row Level Security sur l'ensemble des tables de la base.",
            "Picto 2": "mdi:shield-bug-outline",
            "Titre 3": "Rédiger les politiques",
            "Texte 3": "Générer les règles SQL limitant l'accès aux seules lignes de auth.uid().",
            "Picto 3": "mdi:code-json",
            "Titre 4": "Auditer l'étanchéité",
            "Texte 4": "Tester dans le navigateur que chaque compte est totalement isolé.",
            "Picto 4": "mdi:check-decagram-outline"
          }
        },
        {
          "template": "VIBECODING - FIN",
          "content": {
            "Titre": "En résumé",
            "Intro": "Le Row Level Security (RLS) est le véritable bouclier de votre base de données. Même si l'interface est piratée, le moteur PostgreSQL refuse de servir les données appartenant à un autre compte.",
            "Titre Bulle": "EN BREF",
            "Texte Bulle": "La base de données est maintenant 100% hermétique ! Dans le Chapitre 6, on connecte le monde extérieur avec les API externes et secrets."
          }
        }
      ]
    },
    {
      "lessonSlug": "m5c5l2",
      "lessonTitle": "M5C5L2 — Démontrer la faille : accéder aux données d'un autre utilisateur",
      "lessonType": "logiciel",
      "slides": [
        {"template": "VIBECODING - COVER", "content": {"Titre": "Démontrer la faille : accéder aux données d'un autre utilisateur"}},
        {"template": "VIBECODING - DEMO", "content": {}}
      ]
    },
    {
      "lessonSlug": "m5c5l3",
      "lessonTitle": "M5C5L3 — Générer et appliquer les règles RLS SQL avec l'agent IA",
      "lessonType": "logiciel",
      "slides": [
        {"template": "VIBECODING - COVER", "content": {"Titre": "Générer et appliquer les règles RLS SQL avec l'agent IA"}},
        {"template": "VIBECODING - DEMO", "content": {}}
      ]
    },
    {
      "lessonSlug": "m5c5l4",
      "lessonTitle": "M5C5L4 — Auditer et valider l'étanchéité totale de l'application dans l'UI",
      "lessonType": "hybride",
      "slides": [
        {"template": "VIBECODING - COVER", "content": {"Titre": "Auditer et valider l'étanchéité totale de l'application dans l'UI"}},
        {"template": "VIBECODING - DEMO", "content": {}}
      ]
    },

    # ----------------------------------------------------
    # CHAPITRE 6
    # ----------------------------------------------------
    {
      "lessonSlug": "m5c6l1",
      "lessonTitle": "M5C6L1 — Les objectifs du chapitre : Connecter le monde extérieur (API & Secrets)",
      "lessonType": "theorique",
      "slides": [
        {
          "template": "VIBECODING - COVER",
          "content": {
            "Titre": "Les objectifs du chapitre : Connecter le monde extérieur (API & Secrets)"
          }
        },
        {
          "template": "VIBECODING - INTRO",
          "content": {
            "Titre": "De quoi parlons-nous ?",
            "Intro": "Ce chapitre ouvre l'application sur des services tiers. Voyons les 3 étapes pour intégrer une API externe tout en protégeant les clés confidentielles.",
            "Titre 1": "Concepts d'API REST",
            "Texte 1": "Voyons comment fonctionnent les requêtes HTTP et les échanges de données JSON.",
            "Titre 2": "Fichier .env.local",
            "Texte 2": "Zoom sur l'isolation des clés API et le masquage des secrets.",
            "Titre 3": "Branchement externe",
            "Texte 3": "Découvrons comment connecter un service tiers (Stripe, Resend, API métier)."
          }
        },
        {
          "template": "VIBECODING - 4 BLOCS",
          "content": {
            "Titre": "Les objectifs du chapitre",
            "Intro": "Quatre compétences pour enrichir son produit fil rouge avec des services externes.",
            "Titre 1": "Comprendre les API",
            "Texte 1": "Saisir le rôle des endpoints HTTP pour communiquer avec l'extérieur.",
            "Picto 1": "mdi:api",
            "Titre 2": "Masquer les secrets",
            "Texte 2": "Isoler les clés d'accès dans le fichier d'environnement local.",
            "Picto 2": "mdi:incognito",
            "Titre 3": "Interroger l'API",
            "Texte 3": "Rédiger les requêtes de données via l'agent IA de manière sécurisée.",
            "Picto 3": "mdi:arrow-decision-auto-outline",
            "Titre 4": "Valider les flux",
            "Texte 4": "Vérifier que les données transmises restent étanches et sans fuite.",
            "Picto 4": "mdi:swap-horizontal-bold"
          }
        },
        {
          "template": "VIBECODING - FIN",
          "content": {
            "Titre": "En résumé",
            "Intro": "Interfacer une API externe démultiplie la valeur métier de son application sans alourdir le code. En isolant les clés dans .env.local, on garantit la sécurité des identifiants.",
            "Titre Bulle": "EN BREF",
            "Texte Bulle": "L'application est complète et enrichie ! Dans le Chapitre 7, on déploie le projet en production et on prépare les livrables certifiants."
          }
        }
      ]
    },
    {
      "lessonSlug": "m5c6l2",
      "lessonTitle": "M5C6L2 — Qu'est-ce qu'une API REST et comment l'interroger avec l'IA ?",
      "lessonType": "theorique",
      "slides": [
        {"template": "VIBECODING - COVER", "content": {"Titre": "Qu'est-ce qu'une API REST et comment l'interroger avec l'IA ?"}}
      ]
    },
    {
      "lessonSlug": "m5c6l3",
      "lessonTitle": "M5C6L3 — Sécuriser ses clés API & secrets dans le fichier .env.local",
      "lessonType": "logiciel",
      "slides": [
        {"template": "VIBECODING - COVER", "content": {"Titre": "Sécuriser ses clés API & secrets dans le fichier .env.local"}},
        {"template": "VIBECODING - DEMO", "content": {}}
      ]
    },
    {
      "lessonSlug": "m5c6l4",
      "lessonTitle": "M5C6L4 — Brancher un service tiers au projet fil rouge (Stripe, Resend, API métier)",
      "lessonType": "logiciel",
      "slides": [
        {"template": "VIBECODING - COVER", "content": {"Titre": "Brancher un service tiers au projet fil rouge (Stripe, Resend, API métier)"}},
        {"template": "VIBECODING - DEMO", "content": {}}
      ]
    },

    # ----------------------------------------------------
    # CHAPITRE 7
    # ----------------------------------------------------
    {
      "lessonSlug": "m5c7l1",
      "lessonTitle": "M5C7L1 — Les objectifs du chapitre : Déploiement en production & Réussir son projet certifiant",
      "lessonType": "theorique",
      "slides": [
        {
          "template": "VIBECODING - COVER",
          "content": {
            "Titre": "Les objectifs du chapitre : Déploiement en production & Réussir son projet certifiant"
          }
        },
        {
          "template": "VIBECODING - INTRO",
          "content": {
            "Titre": "De quoi parlons-nous ?",
            "Intro": "Ce dernier chapitre concrétise la mise en ligne et la livraison du diplôme. Voyons les 3 étapes pour déployer sur Vercel, publier le dépôt GitHub et valider la certification.",
            "Titre 1": "Production Vercel",
            "Texte 1": "Voyons comment mettre l'application en ligne sur une URL HTTPS publique.",
            "Titre 2": "Documentation GitHub",
            "Texte 2": "Zoom sur la publication d'un dépôt propre et la rédaction d'un README complet.",
            "Titre 3": "Dossier & Épreuves",
            "Texte 3": "Découvrons comment enregistrer la démonstration vidéo et préparer le QCM."
          }
        },
        {
          "template": "VIBECODING - 4 BLOCS",
          "content": {
            "Titre": "Les objectifs du chapitre",
            "Intro": "Quatre étapes finales pour soumettre son dossier et décrocher la certification.",
            "Titre 1": "Déployer sur Vercel",
            "Texte 1": "Mettre en ligne le projet avec variables d'environnement de production.",
            "Picto 1": "mdi:rocket-launch-outline",
            "Titre 2": "Publier sur GitHub",
            "Texte 2": "Versionner le code et rédiger la documentation technique dans le README.",
            "Picto 2": "mdi:github",
            "Titre 3": "Tourner la vidéo",
            "Texte 3": "Enregistrer la démonstration produit expliquant le fonctionnement réel.",
            "Picto 3": "mdi:video-wireless-outline",
            "Titre 4": "Préparer le QCM",
            "Texte 4": "Réviser les notions théoriques pour valider la seconde épreuve du diplôme.",
            "Picto 4": "mdi:school-outline"
          }
        },
        {
          "template": "VIBECODING - FIN",
          "content": {
            "Titre": "En résumé",
            "Intro": "Déployer une application complète, sécurisée par RLS et documentée sur GitHub constitue l'accomplissement ultime du Vibe Coder. En suivant ces étapes, le projet est prêt pour la soumission finale.",
            "Titre Bulle": "EN BREF",
            "Texte Bulle": "Félicitations pour ce parcours ! Vous disposez de toutes les clés et livrables pour réussir haut la main votre certification Vibe Coding."
          }
        }
      ]
    },
    {
      "lessonSlug": "m5c7l2",
      "lessonTitle": "M5C7L2 — Déployer en production sur Vercel avec HTTPS",
      "lessonType": "logiciel",
      "slides": [
        {"template": "VIBECODING - COVER", "content": {"Titre": "Déployer en production sur Vercel avec HTTPS"}},
        {"template": "VIBECODING - DEMO", "content": {}}
      ]
    },
    {
      "lessonSlug": "m5c7l3",
      "lessonTitle": "M5C7L3 — Publier le dépôt GitHub propre avec un README détaillé",
      "lessonType": "theorique",
      "slides": [
        {"template": "VIBECODING - COVER", "content": {"Titre": "Publier le dépôt GitHub propre avec un README détaillé"}}
      ]
    },
    {
      "lessonSlug": "m5c7l4",
      "lessonTitle": "M5C7L4 — Enregistrer la vidéo de démonstration du projet fil rouge",
      "lessonType": "hybride",
      "slides": [
        {"template": "VIBECODING - COVER", "content": {"Titre": "Enregistrer la vidéo de démonstration du projet fil rouge"}},
        {"template": "VIBECODING - DEMO", "content": {}}
      ]
    },
    {
      "lessonSlug": "m5c7l5",
      "lessonTitle": "M5C7L5 — Auto-évaluation sur la grille certifiante & Préparation au QCM",
      "lessonType": "theorique",
      "slides": [
        {"template": "VIBECODING - COVER", "content": {"Titre": "Auto-évaluation sur la grille certifiante & Préparation au QCM"}}
      ]
    }
  ]
}

target_path = "/Users/maximeelhaik/Documents/VIBE CODING GENERATION/FINAL_MODULE5.json"
with open(target_path, "w", encoding="utf-8") as f:
    json.dump(m5_json_data, f, indent=2, ensure_ascii=False)

print(f"✅ FINAL_MODULE5.json généré avec succès ({len(m5_json_data['lessons'])} leçons).")
