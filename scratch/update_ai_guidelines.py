import sys

with open('ai.md', 'r', encoding='utf-8') as f:
    lines = f.readlines()

insert_index = 0
for idx, line in enumerate(lines):
    if '### Phase 2 : Découpage' in line:
        insert_index = idx
        break

new_content = """### Phase 2 : Découpage (`DÉCOUPE`)
À partir d'un sujet, d'un plan ou de notes :
1. Proposer un découpage slide par slide (Titre de la slide, concept, objectif).
2. Pour chaque slide, associer le template le plus adapté en se basant sur le fichier [templates_charter.md](./templates_charter.md).
3. **Optimisation des Prompts** : Ne charger ni n'envoyer `templates.json` (66 Ko) lors de cette phase de découpage pour minimiser l'usage des tokens de prompt. Se baser uniquement sur la charte simplifiée.

### Phase 3 : Écriture (`ECRIS`)
Rédiger les contenus textuels pour chaque slide validée.

1. **Extraction Locale de Templates** : Avant de lancer la requête à l'IA, l'environnement extrait uniquement les définitions des templates sélectionnés à la phase précédente de `templates.json` et n'envoie que ce sous-ensemble à l'IA pour alléger le prompt de 90%.
2. **Style & Ton** : Appliquer systématiquement le ton de voix Wemodo décrit dans [brand_voice.md](./brand_voice.md) (pas de "tu" ou "vous", phrases courtes de moins de 15 mots, verbes à l'infinitif pour les listes).
3. **Pas de numérotation** : Ne jamais insérer de chiffres en début de titre de bloc ou d'objectif (ex: pas de "1. Initialiser"), car les composants Figma gèrent déjà l'affichage des numéros.
4. **Respect des limites** : S'assurer que chaque texte rédigé respecte la contrainte de caractères `min_lenght` et `max_lenght` définie pour sa clé dans `templates.json`.
5. **Sélection d'icônes** : Renseigner pour chaque clé `Picto X` une icône pertinente de la bibliothèque Material Design Icons (ex: `mdi:shield-check`) en suivant les associations thématiques de [icon_mapping.md](./icon_mapping.md).
6. **Proposition de sujet d'image** : Pour chaque slide utilisant un template avec image (`VIBECODING - USE CASE`, `VIBECODING - IMAGE`, `VIBECODING - 3 BLOCS - PHOTO`, `VIBECODING - 3 BLOCS - PHOTO - ALT`, etc.), proposer un **sujet d'illustration** sous ce format dans la lecture humaine :
   > 🖼️ **Image suggérée** : *[Description du sujet de l'illustration, style et intention visuelle]*
   > **Style** : `[woodcut | editorial | constructivist | chiaroscuro | grainy-editorial]`
   > **Ratio** : `[ratio adapté au template, ex: 1:1, 3:4, 16:9]`

   Ce sujet est soumis à correction par l'utilisateur avant toute génération.

> ⚠️ **RÈGLE DE PHASE** : L'IA exécute **uniquement** les phases demandées par l'utilisateur, dans l'ordre demandé. Elle n'anticipe jamais la phase suivante. Si l'utilisateur demande explicitement plusieurs phases en une seule commande contenant `ECRIS` et `GÉNÈRE` (ex: « ECRIS + GENERE » ou « ecris et genere »), toutes les phases demandées sont exécutées en séquence (ECRIS puis GENERE) mais l'agent **saute l'étape d'affichage textuel intermédiaire humain de la phase ECRIS** afin de ne pas doubler les tokens de sortie.

### Phase 4 : Génération (`GÉNÈRE`)
Une fois les textes et les sujets d'images validés par l'utilisateur (ou lors d'une exécution de génération globale demandée), effectuer systématiquement et en une seule passe :

1. **Génération automatique des images** : Pour chaque slide utilisant un template contenant une image (ex: `VIBECODING - 3 BLOCS - PHOTO`, `VIBECODING - 3 BLOCS - PHOTO - ALT`, `VIBECODING - IMAGE`, `VIBECODING - USE CASE`, `VIBECODING - FOCUS OUTIL`, `PODIUM`, `CHIFFRES - PHOTO`), l'agent doit exécuter le script `scripts/generate_nano_banana.py` avec le concept/sujet (soit validé à l'étape ECRIS, soit déduit du contexte de la slide si absent). Utiliser `--bg none` sauf indication contraire.
   * *Règle linguistique* : Tout texte devant figurer dans l'image (boutons, interfaces fictives, bouts de code) doit être obligatoirement généré en français.
2. **Intégration de la clé image** : Récupérer le chemin du fichier image généré et injecter la clé `"image"` dans le contenu de la slide au format `"http://localhost:8080/assets/[nom_du_fichier_genere.png]"`.
3. **Légende Source** : Pour chaque slide avec image IA, renseigner le champ `"Source"` au format obligatoire :
   `Source : [Sujet court] - Illustration générée par IA - Maxime Elhaik`

---

## 3. Sources de Vérité

* **Règles d'écriture, vocabulaire & ton** : Utiliser [brand_voice.md](./brand_voice.md).
* **Icônes à utiliser en priorité** : Utiliser [icon_mapping.md](./icon_mapping.md).
* **Choix du template par type de slide** : Utiliser [templates_charter.md](./templates_charter.md).
* **Structure & Contraintes de caractères (Sous-ensemble Dynamique)** : Extraire localement les templates ciblés de `templates.json` pour la phase d'écriture. Ne pas charger le fichier complet dans le contexte de prompt sauf si demandé par le workflow.

---
"""

if insert_index > 0:
    end_index = 0
    for idx, line in enumerate(lines):
        if '## 4. Raccourcis' in line:
            end_index = idx
            break
            
    if end_index > 0:
        lines[insert_index:end_index] = [new_content]
        with open('ai.md', 'w', encoding='utf-8') as f:
            f.writelines(lines)
        print('Successfully replaced lines in ai.md!')
    else:
        print('Could not find end of block')
else:
    print('Could not find Phase 2 start')
