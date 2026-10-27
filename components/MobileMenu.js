// MobileMenu Component (Standard 2026 - Distilled & Clarified)

export function initMobileMenu({ getActiveTab, getUser, counts = {}, onTabChange, onLoginClick, onLogoutClick }) {
  let overlay = document.getElementById('mobileMenuOverlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'mobileMenuOverlay';
    overlay.className = 'mobile-menu-overlay';
    overlay.setAttribute('aria-hidden', 'true');
    document.body.appendChild(overlay);
  }

  function renderOverlay(activeTab) {
    const user = getUser ? getUser() : null;
    const isAuthenticated = Boolean(user);
    const lockSvg = `<svg class="tab-lock-svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="display:inline-block; vertical-align:-2px; margin-right:0.35rem;"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>`;

    overlay.innerHTML = `
      <div class="mobile-menu-container">
        <!-- Top Bar strictement alignée sur l'en-tête replié (mêmes marges, taille de logo et boutons) -->
        <div class="mobile-menu-header">
          <div class="mobile-menu-brand-group" id="mobileMenuBrandBadge" role="button" tabindex="0" style="cursor:pointer;" aria-label="Retour à l'accueil">
            <img src="assets/wemodo/wemodo_logo_white.svg" alt="Wemodo" class="mobile-brand-logo" width="124" height="24">
            <span class="header-brand-divider" aria-hidden="true"></span>
            <span class="brand-badge">Formation Vibe Coding</span>
          </div>

          <div class="mobile-menu-top-actions">
            ${!isAuthenticated ? `
              <button type="button" class="mobile-top-auth-btn" id="mobileHeaderAuthBtn">
                Se connecter
              </button>
            ` : `
              <button type="button" class="mobile-top-auth-btn is-logout" id="mobileHeaderAuthBtn" title="Connecté : ${user.email || ''}">
                Déconnexion
              </button>
            `}
            <button class="mobile-menu-close" id="mobileMenuCloseBtn" aria-label="Fermer le menu">
              <span class="close-symbol" aria-hidden="true">✕</span>
              <span class="close-text">Fermer</span>
            </button>
          </div>
        </div>

        <!-- Navigation épurée directe -->
        <nav class="mobile-menu-links">
          <button class="mobile-nav-item ${activeTab === 'welcome' ? 'active' : ''}" data-tab="welcome">
            <span class="mobile-nav-meta">01</span>
            <span class="mobile-nav-title">Accueil</span>
          </button>

          <button class="mobile-nav-item ${activeTab === 'parcours' ? 'active' : ''} ${!isAuthenticated ? 'is-locked' : ''}" data-tab="parcours">
            <span class="mobile-nav-meta">02</span>
            <span class="mobile-nav-title">
              ${!isAuthenticated ? lockSvg : ''}Parcours Coaching
            </span>
            <span class="mobile-nav-count">${counts.parcours || 6}</span>
          </button>

          <button class="mobile-nav-item ${activeTab === 'glossary' ? 'active' : ''}" data-tab="glossary">
            <span class="mobile-nav-meta">03</span>
            <span class="mobile-nav-title">Glossaire</span>
            <span class="mobile-nav-count">${counts.glossary || 57}</span>
          </button>

          <button class="mobile-nav-item ${activeTab === 'prompts' ? 'active' : ''}" data-tab="prompts">
            <span class="mobile-nav-meta">04</span>
            <span class="mobile-nav-title">Prompts</span>
            <span class="mobile-nav-count">${counts.prompts || 13}</span>
          </button>

          <button class="mobile-nav-item ${activeTab === 'quizz' ? 'active' : ''}" data-tab="quizz">
            <span class="mobile-nav-meta">05</span>
            <span class="mobile-nav-title">Quizz</span>
            <span class="mobile-nav-count">50Q</span>
          </button>

          <button class="mobile-nav-item ${activeTab === 'tools' ? 'active' : ''}" data-tab="tools">
            <span class="mobile-nav-meta">06</span>
            <span class="mobile-nav-title">Outils & Accès</span>
            <span class="mobile-nav-count">${counts.tools || 7}</span>
          </button>
        </nav>
      </div>
    `;

    // Listener du bouton Connexion / Déconnexion dans la barre supérieure
    const topAuthBtn = overlay.querySelector('#mobileHeaderAuthBtn');
    if (topAuthBtn) {
      topAuthBtn.addEventListener('click', () => {
        if (!isAuthenticated) {
          closeMenu();
          if (onLoginClick) onLoginClick();
        } else {
          if (onLogoutClick) onLogoutClick();
        }
      });
    }

    // Listener du bouton de fermeture
    overlay.querySelector('#mobileMenuCloseBtn').addEventListener('click', closeMenu);

    // Retour accueil sur clic du logo
    const brandBadge = overlay.querySelector('#mobileMenuBrandBadge');
    if (brandBadge) {
      brandBadge.addEventListener('click', () => {
        closeMenu();
        if (onTabChange) onTabChange('welcome');
      });
      brandBadge.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          closeMenu();
          if (onTabChange) onTabChange('welcome');
        }
      });
    }

    // Navigation onglets
    overlay.querySelectorAll('.mobile-nav-item').forEach(btn => {
      btn.addEventListener('click', () => {
        const tab = btn.dataset.tab;
        closeMenu();
        if (onTabChange) onTabChange(tab);
      });
    });
  }

  function openMenu() {
    const currentTab = getActiveTab ? getActiveTab() : 'glossary';
    renderOverlay(currentTab);
    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.classList.add('mobile-menu-locked');
    const burgerBtn = document.getElementById('burgerMenuBtn');
    if (burgerBtn) burgerBtn.setAttribute('aria-expanded', 'true');
  }

  function closeMenu() {
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('mobile-menu-locked');
    const burgerBtn = document.getElementById('burgerMenuBtn');
    if (burgerBtn) {
      burgerBtn.setAttribute('aria-expanded', 'false');
      burgerBtn.blur();
    }
  }

  function refreshMenu() {
    if (overlay.classList.contains('open')) {
      renderOverlay(getActiveTab ? getActiveTab() : 'welcome');
    }
  }

  // Bind burger trigger button
  const burgerBtn = document.getElementById('burgerMenuBtn');
  if (burgerBtn) {
    burgerBtn.addEventListener('click', () => {
      if (overlay.classList.contains('open')) {
        closeMenu();
      } else {
        openMenu();
      }
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('open')) {
      closeMenu();
    }
  });

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      closeMenu();
    }
  });

  return { openMenu, closeMenu, refreshMenu };
}
