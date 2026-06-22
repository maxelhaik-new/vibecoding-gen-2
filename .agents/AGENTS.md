# Règles de comportement de l'agent

## 1. Écriture séquentielle des leçons
- **Règle** : Lors de la rédaction ou de la modification de plusieurs leçons (par exemple, lors de l'écriture d'un chapitre entier), l'écriture doit impérativement se faire de manière **séquentielle** (une leçon après l'autre).
- **Application** : 
  - Ne lancez jamais de sous-agents d'écriture en parallèle pour plusieurs leçons.
  - Traitez les leçons l'une après l'autre dans la session principale, ou lancez un seul sous-agent d'écriture à la fois, attendez sa complétion et la vérification des fichiers écrits avant de passer à la leçon suivante.

## 2. Optimisation de l'accès à `templates.json`
- **Règle** : Ne lisez jamais le fichier `templates.json` en entier avec `view_file` (ce fichier fait plus de 2600 lignes et consomme énormément de tokens).
- **Application** :
  - Utilisez scrupuleusement le résumé des limites de caractères et des champs des templates déjà fourni dans votre prompt système ou dans la définition du sous-agent.
  - Si une vérification spécifique d'un template est absolument nécessaire et absente du prompt, utilisez l'outil `grep_search` avec le nom du template comme requête pour identifier la ligne exacte, puis visualisez uniquement la plage de lignes correspondante avec `view_file` (en spécifiant `StartLine` et `EndLine`).

## 3. Utilisation obligatoire du pipeline Python pour la découpe et l'écriture
- **Règle** : Pour toute opération de découpe (decoupe) ou d'écriture (ecris) des leçons d'un chapitre, l'agent ne doit prendre aucune initiative de rédaction manuelle ou d'invocation de sous-agents personnalisés. Il doit obligatoirement appeler le script [generate_course_pipeline.py](file:///Users/maximeelhaik/Documents/VIBE%20CODING%20GENERATION/scripts/generate_course_pipeline.py) avec les commandes appropriées.
- **Application** :
  - Utilisez la commande `python3 scripts/generate_course_pipeline.py <chapitre> --phase decoupe` ou `python3 scripts/generate_course_pipeline.py <chapitre> --phase ecris` pour laisser le script orchestrer les phases de création et appeler les API sous-jacentes avec la gestion optimisée des caches.
  - **Strict respect des phases** : L'agent doit impérativement s'arrêter à la phase spécifiquement demandée par l'utilisateur (ex. s'arrêter après `--phase decoupe` et nettoyer le fichier `FINAL` si seule la découpe a été demandée). Il ne doit jamais prendre l'initiative de chaîner les phases (`ecris`, `genere`) de son propre chef ou de surcharger les modèles spécifiés par défaut dans le fichier de configuration `.env` sans instruction explicite.

## 4. Fichiers d'instructions de référence et interdiction des doublons
- **Règle** : Les agents ne doivent jamais créer de nouveaux fichiers de règles ou de guides de conception de leur propre initiative (ce qui crée des duplications comme celle observée entre `guidelines_figma_make.md` et `ai.md`). Tous les agents travaillant dans ce workspace doivent suivre uniquement les sources de vérité officielles établies.
- **Application** :
  - **Instructions prioritaires de workspace** : Le fichier [ai.md](file:///Users/maximeelhaik/Documents/VIBE%20CODING%20GENERATION/ai.md )à la racine contient l'ensemble des règles techniques (flux, JSON attendu, ratios d'image). C'est la source de vérité de workspace pour l'IA.
  - **Ton de voix et style rédactionnel** : Le fichier [brand_voice.md](file:///Users/maximeelhaik/Documents/VIBE%20CODING%20GENERATION/brand_voice.md) à la racine contient l'ensemble des règles de style pédagogique (ton, blacklist de mots, grammaire).
  - **Comportement technique des agents** : Le présent fichier [AGENTS.md](file:///Users/maximeelhaik/Documents/VIBE%20CODING%20GENERATION/.agents/AGENTS.md) régit les modes opératoires (séquentialité, pipeline Python, gestion de `templates.json`).
  - **Pas de démultiplication** : Si des règles doivent être ajoutées, modifiées ou clarifiées, elles doivent être intégrées dans ces trois fichiers existants plutôt que de créer des guides isolés.

## 5. Gestion des timers de tâche de fond (Wait timers)
- **Règle** : L'agent ne doit pas programmer de longs délais d'attente (supérieurs à 10 ou 15 secondes) lorsqu'il attend la complétion d'un script ou d'une commande système en tâche de fond.
- **Application** :
  - Configurez des timers de `10` secondes maximum via l'outil `schedule` pour inspecter et relancer plus fréquemment le statut de la tâche, permettant une boucle d'itération rapide avec l'utilisateur.


