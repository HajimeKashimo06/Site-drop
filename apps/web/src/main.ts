import './style.css';

document.title = 'Hproweb | Visibilite totale : site, carte et prospectus';

const app = mustElement<HTMLDivElement>('#app');
app.innerHTML = `
  <div class="ambient-fluid" id="ambient-fluid" aria-hidden="true"></div>
  <div class="ambient-hail" aria-hidden="true"></div>

  <main class="pro-shell" id="accueil">
    <header class="pro-header reveal">
      <div class="brand">
        <img class="brand-logo" src="/hplogo.png?v=20260419m1" alt="HP logo" />
        <span>Visibilite totale</span>
      </div>
      <nav>
        <a href="#apropos">Accueil</a>
        <a href="#comparatif">Comparer les prix</a>
        <a href="#offres">Offres</a>
        <a href="#process">Méthode</a>
      </nav>
      <div class="header-actions">
        <a class="btn solid header-cta-main" href="/contact.html">Être rappelé</a>
        <a class="btn solid header-cta-demo" href="/demo-site.html">Site démo</a>
        <a class="btn ghost account-btn" href="/admin.html" aria-label="Connexion">
          <span aria-hidden="true">Compte</span>
        </a>
      </div>
    </header>

    <section class="hero reveal" id="apropos">
      <div class="hero-stage" id="hero-stage">
        <article
          class="hero-frame is-active"
          data-bg="/coiffure1/photoia.png?v=20260419m6"
          style="--hero-bg: url('/coiffure1/photoia.png?v=20260419m6');"
        >
          <div class="hero-overlay">
            <p class="hero-kicker">Offre signature 3-en-1</p>
            <h1>Site web, carte de visite, prospectus : votre activite devient impossible a ignorer.</h1>
            <p class="hero-lead">Une visibilite totale pour attirer plus haut, plus large, a moindre cout.</p>
            <ul class="hero-list">
              <li>Une image coherente partout</li>
              <li>Trois supports, une seule strategie</li>
              <li>Un accompagnement simple et rapide</li>
            </ul>
            <div class="hero-actions">
              <a class="btn solid" href="#offres">Decouvrir l'offre signature</a>
            </div>
          </div>
        </article>

        <article
          class="hero-frame"
          data-bg="/coiffure1/appel.png?v=20260419m6"
          style="--hero-bg: url('/coiffure1/appel.png?v=20260419m6');"
        >
          <div class="hero-overlay">
            <p class="hero-kicker">Montee en gamme</p>
            <h1>Une meilleure image attire des prospects plus qualifies et plus confiants.</h1>
            <p class="hero-lead">
              Quand votre presence est nette partout, vous paraissez plus solide, plus memorisable et plus facile a
              recommander.
            </p>
            <ul class="hero-list">
              <li>Vous inspirez plus de confiance des le premier regard</li>
              <li>Vous attirez une clientele plus serieuse et plus engagee</li>
              <li>Votre image donne plus de poids a votre activite</li>
            </ul>
            <div class="hero-actions">
              <a class="btn solid" href="/contact.html">Nous contacter</a>
            </div>
          </div>
        </article>
      </div>
    </section>

    <section class="stats reveal" aria-label="Indicateurs de service">
      <div class="stats-marquee-wrap">
        <div class="stats-marquee">
          <span><em>3</em> Supports dans une seule offre</span>
          <span><em>1</em> Image coherente sur tous vos points de contact</span>
          <span><em>24/7</em> Visibilite qui continue de travailler</span>
          <span><em>0</em> Agence lourde a financer</span>
          <span><em>3</em> Supports dans une seule offre</span>
          <span><em>1</em> Image coherente sur tous vos points de contact</span>
          <span><em>24/7</em> Visibilite qui continue de travailler</span>
          <span><em>0</em> Agence lourde a financer</span>
        </div>
      </div>
    </section>

    <section class="visibility-pack reveal" aria-label="Presentation du pack 3-en-1">
      <div class="head">
        <p>Pour une visibilite au max</p>
        <h2>Trois supports relies pour donner plus de poids a votre <span class="glow-copy">image</span>.</h2>
      </div>
      <p class="pack-lead">Visible en ligne, <span class="glow-copy">marquant</span> en rendez-vous, present sur le terrain.</p>
      <div class="pack-grid">
        <article class="offer-card pack-card">
          <figure class="offer-visual offer-visual-site">
            <img src="/pack/pclogofinal.png" alt="Mockup du site internet Hproweb sur ordinateur portable" />
          </figure>
          <p class="pack-card-tag">Confiance en ligne</p>
          <h3>Site web</h3>
          <p class="offer-summary">Votre base de <span class="pack-card-accent">confiance</span> pour attirer plus serieux.</p>
          <div class="pack-card-band">
            <span>Impact</span>
            <strong>Visible 24h/24</strong>
          </div>
          <ul class="offer-list">
            <li>Visible 24h/24</li>
            <li>Credibilite immediate</li>
          </ul>
        </article>
        <article class="offer-card offer-card-featured pack-card">
          <figure class="offer-visual offer-visual-cardshot">
            <img src="/pack/cartevi.png" alt="Carte de visite Hproweb sur fond clair" />
          </figure>
          <p class="pack-card-tag">Premier contact</p>
          <h3>Carte de visite</h3>
          <p class="offer-summary">Le support qui vous laisse <span class="pack-card-accent">en tete</span> apres l'echange.</p>
          <div class="pack-card-band">
            <span>Effet</span>
            <strong>Image plus pro</strong>
          </div>
          <ul class="offer-list">
            <li>Image plus pro</li>
            <li>Souvenir plus fort</li>
          </ul>
        </article>
        <article class="offer-card pack-card">
          <figure class="offer-visual offer-visual-prospectus">
            <img src="/pack/prospectus.png" alt="Prospectus Hproweb sur fond clair" />
          </figure>
          <p class="pack-card-tag">Presence terrain</p>
          <h3>Prospectus</h3>
          <p class="offer-summary">Votre rappel <span class="pack-card-accent">visuel</span> pour exister meme hors rendez-vous.</p>
          <div class="pack-card-band">
            <span>Portee</span>
            <strong>Diffusion locale</strong>
          </div>
          <ul class="offer-list">
            <li>Diffusion locale</li>
            <li>Plus de rappels visuels</li>
          </ul>
        </article>
        <span class="pack-link pack-link-1" aria-hidden="true">∞</span>
        <span class="pack-link pack-link-2" aria-hidden="true">∞</span>
      </div>
      <p class="offers-footer">Trois piliers. Une seule strategie. Une visibilite totale a moindre cout.</p>
    </section>

    <section class="offres reveal" id="offres">
      <div class="head">
        <p>Offres</p>
        <h2>Trois niveaux, une qualite premium a chaque etape.</h2>
      </div>
      <div class="grid offers-main-grid">
        <article class="offer-card">
          <p class="offer-tier">Starter</p>
          <p class="offer-badge">Pour une visibilite au max</p>
          <h3>Site Essentiel</h3>
          <p class="offer-summary">Un site elegant, rapide et pret a convertir, renforce par votre carte et votre prospectus.</p>
          <div class="offer-pricing">
            <p><span>Creation</span><strong><em class="offer-discount">-35%</em> 119.99 EUR</strong></p>
            <p><span>Entretien</span><strong>30 EUR tous les 6 mois</strong></p>
          </div>
          <ul class="offer-list">
            <li>Site vitrine de qualite professionnelle</li>
            <li>Carte de visite incluse</li>
            <li>Prospectus inclus</li>
            <li>Mise en ligne rapide et accompagnee</li>
          </ul>
          <div class="offer-includes">
            <span>Site web</span>
            <span>Carte</span>
            <span>Prospectus</span>
          </div>
          <a class="offer-link" href="/devis.html?offer=essentiel">Choisir Essentiel</a>
        </article>
        <article class="offer-card offer-card-featured">
          <p class="offer-tier">Business</p>
          <p class="offer-badge">Pour une visibilite au max</p>
          <h3>Site Pro Gestion</h3>
          <p class="offer-summary">Un site complet avec espace d'administration, paiement integre et vos trois supports alignes.</p>
          <div class="offer-pricing">
            <p><span>Creation</span><strong><em class="offer-discount">-35%</em> 239,99 EUR</strong></p>
            <p><span>Admin en plus</span><strong>+20 EUR par compte</strong></p>
            <p><span>Entretien</span><strong>60 EUR tous les 6 mois</strong></p>
          </div>
          <ul class="offer-list">
            <li>Onglet de connexion pour compte admin</li>
            <li>Paiement integre sur le site</li>
            <li>Carte de visite incluse</li>
            <li>Prospectus inclus</li>
          </ul>
          <div class="offer-includes">
            <span>Site web</span>
            <span>Carte</span>
            <span>Prospectus</span>
          </div>
          <a class="offer-link" href="/devis.html?offer=pro">Choisir Pro</a>
        </article>
        <article class="offer-card">
          <p class="offer-tier">Premium</p>
          <p class="offer-badge">Pour une visibilite au max</p>
          <h3>Site Grand Format</h3>
          <p class="offer-summary">La solution complete pour un site de niveau professionnel avec une presence commerciale pleine.</p>
          <div class="offer-pricing">
            <p><span>Creation</span><strong><em class="offer-discount">-35%</em> 549.99 EUR</strong></p>
            <p><span>Entretien</span><strong>120 EUR tous les 6 mois</strong></p>
          </div>
          <ul class="offer-list">
            <li>Comptes admin illimites</li>
            <li>Comptes clients illimites</li>
            <li>Paiement complet integre + entretien inclus</li>
            <li>Carte de visite et prospectus inclus</li>
          </ul>
          <div class="offer-includes">
            <span>Site web</span>
            <span>Carte</span>
            <span>Prospectus</span>
          </div>
          <a class="offer-link" href="/devis.html?offer=grand-format">Choisir Grand Format</a>
        </article>
      </div>
      <aside class="market-claim" id="comparatif" aria-label="Comparatif du marche">
        <p class="market-claim-kicker">Comparatif du marche</p>
        <h3>Le bon choix pour votre site et votre visibilite complete</h3>
        <div class="market-table-wrap">
          <table class="market-table">
            <thead>
              <tr>
                <th scope="col">Critere</th>
                <th scope="col">Hproweb (Nous)</th>
                <th scope="col">Achat classique (Agence)</th>
                <th scope="col">Abonnement (Wix / Shopify)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Paiement</th>
                <td>
                  <strong>Des 119.99 EUR</strong>
                  <span class="market-note yes"><span class="market-mark yes" aria-hidden="true">OK</span> Puis entretien leger tous les 6 mois.</span>
                </td>
                <td>
                  <strong>1500 a plus de 10 000 EUR</strong>
                  <span class="market-note no"><span class="market-mark no" aria-hidden="true">X</span> Paiement unique eleve.</span>
                </td>
                <td>
                  <strong>10 a 500 EUR / mois</strong>
                  <span class="market-note no"><span class="market-mark no" aria-hidden="true">X</span> Revient cher a l'annee.</span>
                </td>
              </tr>
              <tr>
                <th scope="row">Site web</th>
                <td><span class="market-state yes"><span class="market-mark yes" aria-hidden="true">OK</span> Oui</span></td>
                <td><span class="market-state yes"><span class="market-mark yes" aria-hidden="true">OK</span> Oui</span></td>
                <td><span class="market-state yes"><span class="market-mark yes" aria-hidden="true">OK</span> Oui</span></td>
              </tr>
              <tr>
                <th scope="row">Carte de visite</th>
                <td><span class="market-state yes"><span class="market-mark yes" aria-hidden="true">OK</span> Incluse</span></td>
                <td><span class="market-state warn"><span class="market-mark warn" aria-hidden="true">!</span> Souvent en option</span></td>
                <td><span class="market-state no"><span class="market-mark no" aria-hidden="true">X</span> Non</span></td>
              </tr>
              <tr>
                <th scope="row">Prospectus</th>
                <td><span class="market-state yes"><span class="market-mark yes" aria-hidden="true">OK</span> Inclus</span></td>
                <td><span class="market-state warn"><span class="market-mark warn" aria-hidden="true">!</span> Souvent en option</span></td>
                <td><span class="market-state no"><span class="market-mark no" aria-hidden="true">X</span> Non</span></td>
              </tr>
              <tr>
                <th scope="row">Propriete du site</th>
                <td><span class="market-state yes"><span class="market-mark yes" aria-hidden="true">OK</span> Oui</span></td>
                <td><span class="market-state yes"><span class="market-mark yes" aria-hidden="true">OK</span> Oui</span></td>
                <td><span class="market-state no"><span class="market-mark no" aria-hidden="true">X</span> Non</span></td>
              </tr>
              <tr>
                <th scope="row">Personnalisation</th>
                <td><span class="market-state yes"><span class="market-mark yes" aria-hidden="true">OK</span> Sur-mesure</span></td>
                <td><span class="market-state yes"><span class="market-mark yes" aria-hidden="true">OK</span> Sur-mesure</span></td>
                <td><span class="market-state no"><span class="market-mark no" aria-hidden="true">X</span> Limitee</span></td>
              </tr>
              <tr>
                <th scope="row">Cohesion visuelle</th>
                <td><span class="market-state yes"><span class="market-mark yes" aria-hidden="true">OK</span> Une seule direction</span></td>
                <td><span class="market-state warn"><span class="market-mark warn" aria-hidden="true">!</span> Selon budget</span></td>
                <td><span class="market-state no"><span class="market-mark no" aria-hidden="true">X</span> Fragmentee</span></td>
              </tr>
              <tr>
                <th scope="row">Accompagnement</th>
                <td><span class="market-state yes"><span class="market-mark yes" aria-hidden="true">OK</span> Humain + suivi</span></td>
                <td><span class="market-state warn"><span class="market-mark warn" aria-hidden="true">!</span> Selon budget</span></td>
                <td><span class="market-state no"><span class="market-mark no" aria-hidden="true">X</span> Faible</span></td>
              </tr>
              <tr>
                <th scope="row">Cout maitrise a l'annee</th>
                <td><span class="market-state yes"><span class="market-mark yes" aria-hidden="true">OK</span> Oui</span></td>
                <td><span class="market-state no"><span class="market-mark no" aria-hidden="true">X</span> Non</span></td>
                <td><span class="market-state no"><span class="market-mark no" aria-hidden="true">X</span> Non</span></td>
              </tr>
            </tbody>
          </table>
        </div>
        <button class="market-table-scroll-btn" type="button" aria-label="Voir la suite du tableau">
          <span aria-hidden="true">→</span>
        </button>
        <p class="market-claim-highlight">Prix clair, image pro, site + carte + prospectus dans la meme logique.</p>
      </aside>
    </section>

    <section class="process reveal" id="process">
      <div class="head">
        <p>Methode</p>
        <h2>Un lancement simple pour mettre vos trois supports dans la meme direction.</h2>
      </div>
      <ol>
        <li><strong>Diagnostic visibilite</strong><span>Positionnement, clientele visee et angle commercial.</span></li>
        <li><strong>Direction creative</strong><span>Message, style et coherence entre les trois supports.</span></li>
        <li><strong>Production 3-en-1</strong><span>Creation du site, de la carte et du prospectus dans la meme logique.</span></li>
        <li><strong>Livraison prete a diffuser</strong><span>Tout est aligne pour etre montre, partage et utilise rapidement.</span></li>
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
        <p>Parlons de votre visibilite totale</p>
        <h2>Reserve ton echange pour lancer un pack qui attire plus haut.</h2>
      </div>
      <div class="contact-actions">
        <a class="btn solid" href="/contact.html">Lancer mon pack 3-en-1</a>
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

const HERO_ROTATION_MS = 3_800;
const HERO_INITIAL_HOLD_MS = 1_200;

void setupAmbientFluidScene();
setupAmbientHail();
setupStaggeredElements();
setupRevealAnimation();
setupCenteredTabs();
setupHeroSlider();
setupHeaderScrollState();
setupOfferCardTilt();
setupStatsCounters();
setupMarketTableScrollHint();

async function setupAmbientFluidScene(): Promise<void> {
  const host = document.querySelector<HTMLElement>('#ambient-fluid');
  if (!host) {
    return;
  }
  const ambientRevision = '2026-04-24-galaxy-systems-v4-supernova-boost';
  host.setAttribute('data-ambient-rev', ambientRevision);
  console.info(`[ambient] revision ${ambientRevision}`);

  const THREE = await import('three');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = window.matchMedia('(max-width: 820px)').matches;
  const randomBetween = (min: number, max: number): number => min + Math.random() * (max - min);

  let width = Math.max(window.innerWidth, 1);
  let height = Math.max(window.innerHeight, 1);

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x060913, isMobile ? 0.05 : 0.038);
  const camera = new THREE.PerspectiveCamera(isMobile ? 42 : 46, width / height, 0.1, 140);
  camera.position.set(0, 0, isMobile ? 12.2 : 13.4);

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance'
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.1 : 1.28));
  renderer.setSize(width, height, false);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.12;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.domElement.classList.add('ambient-fluid-canvas');
  host.appendChild(renderer.domElement);

  const hemiLight = new THREE.HemisphereLight(0xdaf0ff, 0x161b33, 0.9);
  scene.add(hemiLight);

  const keyLight = new THREE.DirectionalLight(0xcbe3ff, 0.86);
  keyLight.position.set(5.2, 3.8, 6.2);
  scene.add(keyLight);

  const fillLight = new THREE.DirectionalLight(0x6ebdff, 0.64);
  fillLight.position.set(-4.6, -1.4, 4.1);
  scene.add(fillLight);

  const cosmicRoot = new THREE.Group();
  cosmicRoot.scale.setScalar(isMobile ? 1.08 : 1.24);
  scene.add(cosmicRoot);

  const disposeBag: Array<() => void> = [];
  const disposeMaterial = (material: any): void => {
    if (!material) {
      return;
    }
    if (Array.isArray(material)) {
      material.forEach((item) => item?.dispose?.());
      return;
    }
    material.dispose?.();
  };
  const registerMeshDisposable = (mesh: any): void => {
    disposeBag.push(() => mesh.geometry?.dispose?.());
    disposeBag.push(() => disposeMaterial(mesh.material));
  };

  const makeNebulaTexture = (inner: string, outer: string): InstanceType<typeof THREE.CanvasTexture> => {
    const canvas = document.createElement('canvas');
    canvas.width = 320;
    canvas.height = 320;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return new THREE.CanvasTexture(canvas);
    }
    const gradient = ctx.createRadialGradient(160, 160, 12, 160, 160, 158);
    gradient.addColorStop(0, inner);
    gradient.addColorStop(0.5, outer);
    gradient.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 320, 320);
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  };

  type NebulaSheet = {
    mesh: InstanceType<typeof THREE.Mesh>;
    material: InstanceType<typeof THREE.MeshBasicMaterial>;
    baseOpacity: number;
    pulseSpeed: number;
    pulsePhase: number;
  };
  const nebulaSheets: NebulaSheet[] = [];
  const nebulaConfigs = [
    {
      inner: 'rgba(164, 203, 255, 0.4)',
      outer: 'rgba(99, 148, 255, 0.2)',
      scaleX: 15.8,
      scaleY: 10.4,
      x: -7.4,
      y: 2.9,
      z: -8.2,
      rot: 0.42,
      opacity: 0.38,
      speed: 0.2
    },
    {
      inner: 'rgba(177, 255, 221, 0.36)',
      outer: 'rgba(96, 210, 170, 0.18)',
      scaleX: 14.2,
      scaleY: 9.2,
      x: 7.6,
      y: -1.5,
      z: -8.5,
      rot: -0.36,
      opacity: 0.33,
      speed: 0.16
    },
    {
      inner: 'rgba(255, 210, 168, 0.3)',
      outer: 'rgba(255, 166, 120, 0.14)',
      scaleX: 12.6,
      scaleY: 8.2,
      x: 0.4,
      y: -4.1,
      z: -9.2,
      rot: 0.18,
      opacity: 0.28,
      speed: 0.14
    },
    {
      inner: 'rgba(184, 203, 255, 0.28)',
      outer: 'rgba(111, 142, 255, 0.1)',
      scaleX: 11.4,
      scaleY: 7.1,
      x: -10.8,
      y: -0.9,
      z: -9.6,
      rot: -0.18,
      opacity: 0.2,
      speed: 0.12
    },
    {
      inner: 'rgba(192, 255, 228, 0.26)',
      outer: 'rgba(86, 201, 172, 0.1)',
      scaleX: 11.2,
      scaleY: 6.9,
      x: 10.4,
      y: 1.2,
      z: -9.6,
      rot: 0.22,
      opacity: 0.18,
      speed: 0.11
    }
  ];

  nebulaConfigs.forEach((config, index) => {
    const texture = makeNebulaTexture(config.inner, config.outer);
    const material = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      opacity: config.opacity,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(config.scaleX, config.scaleY), material);
    mesh.position.set(config.x, config.y, config.z);
    mesh.rotation.z = config.rot;
    cosmicRoot.add(mesh);
    disposeBag.push(() => texture.dispose());
    registerMeshDisposable(mesh);
    nebulaSheets.push({
      mesh,
      material,
      baseOpacity: config.opacity,
      pulseSpeed: config.speed,
      pulsePhase: index * 0.7
    });
  });

  type StarCloud = {
    points: InstanceType<typeof THREE.Points>;
    spinSpeed: number;
    swaySpeed: number;
    depthFactor: number;
  };
  const createStarCloud = (count: number, size: number, opacity: number, radius: number, depth: number): StarCloud => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      const ptr = i * 3;
      const theta = randomBetween(0, Math.PI * 2);
      const radial = Math.sqrt(Math.random()) * radius;
      const y = randomBetween(-depth, depth);
      positions[ptr] = Math.cos(theta) * radial + randomBetween(-1.6, 1.6);
      positions[ptr + 1] = y;
      positions[ptr + 2] = -randomBetween(0.8, 11.5);
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const material = new THREE.PointsMaterial({
      color: 0xf4fbff,
      size,
      sizeAttenuation: true,
      transparent: true,
      opacity,
      depthWrite: false
    });
    const points = new THREE.Points(geometry, material);
    cosmicRoot.add(points);
    disposeBag.push(() => geometry.dispose());
    disposeBag.push(() => material.dispose());
    return {
      points,
      spinSpeed: randomBetween(0.0004, 0.0012),
      swaySpeed: randomBetween(0.12, 0.3),
      depthFactor: randomBetween(0.08, 0.28)
    };
  };

  const starClouds: StarCloud[] = [
    createStarCloud(isMobile ? 1100 : 2100, isMobile ? 0.028 : 0.034, 0.78, 17.5, 6.2),
    createStarCloud(isMobile ? 560 : 980, isMobile ? 0.04 : 0.05, 0.48, 15.2, 5.2),
    createStarCloud(isMobile ? 320 : 620, isMobile ? 0.016 : 0.022, 0.34, 19.8, 7.4)
  ];

  type OrbitLine = {
    line: InstanceType<typeof THREE.LineLoop>;
    material: InstanceType<typeof THREE.LineBasicMaterial>;
    pulseSpeed: number;
    pulsePhase: number;
    baseOpacity: number;
  };
  const createOrbitLine = (
    radiusX: number,
    radiusY: number,
    z: number,
    color: number,
    opacity: number
  ): OrbitLine => {
    const points: InstanceType<typeof THREE.Vector3>[] = [];
    const segments = 140;
    for (let i = 0; i < segments; i += 1) {
      const a = (i / segments) * Math.PI * 2;
      points.push(new THREE.Vector3(Math.cos(a) * radiusX, Math.sin(a) * radiusY, z));
    }
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({
      color,
      transparent: true,
      opacity
    });
    const line = new THREE.LineLoop(geometry, material);
    disposeBag.push(() => geometry.dispose());
    disposeBag.push(() => material.dispose());
    return {
      line,
      material,
      pulseSpeed: randomBetween(0.22, 0.56),
      pulsePhase: Math.random() * Math.PI * 2,
      baseOpacity: opacity
    };
  };

  type OrbitPlanet = {
    mesh: InstanceType<typeof THREE.Mesh>;
    glow: InstanceType<typeof THREE.Mesh>;
    ring: InstanceType<typeof THREE.Mesh> | null;
    orbitX: number;
    orbitY: number;
    speed: number;
    phase: number;
    bobAmp: number;
    bobSpeed: number;
    depthAmp: number;
    rotX: number;
    rotY: number;
  };

  const solarRoot = new THREE.Group();
  solarRoot.position.set(isMobile ? 0.8 : 0.9, isMobile ? 0.22 : 0.06, -2.6);
  solarRoot.scale.setScalar(isMobile ? 1.12 : 1.42);
  solarRoot.rotation.x = isMobile ? -0.42 : -0.52;
  solarRoot.rotation.z = -0.1;
  cosmicRoot.add(solarRoot);

  const sunLight = new THREE.PointLight(0xffc787, 13.4, 23, 2);
  sunLight.position.set(0, 0, 0.4);
  solarRoot.add(sunLight);

  const sun = new THREE.Mesh(
    new THREE.SphereGeometry(isMobile ? 0.5 : 0.64, 40, 36),
    new THREE.MeshStandardMaterial({
      color: 0xffaf57,
      emissive: 0xff8a2b,
      emissiveIntensity: 1.22,
      metalness: 0.06,
      roughness: 0.34
    })
  );
  solarRoot.add(sun);
  registerMeshDisposable(sun);

  const sunHalo = new THREE.Mesh(
    new THREE.SphereGeometry(isMobile ? 1.06 : 1.34, 30, 24),
    new THREE.MeshBasicMaterial({
      color: 0xffb46a,
      transparent: true,
      opacity: 0.24,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    })
  );
  solarRoot.add(sunHalo);
  registerMeshDisposable(sunHalo);

  const orbitLines: OrbitLine[] = [];
  const mainOrbitRadii = [1.5, 2.05, 2.68, 3.34, 4.08, 4.9, 5.74];
  mainOrbitRadii.forEach((radius, index) => {
    const line = createOrbitLine(radius, radius * 0.62, 0, 0xd8e9ff, 0.12 + index * 0.012);
    solarRoot.add(line.line);
    orbitLines.push(line);
  });

  const createPlanet = (config: {
    radius: number;
    color: number;
    emissive: number;
    orbitX: number;
    orbitY: number;
    speed: number;
    phase: number;
    hasRing?: boolean;
    ringColor?: number;
  }): OrbitPlanet => {
    const mesh = new THREE.Mesh(
      new THREE.SphereGeometry(config.radius, 24, 20),
      new THREE.MeshStandardMaterial({
        color: config.color,
        emissive: config.emissive,
        emissiveIntensity: 0.1,
        roughness: 0.54,
        metalness: 0.04
      })
    );
    const glow = new THREE.Mesh(
      new THREE.SphereGeometry(config.radius * 1.72, 18, 16),
      new THREE.MeshBasicMaterial({
        color: config.color,
        transparent: true,
        opacity: 0.14,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      })
    );
    solarRoot.add(mesh);
    solarRoot.add(glow);
    registerMeshDisposable(mesh);
    registerMeshDisposable(glow);

    let ring: InstanceType<typeof THREE.Mesh> | null = null;
    if (config.hasRing) {
      ring = new THREE.Mesh(
        new THREE.RingGeometry(config.radius * 1.4, config.radius * 2.08, 56),
        new THREE.MeshBasicMaterial({
          color: config.ringColor ?? 0xe9ddb9,
          transparent: true,
          opacity: 0.46,
          side: THREE.DoubleSide,
          depthWrite: false
        })
      );
      ring.rotation.x = Math.PI / 2.2;
      solarRoot.add(ring);
      registerMeshDisposable(ring);
    }

    return {
      mesh,
      glow,
      ring,
      orbitX: config.orbitX,
      orbitY: config.orbitY,
      speed: config.speed,
      phase: config.phase,
      bobAmp: randomBetween(0.02, 0.08),
      bobSpeed: randomBetween(0.7, 1.6),
      depthAmp: randomBetween(0.04, 0.22),
      rotX: randomBetween(0.0022, 0.0068),
      rotY: randomBetween(0.0024, 0.0082)
    };
  };

  const planets: OrbitPlanet[] = [
    createPlanet({ radius: 0.09, color: 0xa7b6d8, emissive: 0x324463, orbitX: 1.5, orbitY: 0.94, speed: 1.56, phase: 0.6 }),
    createPlanet({ radius: 0.12, color: 0xffd19f, emissive: 0x5f3e2a, orbitX: 2.05, orbitY: 1.27, speed: 1.24, phase: 1.7 }),
    createPlanet({ radius: 0.15, color: 0x75b2ff, emissive: 0x274a7c, orbitX: 2.68, orbitY: 1.66, speed: 0.94, phase: 2.9 }),
    createPlanet({ radius: 0.13, color: 0xdc8e71, emissive: 0x633524, orbitX: 3.34, orbitY: 2.06, speed: 0.8, phase: 0.9 }),
    createPlanet({ radius: 0.24, color: 0xd8b389, emissive: 0x5b3f24, orbitX: 4.08, orbitY: 2.52, speed: 0.54, phase: 1.45 }),
    createPlanet({
      radius: 0.23,
      color: 0xc8b495,
      emissive: 0x5a4e3d,
      orbitX: 4.9,
      orbitY: 3.02,
      speed: 0.44,
      phase: 3.1,
      hasRing: true,
      ringColor: 0xf4dfb0
    }),
    createPlanet({ radius: 0.2, color: 0x7ee7ee, emissive: 0x27556f, orbitX: 5.74, orbitY: 3.54, speed: 0.34, phase: 4.1 })
  ];

  const createBeltCloud = (radiusX: number, radiusY: number, count: number, spread: number, color: number, size: number) => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      const angle = randomBetween(0, Math.PI * 2);
      const jitter = randomBetween(-spread, spread);
      const z = randomBetween(-0.09, 0.09);
      const ptr = i * 3;
      positions[ptr] = Math.cos(angle) * (radiusX + jitter);
      positions[ptr + 1] = Math.sin(angle) * (radiusY + jitter * 0.62);
      positions[ptr + 2] = z;
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const material = new THREE.PointsMaterial({
      color,
      size,
      transparent: true,
      opacity: 0.56,
      depthWrite: false
    });
    const points = new THREE.Points(geometry, material);
    solarRoot.add(points);
    disposeBag.push(() => geometry.dispose());
    disposeBag.push(() => material.dispose());
    return points;
  };

  const asteroidBeltA = createBeltCloud(3.02, 1.88, isMobile ? 240 : 440, 0.16, 0xd9d9da, isMobile ? 0.028 : 0.034);
  const asteroidBeltB = createBeltCloud(3.21, 2.01, isMobile ? 180 : 340, 0.15, 0xb9bec9, isMobile ? 0.019 : 0.024);

  type MiniSystem = {
    root: InstanceType<typeof THREE.Group>;
    baseX: number;
    baseY: number;
    core: InstanceType<typeof THREE.Mesh>;
    glow: InstanceType<typeof THREE.Mesh>;
    lines: OrbitLine[];
    planets: OrbitPlanet[];
    driftSpeed: number;
    phase: number;
  };

  const miniSystemConfigs = [
    { x: -8.7, y: 2.7, z: -7.4, scale: 0.68, color: 0x8dc8ff, phase: 0.7 },
    { x: 8.5, y: 2.9, z: -7.8, scale: 0.62, color: 0xa3f1d3, phase: 1.6 },
    { x: -7.4, y: -2.8, z: -7.2, scale: 0.56, color: 0xffd19f, phase: 2.4 },
    { x: 7.2, y: -3.1, z: -7.5, scale: 0.54, color: 0xb5c9ff, phase: 3.1 },
    { x: -5.1, y: 0.3, z: -6.9, scale: 0.46, color: 0x98d8ff, phase: 3.7 },
    { x: 5.4, y: -0.4, z: -7.1, scale: 0.44, color: 0xb6ffe0, phase: 4.2 }
  ];

  const miniSystems: MiniSystem[] = miniSystemConfigs
    .slice(0, isMobile ? 3 : miniSystemConfigs.length)
    .map((config) => {
      const root = new THREE.Group();
      root.position.set(config.x, config.y, config.z);
      root.scale.setScalar(config.scale);
      cosmicRoot.add(root);

      const core = new THREE.Mesh(
        new THREE.SphereGeometry(0.42, 22, 16),
        new THREE.MeshStandardMaterial({
          color: config.color,
          emissive: config.color,
          emissiveIntensity: 0.26,
          roughness: 0.46,
          metalness: 0.08
        })
      );
      root.add(core);
      registerMeshDisposable(core);

      const glow = new THREE.Mesh(
        new THREE.SphereGeometry(0.82, 16, 12),
        new THREE.MeshBasicMaterial({
          color: config.color,
          transparent: true,
          opacity: 0.2,
          blending: THREE.AdditiveBlending,
          depthWrite: false
        })
      );
      root.add(glow);
      registerMeshDisposable(glow);

      const lines: OrbitLine[] = [];
      [0.9, 1.24, 1.56].forEach((radius, index) => {
        const orbit = createOrbitLine(radius, radius * 0.68, 0, 0xbfd7f8, 0.16 + index * 0.02);
        root.add(orbit.line);
        lines.push(orbit);
      });

      const miniPlanets: OrbitPlanet[] = [
        createPlanet({ radius: 0.08, color: 0x9ebbf4, emissive: 0x334564, orbitX: 0.9, orbitY: 0.61, speed: 1.2, phase: config.phase + 0.4 }),
        createPlanet({ radius: 0.1, color: 0xffce95, emissive: 0x573d2a, orbitX: 1.24, orbitY: 0.84, speed: 0.96, phase: config.phase + 1.3 }),
        createPlanet({ radius: 0.09, color: 0x9de8cf, emissive: 0x2f5447, orbitX: 1.56, orbitY: 1.04, speed: 0.74, phase: config.phase + 2.1 })
      ].map((planet) => {
        root.add(planet.mesh);
        root.add(planet.glow);
        if (planet.ring) {
          root.add(planet.ring);
        }
        return planet;
      });

      return {
        root,
        baseX: config.x,
        baseY: config.y,
        core,
        glow,
        lines,
        planets: miniPlanets,
        driftSpeed: randomBetween(0.06, 0.16),
        phase: config.phase
      };
    });

  const createCometTexture = (): InstanceType<typeof THREE.CanvasTexture> => {
    const canvas = document.createElement('canvas');
    canvas.width = 192;
    canvas.height = 48;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return new THREE.CanvasTexture(canvas);
    }
    const gradient = ctx.createLinearGradient(0, 24, 192, 24);
    gradient.addColorStop(0, 'rgba(255,255,255,0)');
    gradient.addColorStop(0.35, 'rgba(161,210,255,0.28)');
    gradient.addColorStop(0.72, 'rgba(203,233,255,0.88)');
    gradient.addColorStop(1, 'rgba(255,255,255,1)');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(0, 23);
    ctx.quadraticCurveTo(64, 4, 192, 24);
    ctx.quadraticCurveTo(64, 44, 0, 25);
    ctx.closePath();
    ctx.fill();
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  };

  type Comet = {
    group: InstanceType<typeof THREE.Group>;
    radiusX: number;
    radiusY: number;
    speed: number;
    phase: number;
    z: number;
    tilt: number;
  };

  const cometTexture = createCometTexture();
  disposeBag.push(() => cometTexture.dispose());
  const comets: Comet[] = Array.from({ length: isMobile ? 2 : 3 }, (_, index) => {
    const group = new THREE.Group();
    const tail = new THREE.Mesh(
      new THREE.PlaneGeometry(1.6, 0.34),
      new THREE.MeshBasicMaterial({
        map: cometTexture,
        transparent: true,
        opacity: 0.82,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      })
    );
    const head = new THREE.Mesh(
      new THREE.SphereGeometry(0.07, 14, 12),
      new THREE.MeshBasicMaterial({
        color: 0xe7f5ff,
        transparent: true,
        opacity: 0.9
      })
    );
    tail.position.x = -0.56;
    group.add(tail);
    group.add(head);
    cosmicRoot.add(group);
    registerMeshDisposable(tail);
    registerMeshDisposable(head);
    return {
      group,
      radiusX: index === 0 ? 9.4 : index === 1 ? 7.8 : 10.2,
      radiusY: index === 0 ? 4.8 : index === 1 ? 3.2 : 5.4,
      speed: index === 0 ? 0.14 : index === 1 ? 0.19 : 0.11,
      phase: index * Math.PI + 0.5,
      z: index === 0 ? -2.2 : index === 1 ? -3.5 : -4.4,
      tilt: index === 0 ? -0.38 : index === 1 ? 0.32 : -0.22
    };
  });

  const createSupernovaTexture = (): InstanceType<typeof THREE.CanvasTexture> => {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return new THREE.CanvasTexture(canvas);
    }
    const gradient = ctx.createRadialGradient(128, 128, 8, 128, 128, 122);
    gradient.addColorStop(0, 'rgba(255,255,255,1)');
    gradient.addColorStop(0.2, 'rgba(196,226,255,0.96)');
    gradient.addColorStop(0.48, 'rgba(141,189,255,0.54)');
    gradient.addColorStop(1, 'rgba(141,189,255,0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 256, 256);
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  };

  type SupernovaEvent = {
    group: InstanceType<typeof THREE.Group>;
    core: InstanceType<typeof THREE.Mesh>;
    coreMaterial: InstanceType<typeof THREE.MeshBasicMaterial>;
    shell: InstanceType<typeof THREE.Mesh>;
    shellMaterial: InstanceType<typeof THREE.MeshBasicMaterial>;
    shockwave: InstanceType<typeof THREE.Mesh>;
    shockwaveMaterial: InstanceType<typeof THREE.MeshBasicMaterial>;
    sparks: InstanceType<typeof THREE.Points>;
    sparkMaterial: InstanceType<typeof THREE.PointsMaterial>;
    sparkPosition: InstanceType<typeof THREE.BufferAttribute>;
    basePositions: Float32Array;
    velocities: Float32Array;
    light: InstanceType<typeof THREE.PointLight>;
    bornAt: number;
    duration: number;
    driftY: number;
    intensityScale: number;
    sizeScale: number;
  };

  const supernovaTexture = createSupernovaTexture();
  disposeBag.push(() => supernovaTexture.dispose());
  const activeSupernovas: SupernovaEvent[] = [];
  const maxSupernovas = isMobile ? 3 : 6;
  let nextSupernovaAt = prefersReducedMotion ? Number.POSITIVE_INFINITY : randomBetween(1.2, 2.8);
  let hasSpawnedFirstSupernova = false;

  const disposeSupernova = (event: SupernovaEvent): void => {
    event.group.parent?.remove(event.group);
    event.core.geometry.dispose();
    event.shell.geometry.dispose();
    event.shockwave.geometry.dispose();
    event.sparks.geometry.dispose();
    event.coreMaterial.dispose();
    event.shellMaterial.dispose();
    event.shockwaveMaterial.dispose();
    event.sparkMaterial.dispose();
  };

  const scheduleSupernova = (now: number): void => {
    nextSupernovaAt = now + randomBetween(isMobile ? 4.8 : 2.4, isMobile ? 9.4 : 5.8);
  };

  const spawnSupernova = (now: number, forceCenter = false): void => {
    if (activeSupernovas.length >= maxSupernovas) {
      const stale = activeSupernovas.shift();
      if (stale) {
        disposeSupernova(stale);
      }
    }

    const group = new THREE.Group();
    const isDistant = forceCenter ? false : Math.random() < 0.8;
    const sideSpawn = forceCenter ? false : Math.random() < 0.62;
    const x = sideSpawn
      ? (Math.random() < 0.5 ? -1 : 1) * randomBetween(isDistant ? 7.8 : 4.6, isDistant ? 16.8 : 11.8)
      : randomBetween(isDistant ? -9.4 : -4.8, isDistant ? 9.4 : 4.8);
    group.position.set(
      x,
      randomBetween(isDistant ? -5.8 : -4.6, isDistant ? 4.4 : 3.2),
      randomBetween(isDistant ? -17.8 : -8.8, isDistant ? -10.4 : -4.6)
    );
    cosmicRoot.add(group);

    const intensityScale = forceCenter ? 1 : isDistant ? randomBetween(0.36, 0.62) : randomBetween(0.78, 1);
    const sizeScale = forceCenter ? 1 : isDistant ? randomBetween(0.44, 0.72) : randomBetween(0.88, 1);
    const baseSize =
      randomBetween(isMobile ? 1.04 : 1.36, isMobile ? 1.72 : 2.28) * sizeScale;

    const coreMaterial = new THREE.MeshBasicMaterial({
        map: supernovaTexture,
        color: 0xd4ebff,
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });
    const core = new THREE.Mesh(new THREE.PlaneGeometry(baseSize, baseSize), coreMaterial);
    group.add(core);

    const shellMaterial = new THREE.MeshBasicMaterial({
        color: 0x9fc7ff,
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });
    const shell = new THREE.Mesh(new THREE.SphereGeometry(baseSize * 0.24, 20, 16), shellMaterial);
    group.add(shell);

    const shockwaveMaterial = new THREE.MeshBasicMaterial({
        color: 0xb8d8ff,
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide,
        depthWrite: false
      });
    const shockwave = new THREE.Mesh(new THREE.RingGeometry(baseSize * 0.18, baseSize * 0.28, 72), shockwaveMaterial);
    shockwave.rotation.x = Math.PI / 2;
    group.add(shockwave);

    const sparkCount = isMobile ? 64 : 150;
    const sparkPositions = new Float32Array(sparkCount * 3);
    const sparkBasePositions = new Float32Array(sparkCount * 3);
    const sparkVelocities = new Float32Array(sparkCount * 3);
    for (let i = 0; i < sparkCount; i += 1) {
      const ptr = i * 3;
      const theta = randomBetween(0, Math.PI * 2);
      const phi = randomBetween(0, Math.PI);
      const speed = randomBetween(0.18, 1.12);
      const vx = Math.sin(phi) * Math.cos(theta) * speed;
      const vy = Math.sin(phi) * Math.sin(theta) * speed;
      const vz = Math.cos(phi) * speed;
      sparkBasePositions[ptr] = vx * 0.06;
      sparkBasePositions[ptr + 1] = vy * 0.06;
      sparkBasePositions[ptr + 2] = vz * 0.06;
      sparkPositions[ptr] = sparkBasePositions[ptr] ?? 0;
      sparkPositions[ptr + 1] = sparkBasePositions[ptr + 1] ?? 0;
      sparkPositions[ptr + 2] = sparkBasePositions[ptr + 2] ?? 0;
      sparkVelocities[ptr] = vx;
      sparkVelocities[ptr + 1] = vy;
      sparkVelocities[ptr + 2] = vz;
    }
    const sparkGeometry = new THREE.BufferGeometry();
    const sparkPosition = new THREE.BufferAttribute(sparkPositions, 3);
    sparkGeometry.setAttribute('position', sparkPosition);
    const sparkMaterial = new THREE.PointsMaterial({
        color: 0xe4f3ff,
        size: isMobile ? 0.032 : 0.04,
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });
    const sparks = new THREE.Points(sparkGeometry, sparkMaterial);
    group.add(sparks);

    const light = new THREE.PointLight(0xb3d8ff, 0, isMobile ? 14 : 20, 2);
    group.add(light);

    activeSupernovas.push({
      group,
      core,
      coreMaterial,
      shell,
      shellMaterial,
      shockwave,
      shockwaveMaterial,
      sparks,
      sparkMaterial,
      sparkPosition,
      basePositions: sparkBasePositions,
      velocities: sparkVelocities,
      light,
      bornAt: now,
      duration: isDistant ? randomBetween(4.4, 6.8) : randomBetween(3.4, 5.2),
      driftY: randomBetween(0.08, 0.24),
      intensityScale,
      sizeScale
    });
  };

  const pointer = { x: 0, y: 0 };
  const scroll = { progress: 0 };
  const supportsFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  const syncScroll = (): void => {
    const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
    scroll.progress = window.scrollY / maxScroll;
  };

  const onPointerMove = (event: PointerEvent): void => {
    pointer.x = (event.clientX / window.innerWidth - 0.5) * 2;
    pointer.y = (event.clientY / window.innerHeight - 0.5) * 2;
  };

  const onPointerLeave = (): void => {
    pointer.x = 0;
    pointer.y = 0;
  };

  syncScroll();
  window.addEventListener('scroll', syncScroll, { passive: true });

  if (supportsFinePointer) {
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerleave', onPointerLeave, { passive: true });
  }

  const resize = (): void => {
    width = Math.max(window.innerWidth, 1);
    height = Math.max(window.innerHeight, 1);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
  };

  window.addEventListener('resize', resize, { passive: true });

  const clock = new THREE.Clock();
  let raf = 0;

  const renderFrame = (t: number): void => {
    const progress = scroll.progress;

    if (!prefersReducedMotion && !hasSpawnedFirstSupernova && t >= nextSupernovaAt) {
      spawnSupernova(t, true);
      hasSpawnedFirstSupernova = true;
      scheduleSupernova(t);
    } else if (!prefersReducedMotion && t >= nextSupernovaAt) {
      spawnSupernova(t);
      scheduleSupernova(t);
    }

    cosmicRoot.position.x += (pointer.x * 0.92 - cosmicRoot.position.x) * 0.016;
    cosmicRoot.position.y += (pointer.y * -0.48 - progress * 2.6 - cosmicRoot.position.y) * 0.016;
    cosmicRoot.rotation.z = Math.sin(t * 0.1) * 0.03 + progress * 0.1;
    cosmicRoot.rotation.y = Math.sin(t * 0.08) * 0.05;

    starClouds.forEach((cloud, index) => {
      cloud.points.rotation.z += cloud.spinSpeed;
      cloud.points.position.y = Math.sin(t * cloud.swaySpeed + index) * cloud.depthFactor - progress * 2.8;
    });

    nebulaSheets.forEach((sheet) => {
      sheet.material.opacity = sheet.baseOpacity + Math.sin(t * sheet.pulseSpeed + sheet.pulsePhase) * 0.05;
      sheet.mesh.rotation.z += 0.00006;
    });

    const sunPulse = 1 + Math.sin(t * 1.16) * 0.06;
    sun.scale.setScalar(sunPulse);
    sun.material.emissiveIntensity = 1.18 + Math.sin(t * 1.4) * 0.2;
    sunHalo.scale.setScalar(1.18 + Math.sin(t * 1.02) * 0.16);
    sunHalo.material.opacity = 0.2 + ((Math.sin(t * 0.9) + 1) * 0.5) * 0.14;
    sun.rotation.y += 0.003;
    sun.rotation.x += 0.0016;

    orbitLines.forEach((orbit) => {
      orbit.material.opacity = orbit.baseOpacity + Math.sin(t * orbit.pulseSpeed + orbit.pulsePhase) * 0.035;
    });

    planets.forEach((planet, index) => {
      const orbit = t * planet.speed + planet.phase + progress * 1.2;
      planet.mesh.position.x = Math.cos(orbit) * planet.orbitX;
      planet.mesh.position.y = Math.sin(orbit) * planet.orbitY;
      planet.mesh.position.z =
        Math.sin(orbit * 0.62 + planet.phase) * planet.depthAmp +
        Math.sin(t * planet.bobSpeed + index) * planet.bobAmp;
      planet.mesh.rotation.x += planet.rotX;
      planet.mesh.rotation.y += planet.rotY;
      planet.glow.position.copy(planet.mesh.position);
      if (planet.ring) {
        planet.ring.position.copy(planet.mesh.position);
        planet.ring.rotation.z += 0.004 + index * 0.0004;
      }
    });

    asteroidBeltA.rotation.z += 0.0014;
    asteroidBeltB.rotation.z -= 0.0018;
    solarRoot.rotation.y = Math.sin(t * 0.2) * 0.12 + pointer.x * 0.16;
    solarRoot.position.y = (isMobile ? 0.22 : 0.06) - progress * 1.54 + Math.sin(t * 0.32) * 0.07;

    miniSystems.forEach((mini, miniIndex) => {
      mini.root.rotation.z += 0.001 + miniIndex * 0.0002;
      mini.root.rotation.y = Math.sin(t * mini.driftSpeed + mini.phase) * 0.22;
      mini.root.position.x = mini.baseX + Math.sin(t * 0.22 + mini.phase) * 0.28 + pointer.x * 0.18;
      mini.root.position.y = mini.baseY + Math.sin(t * 0.24 + mini.phase) * 0.22 - progress * 1.4;
      mini.core.rotation.y += 0.01;
      mini.glow.scale.setScalar(1 + Math.sin(t * 1.2 + mini.phase) * 0.08);
      mini.lines.forEach((line) => {
        line.material.opacity = line.baseOpacity + Math.sin(t * line.pulseSpeed + line.pulsePhase) * 0.03;
      });
      mini.planets.forEach((planet, index) => {
        const orbit = t * planet.speed + planet.phase + progress * 0.6;
        planet.mesh.position.x = Math.cos(orbit) * planet.orbitX;
        planet.mesh.position.y = Math.sin(orbit) * planet.orbitY;
        planet.mesh.position.z = Math.sin(orbit * 0.7 + index) * planet.depthAmp;
        planet.mesh.rotation.x += planet.rotX;
        planet.mesh.rotation.y += planet.rotY;
        planet.glow.position.copy(planet.mesh.position);
      });
    });

    comets.forEach((comet) => {
      const angle = t * comet.speed + comet.phase;
      comet.group.position.x = Math.cos(angle) * comet.radiusX + pointer.x * 0.6;
      comet.group.position.y = Math.sin(angle) * comet.radiusY - progress * 2.1;
      comet.group.position.z = comet.z + Math.sin(angle * 0.54) * 0.8;
      comet.group.rotation.z = angle + comet.tilt;
    });

    for (let i = activeSupernovas.length - 1; i >= 0; i -= 1) {
      const event = activeSupernovas[i];
      if (!event) {
        continue;
      }
      const age = t - event.bornAt;
      const progress01 = age / event.duration;
      if (progress01 >= 1) {
        activeSupernovas.splice(i, 1);
        disposeSupernova(event);
        continue;
      }

      const flashIn = Math.min(progress01 / 0.12, 1);
      const fadeOut = 1 - Math.max((progress01 - 0.18) / 0.82, 0);
      const energy = flashIn * fadeOut;
      const shock = Math.min(progress01 / 0.9, 1);
      const smoothShock = 1 - (1 - shock) ** 3;

      event.group.position.y += event.driftY * 0.001;
      event.group.rotation.z += 0.003;

      const coreScale = (0.86 + smoothShock * 8.6) * event.sizeScale;
      event.core.scale.setScalar(coreScale);
      event.core.rotation.z += 0.008;
      event.coreMaterial.opacity = Math.min(1, 0.96 * energy * event.intensityScale);

      const shellScale = (0.62 + smoothShock * 4.4) * event.sizeScale;
      event.shell.scale.setScalar(shellScale);
      event.shellMaterial.opacity = 0.54 * energy * event.intensityScale;

      const waveInnerScale = (1 + smoothShock * 14.2) * event.sizeScale;
      event.shockwave.scale.setScalar(waveInnerScale);
      event.shockwave.rotation.z += 0.014;
      event.shockwaveMaterial.opacity = (1 - progress01) * 0.72 * event.intensityScale;

      const drag = 1 - progress01 * 0.56;
      const sparkPositions = event.sparkPosition.array as Float32Array;
      for (let sparkIndex = 0; sparkIndex < sparkPositions.length; sparkIndex += 3) {
        const vx = event.velocities[sparkIndex] ?? 0;
        const vy = event.velocities[sparkIndex + 1] ?? 0;
        const vz = event.velocities[sparkIndex + 2] ?? 0;
        const bx = event.basePositions[sparkIndex] ?? 0;
        const by = event.basePositions[sparkIndex + 1] ?? 0;
        const bz = event.basePositions[sparkIndex + 2] ?? 0;
        sparkPositions[sparkIndex] = bx + vx * age * drag;
        sparkPositions[sparkIndex + 1] = by + vy * age * drag;
        sparkPositions[sparkIndex + 2] = bz + vz * age * drag;
      }
      event.sparkPosition.needsUpdate = true;
      event.sparkMaterial.opacity = (1 - progress01) * 0.96 * event.intensityScale;
      const sparkScale = (0.74 + smoothShock * 3.8) * event.sizeScale;
      event.sparks.scale.setScalar(sparkScale);

      event.light.intensity = 11.8 * energy * event.intensityScale;
    }

    renderer.render(scene, camera);
  };

  const animate = (): void => {
    raf = window.requestAnimationFrame(animate);
    renderFrame(clock.getElapsedTime());
  };

  if (prefersReducedMotion) {
    renderFrame(0);
  } else {
    animate();
  }

  window.addEventListener('beforeunload', () => {
    if (raf) {
      window.cancelAnimationFrame(raf);
    }
    window.removeEventListener('resize', resize);
    window.removeEventListener('scroll', syncScroll);
    if (supportsFinePointer) {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerleave', onPointerLeave);
    }
    activeSupernovas.forEach((event) => disposeSupernova(event));
    activeSupernovas.length = 0;
    disposeBag.forEach((dispose) => dispose());
    renderer.dispose();
  });
}

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
  const count = isMobile ? 36 : 64;
  const silverPalette = ['#ffffff', '#f3f6fb', '#dfe8f4', '#cfdbe9', '#c4d2e2'];
  const icePalette = ['#ecf7ff', '#d8ebff', '#c9e3ff', '#dfefff'];

  const randomBetween = (min: number, max: number): number => min + Math.random() * (max - min);

  for (let i = 0; i < count; i += 1) {
    const particle = document.createElement('span');
    particle.className = 'hail-particle';

    const startX = randomBetween(-8, 106);
    const sway = randomBetween(3, 12) * (Math.random() < 0.5 ? -1 : 1);
    const drift = randomBetween(4, 14) * (Math.random() < 0.5 ? -1 : 1);
    const x1 = startX + sway * 0.4;
    const x2 = startX - sway * 0.26;
    const x3 = startX + sway * 0.55;
    const x4 = startX + drift;

    const size = randomBetween(isMobile ? 1.8 : 1.9, isMobile ? 4.4 : 5.1);
    const duration = randomBetween(18, 32);
    const delay = -randomBetween(0, 28);
    const startY = randomBetween(-130, -8);
    const opacity = randomBetween(0.32, 0.68);
    const blur = randomBetween(0, 0.45);
    const useIcy = Math.random() < 0.42;
    const palette = useIcy ? icePalette : silverPalette;
    const color = palette[Math.floor(Math.random() * palette.length)] ?? '#e4edf8';

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
        block: 'start',
        inline: 'nearest'
      });
      window.history.replaceState({}, '', hash);
    });
  });
}

function setupHeroSlider(): void {
  const hero = mustElement<HTMLElement>('.hero');
  const stage = mustElement<HTMLElement>('#hero-stage');
  const slides = Array.from(stage.querySelectorAll<HTMLElement>('.hero-frame'));
  if (slides.length === 0) {
    return;
  }

  const backgroundImages = slides
    .map((slide) => slide.dataset.bg)
    .filter((src): src is string => Boolean(src));
  backgroundImages.forEach((imgNode) => {
    const preload = new Image();
    preload.src = imgNode;
  });

  let activeIndex = 0;
  let intervalId: number | null = null;
  let startTimeoutId: number | null = null;

  const render = (): void => {
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
      showNextSlide();
      startAutoRotation();
    }, HERO_INITIAL_HOLD_MS);
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

function setupMarketTableScrollHint(): void {
  const wrappers = Array.from(document.querySelectorAll<HTMLElement>('.market-table-wrap'));
  if (wrappers.length === 0) {
    return;
  }

  const syncState = (wrapper: HTMLElement, button: HTMLButtonElement | null): void => {
    const maxScrollLeft = wrapper.scrollWidth - wrapper.clientWidth;
    const isScrollable = maxScrollLeft > 8;
    const atEnd = !isScrollable || wrapper.scrollLeft >= maxScrollLeft - 8;

    if (button) {
      button.classList.toggle('is-hidden', !isScrollable || atEnd);
      button.disabled = !isScrollable || atEnd;
    }
  };

  wrappers.forEach((wrapper) => {
    const claim = wrapper.closest<HTMLElement>('.market-claim');
    const button = claim?.querySelector<HTMLButtonElement>('.market-table-scroll-btn') ?? null;
    const update = (): void => syncState(wrapper, button);

    if (button) {
      button.addEventListener('click', () => {
        wrapper.scrollBy({
          left: Math.max(Math.round(wrapper.clientWidth * 0.72), 180),
          behavior: 'smooth'
        });
      });
    }

    update();
    wrapper.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    window.requestAnimationFrame(update);
    window.setTimeout(update, 200);
  });
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
        counters.forEach((counter, index) => animateCounter(counter, 850 + index * 120));
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




