// Main App Assembler - Platform Formation Vibe Coding (Standard 2026)
import { GLOSSARY_DATA, PROMPTS_DATA, QUIZ_DATA, TOOLS_DATA, PARCOURS_DATA } from '../data/app-data.js?v=20261027-polish-v6';
import { supabase, signOutUser } from './supabaseClient.js?v=20261027-polish-v6';
import {
  renderHeader,
  updateHeader,
  updateHeaderAuth,
  renderTabNav,
  setActiveTabBtn,
  updateTabNavAuth,
  initGlossaryView,
  initPromptsView,
  initToolsView,
  initQuizzView,
  initWelcomeView,
  initParcoursView,
  initTourGuide,
  initMobileMenu,
  renderFooter,
  initAuthView,
  showToast
} from '../components/index.js?v=20261027-polish-v6';

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
    this.authMount = document.getElementById('viewAuth');
    this.footerMount = document.getElementById('appFooterMount');

    this.activeTab = 'welcome';
    this.initializedViews = new Set();
    this.tour = null;
    this.mobileMenu = null;
    this.currentUser = null;
    this.pendingParcoursParam = null;
    this.wantsParcoursAfterLogin = false;
  }

  async init() {
    // 0. Récupérer et vérifier la session Supabase initiale auprès du serveur
    try {
      const { data } = await supabase.auth.getSession();
      if (data?.session?.user) {
        const { data: userData, error: userErr } = await supabase.auth.getUser();
        if (userErr || !userData?.user) {
          await supabase.auth.signOut();
          this.currentUser = null;
        } else {
          this.currentUser = userData.user;
        }
      } else {
        this.currentUser = null;
      }
    } catch (e) {
      console.warn('[App] Session Supabase initiale indisponible:', e);
      this.currentUser = null;
    }

    // 1. Render Header avec bouton de connexion épuré
    renderHeader(this.headerMount, {
      onHomeClick: () => this.switchTab('welcome', true),
      user: this.currentUser,
      onLoginClick: () => this.switchTab('auth', true),
      onLogoutClick: () => this.handleLogout()
    });

    // 2. Render Tab Navigation (Desktop) avec cadenas sur Parcours si non connecté
    renderTabNav(this.navMount, {
      activeTab: this.activeTab,
      isAuthenticated: Boolean(this.currentUser),
      counts: {
        parcours: PARCOURS_DATA.length,
        glossary: GLOSSARY_DATA.length,
        prompts: PROMPTS_DATA.length,
        tools: TOOLS_DATA.length
      },
      onTabChange: (tab) => this.switchTab(tab, true)
    });

    // 3. Initialize Mobile & Tablet Menu (< 1024px) avec bouton compact en haut
    this.mobileMenu = initMobileMenu({
      getActiveTab: () => this.activeTab,
      getUser: () => this.currentUser,
      counts: {
        parcours: PARCOURS_DATA.length,
        glossary: GLOSSARY_DATA.length,
        prompts: PROMPTS_DATA.length,
        tools: TOOLS_DATA.length
      },
      onTabChange: (tab) => this.switchTab(tab, true),
      onLoginClick: () => this.switchTab('auth', true),
      onLogoutClick: () => this.handleLogout()
    });

    // 4. Écouter les changements d'état d'authentification Supabase
    supabase.auth.onAuthStateChange((event, session) => {
      const nextUser = session?.user || null;
      const prevUserId = this.currentUser?.id || null;
      const nextUserId = nextUser?.id || null;

      if (prevUserId !== nextUserId || event === 'SIGNED_IN' || event === 'SIGNED_OUT') {
        this.handleUserStateChange(nextUser, event);
      }
    });

    // 5. Parse URL params (tab, prompt)
    const params = new URLSearchParams(window.location.search);
    const tabParam = params.get('tab');
    const promptParam = params.get('prompt');

    if (promptParam) {
      this.switchTab('prompts', false, promptParam);
    } else if (tabParam === 'connexion' || tabParam === 'login' || tabParam === 'auth') {
      this.switchTab('auth', false);
    } else if (tabParam === 'parcours' || tabParam === 'seances' || tabParam === 'coaching') {
      if (this.currentUser) {
        this.switchTab('parcours', false);
      } else {
        this.wantsParcoursAfterLogin = true;
        this.switchTab('auth', false);
        showToast('Connexion requise pour accéder au Parcours Coaching');
      }
    } else if (tabParam === 'tools' || tabParam === 'outils') {
      this.switchTab('tools', false);
    } else if (tabParam === 'prompts') {
      this.switchTab('prompts', false);
    } else if (tabParam === 'quizz' || tabParam === 'quiz') {
      this.switchTab('quizz', false);
    } else if (tabParam === 'glossary' || tabParam === 'glossaire') {
      this.switchTab('glossary', false);
    } else {
      this.switchTab('welcome', false);
    }

    // 6. Initialize Interactive Onboarding Walkthrough
    this.tour = initTourGuide();

    // 7. Render Footer Component
    if (this.footerMount) {
      renderFooter(this.footerMount, {
        onNavigate: (tab) => {
          this.switchTab(tab, true);
          if (tab !== 'parcours' || this.currentUser) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        },
        onStartTour: () => this.tour?.startTour()
      });
    }
  }

  async handleLogout() {
    try {
      await signOutUser();
      showToast('Vous êtes déconnecté');
    } catch (e) {
      console.error('[App] Erreur déconnexion:', e);
    }
  }

  handleUserStateChange(user, event = '') {
    const wasLoggedIn = Boolean(this.currentUser);
    this.currentUser = user;
    const isNowLoggedIn = Boolean(user);

    // Mettre à jour l'en-tête, les onglets et le menu mobile
    updateHeaderAuth(this.headerMount, {
      user: this.currentUser,
      onLoginClick: () => this.switchTab('auth', true),
      onLogoutClick: () => this.handleLogout()
    });
    updateTabNavAuth(this.navMount, isNowLoggedIn);
    this.mobileMenu?.refreshMenu();

    // Réinitialiser les vues dépendantes de l'utilisateur
    this.initializedViews.delete('parcours');
    this.initializedViews.delete('auth');

    if (isNowLoggedIn && !wasLoggedIn) {
      const targetParam = this.pendingParcoursParam;
      this.wantsParcoursAfterLogin = false;
      this.pendingParcoursParam = null;
      this.switchTab('parcours', true, targetParam);
    } else if (!isNowLoggedIn && wasLoggedIn) {
      if (this.parcoursMount) this.parcoursMount.innerHTML = '';
      if (this.activeTab === 'parcours') {
        this.switchTab('welcome', true);
      } else if (this.activeTab === 'auth') {
        this.renderAuthView();
      }
    }
  }

  renderAuthView() {
    initAuthView(this.authMount, {
      user: this.currentUser,
      onAuthSuccess: (user) => {
        this.handleUserStateChange(user);
      },
      onNavigate: (tab) => this.switchTab(tab, true)
    });
  }

  switchTab(tabName, updateUrl = true, specificParamId = null) {
    // Si l'utilisateur clique sur Parcours sans être connecté, redirection immédiate vers le panneau de connexion
    if (tabName === 'parcours' && !this.currentUser) {
      this.wantsParcoursAfterLogin = true;
      this.pendingParcoursParam = specificParamId || null;
      showToast('Connexion requise pour accéder au Parcours');
      this.switchTab('auth', updateUrl);
      return;
    }

    this.activeTab = tabName;
    setActiveTabBtn(this.navMount, tabName);
    updateHeaderAuth(this.headerMount, {
      user: this.currentUser,
      isAuthActive: tabName === 'auth',
      onLoginClick: () => this.switchTab('auth', true),
      onLogoutClick: () => this.handleLogout()
    });

    // Cacher toutes les vues
    [
      this.welcomeMount,
      this.parcoursMount,
      this.glossaryMount,
      this.promptsMount,
      this.toolsMount,
      this.quizzMount,
      this.authMount
    ].forEach(el => {
      if (el) el.classList.remove('active');
    });

    // Afficher la vue demandée
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
        initParcoursView(this.parcoursMount, PARCOURS_DATA, {
          initialSessionId: specificParamId,
          user: this.currentUser,
          onLoginRequest: () => this.switchTab('auth', true)
        });
        this.initializedViews.add('parcours');
      }
    } else if (tabName === 'auth') {
      this.authMount.classList.add('active');
      updateHeader(
        "Espace Apprenant Wemodo",
        this.currentUser
          ? "Gérez votre compte et accédez à votre Parcours Coaching"
          : "Connectez-vous avec votre adresse email pour déverrouiller votre Parcours Coaching"
      );
      this.renderAuthView();
    } else if (tabName === 'tools') {
      this.toolsMount.classList.add('active');
      updateHeader(
        "Boîte à Outils & Accès Officiels",
        "7 plateformes incontournables pour concevoir, coder, héberger et monétiser vos projets"
      );
      if (!this.initializedViews.has('tools') || specificParamId) {
        initToolsView(this.toolsMount, TOOLS_DATA, { initialQuery: specificParamId || '' });
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
      if (!this.initializedViews.has('glossary') || specificParamId) {
        initGlossaryView(this.glossaryMount, GLOSSARY_DATA, { initialQuery: specificParamId || '' });
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
function setupGlobalSearchShortcut(app) {
  window.addEventListener('keydown', (e) => {
    const isCmdK = (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k';
    const isSlash = e.key === '/' && !['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName) && !document.activeElement?.isContentEditable;

    if (isCmdK || isSlash) {
      e.preventDefault();
      const activeView = document.querySelector('.tab-view.active');
      let searchInput = activeView ? activeView.querySelector('.search-input') : null;
      if (!searchInput && app) {
        app.switchTab('welcome');
        searchInput = document.getElementById('welcomeSearchInput');
      }
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
  setupGlobalSearchShortcut(app);
});
