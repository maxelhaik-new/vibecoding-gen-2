import json

# Correct color mapping with valid HEX codes for Figma
COLOR_MAP = {
    "theorique": {"colorName": "Gris clair", "hex": "#E2E4E9"},
    "logiciel": {"colorName": "Violet", "hex": "#C4B5FD"},
    "hybride": {"colorName": "Rose", "hex": "#FFB5E8"},
    "cas_pratique": {"colorName": "Bleu clair", "hex": "#A0D2FF"}
}

chapters = [
    {
        "chapterNumber": 1,
        "chapterTitle": "Chapitre 1 : Cadrer son projet certifiant & Définir le produit",
        "lessons": [
            {
                "slug": "m5c1l1",
                "title": "M5C1L1 — Les objectifs du chapitre : Cadrer son projet certifiant & Définir le produit",
                "type": "theorique",
                "slides": [
                    {
                        "template": "VIBECODING - COVER CHAP",
                        "content": {
                            "Titre": "Chapitre 1 : Cadrer son projet certifiant & Définir le produit"
                        }
                    },
                    {
                        "template": "VIBECODING - OBJECTIF CHAP",
                        "content": {
                            "Titre": "Les objectifs du chapitre",
                            "Intro": "Comprendre les exigences de la certification, formaliser son dossier de cadrage et configurer les règles contextuelles de l'agent IA.",
                            "Titre 1": "Découvrir le projet fil rouge & les exigences de la certification",
                            "Titre 2": "Choisir et cadrer son application métier (Dossier de cadrage)",
                            "Titre 3": "Structurer les règles contextuelles de son projet (AGENTS.md)"
                        }
                    }
                ]
            },
            {
                "slug": "m5c1l2",
                "title": "M5C1L2 — Découvrir le projet fil rouge & les exigences de la certification",
                "type": "theorique",
                "slides": [{"template": "VIBECODING - COVER", "content": {"Titre": "Découvrir le projet fil rouge & les exigences de la certification"}}]
            },
            {
                "slug": "m5c1l3",
                "title": "M5C1L3 — Choisir et cadrer son application métier (Dossier de cadrage)",
                "type": "theorique",
                "slides": [{"template": "VIBECODING - COVER", "content": {"Titre": "Choisir et cadrer son application métier (Dossier de cadrage)"}}]
            },
            {
                "slug": "m5c1l4",
                "title": "M5C1L4 — Structurer les règles contextuelles de son projet (AGENTS.md)",
                "type": "theorique",
                "slides": [{"template": "VIBECODING - COVER", "content": {"Titre": "Structurer les règles contextuelles de son projet (AGENTS.md)"}}]
            }
        ]
    },
    {
        "chapterNumber": 2,
        "chapterTitle": "Chapitre 2 : Générer l'Interface Utilisateur (Front-end & UX) avec l'IA",
        "lessons": [
            {
                "slug": "m5c2l1",
                "title": "M5C2L1 — Les objectifs du chapitre : Générer l'Interface Utilisateur (Front-end & UX)",
                "type": "theorique",
                "slides": [
                    {
                        "template": "VIBECODING - COVER CHAP",
                        "content": {
                            "Titre": "Chapitre 2 : Générer l'Interface Utilisateur (Front-end & UX)"
                        }
                    },
                    {
                        "template": "VIBECODING - OBJECTIF CHAP",
                        "content": {
                            "Titre": "Les objectifs du chapitre",
                            "Intro": "Concevoir le design system, construire les composants UI métier et rendre l'interface dynamique avant la connexion au backend.",
                            "Titre 1": "Générer la structure et le design system de l'application",
                            "Titre 2": "Créer les composants UI métier (Tableaux, Formulaires, Cartes)",
                            "Titre 3": "Itérer sur l'ergonomie visuelle et corriger les bugs de style",
                            "Titre 4": "Rendre l'interface dynamique et réactive en Front-end"
                        }
                    }
                ]
            },
            {
                "slug": "m5c2l2",
                "title": "M5C2L2 — Générer la structure et le design system de l'application",
                "type": "logiciel",
                "slides": [{"template": "VIBECODING - COVER", "content": {"Titre": "Générer la structure et le design system de l'application"}}, {"template": "VIBECODING - DEMO", "content": {}}]
            },
            {
                "slug": "m5c2l3",
                "title": "M5C2L3 — Créer les composants UI métier (Tableaux, Formulaires, Cartes)",
                "type": "logiciel",
                "slides": [{"template": "VIBECODING - COVER", "content": {"Titre": "Créer les composants UI métier (Tableaux, Formulaires, Cartes)"}}, {"template": "VIBECODING - DEMO", "content": {}}]
            },
            {
                "slug": "m5c2l4",
                "title": "M5C2L4 — Itérer sur l'ergonomie visuelle et corriger les bugs de style",
                "type": "logiciel",
                "slides": [{"template": "VIBECODING - COVER", "content": {"Titre": "Itérer sur l'ergonomie visuelle et corriger les bugs de style"}}, {"template": "VIBECODING - DEMO", "content": {}}]
            },
            {
                "slug": "m5c2l5",
                "title": "M5C2L5 — Rendre l'interface dynamique et réactive en Front-end",
                "type": "logiciel",
                "slides": [{"template": "VIBECODING - COVER", "content": {"Titre": "Rendre l'interface dynamique et réactive en Front-end"}}, {"template": "VIBECODING - DEMO", "content": {}}]
            }
        ]
    },
    {
        "chapterNumber": 3,
        "chapterTitle": "Chapitre 3 : Connecter la base de données Cloud (Supabase BaaS)",
        "lessons": [
            {
                "slug": "m5c3l1",
                "title": "M5C3L1 — Les objectifs du chapitre : Connecter la base de données Cloud (Supabase BaaS)",
                "type": "theorique",
                "slides": [
                    {
                        "template": "VIBECODING - COVER CHAP",
                        "content": {
                            "Titre": "Chapitre 3 : Connecter la base de données Cloud (Supabase BaaS)"
                        }
                    },
                    {
                        "template": "VIBECODING - OBJECTIF CHAP",
                        "content": {
                            "Titre": "Les objectifs du chapitre",
                            "Intro": "Comprendre les rôles du backend et persister les données de l'application en interconnectant Supabase avec l'interface.",
                            "Titre 1": "Front-end vs Back-end : pourquoi le navigateur ne suffit plus ?",
                            "Titre 2": "Créer et configurer son projet Supabase",
                            "Titre 3": "Structurer les tables SQL du projet fil rouge avec l'agent IA",
                            "Titre 4": "Connecter les formulaires Front-end à la base de données"
                        }
                    }
                ]
            },
            {
                "slug": "m5c3l2",
                "title": "M5C3L2 — Front-end vs Back-end : pourquoi le navigateur ne suffit plus ?",
                "type": "theorique",
                "slides": [{"template": "VIBECODING - COVER", "content": {"Titre": "Front-end vs Back-end : pourquoi le navigateur ne suffit plus ?"}}]
            },
            {
                "slug": "m5c3l3",
                "title": "M5C3L3 — Créer et configurer son projet Supabase",
                "type": "logiciel",
                "slides": [{"template": "VIBECODING - COVER", "content": {"Titre": "Créer et configurer son projet Supabase"}}, {"template": "VIBECODING - DEMO", "content": {}}]
            },
            {
                "slug": "m5c3l4",
                "title": "M5C3L4 — Structurer les tables SQL du projet fil rouge avec l'agent IA",
                "type": "logiciel",
                "slides": [{"template": "VIBECODING - COVER", "content": {"Titre": "Structurer les tables SQL du projet fil rouge avec l'agent IA"}}, {"template": "VIBECODING - DEMO", "content": {}}]
            },
            {
                "slug": "m5c3l5",
                "title": "M5C3L5 — Connecter les formulaires Front-end à la base de données",
                "type": "logiciel",
                "slides": [{"template": "VIBECODING - COVER", "content": {"Titre": "Connecter les formulaires Front-end à la base de données"}}, {"template": "VIBECODING - DEMO", "content": {}}]
            }
        ]
    },
    {
        "chapterNumber": 4,
        "chapterTitle": "Chapitre 4 : Authentification & Espace Membre Privé",
        "lessons": [
            {
                "slug": "m5c4l1",
                "title": "M5C4L1 — Les objectifs du chapitre : Authentification & Espace Membre Privé",
                "type": "theorique",
                "slides": [
                    {
                        "template": "VIBECODING - COVER CHAP",
                        "content": {
                            "Titre": "Chapitre 4 : Authentification & Espace Membre Privé"
                        }
                    },
                    {
                        "template": "VIBECODING - OBJECTIF CHAP",
                        "content": {
                            "Titre": "Les objectifs du chapitre",
                            "Intro": "Mettre en place la connexion des utilisateurs, privatiser les routes du dashboard et lier chaque enregistrement à son auteur.",
                            "Titre 1": "Comprendre la gestion de session et l'identité utilisateur",
                            "Titre 2": "Connecter la page de connexion & inscription avec l'agent IA",
                            "Titre 3": "Protéger les routes privées et le dashboard de l'application",
                            "Titre 4": "Lier les données créées dans le Front-end à l'ID utilisateur"
                        }
                    }
                ]
            },
            {
                "slug": "m5c4l2",
                "title": "M5C4L2 — Comprendre la gestion de session et l'identité utilisateur",
                "type": "theorique",
                "slides": [{"template": "VIBECODING - COVER", "content": {"Titre": "Comprendre la gestion de session et l'identité utilisateur"}}]
            },
            {
                "slug": "m5c4l3",
                "title": "M5C4L3 — Connecter la page de connexion & inscription avec l'agent IA",
                "type": "logiciel",
                "slides": [{"template": "VIBECODING - COVER", "content": {"Titre": "Connecter la page de connexion & inscription avec l'agent IA"}}, {"template": "VIBECODING - DEMO", "content": {}}]
            },
            {
                "slug": "m5c4l4",
                "title": "M5C4L4 — Protéger les routes privées et le dashboard de l'application",
                "type": "logiciel",
                "slides": [{"template": "VIBECODING - COVER", "content": {"Titre": "Protéger les routes privées et le dashboard de l'application"}}, {"template": "VIBECODING - DEMO", "content": {}}]
            },
            {
                "slug": "m5c4l5",
                "title": "M5C4L5 — Lier les données créées dans le Front-end à l'ID utilisateur",
                "type": "logiciel",
                "slides": [{"template": "VIBECODING - COVER", "content": {"Titre": "Lier les données créées dans le Front-end à l'ID utilisateur"}}, {"template": "VIBECODING - DEMO", "content": {}}]
            }
        ]
    },
    {
        "chapterNumber": 5,
        "chapterTitle": "Chapitre 5 : Sécuriser les données par la faille (Row Level Security - RLS)",
        "lessons": [
            {
                "slug": "m5c5l1",
                "title": "M5C5L1 — Les objectifs du chapitre : Sécuriser les données par la faille (RLS)",
                "type": "theorique",
                "slides": [
                    {
                        "template": "VIBECODING - COVER CHAP",
                        "content": {
                            "Titre": "Chapitre 5 : Sécuriser les données par la faille (Row Level Security - RLS)"
                        }
                    },
                    {
                        "template": "VIBECODING - OBJECTIF CHAP",
                        "content": {
                            "Titre": "Les objectifs du chapitre",
                            "Intro": "Démontrer la vulnérabilité d'accès aux données, rédiger les règles RLS SQL et valider l'étanchéité absolue (critère éliminatoire).",
                            "Titre 1": "Démontrer la faille : accéder aux données d'un autre utilisateur",
                            "Titre 2": "Générer et appliquer les règles RLS SQL avec l'agent IA",
                            "Titre 3": "Auditer et valider l'étanchéité totale de l'application dans l'UI"
                        }
                    }
                ]
            },
            {
                "slug": "m5c5l2",
                "title": "M5C5L2 — Démontrer la faille : accéder aux données d'un autre utilisateur",
                "type": "logiciel",
                "slides": [{"template": "VIBECODING - COVER", "content": {"Titre": "Démontrer la faille : accéder aux données d'un autre utilisateur"}}, {"template": "VIBECODING - DEMO", "content": {}}]
            },
            {
                "slug": "m5c5l3",
                "title": "M5C5L3 — Générer et appliquer les règles RLS SQL avec l'agent IA",
                "type": "logiciel",
                "slides": [{"template": "VIBECODING - COVER", "content": {"Titre": "Générer et appliquer les règles RLS SQL avec l'agent IA"}}, {"template": "VIBECODING - DEMO", "content": {}}]
            },
            {
                "slug": "m5c5l4",
                "title": "M5C5L4 — Auditer et valider l'étanchéité totale de l'application dans l'UI",
                "type": "cas_pratique",
                "slides": [{"template": "VIBECODING - COVER", "content": {"Titre": "Auditer et valider l'étanchéité totale de l'application dans l'UI"}}, {"template": "VIBECODING - DEMO", "content": {}}]
            }
        ]
    },
    {
        "chapterNumber": 6,
        "chapterTitle": "Chapitre 6 : Connecter le monde extérieur (API & Secrets)",
        "lessons": [
            {
                "slug": "m5c6l1",
                "title": "M5C6L1 — Les objectifs du chapitre : Connecter le monde extérieur (API & Secrets)",
                "type": "theorique",
                "slides": [
                    {
                        "template": "VIBECODING - COVER CHAP",
                        "content": {
                            "Titre": "Chapitre 6 : Connecter le monde extérieur (API & Secrets)"
                        }
                    },
                    {
                        "template": "VIBECODING - OBJECTIF CHAP",
                        "content": {
                            "Titre": "Les objectifs du chapitre",
                            "Intro": "Découvrir les API REST, protéger ses clés confidentielles dans .env.local et intégrer des services externes au projet fil rouge.",
                            "Titre 1": "Qu'est-ce qu'une API REST et comment l'interroger avec l'IA ?",
                            "Titre 2": "Sécuriser ses clés API & secrets dans le fichier .env.local",
                            "Titre 3": "Brancher un service tiers au projet fil rouge (Stripe, Resend, API métier)"
                        }
                    }
                ]
            },
            {
                "slug": "m5c6l2",
                "title": "M5C6L2 — Qu'est-ce qu'une API REST et comment l'interroger avec l'IA ?",
                "type": "theorique",
                "slides": [{"template": "VIBECODING - COVER", "content": {"Titre": "Qu'est-ce qu'une API REST et comment l'interroger avec l'IA ?"}}]
            },
            {
                "slug": "m5c6l3",
                "title": "M5C6L3 — Sécuriser ses clés API & secrets dans le fichier .env.local",
                "type": "logiciel",
                "slides": [{"template": "VIBECODING - COVER", "content": {"Titre": "Sécuriser ses clés API & secrets dans le fichier .env.local"}}, {"template": "VIBECODING - DEMO", "content": {}}]
            },
            {
                "slug": "m5c6l4",
                "title": "M5C6L4 — Brancher un service tiers au projet fil rouge (Stripe, Resend, API métier)",
                "type": "logiciel",
                "slides": [{"template": "VIBECODING - COVER", "content": {"Titre": "Brancher un service tiers au projet fil rouge (Stripe, Resend, API métier)"}}, {"template": "VIBECODING - DEMO", "content": {}}]
            }
        ]
    },
    {
        "chapterNumber": 7,
        "chapterTitle": "Chapitre 7 : Déploiement en production & Réussir son projet certifiant 🏆",
        "lessons": [
            {
                "slug": "m5c7l1",
                "title": "M5C7L1 — Les objectifs du chapitre : Déploiement en production & Réussir son projet certifiant",
                "type": "theorique",
                "slides": [
                    {
                        "template": "VIBECODING - COVER CHAP",
                        "content": {
                            "Titre": "Chapitre 7 : Déploiement en production & Réussir son projet certifiant"
                        }
                    },
                    {
                        "template": "VIBECODING - OBJECTIF CHAP",
                        "content": {
                            "Titre": "Les objectifs du chapitre",
                            "Intro": "Mettre l'application en ligne sur Vercel, documenter le projet sur GitHub, tourner la vidéo de démonstration et préparer le passage du diplôme.",
                            "Titre 1": "Déployer en production sur Vercel avec HTTPS",
                            "Titre 2": "Publier le dépôt GitHub propre avec un README détaillé",
                            "Titre 3": "Enregistrer la vidéo de démonstration du projet fil rouge",
                            "Titre 4": "Auto-évaluation sur la grille certifiante & Préparation au QCM"
                        }
                    }
                ]
            },
            {
                "slug": "m5c7l2",
                "title": "M5C7L2 — Déployer en production sur Vercel avec HTTPS",
                "type": "logiciel",
                "slides": [{"template": "VIBECODING - COVER", "content": {"Titre": "Déployer en production sur Vercel avec HTTPS"}}, {"template": "VIBECODING - DEMO", "content": {}}]
            },
            {
                "slug": "m5c7l3",
                "title": "M5C7L3 — Publier le dépôt GitHub propre avec un README détaillé",
                "type": "theorique",
                "slides": [{"template": "VIBECODING - COVER", "content": {"Titre": "Publier le dépôt GitHub propre avec un README détaillé"}}]
            },
            {
                "slug": "m5c7l4",
                "title": "M5C7L4 — Enregistrer la vidéo de démonstration du projet fil rouge",
                "type": "cas_pratique",
                "slides": [{"template": "VIBECODING - COVER", "content": {"Titre": "Enregistrer la vidéo de démonstration du projet fil rouge"}}, {"template": "VIBECODING - DEMO", "content": {}}]
            },
            {
                "slug": "m5c7l5",
                "title": "M5C7L5 — Auto-évaluation sur la grille certifiante & Préparation au QCM",
                "type": "theorique",
                "slides": [{"template": "VIBECODING - COVER", "content": {"Titre": "Auto-évaluation sur la grille certifiante & Préparation au QCM"}}]
            }
        ]
    }
]

