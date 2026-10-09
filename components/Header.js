// Header Component
export function renderHeader(container) {
  container.innerHTML = `
    <header class="app-header">
      <div class="header-top">
        <div class="header-brand-group">
          <span class="brand-badge">Formation Vibe Coding</span>
          <span class="learner-space">
            <span>●</span> Espace Apprenant • v2.2
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
}

export function updateHeader(title, subtitle) {
  const mainTitle = document.getElementById('mainTitle');
  const mainSubtitle = document.getElementById('mainSubtitle');
  if (mainTitle) mainTitle.textContent = title;
  if (mainSubtitle) mainSubtitle.textContent = subtitle;
}
