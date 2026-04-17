import './style.css';

document.title = 'Hproweb | Création de sites internet professionnels';

const app = mustElement<HTMLDivElement>('#app');
app.innerHTML = `
  <main class="pro-shell" id="accueil">
    <header class="pro-header reveal">
      <div class="brand">
        <img class="brand-logo" src="/hplogo.png" alt="HP logo" />
        <span>Création de sites internet</span>
      </div>
      <nav>
        <a href="#apropos">Accueil</a>
        <a href="#offres">Offres</a>
        <a href="#process">Méthode</a>
      </nav>
      <div class="header-actions">
        <a class="btn solid" href="/contact.html">Être rappelé</a>
        <a class="btn solid" href="/demo-site.html">Démo site</a>
        <a class="btn ghost account-btn" href="/admin.html" aria-label="Connexion">
          <span aria-hidden="true">👤</span>
          <span>Connexion</span>
        </a>
      </div>
    </header>

    <section class="hero reveal" id="apropos">
      <article>
        <p class="kicker">Prestataire web</p>
        <h1>Des sites internet qui convertissent vos visiteurs en clients.</h1>
        <ul>
          <li>Message clair et design professionnel</li>
          <li>Site rapide, responsive et simple à gérer</li>
          <li>Mise en ligne accompagnée de A à Z</li>
        </ul>
        <div class="hero-actions">
          <a class="btn solid" href="#offres">Découvrir nos offres</a>
        </div>
      </article>
    </section>

    <section class="stats reveal" aria-label="Indicateurs de service">
      <article><strong>100%</strong><span>Sites adaptés mobile et PC</span></article>
      <article><strong>- de 24h</strong><span>Pour une première maquette</span></article>
      <article><strong>+ de 500</strong><span>Clients accompagnés</span></article>
      <article><strong>24/7</strong><span>Votre site en ligne en continu</span></article>
    </section>

    <section class="offres reveal" id="offres">
      <div class="head">
        <p>Offres</p>
        <h2>Trois niveaux, une qualité premium à chaque étape.</h2>
      </div>
      <div class="grid">
        <article class="offer-card">
          <p class="offer-tier">Starter</p>
          <h3>Site Essentiel</h3>
          <p class="offer-summary">Un site élégant, rapide et prêt à convertir vos visiteurs en clients.</p>
          <div class="offer-pricing">
            <p><span>Création</span><strong>150 EUR</strong></p>
            <p><span>Entretien</span><strong>30 EUR / 6 mois</strong></p>
          </div>
          <ul class="offer-list">
            <li>Site vitrine de qualité professionnelle</li>
            <li>Réservation client intégrée au site</li>
            <li>Mise en ligne rapide et accompagnée</li>
          </ul>
          <a class="offer-link" href="/devis.html?offer=essentiel">Choisir Essentiel</a>
        </article>
        <article class="offer-card offer-card-featured">
          <p class="offer-tier">Business</p>
          <h3>Site Pro Gestion</h3>
          <p class="offer-summary">Un site complet avec espace d’administration et paiement intégré.</p>
          <div class="offer-pricing">
            <p><span>Création</span><strong>300 EUR</strong></p>
            <p><span>Admin en plus</span><strong>+50 EUR / compte</strong></p>
            <p><span>Entretien</span><strong>60 EUR / 6 mois</strong></p>
          </div>
          <ul class="offer-list">
            <li>Onglet de connexion pour compte admin</li>
            <li>Paiement intégré sur le site</li>
            <li>1 compte admin inclus + extension à la demande</li>
          </ul>
          <a class="offer-link" href="/devis.html?offer=pro">Choisir Pro</a>
        </article>
        <article class="offer-card">
          <p class="offer-tier">Premium</p>
          <h3>Site Grand Format</h3>
          <p class="offer-summary">La solution la plus complète pour un vrai site de niveau professionnel.</p>
          <div class="offer-pricing">
            <p><span>Création</span><strong>700 EUR</strong></p>
            <p><span>Entretien</span><strong>120 EUR / 6 mois</strong></p>
          </div>
          <ul class="offer-list">
            <li>Comptes admin illimités</li>
            <li>Comptes clients illimités</li>
            <li>Paiement complet intégré + entretien inclus tous les 6 mois</li>
          </ul>
          <a class="offer-link" href="/devis.html?offer=grand-format">Choisir Grand format</a>
        </article>
      </div>
    </section>

    <section class="process reveal" id="process">
      <div class="head">
        <p>Méthode</p>
        <h2>Un processus simple, rapide et transparent.</h2>
      </div>
      <ol>
        <li><strong>Diagnostic projet</strong><span>Objectifs • cible • offre • priorités • positionnement.</span></li>
        <li><strong>Maquette</strong><span>Structure • design • parcours client • validations ensemble.</span></li>
        <li><strong>Production</strong><span>Développement sur mesure • version mobile/tablette/ordinateur • optimisations.</span></li>
        <li><strong>Mise en ligne</strong><span>Tests finaux • mise en production • accompagnement.</span></li>
      </ol>
    </section>

    <section class="demo reveal">
      <div>
        <h2>Accéder à votre site de démo</h2>
        <a class="btn solid" href="/demo-site.html">Accéder au site démo</a>
      </div>
    </section>

    <section class="contact reveal" id="contact">
      <div>
        <p>Parlons de votre futur site</p>
        <h2>Réservez votre démo dès maintenant !</h2>
      </div>
      <div class="contact-actions">
        <a class="btn solid" href="/contact.html">Remplir la fiche de contact</a>
        <a class="btn ghost" href="mailto:contact@hproweb.fr">contact@hproweb.fr</a>
      </div>
    </section>
  </main>
`;

setupRevealAnimation();
setupCenteredTabs();

function setupRevealAnimation(): void {
  const nodes = Array.from(document.querySelectorAll<HTMLElement>('.reveal'));
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
  );
  nodes.forEach((node) => observer.observe(node));
}

function setupCenteredTabs(): void {
  const tabLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>('.pro-header nav a[href^="#"]'));

  tabLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      const hash = link.getAttribute('href');
      if (!hash) {
        return;
      }
      const target = document.querySelector<HTMLElement>(hash);
      if (!target) {
        return;
      }

      event.preventDefault();
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      target.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
        block: 'center',
        inline: 'nearest'
      });
      window.history.replaceState({}, '', hash);
    });
  });
}

function mustElement<T extends Element>(selector: string): T {
  const node = document.querySelector<T>(selector);
  if (!node) {
    throw new Error(`Missing element: ${selector}`);
  }
  return node;
}
