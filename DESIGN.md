---
name: Plateforme Formation Vibe Coding
description: Interface d'apprentissage 2026 néo-brutaliste et épurée (Glossaire, Prompts, Quizz, Outils)
colors:
  primary: "#6634D9"
  primary-hover: "#5022BC"
  brand-fig: "#18093B"
  brand-sunny: "#FFFF77"
  brand-sunny-soft: "#F8E37E"
  brand-pink: "#FFB2B2"
  pink-surface: "#FCF1F0"
  neutral-bg: "#F8FAFC"
  card-bg: "#FFFFFF"
  border: "#E2E8F0"
  border-dark: "#CBD5E1"
  text-dark: "#18093B"
  text-body: "#334155"
  text-muted: "#64748B"
  success: "#16A34A"
  danger: "#DC2626"
  info: "#0284C7"
typography:
  display:
    fontFamily: "Plus Jakarta Sans, Inter, -apple-system, sans-serif"
    fontSize: "clamp(1.8rem, 6.5vw, 3.2rem)"
    fontWeight: 900
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Plus Jakarta Sans, Inter, -apple-system, sans-serif"
    fontSize: "clamp(1.35rem, 4vw, 2.2rem)"
    fontWeight: 800
    lineHeight: 1.2
    letterSpacing: "-0.015em"
  title:
    fontFamily: "Plus Jakarta Sans, Inter, -apple-system, sans-serif"
    fontSize: "1.15rem"
    fontWeight: 800
    lineHeight: 1.3
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Inter, Plus Jakarta Sans, -apple-system, sans-serif"
    fontSize: "0.95rem"
    fontWeight: 500
    lineHeight: 1.55
    letterSpacing: "normal"
  label:
    fontFamily: "Cousine, ui-monospace, Menlo, monospace"
    fontSize: "0.78rem"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "0.04em"
rounded:
  xs: "1px"
  sm: "6px"
  md: "10px"
  lg: "14px"
  pill: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "#FFFFFF"
    rounded: "{rounded.sm}"
    padding: "12px 22px"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
    textColor: "#FFFFFF"
    rounded: "{rounded.sm}"
  button-utility:
    backgroundColor: "{colors.card-bg}"
    textColor: "{colors.brand-fig}"
    rounded: "{rounded.sm}"
    padding: "8px 12px"
  button-utility-hover:
    backgroundColor: "{colors.brand-sunny}"
    textColor: "{colors.brand-fig}"
    rounded: "{rounded.sm}"
  card:
    backgroundColor: "{colors.card-bg}"
    textColor: "{colors.text-dark}"
    rounded: "{rounded.md}"
    padding: "20px 24px"
  input-search:
    backgroundColor: "{colors.card-bg}"
    textColor: "{colors.text-dark}"
    rounded: "{rounded.sm}"
    padding: "12px 16px"
---

# Design System: Plateforme Formation Vibe Coding

## Overview

**Creative North Star: "The High-Contrast Coding Atelier"**

La Plateforme Formation Vibe Coding combine la franchise typographique et structurelle du néo-brutalisme contemporain avec la fluidité ergonomique et la retenue d'une application professionnelle de 2026. L'interface est conçue pour des apprenants en développement assisté par IA (Vibe Coding) qui alternent entre consultation rapide, recherche instantanée de syntaxes ou prompts, et entraînement intensif.

L'expérience privilégie la clarté immédiate ("UX/UI first") sur l'ornementation gratuite. Les blocs d'information reposent sur des aplats nets (Midnight Fig, Electric Violet, Sunny Acid Yellow), des bordures franches de 2px, et un contraste typographique maximal. Sur grand écran, l'espace respire sur une grille étendue à 1440px ; sur mobile et tablette, les éléments superflus sont distillés pour laisser place à une app-bar épurée et un menu plein écran immersif en indigo profond.

