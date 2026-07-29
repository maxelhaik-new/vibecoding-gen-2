# Plan de la leçon M2C3L8 — Comprendre le process itératif en Vibe Coding

Cette leçon explique comment mener des cycles d'itération efficaces avec l'IA. Elle détaille comment structurer ses retours et faire des feedbacks constructifs (concrets et actionnables) plutôt que vagues, notamment pour le style, les erreurs de code et la logique.

## Découpage des Slides (7 slides)

1. **Slide 1 : Cover** (`VIBECODING - COVER`)
   - Titre : Le process itératif en Vibe Coding
   - Sous-titre : Apprendre à dialoguer et corriger l'agent

2. **Slide 2 : Introduction** (`VIBECODING - INTRO`)
   - Titre : Itérer pour réussir
   - Accroche : Le Vibe Coding n'est pas un processus à étape unique. On n'obtient jamais le résultat final du premier coup. Voyons comment entrer dans un cycle d'itération efficace.
   - Bloc 1 : Le principe du dialogue (Voyons comment échanger avec l'agent comme avec un collègue développeur.)
   - Bloc 2 : Les types de retours (Focus sur la différence fondamentale entre retours vagues et retours précis.)
   - Bloc 3 : L'art de la correction (Découvrons comment guider l'IA vers la solution sans la perdre.)

3. **Slide 3 : Définition** (`VIBECODING - DEFINITION`)
   - Titre : La boucle d'itération
   - Mot à définir : Boucle d'itération
   - Définition : Le cycle répété de génération, de test, de feedback et de correction entre le Vibe Coder et l'IA. Au lieu de demander des changements massifs, on avance par micro-ajustements successifs en testant le code après chaque modification.
   - Bulle : EN BREF : Tester chaque modification de l'IA immédiatement évite d'accumuler des bugs impossibles à identifier plus tard.

4. **Slide 4 : Cycle** (`VIBECODING - CYCLE`)
   - Titre : Les 4 réflexes clés en Vibe Coding
   - Intro : Pour structurer efficacement son travail, on doit activer ces quatre réflexes systématiquement à chaque session de code.
   - Étape 1 : UN SEUL PROMPT (Découper chaque demande en étapes simples. Ne jamais tout demander à la fois.)
   - Étape 2 : VOIR LE RENDU (Vérifier le rendu entre chaque génération pour détecter les bugs au plus tôt.)
   - Étape 3 : DÉCRIRE LE BUG (Nommer l'élément, décrire précisément le problème et éviter les retours vagues.)
   - Étape 4 : SAUVEGARDER (Sécuriser ce qui fonctionne et cibler la portée de chaque nouvelle modification.)

5. **Slide 5 : Process** (`VIBECODING - PROCESS`)
   - Titre : Corriger le code en 4 étapes
   - Étape 1 : CONSTATER (Repérer le comportement inattendu ou l'erreur de console)
   - Étape 2 : CIBLER (Identifier le fichier et la fonction concernés)
   - Étape 3 : PROMPTER (Rédiger un feedback précis avec le message d'erreur exact)
   - Étape 4 : VALIDER (Tester la correction avant de passer à l'étape suivante)

6. **Slide 6 : Comparaison** (`VIBECODING - COMPARAISON`)
   - Titre : Faire un feedback constructif à l'IA
   - Intro : Le feedback constructif : on donne des directions claires à l'IA, même lorsqu'elles sont correctives.
   - Titre A (À éviter) : À ÉVITER
   - Titre B (Constructif) : CONSTRUCTIF
   - Item 1 : STYLE GRAPH
   - Item 2 : ERREUR
   - Item 3 : LOGIQUE
   - Item 4 : RETOUR
   - Texte A Item 1 : Le bouton est moche, change la couleur ou le style.
   - Texte A Item 2 : Ça ne marche pas du tout, répare le code.
   - Texte A Item 3 : La liste ne s'actualise pas.
   - Texte A Item 4 : C'est trop lent et mal codé, recommence.
   - Texte B1 : Applique la classe Tailwind bg-indigo-600 sur le bouton.
   - Texte B2 : Copier l'erreur console : TypeError dans TodoList.tsx.
   - Texte B3 : Vérifier si deleteTask vide le localStorage.
   - Texte B4 : Remplace le fetch par du React Query.

7. **Slide 7 : Focus / Cas concret** (`VIBECODING - USE CASE`)
   - Titre : Transmettre un bug à l'agent
   - Exemple de prompt de débogage contenant un copier-coller de stack trace ou d'erreur de console pour illustrer le feedback constructif.

8. **Slide 8 : Synthèse** (`VIBECODING - FIN`)
   - Titre : Ce qu'il faut retenir
   - L'itération est le cœur du Vibe Coding. Réussir son projet demande de savoir faire des retours précis et structurés à l'IA, plutôt que de rejeter en bloc les erreurs. En guidant l'agent avec des logs de console et des descriptions de bugs ciblées, on parvient rapidement à une application robuste et fonctionnelle.
   - Transition : La boucle d'itération est maîtrisée. Dans la leçon suivante : comment appréhender l'importance de la correction continue pour maintenir le code propre.

