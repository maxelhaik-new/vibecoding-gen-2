// QuizzView Component (Standard 2026 Wide Desktop Grid)
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

      <div class="quiz-featured-card" id="cardFinalExam" style="margin-top: 1.5rem;" tabindex="0" role="button">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem; flex-wrap: wrap; gap: 0.5rem;">
          <div style="display:flex; align-items:center; gap:0.6rem;">
            <span class="brand-badge">Simulation Officielle</span>
            <span style="font-size:0.85rem; font-weight:700; color:var(--color-text-muted);">50 Questions • Tirage aléatoire</span>
          </div>
          <span class="filter-pill" id="examBestScoreBadge">Non complété</span>
        </div>
        <h2 style="font-size: 1.35rem; font-weight: 800; color: var(--color-brand-fig); margin-bottom: 0.5rem;">
          Grand Examen Blanc (50 Questions)
        </h2>
        <p style="font-size: 0.94rem; color: var(--color-text-body); line-height: 1.5; margin-bottom: 1rem;">
          Épreuve globale chronométrée couvrant l'ensemble des compétences de la certification Vibe Coding. Simulation intégrale des conditions d'examen avec corrigé et explications détaillées.
        </p>
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.75rem; padding-top: 0.75rem; border-top: 1px dashed var(--color-border);">
          <span style="font-size: 0.85rem; font-weight: 700; color: var(--color-text-muted);">⏱️ 60s par question • Seuil requis : 75% (38/50)</span>
          <button class="btn-copy-prompt" style="background: var(--color-brand-purple); color: #FFF; border-color: var(--color-brand-fig);" type="button">
            Lancer l'Examen Blanc (50 Q) →
          </button>
        </div>
      </div>
    </div>

    <!-- ÉCRAN 2 : SESSION DE QUIZ -->
    <div id="quizScreenGame" style="display: none;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem; flex-wrap: wrap; gap: 0.75rem;">
        <button class="filter-pill" id="btnQuitQuiz">✕ Quitter l'entraînement</button>
        <div style="display: flex; align-items: center; gap: 1rem;">
          <span id="quizTimerTag" style="font-family: var(--font-code); font-weight: 900; background: var(--color-brand-fig); color: var(--color-brand-sunny); padding: 0.35rem 0.75rem; border: 1px solid var(--color-brand-fig);">⏱️ 60s</span>
          <span id="quizProgressTag" class="counter-tag" style="padding: 0.35rem 0.75rem;">Question 1/10</span>
        </div>
      </div>

      <div class="card-item" style="padding: 1.5rem; margin-bottom: 1.5rem;">
        <div style="font-size: 0.82rem; font-weight: 800; color: var(--color-brand-purple); text-transform: uppercase; margin-bottom: 0.5rem;" id="quizQuestionCategory">Compétence</div>
        <h2 id="quizQuestionText" style="font-size: 1.35rem; font-weight: 800; color: var(--color-brand-fig); line-height: 1.4; margin-bottom: 1.5rem;">Intitulé de la question</h2>
        
        <div id="quizOptionsList" style="display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 1.75rem;"></div>

        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; border-top: 1px dashed var(--color-border); padding-top: 1.25rem;">
          <span style="font-size: 0.85rem; color: var(--color-text-muted); font-weight: 600;">Raccourcis : touches [1], [2], [3], [4] puis [Entrée]</span>
          <button id="btnValidateQuiz" class="tool-card-btn" style="min-width: 200px;">Valider ma réponse</button>
        </div>
      </div>
    </div>

    <!-- ÉCRAN 3 : BILAN -->
    <div id="quizScreenBilan" style="display: none;">
      <div class="card-item" style="padding: 2.5rem; text-align: center; max-width: 800px; margin: 0 auto 2rem auto;">
        <div style="font-size: 3rem; margin-bottom: 0.5rem;">🏆</div>
        <h2 style="font-size: 1.8rem; font-weight: 900; color: var(--color-brand-fig); margin-bottom: 0.5rem;">Bilan de votre session</h2>
        <div style="display: flex; align-items: baseline; justify-content: center; gap: 0.5rem; margin: 1.5rem 0;">
          <span id="quizBilanScore" style="font-size: 3.5rem; font-weight: 900; color: var(--color-brand-purple);">0</span>
          <span id="quizBilanTotal" style="font-size: 1.5rem; font-weight: 800; color: var(--color-text-muted);">/ 10</span>
          <span id="quizBilanPercentage" class="counter-tag" style="margin-left: 1rem; font-size: 1.1rem;">0%</span>
        </div>
        <p id="quizBilanComment" style="font-size: 1rem; font-weight: 600; color: var(--color-text-body); max-width: 600px; margin: 0 auto 1.5rem auto;"></p>
        
        <div style="display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap;">
          <button id="btnRetryQuiz" class="filter-pill active" style="padding: 0.75rem 1.35rem; font-size: 0.95rem;">🔄 Recommencer ce module</button>
          <button id="btnReturnModules" class="filter-pill" style="padding: 0.75rem 1.35rem; font-size: 0.95rem;">← Retour aux modules</button>
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
        ? `<span class="filter-pill" style="background:var(--color-brand-sunny); font-weight:800;">${best.score}/${best.total} (${best.percentage}%)</span>`
        : `<span class="filter-pill" style="opacity:0.7;">Non complété</span>`;

      return `
        <div class="quiz-card" data-module-id="${m.id}" tabindex="0" role="button">
          <div>
            <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:0.75rem; gap:0.5rem;">
              <span class="ref-code">${escapeHtml(m.code)}</span>
              ${scoreBadge}
            </div>
            <h3 style="font-size:1.15rem; font-weight:800; color:var(--color-brand-fig); line-height:1.3; margin-bottom:0.5rem;">${escapeHtml(m.title)}</h3>
            <p style="font-size:0.88rem; color:var(--color-text-muted); line-height:1.45;">${escapeHtml(m.description)}</p>
          </div>
          <div style="display:flex; justify-content:space-between; align-items:center; border-top:1px dashed var(--color-border); padding-top:0.75rem;">
            <span style="font-size:0.78rem; font-weight:700; color:var(--color-text-muted);">${m.questions.length} questions dispo</span>
            <span style="font-size:0.85rem; font-weight:800; color:var(--color-brand-purple);">Démarrer (10 Q) →</span>
          </div>
        </div>
      `;
    }).join('');

    const examBest = getBestScore('final-exam');
    const examBadge = container.querySelector('#examBestScoreBadge');
    if (examBest) {
      examBadge.textContent = `${examBest.score}/${examBest.total} (${examBest.percentage}%)`;
      examBadge.style.background = 'var(--color-brand-sunny)';
      examBadge.style.fontWeight = '800';
    }
  }

  function startQuiz(moduleId) {
    clearInterval(quizTimerInterval);
    currentQuestionIndex = 0;
    quizScore = 0;
    quizSelectedOption = null;
    quizHasValidated = false;

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
    btnValidate.style.opacity = '0.5';

    const q = activeQuizQuestions[currentQuestionIndex];
    container.querySelector('#quizProgressTag').textContent = `Question ${currentQuestionIndex + 1} / ${activeQuizQuestions.length}`;
    container.querySelector('#quizQuestionCategory').textContent = q.competence || "Compétence Vibe Coding";
    container.querySelector('#quizQuestionText').textContent = q.question;

    const list = container.querySelector('#quizOptionsList');
    list.innerHTML = q.options.map((opt, idx) => `
      <button class="quiz-option-btn filter-pill" data-idx="${idx}" style="text-align: left; padding: 0.95rem 1.25rem; font-size: 0.92rem; width: 100%; display: flex; align-items: center; gap: 0.85rem; border-width: 2px;">
        <span style="font-family: var(--font-code); font-weight: 900; background: var(--color-brand-fig); color: #FFF; padding: 0.15rem 0.45rem;">${idx + 1}</span>
        <span>${escapeHtml(opt)}</span>
      </button>
    `).join('');

    // Timer 60s
    clearInterval(quizTimerInterval);
    quizSecondsLeft = 60;
    const timerTag = container.querySelector('#quizTimerTag');
    timerTag.textContent = `⏱️ ${quizSecondsLeft}s`;
    quizTimerInterval = setInterval(() => {
      quizSecondsLeft--;
      timerTag.textContent = `⏱️ ${quizSecondsLeft}s`;
      if (quizSecondsLeft <= 0) {
        clearInterval(quizTimerInterval);
        validateAnswer(true);
      }
    }, 1000);
  }

  function validateAnswer(timeout = false) {
    if (quizHasValidated) return;
    quizHasValidated = true;
    clearInterval(quizTimerInterval);

    const q = activeQuizQuestions[currentQuestionIndex];
    const isCorrect = !timeout && (quizSelectedOption === q.correctAnswer);

    if (isCorrect) quizScore++;

    const buttons = container.querySelectorAll('.quiz-option-btn');
    buttons.forEach((btn, idx) => {
      btn.disabled = true;
      if (idx === q.correctAnswer) {
        btn.style.background = 'var(--color-success-bg)';
        btn.style.borderColor = 'var(--color-success)';
      } else if (idx === quizSelectedOption && !isCorrect) {
        btn.style.background = 'var(--color-danger-bg)';
        btn.style.borderColor = 'var(--color-danger)';
      }
    });

    btnValidate.disabled = false;
    btnValidate.style.opacity = '1';
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
    btnValidate.style.opacity = '1';
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

  function finishQuiz() {
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

    saveScore(activeQuizModule.id, 'Apprenant', quizScore, total);
  }

  btnQuit.addEventListener('click', () => {
    clearInterval(quizTimerInterval);
    screenGame.style.display = 'none';
    screenModules.style.display = 'block';
    renderModules();
  });

  btnRetry.addEventListener('click', () => {
    if (activeQuizModule) startQuiz(activeQuizModule.id);
  });

  btnReturn.addEventListener('click', () => {
    screenBilan.style.display = 'none';
    screenModules.style.display = 'block';
    renderModules();
  });

  modulesGrid.addEventListener('click', (e) => {
    const card = e.target.closest('.quiz-card');
    if (!card) return;
    startQuiz(card.dataset.moduleId);
  });

  cardFinalExam.addEventListener('click', () => {
    startQuiz('final-exam');
  });

  renderModules();
}
