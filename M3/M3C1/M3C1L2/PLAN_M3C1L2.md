# Plan de la leçon M3C1L2 — Présentation de Google AI Studio et des modèles Gemini

Cette leçon présente l'outil de prototypage Google AI Studio et la gamme de modèles Gemini (Flash et Pro) comme le laboratoire indispensable pour tester et valider les prompts du Vibe Coder avant de les intégrer dans du code.

## Découpage des Slides (9 slides)

1. **Slide 1 : Cover** (`VIBECODING - COVER`)
   - Titre : Découvrir Google AI Studio et les modèles Gemini
   - Sous-titre : L'atelier de prototypage rapide du Vibe Coder

2. **Slide 2 : Introduction** (`VIBECODING - INTRO`)
   - Titre : L'atelier de prototypage de Google
   - Accroche : Avant de coder dans son éditeur, on a besoin d'un espace pour tester les modèles de manière brute. Google AI Studio est le laboratoire idéal du Vibe Coder pour valider ses idées.
   - Bloc 1 : Le playground de test (Découvrir comment cet outil gratuit permet de tester des prompts complexes sans aucune interface intermédiaire.)
   - Bloc 2 : Choisir les modèles de Gemini (Sélectionner le modèle le plus adapté à la tâche de code, entre la vitesse de Flash et la puissance de Pro.)
   - Bloc 3 : Les variables de contrôle (Ajuster précisément la température de génération pour forcer l'IA à produire un code logique et structuré.)

3. **Slide 3 : 3 Colonnes** (`VIBECODING - 3 COLONNES`)
   - Titre : Pourquoi commencer par AI Studio ?
   - Intro : Avant d'ouvrir un IDE local, il faut absolument comprendre comment l'IA répond à un prompt. Google AI Studio est la salle d'entraînement idéale pour cela.
   - Colonne 1 : En navigateur / Zéro install. / Première prise en main sans friction / Aucune installation requise sur sa machine...
   - Colonne 2 : Gratuit pour démarrer / Zéro coût / Tester et se tromper librement / L'accès de base à l'API et à l'interface ne nécessite aucune carte bancaire...
   - Colonne 3 : Résultats immédiats / Boucle rapide / Comprendre les réactions de l'IA / On saisit un prompt de test et on observe la réponse...

4. **Slide 4 : 3 Blocs Photo** (`VIBECODING - 3 BLOCS - PHOTO - ALT`)
   - Titre : L'interface de Google AI Studio
   - Intro : Trois zones à identifier avant de commencer. Comprendre la structure de l'interface évite 80% des erreurs classiques de débutant.
   - Bloc A : Navigation et historique / Accéder à la liste des conversations passées, créer un nouveau projet...
   - Bloc B : La zone de conversation / Visualiser l'affichage des messages échangés...
   - Bloc C : Zone de saisie du prompt / Saisir son prompt de test. On peut y joindre facilement des fichiers...

5. **Slide 5 : Schéma 3 Colonnes** (`VIBECODING - SCHEMA - 3 COLONNES`)
   - Titre : Ce qu'AI Studio n'est pas
   - Intro : Clarifier les confusions fréquentes avant la prise en main. Trois idées reçues à corriger.
   - Colonne 1 :
     - Haut (Croix) : Ce n'est pas Un IDE (On ne peut pas déployer une application...)
     - Bas (Coche) : C'est Un terrain de test (Idéal pour générer, tester...)
   - Colonne 2 :
     - Haut (Croix) : Ce n'est pas Gemini.google.com (L'assistant grand public...)
     - Bas (Coche) : C'est L'interface pro de Gemini (On a accès aux paramètres...)
   - Colonne 3 :
     - Haut (Croix) : Ce n'est pas Un outil de production (Les projets créés...)
     - Bas (Coche) : C'est Un bac à sable (Se tromper ici ne coûte rien...)

6. **Slide 6 : Comparaison** (`VIBECODING - COMPARAISON`)
   - Titre : Choisir le bon modèle Gemini
   - Intro : On sélectionne son modèle dans le menu latéral droit selon la complexité du code.
   - Titre A : FLASH
   - Titre B : PRO-MODEL
   - Item 1 : VITESSE (Génération instantanée en quelques millisecondes seulement / Temps de réponse plus long...)
   - Item 2 : CODING (Idéal pour écrire des fonctions simples ou du style CSS / Excellent pour la logique complexe...)
   - Item 3 : CONTEXTE (Adapté pour analyser des fichiers isolés / Fenêtre de contexte géante...)
   - Item 4 : USAGE (Pour faire du prototypage et des scripts rapides / Analyse complète de projets entiers...)

7. **Slide 7 : Les paramètres clés** (`VIBECODING - 4 BLOCS`)
   - Titre : Configurer ses sessions de test
   - Intro : Quatre paramètres clés permettent d'ajuster le comportement du modèle dans Google AI Studio.
   - Titre 1 : INSTRUCTIONS SYSTÈME
   - Texte 1 : Définir le rôle et le comportement général de l'IA (ex: 'Tu es un expert React').
   - Titre 2 : TEMPÉRATURE
   - Texte 2 : Contrôler la créativité. Une valeur basse (ex: 0.2) garantit un code logique et prévisible.
   - Titre 3 : FILTRES DE SÉCURITÉ
   - Texte 3 : Désactiver ou réduire les blocages pour éviter que l'IA refuse de générer certains codes.
   - Titre 4 : EXPORT DE CODE
   - Texte 4 : Récupérer instantanément le prompt formaté sous forme de code Python, JavaScript ou cURL.

8. **Slide 8 : Focus / Cas concret** (`VIBECODING - USE CASE`)
   - Titre : Exporter ses prompts en un clic
   - Intro : DU PROTOTYPE AU CODE
   - Source : Google AI Studio
   - Texte 1 : Une fois que le prompt fonctionne dans l'interface d'AI Studio, on clique sur le bouton 'Get Code'. L'outil génère instantanément le code nécessaire pour intégrer cette requête dans son propre projet web (en Python, Node.js ou via une simple requête API). Cela évite de réécrire la logique de connexion et assure une transition fluide entre la phase de test et la production.
   - Texte Bulle : EN BREF : L'export automatique de code permet d'intégrer des fonctions d'IA dans ses applications sans avoir besoin de connaissances approfondies en développement d'API.

9. **Slide 9 : Synthèse** (`VIBECODING - FIN`)
   - Titre : Ce qu'il faut retenir
   - Google AI Studio est le laboratoire de test du Vibe Coder. Il permet de valider ses prompts en direct avec Gemini Flash ou Pro avant de les coder. En jouant sur les instructions système et la température, on prend le contrôle total du modèle. L'exportation de code en un clic assure ensuite la liaison avec son projet local.
   - Texte Bulle : EN BREF : Avec l'outil de prototypage en main, on est prêt pour la suite. Dans la leçon suivante : comment créer son tout premier projet et faire son premier appel API dans AI Studio.
