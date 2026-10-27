// QuizzView Component (Standard 2026 Wide Desktop Grid — WCAG 2.1 AA Verified)
import { showToast } from './Toast.js';

export function initQuizzView(container, quizData) {
  const QUIZ_STORAGE_KEY = 'vibecoding_quiz_scores_v1';
  const QUIZ_LAST_USER_KEY = 'vibecoding_quiz_last_user';

  let activeQuizModule = null;
  let activeQuizQuestions = [];
  let currentQuestionIndex = 0;
  let quizScore = 0;
  let quizTimerInterval = null;
  let quizSecondsLeft = 60;
  let quizSelectedOption = null;
  let quizHasValidated = false;
  let quizSessionHistory = [];
  let keydownHandler = null;

  function escapeHtml(str) {
    return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  function shuffleArray(arr) {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function getStoredScores() {
    try {
      return JSON.parse(localStorage.getItem(QUIZ_STORAGE_KEY)) || {};
    } catch {
      return {};
    }
  }

  function getBestScore(moduleId) {
    const scores = getStoredScores();
    const list = scores[moduleId] || [];
    if (list.length === 0) return null;
    return list.reduce((best, cur) => cur.score > best.score ? cur : best, list[0]);
  }

  function saveScore(moduleId, pseudo, score, total) {
    const scores = getStoredScores();
    if (!scores[moduleId]) scores[moduleId] = [];
    const pct = Math.round((score / total) * 100);
    const dateStr = new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });
    scores[moduleId].push({ pseudo, score, total, percentage: pct, date: dateStr });
    scores[moduleId].sort((a, b) => b.score - a.score);
    scores[moduleId] = scores[moduleId].slice(0, 10);
    try {
      localStorage.setItem(QUIZ_STORAGE_KEY, JSON.stringify(scores));
      localStorage.setItem(QUIZ_LAST_USER_KEY, pseudo);
    } catch {}
  }

  container.innerHTML = `
    <!-- ÉCRAN 1 : LISTE DES MODULES -->
    <div id="quizScreenModules" style="display: block;">
      <div class="quiz-modules-grid" id="quizModulesGrid"></div>

      <div class="quiz-featured-card" id="cardFinalExam" style="margin-top: 1.5rem;" tabindex="0" role="button" aria-label="Lancer le Grand Examen Blanc de 50 questions">
        <div class="quiz-featured-top">
          <div class="quiz-featured-badges">
            <span class="brand-badge">Simulation Officielle</span>
            <span class="quiz-card-meta">50 Questions • Tirage aléatoire</span>
          </div>
          <span class="filter-pill quiz-score-pill-empty" id="examBestScoreBadge">Non complété</span>
        </div>
        <h2 class="quiz-featured-title">
          Grand Examen Blanc (50 Questions)
        </h2>
        <p class="quiz-featured-desc">
          Épreuve globale chronométrée couvrant l'ensemble des compétences de la certification Vibe Coding. Simulation intégrale des conditions d'examen avec corrigé et explications détaillées.
        </p>
        <div class="quiz-featured-footer">
          <span class="quiz-card-meta">60s par question • Seuil requis : 75% (38/50)</span>
          <span class="filter-pill active quiz-featured-cta" aria-hidden="true">
            Lancer l'Examen Blanc (50 Q) →
          </span>
        </div>
      </div>
    </div>

    <!-- ÉCRAN 2 : SESSION DE QUIZ -->
    <div id="quizScreenGame" style="display: none;">
      <div class="quiz-game-toolbar">
        <button class="filter-pill" id="btnQuitQuiz" type="button">✕ Quitter l'entraînement</button>
        <div class="quiz-game-status">
          <span id="quizTimerTag" class="quiz-timer-tag">60s</span>
          <span id="quizProgressTag" class="counter-tag">Question 1/10</span>
        </div>
      </div>

      <div class="card-item quiz-question-card">
        <div class="quiz-question-category" id="quizQuestionCategory">Compétence</div>
        <h2 id="quizQuestionText" class="quiz-question-title">Intitulé de la question</h2>
        
        <div id="quizOptionsList" class="quiz-options-list"></div>

        <!-- Encart d'explication pédagogique immédiate -->
        <div id="quizExplanationBox" class="quiz-explanation-box" role="status" aria-live="polite">
          <div id="quizExplanationStatus" class="quiz-explanation-status"></div>
          <p id="quizExplanationText" class="quiz-explanation-text"></p>
        </div>

        <div class="quiz-game-footer">
          <span class="quiz-shortcuts-hint">Raccourcis : touches [1], [2], [3], [4] puis [Entrée]</span>
          <button id="btnValidateQuiz" class="tool-card-btn quiz-validate-btn" type="button">Valider ma réponse</button>
        </div>
      </div>
    </div>

    <!-- ÉCRAN 3 : BILAN -->
    <div id="quizScreenBilan" style="display: none;">
      <div class="card-item quiz-bilan-card">
        <h2 class="quiz-featured-title">Bilan de votre session</h2>
        <div class="quiz-bilan-score-row">
          <span id="quizBilanScore" class="quiz-bilan-score">0</span>
          <span id="quizBilanTotal" class="quiz-bilan-total">/ 10</span>
          <span id="quizBilanPercentage" class="counter-tag quiz-bilan-pct">0%</span>
        </div>
        <p id="quizBilanComment" class="quiz-bilan-comment"></p>
        
        <div class="quiz-bilan-actions">
          <button id="btnRetryQuiz" class="filter-pill active quiz-bilan-btn" type="button">Recommencer ce module</button>
          <button id="btnReturnModules" class="filter-pill quiz-bilan-btn" type="button">← Retour aux modules</button>
        </div>

        <!-- Section Revue Détaillée des Réponses -->
        <div id="quizReviewContainer" class="quiz-review-container">
          <button id="btnToggleReview" class="filter-pill quiz-review-toggle" type="button">
            <span>Revoir les questions et explications pédagogiques</span>
            <span id="reviewToggleIcon">▼</span>
          </button>
          <div id="quizReviewList" class="quiz-review-list"></div>
        </div>
      </div>
    </div>
  `;

  const screenModules = container.querySelector('#quizScreenModules');
  const screenGame = container.querySelector('#quizScreenGame');
  const screenBilan = container.querySelector('#quizScreenBilan');
  const modulesGrid = container.querySelector('#quizModulesGrid');
  const cardFinalExam = container.querySelector('#cardFinalExam');
  const btnQuit = container.querySelector('#btnQuitQuiz');
  const btnValidate = container.querySelector('#btnValidateQuiz');
  const btnRetry = container.querySelector('#btnRetryQuiz');
  const btnReturn = container.querySelector('#btnReturnModules');

  function renderModules() {
    modulesGrid.innerHTML = quizData.modules.map(m => {
      const best = getBestScore(m.id);
      const scoreBadge = best 
        ? `<span class="filter-pill quiz-score-pill-done">${best.score}/${best.total} (${best.percentage}%)</span>`
        : `<span class="filter-pill quiz-score-pill-empty">Non complété</span>`;

      return `
        <div class="quiz-card" data-module-id="${m.id}" tabindex="0" role="button">
          <div>
            <div class="quiz-card-header">
              <span class="ref-code">${escapeHtml(m.code)}</span>
              ${scoreBadge}
            </div>
            <h3 class="quiz-card-title">${escapeHtml(m.title)}</h3>
            <p class="quiz-card-desc">${escapeHtml(m.description)}</p>
          </div>
          <div class="quiz-card-footer">
            <span class="quiz-card-meta">${m.questions.length} questions dispo</span>
            <span class="quiz-card-cta">Démarrer (10 Q) →</span>
          </div>
        </div>
      `;
    }).join('');

    const examBest = getBestScore('final-exam');
    const examBadge = container.querySelector('#examBestScoreBadge');
    if (examBest && examBadge) {
      examBadge.textContent = `${examBest.score}/${examBest.total} (${examBest.percentage}%)`;
      examBadge.classList.remove('quiz-score-pill-empty');
      examBadge.classList.add('quiz-score-pill-done');
    }
  }

  function setupKeyboardShortcuts() {
    removeKeyboardShortcuts();
    keydownHandler = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      if (!quizHasValidated) {
        if (['1', '2', '3', '4'].includes(e.key)) {
          const idx = parseInt(e.key, 10) - 1;
          const buttons = container.querySelectorAll('.quiz-option-btn');
          if (buttons[idx]) {
            buttons[idx].click();
          }
        } else if (e.key === 'Enter' && quizSelectedOption !== null) {
          e.preventDefault();
          btnValidate.click();
        }
      } else {
        if (e.key === 'Enter') {
          e.preventDefault();
          btnValidate.click();
        }
      }
    };
    window.addEventListener('keydown', keydownHandler);
  }

  function removeKeyboardShortcuts() {
    if (keydownHandler) {
      window.removeEventListener('keydown', keydownHandler);
      keydownHandler = null;
    }
  }

  function startQuiz(moduleId) {
    removeKeyboardShortcuts();
    clearInterval(quizTimerInterval);
    currentQuestionIndex = 0;
    quizScore = 0;
    quizSelectedOption = null;
    quizHasValidated = false;
    quizSessionHistory = [];

    if (moduleId === 'final-exam') {
      activeQuizModule = quizData.finalExam;
      let pool = [];
      quizData.modules.forEach(m => pool.push(...m.questions));
      const targetCount = 50;
      let examQuestions = [];
      while (examQuestions.length < targetCount && pool.length > 0) {
        const shuffled = shuffleArray(pool);
        const needed = targetCount - examQuestions.length;
        examQuestions.push(...shuffled.slice(0, needed));
      }
      activeQuizQuestions = examQuestions;
    } else {
      activeQuizModule = quizData.modules.find(m => m.id === moduleId);
      if (!activeQuizModule) return;
      const targetCount = 10;
      let series = [];
      while (series.length < targetCount && activeQuizModule.questions.length > 0) {
        const shuffled = shuffleArray(activeQuizModule.questions);
        const needed = targetCount - series.length;
        series.push(...shuffled.slice(0, needed));
      }
      activeQuizQuestions = series;
    }

    screenModules.style.display = 'none';
    screenBilan.style.display = 'none';
    screenGame.style.display = 'block';

    displayQuestion();
  }

  function displayQuestion() {
    quizSelectedOption = null;
    quizHasValidated = false;
    btnValidate.textContent = "Valider ma réponse";
    btnValidate.disabled = true;

    const explBox = container.querySelector('#quizExplanationBox');
    if (explBox) {
      explBox.style.display = 'none';
      explBox.classList.remove('is-correct', 'is-wrong');
    }

    const q = activeQuizQuestions[currentQuestionIndex];
    container.querySelector('#quizProgressTag').textContent = `Question ${currentQuestionIndex + 1} / ${activeQuizQuestions.length}`;
    container.querySelector('#quizQuestionCategory').textContent = q.competence || "Compétence Vibe Coding";
    container.querySelector('#quizQuestionText').textContent = q.text || q.question || '';

    const list = container.querySelector('#quizOptionsList');
    list.innerHTML = q.options.map((opt, idx) => `
      <button class="quiz-option-btn filter-pill" data-idx="${idx}" type="button">
        <span class="quiz-option-key">${idx + 1}</span>
        <span>${escapeHtml(opt)}</span>
      </button>
    `).join('');

    // Timer 60s
    clearInterval(quizTimerInterval);
    quizSecondsLeft = 60;
    const timerTag = container.querySelector('#quizTimerTag');
    timerTag.textContent = `${quizSecondsLeft}s`;
    timerTag.classList.remove('urgent');

    quizTimerInterval = setInterval(() => {
      quizSecondsLeft--;
      timerTag.textContent = `${quizSecondsLeft}s`;
      if (quizSecondsLeft <= 10) {
        timerTag.classList.add('urgent');
      }
      if (quizSecondsLeft <= 0) {
        clearInterval(quizTimerInterval);
        validateAnswer(true);
      }
    }, 1000);

    setupKeyboardShortcuts();
  }

  function validateAnswer(timeout = false) {
    if (quizHasValidated) return;
    quizHasValidated = true;
    clearInterval(quizTimerInterval);

    const q = activeQuizQuestions[currentQuestionIndex];
    const isCorrect = !timeout && (quizSelectedOption === q.correctAnswer);

    if (isCorrect) quizScore++;

    quizSessionHistory.push({
      questionText: q.text || q.question || '',
      competence: q.competence || '',
      options: q.options,
      selectedIndex: quizSelectedOption,
      correctIndex: q.correctAnswer,
      isCorrect: isCorrect,
      explanation: q.explanation || '',
      timeout: timeout
    });

    const buttons = container.querySelectorAll('.quiz-option-btn');
    buttons.forEach((btn, idx) => {
      btn.disabled = true;
      btn.classList.remove('active');
      if (idx === q.correctAnswer) {
        btn.classList.add('correct');
      } else if (idx === quizSelectedOption && !isCorrect) {
        btn.classList.add('incorrect');
      } else {
        btn.classList.add('is-locked-neutral');
      }
    });

    const explBox = container.querySelector('#quizExplanationBox');
    const explStatus = container.querySelector('#quizExplanationStatus');
    const explText = container.querySelector('#quizExplanationText');
    if (explBox && explText && explStatus) {
      explBox.style.display = 'block';
      explBox.classList.remove('is-correct', 'is-wrong');
      if (isCorrect) {
        explBox.classList.add('is-correct');
        explStatus.textContent = '✓ Bonne réponse !';
      } else {
        explBox.classList.add('is-wrong');
        explStatus.textContent = timeout ? 'Temps écoulé !' : '✗ Réponse incorrecte';
      }
      explText.textContent = q.explanation || "Consultez le glossaire et la documentation du cours pour approfondir ce concept.";
    }

    btnValidate.disabled = false;
    btnValidate.textContent = (currentQuestionIndex + 1 < activeQuizQuestions.length) ? "Question suivante →" : "Voir le bilan final →";
  }

  container.querySelector('#quizOptionsList').addEventListener('click', (e) => {
    if (quizHasValidated) return;
    const btn = e.target.closest('.quiz-option-btn');
    if (!btn) return;
    quizSelectedOption = parseInt(btn.dataset.idx, 10);
    container.querySelectorAll('.quiz-option-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    btnValidate.disabled = false;
  });

  btnValidate.addEventListener('click', () => {
    if (!quizHasValidated) {
      validateAnswer(false);
    } else {
      currentQuestionIndex++;
      if (currentQuestionIndex < activeQuizQuestions.length) {
        displayQuestion();
      } else {
        finishQuiz();
      }
    }
  });

  function renderReviewList() {
    const reviewList = container.querySelector('#quizReviewList');
    if (!reviewList) return;
    reviewList.innerHTML = quizSessionHistory.map((item, idx) => {
      const badge = item.isCorrect 
        ? `<span class="ref-code quiz-review-badge-ok">✓ Correct</span>`
        : `<span class="ref-code quiz-review-badge-ko">✗ Erreur</span>`;
      
      const userChoiceText = (item.selectedIndex !== null && item.options && item.options[item.selectedIndex]) 
        ? item.options[item.selectedIndex] 
        : (item.timeout ? 'Temps écoulé (aucune réponse)' : 'Non répondu');
      const correctChoiceText = (item.options && item.options[item.correctIndex]) ? item.options[item.correctIndex] : '';

      return `
        <div class="card-item quiz-review-item">
          <div class="quiz-review-item-top">
            <span class="quiz-review-q-label">Question ${idx + 1} ${item.competence ? '• ' + escapeHtml(item.competence) : ''}</span>
            ${badge}
          </div>
          <h4 class="quiz-review-q-title">${escapeHtml(item.questionText)}</h4>
          <div class="quiz-review-answers">
            <div><strong style="color:var(--color-text-muted);">Votre réponse :</strong> <span class="${item.isCorrect ? 'quiz-review-ans-ok' : 'quiz-review-ans-ko'}">${escapeHtml(userChoiceText)}</span></div>
            ${!item.isCorrect ? `<div><strong style="color:var(--color-text-muted);">Bonne réponse :</strong> <span class="quiz-review-ans-ok">${escapeHtml(correctChoiceText)}</span></div>` : ''}
          </div>
          ${item.explanation ? `<div class="quiz-review-expl">${escapeHtml(item.explanation)}</div>` : ''}
        </div>
      `;
    }).join('');
  }

  const btnToggleReview = container.querySelector('#btnToggleReview');
  const reviewList = container.querySelector('#quizReviewList');
  const reviewToggleIcon = container.querySelector('#reviewToggleIcon');
  if (btnToggleReview && reviewList) {
    btnToggleReview.addEventListener('click', () => {
      const isHidden = reviewList.style.display === 'none' || !reviewList.style.display;
      reviewList.style.display = isHidden ? 'flex' : 'none';
      reviewToggleIcon.textContent = isHidden ? '▲' : '▼';
    });
  }

  function finishQuiz() {
    removeKeyboardShortcuts();
    clearInterval(quizTimerInterval);
    screenGame.style.display = 'none';
    screenBilan.style.display = 'block';

    const total = activeQuizQuestions.length;
    const pct = Math.round((quizScore / total) * 100);

    container.querySelector('#quizBilanScore').textContent = quizScore;
    container.querySelector('#quizBilanTotal').textContent = `/ ${total}`;
    container.querySelector('#quizBilanPercentage').textContent = `${pct}%`;

    let comment = "Entraînement nécessaire : reprenez les notions clés du glossaire et retentez une série !";
    if (pct >= 50) comment = "Bonnes bases, mais consolidez plusieurs points pour atteindre les 75% requis.";
    if (pct >= 75) comment = "Excellent résultat ! Vous franchissez le seuil de 75% requis pour la certification.";
    if (pct === 100) comment = "Score parfait ! Maîtrise absolue des concepts Vibe Coding.";
    container.querySelector('#quizBilanComment').textContent = comment;

    renderReviewList();
    saveScore(activeQuizModule.id, 'Session', quizScore, total);
  }

  btnQuit.addEventListener('click', () => {
    if (currentQuestionIndex > 0 && !confirm("Êtes-vous sûr de vouloir quitter cet entraînement ? Votre progression en cours sera perdue.")) {
      return;
    }
    removeKeyboardShortcuts();
    clearInterval(quizTimerInterval);
    screenGame.style.display = 'none';
    screenModules.style.display = 'block';
    renderModules();
  });

  btnRetry.addEventListener('click', () => {
    if (activeQuizModule) startQuiz(activeQuizModule.id);
  });

  btnReturn.addEventListener('click', () => {
    removeKeyboardShortcuts();
    screenBilan.style.display = 'none';
    screenModules.style.display = 'block';
    renderModules();
  });

  modulesGrid.addEventListener('click', (e) => {
    const card = e.target.closest('.quiz-card');
    if (!card) return;
    startQuiz(card.dataset.moduleId);
  });

  modulesGrid.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      const card = e.target.closest('.quiz-card');
      if (card) {
        e.preventDefault();
        startQuiz(card.dataset.moduleId);
      }
    }
  });

  cardFinalExam.addEventListener('click', () => {
    startQuiz('final-exam');
  });

  cardFinalExam.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      startQuiz('final-exam');
    }
  });

  renderModules();
}
