import './style.css';

document.title = 'Hproweb | Création de sites internet professionnels';

const app = mustElement<HTMLDivElement>('#app');
app.innerHTML = `
  <main class="pro-shell" id="accueil">
    <header class="pro-header reveal">
      <div class="brand">
        <p>Hproweb</p>
        <span>Création de sites internet</span>
      </div>
      <nav>
        <a href="#apropos">À propos</a>
        <a href="#offres">Offres</a>
        <a href="#process">Méthode</a>
        <a href="#contact">Contact</a>
        <a href="/page-test.html">Page test</a>
      </nav>
      <div class="header-actions">
        <a class="btn ghost" href="#contact">Demander un devis</a>
        <a class="btn solid" href="tel:+33666734713">Être rappelé</a>
      </div>
    </header>

    <section class="hero reveal" id="apropos">
      <article>
        <p class="kicker">Prestataire web pour PME et indépendants</p>
        <h1>Des sites internet qui convertissent vos visiteurs en clients.</h1>
        <ul>
          <li>Message clair et design professionnel</li>
          <li>Site rapide, responsive et simple à gérer</li>
          <li>Mise en ligne accompagnée de A à Z</li>
        </ul>
        <div class="hero-actions">
          <a class="btn solid" href="#offres">Découvrir nos offres</a>
          <a class="btn ghost" href="/page-test.html">Voir une page test</a>
        </div>
      </article>
    </section>

    <section class="stats reveal" aria-label="Indicateurs de service">
      <article><strong>100%</strong><span>Sites adaptés mobile et PC</span></article>
      <article><strong>72h</strong><span>Pour une première maquette</span></article>
      <article><strong>1</strong><span>Interlocuteur dédié par projet</span></article>
      <article><strong>24/7</strong><span>Votre site en ligne en continu</span></article>
    </section>

    <section class="offres reveal" id="offres">
      <div class="head">
        <p>Offres</p>
        <h2>Des packs simples selon votre niveau de besoin.</h2>
      </div>
      <div class="grid">
        <article>
          <h3>Starter</h3>
          <p>Page vitrine claire pour lancer votre présence en ligne rapidement.</p>
          <ul>
            <li>1 page optimisée conversion</li>
            <li>Design professionnel sur-mesure</li>
            <li>Formulaire de contact</li>
          </ul>
        </article>
        <article>
          <h3>Business</h3>
          <p>Site complet pour présenter vos services et générer des demandes.</p>
          <ul>
            <li>Jusqu'à 5 pages</li>
            <li>Sections FAQ + avis + preuves</li>
            <li>Optimisation SEO locale</li>
          </ul>
        </article>
        <article>
          <h3>Premium</h3>
          <p>Solution avancée pour accélérer votre acquisition de clients.</p>
          <ul>
            <li>Parcours client avancé</li>
            <li>Tracking des leads</li>
            <li>Maintenance et évolutions</li>
          </ul>
        </article>
      </div>
    </section>

    <section class="process reveal" id="process">
      <div class="head">
        <p>Méthode</p>
        <h2>Un process simple, rapide et transparent.</h2>
      </div>
      <ol>
        <li><strong>Brief</strong><span>Objectifs, cible et positionnement.</span></li>
        <li><strong>Maquette</strong><span>Structure et design validés ensemble.</span></li>
        <li><strong>Production</strong><span>Développement, responsive, optimisations.</span></li>
        <li><strong>Mise en ligne</strong><span>Livraison finale et accompagnement.</span></li>
      </ol>
    </section>

    <section class="demo reveal">
      <div>
        <p>Exemple concret</p>
        <h2>Consultez une page test client déjà réalisée.</h2>
        <a class="btn solid" href="/page-test.html">Ouvrir la page test</a>
      </div>
    </section>

    <section class="contact reveal" id="contact">
      <div>
        <p>Prêt à passer pro ?</p>
        <h2>Parlons de votre futur site.</h2>
      </div>
      <div class="contact-actions">
        <a class="btn solid" href="tel:+33666734713">06 66 73 47 13</a>
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

