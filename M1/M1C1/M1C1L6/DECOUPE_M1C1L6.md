# Écriture M1C1L6 : Les mots du développeur — vocabulaire essentiel du Vibe Coding

## Slide 1 : Cover
- **Template** : `VIBECODING - COVER`
- **Contenu** :
  - **Titre** : Les mots du développeur

---

## Slide 2 : Intro
- **Template** : `VIBECODING - INTRO`
- **Contenu** :
  - **Titre** : Décoder le jargon, coder librement
  - **Intro** : Pas besoin d'un diplôme d'informatique pour comprendre ces dix termes. On les décode ensemble, avec des mots simples et des analogies concrètes, pour aborder la suite du parcours sans jamais se sentir perdu.
  - **Titre 1** : La couche langage
  - **Texte 1** : Maîtriser Prompt et LLM, les deux notions centrales qui expliquent comment on communique avec une IA et comment elle génère ses réponses.
  - **Titre 2** : La couche outil
  - **Texte 2** : Comprendre IDE, Stack, Frontend et Backend pour visualiser à quoi ressemble concrètement une application et où on travaille dedans.
  - **Titre 3** : La couche production
  - **Texte 3** : Décoder API, Git, Déploiement et MVP pour savoir comment une application communique, évolue, se sauvegarde et se met en ligne.

---

## Slide 3 : Objectifs de la leçon
- **Template** : `VIBECODING - OBJECTIF CHAP`
- **Contenu** :
  - **Titre** : Les objectifs de la leçon
  - **Intro** : Assimiler dix termes techniques clés du développement par IA pour lire, comprendre et utiliser le jargon de la formation avec aisance et confiance.
  - **Titre 1** : Comprendre ce qu'est un Prompt et un LLM
  - **Titre 2** : Saisir le rôle d'un IDE dans son workflow
  - **Titre 3** : Distinguer Frontend, Backend et Stack
  - **Titre 4** : Expliquer à quoi sert une API concrètement
  - **Titre 5** : Comprendre Git et la logique de versioning
  - **Titre 6** : Distinguer MVP et déploiement en production

---

## Slide 4 : Définition — Prompt et LLM
- **Template** : `VIBECODING - DEFINITION`
- **Contenu** :
  - **Titre** : Deux mots pour tout débloquer
  - **Mot** : Prompt / LLM
  - **Picto 1** : `mdi:message-flash-outline`
  - **Definition** : Un **Prompt**, c'est l'instruction rédigée en langage naturel qu'on envoie à une intelligence artificielle pour lui donner une tâche. Plus le prompt est précis, plus le résultat est pertinent. Un **LLM** (Large Language Model) est le modèle d'IA qui reçoit ce prompt et génère une réponse : Claude, Gemini ou GPT en sont des exemples courants. En réalité, le LLM ne «réfléchit» pas — il prédit statistiquement le texte le plus probable à partir de milliards de données d'entraînement.
  - **Bulle** : En bref, le Prompt est la question et le LLM est le cerveau statistique qui y répond. La qualité de la réponse dépend directement de la qualité de la question posée — c'est le principe fondateur du Vibe Coding.

---

## Slide 5 : Définition — IDE
- **Template** : `VIBECODING - DEFINITION`
- **Contenu** :
  - **Titre** : L'atelier du Vibe Coder
  - **Mot** : IDE
  - **Picto 1** : `mdi:code-braces-box`
  - **Definition** : Un **IDE** (Integrated Development Environment) est l'application dans laquelle on écrit, visualise et exécute son code. C'est l'atelier complet du développeur : éditeur de texte, terminal, explorateur de fichiers et assistant IA sont réunis en un seul endroit. Dans la formation, on utilisera un **IDE Agentique** comme Cursor ou Antigravity — une version augmentée où l'IA dialogue directement avec nous à l'intérieur de l'interface pour générer ou corriger le code en temps réel.
  - **Bulle** : Analogie concrète : l'IDE, c'est comme Photoshop pour le code. Tout se passe dans cet espace unique. On n'a pas besoin de jongler entre dix applications différentes — l'IDE centralise tout.

---

## Slide 6 : L'anatomie d'une application
- **Template** : `VIBECODING - 4 BLOCS - TITLE 2 LINES`
- **Contenu** :
  - **Titre** : L'anatomie d'une application
  - **Intro** : Toute application est construite autour de quatre composantes fondamentales. En les comprenant, on sait exactement où l'on intervient à chaque étape de la création :
  - **Picto 1** : `mdi:layers`
  - **Titre 1** : La Stack technique de l'app
  - **Texte 1** : L'ensemble des technologies combinées pour faire fonctionner une application. Par exemple : React pour l'interface, Supabase pour les données et Vercel pour l'hébergement.
  - **Picto 2** : `mdi:monitor-screenshot`
  - **Titre 2** : Le Frontend, côté visible
  - **Texte 2** : Tout ce que l'utilisateur voit et manipule directement : boutons, pages, formulaires et menus. C'est l'interface graphique de l'application, conçue pour être intuitive.
  - **Picto 3** : `mdi:server`
  - **Titre 3** : Le Backend, côté invisible
  - **Texte 3** : La logique cachée qui tourne côté serveur : traitement des données, authentification, calculs et règles métier. L'utilisateur n'y accède jamais directement.
  - **Picto 4** : `mdi:database`
  - **Titre 4** : La Base de données, la mémoire
  - **Texte 4** : Le système de stockage persistant qui retient toutes les informations : comptes, préférences, historiques. Sans base de données, l'application oublierait tout à chaque rechargement.

---

