import './info-pages.css';

document.title = 'Hproweb | Conditions Générales de Vente';

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
        <a href="/mentions-legales.html">Mentions légales</a>
        <a href="/qui-sommes-nous.html">Qui sommes-nous</a>
        <a href="/contact.html">Nous contacter</a>
      </nav>
    </header>

    <section class="info-hero">
      <p>Cadre contractuel</p>
      <h1>Conditions Générales de Vente (CGV)</h1>
      <span>Mise à jour : 17 avril 2026</span>
    </section>

    <section class="info-content">
      <article class="info-card">
        <h2>1. Identification du vendeur</h2>
        <p><strong>Nom commercial :</strong> Hproweb</p>
        <p><strong>Entrepreneur :</strong> AY (micro-entreprise)</p>
        <p><strong>SIRET :</strong> 91939380100015</p>
        <p><strong>Adresse :</strong> 176 avenue de la Californie</p>
        <p><strong>Email :</strong> contact@hproweb.fr</p>
      </article>

      <article class="info-card">
        <h2>2. Objet</h2>
        <p>
          Les présentes CGV définissent les conditions dans lesquelles Hproweb propose des prestations de conception,
          développement, mise en ligne et accompagnement de sites internet.
        </p>
      </article>

      <article class="info-card">
        <h2>3. Prestations</h2>
        <p>
          Les prestations sont décrites sur le site et/ou dans le devis transmis au client. Le contenu précis, le
          périmètre technique, les options, les délais et le prix final sont confirmés dans le devis accepté.
        </p>
      </article>

      <article class="info-card">
        <h2>4. Commande et formation du contrat</h2>
        <p>
          La commande est considérée comme ferme à réception de l'acceptation écrite du devis (email ou signature)
          et, le cas échéant, du règlement d'acompte prévu au devis.
        </p>
      </article>

      <article class="info-card">
        <h2>5. Prix et modalités de paiement</h2>
        <p>
          Les prix sont indiqués en euros. Sauf mention contraire, les modalités de paiement (acompte, échéances,
          solde) sont celles précisées sur le devis validé par le client.
        </p>
        <p>
          En cas de retard de paiement, Hproweb peut suspendre l'exécution de la prestation après relance restée sans
          effet.
        </p>
      </article>

      <article class="info-card">
        <h2>6. Délais de réalisation</h2>
        <p>
          Les délais sont communiqués à titre estimatif et peuvent évoluer selon la complexité du projet, les demandes
          de modification et la réactivité du client pour valider les étapes.
        </p>
      </article>

      <article class="info-card">
        <h2>7. Droit de rétractation (clients consommateurs)</h2>
        <p>
          Conformément aux articles L221-18 et suivants du Code de la consommation, le client consommateur dispose d'un
          délai de 14 jours pour exercer son droit de rétractation pour les contrats conclus à distance.
        </p>
        <p>
          Si le client demande expressément l'exécution de la prestation avant la fin du délai de rétractation, il peut
          être tenu de payer la part de service déjà exécutée en cas de rétractation, selon les dispositions légales.
        </p>
      </article>

      <article class="info-card">
        <h2>8. Obligations du client</h2>
        <p>
          Le client s'engage à fournir des informations exactes, les contenus nécessaires (textes, images, accès)
          et à respecter les délais de validation pour permettre l'avancement du projet.
        </p>
      </article>

      <article class="info-card">
        <h2>9. Propriété intellectuelle</h2>
        <p>
          Sauf clause contraire au devis, les droits d'utilisation du site livré sont cédés au client après paiement
          intégral des sommes dues. Les outils, composants, méthodes et savoir-faire propres à Hproweb restent sa
          propriété.
        </p>
      </article>

      <article class="info-card">
        <h2>10. Responsabilité</h2>
        <p>
          Hproweb met en oeuvre les moyens professionnels adaptés à la réalisation des prestations. La responsabilité
          est limitée aux dommages directs, à l'exclusion des dommages indirects (perte d'exploitation, perte de chiffre
          d'affaires, perte d'opportunité, etc.).
        </p>
      </article>

      <article class="info-card">
        <h2>11. Réclamations et médiation</h2>
        <p>
          En cas de litige, le client est invité à adresser une réclamation écrite à <strong>contact@hproweb.fr</strong>
          afin de rechercher une solution amiable.
        </p>
        <p>
          Pour les clients consommateurs, un dispositif de médiation de la consommation est applicable conformément aux
          articles L612-1 et suivants du Code de la consommation. Les coordonnées du médiateur compétent seront
          communiquées sur demande tant que la désignation formelle est en cours.
        </p>
      </article>

      <article class="info-card">
        <h2>12. Droit applicable et juridiction</h2>
        <p>
          Les présentes CGV sont soumises au droit français. À défaut d'accord amiable, le litige est porté devant la
          juridiction compétente selon les règles légales en vigueur.
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

