# Transcription du Chapitre 5 (Module 2) : La sécurité dès le prompt

Ce document contient la transcription textuelle épurée et structurée, slide par slide, de l'ensemble des leçons du chapitre.

---
# Leçon : M2C5L1 — Les objectifs du chapitre : la sécurité dès le prompt

## Slide 1 : Sécurité et prompts sûrs avec l'IA

## Slide 2 : Les objectifs du chapitre

Connaître les risques de sécurité et de confidentialité lors de l'interaction avec les IA. Protéger ses données sensibles et à sécuriser ses applications.

**Comprendre la protection des données et l'IA**

**Sécuriser le traitement des données sensibles**

**Protéger ses secrets et ses clés API de l'IA**

**Appliquer une checklist de sécurité des prompts**

**Détecter et corriger une fuite de données**

**Adopter les bonnes pratiques de sécurité**


---
# Leçon : M2C5L2

## Slide 1 : Comprendre les défis et enjeux de la protection de données

## Slide 2 : Ce qu’on va découvrir dans la leçon

L'apprentissage automatique vise à extraire des tendances générales sur la population. On pourrait croire que les données individuelles ne seraient pas conservées dans le modèle final. Qu’en est-il réellement ?

**Les données sensibles**

Voyons quelles données sensibles sont à protéger, pourquoi, et de quelles types de dangers ?

**La protection des données**

Comment protéger les donner personnelles tout en garantissant la bonne utilisation des modèles d’IA ?


## Slide 3 : Les données sensibles

Les bonnes pratiques de l’utilisation de l’IA consistent à ne partager que les informations strictement nécessaires, et éviter les données sensibles :

**Données 
personnelles**

Informations régulées par des législations sur la protection de la vie privée et des données individuelles.

**→ Noms, emails, numéros de tel., adresses, dates de naissance**

**Données confidentielles**

Éléments protégés par des accords de confidentialité et des obligations contractuelles strictes.

**→ Contrats, informations financières, données de clients**

**Propriété intellectuelle**

Informations couvertes par des droits de propriété légaux.

→ Brevets, secrets industriels, innovations, créations artistiques...

**Autres données sensibles**

Informations qui peuvent porter préjudice à des personnes physiques ou morales.

→ Données médicales, finances, opinions politiques, données biométriques...


## Slide 4 : Les différents types d’attaque

Ces données mémorisées, même si elles sont difficiles à atteindre, peuvent être récupérées par des personnes malveillantes, en attaquant les concepteurs du modèle, ou le modèle lui même via son interface. Il existe différent type d’attaques :

**L’Inférence d'appartenance**

Déterminer si les données d'une personne figuraient dans l'ensemble d'entraînement

**L’Inférence d'attributs**

**La reconstruction partielle ou locale des données d'entraînement**


## Slide 5 : Comment garantir la confidentialité ?

Dans les années 2000, des chercheurs en cryptographie et en sécurité des données ont proposé une définition mathématique de la confidentialité d'un algorithme :

%2Ed°+a142Ma5.

“Un algorithme confidentiel doit nécessairement comporter une part d'aléa, une partie imprévisible ajoutée au moment du traitement.”

Cela revient à ajouter du bruit aux calculs pour brouiller les pistes et éviter de trouver une information précise dans le lot de données du modèle d’IA.


## Slide 6 : Le compromis Confidentialité • Utilité

Plus on ajoute de l’aléa, plus les garanties de confidentialité sont fortes, mais plus la qualité du modèle IA diminue.

Réussir à entraîner de très grands modèles avec de fortes garanties de confidentialité est un problème encore largement ouvert et un sujet de recherches actives.


## Slide 7 : L’apprentissage décentralisé

Cependant, l'algorithme doit quand même avoir accès aux données pour réaliser l'entraînement. Cela pose problème dans certains cas d'usage, comme par exemple les hôpitaux hébergeant les données de leurs patients, les objets connectés, les applications mobiles, etc. On peut alors décentraliser l’entraînement :

**Hôpital**

1. Chaque participant

**garde ses données localement (Téléphone, hôpital)**

2. Le modèle d'IA s'entraîne

