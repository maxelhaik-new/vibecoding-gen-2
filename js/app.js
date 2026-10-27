// Main App Assembler - Platform Formation Vibe Coding (Standard 2026)
import { GLOSSARY_DATA, PROMPTS_DATA, QUIZ_DATA, TOOLS_DATA, PARCOURS_DATA } from '../data/app-data.js?v=20261021-synced-v4';
import {
  renderHeader,
  updateHeader,
  renderTabNav,
  setActiveTabBtn,
  initGlossaryView,
  initPromptsView,
  initToolsView,
  initQuizzView,
  initWelcomeView,
  initParcoursView,
  initTourGuide,
  initMobileMenu,
  renderFooter
} from '../components/index.js?v=20261021-synced-v4';

class AppController {
  constructor() {
    this.headerMount = document.getElementById('appHeaderMount');
    this.navMount = document.getElementById('appNavMount');
    this.welcomeMount = document.getElementById('viewWelcome');
    this.parcoursMount = document.getElementById('viewParcours');
    this.glossaryMount = document.getElementById('viewGlossary');
    this.promptsMount = document.getElementById('viewPrompts');
    this.toolsMount = document.getElementById('viewTools');
    this.quizzMount = document.getElementById('viewQuizz');
    this.footerMount = document.getElementById('appFooterMount');

    this.activeTab = 'welcome';
    this.initializedViews = new Set();
    this.tour = null;
  }

  init() {
    // 1. Render Header with click-to-home handler
    renderHeader(this.headerMount, {
      onHomeClick: () => this.switchTab('welcome', true)
    });

    // 2. Render Tab Navigation (Desktop)
    renderTabNav(this.navMount, {
      activeTab: this.activeTab,
      counts: {
        parcours: PARCOURS_DATA.length,
        glossary: GLOSSARY_DATA.length,
        prompts: PROMPTS_DATA.length,
        tools: TOOLS_DATA.length
      },
      onTabChange: (tab) => this.switchTab(tab, true)
    });

    // 3. Initialize Mobile & Tablet Fullscreen Menu (< 1024px)
    initMobileMenu({
      getActiveTab: () => this.activeTab,
      counts: {
        parcours: PARCOURS_DATA.length,
        glossary: GLOSSARY_DATA.length,
        prompts: PROMPTS_DATA.length,
        tools: TOOLS_DATA.length
      },
      onTabChange: (tab) => this.switchTab(tab, true)
    });

    // 4. Parse URL params (tab, prompt)
    const params = new URLSearchParams(window.location.search);
    const tabParam = params.get('tab');
    const promptParam = params.get('prompt');

    if (promptParam) {
      this.switchTab('prompts', false, promptParam);
    } else if (tabParam === 'parcours' || tabParam === 'seances' || tabParam === 'coaching') {
      this.switchTab('parcours', false);
    } else if (tabParam === 'tools' || tabParam === 'outils') {
      this.switchTab('tools', false);
    } else if (tabParam === 'prompts') {
      this.switchTab('prompts', false);
    } else if (tabParam === 'quizz' || tabParam === 'quiz') {
      this.switchTab('quizz', false);
    } else if (tabParam === 'glossary' || tabParam === 'glossaire') {
      this.switchTab('glossary', false);
    } else {
      // Default initial view: Welcome page
      this.switchTab('welcome', false);
    }

    // 5. Initialize Interactive Onboarding Walkthrough (Auto on 1st visit)
    this.tour = initTourGuide();

    // 6. Render Footer Component (Wemodo Integration)
    if (this.footerMount) {
      renderFooter(this.footerMount, {
        onNavigate: (tab) => {
          this.switchTab(tab, true);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        },
        onStartTour: () => this.tour?.startTour()
      });
    }
  }