## Slide 7 : Définition — API
- **Template** : `VIBECODING - DEFINITION`
- **Contenu** :
  - **Titre** : Le connecteur universel
  - **Mot** : API
  - **Picto 1** : `mdi:api`
  - **Definition** : Une **API** (Application Programming Interface) est un pont standardisé qui permet à deux applications distinctes de communiquer et d'échanger des données. Quand une application de météo affiche la température, elle ne stocke pas les données elle-même : elle interroge une API météo tierce qui lui renvoie les informations à jour. Dans la formation, on utilisera des API pour connecter notre application à des services externes comme Stripe pour le paiement ou Supabase pour les données.
  - **Bulle** : Analogie concrète : l'API, c'est le serveur dans un restaurant. On passe la commande (la requête), le serveur la transmet à la cuisine (le service externe) et revient avec le plat (la réponse). On ne va jamais soi-même en cuisine.

---

## Slide 8 : Définition — Git et Versioning
- **Template** : `VIBECODING - DEFINITION`
- **Contenu** :
  - **Titre** : La sauvegarde intelligente du code
  - **Mot** : Git / Versioning
  - **Picto 1** : `mdi:source-repository`
  - **Definition** : Le **Versioning** est la pratique qui consiste à enregistrer chaque modification du code dans un historique chronologique et traçable. **Git** est l'outil standard qui réalise ce versioning localement, tandis que **GitHub** stocke cet historique en ligne. Concrètement, on peut revenir à n'importe quelle version antérieure de son code en cas d'erreur, comme un «Ctrl+Z» illimité et intelligent qui fonctionne même des semaines après le changement.
  - **Bulle** : En bref, Git, c'est le «suivi des modifications» de Word appliqué au code — mais en infiniment plus puissant. Chaque sauvegarde s'appelle un «commit». On n'a jamais peur de casser quelque chose quand Git est là.

---

## Slide 9 : Déploiement et MVP
- **Template** : `VIBECODING - COMPARAISON`
- **Contenu** :
  - **Titre** : Déployer vs lancer un MVP
  - **Intro** : Deux concepts souvent confondus par les débutants — et pourtant très complémentaires dans le cycle de développement agile :
  - **Titre A** : DÉPLOIEMENT
  - **Titre B** : MVP
  - **Item 1** : Définition
  - **Texte A Item 1** : Rendre une application accessible en ligne via une URL publique
  - **Texte B1** : Minimum Viable Product — version la plus simple d'un produit fonctionnel
  - **Item 2** : Objectif
  - **Texte A Item 2** : Mettre le code en production sur un serveur accessible partout
  - **Texte B2** : Valider une idée rapidement auprès de vrais utilisateurs
  - **Item 3** : Outil
  - **Texte A Item 3** : Vercel, Netlify ou tout hébergeur cloud
  - **Texte B3** : Lovable, Cursor ou tout IDE agentique avec IA
  - **Item 4** : Fréquence
  - **Texte A Item 4** : À chaque mise à jour majeure ou correction critique
  - **Texte B4** : Une seule fois, en tout début de projet, pour tester le marché

---

## Slide 10 : Récap — Le lexique du Vibe Coder
- **Template** : `VIBECODING - 6 BLOCS`
- **Contenu** :
  - **Titre** : Le lexique du Vibe Coder
  - **Intro** : Dix termes à retenir pour lire la formation sans jamais rester bloqué sur un mot inconnu :
  - **Texte Bulle** : Principe clé : maîtriser le vocabulaire, c'est déjà maîtriser la moitié du développement. Un bon Vibe Coder parle la même langue que son IDE.
  - **Picto 1** : `mdi:message-flash-outline`
  - **Titre 1** : Prompt
  - **Texte 1** : Instruction en langage naturel envoyée à une IA pour lui donner une tâche précise.
  - **Picto 2** : `mdi:robot`
  - **Titre 2** : LLM
  - **Texte 2** : Modèle de langage statistique (Claude, Gemini…) qui génère du code ou du texte.
  - **Picto 3** : `mdi:code-braces-box`
  - **Titre 3** : IDE
  - **Texte 3** : Atelier de développement réunissant éditeur, terminal et assistant IA au même endroit.
  - **Picto 4** : `mdi:api`
  - **Titre 4** : API
  - **Texte 4** : Pont standardisé permettant à deux applications distinctes de s'échanger des données.
  - **Picto 5** : `mdi:source-repository`
  - **Titre 5** : Git
  - **Texte 5** : Système de versioning qui trace chaque modification du code avec un retour arrière possible.
  - **Picto 6** : `mdi:rocket-launch`
  - **Titre 6** : MVP
  - **Texte 6** : Version minimale fonctionnelle d'un produit, construite rapidement pour tester une idée.

---

## Slide 11 : Ce qu'il faut retenir
- **Template** : `VIBECODING - FIN`
- **Contenu** :
  - **Titre** : Ce qu'il faut retenir
  - **Intro** : Dix mots suffisent pour comprendre l'univers du développement IA : Prompt, LLM, IDE, Stack, Frontend, Backend, API, Git, Déploiement et MVP. On ne cherche pas à devenir expert sur chacun dès maintenant — juste à ne plus être surpris quand ils apparaissent dans la formation. Chaque terme sera approfondi en situation réelle, au moment exact où on en aura besoin.
  - **Titre Bulle** : EN BREF
  - **Texte Bulle** : Le jargon technique n'est pas une barrière — c'est simplement un nouveau vocabulaire. En le maîtrisant dès le départ, on aborde la pratique avec beaucoup plus de sérénité. À nous de jouer !
