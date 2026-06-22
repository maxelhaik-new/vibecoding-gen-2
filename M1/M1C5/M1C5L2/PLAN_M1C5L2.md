<!-- LIMIT: Maximum 10 slides in total (including COVER, INTRO, and FIN). Avoid intermediate COVER CHAP slides to save space. Group the 4 points/concepts into higher density slides (like VIBECODING - 4 BLOCS or similar). -->
---

## Template Plan M1C5L2

### 🎯 Objectif pédagogique

Comprendre la vélocité extrême du Vibe Coding et identifier les risques opérationnels et financiers liés à l'absence de veille pour un projet basé sur l'IA.

---

### 📖 Contenu de la leçon (Matière brute pour l'Agent)

Le **Vibe Coding** a radicalement transformé la création de logiciels, permettant à des non-développeurs de donner vie à des applications complexes par la simple formulation d'intentions. Cependant, cette pratique repose sur une infrastructure technologique en mutation constante. Contrairement au développement traditionnel où un langage (comme Python ou JavaScript) reste relativement stable sur plusieurs années, le Vibe Coding dépend directement des capacités des grands modèles de langage (LLMs) et des outils de développement assistés par IA (comme Cursor, Windsurf, v0 ou Bolt.new).

Dans ce contexte, faire l'impasse sur la veille technologique ne revient pas simplement à manquer une nouveauté : cela expose l'utilisateur à une **obsolescence flash**.

#### 1. Le rythme de renouvellement des modèles et des outils

En matière d'IA générative, les cycles d'innovation ne se comptent pas en années, ni même en semestres, mais en semaines. Un modèle de langage considéré comme le sommet absolu de l'état de l'art en janvier peut se retrouver relégué au second plan dès le mois de mars par une mise à jour mineure d'un concurrent ou une optimisation d'architecture (comme le passage du prompt classique aux modèles de raisonnement natifs). Pour le "Vibe Coder", cela signifie que la manière d'interagir avec la machine change continuellement. Les techniques de "prompt engineering" rigides que l'on enseignait au début de la révolution de l'IA générative sont aujourd'hui nativement gérées par les modes "Agent" des éditeurs modernes.

#### 2. Le piège de la dépréciation (Deprecation) et des ruptures techniques

Les géants de l'IA (OpenAI, Anthropic, Google, DeepSeek) font évoluer leurs catalogues d'API à marche forcée. Les modèles plus anciens et moins efficaces sont régulièrement "dépréciés" (retirés du marché). Si un non-développeur construit un outil interne pour son entreprise et n'anticipe pas ces arrêts programmés, son application cessera tout simplement de fonctionner du jour au lendemain. De plus, les frameworks agentiques (qui permettent à plusieurs IA de collaborer) publient des mises à jour majeures qui modifient en profondeur la syntaxe ou la logique de connexion. Sans un suivi minimal, le code généré automatiquement par une IA obsolète ne pourra plus s'intégrer aux écosystèmes actuels.

#### 3. L'enjeu financier et de performance

Ne pas suivre l'actualité de l'IA, c'est aussi accepter de payer trop cher pour des performances moindres. Le coût du million de tokens (la mesure de facturation des LLMs) s'est effondré de manière spectaculaire au fil des optimisations technologiques. Un créateur de projet qui n'ajuste pas son modèle de choix peut dépenser dix fois plus pour faire tourner son application qu'un concurrent resté à la page. De même, les fenêtres de contexte (la quantité de données qu'une IA peut analyser d'un coup) se sont élargies de manière gigantesque. Passer à côté de cette information force à découper laborieusement son code source en morceaux, alors que les outils actuels permettent d'ingérer un projet entier en une seule invite.

#### 4. Filtrer le bruit pour trouver la confiance

Face à cette accélération, le plus grand danger pour le profil non-développeur est **l'infobésité** et le mirage des réseaux sociaux. Le web regorge de démonstrations spectaculaires mais superficielles ("Effet Wow"). Comprendre pourquoi la veille est vitale, c'est réaliser qu'il faut s'éloigner du bruit marketing pour s'ancrer dans des sources de confiance (analyses techniques de confiance, retours d'expérience documentés, rapports industriels). L'objectif de cette veille n'est pas de tout savoir, mais de savoir ce qui, aujourd'hui, rendra votre code plus stable, plus rapide et moins coûteux.

---

### 📊 Faits & Données clés

* **Chute des coûts des LLMs :** Entre début 2024 et fin 2025, le coût d'accès aux modèles de pointe par million de tokens a été divisé par plus de 10 à performance équivalente, rendant les architectures complexes accessibles aux budgets modestes. — *Rapports sectoriels d'analyse du marché des API, 2025.*
* **Cycles de dépréciation agressifs :** Les leaders du marché comme OpenAI ou Anthropic maintiennent généralement leurs anciens modèles d'API actifs pendant seulement 6 à 12 mois après la sortie d'une version majeure avant de couper définitivement les serveurs. — *Documentations officielles OpenAI / Anthropic, 2025-2026.*
* **Adoption en entreprise :** Selon l'étude annuelle *Retool - State of AI*, plus de 75 % des professionnels de la tech et du digital déclarent modifier ou remplacer au moins un outil ou modèle d'IA dans leur workflow chaque trimestre pour ne pas perdre en compétitivité. — *Retool State of AI Report, 2025.*

---

### 🏢 Cas réel documenté

| Qui | Ce qu'ils ont fait | Résultat chiffré | Source, Année |
| --- | --- | --- | --- |
| **Une agence de création de contenu digitale (PME)** | A construit son outil d'automatisation interne basé sur des scripts figés et un modèle commercial de début 2024, sans maintenir de veille technique sur l'évolution des outils de *Vibe Coding*. | L'application est devenue obsolète en moins de 9 mois. Suite à une mise à jour d'API et à l'explosion des coûts du modèle non optimisé, l'outil a planté, entraînant une interruption de service de **4 jours** et un coût de refonte en urgence évalué à **plus de 12 000 $** pour basculer sur un éditeur de code agentique moderne. | *Étude de cas interne / Analyse de sinistres tech de l'éditeur Low-Code France, 2025.* |

---

### ⚖️ Nuances & Revers

> **Le piège de la paralysie par l'analyse (FOMO - Fear Of Missing Out)**
> La veille en Vibe Coding est un équilibre précaire. Si elle est indispensable, elle comporte deux dérives majeures :
> * **Le syndrome de l'objet brillant :** Passer son temps à changer d'outil ou de modèle à chaque fois qu'une nouvelle vidéo YouTube annonce "la mort de Cursor" ou "le tueur de GPT". À force de reconstruire sa stack technique toutes les deux semaines, on ne livre jamais son projet.
> * **Le temps volé à la pratique :** Lire des newsletters et écouter des podcasts donne l'illusion d'apprendre. En Vibe Coding, la théorie ne remplace jamais le test en conditions réelles. La veille doit soutenir l'action, pas la remplacer. Un bon projet stable sur un modèle vieux de 6 mois vaut mieux qu'un projet jamais fini sur le modèle sorti hier matin.
> 
> 

