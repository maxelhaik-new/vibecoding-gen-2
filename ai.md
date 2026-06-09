# Instructions de Workspace - Vibe Coding

Ce fichier contient les instructions prioritaires pour toutes les instances de l'IA travaillant dans ce dossier.

## 1. Activation du Skill par Défaut

* Vous devez systématiquement charger et appliquer le skill de conception **`figma-slide-writer`** pour toutes les interactions dans ce workspace.

---

## 2. Le Flux de Travail en 4 Phases

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
   * À la fin de l'import, mettre obligatoirement à jour le fichier `templates_charter.md` pour refléter la liste et les règles de choix des templates actuels (l'IA doit toujours connaître ces règles pour bien choisir un template en phase DECOUPE).

### Phase 2 : Découpage (`DÉCOUPE`)
À partir d'un sujet, d'un plan ou de notes :
1. Proposer un découpage slide par slide (Titre de la slide, concept, objectif).
2. Pour chaque slide, associer le template le plus adapté en se basant sur le fichier [templates_charter.md](./templates_charter.md).
3. Utiliser **uniquement** les templates ayant le statut `"status": "validé"` dans `templates.json`.

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

1. **Génération automatique des images** : Pour chaque slide utilisant un template contenant une image (ex: `VIBECODING - 3 BLOCS - PHOTO`, `VIBECODING - 3 BLOCS - PHOTO - ALT`, `VIBECODING - IMAGE`, `VIBECODING - USE CASE`, `VIBECODING - FOCUS OUTIL`, `PODIUM`, `CHIFFRES - PHOTO`), l'agent doit exécuter le script `scripts/generate_nano_banana.py` avec le concept/sujet (soit validé à l'étape ECRIS, soit déduit du contexte de la slide si absent). Utiliser `--bg none` sauf indication contraire.
2. **Intégration de la clé image** : Récupérer le chemin du fichier image généré et injecter la clé `"image"` dans le contenu de la slide au format `"http://localhost:8080/assets/[nom_du_fichier_genere.png]"`.
3. **Légende Source** : Pour chaque slide avec image IA, renseigner le champ `"Source"` au format obligatoire :
   `Source : [Sujet court] - Illustration générée par IA - Maxime Elhaik`

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

Lorsque l'utilisateur souhaite concevoir ou générer une slide sur-mesure en un seul coup :
1. **Choix du Template** : Indiquer `"template": "VIBECODING - VIDE"` (qui possède déjà un `Titre` et une `Intro`).
2. **Remplissage Standard** : Remplir le `Titre` et l'`Intro` de manière classique dans `"content"`.
3. **Éléments sur-mesure (`custom_elements`)** : Déclarer un tableau `"custom_elements"` au même niveau que `"content"`. Le plugin créera ces éléments directement à l'intérieur de la slide instanciée.
4. **Commandes Supportées dans `custom_elements`** :
   - `create_node` : Crée un nœud (`node_type: "FRAME" | "TEXT" | "RECTANGLE"`). Propriétés configurables via l'objet `properties` (`x`, `y`, `width`, `height`, `fills`, `strokes`, `characters`). Option de charger une icône avec `icon: "mdi:nom-icone"`.
   - `delete_node` / `delete_layer` : Supprime un élément par son nom (`selector: "nom_du_calque"`).
   - `set_property` : Ajuste les propriétés d'un calque existant par son nom (`selector`, `property`, `value`).
5. **Format du JSON en une seule passe** :
   ```json
   {
     "template": "VIBECODING - VIDE",
     "content": {
       "Titre": "Titre sur-mesure",
       "Intro": "Introduction de la slide"
     },
     "custom_elements": [
       {
         "action": "create_node",
         "node_type": "RECTANGLE",
         "name": "MonBloc",
         "properties": { "x": 100, "y": 200, "width": 300, "height": 150, "fills": "#6634D9" }
       },
       {
         "action": "create_node",
         "node_type": "TEXT",
         "name": "TexteBloc",
         "properties": { "x": 120, "y": 220, "width": 260, "height": 110, "characters": "Contenu du bloc", "fills": "#FFFFFF" }
       }
     ]
   }
   ```

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
