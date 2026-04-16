import { gsap } from 'gsap';
import './style.css';

type ProductImage = {
  src: string;
  alt: string;
};

const company = 'Lamaisonduglacon';

const product = {
  displayName: 'Machine a glacons Signature',
  heroName: "L'AURORE",
  sentence: 'On prefere servir plutot que faire attendre.',
  subtitle: 'Edition ambree',
  description:
    'Un seul produit, une promesse claire: des glacons rapides, une finition premium et une presence elegante dans votre cuisine ou vos receptions.',
  price: '349 EUR',
  cta: 'Commander',
  shipping: 'Livraison offerte - stock limite'
};

const productImages: ProductImage[] = [
  { src: '/myproduct/images/1.png', alt: 'Machine a glacons vue principale' },
  { src: '/myproduct/images/image_001.png', alt: 'Machine a glacons sur plan de travail' },
  { src: '/myproduct/images/image_002.jpg', alt: 'Machine a glacons en contexte' },
  { src: '/myproduct/images/image_003.jpg', alt: 'Detail machine a glacons' },
  { src: '/myproduct/images/image_004.jpg', alt: 'Machine a glacons usage cocktail' },
  { src: '/myproduct/images/image_005.jpg', alt: 'Machine a glacons et accessoires' },
  { src: '/myproduct/images/image_006.jpg', alt: 'Machine a glacons detail design' }
];

const firstImage = productImages[0];
if (!firstImage) {
  throw new Error('Missing product images');
}

document.title = `${company} | ${product.displayName}`;

const app = mustElement<HTMLDivElement>('#app');
app.innerHTML = `
  <main class="landing">
    <div class="backdrop" aria-hidden="true"></div>

    <header class="nav" data-reveal>
      <div class="logo-wrap">
        <span class="logo-dot" aria-hidden="true"></span>
        <p class="logo">${company}</p>
      </div>
      <nav>
        <a href="#hero">Accueil</a>
        <a href="#product">Le produit</a>
        <a href="#details">Details</a>
        <a href="#order">Commander</a>
      </nav>
    </header>

    <section class="hero" id="hero" data-reveal>
      <div class="hero-left">
        <p class="hero-brand">${company}</p>
        <h1>${product.heroName}</h1>
        <p class="hero-script">${product.sentence}</p>
        <div class="hero-line" aria-hidden="true"></div>

        <figure class="product-frame" id="product-frame">
          <img id="hero-image" src="${firstImage.src}" alt="${firstImage.alt}" />
        </figure>
      </div>

      <aside class="hero-card" id="product">
        <p class="card-kicker">Produit unique</p>
        <h2>${product.displayName}</h2>
        <p class="card-subtitle">${product.subtitle}</p>
        <p class="card-text">${product.description}</p>

        <ul>
          <li>Cycle de glacons en 6 a 9 minutes</li>
          <li>Production jusqu a 12 kg par jour</li>
          <li>Mode autonettoyant + panneau LED</li>
        </ul>

        <div class="card-footer" id="order">
          <p class="price">${product.price}</p>
          <button class="cta" id="checkout-button" type="button">${product.cta}</button>
        </div>
        <p class="shipping">${product.shipping}</p>
        <p class="checkout-feedback" id="checkout-feedback" aria-live="polite"></p>
      </aside>
    </section>

    <section class="thumbs" id="details" data-reveal></section>

    <section class="specs" data-reveal>
      <article>
        <p class="spec-value">120 W</p>
        <p class="spec-label">Puissance maitrisee</p>
      </article>
      <article>
        <p class="spec-value">12 kg</p>
        <p class="spec-label">Production par jour</p>
      </article>
      <article>
        <p class="spec-value">Auto-clean</p>
        <p class="spec-label">Entretien simplifie</p>
      </article>
    </section>
  </main>
`;

renderThumbnails(productImages);
setupReveal();
setupImageSwitch(productImages);
setupParallax();
setupCheckout();
showCheckoutStatusFromQuery();

