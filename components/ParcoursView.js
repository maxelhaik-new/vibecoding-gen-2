// ParcoursView Component (Standard 2026 - Suivi des 6 Séances & Checklist Devoirs Intersession)
import { showToast } from './Toast.js?v=20261021-synced-v4';

const STORAGE_KEY_HOMEWORK = 'vibecoding_parcours_homework_v1';
const STORAGE_KEY_ACTIVE_SESSION = 'vibecoding_parcours_active_session_v1';
const STORAGE_KEY_VIEW_MODE = 'vibecoding_parcours_view_mode_v1';

export function initParcoursView(container, parcoursData = [], { initialSessionId = null } = {}) {
  let completedTasks = loadCompletedTasks();
  let activeSessionIndex = loadActiveSessionIndex();
  let viewMode = loadViewMode(); // 'focus' | 'grid'

  if (initialSessionId) {
    const foundIdx = parcoursData.findIndex(s => s.id === initialSessionId);
    if (foundIdx !== -1) {
      activeSessionIndex = foundIdx;
      viewMode = 'focus';
      saveActiveSessionIndex(activeSessionIndex);
      saveViewMode(viewMode);
    }
  }

  function loadCompletedTasks() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_HOMEWORK);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) return new Set(parsed);
      }
    } catch (e) {}
    return new Set();
  }

  function saveCompletedTasks() {
    try {
      localStorage.setItem(STORAGE_KEY_HOMEWORK, JSON.stringify([...completedTasks]));
    } catch (e) {}
  }

  function loadActiveSessionIndex() {
    try {
      const saved = parseInt(localStorage.getItem(STORAGE_KEY_ACTIVE_SESSION), 10);
      if (!isNaN(saved) && saved >= 0 && saved < parcoursData.length) {
        return saved;
      }
    } catch (e) {}
    return 0;
  }

  function saveActiveSessionIndex(idx) {
    try {
      localStorage.setItem(STORAGE_KEY_ACTIVE_SESSION, String(idx));
    } catch (e) {}
  }

  function loadViewMode() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_VIEW_MODE);
      if (saved === 'grid' || saved === 'focus') return saved;
    } catch (e) {}
    return 'focus';
  }

  function saveViewMode(mode) {
    try {
      localStorage.setItem(STORAGE_KEY_VIEW_MODE, mode);
    } catch (e) {}
  }

  function escapeHtml(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function getTotalHomeworkCount() {
    return parcoursData.reduce((acc, s) => acc + (s.homework ? s.homework.length : 0), 0);
  }

  function getSessionProgress(session) {
    const list = session.homework || [];
    const total = list.length;
    const done = list.filter(h => completedTasks.has(h.id)).length;
    return { done, total, isComplete: total > 0 && done === total };
  }

  function formatLabel(label) {
    const s = String(label || '').trim();
    if (/^SÉANCE\s*(\d+)$/i.test(s)) {
      return s.replace(/^SÉANCE\s*(\d+)$/i, 'Séance $1');
    }
    return s;
  }

  function render() {
    const totalTasks = getTotalHomeworkCount();
    const totalDone = completedTasks.size;
    const globalPercent = totalTasks > 0 ? Math.round((totalDone / totalTasks) * 100) : 0;
    const currentSession = parcoursData[activeSessionIndex] || parcoursData[0];
    const currentProg = getSessionProgress(currentSession);

    container.innerHTML = `
      <div class="parcours-wrapper">
        <!-- Top Toolbar : Global Progress + View Mode Switcher -->
        <div class="parcours-cockpit-bar">
          <div class="parcours-progress-summary">
            <div class="parcours-progress-header">
              <span class="parcours-progress-label">Devoirs intersession</span>
              <span class="parcours-progress-stats">
                <strong>${totalDone}/${totalTasks}</strong> (${globalPercent}%)
              </span>
            </div>
            <div class="parcours-progress-track" role="progressbar" aria-valuenow="${globalPercent}" aria-valuemin="0" aria-valuemax="100">
              <div class="parcours-progress-fill" style="width: ${globalPercent}%;"></div>
            </div>
          </div>

          <div class="parcours-toolbar-actions">
            <div class="parcours-mode-switch" role="group" aria-label="Mode d'affichage du parcours">
              <button type="button" class="parcours-mode-btn ${viewMode === 'focus' ? 'active' : ''}" data-mode="focus">
                Par séance
              </button>
              <button type="button" class="parcours-mode-btn ${viewMode === 'grid' ? 'active' : ''}" data-mode="grid">
                Vue d'ensemble
              </button>
            </div>
            ${totalDone > 0 ? `
              <button type="button" class="parcours-reset-btn" id="parcoursResetAllBtn" title="Réinitialiser toutes les cases cochées">
                Réinitialiser
              </button>
            ` : ''}
          </div>
        </div>

        <!-- Stepper Horizontal des 6 Séances (Séance 0 à Séance 5) -->
        <nav class="parcours-stepper" aria-label="Sélection de la séance de coaching">
          ${parcoursData.map((s, idx) => {
            const prog = getSessionProgress(s);
            const isActive = idx === activeSessionIndex && viewMode === 'focus';
            return `
              <button
                type="button"
                class="parcours-step-pill ${isActive ? 'active' : ''} ${prog.isComplete ? 'completed' : ''}"
                data-session-index="${idx}"
                aria-current="${isActive ? 'step' : 'false'}"
              >
                <div class="parcours-step-top">
                  <span class="parcours-step-code">${escapeHtml(formatLabel(s.label))}</span>
                  <span class="parcours-step-counter ${prog.isComplete ? 'done' : ''}">
                    ${prog.isComplete ? '✓' : `${prog.done}/${prog.total}`}
                  </span>
                </div>
                <span class="parcours-step-short">${escapeHtml(s.typeBadge)}</span>
              </button>
            `;
          }).join('')}
        </nav>

        <!-- Main Content Area : Either Single Session Focus or 6-Session Overview Grid -->
        ${viewMode === 'focus' ? renderFocusView(currentSession, activeSessionIndex, currentProg) : renderGridView()}
      </div>
    `;

    bindEvents();
  }

  function renderFocusView(session, idx, prog) {
    const prevSession = idx > 0 ? parcoursData[idx - 1] : null;
    const nextSession = idx < parcoursData.length - 1 ? parcoursData[idx + 1] : null;

    return `
      <article class="parcours-focus-card" id="parcoursFocusCard">
        <!-- Session Header -->
        <header class="parcours-session-header">
          <div class="parcours-session-meta-row">
            <div class="parcours-session-badges">
              <span class="parcours-badge-number">${escapeHtml(formatLabel(session.label))}</span>
              <span class="parcours-badge-modules">${escapeHtml(session.modulesCovered)}</span>
            </div>
            <div class="parcours-session-step-nav">
              <button type="button" class="parcours-nav-arrow" data-nav-dir="prev" ${!prevSession ? 'disabled' : ''} title="Séance précédente">
                ← Précédente
              </button>
              <button type="button" class="parcours-nav-arrow" data-nav-dir="next" ${!nextSession ? 'disabled' : ''} title="Séance suivante">
                Suivante →
              </button>
            </div>
          </div>

          <h2 class="parcours-session-title">${escapeHtml(session.title)}</h2>
          <p class="parcours-objective-text">${escapeHtml(session.objectives)}</p>
        </header>

        <!-- Two-Column Split : Left = Contenus en séance (6 points) | Right = Travail intersession interactif (5 points) -->
        <div class="parcours-focus-columns">
          <!-- Colonne Gauche : Contenus abordés pendant le coaching -->
          <section class="parcours-col-contents">
            <div class="parcours-col-header">
              <h3 class="parcours-col-title">En séance</h3>
            </div>

            <ol class="parcours-contents-list">
              ${session.contents.map((item, i) => `
                <li class="parcours-content-item">
                  <span class="parcours-content-num">0${i + 1}</span>
                  <span class="parcours-content-text">${escapeHtml(item)}</span>
                </li>
              `).join('')}
            </ol>
          </section>

          <!-- Colonne Droite : Devoirs & Travail Intersession (Interactive Checklist) -->
          <section class="parcours-col-homework">
            <div class="parcours-col-header">
              <h3 class="parcours-col-title">${escapeHtml(session.homeworkLabel || 'Travail intersession')}</h3>
              <div class="parcours-homework-header-right">
                <span class="parcours-count-pill ${prog.isComplete ? 'complete' : ''}">
                  ${prog.done}/${prog.total}
                </span>
                ${prog.done < prog.total ? `
                  <button type="button" class="parcours-check-all-btn" data-check-session="${session.id}">
                    Tout cocher
                  </button>
                ` : ''}
              </div>
            </div>

            <div class="parcours-homework-list">
              ${session.homework.map((hw) => {
                const isChecked = completedTasks.has(hw.id);
                return `
                  <label class="parcours-hw-item ${isChecked ? 'checked' : ''} ${hw.isKeyDeliverable ? 'key-deliverable' : ''}" for="hw-${hw.id}">
                    <input
                      type="checkbox"
                      id="hw-${hw.id}"
                      class="parcours-hw-checkbox"
                      data-hw-id="${hw.id}"
                      ${isChecked ? 'checked' : ''}
                    >
                    <span class="parcours-hw-custom-check" aria-hidden="true">${isChecked ? '✓' : ''}</span>
                    <div class="parcours-hw-body">
                      ${hw.isKeyDeliverable ? `<span class="parcours-hw-key-tag">Livrable clé</span>` : ''}
                      <span class="parcours-hw-text">${escapeHtml(hw.text)}</span>
                    </div>
                  </label>
                `;
              }).join('')}
            </div>

            ${prog.isComplete ? `
              <div class="parcours-homework-footer">
                <div class="parcours-session-done-banner">
                  <span>Séance validée.</span>
                  ${nextSession ? `<button type="button" class="parcours-next-cta" data-goto-index="${idx + 1}">Séance suivante →</button>` : ''}
                </div>
              </div>
            ` : ''}
          </section>
        </div>
      </article>
    `;
  }

  function renderGridView() {
    return `
      <div class="parcours-overview-grid">
        ${parcoursData.map((session, idx) => {
          const prog = getSessionProgress(session);
          return `
            <article class="parcours-grid-card ${prog.isComplete ? 'card-complete' : ''}">
              <div class="parcours-grid-card-header">
                <div class="parcours-grid-card-top">
                  <span class="parcours-grid-pill">${escapeHtml(formatLabel(session.label))}</span>
                  <span class="parcours-grid-type">${escapeHtml(session.modulesCovered)}</span>
                </div>
                <h3 class="parcours-grid-title">${escapeHtml(session.title)}</h3>
                <p class="parcours-grid-objective">${escapeHtml(session.objectives)}</p>
              </div>

              <div class="parcours-grid-card-body">
                <div class="parcours-grid-section">
                  <h4 class="parcours-grid-label">En séance</h4>
                  <ul class="parcours-grid-bullets">
                    ${session.contents.map(c => `
                      <li>
                        <span class="parcours-grid-dot"></span>
                        <span>${escapeHtml(c)}</span>
                      </li>
                    `).join('')}
                  </ul>
                </div>

                <div class="parcours-grid-section parcours-grid-homework-block">
                  <div class="parcours-grid-hw-head">
                    <h4 class="parcours-grid-label">${escapeHtml(session.homeworkLabel || 'Travail intersession')}</h4>
                    <span class="parcours-grid-hw-count">${prog.done}/${prog.total}</span>
                  </div>
                  <div class="parcours-grid-hw-list">
                    ${session.homework.map(hw => {
                      const isChecked = completedTasks.has(hw.id);
                      return `
                        <label class="parcours-grid-hw-item ${isChecked ? 'checked' : ''} ${hw.isKeyDeliverable ? 'is-key' : ''}">
                          <input
                            type="checkbox"
                            class="parcours-hw-checkbox"
                            data-hw-id="${hw.id}"
                            ${isChecked ? 'checked' : ''}
                          >
                          <span class="parcours-grid-check-box">${isChecked ? '✓' : ''}</span>
                          <span class="parcours-grid-hw-text">
                            ${hw.isKeyDeliverable ? `<span class="parcours-grid-key-inline">Livrable clé</span>` : ''}
                            ${escapeHtml(hw.text)}
                          </span>
                        </label>
                      `;
                    }).join('')}
                  </div>
                </div>
              </div>

              <div class="parcours-grid-card-footer">
                <button type="button" class="parcours-open-focus-btn" data-open-session="${idx}">
                  Voir la séance →
                </button>
              </div>
            </article>
          `;
        }).join('')}
      </div>
    `;
  }

  function bindEvents() {
    // 1. Mode Switch (Focus vs Grid)
    container.querySelectorAll('.parcours-mode-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const mode = btn.dataset.mode;
        if (mode && mode !== viewMode) {
          viewMode = mode;
          saveViewMode(viewMode);
          render();
        }
      });
    });

    // 2. Stepper Clicks
    container.querySelectorAll('.parcours-step-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        const idx = parseInt(pill.dataset.sessionIndex, 10);
        if (!isNaN(idx)) {
          activeSessionIndex = idx;
          saveActiveSessionIndex(activeSessionIndex);
          if (viewMode !== 'focus') {
            viewMode = 'focus';
            saveViewMode('focus');
          }
          render();
        }
      });
    });

    // 3. Prev / Next Arrows in Focus View
    container.querySelectorAll('.parcours-nav-arrow').forEach(btn => {
      btn.addEventListener('click', () => {
        const dir = btn.dataset.navDir;
        if (dir === 'prev' && activeSessionIndex > 0) {
          activeSessionIndex--;
          saveActiveSessionIndex(activeSessionIndex);
          render();
        } else if (dir === 'next' && activeSessionIndex < parcoursData.length - 1) {
          activeSessionIndex++;
          saveActiveSessionIndex(activeSessionIndex);
          render();
        }
      });
    });

    // 4. Goto Next Session CTA
    container.querySelectorAll('[data-goto-index]').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.gotoIndex, 10);
        if (!isNaN(idx) && idx >= 0 && idx < parcoursData.length) {
          activeSessionIndex = idx;
          saveActiveSessionIndex(activeSessionIndex);
          render();
        }
      });
    });

    // 5. Open specific session from Grid View
    container.querySelectorAll('[data-open-session]').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.openSession, 10);
        if (!isNaN(idx)) {
          activeSessionIndex = idx;
          saveActiveSessionIndex(activeSessionIndex);
          viewMode = 'focus';
          saveViewMode('focus');
          render();
          container.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });

    // 6. Homework Checkboxes
    container.querySelectorAll('.parcours-hw-checkbox').forEach(input => {
      input.addEventListener('change', (e) => {
        const hwId = e.target.dataset.hwId;
        if (!hwId) return;
        if (e.target.checked) {
          completedTasks.add(hwId);
          showToast('Devoir validé');
        } else {
          completedTasks.delete(hwId);
        }
        saveCompletedTasks();
        render();
      });
    });

    // 7. Check all tasks for a session
    container.querySelectorAll('[data-check-session]').forEach(btn => {
      btn.addEventListener('click', () => {
        const sId = btn.dataset.checkSession;
        const target = parcoursData.find(s => s.id === sId);
        if (target && target.homework) {
          target.homework.forEach(h => completedTasks.add(h.id));
          saveCompletedTasks();
          showToast(`${formatLabel(target.label)} complétée`);
          render();
        }
      });
    });

    // 8. Reset all homework progress
    const resetAllBtn = container.querySelector('#parcoursResetAllBtn');
    if (resetAllBtn) {
      resetAllBtn.addEventListener('click', () => {
        completedTasks.clear();
        saveCompletedTasks();
        showToast('Suivi des devoirs réinitialisé');
        render();
      });
    }
  }

  render();
}