  switchTab(tabName, updateUrl = true, specificParamId = null) {
    this.activeTab = tabName;
    setActiveTabBtn(this.navMount, tabName);

    // Hide all views
    [this.welcomeMount, this.parcoursMount, this.glossaryMount, this.promptsMount, this.toolsMount, this.quizzMount].forEach(el => {
      if (el) el.classList.remove('active');
    });

    // Handle each tab view
    if (tabName === 'welcome') {
      this.welcomeMount.classList.add('active');
      updateHeader(
        "Formation Vibe Coding",
        "Plateforme complémentaire de ressources : parcours coaching, glossaire, prompts, quizz et outils"
      );
      if (!this.initializedViews.has('welcome')) {
        initWelcomeView(this.welcomeMount, {
          parcoursData: PARCOURS_DATA,
          glossaryData: GLOSSARY_DATA,
          promptsData: PROMPTS_DATA,
          toolsData: TOOLS_DATA,
          onNavigate: (targetTab, param) => this.switchTab(targetTab, true, param),
          onStartTour: () => this.tour?.startTour()
        });
        this.initializedViews.add('welcome');
      }
    } else if (tabName === 'parcours') {
      this.parcoursMount.classList.add('active');
      updateHeader(
        "Parcours Coaching & Suivi Intersession",
        "Découvrez les objectifs des 6 séances (Séance 0 à 5), le programme abordé et vos devoirs intersession à valider"
      );
      if (!this.initializedViews.has('parcours') || specificParamId) {
        initParcoursView(this.parcoursMount, PARCOURS_DATA, { initialSessionId: specificParamId });
        this.initializedViews.add('parcours');
      }
    } else if (tabName === 'tools') {
      this.toolsMount.classList.add('active');
      updateHeader(
        "Boîte à Outils & Accès Officiels",
        "7 plateformes incontournables pour concevoir, coder, héberger et monétiser vos projets"
      );
      if (!this.initializedViews.has('tools')) {
        initToolsView(this.toolsMount, TOOLS_DATA);
        this.initializedViews.add('tools');
      }
    } else if (tabName === 'prompts') {
      this.promptsMount.classList.add('active');
      updateHeader(
        "Bibliothèque de Prompts",
        "Gabarits et prompts Vibe Coding prêts à l'emploi pour vos sessions de développement"
      );
      if (!this.initializedViews.has('prompts') || specificParamId) {
        initPromptsView(this.promptsMount, PROMPTS_DATA, { initialPromptId: specificParamId });
        this.initializedViews.add('prompts');
      }
    } else if (tabName === 'quizz') {
      this.quizzMount.classList.add('active');
      updateHeader(
        "Entraînement Quizz Certification",
        "Préparez l'épreuve QCM de 50 questions de la certification officielle Vibe Coding"
      );
      if (!this.initializedViews.has('quizz')) {
        initQuizzView(this.quizzMount, QUIZ_DATA);
        this.initializedViews.add('quizz');
      }
    } else {
      this.glossaryMount.classList.add('active');
      updateHeader(
        "Le Glossaire Vibe Coding",
        `${GLOSSARY_DATA.length} notions clés, acronymes et définitions pour le Vibe Coding`
      );
      if (!this.initializedViews.has('glossary')) {
        initGlossaryView(this.glossaryMount, GLOSSARY_DATA);
        this.initializedViews.add('glossary');
      }
    }

    if (updateUrl) {
      const url = new URL(window.location);
      if (tabName === 'welcome') {
        url.searchParams.delete('tab');
        url.searchParams.delete('prompt');
      } else {
        url.searchParams.set('tab', tabName);
        if (tabName !== 'prompts') url.searchParams.delete('prompt');
      }
      history.replaceState(null, '', url.toString());
    }
  }
}

// Global Search Shortcut (Cmd + K / Ctrl + K or '/')
function setupGlobalSearchShortcut() {
  window.addEventListener('keydown', (e) => {
    const isCmdK = (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k';
    const isSlash = e.key === '/' && !['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName) && !document.activeElement?.isContentEditable;

    if (isCmdK || isSlash) {
      e.preventDefault();
      const activeView = document.querySelector('.tab-view.active');
      if (!activeView) return;
      const searchInput = activeView.querySelector('.search-input');
      if (searchInput) {
        searchInput.focus();
        searchInput.select();
        searchInput.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  });
}

// Bootstrap on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  const app = new AppController();
  app.init();
  setupGlobalSearchShortcut();
});
