// ParcoursView Component (Standard 2026 - Suivi des Devoirs Persisté via Supabase RLS)
import { showToast } from './Toast.js?v=20261027-quieter-v4';
import {
  fetchUserParcoursState,
  setHomeworkTaskStatus,
  completeAllSessionTasks,
  resetAllUserHomework,
  updateUserParcoursPrefs
} from '../js/supabaseClient.js?v=20261027-quieter-v4';

export async function initParcoursView(container, parcoursData = [], { initialSessionId = null, user = null, onLoginRequest = null } = {}) {
  // Nettoyage des anciennes clés localStorage obsolètes (source de vérité unique : Supabase)
  try {
    localStorage.removeItem('vibecoding_parcours_homework_v1');
    localStorage.removeItem('vibecoding_parcours_active_session_v1');
    localStorage.removeItem('vibecoding_parcours_view_mode_v1');
  } catch (e) {}

  if (!user) {
    const lockSvg = `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--color-brand-purple)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>`;
    container.innerHTML = `
      <div class="parcours-locked-card">
        <div class="parcours-locked-icon" aria-hidden="true">${lockSvg}</div>
        <h2 class="parcours-locked-title">Parcours Coaching réservé aux apprenants connectés</h2>
        <p class="parcours-locked-desc">
          Connectez-vous avec votre adresse email autorisée pour accéder au suivi de vos 6 séances et sauvegarder l’avancement de vos devoirs intersession.
        </p>
        <button type="button" class="parcours-locked-cta" id="parcoursLockedLoginBtn">
          Se connecter à mon espace →
        </button>
      </div>
    `;
    const btn = container.querySelector('#parcoursLockedLoginBtn');
    if (btn && onLoginRequest) {
      btn.addEventListener('click', () => onLoginRequest());
    }
    return;
  }

  let completedTasks = new Set();
  let activeSessionIndex = 0;
  let viewMode = 'focus'; // 'focus' | 'grid'
  let isSyncing = false;

  // État de chargement initial depuis Supabase
  container.innerHTML = `
    <div class="parcours-wrapper">
      <div class="parcours-loading-card" role="status" aria-live="polite">
        <span class="parcours-loading-spinner" aria-hidden="true"></span>
        <span>Synchronisation de votre Parcours Coaching...</span>
      </div>
    </div>
  `;

  try {
    const remoteState = await fetchUserParcoursState(user.id);
    completedTasks = remoteState.completedTasks;
    if (remoteState.activeSessionIndex >= 0 && remoteState.activeSessionIndex < parcoursData.length) {
      activeSessionIndex = remoteState.activeSessionIndex;
    }
    viewMode = remoteState.viewMode;
  } catch (err) {
    console.error('[ParcoursView] Erreur chargement Supabase:', err);
    showToast('Erreur de chargement de vos devoirs');
  }

  if (initialSessionId) {
    const foundIdx = parcoursData.findIndex(s => s.id === initialSessionId);
    if (foundIdx !== -1) {
      activeSessionIndex = foundIdx;
      viewMode = 'focus';
      updateUserParcoursPrefs(user.id, user.email, {
        active_session_index: activeSessionIndex,
        parcours_view_mode: viewMode
      });
    }
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

  function findSessionIdForHomework(hwId) {
    for (const s of parcoursData) {
      if ((s.homework || []).some(h => h.id === hwId)) {
        return s.id;
      }
    }
    return 'seance-0';
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
              <div class="parcours-progress-title-group">
                <span class="parcours-progress-label">Suivi des devoirs</span>
                ${isSyncing ? `<span class="parcours-cloud-badge">Sauvegarde...</span>` : ''}
              </div>
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

        <!-- Suivi des devoirs (Interface sans contenu de séance coach) -->
        <section class="parcours-focus-homework">
          <div class="parcours-col-header">
            <div>
              <h3 class="parcours-col-title">${escapeHtml(session.homeworkLabel || 'Travail intersession')}</h3>
              <p class="parcours-homework-desc">Cochez vos étapes terminées avant votre prochain rendez-vous de coaching.</p>
            </div>
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
                <span>✓ Séance validée !</span>
                ${nextSession ? `<button type="button" class="parcours-next-cta" data-goto-index="${idx + 1}">Séance suivante →</button>` : ''}
              </div>
            </div>
          ` : ''}
        </section>
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
          updateUserParcoursPrefs(user.id, user.email, { parcours_view_mode: viewMode });
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
          if (viewMode !== 'focus') {
            viewMode = 'focus';
          }
          updateUserParcoursPrefs(user.id, user.email, {
            active_session_index: activeSessionIndex,
            parcours_view_mode: viewMode
          });
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
          updateUserParcoursPrefs(user.id, user.email, { active_session_index: activeSessionIndex });
          render();
        } else if (dir === 'next' && activeSessionIndex < parcoursData.length - 1) {
          activeSessionIndex++;
          updateUserParcoursPrefs(user.id, user.email, { active_session_index: activeSessionIndex });
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
          updateUserParcoursPrefs(user.id, user.email, { active_session_index: activeSessionIndex });
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
          viewMode = 'focus';
          updateUserParcoursPrefs(user.id, user.email, {
            active_session_index: activeSessionIndex,
            parcours_view_mode: 'focus'
          });
          render();
          container.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });

    // 6. Homework Checkboxes (Persistance Supabase RLS)
    container.querySelectorAll('.parcours-hw-checkbox').forEach(input => {
      input.addEventListener('change', async (e) => {
        const hwId = e.target.dataset.hwId;
        if (!hwId) return;

        const isChecked = e.target.checked;
        const sessionId = findSessionIdForHomework(hwId);

        if (isChecked) {
          completedTasks.add(hwId);
          showToast('Devoir sauvegardé ✓');
        } else {
          completedTasks.delete(hwId);
        }

        isSyncing = true;
        render();

        try {
          await setHomeworkTaskStatus(user.id, sessionId, hwId, isChecked);
        } catch (err) {
          console.error('[ParcoursView] Erreur sauvegarde devoir:', err);
          if (isChecked) completedTasks.delete(hwId);
          else completedTasks.add(hwId);
          showToast('Erreur de synchronisation Supabase');
        } finally {
          isSyncing = false;
          render();
        }
      });
    });

    // 7. Check all tasks for a session (Persistance Supabase RLS)
    container.querySelectorAll('[data-check-session]').forEach(btn => {
      btn.addEventListener('click', async () => {
        const sId = btn.dataset.checkSession;
        const target = parcoursData.find(s => s.id === sId);
        if (target && target.homework) {
          const hwIds = target.homework.map(h => h.id);
          hwIds.forEach(id => completedTasks.add(id));
          isSyncing = true;
          render();

          try {
            await completeAllSessionTasks(user.id, sId, hwIds);
            showToast(`${formatLabel(target.label)} complétée ✓`);
          } catch (err) {
            console.error('[ParcoursView] Erreur validation séance:', err);
            showToast('Erreur lors de la sauvegarde');
          } finally {
            isSyncing = false;
            render();
          }
        }
      });
    });

    // 8. Reset all homework progress (Persistance Supabase RLS)
    const resetAllBtn = container.querySelector('#parcoursResetAllBtn');
    if (resetAllBtn) {
      resetAllBtn.addEventListener('click', async () => {
        const backup = new Set(completedTasks);
        completedTasks.clear();
        isSyncing = true;
        render();

        try {
          await resetAllUserHomework(user.id);
          showToast('Suivi des devoirs réinitialisé');
        } catch (err) {
          console.error('[ParcoursView] Erreur réinitialisation:', err);
          completedTasks = backup;
          showToast('Erreur lors de la réinitialisation');
        } finally {
          isSyncing = false;
          render();
        }
      });
    }
  }

  render();
}