# Build flat lessons list for plugin import
flat_lessons = []
grouped_chapters = []

for ch in chapters:
    ch_num = ch["chapterNumber"]
    ch_title = ch["chapterTitle"]
    
    ch_lessons_out = []
    for idx, les in enumerate(ch["lessons"]):
        les_type = les["type"]
        color_info = COLOR_MAP[les_type]
        hex_code = color_info["hex"]
        color_name = color_info["colorName"]
        
        les_obj = {
            "lessonSlug": les["slug"],
            "lessonTitle": les["title"],
            "lessonType": les_type,
            "colorName": color_name,
            "color": hex_code,             # Valid HEX string (#E2E4E9)
            "backgroundColor": hex_code,   # Valid HEX string (#E2E4E9)
            "colorHex": hex_code,          # Valid HEX string (#E2E4E9)
            "chapterNumber": ch_num,
            "chapterTitle": ch_title,
            "newRow": (idx == 0),          # First lesson of chapter forces line break
            "slides": les["slides"]
        }
        flat_lessons.append(les_obj)
        ch_lessons_out.append(les_obj)
        
    grouped_chapters.append({
        "chapterNumber": ch_num,
        "chapterTitle": ch_title,
        "newRow": True,
        "lessons": ch_lessons_out
    })

full_export_figma = {
    "moduleTitle": "Module 5 : Full-Stack, Sécurité & Déploiement : Réussir son Projet Certifiant",
    "moduleSlug": "module-5",
    "colorLegend": {
        "theorique": {"label": "Leçon Théorique", "colorName": "Gris clair", "hex": "#E2E4E9"},
        "logiciel": {"label": "Logiciel", "colorName": "Violet", "hex": "#C4B5FD"},
        "hybride": {"label": "Hybride", "colorName": "Rose", "hex": "#FFB5E8"},
        "cas_pratique": {"label": "Cas Pratique", "colorName": "Bleu clair", "hex": "#A0D2FF"}
    },
    "chapters": grouped_chapters,
    "lessons": flat_lessons
}

# Write FINAL_MODULE5_FIGMA.json
target_figma_path = "/Users/maximeelhaik/Documents/VIBE CODING GENERATION/FINAL_MODULE5_FIGMA.json"
with open(target_figma_path, "w", encoding="utf-8") as f:
    json.dump(full_export_figma, f, indent=2, ensure_ascii=False)

# Write FINAL_MODULE5.json
target_m5_path = "/Users/maximeelhaik/Documents/VIBE CODING GENERATION/FINAL_MODULE5.json"
with open(target_m5_path, "w", encoding="utf-8") as f:
    json.dump(full_export_figma, f, indent=2, ensure_ascii=False)

print("✅ Mise à jour des leçons d'objectifs de chapitre (COVER CHAP + OBJECTIF CHAP) terminée avec succès !")
