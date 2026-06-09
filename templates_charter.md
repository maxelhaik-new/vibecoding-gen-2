# Charte d'Usage des Templates Figma (Vibe Coding)

Ce guide définit les règles d'attribution des templates de slides en fonction de la nature et de la structure du contenu pédagogique à présenter. Il aide l'IA d'écriture à sélectionner le bon gabarit durant la phase de **`DÉCOUPE`**.

---

## 1. Matrice de Sélection des Templates

Lors du découpage d'un cours ou d'un chapitre, l'IA doit analyser le but de la slide et choisir le template correspondant dans `templates.json` selon cette grille :

| Nature du contenu | Objectif de la slide | Template à utiliser |
| :--- | :--- | :--- |
| **Titre / Lancement** | Titre de la leçon ou du module complet. | `VIBECODING - COVER` |
| **Transition / Chapitre** | Marquer une transition claire vers un nouveau sujet. | `VIBECODING - COVER CHAP` |
| **Intro / Concepts larges** | Poser le cadre d'une notion avec deux blocs descriptifs larges. | `VIBECODING - INTRO` |
| **Objectif / Sommaire** | Lister des objectifs pédagogiques ou étapes clés (avec puces). | `VIBECODING - OBJECTIF CHAP` ou `VIBECODING - CHECKLIST` |
| **Concepts structurés (3 idées)** | Présenter 3 notions courtes (avec picto + titre + texte). | `VIBECODING - 3 BLOCS - LARGE TEXT` ou `VIBECODING - 3 COLONNES` |
| **Concepts structurés (4 idées)** | Présenter 4 notions courtes (avec picto + titre + texte). | `VIBECODING - 4 BLOCS - TITLE 2 LINES` ou `TEXTE + 4 POINTS` |
| **Concepts structurés (5 idées)** | Présenter 5 notions courtes (avec picto + titre + texte). | `VIBECODING - 5 BLOCS` ou `VIBECODING - 5 BLOCS - VARIATION` |
| **Concepts structurés (6 idées)** | Présenter 6 notions courtes (haute densité d'icônes/concepts). | `VIBECODING - 6 BLOCS` |
| **Données / Statistiques** | Mettre en valeur 3 chiffres ou métriques clés. | `VIBECODING - CHIFFRES` |
| **Données chiffrées + Photo** | 3 métriques clés accompagnées d'un visuel d'illustration. | `CHIFFRES - PHOTO` |
| **Étude de cas / Récit** | Décrire un exemple réel complet avec une bulle de synthèse. | `VIBECODING - USE CASE` |
| **Comparatif / Duel** | Comparer deux outils, approches ou options face-à-face. | `VIBECODING - COMPARAISON` |
| **Processus / Évolution** | Décrire un cycle d'étapes ordonnées ou une progression historique. | `PROCESS` ou `VIBECODING - 2 BLOC - EVOLUTION` |
| **Acronyme** | Détailler un acronyme de 3 à 5 lettres avec description par lettre. | `VIBECODING - ACRONYME` |
| **Définition** | Définir formellement un terme, un mot-clé ou un concept précis. | `VIBECODING - DEFINITION ALT` |
| **Sur-mesure / Dessin libre** | Slide personnalisée (titre + intro + schéma/éléments créés). | `VIBECODING - VIDE` |
| **Fin de chapitre / Synthèse** | Résumé de leçon, bulle de conclusion et appel à l'action. | `VIBECODING - FIN` |

---

## 2. Directives par Gabarit

### A. Templates à Haute Densité (`VIBECODING - 6 BLOCS` / `5 BLOCS`)
*   **Quand l'utiliser** : Idéal pour les slides de vulgarisation de notions multiples, les listes d'outils, les paramètres précis ou les biais d'apprentissage.
*   **Règles** :
    *   Chaque bloc doit être extrêmement concis.
    *   Associer systématiquement une icône MDI spécifique et pertinente pour chaque bloc (voir `icon_mapping.md`).

### B. Templates de Comparaison & Process (`VIBECODING - COMPARAISON` / `PROCESS`)
*   **Quand l'utiliser** : `VIBECODING - COMPARAISON` Parfait pour comparer des outils, des methodes ou des concepts (ex : *« Midjourney vs Stable Diffusion »*). `PROCESS` Parfait pour expliquer une suite chronologique ou un processus, une etape de vie etc (ex : *« Le cycle de correction de code »*).
*   **Règles** :
    *   Pour `VIBECODING - COMPARAISON`, structurer les arguments en opposition face-à-face directe.
    *   Pour `PROCESS`, formuler les étapes par des verbes à l'infinitif actif.

### C. Templates d'Illustration (`CHIFFRES - PHOTO` / `VIBECODING - 3 BLOCS - PHOTO`)
*   **Quand l'utiliser** : Slides nécessitant un support visuel fort (capture d'écran, maquette Figma, illustration artistique).
*   **Règles** :
    *   Garder les textes courts pour ne pas surcharger la slide.
    *   Remplir le champ `Source` avec le crédit ou le titre de l'image (ex : *« Image : Wemodo (Capture d'écran) »*).

### D. Template Acronyme (`VIBECODING - ACRONYME`)
*   **Quand l'utiliser** : Exclusivement pour détailler un acronyme (de 3 à 5 lettres max).
*   **Règles** :
    *   Les lettres de l'acronyme doivent être placées dans les champs `Lettre 1` à `Lettre 5`.
    *   Les noms complets (ou significations de la lettre) doivent être placés dans les champs `Violet 1` à `Violet 5`.
    *   Les descriptions détaillées doivent être placées dans les champs `Texte 1` à `Texte 5`.
    *   Si l'acronyme comporte moins de 5 lettres, laisser les blocs restants vides.

### E. Template Définition (`VIBECODING - DEFINITION ALT`)
*   **Quand l'utiliser** : Pour définir formellement un terme, un mot-clé ou un concept spécifique.
*   **Règles** :
    *   Le mot à définir doit être placé dans le champ `Mot`.
    *   L'explication ou la définition détaillée va dans le champ `Definition`.
    *   Le champ `Bulle` sert à ajouter une remarque, un exemple court ou un point d'attention.

### F. Template Vide Sur-Mesure (`VIBECODING - VIDE`)
*   **Quand l'utiliser** : Pour dessiner des schémas personnalisés, des diagrammes, ou des mises en page libres qui ne rentrent pas dans les grilles standards.
*   **Règles** :
    *   Remplir le `Titre` et l'`Intro`.
    *   Les nouveaux éléments visuels (blocs de texte supplémentaires, rectangles d'arrière-plan, icônes) doivent être générés en spécifiant des actions de type `create_node` dans le JSON de correction en ciblant la slide parente comme conteneur.


