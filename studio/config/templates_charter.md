# Charte d'Usage des Templates Figma (Vibe Coding)

Ce guide définit les règles d'attribution des templates de slides en fonction de la nature et de la structure du contenu pédagogique à présenter. Il aide l'IA de découpage à sélectionner le bon gabarit durant la phase de **`DECOUPE`**.

---

## 1. Matrice de Sélection des Templates Valides

Lors du découpage d'un cours ou d'un chapitre, l'IA doit analyser le but de la slide et choisir **uniquement** un template ayant le statut `"status": "validé"` dans `templates.json` selon cette grille :

| Nature du contenu | Objectif de la slide | Template à utiliser |
| :--- | :--- | :--- |
| **Titre / Lancement** | Titre de la leçon ou du module complet. | `VIBECODING - COVER` |
| **Transition / Chapitre** | Marquer une transition claire vers un nouveau sujet. | `VIBECODING - COVER CHAP` |
| **Intro / Présentation générale** | Systématique (après COVER) : introduire le sujet général de la leçon avec ses 3 grandes notions. | `VIBECODING - INTRO` |
| **Sommaire / Objectifs** | Lister des objectifs pédagogiques ou étapes clés (avec puces). | `VIBECODING - OBJECTIF CHAP` |
| **Illustration / Image pleine** | Présenter un visuel pleine page avec une légende courte. | `VIBECODING - IMAGE` |
| **Notion courte + Photo** | Présenter 3 notions courtes accompagnées d'un visuel d'illustration (gauche ou droite). | `VIBECODING - 3 BLOCS - PHOTO` ou `VIBECODING - 3 BLOCS - PHOTO - ALT` |
| **Étude de cas / Récit** | Décrire un exemple réel complet avec une bulle de synthèse. | `VIBECODING - USE CASE` |
| **Concepts structurés (2 idées)** | Présenter 2 notions courtes côte à côte. | `VIBECODING - 2 BLOCS` |
| **Concepts structurés (3 idées)** | Présenter 3 notions courtes sous forme de colonnes. | `VIBECODING - 3 COLONNES` |
| **Concepts structurés (4 idées)** | Présenter 4 notions courtes. | `VIBECODING - 4 BLOCS` |
| **Concepts structurés + Photo (4 idées)** | Présenter 4 notions courtes accompagnées d'un visuel d'illustration (photo). | `VIBECODING - 4 BLOCS - PHOTO` |
| **Concepts structurés (5 idées)** | Présenter 5 notions courtes. | `VIBECODING - 5 BLOCS` ou `VIBECODING - 5 BLOCS - VARIATION` |
| **Concepts structurés (6 idées)** | Présenter 6 notions courtes (haute densité d'icônes/concepts). | `VIBECODING - 6 BLOCS` |
| **Données / Statistiques** | Mettre en valeur 3 chiffres ou métriques clés. | `VIBECODING - CHIFFRES` |
| **Données chiffrées + Photo** | 3 métriques clés accompagnées d'un visuel d'illustration. | `VIBECODING - FOCUS OUTIL` |
| **Comparatif / Duel** | Comparer deux outils, approches ou options face-à-face. | `VIBECODING - COMPARAISON` |
| **Checklist / Recommandations** | Liste de points à valider ou d'étapes à suivre sous forme de checklist. | `VIBECODING - CHECKLIST` |
| **Processus / Linéaire** | Décrire une suite d'étapes ordonnées ou un parcours linéaire. | `VIBECODING - PROCESS` |
| **Cycle / Boucle** | Décrire un cycle d'étapes répétitif (boucle de feedback, etc.). | `VIBECODING - CYCLE` |
| **Chronologie / Timeline** | Présenter une frise chronologique ou historique. | `VIBECODING - CHRONOLOGIE` |
| **Anatomie / Structure** | Détailler la structure ou l'anatomie d'un concept, prompt ou commande avec des mots-clés/paramètres. | `VIBECODING - DECOUPAGE` |
| **Prompt structuré** | Présenter un exemple de prompt structuré (contexte, consignes, piliers). | `VIBECODING - PROMPT` ou `VIBECODING - PROMPT ALT` |
| **User Stories / Spécifications** | Lister les User Stories et fonctionnalités clés d'une application MVP. | `VIBECODING - USER STORIES` |
| **Persona & MVP** | Présenter le persona utilisateur cible et les objectifs MVP associés. | `VIBECODING - PERSONA & MVP` |
| **Démonstration / Live** | Annoncer une démonstration vidéo ou un passage à la pratique en live. | `VIBECODING - DEMO` |
| **Fiche Récapitulative** | Synthétiser plusieurs points clés avec consignes étape par étape. | `VIBECODING - FICHE RECAP` |
| **Acronyme général** | Détailler un acronyme de 4 à 5 lettres avec description par lettre. | `VIBECODING - ACRONYME` |
| **Acronyme court** | Détailler un acronyme de 3 lettres. | `VIBECODING - ACRONYME 3 LETTRES` |
| **Définition** | Définir formellement un terme technique ou un mot informatique. | `VIBECODING - DEFINITION` |
| **Classement / Podium** | Présenter un podium ou un classement des 3 meilleures solutions. | `VIBECODING - PODIUM` |
| **Exercice / Pratique** | Proposer une mise en situation pratique ou un exercice à faire. | `VIBECODING - EXERCICE` |
| **Exercice pratique / Analyse** | Proposer une mise en situation avec un prompt à analyser ou des questions. | `VIBECODING - EXERCICE PRATIQUE` |
| **Brief / Projet fil rouge** | Présenter un énoncé de projet ou de brief client long. | `VIBECODING - BRIEF` ou `VIBECODING - BRIEF ALT` |
| **Concept général** | Présenter un concept, une idée clé ou une théorie non technique. | `VIBECODING - CONCEPT` |
| **Concept + Visuel & Caractéristiques** | Présenter un concept clé avec sa définition, une image d'illustration et 2 features/caractéristiques détaillées avec icônes. | `VIBECODING - CONCEPT - IMAGE` |
| **Veille / Ressources** | Présenter des outils de veille ou des ressources documentaires. | `VIBECODING - VEILLE` |
| **Schéma libre** | Slide personnalisée ou schéma structurel à 3 colonnes. | `VIBECODING - SCHEMA - 3 COLONNES` ou `VIBECODING - VIDE` |
| **Fin de chapitre / Synthèse** | Résumé de la leçon avec une bulle de conclusion pour la suite. | `VIBECODING - FIN` |

> [!NOTE]
> Tous les anciens templates obsolètes (comme `VIBECODING - 3 BLOCS - LARGE TEXT` et `VIBECODING - 2 BLOC - EVOLUTION`) ont été supprimés de la configuration active et marqués "en attente".

---

## 2. Règles d'Architecture et de Diversité

Ces règles s'appliquent lors du découpage d'un plan en slides pour garantir un rythme visuel captivant :

* **Diversification des templates** : Ne jamais utiliser le même template plus de 2 fois dans toute la leçon, quel que soit l'ordre.
* **Exception de répétition (Parallèle)** : L'utilisation de templates identiques consécutifs n'est autorisée QUE si les slides sont conçues pour être lues en parallèle pour une parité visuelle (ex: comparer "Outil A" puis "Outil B" individuellement avec le même layout). Dans les autres cas, la diversification est obligatoire.
* **Limitation de `VIBECODING - CONCEPT`** : À utiliser UNIQUEMENT pour présenter un modèle théorique ou une notion abstraite. Si une slide très textuelle est nécessaire pour du contexte ou de la narration, privilégier plutôt `VIBECODING - USE CASE` (sans en abuser non plus).
* **Groupement des listes (Densité visuelle)** : Si le plan présente une liste ou une énumération d'éléments similaires, regrouper OBLIGATOIREMENT ces points dans un seul template multi-blocs (`2 BLOCS`, `3 COLONNES`, `4 BLOCS`, `5 BLOCS`, `6 BLOCS`) au lieu de créer une slide concept séparée pour chaque élément. Cela réduit le bruit et augmente la densité visuelle.
