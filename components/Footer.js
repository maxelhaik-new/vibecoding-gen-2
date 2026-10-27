// Footer Component (Standard 2026 - Wemodo Official Brand Integration)

export function renderFooter(container, { onNavigate, onStartTour } = {}) {
  container.innerHTML = `
    <footer class="app-footer">
      <div class="footer-inner">
        <!-- Brand & Mission Column -->
        <div class="footer-brand-col">
          <a href="https://wemodo.com" target="_blank" rel="noopener noreferrer" class="footer-logo-link" aria-label="Visiter le site officiel Wemodo">
            <img src="assets/wemodo/wemodo_footer_brand.svg" alt="Wemodo" class="footer-brand-logo" width="160" height="31">
          </a>
          <p class="footer-mission-text">
            Chaque parcours porte un futur. Plateforme officielle de ressources d'apprentissage pour la formation <strong>Vibe Coding</strong>.
          </p>
          <div class="footer-social-links">
            <a href="https://www.linkedin.com/school/webmyday-io/" target="_blank" rel="noopener noreferrer" class="footer-social-btn" aria-label="LinkedIn Wemodo">
              <img src="assets/wemodo/wemodo_social_linkedin.svg" alt="" width="18" height="18" aria-hidden="true">
            </a>
            <a href="https://www.instagram.com/wemodo_/" target="_blank" rel="noopener noreferrer" class="footer-social-btn" aria-label="Instagram Wemodo">
              <img src="assets/wemodo/wemodo_social_instagram.svg" alt="" width="18" height="18" aria-hidden="true">
            </a>
            <a href="https://www.tiktok.com/@wemodo_" target="_blank" rel="noopener noreferrer" class="footer-social-btn" aria-label="TikTok Wemodo">
              <img src="assets/wemodo/wemodo_social_tiktok.svg" alt="" width="18" height="18" aria-hidden="true">
            </a>
            <a href="https://www.facebook.com/WebMyDay.io" target="_blank" rel="noopener noreferrer" class="footer-social-btn" aria-label="Facebook Wemodo">
              <img src="assets/wemodo/wemodo_social_facebook.svg" alt="" width="18" height="18" aria-hidden="true">
            </a>
          </div>
        </div>

        <!-- Links Column -->
        <div class="footer-links-col">
          <h4 class="footer-heading">Ressources & Navigation</h4>
          <ul class="footer-links-list">
            <li><a href="?tab=welcome" class="footer-nav-link" data-footer-tab="welcome">Accueil</a></li>
            <li><a href="?tab=parcours" class="footer-nav-link" data-footer-tab="parcours">Parcours Coaching (6 séances)</a></li>
            <li><a href="?tab=glossary" class="footer-nav-link" data-footer-tab="glossary">Glossaire Vibe Coding (57)</a></li>
            <li><a href="?tab=prompts" class="footer-nav-link" data-footer-tab="prompts">Bibliothèque de Prompts (13)</a></li>
            <li><a href="?tab=quizz" class="footer-nav-link" data-footer-tab="quizz">Entraînement Quizz (50Q)</a></li>
            <li><a href="?tab=tools" class="footer-nav-link" data-footer-tab="tools">Boîte à Outils (7)</a></li>
            <li class="footer-tour-item">
              <button type="button" class="footer-tour-btn" id="footerBtnTour" aria-label="Lancer la visite guidée de la plateforme">
                <span class="footer-tour-icon" aria-hidden="true">🧭</span>
                <span>Visite guidée</span>
              </button>
            </li>
          </ul>
        </div>

        <!-- Certification & Qualiopi Column -->
        <div class="footer-cert-col">
          <div class="footer-qualiopi-card">
            <img src="assets/wemodo/wemodo_qualiopi.png" alt="Certification Qualiopi" class="footer-qualiopi-img" width="140" height="70" loading="lazy">
            <p class="footer-qualiopi-caption">
              La certification qualité a été délivrée au titre de la catégorie d’action suivante : <strong>ACTIONS DE FORMATION</strong>
            </p>
            <a href="https://wemodo.com/formations/data-ia/formation-vibe-coding" target="_blank" rel="noopener noreferrer" class="footer-cert-link">
              Découvrir la formation Wemodo →
            </a>
          </div>
        </div>
      </div>

      <!-- Footer Bottom Banner -->
      <div class="footer-bottom-banner">
        <div class="footer-bottom-meta">
          <span>© 2026 Wemodo • Plateforme Formation Vibe Coding</span>
        </div>
      </div>
    </footer>
  `;

  if (onNavigate) {
    const navLinks = container.querySelectorAll('[data-footer-tab]');
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const tab = link.getAttribute('data-footer-tab');
        if (tab) onNavigate(tab);
      });
    });
  }

  const tourBtn = container.querySelector('#footerBtnTour');
  if (tourBtn && onStartTour) {
    tourBtn.addEventListener('click', (e) => {
      e.preventDefault();
      onStartTour();
    });
  }
}
