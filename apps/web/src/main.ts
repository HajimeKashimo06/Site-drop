import './style.css';

document.title = 'Hproweb | Création de sites internet professionnels';

const app = mustElement<HTMLDivElement>('#app');
app.innerHTML = `
  <div class="ambient-hail" aria-hidden="true"></div>

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
      <div class="hero-track" id="hero-track">
        <article class="hero-slide is-active">
          <img
            src="/coiffure1/photoia.png"
            alt="Aperçu d’un site professionnel pour salon de coiffure"
            loading="eager"
            decoding="async"
          />
          <div class="hero-overlay">
            <p class="hero-kicker">Prestataire web</p>
            <h1>Des sites internet qui convertissent vos visiteurs en clients.</h1>
            <p class="hero-lead">
              Un accompagnement complet pour lancer un site professionnel, rapide et orienté résultats.
            </p>
            <ul class="hero-list">
              <li>Message clair et design professionnel</li>
              <li>Site rapide, responsive et simple à gérer</li>
              <li>Mise en ligne accompagnée de A à Z</li>
            </ul>
            <div class="hero-actions">
              <a class="btn solid" href="#offres">Découvrir nos offres</a>
            </div>
          </div>
        </article>

        <article class="hero-slide">
          <img
            src="/coiffure1/appel.png"
            alt="Visuel de prise de contact et accompagnement personnalisé"
            loading="eager"
            decoding="async"
          />
          <div class="hero-overlay">
            <p class="hero-kicker">Accompagnement humain</p>
            <h1>Un échange rapide pour cadrer votre projet sereinement.</h1>
            <p class="hero-lead">
              Vous gagnez du temps avec un interlocuteur dédié et des réponses concrètes dès le premier contact.
            </p>
            <div class="hero-actions">
              <a class="btn solid" href="/contact.html">Être rappelé</a>
            </div>
          </div>
        </article>
      </div>
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
      <aside class="market-claim" aria-label="Comparatif du marché">
        <p class="market-claim-kicker">Comparatif du marché</p>
        <h3>Le bon choix pour votre site web</h3>
        <div class="market-table-wrap">
          <table class="market-table">
            <thead>
              <tr>
                <th scope="col">Critère</th>
                <th scope="col">Abonnement (Wix / Shopify)</th>
                <th scope="col">Achat classique (Agence)</th>
                <th scope="col">Hproweb (Nous)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Paiement</th>
                <td>
                  <strong>10 à 500 EUR / mois</strong>
                  <span class="market-note no"><span class="market-mark no" aria-hidden="true">✖</span> Revient cher à l'année.</span>
                </td>
                <td>
                  <strong>1500 à plus de 10 000 EUR</strong>
                  <span class="market-note no"><span class="market-mark no" aria-hidden="true">✖</span> Paiement unique élevé.</span>
                </td>
                <td>
                  <strong>99,99 EUR</strong>
                  <span class="market-note yes"><span class="market-mark yes" aria-hidden="true">✔</span> Puis seulement 30 EUR tous les 6 mois.</span>
                </td>
              </tr>
              <tr>
                <th scope="row">Propriété du site</th>
                <td><span class="market-state no"><span class="market-mark no" aria-hidden="true">✖</span> Non</span></td>
                <td><span class="market-state yes"><span class="market-mark yes" aria-hidden="true">✔</span> Oui</span></td>
                <td><span class="market-state yes"><span class="market-mark yes" aria-hidden="true">✔</span> Oui</span></td>
              </tr>
              <tr>
                <th scope="row">Personnalisation</th>
                <td><span class="market-state no"><span class="market-mark no" aria-hidden="true">✖</span> Limitée</span></td>
                <td><span class="market-state yes"><span class="market-mark yes" aria-hidden="true">✔</span> Sur-mesure</span></td>
                <td><span class="market-state yes"><span class="market-mark yes" aria-hidden="true">✔</span> Sur-mesure</span></td>
              </tr>
              <tr>
                <th scope="row">Accompagnement</th>
                <td><span class="market-state no"><span class="market-mark no" aria-hidden="true">✖</span> Faible</span></td>
                <td><span class="market-state warn"><span class="market-mark warn" aria-hidden="true">!</span> Selon budget</span></td>
                <td><span class="market-state yes"><span class="market-mark yes" aria-hidden="true">✔</span> Humain + suivi</span></td>
              </tr>
              <tr>
                <th scope="row">Coût maîtrisé à l'année</th>
                <td><span class="market-state no"><span class="market-mark no" aria-hidden="true">✖</span> Non</span></td>
                <td><span class="market-state no"><span class="market-mark no" aria-hidden="true">✖</span> Non</span></td>
                <td><span class="market-state yes"><span class="market-mark yes" aria-hidden="true">✔</span> Oui</span></td>
              </tr>
            </tbody>
          </table>
        </div>
        <p class="market-claim-highlight">Prix clair, image pro, et un vrai suivi dans la durée.</p>
      </aside>
      <div class="grid">
        <article class="offer-card">
          <p class="offer-tier">Starter</p>
          <h3>Site Essentiel</h3>
          <p class="offer-summary">Un site élégant, rapide et prêt à convertir vos visiteurs en clients.</p>
          <div class="offer-pricing">
            <p><span>Création</span><strong><em class="offer-discount">-35%</em> 99,99 EUR</strong></p>
            <p><span>Entretien</span><strong>30 EUR tous les 6 mois</strong></p>
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
            <p><span>Création</span><strong><em class="offer-discount">-35%</em> 239,99 EUR</strong></p>
            <p><span>Admin en plus</span><strong>+20 EUR par compte</strong></p>
            <p><span>Entretien</span><strong>60 EUR tous les 6 mois</strong></p>
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
            <p><span>Création</span><strong><em class="offer-discount">-35%</em> 549.99 EUR</strong></p>
            <p><span>Entretien</span><strong>120 EUR tous les 6 mois</strong></p>
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

    <footer class="site-footer reveal" aria-label="Informations du site">
      <div class="site-footer-top">
        <p>Hproweb</p>
        <span>Création de sites internet professionnels - AY</span>
      </div>
      <nav class="site-footer-nav">
        <a href="/mentions-legales.html">Mentions légales</a>
        <a href="/cgv.html">Conditions Générales de Vente</a>
        <a href="/qui-sommes-nous.html">Qui sommes-nous</a>
        <a href="/contact.html">Nous contacter / Être rappelé</a>
      </nav>
    </footer>
  </main>
`;

