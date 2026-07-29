# Plan de la leçon M2C5L4 — Partager sa logique sans donner ses données

Cette leçon explique comment faire corriger un bug ou concevoir une fonctionnalité complexe par son agent sans jamais lui transmettre de données réelles d'utilisateurs ou d'informations confidentielles de son entreprise.

## Déroulé des slides

### Slide 1 : VIBECODING - COVER
* Titre : Partager sa logique sans livrer ses données

### Slide 2 : VIBECODING - INTRO
* Titre : Résoudre un bug sans fuites
* Intro : Pour aider à résoudre un problème, l'agent a besoin de comprendre la structure de nos données, pas les valeurs réelles de nos clients ou utilisateurs. Coller une vraie liste de noms ou d'achats dans le chat est une faille de sécurité majeure. Voyons comment masquer ces informations.
* Titre 1 : La structure vs. les données
* Texte 1 : Voyons comment extraire la logique d'un code sans y joindre les informations personnelles.
* Titre 2 : Les techniques de masque
* Texte 2 : Zoom sur les méthodes simples pour remplacer les vrais noms par des exemples fictifs.
* Titre 3 : Les réflexes de prompt
* Texte 3 : Apprenons à prompter l'agent en utilisant uniquement des structures vides et des schémas.

### Slide 3 : VIBECODING - CONCEPT
* Titre : Schéma vs. données réelles
* Mot : Le schéma de données
* Definition : Un schéma de données (ou structure) décrit l'organisation des informations (par exemple : «&nbsp;un utilisateur a un nom, un email et un âge&nbsp;»). C'est cette structure dont l'agent a besoin pour coder. Les données réelles (les vrais noms ou vrais emails) ne servent à rien pour écrire l'algorithme.
* Bulle : Pour réparer un tuyau, le plombier a besoin des plans de la maison — pas de l'eau qui y coule.

### Slide 4 : VIBECODING - COMPARAISON
* Titre : Anonymiser vs. Pseudonymiser
* Intro : Deux techniques simples permettent de nettoyer ses prompts avant envoi, selon le niveau de sécurité recherché.
* Titre A : ANONYMER
* Titre B : PSEUDONYMER
* Item 1 : Principe
* Item 2 : Méthode
* Item 3 : Retour
* Item 4 : Usage
* Texte A Item 1 : Remplacer l'information par une généralité
* Texte A Item 2 : « Un utilisateur » ou « Client A »
* Texte A Item 3 : Impossible — modification irréversible
* Texte A Item 4 : Idéal pour des analyses de logs ou de bugs
* Texte B1 : Remplacer l'identifiant par un code factice
* Texte B2 : Utiliser de fausses données réalistes
* Texte B3 : Possible à l'aide d'une table de correspondance
* Texte B4 : Utile pour tester des scénarios complexes

### Slide 5 : VIBECODING - PROCESS
* Titre : Protocole de nettoyage de prompt
* Intro : Avant d'envoyer un extrait de base de données ou de fichier à son agent, on suit ces étapes simples pour nettoyer les données.
* Titre 1 : Repérer
* Violet 1 : Identifier les informations nominatives
* Titre 2 : Remplacer
* Violet 2 : Changer les noms et emails par des alias
* Titre 3 : Agréger
* Violet 3 : Transformer les valeurs exactes en tranches
* Titre 4 : Tronquer
* Violet 4 : Supprimer les colonnes inutiles au bug
* Titre 5 : Valider
* Violet 5 : Relire le prompt nettoyé avant envoi
* Titre 6 : Envoyer
* Violet 6 : Soumettre le cas simplifié à l'agent

### Slide 6 : VIBECODING - FIN
* Titre : Le développeur est le filtre
* Intro : L'agent IA n'a pas conscience de la confidentialité des données que nous lui envoyons. C'est à nous de faire office de filtre avant chaque clic sur «&nbsp;Envoyer&nbsp;». On prend l'habitude de ne fournir à l'IA que des schémas de base de données, des fausses données de test (mock data) ou des exemples génériques. En bref, on partage l'architecture du problème, jamais la vie privée de ses utilisateurs.
* Titre Bulle : EN BREF
* Texte Bulle : La prochaine leçon rassemble ces bonnes pratiques sous forme de checklist réflexe : un protocole simple à suivre avant chaque envoi de prompt pour garantir un Vibe Coding sécurisé de bout en bout.
