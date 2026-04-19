import './info-pages.css';

document.title = 'Hproweb | Qui sommes-nous';

const app = mustElement<HTMLDivElement>('#app');
app.innerHTML = `
  <main class="info-shell">
    <header class="info-header">
      <a class="brand-link" href="/index.html">
        <img class="brand-logo" src="/hplogo.png?v=20260419m1" alt="HP logo" />
        <span>Création de sites internet</span>
      </a>
      <nav>
        <a href="/index.html#offres">Offres</a>
        <a href="/index.html#process">Méthode</a>
        <a href="/mentions-legales.html">Mentions légales</a>
        <a href="/contact.html">Nous contacter</a>
      </nav>
    </header>

    <section class="info-hero">
      <p>Notre vision</p>
      <h1>Qui sommes-nous ?</h1>
      <span>Une approche humaine, directe et orientée résultats.</span>
    </section>

    <section class="info-content">
      <article class="info-card">
        <h2>Hproweb, un projet porté par un passionné</h2>
        <p>
          Je suis AY, fondateur de Hproweb. Je suis passionné par le web, le design utile et les outils digitaux qui
          aident concrètement les entreprises à mieux se présenter et à convertir leurs visiteurs.
        </p>
        <p>
          Mon objectif est simple : livrer des sites clairs, rapides et professionnels, avec un accompagnement réel,
          sans jargon inutile.
        </p>
      </article>

      <article class="info-card">
        <h2>Notre manière de travailler</h2>
        <ul>
          <li><strong>Écoute :</strong> comprendre votre activité, vos priorités et vos objectifs.</li>
          <li><strong>Clarté :</strong> proposer une structure lisible et des offres transparentes.</li>
          <li><strong>Qualité :</strong> livrer un site propre, responsive et prêt à être exploité.</li>
          <li><strong>Suivi :</strong> rester disponible après mise en ligne pour faire évoluer le projet.</li>
        </ul>
      </article>

      <article class="info-card">
        <h2>Pour qui ?</h2>
        <p>
          Hproweb accompagne les indépendants, artisans, commerçants et petites structures qui veulent un site fiable,
          une image professionnelle et un interlocuteur unique.
        </p>
      </article>

      <article class="info-card">
        <h2>Nous contacter</h2>
        <p>
          Vous avez un projet ou une idée à lancer ?
          <a href="/contact.html"><strong>Demandez à être rappelé</strong></a>
          et nous construisons la meilleure version de votre site ensemble.
        </p>
      </article>
    </section>

    <footer class="info-footer" aria-label="Navigation légale">
      <p>Hproweb - AY</p>
      <nav>
        <a href="/mentions-legales.html">Mentions légales</a>
        <a href="/cgv.html">CGV</a>
        <a href="/qui-sommes-nous.html">Qui sommes-nous</a>
        <a href="/contact.html">Nous contacter / Être rappelé</a>
      </nav>
    </footer>
  </main>
`;

function mustElement<T extends Element>(selector: string): T {
  const node = document.querySelector<T>(selector);
  if (!node) {
    throw new Error(`Missing element: ${selector}`);
  }
  return node;
}