**Key Characteristics:**
- **Contraste franc & Hiérarchie directe** : Fond ardoise clair (`#F8FAFC`) confronté à un Midnight Fig profond (`#18093B`) et des accents Violet Électrique (`#6634D9`).
- **Néo-brutalisme calibré** : Ombres dures franches (`2px 2px 0px` à `4px 4px 0px`) sur desktop pour structurer l'information, mais stabilisées sans translation intempestive au survol.
- **Ergonomie mobile 2026** : Menu burger plein écran avec gros titres épurés, disparition du superflu décoratif sur téléphone, et app-bar bord à bord à hauteur optimisée (~105px).
- **Zéro friction de saisie** : Cibles tactiles ≥ 44px, police des champs à 16px anti-zoom Safari iOS, et raccourci global `⌘K` sur desktop.

## Colors

Une palette à haute tension graphique qui allie la sobriété technique de l'indigo sombre aux vibrations énergiques de l'acide jaune et du violet synthétique.

### Primary
- **Electric Violet** (`#6634D9`): Couleur d'action principale. Utilisée pour l'onglet actif, les boutons primaires d'action, les badges de filtrage actifs et les états sélectionnés.
- **Deep Electric Violet** (`#5022BC`): Variante d'interaction au survol et à l'enfoncement des actions primaires.

### Secondary
- **Midnight Fig** (`#18093B`): Teinte structurelle d'autorité. Utilisée pour le fond de l'en-tête, le menu plein écran mobile, les bordures de 2px, les ombres dures décalées et les titres majeurs.
- **Sunny Acid Yellow** (`#FFFF77`): Accent lumineux de signalement. Utilisé pour le badge de marque officiel, le sous-titre de l'en-tête, les pastilles de comptage actives et les états hover des boutons utilitaires.

### Tertiary
- **Pastel Blossom Pink** (`#FFB2B2`): Teinte d'accentuation douce pour les tags thématiques, puces secondaires et surlignages visuels.
- **Blossom Tint Wash** (`#FCF1F0`): Fond de survol doux sur les onglets et conteneurs cliquables au repos.

### Neutral
- **Slate Light Canvas** (`#F8FAFC`): Fond général de l.application.
- **Slate Soft Hover** (`#F1F5F9`): Fond secondaire pour les tags, pilules et survols., procurant une toile neutre, calme et douce pour les yeux lors des sessions prolongées.
- **Pure Surface White** (`#FFFFFF`): Fond des cartes de contenu, des champs de recherche et des boutons utilitaires.
- **Border Subtle Slate** (`#E2E8F0`): Séparateurs internes et bordures de cartes secondaires.
- **Border Dark Slate** (`#CBD5E1`): Filets techniques et bordures d'outils interactifs.
- **Shadow Alphas** (`rgba(0, 0, 0, 0.12)`, `rgba(0, 0, 0, 0.15)`, `rgba(0, 0, 0, 0.25)`): Transparences pour les bordures et ombres subtiles.
- **Text Midnight Headings** (`#18093B`): Couleur des titres de niveau 1 à 3 assurant un contraste WCAG AAA.
- **Text Body Slate** (`#334155`): Corps de texte principal pour les définitions et descriptions.
- **Text Muted Slate** (`#64748B`): Métadonnées, icônes secondaires et labels de raccourcis.

### Named Rules
**The Stability First Rule.** Aucun bouton ou onglet ne doit subir de translation géométrique (`translateY`) au survol qui déborderait de son conteneur parent. L'interaction est communiquée par la couleur et le contraste, jamais par le déplacement structurel.
**The Mobile Flush Rule.** Sur écran mobile (< 768px), le header supprime son ombre portée néo-brutaliste et ses bordures épaisses pour s'étendre en pleine largeur bord à bord sans marges parasites.

## Typography

Le système typographique associe **Plus Jakarta Sans** (géométrie incisive et lisibilité moderne) pour l'identité et les titres, **Inter** pour le confort de lecture du corps, et **Cousine** pour l'ancrage code/technique des métadonnées.

