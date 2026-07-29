# Plan de la leçon M2C5L2 — Où vont nos données ? Configurer la confidentialité

Cette leçon explique le parcours des données envoyées dans les prompts aux fournisseurs d'IA, et montre comment configurer la confidentialité de ses outils de Vibe Coding pour empêcher l'entraînement des modèles sur son code.

## Déroulé des slides

### Slide 1 : VIBECODING - COVER
* Titre : Confidentialité de l'IA : où vont nos données ?

### Slide 2 : VIBECODING - INTRO
* Titre : Le parcours de nos prompts
* Intro : Quand on envoie un prompt à ChatGPT, Claude ou Cursor, nos données partent sur des serveurs externes. Qui les lit ? Sont-elles utilisées pour entraîner les futurs modèles ? Faisons le point sur les règles de confidentialité.
* Titre 1 : Le trajet des données
* Texte 1 : Voyons comment nos codes et requêtes transitent vers les serveurs des fournisseurs d'IA.
* Titre 2 : Risque d'entraînement
* Texte 2 : Zoom sur le risque de voir son code propriétaire réutilisé pour entraîner la prochaine IA.
* Titre 3 : Configurer l'opt-out
* Texte 3 : Apprenons à configurer nos outils pour bloquer l'utilisation de nos données.

### Slide 3 : VIBECODING - CONCEPT
* Titre : Le stockage et l'entraînement des IA
* Mot : Le stockage par défaut
* Definition : Les versions gratuites et Pro de ChatGPT ou Claude conservent nos conversations pour entraîner leurs modèles. Si on y colle du code confidentiel, il peut réapparaître dans les suggestions d'autres utilisateurs. C'est le principe de l'entraînement continu.
* Bulle : Un code propriétaire copié dans le chat gratuit devient potentiellement accessible au public.

### Slide 4 : VIBECODING - COMPARAISON
* Titre : Grand public vs. API et Enterprise
* Intro : Les règles de confidentialité changent radicalement selon la manière dont on accède aux modèles d'IA.
* Titre A : WEB PRO
* Titre B : API / CLOUD
* Item 1 : Entraînement
* Item 2 : Stockage
* Item 3 : Risque
* Item 4 : Action
* Texte A Item 1 : Oui par défaut pour améliorer les modèles
* Texte A Item 2 : Conservation historique dans son compte
* Texte A Item 3 : Moyen — dépend des options activées
* Texte A Item 4 : Désactiver l'option d'entraînement
* Texte B1 : Non — interdit par les conditions API
* Texte B2 : Aucun historique conservé chez eux
* Texte B3 : Faible — données sécurisées et isolées
* Texte B4 : Utiliser des clés API ou des abonnements pro

### Slide 5 : VIBECODING - CHECKLIST
* Titre : Configurer la confidentialité de ses outils
* Intro : Bloquer l'entraînement des modèles sur son code.
* Texte Intro : Quelques clics dans les réglages de nos outils quotidiens suffisent à sanctuariser son code source. Ces réglages doivent être appliqués avant de commencer à prompter sur un projet réel.
* Nom Checklist : Réglages indispensables
* Texte 1 : Désactiver « Chat History & Training » sur ChatGPT.
* Texte 2 : Soumettre une demande d'opt-out sur Anthropic (Claude).
* Texte 3 : Activer le « Privacy Mode » dans les réglages de Cursor.
* Texte 4 : Utiliser l'API plutôt que l'interface web classique.
* Texte 5 : Privilégier des modèles hébergés localement si besoin.
* Picto 1 : mdi:shield-lock-outline

### Slide 6 : VIBECODING - FIN
* Titre : Verrouiller sa boîte de chat
* Intro : En Vibe Coding, la confidentialité n'est pas une option. On ne commence jamais à travailler sans avoir configuré ses outils en mode privé. Les abonnements Enterprise et les accès par API garantissent par contrat qu'aucun modèle ne s'entraînera sur nos prompts. Pour le chat grand public, on prend deux minutes pour désactiver l'historique et l'entraînement. En bref, le développeur choisit qui accède à son code.
* Titre Bulle : EN BREF
* Texte Bulle : La prochaine leçon aborde le point le plus critique de la sécurité : la gestion des clés secrètes. Comment connecter son application à des API externes sans jamais laisser traîner ses clés d'accès dans ses prompts ?