setupAmbientHail();
setupStaggeredElements();
setupRevealAnimation();
setupCenteredTabs();
setupHeroSlider();
setupHeaderScrollState();
setupOfferCardTilt();
setupHeroPointerMotion();
setupStatsCounters();

const HERO_ROTATION_MS = 5_000;

function setupAmbientHail(): void {
  const layer = document.querySelector<HTMLElement>('.ambient-hail');
  if (!layer) {
    return;
  }

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  layer.innerHTML = '';
  if (prefersReducedMotion) {
    return;
  }

  const isMobile = window.matchMedia('(max-width: 680px)').matches;
  const count = isMobile ? 52 : 88;
  const bluePalette = ['#00beff', '#25b4ff', '#42c8ff', '#63d7ff'];
  const greenPalette = ['#3fd85a', '#57df4f', '#6fe861', '#49d979'];

  const randomBetween = (min: number, max: number): number => min + Math.random() * (max - min);

  for (let i = 0; i < count; i += 1) {
    const particle = document.createElement('span');
    particle.className = 'hail-particle';

    const startX = randomBetween(-8, 106);
    const sway = randomBetween(2, 17) * (Math.random() < 0.5 ? -1 : 1);
    const drift = randomBetween(4, 26) * (Math.random() < 0.5 ? -1 : 1);
    const x1 = startX + sway * 0.4;
    const x2 = startX - sway * 0.26;
    const x3 = startX + sway * 0.55;
    const x4 = startX + drift;

    const size = randomBetween(isMobile ? 2.2 : 2.1, isMobile ? 5.1 : 5.8);
    const duration = randomBetween(14, 24);
    const delay = -randomBetween(0, 22);
    const startY = randomBetween(-130, -8);
    const opacity = randomBetween(0.62, 0.9);
    const blur = randomBetween(0, 0.22);
    const useGreen = Math.random() < 0.46;
    const palette = useGreen ? greenPalette : bluePalette;
    const color = palette[Math.floor(Math.random() * palette.length)] ?? '#7ed1ff';

    particle.style.setProperty('--x0', `${startX.toFixed(2)}vw`);
    particle.style.setProperty('--x1', `${x1.toFixed(2)}vw`);
    particle.style.setProperty('--x2', `${x2.toFixed(2)}vw`);
    particle.style.setProperty('--x3', `${x3.toFixed(2)}vw`);
    particle.style.setProperty('--x4', `${x4.toFixed(2)}vw`);
    particle.style.setProperty('--y0', `${startY.toFixed(2)}vh`);
    particle.style.setProperty('--size', `${size.toFixed(2)}px`);
    particle.style.setProperty('--dur', `${duration.toFixed(2)}s`);
    particle.style.setProperty('--delay', `${delay.toFixed(2)}s`);
    particle.style.setProperty('--opacity', opacity.toFixed(3));
    particle.style.setProperty('--blur', `${blur.toFixed(2)}px`);
    particle.style.setProperty('--particle-color', color);

    if (Math.random() < 0.34) {
      particle.classList.add('is-bright');
    }

    layer.appendChild(particle);
  }
}

