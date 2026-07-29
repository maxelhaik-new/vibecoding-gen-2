# Architecture du Module 5 : Full-Stack, Sécurité & Déploiement

## 🎯 Vision Pédagogique
Le **Module 5** repose sur une stratégie de **Projet Fil Rouge Géant** : l'apprenant ne crée pas plusieurs sous-projets de démo, mais conçoit, sécurise et déploie **une seule et même application métier de A à Z**. Ce projet devient directement le livrable présenté pour la certification officielle.

---

## 📊 Synthèse Globale
- **Module ID** : `M5`
- **Intitulé du Module** : `Full-Stack, Sécurité & Déploiement : Réussir son Projet Certifiant`
- **Volume** : 7 Chapitres • 31 Leçons • ~154 minutes
- **Règle de Structure** : Chaque chapitre s'ouvre obligatoirement par une leçon **L1** intitulée `Les objectifs du chapitre : [Titre du Chapitre]`.
- **Types de Leçons Validés** : `📺 Leçon `, `⚙️ Logiciel`, `📝 Cas Pratique`
- **Stack Technique** : React/Next.js (Front-end) + Supabase (BDD/Auth/RLS) + API Externe + Vercel + GitHub + `.env`
- **Mode d'Exécution** : 100% assisté par agents IA (Antigravity / Cursor) en posture de superviseur / chef de produit.

---

## 🏆 Cartographie de la Certification

| Compétence Certifiante | Intitulé Référentiel | Chapitres et Leçons Associés |
| :--- | :--- | :--- |
| **C1** | Cadrer le produit numérique | **Chapitre 1** (M5C1L1 à M5C1L4) |
| **C2** | Générer et itérer un prototype fonctionnel | **Chapitre 2** (M5C2L1 à M5C2L5) |
| **C3** | Configurer un environnement local & Git | **Chapitre 7** (M5C7L3) |
| **C4** | Interfacer le produit avec des services externes | **Chapitre 3** (Supabase), **Chapitre 4** (Auth), **Chapitre 6** (API REST / Stripe) |
| **C5** | Déployer le produit sur un environnement de production | **Chapitre 4** (Routes privées), **Chapitre 5** (RLS), **Chapitre 7** (Vercel & Secrets) |
| **C6** | Veille, éthique et responsabilité | **Chapitre 1** (Choix stack), **Chapitre 5** (RGPD/Données), **Chapitre 7** (QCM) |
| 🚨 **CE5.3.5** | **Row Level Security (RLS) — CRITÈRE ÉLIMINATOIRE** | **Chapitre 5** (M5C5L1 à M5C5L4) |

---

## 📑 Structure Détaillée des Chapitres et Leçons (31 Leçons)

### Chapitre 1 — Cadrer son projet certifiant & Définir le produit (4 leçons)
*Airtable Chapter Name: `"Chapitre 1 : Projet final certifiant 🏆"`*
* **M5C1L1** (1 min) | `📺 Leçon ` : Les objectifs du chapitre : Cadrer son projet certifiant & Définir le produit
* **M5C1L2** (2 min) | `📺 Leçon ` : Découvrir le projet fil rouge & les exigences de la certification
* **M5C1L3** (6 min) | `📺 Leçon ` : Choisir et cadrer son application métier (Dossier de cadrage)
* **M5C1L4** (6 min) | `📺 Leçon ` : Structurer les règles contextuelles de son projet (`AGENTS.md`)

---

### Chapitre 2 — Générer l'Interface Utilisateur (Front-end & UX) avec l'IA (5 leçons)
*Airtable Chapter Name: `"Chapitre 2 : Concevoir le backend & l'architecture"`*
* **M5C2L1** (1 min) | `📺 Leçon ` : Les objectifs du chapitre : Générer l'Interface Utilisateur (Front-end & UX)
* **M5C2L2** (6 min) | `⚙️ Logiciel` : Générer la structure et le design system de l'application
* **M5C2L3** (7 min) | `⚙️ Logiciel` : Créer les composants UI métier (Tableaux, Formulaires, Cartes)
* **M5C2L4** (7 min) | `⚙️ Logiciel` : Itérer sur l'ergonomie visuelle et corriger les bugs de style
* **M5C2L5** (6 min) | `⚙️ Logiciel` : Rendre l'interface dynamique et réactive en Front-end

