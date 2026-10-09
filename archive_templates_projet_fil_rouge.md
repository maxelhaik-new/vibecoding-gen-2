# Backup : Templates Spéciaux de Projet Fil Rouge (`PROJET - ...`)

Ces templates ne sont pas destinés au découpage standard des leçons (ils sont exclus du menu de sélection de Vibe Slicer) mais servent à générer la suite complète de suivi de projet fil rouge. L'IA peut itérer avec l'utilisateur sur le concept du projet puis générer un JSON unique contenant la séquence de ces slides adaptées au sujet.

### Ordre Séquentiel de gauche à droite
Les 13 slides doivent obligatoirement être générées dans cet ordre chronologique :
1. `PROJET - BRIEF` : Le brief client exposant le problème et le besoin concret.
2. `PROJET - PERSONA` : Portrait de l'utilisateur final avec ses contraintes et les solutions d'interface décidées.
3. `PROJET - USER STORY` : Vision du projet, nom de l'application et les 3 User Stories clés définissant le MVP.
4. `PROJET - CAHIER` : Le fichier de spécifications fonctionnelles et techniques simplifié (`cahier-des-charges.txt`).
5. `PROJET - DESIGN 5` : L'extrait de fichier de configuration agent (`agent.md` ou `instructions.md`) imposant les règles de conception.
6. `PROJET - PROMPT 1` : Première partie du Prompt Zéro (le contexte général et l'utilisateur).
7. `PROJET - PROMPT 2` : Deuxième partie du Prompt Zéro (le périmètre MVP strict à ne pas dépasser).
8. `PROJET - PROMPT 3` : Troisième partie du Prompt Zéro (la stack technique verrouillée avec badges).
9. `PROJET - PROMPT 4` : Quatrième partie du Prompt Zéro (l'amorce de démarrage de la première User Story).
10. `PROJET - DESIGN 1` : L'adaptation de design (Espacement/Respiration) avec démonstration Avant/Après.
11. `PROJET - DESIGN 2` : L'adaptation de design (Contraintes d'ergonomie et adaptabilité mobile-first).
12. `PROJET - DESIGN 3` : L'adaptation de design (Charte graphique, Dark Mode et couleur d'accent).
13. `PROJET - DESIGN 4` : L'adaptation de design (Hiérarchie visuelle, contrastes et lisibilité des textes).

### Dictionnaire des calques pour l'injection JSON
Lors de la génération du contenu de ces slides par l'IA, les clés de l'objet `content` doivent correspondre exactement aux textes d'origine ci-dessous pour être injectées dans les bons calques Figma (le plugin Figma fera l'association exacte) :