function setupRevealAnimation(): void {
  const nodes = Array.from(document.querySelectorAll<HTMLElement>('.reveal, .reveal-stagger'));
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

function setupStaggeredElements(): void {
  applyStagger('.stats article', 80);
  applyStagger('.offres .offer-card', 95);
  applyStagger('.process ol li', 90);
  applyStagger('.site-footer-nav a', 70);
}

function applyStagger(selector: string, stepMs: number): void {
  const nodes = Array.from(document.querySelectorAll<HTMLElement>(selector));
  nodes.forEach((node, index) => {
    node.classList.add('reveal-stagger');
    node.style.setProperty('--reveal-delay', `${index * stepMs}ms`);
  });
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

function setupHeroSlider(): void {
  const hero = mustElement<HTMLElement>('.hero');
  const track = mustElement<HTMLElement>('#hero-track');
  const slides = Array.from(track.querySelectorAll<HTMLElement>('.hero-slide'));
  if (slides.length === 0) {
    return;
  }

  const preloadImageNodes = slides
    .map((slide) => slide.querySelector<HTMLImageElement>('img'))
    .filter((img): img is HTMLImageElement => img !== null);
  preloadImageNodes.forEach((imgNode) => {
    const preload = new Image();
    preload.src = imgNode.src;
  });

  let activeIndex = 0;
  let intervalId: number | null = null;
  let startTimeoutId: number | null = null;
  const render = (): void => {
    track.style.transform = `translateX(-${activeIndex * 100}%)`;
    slides.forEach((slide, index) => {
      slide.classList.toggle('is-active', index === activeIndex);
    });
  };

  const showNextSlide = (): void => {
    activeIndex = (activeIndex + 1) % slides.length;
    render();
  };

  const startAutoRotation = (): void => {
    if (intervalId !== null) {
      return;
    }
    intervalId = window.setInterval(showNextSlide, HERO_ROTATION_MS);
  };

  const startAfterInitialHold = (): void => {
    if (startTimeoutId !== null || intervalId !== null) {
      return;
    }
    startTimeoutId = window.setTimeout(() => {
      startTimeoutId = null;
      startAutoRotation();
    }, HERO_ROTATION_MS);
  };

  render();
  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(() => {
      hero.classList.add('is-ready');
    });
  });
  startAfterInitialHold();
}

function setupHeaderScrollState(): void {
  const header = document.querySelector<HTMLElement>('.pro-header');
  if (!header) {
    return;
  }

  const syncState = (): void => {
    header.classList.toggle('is-scrolled', window.scrollY > 18);
  };

  syncState();
  window.addEventListener('scroll', syncState, { passive: true });
}

