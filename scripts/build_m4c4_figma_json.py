import json

m4c4_json_data = {
  "moduleTitle": "Module 4 : Maîtriser Antigravity",
  "moduleSlug": "module-4",
  "chapterTitle": "Chapitre 4 : Créer son premier Backend local & Fiabiliser son projet",
  "chapterNumber": 4,
  "colorLegend": {
    "theorique": {"label": "Leçon Théorique", "colorName": "Gris clair", "hex": "#E2E4E9"},
    "logiciel": {"label": "Logiciel", "colorName": "Violet", "hex": "#C4B5FD"},
    "cas_pratique": {"label": "Cas Pratique", "colorName": "Bleu clair", "hex": "#A0D2FF"}
  },
  "lessons": [
    {
      "lessonSlug": "m4c4l1",
      "lessonTitle": "M4C4L1 — Les objectifs du chapitre : Découvrir le backend & fiabiliser son app",
      "lessonType": "theorique",
      "colorName": "Gris clair",
      "color": "#E2E4E9",
      "backgroundColor": "#E2E4E9",
      "colorHex": "#E2E4E9",
      "chapterNumber": 4,
      "chapterTitle": "Chapitre 4 : Créer son premier Backend local & Fiabiliser son projet",
      "newRow": True,
      "slides": [
        {
          "template": "VIBECODING - COVER CHAP",
          "content": {
            "Titre": "Chapitre 4 : Créer son premier Backend local & Fiabiliser son projet"
          }
        },
        {
          "template": "VIBECODING - OBJECTIF CHAP",
          "content": {
            "Titre": "Les objectifs du chapitre",
            "Intro": "Comprendre la séparation Front-Back, générer un serveur local Node.js/Express, sécuriser les secrets et maîtriser Git sur un projet Full-Stack.",
            "Titre 1": "Front-end vs Back-end : pourquoi le navigateur ne suffit plus ?",
            "Titre 2": "Générer son premier serveur local (Node.js/Express) avec l'agent",
            "Titre 3": "Connecter l'interface Front-end au serveur local",
            "Titre 4": "Isoler ses secrets et variables locales dans .env.local",
            "Titre 5": "Déboguer la chaîne Front-Back et lire les logs d'erreur"
          }
        }
      ]
    },
    {
      "lessonSlug": "m4c4l2",
      "lessonTitle": "M4C4L2 — Front-end vs Back-end : pourquoi le navigateur ne suffit plus ?",
      "lessonType": "theorique",
      "colorName": "Gris clair",
      "color": "#E2E4E9",
      "backgroundColor": "#E2E4E9",
      "colorHex": "#E2E4E9",
      "chapterNumber": 4,
      "chapterTitle": "Chapitre 4 : Créer son premier Backend local & Fiabiliser son projet",
      "newRow": False,
      "slides": [
        {
          "template": "VIBECODING - COVER",
          "content": {
            "Titre": "Front-end vs Back-end : pourquoi le navigateur ne suffit plus ?"
          }
        }
      ]
    },
    {
      "lessonSlug": "m4c4l3",
      "lessonTitle": "M4C4L3 — Générer son premier serveur local (Node.js/Express) avec l'agent",
      "lessonType": "logiciel",
      "colorName": "Violet",
      "color": "#C4B5FD",
      "backgroundColor": "#C4B5FD",
      "colorHex": "#C4B5FD",
      "chapterNumber": 4,
      "chapterTitle": "Chapitre 4 : Créer son premier Backend local & Fiabiliser son projet",
      "newRow": False,
      "slides": [
        {
          "template": "VIBECODING - COVER",
          "content": {
            "Titre": "Générer son premier serveur local (Node.js/Express) avec l'agent"
          }
        },
        {
          "template": "VIBECODING - DEMO",
          "content": {}
        }
      ]
    },
    {
      "lessonSlug": "m4c4l4",
      "lessonTitle": "M4C4L4 — Connecter l'interface Front-end au serveur local",
      "lessonType": "logiciel",
      "colorName": "Violet",
      "color": "#C4B5FD",
      "backgroundColor": "#C4B5FD",
      "colorHex": "#C4B5FD",
      "chapterNumber": 4,
      "chapterTitle": "Chapitre 4 : Créer son premier Backend local & Fiabiliser son projet",
      "newRow": False,
      "slides": [
        {
          "template": "VIBECODING - COVER",
          "content": {
            "Titre": "Connecter l'interface Front-end au serveur local"
          }
        },
        {
          "template": "VIBECODING - DEMO",
          "content": {}
        }
      ]
    },
    {
      "lessonSlug": "m4c4l5",
      "lessonTitle": "M4C4L5 — Isoler ses secrets et variables locales dans .env.local",
      "lessonType": "logiciel",
      "colorName": "Violet",
      "color": "#C4B5FD",
      "backgroundColor": "#C4B5FD",
      "colorHex": "#C4B5FD",
      "chapterNumber": 4,
      "chapterTitle": "Chapitre 4 : Créer son premier Backend local & Fiabiliser son projet",
      "newRow": False,
      "slides": [
        {
          "template": "VIBECODING - COVER",
          "content": {
            "Titre": "Isoler ses secrets et variables locales dans .env.local"
          }
        },
        {
          "template": "VIBECODING - DEMO",
          "content": {}
        }
      ]
    },
    {
      "lessonSlug": "m4c4l6",
      "lessonTitle": "M4C4L6 — Déboguer la chaîne Front-Back et lire les logs d'erreur",
      "lessonType": "logiciel",
      "colorName": "Violet",
      "color": "#C4B5FD",
      "backgroundColor": "#C4B5FD",
      "colorHex": "#C4B5FD",
      "chapterNumber": 4,
      "chapterTitle": "Chapitre 4 : Créer son premier Backend local & Fiabiliser son projet",
      "newRow": False,
      "slides": [
        {
          "template": "VIBECODING - COVER",
          "content": {
            "Titre": "Déboguer la chaîne Front-Back et lire les logs d'erreur"
          }
        },
        {
          "template": "VIBECODING - DEMO",
          "content": {}
        }
      ]
    },
    {
      "lessonSlug": "m4c4l7",
      "lessonTitle": "M4C4L7 — Maîtriser Git local (Commits & Branches) sur un projet Full-Stack",
      "lessonType": "logiciel",
      "colorName": "Violet",
      "color": "#C4B5FD",
      "backgroundColor": "#C4B5FD",
      "colorHex": "#C4B5FD",
      "chapterNumber": 4,
      "chapterTitle": "Chapitre 4 : Créer son premier Backend local & Fiabiliser son projet",
      "newRow": False,
      "slides": [
        {
          "template": "VIBECODING - COVER",
          "content": {
            "Titre": "Maîtriser Git local (Commits & Branches) sur un projet Full-Stack"
          }
        },
        {
          "template": "VIBECODING - DEMO",
          "content": {}
        }
      ]
    },
    {
      "lessonSlug": "m4c4l8",
      "lessonTitle": "M4C4L8 — À vous de jouer : Votre première application Full-Stack locale",
      "lessonType": "cas_pratique",
      "colorName": "Bleu clair",
      "color": "#A0D2FF",
      "backgroundColor": "#A0D2FF",
      "colorHex": "#A0D2FF",
      "chapterNumber": 4,
      "chapterTitle": "Chapitre 4 : Créer son premier Backend local & Fiabiliser son projet",
      "newRow": False,
      "slides": [
        {
          "template": "VIBECODING - COVER",
          "content": {
            "Titre": "À vous de jouer : Votre première application Full-Stack locale"
          }
        },
        {
          "template": "VIBECODING - DEMO",
          "content": {}
        }
      ]
    }
  ]
}

target_path = "/Users/maximeelhaik/Documents/VIBE CODING GENERATION/FINAL_M4C4_FIGMA.json"
with open(target_path, "w", encoding="utf-8") as f:
    json.dump(m4c4_json_data, f, indent=2, ensure_ascii=False)

print(f"✅ FINAL_M4C4_FIGMA.json généré avec succès ({len(m4c4_json_data['lessons'])} leçons).")
