// MobileMenu Component (Standard 2026 - Fullscreen Indigo Navigation)

export function initMobileMenu({ getActiveTab, counts = {}, onTabChange }) {
  let overlay = document.getElementById('mobileMenuOverlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'mobileMenuOverlay';
    overlay.className = 'mobile-menu-overlay';
    overlay.setAttribute('aria-hidden', 'true');
    document.body.appendChild(overlay);
  }

  function renderOverlay(activeTab) {
    overlay.innerHTML = `
      <div class="mobile-menu-container">
        <!-- Top Bar with Brand Badge & Close Button -->
        <div class="mobile-menu-header">
          <div class="mobile-menu-brand-group" id="mobileMenuBrandBadge" role="button" tabindex="0" style="cursor:pointer;" aria-label="Retour à l'accueil">
            <img src="assets/wemodo/wemodo_logo_white.svg" alt="Wemodo" class="mobile-brand-logo" width="110" height="21">
            <span class="brand-badge">Formation Vibe Coding</span>
          </div>
          <button class="mobile-menu-close" id="mobileMenuCloseBtn" aria-label="Fermer le menu">
            <span class="close-symbol" aria-hidden="true">✕</span>
            <span class="close-text">Fermer</span>
          </button>
        </div>

        <!-- Fullscreen Navigation Links (Gros titres épurés) -->
        <nav class="mobile-menu-links">
          <button class="mobile-nav-item ${activeTab === 'welcome' ? 'active' : ''}" data-tab="welcome">
            <span class="mobile-nav-meta">01</span>
            <span class="mobile-nav-title">Accueil</span>
          </button>

          <button class="mobile-nav-item ${activeTab === 'parcours' ? 'active' : ''}" data-tab="parcours">
            <span class="mobile-nav-meta">02</span>
            <span class="mobile-nav-title">Parcours</span>
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
            <span class="mobile-nav-title">Outils</span>
            <span class="mobile-nav-count">${counts.tools || 7}</span>
          </button>
        </nav>

        <!-- Minimalist Footer -->
        <div class="mobile-menu-footer">
          <span>Espace Apprenant • Standard 2026</span>
        </div>
      </div>
    `;

    // Close button listener
    overlay.querySelector('#mobileMenuCloseBtn').addEventListener('click', closeMenu);

    // Brand badge click listener (return to welcome)
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

    // Nav items listeners
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

  // Keyboard navigation: Escape key to close
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('open')) {
      closeMenu();
    }
  });

  // Close when clicking outside the menu card on backdrop
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      closeMenu();
    }
  });

  return { openMenu, closeMenu };
}
