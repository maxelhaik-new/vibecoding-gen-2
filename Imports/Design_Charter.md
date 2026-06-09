# Charte Graphique CSS & Directives de Conception Visuelle (Vibe Coding)

Ce document définit la charte graphique et les règles de mise en page CSS dérivées des templates Figma existants. Il sert de **guide de référence visuelle** pour la création et la modification d'éléments personnalisés (custom_elements) sur les slides sur-mesure (`VIBECODING - VIDE`).

---

## 1. Systèmes de Couleurs (Color Tokens)

La palette se compose de quatre couleurs de marque principales et de variations d'opacité destinées aux arrière-plans et aux tableaux.

| Nom de la Couleur | Code HEX | Usage & Rôle Pédagogique |
| :--- | :--- | :--- |
| **Fig** (Navy sombre) | `#18093B` | Couleur principale du texte, fond des intercalaires de chapitre, fond des badges d'icônes standard. |
| **Purple Thinking** (Violet) | `#6634D9` | Couleur de marque majeure. Utilisée pour le fond de la couverture principale, les bandeaux d'introduction et les badges de numérotation. |
| **Sunny** (Jaune vif) | `#FFFF77` | Couleur d'accentuation haute visibilité. Utilisée exclusivement pour les icônes de blocs et le texte des numéros dans les badges violets. |
| **Pink Feeling** (Rose) | `#FFB2B2` | Couleur d'accentuation douce. Utilisée pour les formes d'arrière-plan vectorielles et les illustrations schématiques. |
| **Pink 80%** (Rose clair) | `#FFBABB` | Utilisée pour des blocs d'arrière-plan thématiques ou secondaires. |
| **Pink 50%** (Rose pastel) | `#F8DBDA` | Arrière-plan de lignes paires dans les tableaux ou les lignes d'en-tête de comparaison. |
| **Pink 20%** (Rose très clair) | `#FCF1F0` | Arrière-plan de lignes impaires ou de blocs de mise en valeur de contenu. |
| **Blanc** | `#FFFFFF` | Fond standard de toutes les slides de contenu. |

---

## 2. Système Typographique

L'unique famille de polices autorisée pour les slides est **`Basic Sans Alt`**. Ses déclinaisons de graisses et de tailles structurent la hiérarchie de l'information.

### A. Titres Majeurs
*   **Titres de Couvertures (Cover / Cover Chap)** :
    *   `font-family`: `'Basic Sans Alt'`
    *   `font-weight`: `900` (Black)
    *   `font-size`: `120px`
    *   `line-height`: `100%`
    *   `letter-spacing`: `-0.014em`
    *   `color`: `#FFFFFF`
*   **Titres de Slides de Contenu (`Titre`)** :
    *   `font-family`: `'Basic Sans Alt'`
    *   `font-weight`: `900` (Black)
    *   `font-size`: `90px`
    *   `line-height`: `100%`
    *   `letter-spacing`: `-0.014em`
    *   `color`: `#18093B`

### B. Introductions & Sous-titres
*   **Intro Standard (`Intro`)** :
    *   `font-family`: `'Basic Sans Alt'`
    *   `font-weight`: `400` (Regular)
    *   `font-size`: `35px` ou `36px`
    *   `line-height`: `100%` (ou `37px`)
    *   `color`: `#18093B`
*   **Intro dans un bandeau Violet (`Intro` dans un bloc `#6634D9`)** :
    *   `font-family`: `'Basic Sans Alt'`
    *   `font-weight`: `600` (Semi-Bold)
    *   `font-size`: `35px`
    *   `line-height`: `100%`
    *   `color`: `#FFFFFF`

### C. Blocs de Concepts & Listes
*   **Titres de concepts / colonnes (`Titre X`)** :
    *   `font-family`: `'Basic Sans Alt'`
    *   `font-weight`: `700` (Bold)
    *   `font-size`: `45px`
    *   `line-height`: `100%`
    *   `color`: `#18093B`
*   **Textes de concepts (`Texte X`)** :
    *   `font-family`: `'Basic Sans Alt'`
    *   `font-weight`: `400` (Regular)
    *   `font-size`: `30px` (ou `36px` pour les paragraphes denses)
    *   `line-height`: `100%`
    *   `color`: `#18093B` (ou `#1C1C1C` pour le texte secondaire)

### D. Badges & Puces
*   **Numéros de puces / étapes** :
    *   `font-family`: `'Basic Sans Alt'`
    *   `font-weight`: `700` (Bold)
    *   `font-size`: `50px`
    *   `line-height`: `60px`
    *   `color`: `#FFFF77` (Sunny)

---

## 3. Grille de Mise en Page (Layout System)

Toutes les slides respectent le format **16:9** standardisé à **`1920px × 1080px`**. Les positions absolues suivent des règles de grille rigoureuses.