**Indépendemment sur chaque appareil**

3. Chaque appareil envoie

juste les mises à jour (et non les données brutes) à un serveur central (modèle)

4. Le serveur regroupe

toutes les mises à jour et améliore le modèle global sans avoir accès aux données !

**Modèle Global**

**mise à jour**

**Modèle amélioré**


## Slide 8 : RGPD : Le cas de Clearview AI

**adjugé vendu !**

**Clearview AI - Collecte massive de données biométriques**

Entre 2016 et 2024, Clearview AI a collecté plus de 30 milliards d'images faciales en copiant frauduleusement le contenu de sites web publics (Facebook, Instagram, LinkedIn, YouTube) sans autorisation. Cette base de données a été vendue à des forces de l'ordre et entreprises privées pour de la reconnaissance faciale en temps réel.

Résultats : Amendes records données en France (20M€), Italie (20M€), UK (9M£), Grèce (20M€). Interdiction totale en Europe. Poursuites judiciaires aux USA. C’est le cas le plus emblématique de la surveillance de masse par l'IA.

Image : BBC - “Clearview AI used nearly 1m times by US police, it tells the BBC”


## Slide 9 : Ce qu’il faut retenir

Les techniques de protection des données pour l'entraînement des modèles d'IA ont fait des avancées notables mais sont freinées par les enjeux de performance. Il donc est essentiel de bien réfléchir avant de confier des données personnelles ou sensibles à un système d'IA.

**Comment faire ?**

L’IA Act impose des garanties de protection des données (RGPD) pour justement nous protéger et encadrer nos usages. Découvrons les ensemble !


---
# Leçon : M2C5L3

## Slide 1 : Sécuriser les données sensibles  pour l’IA générative

## Slide 2 : Ce qu’on va découvrir dans la leçon

Avec les enjeux de données personnelles que nous avons abordé, être responsables des données utilisés dans le cadre de l’IA. Voyons ensemble les bonnes pratiques et méthodes à adopter !

**Posture et réflexes**

Focus sur les bonnes pratiques, les questions à se poser et les réflexes à adopter pour identifier les données à risques.

**Protection des données**

Apprenons concrètement à sécuriser un prompt pour éviter de transmettre les informations sensibles à des modèles d’IA génératives en contexte pro.


## Slide 3 : Sécuriser un prompt pour l'IA

**Étape 1 : Identification du risque**

→ Evaluer le risque du prompt initial : données personnelles, données sensibles, informations confidentielles...
→ Questionner la nécessité : toutes ces données sont-elles indispensables pour la finalité ?

**Étape 2 : Transformation**

→ Remplacer les noms et emails par des pseudonymes (« Employé A », « Employé B »)
→ Agréger et généraliser : tranches de salaires plutôt que valeurs exactes

**Étape 3 : Reformulation du prompt**

→ Nouveau prompt responsable : utiliser données pseudonymisées et agrégées
→ Supprimer les identifiants personnels et accès directs aux données sensibles

**Étape 4 : Validation et supervision**

→ Validation humaine de la conformité des données et contrôle des sorties
→ Traçabilité : conserver prompt, version du modèle, transformations appliquées


## Slide 4 : Quelques méthodes de sécurisation

**Minimisation des données**

**Pseudonymisation des données**

**Anonymisation des données**

Ne transmettre au modèle que les données strictement nécessaires à la finalité du traitement.

Remplacer les identifiants directs par des pseudonymes avec possibilité de réidentification

Transformer les données de manière irréversible pour rendre toute réidentification impossible ou extrêmement improbable.

Limiter la collecte et le partage au minimum requis. Simplifie la conformité RGPD / IA Act

Protection réversible qui rend l'identification impossible sans information additionnelle.

Protection maximale sans possibilité de retour.

« Environ 12 000€», “ Salaires par tranche”...

**“Client_A2547”, “Contrat 2203”**

**“Une cliente”**


## Slide 5 : Exemple d’anonymisation de prompt

**PROMPT AVEC DONNÉES
médicales**

**PROMPT ANONYMISÉ**

