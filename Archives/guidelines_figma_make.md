# Guide de Conception Pédagogique et Figma Slide Generator

Ce document définit les règles de travail pour la création de leçons de formation et leur génération dans Figma via le plugin **Figma Slide Generator**.

---

## 1. LE FLUX DE TRAVAIL EN 3 PHASES

Toutes les leçons sont conçues de manière itérative suivant ce processus :

1. **Phase: Découpage (`DECOUPE`)** :
   * **Flux d'importation** : Le plan de leçon brut peut être copié par l'utilisateur dans un fichier `PLAN_M{n}C{c}L{l}.md` dans l'arborescence du projet, ou collé directement dans le chat (auquel cas l'agent crée automatiquement le fichier `PLAN.md` brut au bon endroit).
   * **Adaptation & Découpage** : Si le plan provient de Notion, la leçon n'est pas encore découpée précisément slide par slide (sujets principaux et points à aborder uniquement, sans templates choisis). L'agent doit découper la leçon de manière optimale en se basant sur les sujets et les layouts disponibles dans [templates_charter.md](./templates_charter.md).
     * **Règle de variété visuelle** : Interdire absolument les suites de plus de 2 slides `VIBECODING - CONCEPT` ou `VIBECODING - DEFINITION` consécutives.
     * **Règle de regroupement** : Fusionner et regrouper les énumérations (listes d'outils, profils, étapes) dans des templates multi-blocs (3 BLOCS, 4 BLOCS, 5 BLOCS, 6 BLOCS) au lieu de créer une slide concept individuelle pour chaque point, afin d'adapter la longueur de la leçon à sa complexité.
   * **Restitution** : L'agent propose à l'utilisateur ce découpage sous forme de **tableau Markdown** slide par slide, détaillant pour chaque slide le sujet/concept traité et le template proposé.

2. **Phase: Écriture (`ECRIS`)** :
   * Le plan détaillé `PLAN_M{n}C{c}L{l}.md` sert de base pour l'écriture.
   * **Adaptation technique & Reformatage** : Cette phase correspond à la réécriture et au reformatage des textes bruts (notamment d'Opus) pour les adapter aux contraintes physiques et éditoriales :
     * **Règles d'écriture** : Consulter systématiquement le fichier [brand_voice.md](./brand_voice.md) pour appliquer le ton Wemodo (bannir "tu"/"vous", phrases courtes, verbes à l'infinitif pour les listes).
     * **Pas de numérotation** : Supprimer systématiquement tout numéro ou chiffre (ex: "1.", "2.") au début des titres de blocs ou d'objectifs, car Figma gère déjà l'affichage des puces numérotées.
     * **Gestion des longueurs** :
       * *Règle absolue* : Le texte doit obligatoirement respecter les limites `min_lenght` et `max_lenght` définies dans `templates.json`.
       * *Règle de qualité* : Privilégier une écriture naturelle, fluide et de haute qualité. Ne **jamais** répéter artificiellement des mots ou des phrases pour atteindre une longueur minimale ou s'approcher d'une cible.
       * *Cibles* : Les valeurs de `target_lenght` servent d'idéal esthétique, mais il est tout à fait acceptable d'être en dessous tant que le texte respecte le `min_lenght`.
     * **Icônes (`Picto 1`, `Picto 2`, etc.)** : Renseigner pour chaque clé Picto présente dans le template un identifiant d'icône au format `mdi:nom-icone` issu de [icon_mapping.md](./icon_mapping.md). Ne pas laisser ces champs vides.
     * **Proposition de sujet d'image** : Pour chaque slide avec image, indiquer le sujet d'illustration proposé dans la lecture humaine sous ce format :
       > 🖼️ **Image suggérée** : *[Description visuelle du sujet]*
       > **Style** : `[nom-du-style]` | **Ratio** : `[ratio]`

       Ce sujet est soumis à correction avant toute génération.

   > ⚠️ **RÈGLE DE PHASE** : L'IA exécute uniquement les phases demandées par l'utilisateur. Elle n'anticipe jamais la suivante. Si l'utilisateur demande plusieurs phases d'un coup (ex: « écris et génère »), toutes sont exécutées en séquence.

3. **Phase: Génération (`GÉNÈRE`)** :
   Une fois les textes et sujets d'images validés, effectuer systématiquement et en une seule passe :
   1. **Génération automatique des images** : Exécuter le script `scripts/generate_nano_banana.py` pour chaque slide utilisant un template contenant une image (ex: `VIBECODING - 3 BLOCS - PHOTO`, `VIBECODING - 3 BLOCS - PHOTO - ALT`, `VIBECODING - IMAGE`, `VIBECODING - USE CASE`, `VIBECODING - FOCUS OUTIL`, `PODIUM`), avec le concept/sujet (soit validé à l'étape ECRIS, soit déduit du contexte de la slide si absent).
   2. **Production du JSON** : Produire le JSON final prêt à coller dans le plugin Figma. Inclure les URLs `http://localhost:8080/assets/[fichier_genere.png]` dans les champs `"image"`. S'assurer que tous les calques du template (y compris les clés `Picto X` et la clé `"image"`) sont présents, et que la clé `"lessonTitle"` à la racine est configurée avec le Code de la leçon (ex: `"M1C3L7"`, `"M1C3L8"`) et non pas son titre textuel.
   3. **Légende Source** : Pour chaque image IA, renseigner le champ `"Source"` au format obligatoire : `"Source : [Sujet court] - Illustration générée par IA - Maxime Elhaik"`.

---

## 2. RÈGLES RÉDACTIONNELLES

Consulter et appliquer systématiquement les directives de ton, de style, le vocabulaire recommandé et le vocabulaire interdit détaillés dans le fichier @brand_voice.md.

---

## 3. CATALOGUE DES TEMPLATES & CLÉS JSON

The structure of the templates, their validation status (validated / pending) and their character constraints can be found in the following file:
- **Source de vérité technique** : [templates.json](./templates.json)
- **Charte de choix des layouts** : [templates_charter.md](./templates_charter.md)

L'IA lit et applique dynamiquement les règles de validation définies dans `templates.json` ainsi que la charte de choix de templates pour le découpage.

---

## 4. FORMAT JSON ATTENDU POUR LA GÉNÉRATION

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
      "template": "VIBECODING - 3 BLOCS - LARGE TEXT",
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

## 5. CHOIX DES ICÔNES (PICTOGRAMMES)

Consulter et appliquer systématiquement la cartographie des icônes recommandées, leurs usages et leurs thématiques détaillés dans le fichier @icon_mapping.md.

Utiliser uniquement les préfixes officiels d'Iconify pris en charge par le plugin (ex: `mdi:` pour Material Design Icons).

---

## 6. RÈGLES DE GÉNÉRATION D'IMAGES PAR IA

Pour homogénéiser la création d'images d'illustration sur l'ensemble des leçons :

1. **Outil et Modèle par défaut** : 
   - Le processus de génération d'images par défaut doit systématiquement être celui développé dans le script local [generate_nano_banana.py](./scripts/generate_nano_banana.py) (utilisant le modèle Gemini 3.1 Flash Image, alias Nanobanana 2).
   - Ce script local surcharge l'outil de génération interne d'Antigravity (basé sur Imagen) lorsqu'aucune spécification de modèle n'est donnée par l'utilisateur.

2. **Adaptation Automatique du Ratio (Sur-Mesure)** :
   - Avant de lancer la génération pour un template contenant une illustration (ex: `VIBECODING - 3 BLOCS - PHOTO` ou `VIBECODING - FOCUS OUTIL`), l'agent doit récupérer les dimensions exactes du composant d'image cible (calque nommé `Image Fond`, `photo`, ou similaire).
   - Si l'agent a accès à Figma via les outils MCP, il doit obtenir la largeur (`width`) et la hauteur (`height`) de la forme d'accueil de l'image, calculer le ratio d'aspect le plus proche (par exemple `3:4`, `16:9`, `1:1`, `4:3`, `9:16`) et le passer au paramètre `--aspect-ratio` du script.
   - En l'absence d'accès direct à l'API Figma, l'agent utilisera les ratios de référence pour les templates connus (ex: `3:4` pour le bloc vertical de `VIBECODING - 3 BLOCS - PHOTO`) à la place du ratio par défaut défini dans le fichier `.env`.

3. **Exemple d'appel automatique par l'Agent** :
   ```bash
   python3 scripts/generate_nano_banana.py --concept "sujet_choisi" --bg fig_ou_pink --aspect-ratio ratio_calcule
   ```
---

## 7. Légende Obligatoire pour les Images Générées par IA

Pour toute slide intégrant une illustration générée par IA (via `generate_nano_banana.py` ou tout autre outil d'IA), le champ `Source` du JSON **doit toujours** respecter ce format :

```
Source : [Sujet] - Illustration générée par IA - Maxime Elhaik
```

Le script `generate_nano_banana.py` affiche automatiquement la légende formatée après chaque génération. Copier-coller directement dans le champ `Source` du JSON Figma.
