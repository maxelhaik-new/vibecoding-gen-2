🎯 **Objectif pédagogique**

Comprendre les enjeux de l'accessibilité numérique (RGAA) appliqués au code web, et savoir guider son agent de code pour générer des interfaces inclusives utilisables par tous.

📖 **Contenu de la leçon (Matière brute pour l'Agent)**

### 1. Introduction : L'accessibilité comme standard de dev (Idéal Slide 1-2)

L'accessibilité numérique consiste à rendre les sites utilisables par tous, y compris les personnes en situation de handicap (moteur, visuel, auditif, cognitif). En France, le RGAA (Référentiel Général d'Amélioration de l'Accessibilité) définit les règles de conformité obligatoires.

Le problème ? Les modèles d'IA génèrent souvent du code non accessible par défaut (balises génériques, manque d'attributs sémantiques). Le Vibe Coder doit donc piloter activement son agent pour corriger ces lacunes.

---

### 2. Le code sémantique et la navigation au clavier (Idéal Slide 3)

La base de l'accessibilité réside dans la structure HTML sémantique.

- **Balises sémantiques** : Utiliser `<button>` pour une action et `<a>` pour un lien, plutôt que des `<div>` ou `<span>` cliquables. Les lecteurs d'écran lisent la nature de l'élément.
- **Navigation clavier** : Assurer que tous les éléments interactifs sont focusables via la touche `Tab` et ont un état visuel visible (`:focus`).
- **Instructions pour l'agent** : Demander systématiquement à l'agent d'utiliser des balises HTML5 natives (`<header>`, `<nav>`, `<main>`, `<footer级>`) pour structurer la page.

---

### 3. Les alternatives textuelles et les rôles ARIA (Idéal Slide 4)

Les lecteurs d'écran décrivent l'interface aux utilisateurs non-voyants.

- **Attribut alt** : Toute image doit posséder un attribut `alt=""` vide (si décorative) ou descriptif (si informative).
- **Rôles ARIA (Accessible Rich Internet Applications)** : Utiliser les attributs `aria-label`, `aria-hidden` ou `aria-expanded` pour enrichir les composants dynamiques (menus déroulants, modales).
- **Règle** : Ne pas surcharger le code de rôles ARIA inutiles si le HTML natif suffit.

---

### 4. Les contrastes et la lisibilité visuelle (Idéal Slide 5)

La mise en forme CSS joue un rôle direct dans l'accessibilité.

- **Rapport de contraste** : Le texte doit contraster avec l'arrière-plan (ratio minimal de 4.5:1 pour le texte normal).
- **Indépendance de la couleur** : Ne jamais transmettre une information uniquement par la couleur (ex : un message d'erreur rouge sans texte explicatif).
- **Ajustement CSS** : Préférer les unités relatives (`rem`, `em`) aux pixels pour permettre le zoom de la police par le navigateur.

---

### 5. Auditer et corriger son code avec l'agent (Idéal Slide 6)

On valide l'accessibilité de son code de manière continue.

- **Outils d'audit** : Utiliser Lighthouse (intégré à Chrome) ou l'extension Axe DevTools pour scanner son application.
- **Processus de correction** : Copier le rapport d'erreur d'accessibilité et le soumettre à l'agent de code avec la consigne de corriger les éléments non conformes.
- **Exemple de prompt** : *"Corrige les avertissements d'accessibilité Lighthouse suivants dans mon code en respectant le RGAA."*

---

### 6. Conclusion : L'accessibilité dès le départ (Idéal Slide 7)

- **En bref** : Rendre un site accessible après coup coûte 3 fois plus cher que de l'intégrer dès le début. 
- Toujours inclure les contraintes d'accessibilité dans son fichier `AGENTS.md` ou ses prompts de départ. Le prochain sujet abordera la propriété intellectuelle du code généré.