function renderThumbnails(images: ProductImage[]): void {
  const thumbs = mustElement<HTMLElement>('.thumbs');
  thumbs.innerHTML = images
    .map(
      (image, index) => `
      <button class="thumb${index === 0 ? ' is-active' : ''}" type="button" data-index="${index}" aria-label="Image ${index + 1}">
        <img src="${image.src}" alt="" loading="lazy" />
      </button>
    `
    )
    .join('');
}

function setupReveal(): void {
  gsap.set('[data-reveal]', { autoAlpha: 0, y: 26 });
  gsap.to('[data-reveal]', {
    autoAlpha: 1,
    y: 0,
    duration: 0.9,
    ease: 'power3.out',
    stagger: 0.14
  });
}

function setupImageSwitch(images: ProductImage[]): void {
  const heroImage = mustElement<HTMLImageElement>('#hero-image');
  const thumbs = Array.from(document.querySelectorAll<HTMLButtonElement>('.thumb'));

  thumbs.forEach((thumb) => {
    thumb.addEventListener('click', () => {
      const index = Number(thumb.dataset.index ?? '0');
      const image = images[index];
      if (!image) {
        return;
      }

      heroImage.src = image.src;
      heroImage.alt = image.alt;

      thumbs.forEach((item) => item.classList.remove('is-active'));
      thumb.classList.add('is-active');

      gsap.fromTo(
        heroImage,
        { autoAlpha: 0.55, scale: 0.97, rotate: -3 },
        { autoAlpha: 1, scale: 1, rotate: -8, duration: 0.36, ease: 'power2.out' }
      );
    });
  });
}

function setupParallax(): void {
  const frame = mustElement<HTMLElement>('#product-frame');
  frame.addEventListener('pointermove', (event) => {
    const rect = frame.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    gsap.to(frame, {
      rotateX: -y * 7,
      rotateY: x * 9,
      transformPerspective: 900,
      duration: 0.36,
      ease: 'power2.out'
    });
  });

  frame.addEventListener('pointerleave', () => {
    gsap.to(frame, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: 'power2.out'
    });
  });
}

function setupCheckout(): void {
  const checkoutButton = mustElement<HTMLButtonElement>('#checkout-button');
  const feedback = mustElement<HTMLElement>('#checkout-feedback');
  const apiBaseUrl = import.meta.env.VITE_API_URL?.replace(/\/$/, '') ?? '';
  const endpoint = apiBaseUrl ? `${apiBaseUrl}/api/create-checkout-session` : '/api/create-checkout-session';

  checkoutButton.addEventListener('click', async () => {
    const originalButtonLabel = checkoutButton.textContent ?? product.cta;

    checkoutButton.disabled = true;
    checkoutButton.textContent = 'Redirection...';
    feedback.textContent = '';
    feedback.classList.remove('is-success', 'is-error');

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        }
      });

      const payload = (await response.json()) as { error?: string; url?: string };
      if (!response.ok) {
        throw new Error(payload.error ?? 'Erreur lors de la creation de la session Stripe.');
      }

      if (!payload.url) {
        throw new Error('Aucune URL Stripe recue.');
      }

      window.location.assign(payload.url);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erreur de paiement.';
      feedback.textContent = message;
      feedback.classList.add('is-error');
      checkoutButton.disabled = false;
      checkoutButton.textContent = originalButtonLabel;
    }
  });
}

function showCheckoutStatusFromQuery(): void {
  const feedback = mustElement<HTMLElement>('#checkout-feedback');
  const params = new URLSearchParams(window.location.search);
  const checkoutStatus = params.get('checkout');

  if (checkoutStatus === 'success') {
    feedback.textContent = 'Paiement valide. Votre commande test est confirmee.';
    feedback.classList.add('is-success');
  }

  if (checkoutStatus === 'canceled') {
    feedback.textContent = 'Paiement annule. Vous pouvez reessayer quand vous voulez.';
    feedback.classList.add('is-error');
  }

  if (checkoutStatus) {
    params.delete('checkout');
    const query = params.toString();
    const nextUrl = query ? `${window.location.pathname}?${query}` : window.location.pathname;
    window.history.replaceState({}, '', nextUrl);
  }
}

function mustElement<T extends Element>(selector: string): T {
  const element = document.querySelector<T>(selector);
  if (!element) {
    throw new Error(`Missing element: ${selector}`);
  }
  return element;
}
