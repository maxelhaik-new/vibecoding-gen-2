# Plan de la leçon M2C5L5 — Écrire des prompts sûrs : la checklist de sécurité

Cette leçon rassemble les bonnes pratiques de sécurité sous la forme d'un protocole rapide de relecture des requêtes (checklist) à appliquer systématiquement avant de soumettre un prompt ou du code à son agent.

## Déroulé des slides

### Slide 1 : VIBECODING - COVER
* Titre : Écrire des prompts sûrs : la checklist réflexe

### Slide 2 : VIBECODING - INTRO
* Titre : L'habitude de la relecture
* Intro : En Vibe Coding, on envoie des dizaines de messages à l'IA chaque jour. La vitesse de l'outil peut faire oublier les règles de base de sécurité. Prendre dix secondes pour relire sa requête avant de l'envoyer évite des erreurs critiques. Voyons les points à vérifier.
* Titre 1 : Le risque de la vitesse
* Texte 1 : Voyons comment la rapidité d'envoi favorise les fuites accidentelles de données.
* Titre 2 : La checklist réflexe
* Texte 2 : Zoom sur les cinq points clés à scanner visuellement avant de cliquer sur Envoyer.
* Titre 3 : Les automatismes
* Texte 3 : Apprenons à intégrer ces étapes de vérification dans son processus de développement.

### Slide 3 : VIBECODING - CONCEPT
* Titre : La fuite par distraction
* Mot : L'erreur d'inadvertance
* Definition : La majorité des incidents de sécurité liés à l'IA ne viennent pas d'attaques complexes, mais d'un simple copier-coller trop rapide. Coller un morceau de code contenant ses clés d'accès réelles ou les identifiants d'un client est une erreur fréquente qu'une simple relecture permet de bloquer.
* Bulle : Un clic trop rapide peut exposer un jeton d'accès ou une base clients entière sur les serveurs de l'IA.

### Slide 4 : VIBECODING - CHECKLIST
* Titre : Les 5 points de contrôle avant envoi
* Intro : Une vérification rapide en cinq questions pour valider la sécurité de son prompt.
* Texte Intro : Adopter ce réflexe simple permet de réduire à zéro le risque d'exposition de ses secrets ou de ses données d'utilisateurs. Le développeur reste le seul responsable de ce qui sort de sa machine.
* Nom Checklist : Checklist sécurité
* Texte 1 : Les clés API et mots de passe sont-ils absents du code collé ?
* Texte 2 : Les noms et données d'utilisateurs réels ont-ils été remplacés ?
* Texte 3 : L'option de blocage des suggestions publiques est-elle active ?
* Texte 4 : Les consignes de licence (MIT uniquement) sont-elles incluses ?
* Texte 5 : La logique du code a-t-elle été simplifiée au maximum ?
* Picto 1 : mdi:shield-check-outline

### Slide 5 : VIBECODING - PROCESS
* Titre : Le protocole en trois secondes
* Intro : Trois réflexes visuels rapides à appliquer sur la zone de saisie du chat avant de valider son prompt.
* Titre 1 : Scanner
* Violet 1 : Repérer les chaînes suspectes (KEY, secret)
* Titre 2 : Filtrer
* Violet 2 : Supprimer les blocs de données réelles
* Titre 3 : Borner
* Violet 3 : Ajouter les consignes de licence libre
* Titre 4 : Alléger
* Violet 4 : Ne laisser que le code concerné par le bug
* Titre 5 : Relire
* Violet 5 : Faire une lecture globale de la demande
* Titre 6 : Lancer
* Violet 6 : Valider et envoyer le prompt à l'agent

### Slide 6 : VIBECODING - FIN
* Titre : La sécurité comme automatisme
* Intro : En Vibe Coding, la sécurité n'est pas un frein à la productivité. C'est une habitude qui s'acquiert en quelques jours. En appliquant la checklist avant chaque envoi de code, on protège ses données, ses secrets d'accès et la propriété intellectuelle de son application sans perdre de temps. En bref, un prompt sûr est la fondation d'un code robuste et d'une application conforme.
* Titre Bulle : EN BREF
* Texte Bulle : Le prochain chapitre aborde un autre type de danger : comment un utilisateur malveillant peut tenter de pirater ou manipuler l'IA de notre application à l'aide de messages trompeurs, et comment s'en prémunir.