function setupOfferCardTilt(): void {
  const cards = Array.from(document.querySelectorAll<HTMLElement>('.offer-card'));
  if (cards.length === 0) {
    return;
  }

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const supportsFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (prefersReducedMotion || !supportsFinePointer) {
    return;
  }

  cards.forEach((card) => {
    card.addEventListener('pointermove', (event) => {
      const bounds = card.getBoundingClientRect();
      const x = Math.min(Math.max((event.clientX - bounds.left) / bounds.width, 0), 1);
      const y = Math.min(Math.max((event.clientY - bounds.top) / bounds.height, 0), 1);
      const rotateY = (x - 0.5) * 8;
      const rotateX = (0.5 - y) * 6;

      card.style.setProperty('--spotlight-x', `${(x * 100).toFixed(2)}%`);
      card.style.setProperty('--spotlight-y', `${(y * 100).toFixed(2)}%`);
      card.style.transform = `translateY(-8px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`;
    });

    card.addEventListener('pointerleave', () => {
      card.style.removeProperty('--spotlight-x');
      card.style.removeProperty('--spotlight-y');
      card.style.transform = '';
    });
  });
}

function setupHeroPointerMotion(): void {
  const hero = document.querySelector<HTMLElement>('.hero');
  if (!hero) {
    return;
  }

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const supportsFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (prefersReducedMotion || !supportsFinePointer) {
    return;
  }

  const setMotion = (event: PointerEvent): void => {
    const bounds = hero.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;

    hero.style.setProperty('--hero-overlay-x', `${(x * 12).toFixed(2)}px`);
    hero.style.setProperty('--hero-overlay-y', `${(y * 8).toFixed(2)}px`);
    hero.style.setProperty('--hero-image-x', `${(x * -18).toFixed(2)}px`);
    hero.style.setProperty('--hero-image-y', `${(y * -12).toFixed(2)}px`);
  };

  const resetMotion = (): void => {
    hero.style.setProperty('--hero-overlay-x', '0px');
    hero.style.setProperty('--hero-overlay-y', '0px');
    hero.style.setProperty('--hero-image-x', '0px');
    hero.style.setProperty('--hero-image-y', '0px');
  };

  hero.addEventListener('pointermove', setMotion);
  hero.addEventListener('pointerleave', resetMotion);
}

function setupStatsCounters(): void {
  const stats = document.querySelector<HTMLElement>('.stats');
  if (!stats) {
    return;
  }

  const counters = Array.from(stats.querySelectorAll<HTMLElement>('strong'))
    .map((node) => {
      const source = node.textContent?.trim() ?? '';
      const match = source.match(/^([^0-9]*)(\d+)(.*)$/);
      if (!match) {
        return null;
      }
      return {
        node,
        prefix: match[1],
        target: Number(match[2]),
        suffix: match[3]
      };
    })
    .filter((item): item is { node: HTMLElement; prefix: string; target: number; suffix: string } => item !== null);

  if (counters.length === 0) {
    return;
  }

  let hasAnimated = false;
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting || hasAnimated) {
          return;
        }
        hasAnimated = true;
        observer.disconnect();
        counters.forEach((counter, index) => animateCounter(counter, 950 + index * 180));
      });
    },
    { threshold: 0.35 }
  );

  observer.observe(stats);
}

function animateCounter(
  counter: { node: HTMLElement; prefix: string; target: number; suffix: string },
  durationMs: number
): void {
  const start = performance.now();
  const { node, prefix, target, suffix } = counter;

  const tick = (now: number): void => {
    const progress = Math.min((now - start) / durationMs, 1);
    const eased = 1 - (1 - progress) ** 3;
    const value = Math.round(target * eased);
    node.textContent = `${prefix}${value}${suffix}`;

    if (progress < 1) {
      window.requestAnimationFrame(tick);
    } else {
      node.textContent = `${prefix}${target}${suffix}`;
    }
  };

  window.requestAnimationFrame(tick);
}

function mustElement<T extends Element>(selector: string): T {
  const node = document.querySelector<T>(selector);
  if (!node) {
    throw new Error(`Missing element: ${selector}`);
  }
  return node;
}
