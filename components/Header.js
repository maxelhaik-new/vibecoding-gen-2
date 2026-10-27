// Header Component
export function renderHeader(container, { onHomeClick } = {}) {
  container.innerHTML = `
    <header class="app-header">
      <div class="header-top">
        <div class="header-brand-group" id="headerBrandGroup" role="button" tabindex="0" aria-label="Retour à l'accueil de la formation" style="cursor: pointer;">
          <img src="assets/wemodo/wemodo_logo_white.svg" alt="Wemodo" class="header-brand-logo" width="130" height="25">
          <span class="header-brand-divider" aria-hidden="true"></span>
          <span class="brand-badge">Formation Vibe Coding</span>
          <span class="learner-space">
            <span>●</span> Espace Apprenant
          </span>
        </div>

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
      <h1 class="app-title" id="mainTitle">Le Glossaire Vibe Coding</h1>
      <div class="app-subtitle" id="mainSubtitle">57 notions clés et définitions pour le Vibe Coding</div>
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
}

export function updateHeader(title, subtitle) {
  const mainTitle = document.getElementById('mainTitle');
  const mainSubtitle = document.getElementById('mainSubtitle');
  if (mainTitle) mainTitle.textContent = title;
  if (mainSubtitle) mainSubtitle.textContent = subtitle;
}
