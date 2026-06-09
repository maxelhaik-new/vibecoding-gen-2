# Jeu de Test Dynamique : Procédure de Génération de Leçon

Ce document définit la procédure que l'IA doit exécuter immédiatement lorsque l'utilisateur demande de **« lancer le jeu de test »** ou de **« générer la leçon de test »**. 

Cette méthode garantit la scalabilité du projet : si de nouveaux templates sont validés dans `templates.json`, ils seront automatiquement intégrés lors du prochain test.

---

## Procédure d'Exécution pour l'IA

### Étape 1 : Analyse des Templates Actifs
1. Charger le fichier [templates.json](./templates.json).
2. Extraire la liste de tous les templates dont le statut est `"status": "validé"`. *Ignorer strictement les templates en statut "en attente"*.

### Étape 2 : Définition du Sujet
1. Identifier le sujet demandé par l'utilisateur.
2. Si aucun sujet n'est précisé, utiliser le sujet par défaut : **« Prise en main et fondamentaux du Vibe Coding »**.

### Étape 3 : Rédaction Didactique
Pour chaque template validé extrait à l'Étape 1, rédiger une slide cohérente sur le sujet choisi en appliquant les règles suivantes :
*   **Style & Ton** : Appliquer les règles de [brand_voice.md](./brand_voice.md) (bannir "tu"/"vous", privilégier le "on", utiliser des infinitifs pour les objectifs et listes, des phrases de moins de 15 mots).
*   **Sélection des Icônes** : Utiliser [icon_mapping.md](./icon_mapping.md) pour choisir des icônes sémantiquement alignées avec le sujet de chaque bloc (ou appliquer le fallback métaphorique ludique si nécessaire).
*   **Contraintes de longueur** : Respecter les limites strictes de caractères (`min_lenght` / `max_lenght` ou marge de +/-10% sur `target_lenght`) pour chaque champ de texte du template.

### Étape 4 : Format de Restitution
L'IA doit restituer le résultat dans le chat sous la forme suivante :
1. **Rapport d'analyse** : Lister le sujet retenu et le nombre de templates validés trouvés.
2. **Texte des slides (Lecture Humaine)** : Présenter la rédaction dans un format markdown lisible (titre en **gras**, intros en *italique*), sans clés techniques ni limites de caractères apparentes.
3. **Bloc JSON final** : Fournir l'objet JSON racine `{"slides": [...]}` contenant toutes les slides prêtes à être générées dans Figma.
