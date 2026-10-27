// WelcomeView Component (Standard 2026 - Unboxed Central Hero)

export function initWelcomeView(container, { parcoursData = [], glossaryData = [], promptsData = [], toolsData = [], onNavigate, onStartTour }) {
  function render() {
    container.innerHTML = `
      <div class="welcome-container">
        <!-- Central Unboxed Hero Section -->
        <section class="welcome-hero-central" id="welcomeHeroCentral">
          <div class="welcome-hero-meta">
            <span class="welcome-badge">RESSOURCES FORMATION</span>
            <span class="welcome-edition">Édition 2026</span>
          </div>

          <h2 class="welcome-headline">Bienvenue sur la plateforme Vibe Coding</h2>
          <p class="welcome-subline">
            Votre plateforme complémentaire à la formation Vibe Coding : suivez vos 6 séances de coaching et vos devoirs intersession, explorez le glossaire, copiez des prompts prêts à l'emploi et préparez votre certification.
          </p>

          <!-- Central Universal Search Cockpit -->
          <div class="welcome-search-wrapper" id="welcomeSearchWrapper">
            <div class="search-box welcome-search-box">
              <span class="search-icon" aria-hidden="true">🔍</span>
              <input 
                type="text" 
                id="welcomeSearchInput" 
                class="search-input" 
                placeholder="Rechercher une séance, un devoir intersession, une notion ou un prompt..." 
                autocomplete="off"
                aria-label="Recherche universelle dans toute la plateforme"
              >
              <button 
                type="button" 
                id="welcomeSearchClear" 
                class="btn-clear" 
                style="display:none;" 
                aria-label="Effacer la recherche"
              >✕</button>
            </div>

            <!-- Instant Search Dropdown Results -->
            <div id="welcomeSearchResults" class="welcome-search-results" style="display:none;" role="region" aria-live="polite"></div>
          </div>

          <!-- Quick Suggestions Row -->
          <div class="welcome-quick-actions">
            <div class="welcome-pills-row">
              <span class="welcome-pills-label">Exemples :</span>
              <button type="button" class="welcome-pill-btn" data-query="Séance 1">Séance 1</button>
              <button type="button" class="welcome-pill-btn" data-query="Context Window">Context Window</button>
              <button type="button" class="welcome-pill-btn" data-query="RAG">RAG</button>
              <button type="button" class="welcome-pill-btn" data-query="Architecture">Architecture</button>
              <button type="button" class="welcome-pill-btn" data-query="Supabase">Supabase</button>
              <button type="button" class="welcome-pill-btn" data-query="Certification">Certification</button>
            </div>
          </div>
        </section>
      </div>
    `;

    bindEvents();
  }

  function bindEvents() {
    // 1. Suggestion pills
    container.querySelectorAll('.welcome-pill-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const query = btn.dataset.query;
        const searchInput = container.querySelector('#welcomeSearchInput');
        if (searchInput) {
          searchInput.value = query;
          searchInput.focus();
          executeSearch(query);
        }
      });
    });

    // 3. Universal Search Logic
    const searchInput = container.querySelector('#welcomeSearchInput');
    const searchClear = container.querySelector('#welcomeSearchClear');
    const resultsContainer = container.querySelector('#welcomeSearchResults');

    function executeSearch(query) {
      const q = (query || '').trim().toLowerCase();
      if (!q) {
        resultsContainer.style.display = 'none';
        resultsContainer.innerHTML = '';
        if (searchClear) searchClear.style.display = 'none';
        return;
      }

      if (searchClear) searchClear.style.display = 'inline-flex';

      // Collect matches across data sources
      const matches = [];

      // 0. Parcours Coaching matches
      parcoursData.forEach(session => {
        const label = session.label || '';
        const title = session.title || '';
        const obj = session.objectives || '';
        const contentsJoined = (session.contents || []).join(' ');
        const hwJoined = (session.homework || []).map(h => h.text).join(' ');
        if (
          label.toLowerCase().includes(q) ||
          title.toLowerCase().includes(q) ||
          obj.toLowerCase().includes(q) ||
          contentsJoined.toLowerCase().includes(q) ||
          hwJoined.toLowerCase().includes(q)
        ) {
          matches.push({
            type: 'parcours',
            tab: 'parcours',
            badge: `🗺️ ${label}`,
            title: title,
            snippet: obj.slice(0, 115) + '...',
            param: session.id
          });
        }
      });

      // A. Glossary matches
      glossaryData.forEach(item => {
        const term = item.term || '';
        const def = item.def || '';
        const tag = item.tag || '';
        if (term.toLowerCase().includes(q) || def.toLowerCase().includes(q) || tag.toLowerCase().includes(q)) {
          matches.push({
            type: 'glossary',
            tab: 'glossary',
            badge: '📖 Glossaire',
            title: term,
            snippet: def.slice(0, 110) + '...',
            param: null
          });
        }
      });

      // B. Prompts matches
      promptsData.forEach(item => {
        const title = item.title || '';
        const desc = item.description || '';
        const cat = item.category || '';
        if (title.toLowerCase().includes(q) || desc.toLowerCase().includes(q) || cat.toLowerCase().includes(q)) {
          matches.push({
            type: 'prompts',
            tab: 'prompts',
            badge: '⚡ Prompt',
            title: title,
            snippet: desc.slice(0, 110) + '...',
            param: item.id
          });
        }
      });

      // C. Tools matches
      toolsData.forEach(item => {
        const name = item.name || '';
        const desc = item.description || '';
        const cat = item.category || '';
        if (name.toLowerCase().includes(q) || desc.toLowerCase().includes(q) || cat.toLowerCase().includes(q)) {
          matches.push({
            type: 'tools',
            tab: 'tools',
            badge: '🛠️ Outil',
            title: name,
            snippet: desc.slice(0, 110) + '...',
            param: null
          });
        }
      });

      if (matches.length === 0) {
        resultsContainer.style.display = 'block';
        resultsContainer.innerHTML = `
          <div class="welcome-no-results">
            <span>Aucun résultat trouvé pour « <strong>${escapeHtml(query)}</strong> ».</span>
            <span style="font-size:0.78rem; color:var(--color-text-muted);">Essayez avec un mot-clé comme "RAG", "Architecture", "Lovable" ou "Cursor".</span>
          </div>
        `;
        return;
      }

      // Display up to 6 most relevant items
      const topMatches = matches.slice(0, 6);
      resultsContainer.style.display = 'block';
      resultsContainer.innerHTML = `
        <div class="welcome-results-list">
          <div class="welcome-results-meta">
            <span>${matches.length} résultat${matches.length > 1 ? 's' : ''} trouvé${matches.length > 1 ? 's' : ''}</span>
            <span style="font-size:0.78rem; color:var(--color-text-muted);">Cliquez pour ouvrir</span>
          </div>
          ${topMatches.map((m) => `
            <div class="welcome-result-item" data-tab="${m.tab}" data-param="${m.param || ''}" tabindex="0" role="button">
              <div class="welcome-result-item-header">
                <span class="welcome-result-badge type-${m.type}">${m.badge}</span>
                <strong class="welcome-result-title">${escapeHtml(m.title)}</strong>
              </div>
              <p class="welcome-result-snippet">${escapeHtml(m.snippet)}</p>
            </div>
          `).join('')}
        </div>
      `;

      // Click & Keyboard on search results
      const resultItems = Array.from(resultsContainer.querySelectorAll('.welcome-result-item'));
      resultItems.forEach((item, idx) => {
        function activate() {
          const tab = item.dataset.tab;
          const param = item.dataset.param || null;
          resultsContainer.style.display = 'none';
          if (onNavigate) {
            onNavigate(tab, param);
          }
        }

        item.addEventListener('click', activate);

        item.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            activate();
          } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            const next = resultItems[idx + 1];
            if (next) next.focus();
          } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            const prev = resultItems[idx - 1];
            if (prev) {
              prev.focus();
            } else if (searchInput) {
              searchInput.focus();
            }
          } else if (e.key === 'Escape') {
            resultsContainer.style.display = 'none';
            if (searchInput) searchInput.focus();
          }
        });
      });
    }

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        executeSearch(e.target.value);
      });

      searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          searchInput.value = '';
          executeSearch('');
          searchInput.blur();
        } else if (e.key === 'ArrowDown') {
          const firstItem = resultsContainer.querySelector('.welcome-result-item');
          if (firstItem && resultsContainer.style.display !== 'none') {
            e.preventDefault();
            firstItem.focus();
          }
        }
      });
    }

    if (searchClear) {
      searchClear.addEventListener('click', () => {
        if (searchInput) {
          searchInput.value = '';
          searchInput.focus();
        }
        executeSearch('');
      });
    }

    // Close results when clicking outside
    document.addEventListener('click', (e) => {
      if (!container.contains(e.target)) {
        if (resultsContainer) {
          resultsContainer.style.display = 'none';
        }
      }
    });
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  render();
}
