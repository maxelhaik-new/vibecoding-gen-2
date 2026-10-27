// TabNav Component
export function renderTabNav(container, { activeTab = 'welcome', counts = {}, onTabChange }) {
  container.innerHTML = `
    <nav class="tab-nav" aria-label="Navigation principale par onglets">
      <button class="tab-btn ${activeTab === 'welcome' ? 'active' : ''}" id="tabBtnWelcome" data-tab="welcome">
        <span>🏠 Accueil</span>
      </button>
      <button class="tab-btn ${activeTab === 'parcours' ? 'active' : ''}" id="tabBtnParcours" data-tab="parcours">
        <span>🗺️ Parcours Coaching</span>
        <span class="tab-badge">${counts.parcours || '6'}</span>
      </button>
      <button class="tab-btn ${activeTab === 'glossary' ? 'active' : ''}" id="tabBtnGlossary" data-tab="glossary">
        <span>📖 Glossaire</span>
        <span class="tab-badge">${counts.glossary || 57}</span>
      </button>
      <button class="tab-btn ${activeTab === 'prompts' ? 'active' : ''}" id="tabBtnPrompts" data-tab="prompts">
        <span>⚡ Bibliothèque de Prompts</span>
        <span class="tab-badge">${counts.prompts || 13}</span>
      </button>
      <button class="tab-btn ${activeTab === 'quizz' ? 'active' : ''}" id="tabBtnQuizz" data-tab="quizz">
        <span>🎯 Entraînement Quizz</span>
        <span class="tab-badge">50Q</span>
      </button>
      <button class="tab-btn ${activeTab === 'tools' ? 'active' : ''}" id="tabBtnTools" data-tab="tools">
        <span>🛠️ Outils & Accès</span>
        <span class="tab-badge">${counts.tools || 7}</span>
      </button>
    </nav>
  `;

  container.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.dataset.tab;
      container.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      if (onTabChange) onTabChange(tab);
    });
  });
}

export function setActiveTabBtn(container, tabName) {
  container.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tabName);
  });
}
