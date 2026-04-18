import './info-pages.css';

document.title = 'Hproweb | Mentions légales';

const app = mustElement<HTMLDivElement>('#app');
app.innerHTML = `
  <main class="info-shell">
    <header class="info-header">
      <a class="brand-link" href="/index.html">
        <img class="brand-logo" src="/hplogo.png" alt="HP logo" />
        <span>Création de sites internet</span>
      </a>
      <nav>
        <a href="/index.html#offres">Offres</a>
        <a href="/qui-sommes-nous.html">Qui sommes-nous</a>
        <a href="/cgv.html">CGV</a>
        <a href="/contact.html">Nous contacter</a>
      </nav>
    </header>

    <section class="info-hero">
      <p>Informations légales</p>
      <h1>Mentions légales du site Hproweb</h1>
      <span>Mise à jour : 17 avril 2026</span>
    </section>

    <section class="info-content">
      <article class="info-card">
        <h2>Éditeur du site</h2>
        <p><strong>Nom commercial :</strong> Hproweb</p>
        <p><strong>Entrepreneur :</strong> AY</p>
        <p><strong>Statut :</strong> Entrepreneur individuel (micro-entreprise)</p>
        <p><strong>SIRET :</strong> 91939380100015</p>
        <p><strong>Adresse :</strong> 176 avenue de la Californie</p>
        <p><strong>Email :</strong> contact@hproweb.fr</p>
      </article>

      <article class="info-card">
        <h2>Directeur de la publication</h2>
        <p>Le directeur de la publication du site est AY.</p>
      </article>

      <article class="info-card">
        <h2>Hébergement</h2>
        <p><strong>Hébergeur déclaré :</strong> Hproweb</p>
        <p>Pour toute demande liée à l'hébergement, contactez : contact@hproweb.fr.</p>
      </article>

      <article class="info-card">
        <h2>Propriété intellectuelle</h2>
        <p>
          L'ensemble des contenus présents sur ce site (textes, visuels, identité graphique, éléments techniques)
          est protégé par le droit d'auteur et le droit de la propriété intellectuelle.
        </p>
        <p>
          Toute reproduction, représentation, adaptation ou exploitation, totale ou partielle, sans autorisation
          écrite préalable, est interdite.
        </p>
      </article>

      <article class="info-card">
        <h2>Données personnelles</h2>
        <p>
          Les données collectées via les formulaires (contact, devis, rappel) sont utilisées uniquement pour traiter
          votre demande commerciale et assurer le suivi de la relation client.
        </p>
        <p>
          Vous pouvez demander l'accès, la rectification ou la suppression de vos données en écrivant à
          <strong>contact@hproweb.fr</strong>.
        </p>
      </article>

      <article class="info-card">
        <h2>Références légales</h2>
        <p>
          Ce document est rédigé en cohérence avec les obligations applicables aux sites professionnels en France,
          notamment la loi n°2004-575 du 21 juin 2004 (LCEN).
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
