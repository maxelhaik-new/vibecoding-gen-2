# Backup : Section 5 - Gestion du Sur-mesure (Génération de slides personnalisées)

Le plugin supporte **deux modes** de génération sur-mesure :

### 5.1 Mode JSON `custom_elements` (positionnement absolu via template VIDE)

1. **Template** : `"template": "VIBECODING - VIDE"` (possède `Titre` et `Intro`).
2. **Remplissage** : Remplir `Titre` et `Intro` dans `"content"`.
3. **`custom_elements`** : Tableau au même niveau que `"content"`. Commandes supportées :
   - `create_node` : `node_type: "FRAME" | "TEXT" | "RECTANGLE"`, `properties` (`x`, `y`, `width`, `height`, `fills`, `strokes`, `characters`), `icon: "mdi:nom-icone"`.
   - `delete_node` / `delete_layer` : `selector: "nom_du_calque"`.
   - `set_property` : `selector`, `property`, `value`.

### 5.2 Mode HTML brut (Auto-Layout Figma via flexbox)

Pour des layouts complexes avec cartes, grilles et typographies riches, générer du **HTML/CSS brut** que le plugin convertit automatiquement en Auto-Layout Figma.

#### Propriétés CSS supportées par le plugin Figma

| Propriété CSS | Mapping Figma | Notes |
|---|---|---|
| `display: flex` | `layoutMode` | `flex` ou `block` → Auto-Layout |
| `flex-direction` | `VERTICAL` / `HORIZONTAL` | |
| `gap` | `itemSpacing` | Valeur en `px` uniquement |
| `padding-*` | `paddingTop/Right/Bottom/Left` | |
| `background-color` | `fills` (SOLID) | Supporte `rgba()` avec opacité |
| `color` | `fills` sur TextNode | |
| `font-size` | `fontSize` | Clampé 14–140px |
| `font-weight` | Style de police | 400→Regular, 600→SemiBold, 700→Bold, 800→ExtraBold, 900→Black |
| `border-radius` | `cornerRadius` | |
| `text-align` | `textAlignHorizontal` | `left`, `center`, `right`, `justify` |
| `flex-grow` | `layoutGrow` | `flex-grow: 1` → la frame prend l'espace disponible |
| `align-self` | `layoutAlign` | `stretch` ou héritage |
| `justify-content` | `primaryAxisAlignItems` | `flex-start`, `center`, `flex-end`, `space-between` |
| `align-items` | `counterAxisAlignItems` | `flex-start`, `center`, `flex-end`, `stretch` |
| `opacity` | `frame.opacity` | ✅ Valeur 0–1 sur l'élément entier |
| `overflow: hidden` | `clipsContent` | ✅ Masque les enfants débordants |
| `border` | `strokes` + `strokeWeight` | ✅ Couleur, épaisseur, `strokeAlign: INSIDE` |
| `box-shadow` | `effects` (DROP_SHADOW) | ✅ Offset, blur, spread, couleur rgba |
| `position: absolute` | `layoutPositioning: ABSOLUTE` | ✅ Avec `top`/`left` en px |
| `line-height` | `txt.lineHeight` | ✅ Valeur en px |
| `letter-spacing` | `txt.letterSpacing` | ✅ Valeur en px |
| `text-transform` | `txt.textCase` | ✅ `uppercase`→UPPER, `lowercase`→LOWER, `capitalize`→TITLE |
| `max-width` | `frame.maxWidth` | ✅ Contrainte de largeur max |

#### Propriétés CSS **NON SUPPORTÉES** (à ne JAMAIS utiliser)

| Propriété | Raison |
|---|---|
| `background: linear-gradient(...)` | Seules les couleurs solides sont parsées |
| `backdrop-filter`, `filter: blur()` | Effets CSS non traduisibles en Figma |
| `transition`, `animation`, `transform` | Figma est statique |
| `::before`, `::after` | Pseudo-éléments non traversés par le DOM parser |
| `display: grid` (complexe) | Traduit en vertical simple ; préférer `display: flex` |
| `%`, `em`, `rem`, `vh`, `vw` | Utiliser uniquement des valeurs en **`px`** |
| `width: max-content` / `fit-content` | Utiliser des largeurs fixes ou `flex-grow: 1` |

#### Règles de conception obligatoires pour le HTML sur-mesure

1. **`data-figma-name`** obligatoire sur chaque `<div>` et `<span>` — c'est le nom du calque dans Figma.
2. **Typographie** : Toujours `font-family: 'Basic Sans Alt', sans-serif`.
3. **Palette** : Respecter la charte `Design_Charter.css` (`#18093B`, `#6634D9`, `#FFFF77`, `#FFB2B2`).
4. **Canvas** : Le conteneur racine doit être `width: 1920px; height: 1080px`.
5. **Valeurs en px** : Toutes les dimensions, gaps, paddings, font-sizes doivent être en **px** explicites.
6. **Flexbox pur** : Utiliser `display: flex` avec `flex-direction`, `gap`, `padding`. Pas de grid complexe.
7. **`position: absolute`** : Réservé aux décorations de fond (blobs, formes). Le parent doit avoir `position: relative`.
8. **Pas de pseudo-éléments** : Tout le contenu visuel doit être dans des balises HTML réelles.
9. **Pas de `width: max-content`** : Utiliser des largeurs fixes ou `flex-grow: 1`.
