# Instructions de Workspace - Vibe Coding

Ce fichier contient les instructions prioritaires pour toutes les instances de l'IA travaillant dans ce dossier.

---

## 1. Le Flux de Travail en 4 Phases

Toutes les leçons sont conçues et mises à jour de manière itérative suivant ce processus pas-à-pas. Attendez la validation de l'utilisateur après chaque phase :

### Phase 1 : Importation (`IMPORTE`)

Quand l'utilisateur tape `IMPORTE` (sans argument) :

1. **Source fixe** : Lire **uniquement** depuis la section Figma dédiée aux templates validés par le designer :
   - **fileKey** : `X29iTl53DAreMnpHDehsTx`
   - **nodeId** : `236:11789` (section `VIBE CODING - TEMPLATES VALIDES`)
   - Ne jamais utiliser d'autre node ou lien Figma pour l'importation des templates.

2. **Appel MCP** : Appeler `get_figma_data` avec `fileKey=X29iTl53DAreMnpHDehsTx` et `nodeId=236:11789`. Récupérer ensuite chaque frame enfant individuellement avec son propre `nodeId` pour obtenir la profondeur complète des calques.

3. **Filtrage des Templates** : Parmi les enfants directs de la section, conserver uniquement les nœuds de type `FRAME`. Tous les `FRAME` présents dans cette section sont par définition validés — aucun filtrage par emoji n'est nécessaire. Ignorer les nœuds `TEXT` (étiquettes, emojis de statut).

4. **Extraction des Variables de Calques** :
   * **Champs de Texte** : Extraire tous les calques enfants de type `TEXT`.
     * *Règle d'exclusion des chiffres* : Exclure systématiquement les calques dont le nom ou le contenu est un chiffre pur (ex: `"1"`, `"2"`), car ce sont des puces statiques intégrées dans les composants Figma.
   * **Champs d'Icônes / Pictos** : Identifier les calques nommés avec le préfixe `mdi:` ou `iconify:`, ou contenant les mots `picto`, `icon`, `svg`, `logo`. Les mapper sous les clés séquentielles `Picto 1`, `Picto 2`, etc.

5. **Calcul Typographique des Limites** :
   * Pour chaque calque de texte, mesurer la longueur du texte d'origine (`original_placeholder`).
   * Calculer dynamiquement :
     * `target_lenght` : Longueur exacte du placeholder d'origine.
     * `min_lenght` : `Math.round(target_lenght * 0.7)` (minimum 5 pour les textes descriptifs).
     * `max_lenght` : `Math.round(target_lenght * 1.3)` (ou `* 1.5` pour les titres courts de moins de 30 caractères).

6. **Synchronisation de `templates.json`** :
   * **Ajout** : Tout template FRAME présent dans la section mais absent de `templates.json` est ajouté avec `"status": "validé"`.
   * **Mise à jour** : Tout template déjà présent dans `templates.json` est mis à jour avec la structure de calques actuelle (recalcul des longueurs).
   * **Suppression** : Tout template présent dans `templates.json` mais absent de la section Figma est **supprimé** de `templates.json` (il a été retiré par le designer).
   * Afficher un rapport de diff : templates ajoutés, mis à jour, supprimés.

7. **Mise à jour de `templates_charter.md`** :
   * À la fin de l'import, mettre obligatoirement à jour le fichier `templates_charter.md` pour refléter la liste et les règles de choix des templates actifs (l'IA doit toujours connaître ces règles pour bien choisir un template en phase DECOUPE).

