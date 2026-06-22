# Guide de Style d'Image et Règles de Création (Vibe Coding)

Ce document définit les règles de création et de persistance du style graphique pour toutes les images d'illustration générées par IA destinées aux slides de formation. L'objectif est d'assurer une **cohérence visuelle absolue** entre toutes les leçons, indépendamment du sujet traité.

---

## 1. Description du Style Graphique

Le style graphique s'inspire du travail d'illustration éditoriale moderne avec des techniques de gravure rétro (style woodcut/linocut ou carte à gratter) :


*   **Hachures de texture** : Utilisation de fines hachures ou de lignes blanches et foncées pour texturer les details, les vêtements ou les volumes (style gravure).
*   **Composition** : Épurée, minimaliste . Utiliser des métaphores visuelles intelligentes plutôt que des représentations littérales.
*   **Langue des Textes Intégrés** : Si l'image contient du texte lisible ou suggéré (comme des boutons, des étiquettes, des morceaux de code fictif ou des fenêtres d'interface), ce texte doit être **systématiquement écrit en français**. Cela ne force pas l'apparition de texte pour autant, mais s'il y en a, la langue doit être le français.

---

## 2. Palette de Couleurs Identitaire (Brand Colors)

Toutes les images générées doivent respecter strictement la palette suivante de la charte Wemodo :