```
+-------------------------------------------------------------------------+
|  (left: 100px, top: 70px) TITRE DE LA SLIDE (90px)                      |
|                                                                         |
|  (left: 100px, top: 234px) TEXTE D'INTRODUCTION (35px)                  |
|                                                                         |
|  ZÔNE DE CONTENU PRINCIPALE (Top: 430px - 455px)                        |
|  +-----------------------+  +-----------------------+  +-------------+  |
|  | BLOC 1                |  | BLOC 2                |  | ...         |  |
|  | (left: 100px)         |  | (left: 879px)         |  |             |  |
|  +-----------------------+  +-----------------------+  +-------------+  |
|                                                                         |
|  (left: 125px, top: 899px) BAS DE PAGE / SIGNATURE / BULLE              |
+-------------------------------------------------------------------------+
```

### A. Marges & Alignements Généraux
*   **Marge Gauche standard (`left`)** : `100px` (Alignement parfait de l'intro et du premier bloc).
*   **Marge Droite standard (`right`)** : `100px`.
*   **Position du Titre de slide** : `top: 70px` à `100px`, `left: 100px`, `height: 90px`.
*   **Position de l'Intro** : `top: 234px`, `left: 100px`, `height: 70px` (ou `146px` si dans un bandeau).

### B. Grille Horizontale (Colonnes)
Pour aligner les schémas et concepts, utiliser l'un des deux découpages de colonnes suivants :

*   **Structure à 3 Colonnes (ex: 3 Blocs, Chiffres)** :
    *   **Colonne 1** : `left: 100px`, `width: 517px`
    *   **Colonne 2** : `left: 663px`, `width: 517px`
    *   **Colonne 3** : `left: 1238px`, `width: 517px`
    *   *Espace entre colonnes (Gap)* : `46px` (calcul : `663 - 100 - 517 = 46px`)
*   **Structure à 2 Colonnes ou Grille 2x2 (ex: 4 Blocs)** :
    *   **Colonne 1** : `left: 100px`, `width: 607px` (ou jusqu'à `732px` selon la densité)
    *   **Colonne 2** : `left: 879px`, `width: 651px` (ou jusqu'à `732px`)
    *   *Espace entre colonnes (Gap)* : `172px` (calcul : `879 - 100 - 607 = 172px`)

### C. Grille Verticale (Lignes)
Pour les grilles multi-blocs (comme le 2x2 des 4 Blocs) :
*   **Ligne Haute (Row 1)** : `top: 455px`, `height: 184px`
*   **Ligne Basse (Row 2)** : `top: 720px`, `height: 184px`
*   *Espace entre lignes (Gap)* : `81px` (calcul : `720 - 455 - 184 = 81px`)

---

## 4. Règles de Formes & Éléments Graphiques Custom

Pour dessiner des schémas, cycles d'itération, boîtes de mise en valeur ou flèches personnalisées sur le template `VIBECODING - VIDE`, appliquer les contraintes géométriques suivantes :

### A. Cartes de concepts et Boîtes de Contenu
*   **Formes Rectangulaires (`RECTANGLE` ou `FRAME`)** :
    *   `border-radius` : Toujours `0px` (Pas d'angles arrondis sur les rectangles de contenu pour garder le style épuré et géométrique de Wemodo).
    *   `fills` : 
      *   Pour un bloc sombre : `#18093B` (Fig).
      *   Pour une mise en valeur douce : `#FCF1F0` (Pink 20%) ou `#F8DBDA` (Pink 50%).
      *   Pour un bloc de mise en avant majeur : `#6634D9` (Purple Thinking).
*   **Formes Circulaires / Badges (`border-radius`)** :
    *   `border-radius` : `167.5px` (ou valeur similaire assurant un cercle parfait pour les formes rondes).
    *   `width` & `height` : Idéalement identiques (ex: `49px × 49px` pour les puces, ou `180px × 180px` pour les pastilles géométriques de coin).

### B. Flèches et Connecteurs de Processus
Pour relier des concepts (ex: Cycle d'itération Étape 1 → Étape 2) :
*   **Format** : Utiliser des lignes rectilignes (horizontales ou verticales).
*   **Épaisseur (Strokes)** : `4px` minimum, idéalement `6px`.
*   **Couleurs** : `#6634D9` (Purple Thinking) ou `#18093B` (Fig).
*   **Exemple de structure JSON pour une flèche horizontale simple** :
    ```json
    {
      "action": "create_node",
      "node_type": "RECTANGLE",
      "name": "Fleche Connecteur",
      "properties": {
        "x": 710,
        "y": 547,
        "width": 160,
        "height": 6,
        "fills": "#6634D9"
      }
    }
    ```

### C. Badges d'Icônes
Chaque bloc thématique est surmonté d'une icône intégrée dans un badge.
*   **Option 1 : Badge Fig (Navy)** :
    *   Créer un rectangle de `77px × 82px` rempli de `#18093B`.
    *   Placer l'icône (taille `61px × 61px`, color `#FFFF77`) centrée à l'intérieur.
*   **Option 2 : Pastille Circulaire** :
    *   Créer un cercle (`border-radius: 167.5px`) de `49px × 49px` rempli de `#6634D9`.
    *   Placer l'icône (taille `49px × 49px`, color `#FFFF77`) centrée à l'intérieur.
