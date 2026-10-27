// AuthBubble Component (Standard 2026 - Quiet Header Auth Control)

export function renderAuthBubble(container, { user = null, isAuthActive = false, onLoginClick, onLogoutClick } = {}) {
  if (!container) return;

  function escapeHtml(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  const email = user?.email || '';
  const shortName = email ? email.split('@')[0] : '';

  if (!user) {
    container.innerHTML = `
      <button
        type="button"
        class="header-auth-btn ${isAuthActive ? 'is-active' : ''}"
        id="headerAuthBtn"
        aria-current="${isAuthActive ? 'page' : 'false'}"
      >
        Se connecter
      </button>
    `;

    const btn = container.querySelector('#headerAuthBtn');
    if (btn && onLoginClick) {
      btn.addEventListener('click', () => onLoginClick());
    }
  } else {
    container.innerHTML = `
      <div class="header-user-group">
        <button
          type="button"
          class="header-user-pill ${isAuthActive ? 'is-active' : ''}"
          id="headerUserPillBtn"
          title="Connecté : ${escapeHtml(email)}"
        >
          <span class="header-user-dot" aria-hidden="true"></span>
          <span class="header-user-name">${escapeHtml(shortName)}</span>
        </button>
        <button
          type="button"
          class="header-logout-btn"
          id="headerLogoutBtn"
          title="Se déconnecter"
        >
          Déconnexion
        </button>
      </div>
    `;

    const pillBtn = container.querySelector('#headerUserPillBtn');
    if (pillBtn && onLoginClick) {
      pillBtn.addEventListener('click', () => onLoginClick());
    }

    const logoutBtn = container.querySelector('#headerLogoutBtn');
    if (logoutBtn && onLogoutClick) {
      logoutBtn.addEventListener('click', () => onLogoutClick());
    }
  }
}