**Display Font:** Plus Jakarta Sans (fallback: -apple-system, BlinkMacSystemFont, sans-serif)  
**Body Font:** Inter (fallback: Plus Jakarta Sans, sans-serif)  
**Label/Mono Font:** Cousine (fallback: ui-monospace, Menlo, Monaco, Consolas, monospace)

### Hierarchy
- **Display** (ExtraBold 900, `clamp(1.8rem, 6.5vw, 3.2rem)`, line-height: `1.1`, tracking: `-0.02em`): Gros titres immersifs du menu plein écran mobile (`GLOSSAIRE`, `PROMPTS`, etc.).
- **Headline** (ExtraBold 800-900, `clamp(1.35rem, 4vw, 2.2rem)`, line-height: `1.2`, tracking: `-0.015em`): Titre de section active dans le header (`LE GLOSSAIRE VIBE CODING`).
- **Title** (Bold 800, `1.15rem`, line-height: `1.3`, tracking: `-0.01em`): Noms des termes du glossaire et titres de prompts.
- **Body** (Medium 500-600, `0.95rem`, line-height: `1.55`): Définitions, explications conceptuelles et instructions de prompts. Longueur de ligne maximale de 75ch.
- **Label / Code** (Bold 700, `0.78rem`, letter-spacing: `0.04em`, uppercase): Métadonnées de module (`M1`, `M4C3L1`), badges de raccourcis (`⌘K`), et numérotations d'items (`01`, `02`).

### Named Rules
**The Raw Case Rule.** Les termes techniques, acronymes et noms de fichiers (`AGENTS.md`, `API`, `SDK`, `MCP`) conservent scrupuleusement leur casse authentique sans être forcés arbitrairement en bas-de-casse.

## Layout

L'architecture spatiale répond aux standards desktop et mobile 2026 :

- **Desktop Standard 2026** : Grille principale contenue dans `.app-viewport` à `max-width: 1440px` (extensible à `1560px` sur écrans ≥ 1600px), éliminant les colonnes étroites des générations précédentes.
- **Breakpoints Réactifs** :
  - **Mobile (< 768px)** : Affichage 1 colonne, app-bar flush bord à bord (`margin: 0 -0.85rem`), padding de carte compact (`1.15rem`), navigation par menu burger plein écran.
  - **Tablette (768px – 1023px)** : Grille 2 colonnes, menu burger actif à droite, header compact avec marge aérée.
  - **Desktop (≥ 1024px)** : Grille 3 à 4 colonnes, navigation par onglets horizontaux fixes `.tab-nav`, badge de recherche `⌘K` affiché.
- **Rythme Vertical** : Échelle d'espacement standardisée à base 4px/8px (`gap: 1.25rem` entre cartes, `gap: 0.75rem` entre onglets).

## Elevation & Depth

Le projet utilise un modèle hybride : ombres dures néo-brutalistes franches à l'état de repos combinées à des ombres diffuses subtiles de 2026.

### Shadow Vocabulary
- **Shadow Small** (`box-shadow: 2px 2px 0px #18093B`): Boutons d'onglets, étiquettes de comptage, pilules de filtres.
- **Shadow Medium** (`box-shadow: 3px 3px 0px #18093B`): Cartes de contenu au repos (termes, prompts, outils, questions).
- **Shadow Large** (`box-shadow: 4px 4px 0px #18093B`): Header principal sur desktop.
- **Shadow Ambient Subtle** (`0 4px 12px rgba(24, 9, 59, 0.04)`): Sous-couche de profondeur pour adoucir le rendu sur fond ardoise.
- **Shadow Card Hover** (`0 12px 28px -6px rgba(102, 52, 217, 0.12), 3px 3px 0px #18093B`): Élévation lumineuse au survol sans déplacement physique.

### Named Rules
**The Flat On Mobile Rule.** Sur smartphone (< 768px), l'en-tête et les boutons de navigation suppriment leurs ombres portées décalées afin d'éviter tout décalage d'alignement ou gaspillage d'espace tactile.

## Shapes