### Phase 2 : Découpage (`DÉCOUPE`)
À partir d'un sujet, d'un plan ou de notes :
1. Proposer un découpage slide par slide (Titre de la slide, concept, objectif).
2. Pour chaque slide, associer le template le plus adapté en se basant sur le fichier [templates_charter.md](./templates_charter.md).
3. Utiliser **uniquement** les templates ayant le statut `"status": "validé"` dans `templates.json`.
4. **Structure Systématique de Leçon (hors L1)** :
   * **Slide 1 (Début)** : Toujours `VIBECODING - COVER`.
   * **Slide 2 (Introduction)** : Toujours `VIBECODING - INTRO` pour présenter le sujet global et annoncer les 3 parties/notions clés qui seront abordées dans la leçon.
   * **Slide Finale (Fin)** : Toujours `VIBECODING - FIN` pour synthétiser les acquis.
   * *Note : Les scripts de pipeline forcent et injectent automatiquement cette structure (COVER à l'index 0, INTRO à l'index 1, FIN à l'index final).*

### Phase 3 : Écriture (`ECRIS`)
Rédiger les contenus textuels pour chaque slide validée et présenter le résultat **en format lecture humaine uniquement** — aucun JSON ni aucune image ne doit être généré à cette étape. Attendre la validation de l'utilisateur avant de passer à la phase 4.

1. **Style & Ton** : Appliquer systématiquement le ton de voix Wemodo décrit dans [brand_voice.md](./brand_voice.md) (pas de "tu" ou "vous", phrases courtes de moins de 15 mots, verbes à l'infinitif pour les listes).
2. **Pas de numérotation** : Ne jamais insérer de chiffres en début de titre de bloc ou d'objectif (ex: pas de `"1. Initialiser"`), car les composants Figma gèrent déjà l'affichage des numéros.
3. **Respect des limites** : S'assurer que chaque texte rédigé respecte la contrainte de caractères `min_lenght` et `max_lenght` définie pour sa clé dans `templates.json`.
4. **Sélection d'icônes** : Renseigner pour chaque clé `Picto X` une icône pertinente de la bibliothèque Material Design Icons (ex: `mdi:shield-check`) en suivant les associations thématiques de [icon_mapping.md](./icon_mapping.md).
5. **Proposition de sujet d'image** : Pour chaque slide utilisant un template avec image (`VIBECODING - USE CASE`, `VIBECODING - IMAGE`, `VIBECODING - 3 BLOCS - PHOTO`, `VIBECODING - 3 BLOCS - PHOTO - ALT`, etc.), proposer un **sujet d'illustration** sous ce format dans la lecture humaine :
   > 🖼️ **Image suggérée** : *[Description du sujet de l'illustration, style et intention visuelle]*
   > **Style** : `[woodcut | editorial | constructivist | chiaroscuro | grainy-editorial]`
   > **Ratio** : `[ratio adapté au template, ex: 1:1, 3:4, 16:9]`

   Ce sujet est soumis à correction par l'utilisateur avant toute génération.

> ⚠️ **RÈGLE DE PHASE** : L'IA exécute **uniquement** les phases demandées par l'utilisateur, dans l'ordre demandé. Elle n'anticipe jamais la phase suivante. Si l'utilisateur demande explicitement plusieurs phases en une seule commande (ex: « écris et génère »), toutes les phases demandées sont exécutées en séquence.

### Phase 4 : Génération (`GÉNÈRE`)
Une fois les textes et les sujets d'images validés par l'utilisateur (ou lors d'une exécution de génération globale demandée), effectuer systématiquement et en une seule passe :

1. **Génération automatique des images & Ratios** : Pour chaque slide utilisant un template contenant une image (ex: `VIBECODING - 3 BLOCS - PHOTO`, `VIBECODING - 3 BLOCS - PHOTO - ALT`, `VIBECODING - IMAGE`, `VIBECODING - USE CASE`, `VIBECODING - FOCUS OUTIL`, `PODIUM`, `CHIFFRES - PHOTO`), l'agent doit exécuter le script `scripts/generate_nano_banana.py` avec le concept/sujet (soit validé à l'étape ECRIS, soit déduit du contexte de la slide si absent).
   * **Calcul Automatique du Ratio (Sur-Mesure)** : Récupérer les dimensions exactes du composant d'image cible dans Figma (largeur et hauteur de la forme d'accueil de l'image), ou à défaut utiliser les ratios connus des templates (ex: `3:4` pour le bloc vertical de `VIBECODING - 3 BLOCS - PHOTO`), calculer le ratio le plus proche (ex: `3:4`, `16:9`, `1:1`, `4:3`, `9:16`) et le passer via le paramètre `--aspect-ratio ratio_calcule`.
   * **Appel Type** : `python3 scripts/generate_nano_banana.py --concept "sujet_choisi" --bg none --aspect-ratio ratio_calcule`
   * **Règle d'illustration pour les leçons pratiques (Brief / Projet Fil Rouge)** : Pour les slides de brief des leçons pratiques (`VIBECODING - BRIEF` et `VIBECODING - BRIEF ALT`), l'image doit obligatoirement être générée avec le style photoréaliste (`--style photorealistic`). L'image doit illustrer concrètement le domaine d'activité du projet fil rouge (ex: univers de travail, atelier, cuisine, bureau, logistique) sous forme d'une photographie 35mm professionnelle ultra-réaliste, sans aucun schéma, ni interface d'application.
2. **Intégration de la clé image** : Récupérer le chemin du fichier image généré et injecter la clé `"image"` dans le contenu de la slide au format `"http://localhost:8080/assets/[nom_du_fichier_genere.png]"`.
3. **Légende Source** : Pour chaque slide avec image IA, renseigner le champ `"Source"` au format obligatoire :
   `Source : [Sujet court] - Illustration générée par IA - Maxime Elhaik`

---

## 2. Format JSON attendu pour la Génération

```json
{
  "lessonTitle": "M1C1L1",
  "slides": [
    {
      "template": "VIBECODING - COVER CHAP",
      "content": {
        "Titre": "TITRE DU CHAPITRE"
      }
    },
    {
      "template": "VIBECODING - 3 COLONNES",
      "content": {
        "Titre": "Titre de la slide",
        "Intro": "Texte d'introduction de la slide.",
        "Titre 1": "Premier concept",
        "Texte 1": "Description courte du premier concept.",
        "Titre 2": "Deuxième concept",
        "Texte 2": "Description courte du deuxième concept.",
        "Titre 3": "Troisième concept",
        "Texte 3": "Description courte du troisième concept."
      }
    }
  ]
}
```

---

## 3. Sources de Vérité

* **Règles d'écriture, vocabulaire & ton** : Utiliser [brand_voice.md](./brand_voice.md).
* **Icônes à utiliser en priorité** : Utiliser [icon_mapping.md](./icon_mapping.md).
* **Choix du template par type de slide** : Utiliser [templates_charter.md](./templates_charter.md).
* **Structure & Contraintes de caractères** : Utiliser uniquement les templates validés dans [templates.json](./templates.json).

---

## 4. Raccourcis & Commandes de Test

* **Lancement du jeu de test** : Lorsque l'utilisateur demande de *« lancer le jeu de test »* ou de *« générer la leçon de test »* (avec un sujet ou par défaut), l'IA doit charger et exécuter pas-à-pas la procédure définie dans [jeu_de_test.md](./jeu_de_test.md).

* **Correction de Templates (`CORRIGE` / `RENOMME`)** : Lorsque l'utilisateur demande de renommer les calques, corriger un template ou auditer la hiérarchie (généralement en fournissant une URL Figma ou un `nodeId`) :
   1. **Analyse de l'arbre** : Utiliser l'API Figma (via curl ou MCP avec une profondeur `depth` suffisante) pour récupérer la hiérarchie complète du noeud ciblé.
   2. **Audit** : Repérer les erreurs de nommage : les textes nommés selon leur contenu, les groupes mal nommés (ex: "Group 123" au lieu de "Bloc 1"), ou les doublons qui provoqueraient des collisions.
   3. **Génération du JSON** : Produire un objet JSON `corrections` contenant les actions requises (`rename_layer`, `delete_layer`, `set_text`, `set_property`).
      Exemple de format attendu :
      ```json
      {
        "corrections": [
          { "action": "rename_layer", "node_id": "241:788", "new_name": "Bloc 1" },
          { "action": "rename_layer", "node_id": "224:8651", "new_name": "Titre 1" }
        ]
      }
      ```
   4. **Restitution** : Fournir ce JSON brut à l'utilisateur dans un bloc de code clair afin qu'il puisse le copier-coller dans le plugin Figma.

---

## 5. Gestion du Sur-mesure (Génération de slides personnalisées)

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
| `width: max-content` / `fit-content` | Utiliser des valeurs fixes ou `flex-grow: 1` |

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

---

## 6. Légende Obligatoire pour les Images Générées par IA

> **RÈGLE ABSOLUE** : Pour toute image générée par IA insérée dans une slide, le champ `Source` **doit toujours** respecter ce format exact :
>
> ```
> Source : [Sujet] - Illustration générée par IA - Maxime Elhaik
> ```
>
> Exemples :
> - `Source : New York City - Illustration générée par IA - Maxime Elhaik`
> - `Source : Sécurité numérique - Illustration générée par IA - Maxime Elhaik`
> - `Source : Homme au milieu d'un tourbillon de papier - Illustration générée par IA - Maxime Elhaik`
>
> Cette règle s'applique à **toutes** les images générées par IA dans **tous les slides et tous les agents** du projet Wemodo / Vibe Coding, sans exception.

---

## 7. Gestion & Génération du Glossaire Vibe Coding

* **Fichier source unique** : [glossaire_formation_vibe_coding.md](./glossaire_formation_vibe_coding.md) regroupe les 57 termes techniques des Modules 1 à 4.
* **Formulations V2** : Les définitions doivent rester claires, courtes et adaptées à des adultes débutants, en évitant le jargon abstrait pour définir un autre terme (ex: éviter "arbre hiérarchique" pour le DOM, "moteur V8" pour Node.js). Appliquer la règle de non-tutoiement de [brand_voice.md](./brand_voice.md).
* **Script de génération de la Cheat Sheet A4** : Si le fichier Markdown du glossaire est modifié ou enrichi, exécuter le script suivant pour mettre à jour la Cheat Sheet HTML multi-pages A4 côte-à-côte :
  ```bash
  python3 scripts/build_full_cheatsheet_html.py
  ```
* **Charte de la Cheat Sheet A4** :
  - **Fichier généré** : [glossaire_cheatsheet_complet.html](./glossaire_cheatsheet_complet.html)
  - **Dimensions** : A4 portrait (210mm x 297mm), 5 mots par page.
  - **Styles** : Fond blanc pur (`#FFFFFF`), en-têtes couleur Fig (`#18093B`), bordures de cartes subtiles gris clair (`#e2e8f0`), badges de types de mots en jaune sur noir (`#FFFF77` sur `#18093B`), disposition horizontale côte-à-côte des pages à l'écran.

---

## 8. Templates Spéciaux de Projet Fil Rouge (`PROJET - ...`)

Ces templates ne sont pas destinés au découpage standard des leçons (ils sont exclus du menu de sélection de Vibe Slicer) mais servent à générer la suite complète de suivi de projet fil rouge. L'IA peut itérer avec l'utilisateur sur le concept du projet puis générer un JSON unique contenant la séquence de ces slides adaptées au sujet.

### Ordre Séquentiel de gauche à droite
Les 13 slides doivent obligatoirement être générées dans cet ordre chronologique :
1. `PROJET - BRIEF` : Le brief client exposant le problème et le besoin concret.
2. `PROJET - PERSONA` : Portrait de l'utilisateur final avec ses contraintes et les solutions d'interface décidées.
3. `PROJET - USER STORY` : Vision du projet, nom de l'application et les 3 User Stories clés définissant le MVP.
4. `PROJET - CAHIER` : Le fichier de spécifications fonctionnelles et techniques simplifié (`cahier-des-charges.txt`).
5. `PROJET - DESIGN 5` : L'extrait de fichier de configuration agent (`agent.md` ou `instructions.md`) imposant les règles de conception.
6. `PROJET - PROMPT 1` : Première partie du Prompt Zéro (le contexte général et l'utilisateur).
7. `PROJET - PROMPT 2` : Deuxième partie du Prompt Zéro (le périmètre MVP strict à ne pas dépasser).
8. `PROJET - PROMPT 3` : Troisième partie du Prompt Zéro (la stack technique verrouillée avec badges).
9. `PROJET - PROMPT 4` : Quatrième partie du Prompt Zéro (l'amorce de démarrage de la première User Story).
10. `PROJET - DESIGN 1` : L'adaptation de design (Espacement/Respiration) avec démonstration Avant/Après.
11. `PROJET - DESIGN 2` : L'adaptation de design (Contraintes d'ergonomie et adaptabilité mobile-first).
12. `PROJET - DESIGN 3` : L'adaptation de design (Charte graphique, Dark Mode et couleur d'accent).
13. `PROJET - DESIGN 4` : L'adaptation de design (Hiérarchie visuelle, contrastes et lisibilité des textes).

### Dictionnaire des calques pour l'injection JSON
Lors de la génération du contenu de ces slides par l'IA, les clés de l'objet `content` doivent correspondre exactement aux textes d'origine ci-dessous pour être injectées dans les bons calques Figma (le plugin Figma fera l'association exacte) :

* **`PROJET - BRIEF`**
  - Clés texte : `Titre`, `Titre Intro`, `Intro`, `Titre 1`, `Texte 1`
  - Clé image : `image` (Illustration photoréaliste de l'univers métier)
* **`PROJET - PERSONA`**
  - Clés texte : `Titre`, `Intro`, `Alexandre` (nom), `Commercial Terrain` (rôle), `En déplacement permanent` (critère 1), `Utilisation 100% sur Smartphone` (critère 2), `Ultra-pressé entre deux RDV` (critère 3), `L'Interface Générée (UX/UI)`, `Mobile-first : Grands boutons faciles à presser su` (ergonomie UX 1), `Mode Sombre : Activé par défaut pour réduire la fa` (ergonomie UX 2), `Action Rapide : Accès immédiat et omniprésent au b` (ergonomie UX 3), `Le Périmètre du MVP`, `Action unique ultra-optimisée : Ajouter un nouveau` (MVP 1), `Pas de superflu : Aucune fonctionnalité d'analyse ` (MVP 2)
  - Clés pictos : `Picto 1`, `Picto 2`, `Picto 3`
* **`PROJET - USER STORY`**
  - Clés texte : `Titre`, `Intro`, `Application` (Nom du MVP), `\"Permettre au commercial d'ajouter une note post-R` (US Principale), `Créer l'écran d'accueil avec un énorme bouton \"Ajo` (US MVP 1), `Construire le formulaire modal rapide : 3 champs (` (US MVP 2), `Gérer la sauvegarde fictive et afficher un toast d` (US MVP 3)
  - Clés pictos : `Picto 1` (Icône d'illustration de l'appli), `Picto 2` (Icône d'action)
* **`PROJET - CAHIER`**
  - Clés texte : `Titre`, `Intro`, `Cahier-des-charges.txt` (titre fichier), `Vision & Persona`, `**Projet :** Créer une Landing Page \"Waitlist\" pou` (description projet), `**Cible :** Sarah, 28 ans, solopreneur et digital ` (cible), `**Sensibilité :** Très attachée à l'esthétique (\"v` (sensibilité), `Périmètre (MVP)`, `Le projet est un One-Pager sans backend complexe ni` (MVP desc), `User Stories`, `En tant que Sarah, je veux un Hero Header massif p` (US 1), `En tant que Sarah, je veux un formulaire d'inscrip` (US 2)
* **`PROJET - DESIGN 5`**
  - Clés texte : `Titre`, `Intro`, `Agent.md` (nom fichier), `\"L'approche doit être strictement Mobile-First. Le` (extrait règle design), `Survol (Hover)` (titre d'effet)
  - Clés pictos : `Picto 1`
* **`PROJET - PROMPT 1`**
  - Clés texte : `Titre`, `Intro`, `PROMPT.md` (nom fichier), `Agis comme un développeur Frontend Expert en UX Mo` (rôle IA), `# 1. CONTEXTE & PERSONA`, `Tu vas coder une application "Mini-CRM".` (contexte), `L'utilisateur final est Alexandre, un commercial t` (persona), `Cahier des charges :`, `Alexandre, Commercial` (badge), `Utilisation 100% sur mobile en voiture.` (critère 1), `Plutôt que de devoir dicter chaque taille de bouto` (critère 2)
* **`PROJET - PROMPT 2`**
  - Clés texte : `Titre`, `Intro`, `PROMPT.md`, `# 2. PÉRIMÈTRE (MVP)`, `L'application a un périmètre volontairement très r` (périmètre), `Saisir un Nom, Téléphone et Note.` (scope list 1), `Afficher un message de confirmation.` (scope list 2), `ATTENTION : NE CODE PAS de système de connexion (A` (warning/exclusions), `MVP: Ajouter un contact et une note (3 clics).` (résumé), `Créer l'écran d'accueil avec un énorme bouton \"Ajo` (US 1), `Construire le formulaire modal rapide : 3 champs (` (US 2), `Gérer la sauvegarde fictive et afficher un toast d` (US 3)
* **`PROJET - PROMPT 3`**
  - Clés texte : `Titre`, `Intro`, `PROMPT.md`, `# 3. STACK TECHNIQUE`, `Tu dois utiliser exclusivement les technologies su` (consigne), `Frontend : React avec TypeScript.` (tech 1), `Style : Tailwind CSS (pas de fichiers CSS customs)` (tech 2), `Icônes : Import depuis 'lucide-react'.` (tech 3), `Données : Fake data en dur dans les composants.` (tech 4), `Stack technique choisie :`, `React / Next.js` (badge tech 1), `La base solide et standardisée.` (desc tech 1), `Re` (label badge tech 1), `Tailwind CSS v4` (badge tech 2), `Crucial pour que l'IA style tout inline sans créer` (desc tech 2), `TW` (label badge tech 2), `Lucide React` (badge tech 3)
  - Clés pictos : `Picto 1` (Icône d'illustration stack)
* **`PROJET - PROMPT 4`**
  - Clés texte : `Titre`, `Intro`, `L'Amorce`, `Rappel : On ne demande jamais de tout coder d'un coup. Le Prompt Zéro se termine toujours par la première User Story et le squelette de l’application.`, `PROMPT.md`, `# PREMIÈRE ACTION (AMORCE)`, `Pour commencer, ne code pas toute l'application. G` (action d'amorce)
* **`PROJET - DESIGN 1`**
  - Clés texte : `Titre`, `Intro`, `Sans consigne`, `Avec consigne`, `Agent.md`, `\"Utiliser des paddings et margins très généreux. L` (instruction d'espacement)
* **`PROJET - DESIGN 2`**
  - Clés texte : `Titre`, `Intro`, `Agent.md`, `\"L'approche doit être strictement Mobile-First. Le` (instruction ergonomie), `Bouton` (nom de l'élément visuel)
* **`PROJET - DESIGN 3`**
  - Clés texte : `Titre`, `Intro`, `Agent.md`, `\"L'approche doit être strictement Mobile-First. Le` (instruction couleurs/Dark mode), `Dark Mode + Accent` (nom du thème)
* **`PROJET - DESIGN 4`**
  - Clés texte : `Titre`, `Intro`, `Agent.md`, `\"L'approche doit être strictement Mobile-First. Le` (instruction typographie/hiérarchie), `Titre Principal` (badge 1), `Texte de corps avec un gris plus clair pour créer ` (badge 2)

### Règles d'adaptation dynamique du projet
Tous les calques textuels ci-dessus contiennent des exemples par défaut (ex: Alexandre, CRM mobile, Tailwind, etc.). L'IA doit obligatoirement réécrire et adapter l'ensemble de ces calques au sujet de projet validé avec l'utilisateur.

> [!WARNING]
> **Calques Statiques (INTRO & NUMÉROS)** : Les calques textuels nommés exactement `"Intro"` ainsi que les calques contenant uniquement des chiffres (puces comme `"1"`, `"2"`, `"3"`, etc.) ne doivent **jamais** être modifiés ni inclus dans les clés d'injection JSON. Ils doivent conserver leur valeur par défaut issue du template Figma.

- *Exemple (Projet 3D pour adolescents)* : Le Persona devient un adolescent gamer, l'application devient un visualiseur de modèles 3D, la stack technique impose Three.js/React Three Fiber, les règles de design de l'Agent.md concernent le chargement progressif des géométries et l'adaptation à la souris/tactile pour la rotation de caméra.
- *Exemple (Projet Cuisinier)* : Le Persona est un chef de cuisine les mains occupées, les consignes d'ergonomie imposent le contrôle vocal ou des boutons géants, la stack utilise un framework léger de reconnaissance vocale.


