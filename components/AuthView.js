// AuthView Component (Standard 2026 - Open, Quiet & Standard Authentication Layout)
import {
  signInWithPassword,
  signUpWithPassword,
  signOutUser
} from '../js/supabaseClient.js?v=20261027-quieter-v4';
import { showToast } from './Toast.js?v=20261027-quieter-v4';

export function initAuthView(container, { user = null, onAuthSuccess, onNavigate } = {}) {
  let mode = 'login'; // 'login' | 'signup'
  let isSubmitting = false;
  let errorMessage = '';
  let emailValue = '';

  function escapeHtml(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function render() {
    if (user) {
      renderConnectedState();
      return;
    }

    container.innerHTML = `
      <div class="auth-page-layout">
        <div class="auth-surface">
          <!-- Segmented Switch Standard (1 ligne, équilibré) -->
          <div class="auth-segmented" role="tablist" aria-label="Mode d'accès">
            <button
              type="button"
              role="tab"
              aria-selected="${mode === 'login'}"
              class="auth-segment-btn ${mode === 'login' ? 'active' : ''}"
              data-mode="login"
            >
              Se connecter
            </button>
            <button
              type="button"
              role="tab"
              aria-selected="${mode === 'signup'}"
              class="auth-segment-btn ${mode === 'signup' ? 'active' : ''}"
              data-mode="signup"
            >
              Créer un compte
            </button>
          </div>

          <!-- Titre et sous-titre sobres directement sur la surface claire -->
          <div class="auth-intro">
            <h2 class="auth-heading">
              ${mode === 'login' ? 'Accéder à votre espace' : 'Activer votre compte apprenant'}
            </h2>
            <p class="auth-lead">
              ${mode === 'login'
                ? 'Saisissez vos identifiants pour retrouver votre Parcours Coaching.'
                : 'Utilisez votre adresse email autorisée pour définir votre mot de passe.'}
            </p>
          </div>

          ${errorMessage ? `
            <div class="auth-error-banner" role="alert">
              <span>${escapeHtml(errorMessage)}</span>
            </div>
          ` : ''}

          <!-- Formulaire standard épuré -->
          <form class="auth-form-clean" id="authViewForm" novalidate>
            <div class="auth-field-row">
              <label class="auth-field-label" for="authEmailInput">Adresse email</label>
              <input
                type="email"
                id="authEmailInput"
                class="auth-field-input"
                placeholder="prenom.nom@wemodo.com"
                value="${escapeHtml(emailValue)}"
                required
                autocomplete="email"
                ${isSubmitting ? 'disabled' : ''}
              >
            </div>

            <div class="auth-field-row">
              <label class="auth-field-label" for="authPasswordInput">
                ${mode === 'signup' ? 'Mot de passe (6 caractères min.)' : 'Mot de passe'}
              </label>
              <input
                type="password"
                id="authPasswordInput"
                class="auth-field-input"
                placeholder="••••••••"
                required
                minlength="6"
                autocomplete="${mode === 'signup' ? 'new-password' : 'current-password'}"
                ${isSubmitting ? 'disabled' : ''}
              >
            </div>

            <button type="submit" class="auth-primary-btn" ${isSubmitting ? 'disabled' : ''}>
              ${isSubmitting
                ? 'Vérification...'
                : mode === 'signup'
                  ? 'Créer mon compte'
                  : 'Se connecter'}
            </button>
          </form>

          <p class="auth-footnote">
            Accès réservé aux apprenants (<code>*@wemodo.com</code>, <code>*@webmyday.io</code> et emails inscrits).
          </p>
        </div>
      </div>
    `;

    bindEvents();
  }

  function renderConnectedState() {
    container.innerHTML = `
      <div class="auth-page-layout">
        <div class="auth-surface">
          <div class="auth-intro">
            <span class="auth-status-tag">Session active</span>
            <h2 class="auth-heading">Vous êtes connecté</h2>
            <p class="auth-lead">
              Compte actif : <strong>${escapeHtml(user.email)}</strong>
            </p>
          </div>

          <div class="auth-connected-stack">
            <button type="button" class="auth-primary-btn" id="authGotoParcoursBtn">
              Ouvrir mon Parcours Coaching →
            </button>
            <button type="button" class="auth-secondary-outline-btn" id="authDisconnectBtn">
              Se déconnecter
            </button>
          </div>
        </div>
      </div>
    `;

    const gotoBtn = container.querySelector('#authGotoParcoursBtn');
    if (gotoBtn && onNavigate) {
      gotoBtn.addEventListener('click', () => onNavigate('parcours'));
    }

    const logoutBtn = container.querySelector('#authDisconnectBtn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', async () => {
        try {
          await signOutUser();
          showToast('Vous êtes déconnecté');
          user = null;
          render();
        } catch (err) {
          console.error('[AuthView] Erreur déconnexion:', err);
        }
      });
    }
  }

  function bindEvents() {
    container.querySelectorAll('[data-mode]').forEach(btn => {
      btn.addEventListener('click', () => {
        const nextMode = btn.dataset.mode;
        if (nextMode && nextMode !== mode) {
          mode = nextMode;
          errorMessage = '';
          render();
        }
      });
    });

    const form = container.querySelector('#authViewForm');
    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const emailInput = container.querySelector('#authEmailInput');
        const passwordInput = container.querySelector('#authPasswordInput');
        const email = (emailInput?.value || '').trim();
        const password = passwordInput?.value || '';
        emailValue = email;

        if (!email || !email.includes('@')) {
          errorMessage = 'Veuillez saisir une adresse email valide.';
          render();
          return;
        }

        if (!password || password.length < 6) {
          errorMessage = 'Le mot de passe doit comporter au moins 6 caractères.';
          render();
          return;
        }

        isSubmitting = true;
        errorMessage = '';
        render();

        try {
          if (mode === 'signup') {
            const res = await signUpWithPassword(email, password);
            const authedUser = res?.session?.user || res?.user;
            if (authedUser) {
              showToast('Compte activé et connecté ✓');
              if (onAuthSuccess) onAuthSuccess(authedUser);
              return;
            }
          } else {
            const res = await signInWithPassword(email, password);
            if (res?.session?.user) {
              showToast('Connexion réussie ✓');
              if (onAuthSuccess) onAuthSuccess(res.session.user);
              return;
            }
          }
        } catch (err) {
          errorMessage = err.message || 'Erreur lors de la connexion.';
        } finally {
          isSubmitting = false;
          render();
        }
      });
    }
  }

  render();
}