- **Rayons de courbure (Border Radius)** :
  - **Small** (`6px` / `var(--radius-sm)`): Boutons utilitaires, champs de saisie, badges de raccourcis, boutons burger et fermeture.
  - **Medium** (`10px` / `var(--radius-md)`): Cartes de contenu, encarts de prompts, conteneurs de questions quizz.
  - **Pill** (`9999px` / `var(--radius-pill)`): Pastilles de comptage, filtres de modules actifs.
- **Bordures** : Filet régulier de `2px solid #18093B` définissant l'esthétique néo-brutaliste. Séparateurs internes en pointillés légers `1px dashed rgba(...)`.

## Components

### Buttons
- **Shape:** Rayon de 6px (`var(--radius-sm)`), padding tactile calibré.
- **Bouton Primaire (`.tab-btn.active`, `.btn-copy-prompt`):** Fond Violet Électrique (`#6634D9`), texte blanc `#FFFFFF`, ombre `2px 2px 0px #18093B`.
- **Bouton Utilitaire (`.burger-menu-btn`, `.mobile-menu-close`):** Fond blanc `#FFFFFF`, texte Midnight Fig (`#18093B`), bordure fine `1px solid rgba(0,0,0,0.12)`, min-height 40px, structure symétrique **icône à gauche, texte à droite**. Survol : passage en Sunny Acid Yellow (`#FFFF77`).
- **Bouton d'Action Carte (`.tool-card-btn`):** Pleine largeur, fond violet avec icône flèche sortante `↗`.

### Navigation
- **Bureau (≥ 1024px) :** Barre d'onglets horizontaux `.tab-nav` avec boutons indépendants dotés de pastilles de comptage (`Glossaire 57`, `Prompts 13`, `Quizz 50Q`, `Outils 7`).
- **Mobile & Tablette (< 1024px) :** Menu overlay plein écran `#18093B` avec fermeture tactile, synchronisation dynamique des compteurs et typographie XXL.

### Cards / Containers
- **Style :** Fond blanc `#FFFFFF`, bordure `2px solid #18093B`, ombre `3px 3px 0px #18093B`, padding interne de `1.5rem` (`1.15rem` sur mobile).
- **Structure :** En-tête avec métadonnée thématique à droite, titre gras à gauche, corps explicatif et tag de module en pied.

### Search Field
- **Style :** Fond blanc, bordure `2px solid #18093B`, ombre `2px 2px 0px #18093B`, icône loupe intégrée à gauche, bouton d'effacement `✕` à droite.
- **Touch Standard :** Taille de police fixée à `16px` sur mobile pour interdire le zoom forcé d'iOS Safari.
- **Raccourci Clavier :** Déclenchement automatique au focus par `⌘K`, `Ctrl+K` ou touche `/`.

## Do's and Don'ts

### Do:
- **Do** maintenir une symétrie visuelle et spatiale exacte entre le bouton `[ ≡ Menu ]` fermé et `[ ✕ Fermer ]` ouvert.
- **Do** aligner le burger menu strictement à droite de l'en-tête (`margin-left: auto; flex-shrink: 0;`).
- **Do** conserver une taille de police d'au moins `16px` sur tous les champs de saisie mobile.
- **Do** utiliser des composants modulaires isolés dans `components/` avec injection contrôlée par `app.js`.
- **Do** stabiliser les ombres portées et interdire tout décalage `transform: translateY` sur les boutons intégrés aux listes et onglets.

### Don't:
- **Don't** ajouter de marges extérieures ou d'ombres portées décalées à l'en-tête en affichage mobile (< 768px).
- **Don't** laisser `.header-top` passer à la ligne (`flex-wrap: wrap`), ce qui rejetterait le bouton burger à gauche.
- **Don't** afficher de mentions décoratives superflues de version ou de sous-titres verbeux sur smartphone.
- **Don't** utiliser `margin: auto 0` dans les menus superposés afin d'éviter la formation de zones de vide excessives.
- **Don't** créer de pages monolithiques ou de scripts inline dans `index.html`.
