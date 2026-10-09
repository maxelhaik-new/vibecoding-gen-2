// Main App Assembler - Platform Formation Vibe Coding (Standard 2026)
import { GLOSSARY_DATA, PROMPTS_DATA, QUIZ_DATA, TOOLS_DATA } from '../data/app-data.js';
import {
  renderHeader,
  updateHeader,
  renderTabNav,
  setActiveTabBtn,
  initGlossaryView,
  initPromptsView,
  initToolsView,
  initQuizzView,
  initMobileMenu
} from '../components/index.js';

class AppController {
  constructor() {
    this.headerMount = document.getElementById('appHeaderMount');
    this.navMount = document.getElementById('appNavMount');
    this.glossaryMount = document.getElementById('viewGlossary');
    this.promptsMount = document.getElementById('viewPrompts');
    this.toolsMount = document.getElementById('viewTools');
    this.quizzMount = document.getElementById('viewQuizz');

    this.activeTab = 'glossary';
    this.initializedViews = new Set();
  }

  init() {
    // 1. Render Header
    renderHeader(this.headerMount);

    // 2. Render Tab Navigation (Desktop)
    renderTabNav(this.navMount, {
      activeTab: this.activeTab,
      counts: {
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
        glossary: GLOSSARY_DATA.length,
        prompts: PROMPTS_DATA.length,
        tools: TOOLS_DATA.length
      },
      onTabChange: (tab) => this.switchTab(tab, true)
    });

    // 3. Parse URL params (tab, prompt)
    const params = new URLSearchParams(window.location.search);
    const tabParam = params.get('tab');
    const promptParam = params.get('prompt');

    if (promptParam) {
      this.switchTab('prompts', false, promptParam);
    } else if (tabParam === 'tools' || tabParam === 'outils') {
      this.switchTab('tools', false);
    } else if (tabParam === 'prompts') {
      this.switchTab('prompts', false);
    } else if (tabParam === 'quizz' || tabParam === 'quiz') {
      this.switchTab('quizz', false);
    } else {
      this.switchTab('glossary', false);
    }
  }

  switchTab(tabName, updateUrl = true, specificPromptId = null) {
    this.activeTab = tabName;
    setActiveTabBtn(this.navMount, tabName);

    // Hide all views
    [this.glossaryMount, this.promptsMount, this.toolsMount, this.quizzMount].forEach(el => {
      el.classList.remove('active');
    });

    // Handle each tab view
    if (tabName === 'tools') {
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
      if (!this.initializedViews.has('prompts') || specificPromptId) {
        initPromptsView(this.promptsMount, PROMPTS_DATA, { initialPromptId: specificPromptId });
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
      url.searchParams.set('tab', tabName);
      if (tabName !== 'prompts') url.searchParams.delete('prompt');
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
