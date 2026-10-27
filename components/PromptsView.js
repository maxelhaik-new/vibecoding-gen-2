// PromptsView Component (Standard 2026 Wide Desktop Grid)
import { showToast } from './Toast.js';

export function initPromptsView(container, promptsData, { initialPromptId = null } = {}) {
  let activeTag = 'ALL';
  let query = '';
  let isolatedPromptId = initialPromptId;

  // Extract unique tags and calculate frequencies (excluding generic 'Exemple')
  const tagCounts = {};
  promptsData.forEach(p => p.tags.forEach(t => {
    if (t === 'Exemple') return;
    tagCounts[t] = (tagCounts[t] || 0) + 1;
  }));

  // Preferred 5 core topics
  const allUniqueTags = Object.keys(tagCounts);
  const preferredPrimary = ['Frontend', 'Architecture', 'Sécurité', 'UI / UX', 'Backend'];
  const primaryTags = preferredPrimary.filter(t => allUniqueTags.includes(t));
  
  if (primaryTags.length < 5) {
    const candidates = allUniqueTags
      .filter(t => !primaryTags.includes(t))
      .sort((a, b) => tagCounts[b] - tagCounts[a] || a.localeCompare(b));
    primaryTags.push(...candidates.slice(0, 5 - primaryTags.length));
  }

  // Remaining tags sorted alphabetically for easy scanning
  const remainingTags = allUniqueTags
    .filter(t => !primaryTags.includes(t))
    .sort((a, b) => a.localeCompare(b));

  function escapeHtml(str) {
    return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  container.innerHTML = `
    <!-- Top Isolated Return Button (if isolated) -->
    <div id="promptsIsolatedNav" style="display: ${isolatedPromptId ? 'block' : 'none'}; margin-bottom: 1.25rem;">
      <button class="filter-pill active" id="btnBackAllPrompts" style="padding: 0.6rem 1.1rem; font-size: 0.95rem;">
        ← Revenir à tous les prompts (${promptsData.length})
      </button>
    </div>

    <!-- Toolbar Section -->
    <div id="promptsToolbar" style="display: ${isolatedPromptId ? 'none' : 'block'};">
      <div class="search-filter-section">
        <div class="search-box" id="promptsSearchBox">
          <span class="search-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg></span>
          <input type="text" id="promptsSearchInput" class="search-input" placeholder="Rechercher un prompt par mot-clé (ex: Vercel, Supabase, bug...)" autocomplete="off">
          <kbd class="search-shortcut-badge" title="Raccourci clavier ⌘K ou /">⌘K</kbd>
          <button id="promptsClearBtn" class="clear-btn" title="Effacer">✕</button>
        </div>
      </div>

      <!-- Filter Pills (5 thèmes initiaux + Déploiement inline sans carte) -->
      <div class="filter-pills" id="promptTagPills" style="margin-bottom: 1.5rem;">
        <button class="filter-pill active" data-tag="ALL">Tous les thèmes (${promptsData.length})</button>
        ${primaryTags.map(t => `<button class="filter-pill" data-tag="${escapeHtml(t)}">${escapeHtml(t)}</button>`).join('')}
        <span id="promptExtraTags" class="filter-pills-extra collapsed">
          ${remainingTags.map(t => `<button class="filter-pill" data-tag="${escapeHtml(t)}">${escapeHtml(t)}</button>`).join('')}
        </span>
        <button type="button" class="filter-pill filter-pill-toggle" id="btnToggleTags" aria-expanded="false" title="Déployer les autres thèmes">
          <span class="toggle-icon">+</span> <span class="toggle-count">${remainingTags.length} autres</span> <span class="toggle-arrow">▾</span>
        </button>
      </div>
    </div>

    <!-- Prompts Multi-Column Grid -->
    <div class="prompts-grid" id="promptsCardsContainer"></div>

    <!-- Empty State -->
    <div class="empty-state" id="promptsEmptyState">
      <div class="empty-title">Aucun prompt ne correspond à votre recherche</div>
      <div class="empty-desc">Essayez un autre mot-clé ou réinitialisez les filtres.</div>
      <button class="reset-btn" id="promptsResetBtn">Afficher tous les prompts</button>
    </div>
  `;

  const searchInput = container.querySelector('#promptsSearchInput');
  const clearBtn = container.querySelector('#promptsClearBtn');
  const cardsContainer = container.querySelector('#promptsCardsContainer');
  const emptyState = container.querySelector('#promptsEmptyState');
  const resetBtn = container.querySelector('#promptsResetBtn');
  const tagPillsContainer = container.querySelector('#promptTagPills');
  const isolatedNav = container.querySelector('#promptsIsolatedNav');
  const toolbar = container.querySelector('#promptsToolbar');
  const btnBackAll = container.querySelector('#btnBackAllPrompts');

  function renderCards() {
    if (isolatedPromptId) {
      const single = promptsData.find(p => p.id === isolatedPromptId);
      if (single) {
        cardsContainer.style.display = 'grid';
        cardsContainer.style.gridTemplateColumns = '1fr';
        emptyState.style.display = 'none';
        cardsContainer.innerHTML = renderPromptCardHtml(single);
        return;
      }
    }

    cardsContainer.style.gridTemplateColumns = '';
    const q = query.trim().toLowerCase();

    const filtered = promptsData.filter(p => {
      const matchTag = (activeTag === 'ALL' || p.tags.includes(activeTag));
      const textToSearch = `${p.title} ${p.description} ${p.prompt} ${p.tags.join(' ')}`.toLowerCase();
      const matchSearch = !q || textToSearch.includes(q);
      return matchTag && matchSearch;
    });

    if (filtered.length === 0) {
      cardsContainer.style.display = 'none';
      emptyState.style.display = 'block';
      return;
    }

    cardsContainer.style.display = 'grid';
    emptyState.style.display = 'none';

    cardsContainer.innerHTML = filtered.map(renderPromptCardHtml).join('');
  }

  const copyIconSvg = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>`;
  const checkIconSvg = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"></polyline></svg>`;

  function renderPromptCardHtml(item) {
    const cleanTags = (item.tags || []).filter(t => t !== 'Exemple').slice(0, 3);
    return `
      <article class="prompt-card">
        <div class="prompt-card-top">
          <h2 class="prompt-title">${escapeHtml(item.title)}</h2>
          <p class="prompt-desc">${escapeHtml(item.description)}</p>
        </div>

        <div class="prompt-box">
          <button
            type="button"
            class="prompt-copy-toggle"
            data-prompt="${encodeURIComponent(item.prompt)}"
            aria-label="Copier le prompt"
            aria-pressed="false"
            title="Copier le prompt"
          >
            ${copyIconSvg}
          </button>
          <div class="prompt-code-text">${escapeHtml(item.prompt)}</div>
        </div>

        ${cleanTags.length > 0 ? `
          <div class="prompt-tags">
            ${cleanTags.map(t => `<button type="button" class="prompt-tag-badge" data-tag-click="${escapeHtml(t)}">${escapeHtml(t)}</button>`).join('')}
          </div>
        ` : ''}
      </article>
    `;
  }

  // Copy to clipboard toggle & tag click delegation
  cardsContainer.addEventListener('click', (e) => {
    const tagBtn = e.target.closest('[data-tag-click]');
    if (tagBtn && !isolatedPromptId) {
      const clickedTag = tagBtn.dataset.tagClick;
      if (clickedTag) {
        activeTag = clickedTag;
        tagPillsContainer.querySelectorAll('.filter-pill:not(#btnToggleTags)').forEach(b => {
          b.classList.toggle('active', b.dataset.tag === clickedTag);
        });
        renderCards();
      }
      return;
    }

    const btn = e.target.closest('.prompt-copy-toggle');
    if (!btn) return;
    const promptText = decodeURIComponent(btn.dataset.prompt);
    navigator.clipboard.writeText(promptText).then(() => {
      btn.classList.add('copied');
      btn.setAttribute('aria-pressed', 'true');
      btn.setAttribute('title', 'Copié !');
      btn.innerHTML = checkIconSvg;
      showToast("Prompt copié ✓");
      setTimeout(() => {
        btn.classList.remove('copied');
        btn.setAttribute('aria-pressed', 'false');
        btn.setAttribute('title', 'Copier le prompt');
        btn.innerHTML = copyIconSvg;
      }, 1800);
    }).catch(() => {
      showToast("Erreur lors de la copie");
    });
  });

  const searchBox = container.querySelector('#promptsSearchBox');

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

  // Toggle More Themes handler
  let isTagsExpanded = false;
  const btnToggleTags = container.querySelector('#btnToggleTags');
  const extraTagsContainer = container.querySelector('#promptExtraTags');

  function updateToggleBtnState() {
    if (!btnToggleTags) return;
    btnToggleTags.setAttribute('aria-expanded', String(isTagsExpanded));
    btnToggleTags.classList.toggle('expanded', isTagsExpanded);
    if (isTagsExpanded) {
      btnToggleTags.innerHTML = `<span class="toggle-icon">−</span> <span class="toggle-count">Moins</span> <span class="toggle-arrow">▴</span>`;
      btnToggleTags.setAttribute('title', 'Réduire les thèmes');
    } else {
      btnToggleTags.innerHTML = `<span class="toggle-icon">+</span> <span class="toggle-count">${remainingTags.length} autres</span> <span class="toggle-arrow">▾</span>`;
      btnToggleTags.setAttribute('title', 'Déployer les autres thèmes');
    }
  }

  if (btnToggleTags && extraTagsContainer) {
    btnToggleTags.addEventListener('click', (e) => {
      e.stopPropagation();
      isTagsExpanded = !isTagsExpanded;
      extraTagsContainer.classList.toggle('collapsed', !isTagsExpanded);
      extraTagsContainer.classList.toggle('open', isTagsExpanded);
      updateToggleBtnState();
    });
  }

  tagPillsContainer.addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-pill');
    if (!btn || btn.id === 'btnToggleTags') return;
    activeTag = btn.dataset.tag;
    tagPillsContainer.querySelectorAll('.filter-pill:not(#btnToggleTags)').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderCards();
  });

  resetBtn.addEventListener('click', () => {
    query = '';
    searchInput.value = '';
    clearBtn.style.display = 'none';
    activeTag = 'ALL';
    tagPillsContainer.querySelectorAll('.filter-pill:not(#btnToggleTags)').forEach(b => b.classList.toggle('active', b.dataset.tag === 'ALL'));
    renderCards();
  });

  btnBackAll.addEventListener('click', () => {
    isolatedPromptId = null;
    isolatedNav.style.display = 'none';
    toolbar.style.display = 'block';
    const url = new URL(window.location);
    url.searchParams.delete('prompt');
    history.replaceState(null, '', url.toString());
    renderCards();
  });

  renderCards();
}
