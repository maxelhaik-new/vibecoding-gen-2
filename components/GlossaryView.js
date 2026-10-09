// GlossaryView Component (Standard 2026 Wide Desktop Grid)

export function initGlossaryView(container, glossaryData) {
  let activeModule = 'ALL';
  let activeLetter = 'ALL';
  let query = '';
  let showAdvancedFilters = false;

  // Extract alphabet letters
  const alphabet = [...new Set(glossaryData.map(d => {
    const clean = d.word.replace(/^[^a-zA-Z0-9]+/, '');
    return clean ? clean[0].toUpperCase() : '';
  }).filter(c => /^[A-Z]$/.test(c)))].sort();

  function escapeHtml(str) {
    return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  container.innerHTML = `
    <!-- Search & Quick Filter Toolbar -->
    <div class="search-filter-section">
      <div class="search-box" id="glossarySearchBox">
        <span class="search-icon">🔍</span>
        <input type="text" id="glossarySearchInput" class="search-input" placeholder="Rechercher une notion, un acronyme ou mot-clé..." autocomplete="off">
        <kbd class="search-shortcut-badge" title="Raccourci clavier ⌘K ou /">⌘K</kbd>
        <button id="glossaryClearBtn" class="clear-btn" title="Effacer">✕</button>
      </div>
      <span class="counter-tag" id="glossaryCounterTag">${glossaryData.length} termes</span>
    </div>

    <!-- Toggle Filters Bar -->
    <button class="filter-accordion-toggle" id="btnToggleFilters">
      <span>⚙️ Index Alphabétique & Filtres par Module</span>
      <span id="filterToggleIcon">▼</span>
    </button>

    <!-- Filters Body -->
    <div class="filter-accordion-body" id="glossaryFiltersBody">
      <!-- Module Filter -->
      <div>
        <div class="filter-group-title">Filtrer par Module :</div>
        <div class="filter-pills" id="moduleFilterPills">
          <button class="filter-pill active" data-module="ALL">Tous les modules</button>
          <button class="filter-pill" data-module="M1">Module 1 (Fondations)</button>
          <button class="filter-pill" data-module="M2">Module 2 (Stack & Outils)</button>
          <button class="filter-pill" data-module="M3">Module 3 (Projets & Code)</button>
          <button class="filter-pill" data-module="M4">Module 4 (Antigravity & BaaS)</button>
          <button class="filter-pill" data-module="M5">Module 5 (Certification)</button>
        </div>
      </div>

      <!-- Alphabet Filter Bar -->
      <div>
        <div class="filter-group-title">Index Alphabétique (A-Z) :</div>
        <div class="alphabet-bar" id="alphabetBar">
          <button class="letter-btn active" data-letter="ALL">Tous</button>
          ${alphabet.map(l => `<button class="letter-btn" data-letter="${l}">${l}</button>`).join('')}
        </div>
      </div>
    </div>

    <!-- Cards Multi-Column Grid (Standard 2026 Wide Desktop) -->
    <div class="glossary-grid" id="glossaryCardsContainer"></div>

    <!-- Empty State -->
    <div class="empty-state" id="glossaryEmptyState">
      <div class="empty-title">Aucune notion ne correspond à vos critères</div>
      <div class="empty-desc">Modifiez vos filtres ou réinitialisez la recherche.</div>
      <button class="reset-btn" id="glossaryResetBtn">Réinitialiser les filtres</button>
    </div>
  `;

  const searchInput = container.querySelector('#glossarySearchInput');
  const clearBtn = container.querySelector('#glossaryClearBtn');
  const counterTag = container.querySelector('#glossaryCounterTag');
  const cardsContainer = container.querySelector('#glossaryCardsContainer');
  const emptyState = container.querySelector('#glossaryEmptyState');
  const resetBtn = container.querySelector('#glossaryResetBtn');
  const btnToggleFilters = container.querySelector('#btnToggleFilters');
  const filtersBody = container.querySelector('#glossaryFiltersBody');
  const filterToggleIcon = container.querySelector('#filterToggleIcon');

  function renderCards() {
    const q = query.trim().toLowerCase();

    const filtered = glossaryData.filter(item => {
      const matchMod = (activeModule === 'ALL' || item.module === activeModule);
      
      let matchAlpha = true;
      if (activeLetter !== 'ALL') {
        const cleanWord = item.word.replace(/^[^a-zA-Z0-9]+/, '');
        matchAlpha = cleanWord.toUpperCase().startsWith(activeLetter);
      }

      const textToSearch = `${item.word} ${item.category} ${item.definition} ${item.ref}`.toLowerCase();
      const matchSearch = !q || textToSearch.includes(q);

      return matchMod && matchAlpha && matchSearch;
    });

    counterTag.textContent = `${filtered.length} terme${filtered.length > 1 ? 's' : ''}`;

    if (filtered.length === 0) {
      cardsContainer.style.display = 'none';
      emptyState.style.display = 'block';
      return;
    }

    cardsContainer.style.display = 'grid';
    emptyState.style.display = 'none';

    cardsContainer.innerHTML = filtered.map(item => {
      let wordHtml = escapeHtml(item.word);
      let defHtml = escapeHtml(item.definition);

      if (q) {
        const qEscaped = escapeRegExp(q);
        const regex = new RegExp(`(${qEscaped})`, 'gi');
        wordHtml = wordHtml.replace(regex, '<mark style="background:var(--color-brand-sunny); padding:0 2px;">$1</mark>');
        defHtml = defHtml.replace(regex, '<mark style="background:var(--color-brand-sunny); padding:0 2px;">$1</mark>');
      }

      const refParts = item.ref.split('—');
      const code = refParts[0] ? refParts[0].trim() : item.ref;
      const title = refParts[1] ? refParts[1].trim() : '';

      return `
        <article class="card-item">
          <div>
            <div class="card-header">
              <h2 class="term-title">${wordHtml}</h2>
              <span class="type-badge">${escapeHtml(item.category)}</span>
            </div>
            <p class="term-def" style="margin-top: 0.75rem;">${defHtml}</p>
          </div>
          <div class="card-footer">
            <span class="ref-code">${escapeHtml(code)}</span>
            ${title ? `<span class="ref-title">${escapeHtml(title)}</span>` : ''}
          </div>
        </article>
      `;
    }).join('');
  }

  const searchBox = container.querySelector('#glossarySearchBox');

  // Event Listeners
  searchInput.addEventListener('input', (e) => {
    query = e.target.value;
    clearBtn.style.display = query ? 'block' : 'none';
    searchBox.classList.toggle('has-query', !!query);
    renderCards();
  });

  clearBtn.addEventListener('click', () => {
    searchInput.value = '';
    query = '';
    clearBtn.style.display = 'none';
    searchBox.classList.remove('has-query');
    searchInput.focus();
    renderCards();
  });

  btnToggleFilters.addEventListener('click', () => {
    filtersBody.classList.toggle('open');
    const isOpen = filtersBody.classList.contains('open');
    filterToggleIcon.textContent = isOpen ? '▲' : '▼';
  });

  container.querySelector('#moduleFilterPills').addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-pill');
    if (!btn) return;
    activeModule = btn.dataset.module;
    container.querySelectorAll('#moduleFilterPills .filter-pill').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderCards();
  });

  container.querySelector('#alphabetBar').addEventListener('click', (e) => {
    const btn = e.target.closest('.letter-btn');
    if (!btn) return;
    activeLetter = btn.dataset.letter;
    container.querySelectorAll('#alphabetBar .letter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderCards();
  });

  resetBtn.addEventListener('click', () => {
    query = '';
    searchInput.value = '';
    clearBtn.style.display = 'none';
    if (searchBox) searchBox.classList.remove('has-query');
    activeModule = 'ALL';
    activeLetter = 'ALL';

    container.querySelectorAll('#moduleFilterPills .filter-pill').forEach(b => b.classList.toggle('active', b.dataset.module === 'ALL'));
    container.querySelectorAll('#alphabetBar .letter-btn').forEach(b => b.classList.toggle('active', b.dataset.letter === 'ALL'));

    renderCards();
  });

  renderCards();
}
