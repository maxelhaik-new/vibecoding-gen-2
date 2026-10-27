# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Utilisateurs principaux** : Apprenants de la formation "Vibe Coding" (débutants en programmation ou développeurs en transition vers le développement assisté par agents d'IA).
- **Situation d'usage** :
  - En double écran ou fenêtre partagée pendant le visionnage des modules de cours ou les sessions de coding actif (IDE Cursor, Claude Code, Antigravity, GitHub Copilot).
  - En consultation nomade sur smartphone ou tablette pour réviser les notions ou faire des quizz rapides.
- **Job to be done** :
  - Assimiler et retenir les concepts clés et le vocabulaire technique du Vibe Coding.
  - Copier-coller instantanément des prompts opérationnels éprouvés pour débloquer leurs agents IA.
  - S'auto-évaluer via des séries de quizz chronométrées et un examen blanc de 50 questions pour valider leur préparation à la certification.

## Product Purpose

- Agir comme le **compagnon interactif officiel** de la formation Vibe Coding.
- Éliminer le fossé entre la théorie pédagogique et la pratique du code assisté par IA.
- Mesurer le succès par la rapidité d'accès aux ressources (recherche ⌘K instantanée, copie en un clic) et l'autonomie concrète de l'apprenant dans ses projets.

## Positioning

- L'atelier d'apprentissage et de référence rapide dédié au Vibe Coding.
- Contrairement aux LMS traditionnels lourds ou aux documentations statiques dispersées, la plateforme réunit dans un outil web ultra-léger et immédiat :
  1. Un glossaire technique indexé sur les codes leçons du programme (`M1C1L1`...).
  2. Une bibliothèque de prompts de production directement exploitables.
  3. Un simulateur de quizz interactif avec chronomètre, correction immédiate et examen blanc final.
  4. Une sélection d'outils et d'environnements IA indispensables.

## Operating Context

- Conçu pour fonctionner côte-à-côte avec les IDE et terminaux modernes de développement.
- Fonctionnement en application web front-end autonome (Vanilla ES Modules, CSS modulaire, aucun build nécessaire, zéro dépendance lourde, persistance locale `localStorage`).
- Optimisé pour un affichage desktop étendu (grille 1440px) tout en offrant une expérience mobile de premier ordre (app-bar épurée, menu burger plein écran).

## Capabilities and Constraints

### Capacités confirmées
- **Glossaire** : 57 termes avec filtres alphabétiques dynamiques, recherche textuelle instantanée et indexation par leçon.
- **Prompts** : 13 prompts opérationnels de Vibe Coding prêts à l'emploi avec copie clipboard immédiate et toast de confirmation.
- **Quizz & Examen blanc** : Séries modulaires de 10 questions + examen final de 50 questions aléatoires avec chronomètre de 60 secondes, feedback visuel immédiat et calcul de score certifiant (seuil 75%).
- **Outils** : Catalogue d'environnements et d'outils d'IA avec accès direct.
- **Responsive 2026** : Menu burger plein écran en indigo `#18093B` sur mobile/tablette et barre d'onglets dédiée sur desktop.

### Contraintes techniques
- **Zéro page monolithique** : Chaque vue et élément d'interface est strictement isolé dans `components/` et assemblé dans `js/app.js`.
- **Vanilla Web Standard** : Pas de bundler ni de framework JavaScript lourd afin de garantir une exécution instantanée et pérenne.
- **Respect de DESIGN.md** : Typographies, couleurs et rayons strictement conformes au Design System néo-brutaliste documenté.

## Brand Commitments

- **Nom** : Plateforme Formation Vibe Coding / Wemodo.
- **Ton et Voix** : Factuelle, concise, directe, orientée résultats pédagogiques concrets (style "Coding Atelier").
- **Identité visuelle** : Néo-brutalisme 2026 calibré (Midnight Fig `#18093B`, Electric Violet `#6634D9`, Sunny Acid Yellow `#FFFF77`, typographies Plus Jakarta Sans, Inter et Cousine).

## Evidence on Hand

- Plan de cours officiel : `plan-formation-vibe-coding.md` (structure complète des modules 1 à 4).
- Données du glossaire : `js/data/glossary.js`.
- Données des prompts : `js/data/prompts.js`.
- Données des quizz : `js/data/quizz.js`.
- Charte de style pédagogique : `brand_voice.md`.
- Design System et Sidecar : `DESIGN.md` et `.impeccable/design.json`.

## Product Principles

1. **Zéro friction, accès en moins de 3 secondes** : Recherche instantanée au clavier (⌘K), copie de prompt immédiate, aucune latence de chargement.
2. **Clarté pédagogique et utilité opérationnelle** : Chaque composant sert directement l'assimilation ou la pratique du code, sans ornementation parasite.
3. **Modularité architecturale stricte** : Séparation nette entre données (`js/data/`), vues isolées (`components/`) et styles (`css/`).
4. **Ergonomie mobile sans concession** : Cibles tactiles ≥ 44px, typographie minimale de 16px sur les champs pour interdire le zoom forcé iOS, suppression des marges et ombres encombrantes sur smartphone.

## Accessibility & Inclusion

- Contraste élevé certifié (Midnight Fig `#18093B` sur fond clair, texte blanc sur violet et indigo).
- Focus visible et navigation complète au clavier.
- Tailles de police lisibles et cibles tactiles confortables sur tous les écrans.
