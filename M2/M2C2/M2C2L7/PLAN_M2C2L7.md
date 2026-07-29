# Plan de la leçon M2C2L7 — Cadrer le design et l'UX/UI de son application

Cette leçon présente de manière ultra-pratique comment guider graphiquement l'IA dans son premier prompt sans avoir besoin de faire des maquettes complexes. On y détaille les consignes de layout, de couleurs et de boutons à imposer.

## Découpage des Slides (7 slides)

1. **Slide 1 : Cover** (`VIBECODING - COVER`)
   - Titre : Cadrer le design du MVP
   - Sous-titre : UX/UI et consignes graphiques pour l'IA

2. **Slide 2 : Introduction** (`VIBECODING - INTRO`)
   - Titre : Donner un cadre visuel à l'IA
   - Accroche : L'IA sait coder le CSS mais n'a aucun goût esthétique. Sans directives précises, elle produit des interfaces surchargées ou obsolètes. Voyons comment la brider.
   - Bloc 1 : La disposition ou Layout (Voyons comment imposer un agencement d'écran standard et stable pour l'IA.)
   - Bloc 2 : La palette de couleurs (Focus sur la règle simple pour répartir les teintes sans saturer l'écran.)
   - Bloc 3 : Le style des composants (Découvrons les contraintes à donner pour le style des boutons et des cartes.)

3. **Slide 3 : La disposition (Layout)** (`VIBECODING - DEFINITION`)
   - Titre : Choisir une structure d'écran
   - Mot : Le Layout à deux colonnes
   - Définition : L'agencement de base des zones de l'application. Pour un outil de gestion ou un MVP, on impose une structure classique : une barre latérale étroite à gauche (largeur 250px) pour la navigation et un grand panneau blanc ou gris clair à droite pour le contenu. C'est la structure la plus stable et la mieux maîtrisée par les modèles de code.
   - Bulle : Éviter les dispositions trop originales ou complexes qui perturbent la génération logique de l'IA.

4. **Slide 4 : La règle des couleurs** (`VIBECODING - DEFINITION`)
   - Titre : Éviter l'effet sapin de Noël
   - Mot : La règle 60-30-10
   - Définition : Une formule simple pour équilibrer les couleurs d'une interface : 60% pour la couleur dominante (ex. un fond gris très clair `bg-gray-50`), 30% pour la couleur secondaire (ex. des cartes blanches `bg-white` et du texte sombre), et 10% pour la couleur d'accentuation (ex. des boutons indigo `bg-indigo-600`). On demande explicitement à l'IA de respecter ce ratio.
   - Bulle : Imposer une unique couleur d'accentuation pour tous les éléments cliquables de l'application.

5. **Slide 5 : Le style des composants** (`VIBECODING - COMPARAISON`)
   - Titre : Préciser le style des boutons et cartes
   - Comparatif de ce que produit l'IA selon la précision des instructions de style.
   - Titre Gauche : SANS DIRECTIVES
   - Texte Gauche : L'IA génère des boutons rectangulaires gris, des bordures noires agressives, des ombres trop lourdes et des polices système basiques.
   - Titre Droite : DIRECTIVES IMPOSÉES
   - Texte Droite : Boutons avec coins arrondis (`rounded-lg`), effets de survol (`hover`), cartes avec bordure grise très fine (`border-gray-200`) et ombres subtiles.

6. **Slide 6 : À vous de jouer : Rédiger le brief design** (`VIBECODING - EXERCICE`)
   - Titre : À vous de jouer : Votre premier brief design
   - Exercice pratique pour rédiger les consignes visuelles complètes d'un projet fil rouge ou d'une idée personnelle, prêtes à être envoyées à l'IA.
   - Étape 1 : Choisir le layout (barre latérale ou barre supérieure)
   - Étape 2 : Définir la couleur d'accentuation en Tailwind (ex: `blue-600`, `emerald-500`)
   - Étape 3 : Rédiger le paragraphe de style pour les boutons et les cartes

7. **Slide 7 : Synthèse** (`VIBECODING - FIN`)
   - Titre : Ce qu'il faut retenir
   - Le design d'un MVP ne demande pas de maquette graphique complexe. Il suffit de donner 3 règles simples à l'IA : un layout classique, une seule couleur d'accentuation, et un style de composant épuré via Tailwind. C'est l'assurance d'obtenir une interface propre, ergonomique et sans bug d'affichage.
   - Transition : Le cahier des charges technique et graphique est complet. Dans le prochain chapitre : comment assembler ces éléments pour rédiger et envoyer le premier prompt.
