// Header Component (Standard 2026 - Quieter & Clean Layout)
import { renderAuthBubble } from './AuthBubble.js?v=20261027-quieter-v4';

export function renderHeader(container, { onHomeClick, user = null, isAuthActive = false, onLoginClick, onLogoutClick } = {}) {
  container.innerHTML = `
    <header class="app-header">
      <div class="header-top">
        <div class="header-brand-group" id="headerBrandGroup" role="button" tabindex="0" aria-label="Retour à l'accueil de la formation" style="cursor: pointer;">
          <img src="assets/wemodo/wemodo_logo_white.svg" alt="Wemodo" class="header-brand-logo" width="124" height="24">
          <span class="header-brand-divider" aria-hidden="true"></span>
          <span class="brand-badge">Formation Vibe Coding</span>
        </div>

        <div class="header-right-actions">
          <!-- Contrôle de connexion sobre dans l'en-tête -->
          <div id="headerAuthMount" class="header-auth-mount"></div>

          <!-- Mobile & Tablet Burger Menu Button (Visible < 1024px) -->
          <button class="burger-menu-btn" id="burgerMenuBtn" aria-label="Ouvrir le menu de navigation" aria-expanded="false">
            <span class="burger-icon" aria-hidden="true">
              <span></span>
              <span></span>
              <span></span>
            </span>
            <span class="burger-text">Menu</span>
          </button>
        </div>
      </div>
      <div class="header-copy">
        <h1 class="app-title" id="mainTitle">Formation Vibe Coding</h1>
        <p class="app-subtitle" id="mainSubtitle">Plateforme complémentaire de ressources : parcours coaching, glossaire, prompts, quizz et outils</p>
      </div>
    </header>
  `;

  const brandGroup = container.querySelector('#headerBrandGroup');
  if (brandGroup && onHomeClick) {
    brandGroup.addEventListener('click', onHomeClick);
    brandGroup.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onHomeClick();
      }
    });
  }

  updateHeaderAuth(container, { user, isAuthActive, onLoginClick, onLogoutClick });
}

export function updateHeaderAuth(container, { user = null, isAuthActive = false, onLoginClick, onLogoutClick } = {}) {
  const authMount = (container || document).querySelector('#headerAuthMount');
  if (authMount) {
    renderAuthBubble(authMount, {
      user,
      isAuthActive,
      onLoginClick,
      onLogoutClick
    });
  }
}

export function updateHeader(title, subtitle) {
  const mainTitle = document.getElementById('mainTitle');
  const mainSubtitle = document.getElementById('mainSubtitle');
  if (mainTitle) mainTitle.textContent = title;
  if (mainSubtitle) mainSubtitle.textContent = subtitle;
}
