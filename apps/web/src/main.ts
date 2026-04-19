import './style.css';

document.title = 'Hproweb | Création de sites internet professionnels';

const app = mustElement<HTMLDivElement>('#app');
app.innerHTML = `
  <div class="ambient-fluid" id="ambient-fluid" aria-hidden="true"></div>
  <div class="ambient-hail" aria-hidden="true"></div>

  <main class="pro-shell" id="accueil">
    <header class="pro-header reveal">
      <div class="brand">
        <img class="brand-logo" src="/hplogo.png?v=20260419m1" alt="HP logo" />
        <span>Création de sites internet</span>
      </div>
      <nav>
        <a href="#apropos">Accueil</a>
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

        <article
          class="hero-frame"
          data-bg="/coiffure1/appel.png?v=20260419m6"
          style="--hero-bg: url('/coiffure1/appel.png?v=20260419m6');"
        >
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
      <div class="stats-marquee-wrap">
        <div class="stats-marquee">
          <span><em>100%</em> Sites adaptés mobile et PC</span>
          <span><em>24h</em> Pour une première maquette</span>
          <span><em>500</em> Clients accompagnés</span>
          <span><em>24</em> Heures sur 24 en ligne</span>
          <span><em>100%</em> Sites adaptés mobile et PC</span>
          <span><em>24h</em> Pour une première maquette</span>
          <span><em>500</em> Clients accompagnés</span>
          <span><em>24</em> Heures sur 24 en ligne</span>
        </div>
      </div>
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
                <th scope="col">Hproweb (Nous)</th>
                <th scope="col">Achat classique (Agence)</th>
                <th scope="col">Abonnement (Wix / Shopify)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Paiement</th>
                <td>
                  <strong>119.99 EUR</strong>
                  <span class="market-note yes"><span class="market-mark yes" aria-hidden="true">OK</span> Puis 30 EUR tous les 6 mois.</span>
                </td>
                <td>
                  <strong>1500 à plus de 10 000 EUR</strong>
                  <span class="market-note no"><span class="market-mark no" aria-hidden="true">X</span> Paiement unique élevé.</span>
                </td>
                <td>
                  <strong>10 à 500 EUR / mois</strong>
                  <span class="market-note no"><span class="market-mark no" aria-hidden="true">X</span> Revient cher à l'année.</span>
                </td>
              </tr>
              <tr>
                <th scope="row">Propriété du site</th>
                <td><span class="market-state yes"><span class="market-mark yes" aria-hidden="true">OK</span> Oui</span></td>
                <td><span class="market-state yes"><span class="market-mark yes" aria-hidden="true">OK</span> Oui</span></td>
                <td><span class="market-state no"><span class="market-mark no" aria-hidden="true">X</span> Non</span></td>
              </tr>
              <tr>
                <th scope="row">Personnalisation</th>
                <td><span class="market-state yes"><span class="market-mark yes" aria-hidden="true">OK</span> Sur-mesure</span></td>
                <td><span class="market-state yes"><span class="market-mark yes" aria-hidden="true">OK</span> Sur-mesure</span></td>
                <td><span class="market-state no"><span class="market-mark no" aria-hidden="true">X</span> Limitée</span></td>
              </tr>
              <tr>
                <th scope="row">Accompagnement</th>
                <td><span class="market-state yes"><span class="market-mark yes" aria-hidden="true">OK</span> Humain + suivi</span></td>
                <td><span class="market-state warn"><span class="market-mark warn" aria-hidden="true">!</span> Selon budget</span></td>
                <td><span class="market-state no"><span class="market-mark no" aria-hidden="true">X</span> Faible</span></td>
              </tr>
              <tr>
                <th scope="row">Coût maîtrisé à l'année</th>
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
        <p class="market-claim-highlight">Prix clair, image pro et vrai suivi dans la durée.</p>
      </aside>
      <div class="grid">
        <article class="offer-card">
          <p class="offer-tier">Starter</p>
          <h3>Site Essentiel</h3>
          <p class="offer-summary">Un site élégant, rapide et prêt à convertir les visiteurs en clients.</p>
          <div class="offer-pricing">
            <p><span>Création</span><strong><em class="offer-discount">-35%</em> 119.99 EUR</strong></p>
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
          <p class="offer-summary">Un site complet avec espace d'administration et paiement intégré.</p>
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
          <p class="offer-summary">La solution complète pour un site de niveau professionnel.</p>
          <div class="offer-pricing">
            <p><span>Création</span><strong><em class="offer-discount">-35%</em> 549.99 EUR</strong></p>
            <p><span>Entretien</span><strong>120 EUR tous les 6 mois</strong></p>
          </div>
          <ul class="offer-list">
            <li>Comptes admin illimités</li>
            <li>Comptes clients illimités</li>
            <li>Paiement complet intégré + entretien inclus</li>
          </ul>
          <a class="offer-link" href="/devis.html?offer=grand-format">Choisir Grand Format</a>
        </article>
      </div>
    </section>

    <section class="process reveal" id="process">
      <div class="head">
        <p>Méthode</p>
        <h2>Un processus simple, rapide et transparent.</h2>
      </div>
      <ol>
        <li><strong>Diagnostic projet</strong><span>Objectifs, cible, offre et priorités.</span></li>
        <li><strong>Maquette</strong><span>Structure, design et parcours client validés ensemble.</span></li>
        <li><strong>Production</strong><span>Développement sur mesure mobile/tablette/ordinateur.</span></li>
        <li><strong>Mise en ligne</strong><span>Tests finaux, production et accompagnement.</span></li>
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
        <p>Parlons de ton futur site</p>
        <h2>Réservez votre démo maintenant</h2>
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

  const THREE = await import('three');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let width = Math.max(window.innerWidth, 1);
  let height = Math.max(window.innerHeight, 1);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(34, width / height, 0.1, 100);
  camera.position.set(0, 0, 10.6);

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance'
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.35));
  renderer.setSize(width, height, false);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.06;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.domElement.classList.add('ambient-fluid-canvas');
  host.appendChild(renderer.domElement);

  const hemiLight = new THREE.HemisphereLight(0xe8f8ff, 0x3b4d62, 1.14);
  scene.add(hemiLight);

  const keyLight = new THREE.DirectionalLight(0xffffff, 1.05);
  keyLight.position.set(4.8, 3.4, 5.4);
  scene.add(keyLight);

  const fillLight = new THREE.DirectionalLight(0x73c6ff, 0.92);
  fillLight.position.set(-4.2, -1.2, 3.2);
  scene.add(fillLight);

  const mintLight = new THREE.PointLight(0x78e6a7, 9.5, 19, 2);
  mintLight.position.set(-2.6, 1.6, 2.5);
  scene.add(mintLight);

  const warmLight = new THREE.PointLight(0xffba78, 8.8, 18, 2);
  warmLight.position.set(3.6, -0.8, 2.1);
  scene.add(warmLight);

  const fluidGroup = new THREE.Group();
  scene.add(fluidGroup);

  const makeBlobMaterial = (color: number): InstanceType<typeof THREE.MeshPhysicalMaterial> =>
    new THREE.MeshPhysicalMaterial({
      color,
      metalness: 0.52,
      roughness: 0.21,
      transmission: 0.68,
      thickness: 1.7,
      transparent: true,
      opacity: 0.62,
      clearcoat: 1,
      clearcoatRoughness: 0.12,
      envMapIntensity: 1.05
    });

  type FluidBlob = {
    mesh: InstanceType<typeof THREE.Mesh>;
    glow: InstanceType<typeof THREE.Mesh>;
    anchorX: number;
    anchorY: number;
    orbitRadius: number;
    orbitSpeed: number;
    orbitPhase: number;
    floatPhase: number;
    wobbleSpeed: number;
    wobbleAmp: number;
  };

  const createBlob = (config: {
    color: number;
    glow: number;
    radius: number;
    anchorX: number;
    anchorY: number;
    orbitRadius: number;
    orbitSpeed: number;
    wobbleSpeed: number;
    wobbleAmp: number;
  }): FluidBlob => {
    const geometry = new THREE.IcosahedronGeometry(config.radius, 4);
    const mesh = new THREE.Mesh(geometry, makeBlobMaterial(config.color));
    mesh.position.set(config.anchorX, config.anchorY, -1.2);
    fluidGroup.add(mesh);

    const glow = new THREE.Mesh(
      new THREE.SphereGeometry(config.radius * 1.34, 36, 36),
      new THREE.MeshBasicMaterial({
        color: config.glow,
        transparent: true,
        opacity: 0.18,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      })
    );
    glow.position.copy(mesh.position);
    fluidGroup.add(glow);

    return {
      mesh,
      glow,
      anchorX: config.anchorX,
      anchorY: config.anchorY,
      orbitRadius: config.orbitRadius,
      orbitSpeed: config.orbitSpeed,
      orbitPhase: Math.random() * Math.PI * 2,
      floatPhase: Math.random() * Math.PI * 2,
      wobbleSpeed: config.wobbleSpeed,
      wobbleAmp: config.wobbleAmp
    };
  };

  const blobs: FluidBlob[] = [
    createBlob({
      color: 0x78c6ff,
      glow: 0x78c6ff,
      radius: 1.5,
      anchorX: -3.8,
      anchorY: 1.4,
      orbitRadius: 1.2,
      orbitSpeed: 0.24,
      wobbleSpeed: 1.2,
      wobbleAmp: 0.18
    }),
    createBlob({
      color: 0xffbc81,
      glow: 0xffbc81,
      radius: 1.28,
      anchorX: 3.9,
      anchorY: 0.1,
      orbitRadius: 1.05,
      orbitSpeed: 0.3,
      wobbleSpeed: 1.05,
      wobbleAmp: 0.21
    }),
    createBlob({
      color: 0x72dea5,
      glow: 0x72dea5,
      radius: 1.12,
      anchorX: -1.2,
      anchorY: -1.8,
      orbitRadius: 0.92,
      orbitSpeed: 0.34,
      wobbleSpeed: 1.36,
      wobbleAmp: 0.19
    })
  ];

  const ribbonMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x71c4ff,
    metalness: 0.58,
    roughness: 0.22,
    transmission: 0.38,
    clearcoat: 1,
    clearcoatRoughness: 0.16,
    transparent: true,
    opacity: 0.44,
    envMapIntensity: 0.9
  });

  const ribbon = new THREE.Mesh(new THREE.TorusKnotGeometry(2.8, 0.12, 200, 18), ribbonMaterial);
  ribbon.position.set(3.4, -1.4, -3.4);
  ribbon.rotation.set(0.82, 0.2, 0.1);
  fluidGroup.add(ribbon);

  const ribbon2 = new THREE.Mesh(
    new THREE.TorusGeometry(2.2, 0.09, 18, 90),
    new THREE.MeshPhysicalMaterial({
      color: 0x76e6a8,
      metalness: 0.52,
      roughness: 0.24,
      transmission: 0.32,
      transparent: true,
      opacity: 0.36,
      envMapIntensity: 0.76
    })
  );
  ribbon2.position.set(-3.1, 2.2, -3.2);
  ribbon2.rotation.set(0.95, 0.48, -0.35);
  fluidGroup.add(ribbon2);

  const makeTokenSprite = (
    text: string,
    tint: string,
    bg: string,
    widthPx = 340,
    heightPx = 132
  ): { sprite: any; texture: any; material: any } => {
    const canvas = document.createElement('canvas');
    canvas.width = widthPx;
    canvas.height = heightPx;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      const sprite = new THREE.Sprite();
      fluidGroup.add(sprite);
      return { sprite, texture: null, material: null };
    }

    const radius = 22;
    ctx.clearRect(0, 0, widthPx, heightPx);
    ctx.fillStyle = bg;
    ctx.strokeStyle = 'rgba(255,255,255,0.62)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(radius, 0);
    ctx.lineTo(widthPx - radius, 0);
    ctx.quadraticCurveTo(widthPx, 0, widthPx, radius);
    ctx.lineTo(widthPx, heightPx - radius);
    ctx.quadraticCurveTo(widthPx, heightPx, widthPx - radius, heightPx);
    ctx.lineTo(radius, heightPx);
    ctx.quadraticCurveTo(0, heightPx, 0, heightPx - radius);
    ctx.lineTo(0, radius);
    ctx.quadraticCurveTo(0, 0, radius, 0);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    const glow = ctx.createLinearGradient(0, 0, widthPx, 0);
    glow.addColorStop(0, 'rgba(255,255,255,0.54)');
    glow.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, widthPx, heightPx * 0.45);

    ctx.font = '700 48px Sora, Manrope, sans-serif';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.fillStyle = tint;
    ctx.fillText(text, widthPx / 2, heightPx / 2 + 1);

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    const material = new THREE.SpriteMaterial({
      map: texture,
      transparent: true,
      opacity: 0.7,
      depthWrite: false
    });
    const sprite = new THREE.Sprite(material);
    sprite.scale.set(1.85, 0.74, 1);
    fluidGroup.add(sprite);
    return { sprite, texture, material };
  };

  type CodeToken = {
    sprite: any;
    texture: any;
    material: any;
    anchorX: number;
    anchorY: number;
    depth: number;
    speed: number;
    phase: number;
    drift: number;
  };

  const tokenConfigs = [
    { text: '</>', tint: '#89d0ff', bg: 'rgba(10,32,53,0.62)' },
    { text: '{CSS}', tint: '#94efb2', bg: 'rgba(10,38,40,0.6)' },
    { text: 'JS', tint: '#ffd097', bg: 'rgba(54,32,18,0.58)' },
    { text: 'UI', tint: '#89d0ff', bg: 'rgba(10,32,53,0.62)' },
    { text: 'SEO', tint: '#94efb2', bg: 'rgba(10,38,40,0.6)' },
    { text: 'API', tint: '#89d0ff', bg: 'rgba(10,32,53,0.62)' },
    { text: '404', tint: '#ffd097', bg: 'rgba(54,32,18,0.58)' },
    { text: '<HTML>', tint: '#94efb2', bg: 'rgba(10,38,40,0.6)' }
  ];

  const tokens: CodeToken[] = tokenConfigs.map((config, index) => {
    const token = makeTokenSprite(config.text, config.tint, config.bg);
    return {
      ...token,
      anchorX: (index % 4) * 2.2 - 3.2,
      anchorY: Math.floor(index / 4) * -1.9 + 2,
      depth: -3.8 - (index % 3) * 0.5,
      speed: 0.22 + (index % 4) * 0.05,
      phase: Math.random() * Math.PI * 2,
      drift: 0.32 + (index % 3) * 0.08
    };
  });

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

    fluidGroup.position.x += (pointer.x * 0.58 - fluidGroup.position.x) * 0.018;
    fluidGroup.position.y += (pointer.y * -0.42 - progress * 2.8 - fluidGroup.position.y) * 0.018;
    fluidGroup.rotation.z = Math.sin(t * 0.16) * 0.08 + progress * 0.28;

    blobs.forEach((blob, index) => {
      const orbit = t * blob.orbitSpeed + blob.orbitPhase + progress * 2.6;
      blob.mesh.position.x = blob.anchorX + Math.cos(orbit) * blob.orbitRadius;
      blob.mesh.position.y = blob.anchorY + Math.sin(orbit * 0.82 + blob.floatPhase) * 0.82 - progress * 4.3;
      blob.mesh.position.z = -1.7 + Math.cos(orbit * 0.64) * 1.3;

      const sx = 1 + Math.sin(t * blob.wobbleSpeed + blob.floatPhase) * blob.wobbleAmp;
      const sy = 1 + Math.cos(t * blob.wobbleSpeed * 0.8 + blob.floatPhase) * blob.wobbleAmp * 0.7;
      const sz = 1 + Math.sin(t * blob.wobbleSpeed * 0.62 + blob.floatPhase) * blob.wobbleAmp * 0.9;
      blob.mesh.scale.set(sx, sy, sz);
      blob.mesh.rotation.x += 0.0019 + index * 0.0004;
      blob.mesh.rotation.y += 0.0024 + index * 0.0005;

      blob.glow.position.copy(blob.mesh.position);
      blob.glow.scale.copy(blob.mesh.scale).multiplyScalar(1.35);
    });

    ribbon.rotation.y += 0.0014;
    ribbon.rotation.z += 0.0011;
    ribbon.position.y = -1.1 - progress * 3.7 + Math.sin(t * 0.58) * 0.62;
    ribbon.position.x = 3 + Math.cos(t * 0.36) * 0.84;

    ribbon2.rotation.x += 0.001;
    ribbon2.rotation.z -= 0.0012;
    ribbon2.position.y = 2.5 - progress * 3.2 + Math.sin(t * 0.47) * 0.5;
    ribbon2.position.x = -3 + Math.sin(t * 0.4) * 0.7;

    tokens.forEach((token, index) => {
      const orbit = t * token.speed + token.phase + progress * 2.1;
      token.sprite.position.x = token.anchorX + Math.cos(orbit) * token.drift + pointer.x * 0.3;
      token.sprite.position.y = token.anchorY + Math.sin(orbit * 1.16) * 0.48 - progress * 3.7;
      token.sprite.position.z = token.depth + Math.sin(orbit * 0.68) * 0.4;
      const tokenScale = 1 + Math.sin(orbit * 1.3) * 0.08;
      token.sprite.scale.set(1.85 * tokenScale, 0.74 * tokenScale, 1);
      token.sprite.material.opacity = 0.38 + ((Math.sin(orbit + index) + 1) * 0.5) * 0.25;
      token.sprite.material.rotation = Math.sin(orbit * 0.84) * 0.14;
    });

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
    tokens.forEach((token) => {
      token.texture?.dispose?.();
      token.material?.dispose?.();
    });
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




