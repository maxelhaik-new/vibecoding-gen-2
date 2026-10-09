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
          <span class="brand-badge">Formation Vibe Coding</span>
          <button class="mobile-menu-close" id="mobileMenuCloseBtn" aria-label="Fermer le menu">
            <span class="close-symbol" aria-hidden="true">✕</span>
            <span class="close-text">Fermer</span>
          </button>
        </div>

        <!-- Fullscreen Navigation Links (Gros titres épurés) -->
        <nav class="mobile-menu-links">
          <button class="mobile-nav-item ${activeTab === 'glossary' ? 'active' : ''}" data-tab="glossary">
            <span class="mobile-nav-meta">01</span>
            <span class="mobile-nav-title">Glossaire</span>
            <span class="mobile-nav-count">${counts.glossary || 57}</span>
          </button>

          <button class="mobile-nav-item ${activeTab === 'prompts' ? 'active' : ''}" data-tab="prompts">
            <span class="mobile-nav-meta">02</span>
            <span class="mobile-nav-title">Prompts</span>
            <span class="mobile-nav-count">${counts.prompts || 13}</span>
          </button>

          <button class="mobile-nav-item ${activeTab === 'quizz' ? 'active' : ''}" data-tab="quizz">
            <span class="mobile-nav-meta">03</span>
            <span class="mobile-nav-title">Quizz</span>
            <span class="mobile-nav-count">50Q</span>
          </button>

          <button class="mobile-nav-item ${activeTab === 'tools' ? 'active' : ''}" data-tab="tools">
            <span class="mobile-nav-meta">04</span>
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

  return { openMenu, closeMenu };
}
