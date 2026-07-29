# Plan de la leçon M2C5L3 — Bannir les clés API et secrets de ses prompts

Cette leçon explique pourquoi il ne faut jamais copier-coller de clé secrète, de mot de passe ou de jeton d'accès dans un prompt d'IA, et montre comment gérer ces variables de manière sûre au début de son projet.

## Déroulé des slides

### Slide 1 : VIBECODING - COVER
* Titre : Clés API & secrets : prompter sans fuite

### Slide 2 : VIBECODING - INTRO
* Titre : Protéger ses clés d'accès
* Intro : Une clé API, c'est comme le double des clés de sa maison : elle donne un accès direct à ses comptes ou services payants. Si on la colle dans son prompt ou sur GitHub, elle peut être volée en quelques secondes. Voyons comment protéger ses secrets.
* Titre 1 : Le risque des clés API
* Texte 1 : Voyons comment une clé copiée par inadvertance peut mener à des factures de plusieurs milliers d'euros.
* Titre 2 : La méthode locale
* Texte 2 : Zoom sur les fichiers d'environnement locaux pour stocker ses secrets sans jamais les envoyer dans le chat.
* Titre 3 : Les règles de partage
* Texte 3 : Apprenons à partager son code avec l'IA en masquant automatiquement les variables sensibles.

### Slide 3 : VIBECODING - CONCEPT
* Titre : Qu'est-ce qu'une clé API ?
* Mot : Le mot de passe machine
* Definition : Une clé API est une chaîne de caractères secrète permettant à notre application de s'authentifier auprès d'un service tiers (Supabase, Stripe, OpenAI). L'agent a besoin de cette clé pour connecter le code aux services, mais il ne doit jamais la voir dans les prompts.
* Bulle : Une clé API Stripe ou OpenAI en libre accès permet à n'importe qui de vider son solde ou d'utiliser son compte à ses frais.

### Slide 4 : VIBECODING - 3 COLONNES
* Titre : Trois étapes pour masquer ses secrets
* Intro : La gestion sécurisée des secrets s'organise dès le premier jour du projet avec trois habitudes simples.
* Titre 1 : Fichier local
* Parametre 1 : .env
* Violet 1 : Stocker les secrets dans un fichier isolé
* Texte 1 : Créer un fichier nommé .env à la racine du projet. Ce fichier contient les clés sous forme KEY=VALUE. L'agent ne doit jamais lire ce fichier — il doit uniquement savoir qu'il existe et comment y faire référence.
* Titre 2 : Chargement code
* Parametre 2 : process.env
* Violet 2 : Lire les clés de manière indirecte dans son code
* Texte 2 : Utiliser process.env (en JS) ou os.environ (en Python) pour charger les secrets en mémoire au lancement de l'app. Le code fait référence au nom de la variable, pas à sa valeur réelle. L'IA peut générer ce code sans connaître la clé.
* Titre 3 : Exclusion Git
* Parametre 3 : .gitignore
* Violet 3 : Bannir le fichier .env des partages publics
* Texte 3 : Ajouter la ligne .env dans son fichier .gitignore. Cela empêche d'envoyer le fichier contenant les clés sur GitHub par accident lors d'une mise en ligne. C'est la règle d'or de tout développeur.
* Picto 1 : mdi:file-code-outline
* Picto 2 : mdi:variable
* Picto 3 : mdi:git

### Slide 5 : VIBECODING - CHECKLIST
* Titre : Checklist de gestion des secrets
* Intro : Sécuriser ses clés et jetons d'accès.
* Texte Intro : Un oubli est vite arrivé. Cette checklist doit être passée en revue avant d'envoyer un prompt contenant du code ou d'effectuer une mise en ligne sur GitHub.
* Nom Checklist : Réflexes de sécurité
* Texte 1 : Vérifier l'absence de clé en dur (hardcoded) dans le code.
* Texte 2 : Contrôler que le fichier .gitignore contient bien la ligne .env.
* Texte 3 : Remplacer ses vraies clés par des faux exemples dans le chat.
* Texte 4 : Créer un fichier .env.example vide de clés pour l'IA.
* Texte 5 : Révoquer et renouveler immédiatement toute clé visible en ligne.
* Picto 1 : mdi:key-shield-outline

### Slide 6 : VIBECODING - FIN
* Titre : Ne jamais faire confiance au chat
* Intro : Les prompts de Vibe Coding sont sauvegardés et analysés par les éditeurs d'IA. Coller une clé API Stripe ou Supabase dans la boîte de dialogue de Claude ou Cursor, c'est la laisser visible pour des tiers. On applique la règle des fichiers .env dès le départ : l'IA écrit le code qui appelle la variable, et nous y injectons la valeur localement. En bref, l'IA conçoit la plomberie, nous seuls détenons la clé de l'eau.
* Titre Bulle : EN BREF
* Texte Bulle : La prochaine leçon va plus loin : au-delà des clés API, comment envoyer la logique de son application à son agent pour qu'il la corrige, sans jamais lui transmettre les données réelles de ses utilisateurs ou clients ?
