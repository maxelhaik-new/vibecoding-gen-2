// ToolsView Component (Standard 2026 Wide Desktop Grid)

export function initToolsView(container, toolsData, { initialQuery = '' } = {}) {
  let activeCategory = 'ALL';
  let query = initialQuery || '';
  const searchIconSvg = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>`;

  const toolSvgById = {
    'google-ai-pro': `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8L12 2z"></path></svg>`,
    'google-ai-studio': `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>`,
    'google-antigravity': `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>`,
    'github': `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="18" cy="18" r="3"></circle><circle cx="6" cy="6" r="3"></circle><path d="M13 6h3a2 2 0 0 1 2 2v7"></path><line x1="6" y1="9" x2="6" y2="21"></line></svg>`,
    'vercel': `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="12 3 22 20 2 20 12 3"></polygon></svg>`,
    'supabase': `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>`,
    'stripe': `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>`
  };

  function escapeHtml(str) {
    return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  container.innerHTML = `
    <!-- Toolbar Section -->
    <div class="search-filter-section">
      <div class="search-box ${query ? 'has-query' : ''}" id="toolsSearchBox">
        <span class="search-icon">${searchIconSvg}</span>
        <input type="text" id="toolsSearchInput" class="search-input" value="${escapeHtml(query)}" placeholder="Rechercher un outil (ex: GitHub, Supabase, Stripe...)" autocomplete="off">
        <kbd class="search-shortcut-badge" title="Raccourci clavier ⌘K ou /">⌘K</kbd>
        <button id="toolsClearBtn" class="clear-btn" style="display: ${query ? 'inline-flex' : 'none'};" title="Effacer" type="button">✕</button>
      </div>
    </div>

    <div class="filter-pills" id="toolsCategoryPills" style="margin-bottom: 1.5rem;">
      <button class="filter-pill active" data-category="ALL">Tous les outils (${toolsData.length})</button>
      <button class="filter-pill" data-category="IA & Modèles">IA & Modèles (3)</button>
      <button class="filter-pill" data-category="Code & Déploiement">Code & Déploiement (2)</button>
      <button class="filter-pill" data-category="Backend & Monétisation">Backend & Monétisation (2)</button>
    </div>

    <!-- Tools Multi-Column Grid -->
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
  const cardsContainer = container.querySelector('#toolsCardsContainer');
  const emptyState = container.querySelector('#toolsEmptyState');
  const resetBtn = container.querySelector('#toolsResetBtn');
  const categoryPills = container.querySelector('#toolsCategoryPills');

  function renderCards() {
    const q = query.trim().toLowerCase();

    const filtered = toolsData.filter(t => {
      const matchCat = (activeCategory === 'ALL' || t.category === activeCategory);
      const textToSearch = `${t.name} ${t.description} ${t.category} ${t.url || ''}`.toLowerCase();
      const matchSearch = !q || textToSearch.includes(q);
      return matchCat && matchSearch;
    });

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
              <span class="tool-card-icon">${toolSvgById[t.id] || ''}</span>
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
    clearBtn.style.display = query ? 'inline-flex' : 'none';
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
