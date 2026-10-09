// PromptsView Component (Standard 2026 Wide Desktop Grid)
import { showToast } from './Toast.js';

export function initPromptsView(container, promptsData, { initialPromptId = null } = {}) {
  let activeTag = 'ALL';
  let query = '';
  let isolatedPromptId = initialPromptId;

  // Extract unique tags
  const tagsSet = new Set();
  promptsData.forEach(p => p.tags.forEach(t => tagsSet.add(t)));
  const allTags = [...tagsSet].sort();

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
          <span class="search-icon">🔍</span>
          <input type="text" id="promptsSearchInput" class="search-input" placeholder="Rechercher un prompt par mot-clé (ex: Vercel, Supabase, bug...)" autocomplete="off">
          <kbd class="search-shortcut-badge" title="Raccourci clavier ⌘K ou /">⌘K</kbd>
          <button id="promptsClearBtn" class="clear-btn" title="Effacer">✕</button>
        </div>
        <span class="counter-tag" id="promptsCounterTag">${promptsData.length} prompts</span>
      </div>

      <div class="filter-pills" id="promptTagPills" style="margin-bottom: 1.5rem;">
        <button class="filter-pill active" data-tag="ALL">Tous les thèmes (${promptsData.length})</button>
        ${allTags.map(t => `<button class="filter-pill" data-tag="${escapeHtml(t)}">${escapeHtml(t)}</button>`).join('')}
      </div>
    </div>

    <!-- Prompts Multi-Column Grid (Standard 2026 Wide Desktop) -->
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
  const counterTag = container.querySelector('#promptsCounterTag');
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

    counterTag.textContent = `${filtered.length} prompt${filtered.length > 1 ? 's' : ''}`;

    if (filtered.length === 0) {
      cardsContainer.style.display = 'none';
      emptyState.style.display = 'block';
      return;
    }

    cardsContainer.style.display = 'grid';
    emptyState.style.display = 'none';

    cardsContainer.innerHTML = filtered.map(renderPromptCardHtml).join('');
  }

  function renderPromptCardHtml(item) {
    return `
      <article class="prompt-card">
        <div>
          <div class="prompt-header">
            <h2 class="prompt-title">${escapeHtml(item.title)}</h2>
            <div class="prompt-tags">
              ${item.tags.map(t => `<span class="prompt-tag-badge">${escapeHtml(t)}</span>`).join('')}
            </div>
          </div>
          <p class="prompt-desc" style="margin: 0.65rem 0 1rem 0;">${escapeHtml(item.description)}</p>
          <div class="prompt-box">${escapeHtml(item.prompt)}</div>
        </div>
        <div style="display: flex; justify-content: flex-end; padding-top: 0.75rem; border-top: 1px dashed var(--color-border);">
          <button class="btn-copy-prompt" data-prompt="${encodeURIComponent(item.prompt)}">
            <span>📋</span> Copier le prompt
          </button>
        </div>
      </article>
    `;
  }

  // Copy to clipboard event delegation
  cardsContainer.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn-copy-prompt');
    if (!btn) return;
    const promptText = decodeURIComponent(btn.dataset.prompt);
    navigator.clipboard.writeText(promptText).then(() => {
      showToast("Prompt copié dans le presse-papiers ! ✓");
    }).catch(() => {
      showToast("Erreur lors de la copie");
    });
  });

  const searchBox = container.querySelector('#promptsSearchBox');

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

  tagPillsContainer.addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-pill');
    if (!btn) return;
    activeTag = btn.dataset.tag;
    tagPillsContainer.querySelectorAll('.filter-pill').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderCards();
  });

  resetBtn.addEventListener('click', () => {
    query = '';
    searchInput.value = '';
    clearBtn.style.display = 'none';
    activeTag = 'ALL';
    tagPillsContainer.querySelectorAll('.filter-pill').forEach(b => b.classList.toggle('active', b.dataset.tag === 'ALL'));
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
