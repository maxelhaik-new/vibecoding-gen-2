# Quizz Grand Public - Export

Ce dossier contient l'ensemble des fichiers nécessaires au fonctionnement et à l'analyse du **Quiz IA Grand Public** (issu de `wemodo-ia-lab`).

---

## 📁 Arborescence des fichiers

```text
quizz-export/
├── README.md                           # Documentation de l'export
├── api/
│   └── scores.ts                       # Endpoint API Serverless (Vercel / Upstash KV) pour le leaderboard
└── src/
    ├── apps/
    │   └── AIQuiz/
    │       └── AIQuiz.tsx              # Composant React principal du Quiz
    ├── assets/
    │   └── logos/
    │       └── wemodo logo.svg         # Logo utilisé dans BrutalistUI
    ├── components/
    │   ├── BrutalistUI.tsx             # Composants néobrutalistes (Boutons, Cartes, Loader, Logo)
    │   └── Leaderboard.tsx             # Composant d'affichage du classement
    ├── data/
    │   └── quizzes/
    │       ├── gen-ai.json             # Questions du quiz (level1, level2, level3, level4)
    │       └── index.ts                # Chargeur dynamique getQuizData
    ├── hooks/
    │   ├── useLeaderboard.ts           # Hook de gestion des scores (local + API KV)
    │   └── usePersistentState.ts       # Hook de persistance localStorage
    ├── styles/
    │   └── index.css                   # Styles CSS néobrutalistes & palette de couleurs
    └── types.ts                        # Types TypeScript (Question, QuizState, LeaderboardEntry)
```

---

## ⚙️ Dépendances NPM requises

Pour intégrer ces fichiers dans un projet React :

* `motion` (`motion/react`) : animations et transitions.
* `lucide-react` : icônes d'interface.
* `tailwindcss` : stylage utility-first (classes néobrutalistes définies dans `styles/index.css`).

---

## 🔄 Flux de fonctionnement

1. **Sélection du niveau** : L'utilisateur choisit un niveau (1 à 4) dans `AIQuiz.tsx`.
2. **Chargement des questions** : `getQuizData('GEN_AI', 'levelX')` charge les questions depuis `gen-ai.json`.
3. **Déroulement du quiz** :
   * Minuteur de transition après chaque réponse validée.
   * Feedback visuel immédiat (bonne/mauvaise réponse avec explications).
   * Persistance de la progression avec `usePersistentState`.
4. **Fin et classement** :
   * Affichage du score final.
   * Enregistrement du pseudo et du score via `useLeaderboard`.
   * Affichage du classement local (`localStorage`) synchronisé avec l'API (`/api/scores`).
