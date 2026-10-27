// TourGuide Component (Standard 2026 - Interactive Onboarding Walkthrough)
// Neo-brutalist calm spotlight tour with smooth positioning, keyboard nav and localStorage persistence.

export function initTourGuide(options = {}) {
  const STORAGE_KEY = 'vibecoding_tour_done';

  const steps = [
    {
      targetSelector: '.tab-btn[data-tab="welcome"]',
      fallbackSelector: '#welcomeSearchInput',
      title: 'Bienvenue sur la plateforme',
      text: 'Votre espace de ressources pour la formation Vibe Coding. Revenez à cette page d\'accueil à tout moment via cet onglet ou le logo en haut.',
      placement: 'bottom'
    },
    {
      targetSelector: '.tab-btn[data-tab="parcours"]',
      fallbackSelector: '#burgerMenuBtn',
      title: '1. Parcours Coaching (6 séances)',
      text: 'Suivez le programme de vos séances de coaching, consultez les objectifs et cochez vos devoirs intersession au fil de votre progression.',
      placement: 'bottom'
    },
    {
      targetSelector: '.tab-btn[data-tab="glossary"]',
      fallbackSelector: '#burgerMenuBtn',
      title: '2. Le Glossaire (57 notions)',
      text: 'Tous les termes et acronymes clés (Context Window, RAG, Zero-Shot, System Prompt...) avec des définitions concrètes pour réviser sans ambiguïté.',
      placement: 'bottom'
    },
    {
      targetSelector: '.tab-btn[data-tab="prompts"]',
      fallbackSelector: '#burgerMenuBtn',
      title: '3. Bibliothèque de Prompts',
      text: 'Des templates prêts à l\'emploi : cadrer une application, générer des architectures propres, déboguer et automatiser vos tests.',
      placement: 'bottom'
    },
    {
      targetSelector: '.tab-btn[data-tab="quizz"]',
      fallbackSelector: '#burgerMenuBtn',
      title: '4. Entraînement Quizz',
      text: 'Entraînez-vous en conditions d\'examen : chrono 60s, raccourcis clavier [1-4], feedback explicatif immédiat et revue de vos erreurs.',
      placement: 'bottom'
    },
    {
      targetSelector: '.tab-btn[data-tab="tools"]',
      fallbackSelector: '#burgerMenuBtn',
      title: '5. Accès & Outils officiels',
      text: 'Accédez aux plateformes officielles (GitHub, Supabase, Stripe...) pour créer vos comptes, héberger et déployer vos projets.',
      placement: 'bottom'
    }
  ];

  let currentStep = 0;
  let overlayEl = null;
  let spotlightEl = null;
  let bubbleEl = null;
  let keyHandler = null;
  let resizeHandler = null;

  function isCompleted() {
    try {
      return localStorage.getItem(STORAGE_KEY) === 'true';
    } catch (e) {
      return false;
    }
  }

  function markCompleted() {
    try {
      localStorage.setItem(STORAGE_KEY, 'true');
    } catch (e) {}
  }

  function createTourElements() {
    if (document.getElementById('tourOverlayRoot')) return;

    const root = document.createElement('div');
    root.id = 'tourOverlayRoot';
    root.innerHTML = `
      <div id="tourSpotlight" class="tour-spotlight" style="display:none;"></div>
      <div id="tourBubble" class="tour-bubble" style="display:none;" role="dialog" aria-modal="true">
        <div class="tour-bubble-arrow" id="tourBubbleArrow"></div>
        <div class="tour-bubble-header">
          <span class="tour-step-badge" id="tourStepBadge">Étape 1 / 5</span>
          <button type="button" class="tour-close-btn" id="tourCloseBtn" aria-label="Fermer le tutoriel">✕</button>
        </div>
        <div class="tour-bubble-body">
          <h4 class="tour-bubble-title" id="tourBubbleTitle"></h4>
          <p class="tour-bubble-text" id="tourBubbleText"></p>
        </div>
        <div class="tour-bubble-footer">
          <button type="button" class="tour-skip-btn" id="tourSkipBtn">Passer</button>
          <div class="tour-nav-btns">
            <button type="button" class="tour-btn tour-btn-prev" id="tourPrevBtn">Précédent</button>
            <button type="button" class="tour-btn tour-btn-next" id="tourNextBtn">Suivant →</button>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(root);

    spotlightEl = document.getElementById('tourSpotlight');
    bubbleEl = document.getElementById('tourBubble');

    document.getElementById('tourCloseBtn').addEventListener('click', stopTour);
    document.getElementById('tourSkipBtn').addEventListener('click', stopTour);
    document.getElementById('tourPrevBtn').addEventListener('click', () => goToStep(currentStep - 1));
    document.getElementById('tourNextBtn').addEventListener('click', () => {
      if (currentStep >= steps.length - 1) {
        stopTour();
      } else {
        goToStep(currentStep + 1);
      }
    });

    keyHandler = (e) => {
      if (!bubbleEl || bubbleEl.style.display === 'none') return;
      if (e.key === 'Escape') {
        stopTour();
      } else if (e.key === 'ArrowRight' || e.key === 'Enter') {
        e.preventDefault();
        if (currentStep >= steps.length - 1) {
          stopTour();
        } else {
          goToStep(currentStep + 1);
        }
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        if (currentStep > 0) goToStep(currentStep - 1);
      }
    };
    window.addEventListener('keydown', keyHandler);

    resizeHandler = () => {
      if (bubbleEl && bubbleEl.style.display !== 'none') {
        positionStep(currentStep);
      }
    };
    window.addEventListener('resize', resizeHandler);
  }

  function positionStep(index) {
    const step = steps[index];
    if (!step) return;

    let target = document.querySelector(step.targetSelector);
    if ((!target || target.offsetParent === null) && step.fallbackSelector) {
      target = document.querySelector(step.fallbackSelector);
    }

    const titleEl = document.getElementById('tourBubbleTitle');
    const textEl = document.getElementById('tourBubbleText');
    const badgeEl = document.getElementById('tourStepBadge');
    const prevBtn = document.getElementById('tourPrevBtn');
    const nextBtn = document.getElementById('tourNextBtn');
    const arrowEl = document.getElementById('tourBubbleArrow');

    titleEl.textContent = step.title;
    textEl.textContent = step.text;
    badgeEl.textContent = `Étape ${index + 1} / ${steps.length}`;

    prevBtn.style.visibility = index === 0 ? 'hidden' : 'visible';
    nextBtn.textContent = index === steps.length - 1 ? 'Terminer' : 'Suivant →';
    nextBtn.classList.toggle('tour-btn-finish', index === steps.length - 1);

    bubbleEl.style.display = 'block';
    spotlightEl.style.display = 'block';

    const padding = 6;
    const bubbleWidth = Math.min(380, window.innerWidth - 32);

    if (target && target.offsetParent !== null) {
      const rect = target.getBoundingClientRect();
      bubbleEl.style.transform = 'none';

      // Spotlight placement
      spotlightEl.style.top = `${rect.top - padding}px`;
      spotlightEl.style.left = `${rect.left - padding}px`;
      spotlightEl.style.width = `${rect.width + padding * 2}px`;
      spotlightEl.style.height = `${rect.height + padding * 2}px`;
      spotlightEl.style.borderRadius = 'var(--radius-sm)';

      // Bubble vertical placement
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      let bubbleTop = 0;
      let arrowClass = 'top';

      if (spaceBelow >= 220 || spaceBelow >= spaceAbove) {
        bubbleTop = rect.bottom + 14;
        arrowClass = 'arrow-top';
      } else {
        bubbleTop = Math.max(16, rect.top - 230);
        arrowClass = 'arrow-bottom';
      }

      // Bubble horizontal placement
      let bubbleLeft = rect.left + rect.width / 2 - bubbleWidth / 2;
      bubbleLeft = Math.max(16, Math.min(window.innerWidth - bubbleWidth - 16, bubbleLeft));

      bubbleEl.style.top = `${bubbleTop}px`;
      bubbleEl.style.left = `${bubbleLeft}px`;
      bubbleEl.style.width = `${bubbleWidth}px`;

      // Arrow position
      arrowEl.className = `tour-bubble-arrow ${arrowClass}`;
      const arrowLeft = Math.max(16, Math.min(bubbleWidth - 24, rect.left + rect.width / 2 - bubbleLeft - 8));
      arrowEl.style.left = `${arrowLeft}px`;
    } else {
      // Fallback: Centered modal if target is hidden (e.g. mobile tab menu closed)
      spotlightEl.style.display = 'none';
      bubbleEl.style.top = '50%';
      bubbleEl.style.left = '50%';
      bubbleEl.style.width = `${bubbleWidth}px`;
      bubbleEl.style.transform = 'translate(-50%, -50%)';
      arrowEl.className = 'tour-bubble-arrow hidden';
    }
  }

  function goToStep(index) {
    if (index < 0 || index >= steps.length) return;
    currentStep = index;
    positionStep(currentStep);
  }

  function startTour(force = false) {
    if (!force && isCompleted()) return;
    createTourElements();
    currentStep = 0;
    goToStep(0);
  }

  function stopTour() {
    markCompleted();
    if (spotlightEl) spotlightEl.style.display = 'none';
    if (bubbleEl) {
      bubbleEl.style.display = 'none';
      bubbleEl.style.transform = 'none';
    }
  }

  // Trigger automatically on first visit after brief render delay
  if (!isCompleted()) {
    setTimeout(() => {
      startTour(false);
    }, 600);
  }

  return {
    startTour: () => startTour(true),
    stopTour,
    isCompleted
  };
}