* **`PROJET - BRIEF`**
  - Clés texte : `Titre`, `Titre Intro`, `Intro`, `Titre 1`, `Texte 1`
  - Clé image : `image` (Illustration photoréaliste de l'univers métier)
* **`PROJET - PERSONA`**
  - Clés texte : `Titre`, `Intro`, `Alexandre` (nom), `Commercial Terrain` (rôle), `En déplacement permanent` (critère 1), `Utilisation 100% sur Smartphone` (critère 2), `Ultra-pressé entre deux RDV` (critère 3), `L'Interface Générée (UX/UI)`, `Mobile-first : Grands boutons faciles à presser su` (ergonomie UX 1), `Mode Sombre : Activé par défaut pour réduire la fa` (ergonomie UX 2), `Action Rapide : Accès immédiat et omniprésent au b` (ergonomie UX 3), `Le Périmètre du MVP`, `Action unique ultra-optimisée : Ajouter un nouveau` (MVP 1), `Pas de superflu : Aucune fonctionnalité d'analyse ` (MVP 2)
  - Clés pictos : `Picto 1`, `Picto 2`, `Picto 3`
* **`PROJET - USER STORY`**
  - Clés texte : `Titre`, `Intro`, `Application` (Nom du MVP), `\"Permettre au commercial d'ajouter une note post-R` (US Principale), `Créer l'écran d'accueil avec un énorme bouton \"Ajo` (US MVP 1), `Construire le formulaire modal rapide : 3 champs (` (US MVP 2), `Gérer la sauvegarde fictive et afficher un toast d` (US MVP 3)
  - Clés pictos : `Picto 1` (Icône d'illustration de l'appli), `Picto 2` (Icône d'action)
* **`PROJET - CAHIER`**
  - Clés texte : `Titre`, `Intro`, `Cahier-des-charges.txt` (titre fichier), `Vision & Persona`, `**Projet :** Créer une Landing Page \"Waitlist\" pou` (description projet), `**Cible :** Sarah, 28 ans, solopreneur et digital ` (cible), `**Sensibilité :** Très attachée à l'esthétique (\"v` (sensibilité), `Périmètre (MVP)`, `Le projet est un One-Pager sans backend complexe ni` (MVP desc), `User Stories`, `En tant que Sarah, je veux un Hero Header massif p` (US 1), `En tant que Sarah, je veux un formulaire d'inscrip` (US 2)
* **`PROJET - DESIGN 5`**
  - Clés texte : `Titre`, `Intro`, `Agent.md` (nom fichier), `\"L'approche doit être strictly Mobile-First. Le` (extrait règle design), `Survol (Hover)` (titre d'effet)
  - Clés pictos : `Picto 1`
* **`PROJET - PROMPT 1`**
  - Clés texte : `Titre`, `Intro`, `PROMPT.md` (nom fichier), `Agis comme un développeur Frontend Expert en UX Mo` (rôle IA), `# 1. CONTEXTE & PERSONA`, `Tu vas coder une application "Mini-CRM".` (contexte), `L'utilisateur final est Alexandre, un commercial t` (persona), `Cahier des charges :`, `Alexandre, Commercial` (badge), `Utilisation 100% sur mobile en voiture.` (critère 1), `Plutôt que de devoir dicter chaque taille de bouto` (critère 2)
* **`PROJET - PROMPT 2`**
  - Clés texte : `Titre`, `Intro`, `PROMPT.md`, `# 2. PÉRIMÈTRE (MVP)`, `L'application a un périmètre volontairement très r` (périmètre), `Saisir un Nom, Téléphone et Note.` (scope list 1), `Afficher un message de confirmation.` (scope list 2), `ATTENTION : NE CODE PAS de système de connexion (A` (warning/exclusions), `MVP: Ajouter un contact et une note (3 clics).` (résumé), `Créer l'écran d'accueil avec un énorme bouton \"Ajo` (US 1), `Construire le formulaire modal rapide : 3 champs (` (US 2), `Gérer la sauvegarde fictive et afficher un toast d` (US 3)
* **`PROJET - PROMPT 3`**
  - Clés texte : `Titre`, `Intro`, `PROMPT.md`, `# 3. STACK TECHNIQUE`, `Tu dois utiliser exclusivement les technologies su` (consigne), `Frontend : React avec TypeScript.` (tech 1), `Style : Tailwind CSS (pas de fichiers CSS customs)` (tech 2), `Icônes : Import depuis 'lucide-react'.` (tech 3), `Données : Fake data en dur dans les composants.` (tech 4), `Stack technique choisie :`, `React / Next.js` (badge tech 1), `La base solide et standardisée.` (desc tech 1), `Re` (label badge tech 1), `Tailwind CSS v4` (badge tech 2), `Crucial pour que l'IA style tout inline sans créer` (desc tech 2), `TW` (label badge tech 2), `Lucide React` (badge tech 3)
  - Clés pictos : `Picto 1` (Icône d'illustration stack)
* **`PROJET - PROMPT 4`**
  - Clés texte : `Titre`, `Intro`, `L'Amorce`, `Rappel : On ne demande jamais de tout coder d'un coup. Le Prompt Zéro se termine toujours par la première User Story et le squelette de l’application.`, `PROMPT.md`, `# PREMIÈRE ACTION (AMORCE)`, `Pour commencer, ne code pas toute l'application. G` (action d'amorce)
* **`PROJET - DESIGN 1`**
  - Clés texte : `Titre`, `Intro`, `Sans consigne`, `Avec consigne`, `Agent.md`, `\"Utiliser des paddings et margins très généreux. L` (instruction d'espacement)
* **`PROJET - DESIGN 2`**
  - Clés texte : `Titre`, `Intro`, `Agent.md`, `\"L'approche doit être strictement Mobile-First. Le` (instruction ergonomie), `Bouton` (nom de l'élément visuel)
* **`PROJET - DESIGN 3`**
  - Clés texte : `Titre`, `Intro`, `Agent.md`, `\"L'approche doit être strictement Mobile-First. Le` (instruction couleurs/Dark mode), `Dark Mode + Accent` (nom du thème)
* **`PROJET - DESIGN 4`**
  - Clés texte : `Titre`, `Intro`, `Agent.md`, `\"L'approche doit être strictement Mobile-First. Le` (instruction typographie/hiérarchie), `Titre Principal` (badge 1), `Texte de corps avec un gris plus clair pour créer ` (badge 2)

### Règles d'adaptation dynamique du projet
Tous les calques textuels ci-dessus contiennent des exemples par défaut (ex: Alexandre, CRM mobile, Tailwind, etc.). L'IA doit obligatoirement réécrire et adapter l'ensemble de ces calques au sujet de projet validé avec l'utilisateur.

> [!WARNING]
> **Calques Statiques (INTRO & NUMÉROS)** : Les calques textuels nommés exactement `"Intro"` ainsi que les calques contenant uniquement des chiffres (puces comme `"1"`, `"2"`, `"3"`, etc.) ne doivent **jamais** être modifiés ni inclus dans les clés d'injection JSON. Ils doivent conserver leur valeur par défaut issue du template Figma.
