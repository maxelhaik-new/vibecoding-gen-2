# Charte d'Usage des Templates Figma (Vibe Coding)

Ce guide d√©finit les r√®gles d'attribution des templates de slides en fonction de la nature et de la structure du contenu p√©dagogique √† pr√©senter. Il aide l'IA d'√©criture √† s√©lectionner le bon gabarit durant la phase de **`D√âCOUPE`**.

---

## 1. Matrice de S√©lection des Templates

Lors du d√©coupage d'un cours ou d'un chapitre, l'IA doit analyser le but de la slide et choisir le template correspondant dans `templates.json` selon cette grille :

| Nature du contenu | Objectif de la slide | Template √† utiliser |
| :--- | :--- | :--- |
| **Titre / Lancement** | Titre de la le√ßon ou du module complet. | `VIBECODING - COVER` |
| **Transition / Chapitre** | Marquer une transition claire vers un nouveau sujet. | `VIBECODING - COVER CHAP` |
| **Intro / Pr√©sentation g√©n√©rale** | Syst√©matique (apr√®s COVER) : introduire le sujet g√©n√©ral de la le√ßon avec ses 3 grandes notions. | `VIBECODING - INTRO` |
| **Objectif / Sommaire** | Lister des objectifs p√©dagogiques ou √©tapes cl√©s (avec puces). | `VIBECODING - OBJECTIF CHAP` ou `VIBECODING - CHECKLIST` |
| **Concepts structur√©s (3 id√©es)** | Pr√©senter 3 notions courtes (avec picto + titre + texte). | `VIBECODING - 3 BLOCS - LARGE TEXT` ou `VIBECODING - 3 COLONNES` |
| **Concepts structur√©s (4 id√©es)** | Pr√©senter 4 notions courtes (avec picto + titre + texte). | `VIBECODING - 4 BLOCS - TITLE 2 LINES` ou `TEXTE + 4 POINTS` |
| **Concepts structur√©s (5 id√©es)** | Pr√©senter 5 notions courtes (avec picto + titre + texte). | `VIBECODING - 5 BLOCS` ou `VIBECODING - 5 BLOCS - VARIATION` |
| **Concepts structur√©s (6 id√©es)** | Pr√©senter 6 notions courtes (haute densit√© d'ic√¥nes/concepts). | `VIBECODING - 6 BLOCS` |
| **Donn√©es / Statistiques** | Mettre en valeur 3 chiffres ou m√©triques cl√©s. | `VIBECODING - CHIFFRES` |
| **Donn√©es chiffr√©es + Photo** | 3 m√©triques cl√©s accompagn√©es d'un visuel d'illustration. | `VIBECODING - FOCUS OUTIL` |
| **√âtude de cas / R√©cit** | D√©crire un exemple r√©el complet avec une bulle de synth√®se. | `VIBECODING - USE CASE` |
| **Comparatif / Duel** | Comparer deux outils, approches ou options face-√†-face. | `VIBECODING - COMPARAISON` |
| **Processus / √âvolution** | D√©crire un cycle d'√©tapes ordonn√©es ou une progression historique. | `PROCESS` ou `VIBECODING - 2 BLOC - EVOLUTION` |
| **Acronyme** | D√©tailler un acronyme de 3 √† 5 lettres avec description par lettre. | `VIBECODING - ACRONYME` |
| **Concept g√©n√©ral** | Pr√©senter un concept, une id√©e cl√© ou une th√©orie non technique. | `VIBECODING - CONCEPT` |
| **D√©finition** | D√©finir formellement un terme technique ou un mot informatique. | `VIBECODING - DEFINITION` |
| **Sur-mesure / Dessin libre** | Slide personnalis√©e (titre + intro + sch√©ma/√©l√©ments cr√©√©s). | `VIBECODING - VIDE` |
| **Fin de chapitre / Synth√®se** | R√©sum√© de le√## 2. R√®gles d'Architecture et de Diversit√©

Ces r√®gles s'appliquent lors du d√©coupage d'un plan en slides pour garantir un rythme visuel captivant :

*   **Diversification des templates** : Ne jamais utiliser le m√™me template plus de 2 fois dans toute la le√ßon, quel que soit l'ordre.
*   **Exception de r√©p√©tition (Parall√®le)** : L'utilisation de templates identiques cons√©cutifs (m√™me plus de 2 fois) n'est autoris√©e QUE si les slides sont con√ßues pour √™tre lues en parall√®le pour une parit√© visuelle (ex: comparer "Outil A" puis "Outil B" individuellement avec le m√™me layout, ou "Cas 1 : Devs" puis "Cas 2 : Freelances"). Dans les autres cas, la diversification est obligatoire.
*   **Limitation de `VIBECODING - CONCEPT`** : √Ä utiliser UNIQUEMENT pour pr√©senter un mod√®le th√©orique, une notion abstraite (sans que ce soit une simple d√©finition dictionnaire). Si une slide tr√®s textuelle est n√©cessaire pour du contexte ou de la narration, privil√©gier plut√¥t `VIBECODING - USE CASE` (sans en abuser non plus).
*   **Groupement des listes (Densit√© visuelle)** : Si le plan pr√©sente une liste ou une √©num√©ration d'√©l√©ments similaires (ex: liste d'outils, de profils, d'√©tapes, d'exemples), regrouper OBLIGATOIREMENT ces points dans un seul template multi-blocs (`3 BLOCS`, `4 BLOCS`, `5 BLOCS`, `6 BLOCS` ou `COLONNES`) au lieu de cr√©er une slide concept s√©par√©e pour chaque √©l√©ment. Cela r√©duit le bruit et augmente la densit√© visuelle.ngles d'arri√®re-plan, ic√¥nes) doivent √™tre g√©n√©r√©s en sp√©cifiant des actions de type `create_node` dans le JSON de correction en ciblant la slide parente comme conteneur.


