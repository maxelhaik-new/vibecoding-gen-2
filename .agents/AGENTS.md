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
## 6. Cohérence des transitions de fin de leçon (En Bref)
- **Règle** : Lors de la rédaction de la diapositive de synthèse finale (template `VIBECODING - FIN`), l'encart `EN BREF` (`Texte Bulle` dans le JSON) doit obligatoirement faire une transition ou référence explicite vers la leçon suivante de la structure, ou vers le chapitre suivant s'il s'agit de la dernière leçon du chapitre.
- **Application** :
  - Consulter systématiquement le plan de formation global [plan-formation-vibe-coding.md](file:///Users/maximeelhaik/Documents/VIBE%20CODING%20GENERATION/plan-formation-vibe-coding.md) pour identifier précisément l'intitulé ou la thématique de la leçon ou du chapitre suivant avant d'écrire cette section.

## 7. Lecture systématique des règles de rédaction (Génération IA directe)
- **Règle** : Lorsqu'il vous est demandé de rédiger, créer ou générer une leçon ou un contenu directement dans le chat (sans recourir au pipeline Python ou à l'API), vous devez obligatoirement prendre connaissance des règles de style pédagogique.
- **Application** :
  - Lisez systématiquement le fichier complet [brand_voice.md](file:///Users/maximeelhaik/Documents/VIBE%20CODING%20GENERATION/brand_voice.md) via l'outil approprié (`view_file`) avant de générer le moindre texte. Ne vous fiez pas uniquement à votre mémoire de contexte pour le ton de voix.

## 8. Pas de numérotation manuelle dans les items à pastilles graphiques
- **Règle** : Pour les templates comportant déjà des éléments graphiques de numérotation (comme `VIBECODING - EXERCICE PRATIQUE` avec les pastilles `Numero 1` / `01`, `02`, `03`..., `VIBECODING - PROCESS` ou `VIBECODING - EXERCICE`), l'agent ne doit **jamais** inclure de numérotation textuelle (ex: '1.', '2.', '3.') au début des chaînes de texte (`Question 1`, `Question 2`, `Texte 2`, etc.).
- **Application** :
  - Rédiger directement le texte de la consigne ou de la question (ex: `"Exporter le projet depuis AI Studio..."` au lieu de `"1. Exporter le projet..."`).

## 9. Icône d'application sur-mesure pour le template USER STORIES
- **Règle** : Pour les slides basées sur le template `VIBECODING - USER STORIES`, l'agent doit toujours spécifier une icône sur-mesure adaptée au sujet du projet (`Picto 1` ou icône Iconify correspondante) pour alimenter le bloc de l'application à gauche.
- **Application** :
## 10. Style photoréaliste obligatoire pour les images des leçons pratiques (Brief)
- **Règle** : Lors de la création d'une leçon pratique ou d'un projet fil rouge (templates `VIBECODING - BRIEF` et `VIBECODING - BRIEF ALT`), l'image d'illustration doit obligatoirement être générée avec le style photoréaliste (`--style photorealistic`). Elle doit illustrer le domaine d'activité concret du brief (ex: atelier, bureau, cuisine, logistique, santé), sans aucun schéma, ni interface d'application ou capture d'écran.
- **Application** :
  - Identifier le domaine métier du projet fil rouge.
  - Exécuter la génération d'image systématiquement avec le paramètre `--style photorealistic`.