---

### Chapitre 3 — Connecter la base de données Cloud (Supabase BaaS) (5 leçons)
*Airtable Chapter Name: `"Chapitre 3 : Gérer l'authentification des utilisateurs"`*
* **M5C3L1** (1 min) | `📺 Leçon ` : Les objectifs du chapitre : Connecter la base de données Cloud (Supabase BaaS)
* **M5C3L2** (4 min) | `📺 Leçon ` : Front-end vs Back-end : pourquoi le navigateur ne suffit plus ?
* **M5C3L3** (5 min) | `⚙️ Logiciel` : Créer et configurer son projet Supabase
* **M5C3L4** (7 min) | `⚙️ Logiciel` : Structurer les tables SQL du projet fil rouge avec l'agent IA
* **M5C3L5** (7 min) | `⚙️ Logiciel` : Connecter les formulaires Front-end à la base de données

---

### Chapitre 4 — Authentification & Espace Membre Privé (5 leçons)
*Airtable Chapter Name: `"Chapitre 4 : La sécurité (RLS) par la faille"`*
* **M5C4L1** (1 min) | `📺 Leçon ` : Les objectifs du chapitre : Authentification & Espace Membre Privé
* **M5C4L2** (5 min) | `📺 Leçon ` : Comprendre la gestion de session et l'identité utilisateur
* **M5C4L3** (6 min) | `⚙️ Logiciel` : Connecter la page de connexion & inscription avec l'agent IA
* **M5C4L4** (6 min) | `⚙️ Logiciel` : Protéger les routes privées et le dashboard de l'application
* **M5C4L5** (6 min) | `⚙️ Logiciel` : Lier les données créées dans le Front-end à l'ID utilisateur

---

### Chapitre 5 — Sécuriser les données par la faille (Row Level Security - RLS) (4 leçons)
*Airtable Chapter Name: `"Chapitre 5 : Connecter le monde extérieur (API, MCP & variables d'environnement)"`*
* **M5C5L1** (1 min) | `📺 Leçon ` : Les objectifs du chapitre : Sécuriser les données par la faille (RLS)
* **M5C5L2** (5 min) | `⚙️ Logiciel` : Démontrer la faille : accéder aux données d'un autre utilisateur
* **M5C5L3** (8 min) | `⚙️ Logiciel` : Générer et appliquer les règles RLS SQL avec l'agent IA
* **M5C5L4** (6 min) | `📝 Cas Pratique` : Auditer et valider l'étanchéité totale de l'application dans l'UI

---

### Chapitre 6 — Connecter le monde extérieur (API & Secrets) (4 leçons)
*Airtable Chapter Name: `"Chapitre 6 : Projet guidé : Application CRUD avec Auth & RLS"`*
* **M5C6L1** (1 min) | `📺 Leçon ` : Les objectifs du chapitre : Connecter le monde extérieur (API & Secrets)
* **M5C6L2** (5 min) | `📺 Leçon ` : Qu'est-ce qu'une API REST et comment l'interroger avec l'IA ?
* **M5C6L3** (6 min) | `⚙️ Logiciel` : Sécuriser ses clés API & secrets dans le fichier `.env.local`
* **M5C6L4** (7 min) | `⚙️ Logiciel` : Brancher un service tiers au projet fil rouge (Stripe, Resend, API métier)

---

### Chapitre 7 — Déploiement en production & Réussir son projet certifiant 🏆 (5 leçons)
*Airtable Chapter Name: `"À SUPP - Chapitre 6 : Projet guidé : Outil interne métier"`* *(Réutilisation du chapitre Airtable désactivé)*
* **M5C7L1** (1 min) | `📺 Leçon ` : Les objectifs du chapitre : Déploiement en production & Réussir son projet certifiant
* **M5C7L2** (7 min) | `⚙️ Logiciel` : Déployer en production sur Vercel avec HTTPS
* **M5C7L3** (7 min) | `📺 Leçon ` : Publier le dépôt GitHub propre avec un README détaillé
* **M5C7L4** (7 min) | `📝 Cas Pratique` : Enregistrer la vidéo de démonstration du projet fil rouge
* **M5C7L5** (5 min) | `📺 Leçon ` : Auto-évaluation sur la grille certifiante & Préparation au QCM
