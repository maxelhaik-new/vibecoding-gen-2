🎯 **Objectif pédagogique**

Comprendre le statut juridique du code généré par l'IA, identifier les risques de contrefaçon de licence (GPL, MIT, etc.) et savoir sécuriser son projet logiciel face aux revendications de propriété intellectuelle.

📖 **Contenu de la leçon (Matière brute pour l'Agent)**

### 1. Introduction : À qui appartient le code écrit par une IA ? (Idéal Slide 1-2)

Le droit d'auteur protège les œuvres originales issues de l'esprit humain. En 2026, la jurisprudence internationale refuse d'attribuer des droits d'auteur directs à une IA. Le code brut généré par l'IA tombe donc généralement dans le domaine public s'il n'y a pas d'apport créatif humain significatif.

Le problème ? Bien que le code généré ne soit pas protégeable au départ, il peut reproduire du code existant protégé par des droits d'auteur.

---

### 2. Le risque de reproduction de code sous licence (Idéal Slide 3)

Les modèles de langage sont entraînés sur des milliards de lignes de code public.

- **Copie textuelle** : Un agent de code peut générer une fonction complexe qui est la copie exacte d'un code sous licence restrictive (ex : GPL).
- **Absence de crédit** : L'IA ne cite généralement pas ses sources, exposant l'utilisateur à des accusations de plagiat ou de contrefaçon involontaire.
- **Action** : Être particulièrement vigilant sur les fonctions algorithmiques complexes générées d'un coup.

---

### 3. La contamination par les licences open-source (Idéal Slide 4)

L'insertion de code tiers peut modifier les obligations légales de votre projet.

- **Licences permissives (MIT, Apache)** : Autorisent la réutilisation commerciale sans trop de contraintes.
- **Licences restrictives (GPL, AGPL)** : Obligent tout projet dérivé à être également publié sous licence GPL (effet "copyleft" ou contaminant).
- **Le danger** : Si votre agent injecte du code GPL dans votre SaaS propriétaire, vous risquez de devoir ouvrir tout votre code source au public.

---

### 4. Bonnes pratiques de sécurisation légale (Idéal Slide 5)

Il existe des méthodes pour protéger son code de la contamination de licence.

- **Filtres de duplication** : Activer les filtres anti-duplication dans son IDE (ex : option *"Block suggestions matching public code"* dans GitHub Copilot / Cursor).
- **Scanners de licence** : Utiliser des outils d'analyse automatisés (comme Snyk ou FOSSA) lors de la CI/CD pour vérifier l'origine et la licence des bibliothèques de code.
- **Consigne agent** : Spécifier dans ses prompts : *"N'utilise que des implémentations sous licences MIT ou Apache."*

---

### 5. Secret industriel vs. Brevetabilité (Idéal Slide 6)

L'IA change la façon d'aborder la propriété industrielle.

- **Non-brevetabilité de l'IA** : Un algorithme entièrement conçu par une IA ne peut pas être breveté dans la plupart des pays.
- **Le secret industriel** : Garder son code confidentiel et non distribué reste le moyen le plus sûr de protéger son savoir-faire commercial.
- **Règle** : Ajouter la valeur ajoutée humaine (refactoring, architecture personnalisée) pour revendiquer des droits de propriété intellectuelle sur l'ensemble.

---

### 6. Conclusion : Rester le gardien des licences (Idéal Slide 7)

- **En bref** : L'IA accélère le développement, mais le développeur reste le garant légal des licences utilisées. 
- Toujours filtrer le code généré pour protéger sa propriété intellectuelle. Le sujet suivant traitera de la responsabilité globale du Vibe Coder.
