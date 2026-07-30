# Plan M4C4L2 — Front-end vs Back-end : pourquoi le navigateur ne suffit plus ?

## Informations générales
- **Module** : M4 — Antigravity & Stack Moderne
- **Chapitre** : M4C4 — Découvrir le backend & fiabiliser son app
- **Leçon** : M4C4L2 — Front-end vs Back-end : pourquoi le navigateur ne suffit plus ?
- **Type de leçon** : Concept
- **Nombre de slides cible** : 8 à 10 slides (max 10)

## Contextualisation & Rôle dans le Chapitre M4C4
- **M4C4L1** : Objectifs du chapitre (Découvrir le backend & fiabiliser son app).
- **M4C4L2 (Cette leçon)** : Comprendre pourquoi le navigateur (Front-end) ne peut pas tout faire seul (sécurité, persistance des données, traitements lourds, clés API cachées) et poser la distinction fondamentale Front-end vs Back-end avant de générer son premier serveur avec Antigravity dans la leçon M4C4L3.
- **M4C4L3** : Générer son premier serveur local (Node.js/Express) avec l'agent dans Antigravity.
- **M4C4L4** : Connecter l'interface Front-end au serveur local (APIs / Endpoints).
- **M4C4L5** : Isoler ses secrets et variables locales dans `.env.local`.

---

## Découpe pédagogique des slides (Max 10 slides)

### Slide 1 : Titre & Accroche
- **Titre** : Front-end vs Back-end : pourquoi le navigateur ne suffit plus ?
- **Sous-titre** : Comprendre la frontière entre l'interface utilisateur et le serveur
- **Contenu** : Présentation des enjeux : jusqu'ici, notre application tournait entièrement dans le navigateur. Mais pour aller plus loin (sécurité, persistance, clés secrètes), nous devons séparer les rôles.

### Slide 2 : Le Front-end : la vitrine exposée
- **Titre** : Le Front-end : tout ce qui s'exécute chez l'utilisateur
- **Contenu** :
  - Rôle : Affichage (HTML/CSS), interactivité (JavaScript), expérience utilisateur.
  - Caractéristique clé : Tout le code Front-end est visible et modifiable par n'importe qui dans les outils de développement du navigateur (`F12`).
  - Conséquence : On ne peut pas y faire confiance pour la sécurité critique ni pour stocker des secrets.

### Slide 3 : Les limites du "Tout Front-end"
- **Titre** : Pourquoi le navigateur ne suffit plus ?
- **Contenu** :
  - **Sécurité & Clés API** : Une clé API dans le JS client est publique et peut être volée.
  - **Persistance des données** : Le `localStorage` disparaît si l'utilisateur vide son cache ou change d'appareil.
  - **Règles métier & Logique confidentielle** : Traitements sensibles (paiements, calculs confidentiels) qui ne doivent pas être modifiables côté client.

### Slide 4 : Le Back-end : le moteur invisible
- **Titre** : Le Back-end : le gardien des données et de la sécurité
- **Contenu** :
  - Rôle : Exécuter la logique métier, interagir avec la base de données, masquer les clés secrètes, vérifier les autorisations.
  - Environnement : S'exécute sur un serveur (ou en local avec Node.js/Express).
  - Caractéristique clé : Totalement inaccessible au navigateur directement ; seules les réponses explicitement renvoyées sont visibles.

### Slide 5 : L'analogie du Restaurant
- **Titre** : Analogie : Le Restaurant et la Cuisine
- **Contenu** :
  - **Front-end = La Salle de restaurant** : Le menu, le décor, les tables (ce que le client voit et touche).
  - **Back-end = La Cuisine** : Préparation des plats, stock des ingrédients, recettes secrètes.
  - **API = Le Serveur / La Serveuse** : Transporte la commande de la salle vers la cuisine et ramène le plat au client.

### Slide 6 : Comment ils communiquent ? (Front <-> Back)
- **Titre** : La communication Client / Serveur
- **Contenu** :
  - **Requête HTTP** : Le Front-end demande une information ou envoie un formulaire (`GET`, `POST`).
  - **Traitement Backend** : Le Back-end vérifie, traite et interroge la base de données si besoin.
  - **Réponse (JSON)** : Le Back-end renvoie les données structurées que le Front-end affiche.

### Slide 7 : Le rôle d'Antigravity et de l'Agent IA
- **Titre** : Créer son Back-end avec Antigravity
- **Contenu** :
  - En Vibe Coding, l'agent IA peut générer une architecture Full-Stack en quelques secondes.
  - Antigravity va vous aider à créer votre serveur local (Node.js/Express) pour gérer cette séparation nette.
  - Vous n'avez pas besoin de réciter la syntaxe backend : vous devez comprendre l'architecture.

### Slide 8 : Résumé & Ce qui vous attend dans la suite
- **Titre** : En résumé : Prêts pour votre premier serveur !
- **Contenu** :
  - Front-end = Interface, réactivité, tout est public.
  - Back-end = Sécurité, données, logique métier, tout est privé.
  - Prochaine étape (M4C4L3) : Générer votre premier serveur local avec Node.js et Express dans Antigravity !
