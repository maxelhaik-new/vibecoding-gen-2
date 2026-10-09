// TabNav Component
export function renderTabNav(container, { activeTab = 'glossary', counts = {}, onTabChange }) {
  container.innerHTML = `
    <nav class="tab-nav">
      <button class="tab-btn ${activeTab === 'glossary' ? 'active' : ''}" data-tab="glossary">
        <span>📖 Glossaire</span>
        <span class="tab-badge">${counts.glossary || 57}</span>
      </button>
      <button class="tab-btn ${activeTab === 'prompts' ? 'active' : ''}" data-tab="prompts">
        <span>⚡ Bibliothèque de Prompts</span>
        <span class="tab-badge">${counts.prompts || 13}</span>
      </button>
      <button class="tab-btn ${activeTab === 'quizz' ? 'active' : ''}" data-tab="quizz">
        <span>🎯 Entraînement Quizz</span>
        <span class="tab-badge">50Q</span>
      </button>
      <button class="tab-btn ${activeTab === 'tools' ? 'active' : ''}" data-tab="tools">
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