| Rôle dans l'Illustration | Teinte recommandée | Code HEX |
| :--- | :--- | :--- |
| **Arrière-plans principaux** |  **Fig** (Navy sombre) |  `#18093B` | ou Pink Feeling (#FFB2B2)
| **Volumes secondaires & Peau** | **Pink Feeling** (Rose pastel) | `#FFB2B2` | ou Fig (#18093B)
| **Points d'accroche visuelle & Lumière** | **Sunny** (Jaune vif) ou Blanc | `#FFFF77` ou `#FFFFFF` |

---

## 3. Styles et Structures de Prompt Disponibles

Deux styles visuels sont supportés et sélectionnables. Le script choisira la bonne structure de prompt selon le style demandé.

### Style 1 : Gravure Rétro (Woodcut / Engraving)
*   **Description** : Style s'inspirant de la gravure traditionnelle, avec des tracés fins et des hachures régulières pour le relief et les textures.
*   **Structure du Prompt** :
    ```text-style-woodcut
    A conceptual editorial illustration of [SUJET AVEC MÉTAPHORE VISUELLE]. 
    Digital painting in retro woodcut print engraving. 
    Delicate thin outline drawings, fine line hatch patterns for textures, and subtle halftone dot shading on a soft grainy paper texture background. 
    Strict color palette of  dark navy (#18093B), pastel pink (#FFB2B2), and accent highlights of bright yellow (#FFFF77). 
    Clean composition.
    ```

### Style 2 : Éditorial Minimaliste Texturé (Flat Grainy Vector)
*   **Description** : Style vectoriel moderne
*   **Structure du Prompt** :
    ```text-style-editorial
    A conceptual editorial flat vector illustration of [SUJET AVEC MÉTAPHORE VISUELLE].
    Modern vector art with clean geometric shapes,  and minimalist character design.
    Rich  gradients with a subtle grainy noise texture overlay, soft lighting, and clean, thin precise vector outlines.
    Surrealistic visual metaphor, flat design aesthetic, highly polished editorial art style.
    Clean composition.
    ```

### Style 3 : Constructiviste / Mid-Century Modern
*   **Description** : Style caractérisé par des silhouettes géométriques imbriquées, des contours nets, des aplats francs et une texture granulée uniforme sans dégradés, inspiré du graphisme soviétique constructiviste et du Mid-Century Modern.
*   **Structure du Prompt** :
    ```text-style-constructivist
    A modern editorial vector illustration of [SUJET AVEC MÉTAPHORE VISUELLE] with strong Constructivist and Mid-Century Modern graphic design influences. 
    The style features stylized, geometric human figures and architectural elements, often in sophisticated, nested, or interwoven compositions. 
    The use of negative space is clever, transforming forms into objects, paths, or text blocks. 
    Features include geometric heads, stylized profiles, ¾ views, and simplified hands. 
    Clean, precise lines are paramount, defining distinct blocks of flat, bold color. 
    Crucially, all surfaces are uniformly covered in a rich, gritty noise grain texture, totally avoiding smooth gradients. 
    The compositions employ a limited, sophisticated color palette with deep, saturated hues and deliberate complementary accents. 
    The backgrounds are typically textured, flat fields or simple patterns. 
    The overall feel is clean, intellectual, graphic novel-like, and highly textured, suitable for premium magazine or book covers.
    ```
### Style 4 : Grain Minimaliste Chiaroscuro (Dual-Tone Stippling)
*   **Description** : Style bicolore à fort contraste (blanc et Fig `#18093B`). Les formes émergent sans lignes d'une texture granulée de type aérographe, produisant des silhouettes épurées et géométriques.
*   **Structure du Prompt** :
    ```text-style-chiaroscuro
    A minimalist, high-contrast conceptual illustration of [SUJET AVEC MÉTAPHORE VISUELLE] rendered in a strict dual-tone palette of black  and white. 
    The entire image is constructed from a dense, fine stochastic noise-grain texture, resembling fine powder splatter on a deep, textured black void. 
    Forms are not defined by solid lines or blocks, but emerge as dense concentrations of white granular texture, creating soft white halos and minimal contours against the vast, deep black negative space. 
    This specific style uses extreme chiaroscuro stippling effects to create simplified, geometric, or solitary elements, evoking isolation, mystery, and structural simplicity. 
    All white areas are composed of concentrated texture, avoiding any pure, untextured flat white. 
    Digital art with a tactile, analog noise feel.
    ```
### Style 5 : Éditorial Granuleux Vectoriel (Grainy Editorial)
*   **Description** : Style vectoriel éditorial moderne combinant formes géométriques nettes et ombrage 100% réalisé par une texture de bruit stochastique granuleuse. Les transitions sont du type halo d'aérographe granuleux sur aplats de couleurs vives saturées. Composition graphique-novel inspirée, poétique, avec de larges espaces négatifs.
*   **Structure du Prompt** :
    ```text-style-grainy-editorial
    A minimalist conceptual editorial vector illustration of [SUJET AVEC MÉTAPHORE VISUELLE]. The style features clean geometric contours, flat bold shapes, and highly stylized silhouettes with simplified anatomical proportions. Shading and volumetric highlights are rendered exclusively through a dense, fine stochastic noise texture and grainy stipple gradients, creating soft halos and a tactile airbrush effect on flat color surfaces. The color palette is sophisticated and strictly limited, pairing deep, saturated fields with vibrant high-contrast lighting. The composition is poetic, graphic-novel inspired, and intellectually clean, perfectly balancing massive negative space with rich granular depth.
    ```
### Style 6 : Illustration Pédagogique Moderne (Tactile Flat Design)
*   **Description** : Style hybride entre le "Tactile Craft" et le "Flat Design" épuré, utilisant des formes géométriques modulaires simplifiées, des contours irréguliers faits main, et un aspect papier découpé numérique texturé.
*   **Structure du Prompt** :
    ```text-style-pedagogical
    A modern pedagogical educational illustration of [SUJET AVEC MÉTAPHORE VISUELLE], designed for high readability and clarity. The style is a hybrid of 'Tactile Craft' and clean 'Flat Design'. It features highly simplified, modular geometric layouts with soft, rounded curves and slightly irregular, hand-drawn wobbly contours. Elements look like clean digital paper cutouts with visible layered depth. Surfaces are filled with solid, welcoming matte colors, accented by a very subtle, organic paper-grain texture. Zero complex gradients, zero industrial gloss. The composition is structured, engaging, and friendly, optimized for fast visual learning and minimal cognitive load.
    ```
### Style 7 : Illustration Ligne et Blocs Décalés (Offset Screen-Print)
*   **Description** : Style minimaliste en ligne noire/marine à l'encre constante avec des aplats de couleurs de la charte (Pink Feeling `#FFB2B2` et Sunny `#FFFF77`) appliqués de manière légèrement décalée derrière le trait (effet sérigraphie rétro-moderne), sur fond blanc pur.
*   **Structure du Prompt** :
    ```text-style-offset-screenprint
    A minimalist flat design vector illustration on a pure white background, featuring elegant, ultra-fine dark navy (#18093B) line work with a consistent thin pen weight. The illustration shows [SUJET AVEC MÉTAPHORE VISUELLE]. The characters are highly stylized with simple, clean facial features (small dot eyes, minimal line nose, small smile) and solid dark navy hair. The illustration remains mostly open white space, with no direct color fills. Instead, multiple separate, solid, flat color blocks of pink feeling (#FFB2B2), purple thinking (#6634D9), and sunny yellow (#FFFF77) are applied as misaligned, offset geometric patches behind the line art (e.g. behind a laptop, an arm, or a screen element), creating a sophisticated, retro-modern layered screen-print effect. Zero gradients, zero complex shading. The overall composition is clean, professional, and minimalist, tailored for a presentation slide.
    ```
---

## 4. Outils de Génération Locaux

Deux scripts ont été créés dans le répertoire `scripts/` pour vous permettre d'exécuter ce processus de manière automatisée ou semi-automatisée :

### A. Génération automatique via l'API Gemini (Nanobanana 2)
*   **Script** : [generate_nano_banana.py](file:///Users/maximeelhaik/Documents/VIBE%20CODING%20GENERATION/scripts/generate_nano_banana.py)
*   **Fonctionnement** : Appelle le modèle officiel `imagen-3.0-generate-002` avec votre clé API Gemini de manière sécurisée et dépose l'image finale directement dans le dossier `assets/`.
*   **Usage** :
    ```bash
    export GEMINI_API_KEY="votre_cle_ai_studio"
    python3 scripts/generate_nano_banana.py --concept "sécurité" --bg pink
    ```

### B. Génération semi-automatique via Midjourney
*   **Script** : [generate_midjourney_prompt.py](file:///Users/maximeelhaik/Documents/VIBE%20CODING%20GENERATION/scripts/generate_midjourney_prompt.py)
*   **Fonctionnement** : Formate vos concepts en prompts Midjourney structurés et les écrit dans un fichier pour un copier-coller sans risque dans Discord.
*   **Usage** :
    ```bash
    python3 scripts/generate_midjourney_prompt.py "sécurité" "rapidité" "parcours professionnel"
    ```
    *   Les invites générées sont écrites dans [midjourney_prompts.txt](file:///Users/maximeelhaik/Documents/VIBE%20CODING%20GENERATION/Imports/midjourney_prompts.txt). Copiez-les dans Discord et déposez l'image résultante dans `assets/vibe_[concept].png`.