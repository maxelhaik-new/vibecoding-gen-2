// ToolsView Component (Standard 2026 Wide Desktop Grid)

export function initToolsView(container, toolsData) {
  let activeCategory = 'ALL';
  let query = '';

  function escapeHtml(str) {
    return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  container.innerHTML = `
    <!-- Toolbar Section -->
    <div class="search-filter-section">
      <div class="search-box" id="toolsSearchBox">
        <span class="search-icon">🔍</span>
        <input type="text" id="toolsSearchInput" class="search-input" placeholder="Rechercher un outil (ex: GitHub, Supabase, Stripe...)" autocomplete="off">
        <kbd class="search-shortcut-badge" title="Raccourci clavier ⌘K ou /">⌘K</kbd>
        <button id="toolsClearBtn" class="clear-btn" title="Effacer">✕</button>
      </div>
      <span class="counter-tag" id="toolsCounterTag">${toolsData.length} outils</span>
    </div>

    <div class="filter-pills" id="toolsCategoryPills" style="margin-bottom: 1.5rem;">
      <button class="filter-pill active" data-category="ALL">Tous les outils (${toolsData.length})</button>
      <button class="filter-pill" data-category="IA & Modèles">IA & Modèles (3)</button>
      <button class="filter-pill" data-category="Code & Déploiement">Code & Déploiement (2)</button>
      <button class="filter-pill" data-category="Backend & Monétisation">Backend & Monétisation (2)</button>
    </div>

    <!-- Tools Multi-Column Grid (Standard 2026 Wide Desktop) -->
    <div class="tools-grid" id="toolsCardsContainer"></div>

    <!-- Empty State -->
    <div class="empty-state" id="toolsEmptyState">
      <div class="empty-title">Aucun outil ne correspond à votre recherche</div>
      <div class="empty-desc">Modifiez vos mots-clés ou réinitialisez les filtres.</div>
      <button class="reset-btn" id="toolsResetBtn">Afficher tous les outils</button>
    </div>
  `;

  const searchInput = container.querySelector('#toolsSearchInput');
  const clearBtn = container.querySelector('#toolsClearBtn');
  const counterTag = container.querySelector('#toolsCounterTag');
  const cardsContainer = container.querySelector('#toolsCardsContainer');
  const emptyState = container.querySelector('#toolsEmptyState');
  const resetBtn = container.querySelector('#toolsResetBtn');
  const categoryPills = container.querySelector('#toolsCategoryPills');

  function renderCards() {
    const q = query.trim().toLowerCase();

    const filtered = toolsData.filter(t => {
      const matchCat = (activeCategory === 'ALL' || t.category === activeCategory);
      const textToSearch = `${t.name} ${t.description} ${t.category} ${t.cleanUrl}`.toLowerCase();
      const matchSearch = !q || textToSearch.includes(q);
      return matchCat && matchSearch;
    });

    counterTag.textContent = `${filtered.length} outil${filtered.length > 1 ? 's' : ''}`;

    if (filtered.length === 0) {
      cardsContainer.style.display = 'none';
      emptyState.style.display = 'block';
      return;
    }

    cardsContainer.style.display = 'grid';
    emptyState.style.display = 'none';

    cardsContainer.innerHTML = filtered.map(t => `
      <article class="tool-card">
        <div>
          <div class="tool-card-header">
            <h2 class="tool-card-title">
              <span class="tool-card-icon">${t.icon}</span>
              <span>${escapeHtml(t.name)}</span>
            </h2>
          </div>
          <p class="tool-card-desc">
            ${escapeHtml(t.description)}
          </p>
        </div>
        <div class="tool-card-footer">
          <a href="${t.url}" target="_blank" rel="noopener noreferrer" class="tool-card-btn">
            <span>${escapeHtml(t.actionText)}</span>
            <span class="btn-arrow">↗</span>
          </a>
        </div>
      </article>
    `).join('');
  }

  const searchBox = container.querySelector('#toolsSearchBox');

  searchInput.addEventListener('input', (e) => {
    query = e.target.value;
    clearBtn.style.display = query ? 'block' : 'none';
    if (searchBox) searchBox.classList.toggle('has-query', !!query);
    renderCards();
  });

  clearBtn.addEventListener('click', () => {
    searchInput.value = '';
    query = '';
    clearBtn.style.display = 'none';
    if (searchBox) searchBox.classList.remove('has-query');
    searchInput.focus();
    renderCards();
  });

  categoryPills.addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-pill');
    if (!btn) return;
    activeCategory = btn.dataset.category;
    categoryPills.querySelectorAll('.filter-pill').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderCards();
  });

  resetBtn.addEventListener('click', () => {
    query = '';
    searchInput.value = '';
    clearBtn.style.display = 'none';
    activeCategory = 'ALL';
    categoryPills.querySelectorAll('.filter-pill').forEach(b => b.classList.toggle('active', b.dataset.category === 'ALL'));
    renderCards();
  });

  renderCards();
}