"Génère un résumé médical pour une patiente, atteinte de diabète de type 2 diagnostiqué récemment"

Génère un résumé médical pour : Marie Dubois
15 rue des Lilas à Lyon
Diabète de type 2 diagnostiqué le 12/03/2023. 
N°: 2 89 03 69 078 456 32

**anonymisation**

Suppression du nom, adresse, dates précises, numéro de sécurité sociale et conservation uniquement des données médicales nécessaires


## Slide 6 : Exemple de pseudonymisation de prompt

**PROMPT AVEC DONNÉES
confidentielles**

**PROMPT CORRIGé**

Rédige un email professionnel pour relancer le client C1, SIRET xxx xxx xxx, habitant 1 rue xxxxxx 75015 Paris, qui n'a pas répondu au devis de refonte de site e-commerce n°2024-111. Montant à mentionner M1. Ton cordial mais insistant.

Rédige un email pour relancer Jean Martin, SIRET 123 456 789, habitant 15 rue Victor Hugo 75015 Paris, pour le devis n°2024-456 de 12 500€ concernant la refonte de son site e-commerce.

**PSEUDONYMISATION**

Remplacer noms, adresses, emails, SIRET, références internes, montant par des alias ou des codes. Garder uniquement le contexte fonctionnel.


## Slide 7 : Exemple de minimisation de prompt

**PROMPT AVEC DONNÉES
PERSONNELLES**

**PROMPT minimisé**

Voici une agrégation de salaires par équipe et par tranche. Propose des pistes d'optimisation.

Voici notre fichier interne de salaires 2025. Optimise nos coûts.

**GRILLE_SALAIRE_INT_25**

**GRILLE_SALAIRE_ANONYMISE_25**

**MINIMISATION**

Tranches de salaires (20-40k, 40-60k, 60-80k) au lieu de valeurs exactes. Regroupement par service sans identifiants personnels.


## Slide 8 : Les autres questions à se poser

**Avant d'utiliser un outil d'IA, posez-vous ces 5 questions essentielles :**

**Qui a développé cet outil ?**

Identifiez l'entreprise ou l'organisation derrière l'outil. Vérifiez sa réputation, sa transparence et son engagement éthique.

**Quelles données utilise-t-il ?**

Comprenez sur quelles données le modèle a été entraîné et quelles données vous devez fournir pour l'utiliser.

**Mes données sont-elles protégées ?**

Vérifiez la politique de confidentialité, le respect du RGPD, et comment vos données seront stockées et utilisées.

**Existe-t-il un recours ?**

En cas d'erreur ou de décision injuste, pouvez-vous contester ? Y a-t-il un support humain accessible ?


## Slide 9 : Nos droits personnels à réclamer !

Le RGPD nous protège en nous conférant 6 droits fondamentaux. Nous pouvons les utiliser et les réclamer pour nous protéger. Ces droits s'appliquent à tous les systèmes d'IA traitant vos données personnelles dans l'UE.

**Droit d'accès**

**Droit de rectification**

Nous pouvons demander à consulter toutes les données personnelles qu'un système d'IA détient sur nous.

Nous pouvons exiger la correction des données inexactes ou incomplètes nous concernant.

**Droit d'opposition**

**Droit à la portabilité**

Nous pouvons refuser que nos données soient utilisées pour certaines finalités, notamment le profilage.

Nous pouvons récupérer nos données dans un format structuré pour les transférer à un autre service.

**Droit à l'effacement**

**Droit à l'explicabilité**

Nous pouvons demander la suppression de nos données personnelles (droit à l'oubli).

Pour toute décision automatisée nous concernant, nous avons le droit d'obtenir une explication humaine.


## Slide 10 : Ce qu’il faut retenir

Protéger les données dans vos prompts est essentiel : après avoir analysé la sensibilité des données transmises àl’IA, il faut minimiser ce que l’on transmet, pseudonymiser les identifiants sensibles, et les anonymiser de manière irréversible quand c'est possible. Connaître nos droits nous permet de maîtriser et sécuriser ces données.

**EN RÉSUMÉ**

Adaptez votre niveau de protection selon la sensibilité des données et la finalité du traitement.

