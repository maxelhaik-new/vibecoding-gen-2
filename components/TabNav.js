// TabNav Component (Standard 2026 - Clean & Quiet Horizontal Navigation)
export function renderTabNav(container, { activeTab = 'welcome', counts = {}, isAuthenticated = false, onTabChange }) {
  const lockSvg = `<svg class="tab-lock-svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>`;

  container.innerHTML = `
    <nav class="tab-nav" aria-label="Navigation principale par onglets">
      <button class="tab-btn ${activeTab === 'welcome' ? 'active' : ''}" id="tabBtnWelcome" data-tab="welcome">
        <span class="tab-label">Accueil</span>
      </button>
      <button
        class="tab-btn ${activeTab === 'parcours' ? 'active' : ''} ${!isAuthenticated ? 'is-locked' : ''}"
        id="tabBtnParcours"
        data-tab="parcours"
        aria-disabled="${!isAuthenticated}"
        title="${!isAuthenticated ? 'Connexion requise pour accéder au Parcours Coaching' : 'Accéder à votre Parcours Coaching'}"
      >
        <span class="tab-lock-slot" id="tabParcoursIcon">${!isAuthenticated ? lockSvg : ''}</span>
        <span class="tab-label">Parcours Coaching</span>
        <span class="tab-badge">${counts.parcours || '6'}</span>
      </button>
      <button class="tab-btn ${activeTab === 'glossary' ? 'active' : ''}" id="tabBtnGlossary" data-tab="glossary">
        <span class="tab-label">Glossaire</span>
        <span class="tab-badge">${counts.glossary || 57}</span>
      </button>
      <button class="tab-btn ${activeTab === 'prompts' ? 'active' : ''}" id="tabBtnPrompts" data-tab="prompts">
        <span class="tab-label">Prompts</span>
        <span class="tab-badge">${counts.prompts || 13}</span>
      </button>
      <button class="tab-btn ${activeTab === 'quizz' ? 'active' : ''}" id="tabBtnQuizz" data-tab="quizz">
        <span class="tab-label">Quizz</span>
        <span class="tab-badge">50Q</span>
      </button>
      <button class="tab-btn ${activeTab === 'tools' ? 'active' : ''}" id="tabBtnTools" data-tab="tools">
        <span class="tab-label">Outils & Accès</span>
        <span class="tab-badge">${counts.tools || 7}</span>
      </button>
    </nav>
  `;

  container.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.dataset.tab;
      if (onTabChange) onTabChange(tab);
    });
  });
}

export function setActiveTabBtn(container, tabName) {
  if (!container) return;
  container.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tabName);
  });
}

export function updateTabNavAuth(container, isAuthenticated) {
  if (!container) return;
  const lockSvg = `<svg class="tab-lock-svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>`;
  const parcoursBtn = container.querySelector('#tabBtnParcours');
  const parcoursIcon = container.querySelector('#tabParcoursIcon');
  if (parcoursBtn) {
    parcoursBtn.classList.toggle('is-locked', !isAuthenticated);
    parcoursBtn.setAttribute('aria-disabled', String(!isAuthenticated));
    parcoursBtn.title = !isAuthenticated
      ? 'Connexion requise pour accéder au Parcours Coaching'
      : 'Accéder à votre Parcours Coaching';
  }
  if (parcoursIcon) {
    parcoursIcon.innerHTML = !isAuthenticated ? lockSvg : '';
  }
}
