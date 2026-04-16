import './page-test.css';

type ServiceCategory = {
  title: string;
  items: Array<{
    name: string;
    price: string;
  }>;
};

type OpeningDay = {
  label: string;
  dayIndex: number;
  ranges: Array<{
    start: string;
    end: string;
  }>;
};

const salonName = 'Best Hair';

const galleryImages = [
  { src: '/besthair/photo4.png', alt: 'Devanture du salon Best Hair' },
  { src: '/besthair/photo1.png', alt: 'Coupe en cours par le barbier' },
  { src: '/besthair/photo3.png', alt: 'Poste de coupe et matériel professionnel' },
  { src: '/besthair/photo2.png', alt: 'Produits de coiffure présentés au salon' }
];

const serviceCategories: ServiceCategory[] = [
  {
    title: 'Salon de coiffure',
    items: [
      { name: 'Cheveux frisés', price: '12,00 EUR' },
      { name: 'Colorations capillaires', price: 'Voir sur place' },
      { name: 'Extensions de cheveux', price: 'Voir sur place' }
    ]
  },
  {
    title: 'Barbier',
    items: [
      { name: 'Coupe aux ciseaux', price: '15,00 EUR' },
      { name: 'Coupe en dégradé', price: '5,00 EUR' },
      { name: 'Coupe rasée', price: '12,00 EUR' },
      { name: 'Rasage', price: '10,00 EUR' },
      { name: 'Rasage au coupe-choux', price: '10,00 EUR' },
      { name: 'Rasage du crâne', price: '12,00 EUR' },
      { name: 'Traitement revitalisant pour barbe', price: '10,00 EUR' }
    ]
  }
];

const openingDays: OpeningDay[] = [
  { label: 'Lundi', dayIndex: 1, ranges: [{ start: '14:00', end: '19:30' }] },
  {
    label: 'Mardi',
    dayIndex: 2,
    ranges: [
      { start: '10:00', end: '13:00' },
      { start: '14:00', end: '19:30' }
    ]
  },
  {
    label: 'Mercredi',
    dayIndex: 3,
    ranges: [
      { start: '10:00', end: '13:00' },
      { start: '14:00', end: '19:30' }
    ]
  },
  {
    label: 'Jeudi',
    dayIndex: 4,
    ranges: [
      { start: '10:00', end: '13:00' },
      { start: '14:00', end: '19:30' }
    ]
  },
  {
    label: 'Vendredi',
    dayIndex: 5,
    ranges: [
      { start: '10:00', end: '13:00' },
      { start: '14:00', end: '19:30' }
    ]
  },
  { label: 'Samedi', dayIndex: 6, ranges: [{ start: '10:00', end: '19:30' }] },
  { label: 'Dimanche', dayIndex: 0, ranges: [] }
];

const openingByDayIndex = new Map(openingDays.map((day) => [day.dayIndex, day]));

document.title = `${salonName} | Page test client`;

const app = mustElement<HTMLDivElement>('#app');
app.innerHTML = `
  <main class="site-shell" id="accueil">
    <header class="topbar reveal">
      <a class="brand" href="#accueil" aria-label="Retour accueil">
        <div class="brand-media">
          <img class="mascot mascot-left" src="/besthair/barber.png" alt="" aria-hidden="true" />
          <img class="brand-logo" src="/besthair/logo.png" alt="Logo Best Hair" />
          <img class="mascot mascot-right" src="/besthair/barber.png" alt="" aria-hidden="true" />
        </div>
        <div class="brand-copy">
          <p>Best Hair</p>
          <span>Coiffeur - Barbier</span>
        </div>
      </a>
      <nav>
        <a href="/">Accueil pro</a>
        <a href="#services">Services</a>
        <a href="#horaires">Horaires</a>
        <a class="book-link" href="#reserver">Réserver</a>
        <a href="#avis">Avis</a>
      </nav>
    </header>

    <section class="hero reveal">
      <article>
        <p class="hero-tagline">L'un des salons les mieux notés à Nantes</p>
        <h1>Best Hair
          <span>4,9/5 - 187 avis vérifiés</span>
        </h1>
        <div class="hero-badges" aria-label="Points forts du salon">
          <span>Coiffeur-barbier premium</span>
          <span>Réservation rapide</span>
          <span>Ouvert à partir de 10:00 le vendredi</span>
        </div>
        <p class="hero-stars" aria-hidden="true">&#9733;&#9733;&#9733;&#9733;&#9733;</p>
        <div class="home-photos">
          ${galleryImages
            .map(
              (image) => `
            <button type="button" class="home-photo-trigger home-photo-tile" data-src="${image.src}" data-alt="${image.alt}" aria-label="Ouvrir la photo">
              <img src="${image.src}" alt="${image.alt}" loading="lazy" />
            </button>
          `
            )
            .join('')}
        </div>
        <div class="hero-actions">
          <a href="#reserver" class="primary-btn">Prendre rendez-vous</a>
          <a href="#services" class="ghost-btn">Voir les services</a>
        </div>
      </article>

      <figure class="hero-photo">
        <img src="/besthair/photo1.png" alt="Coupe en cours par le barbier" loading="eager" />
      </figure>
    </section>

    <section class="services reveal" id="services">
      <div class="section-head">
        <p>Tarifs</p>
        <h2>Services du salon</h2>
      </div>
      <div class="service-grid">
        ${serviceCategories
          .map(
            (category) => `
          <article class="service-card">
            <h3>${category.title}</h3>
            <ul>
              ${category.items
                .map(
                  (item) => `
                <li>
                  <span>${item.name}</span>
                  <strong>${item.price}</strong>
                </li>
              `
                )
                .join('')}
            </ul>
          </article>
        `
          )
          .join('')}
      </div>
    </section>

    <section class="hours reveal" id="horaires">
      <div class="section-head">
        <p>Ouverture</p>
        <h2>Horaires du salon</h2>
      </div>
      <div class="hours-grid">
        ${openingDays
          .map((day) => {
            const schedule = day.ranges.length
              ? day.ranges.map((range) => `${range.start} - ${range.end}`).join(' / ')
              : 'Ferme';
            return `<article><h3>${day.label}</h3><p>${schedule}</p></article>`;
          })
          .join('')}
      </div>
    </section>

    <section class="booking reveal" id="reserver">
      <div class="section-head">
        <p>Réservation</p>
        <h2>Choisissez votre créneau</h2>
      </div>
      <div class="booking-panel">
        <form id="booking-form" novalidate>
          <label>
            Date
            <input type="date" id="booking-date" name="date" required />
          </label>

          <p class="slot-title">Créneaux disponibles</p>
          <div class="slot-list" id="slot-list"></div>
          <input type="hidden" id="booking-slot" name="slot" required />

          <label>
            Service
            <select name="service" required>
              <option value="">Choisir un service</option>
              ${serviceCategories
                .flatMap((category) => category.items.map((item) => `<option value="${item.name}">${item.name}</option>`))
                .join('')}
            </select>
          </label>

          <div class="field-row">
            <label>
              Nom
              <input type="text" name="name" placeholder="Votre nom" required />
            </label>
            <label>
              Téléphone
              <input type="tel" name="phone" placeholder="06 00 00 00 00" required />
            </label>
          </div>

          <button type="submit" class="primary-btn full">Confirmer la demande</button>
          <p id="booking-feedback" class="booking-feedback" aria-live="polite"></p>
        </form>

        <aside>
          <img src="/besthair/logo.png" alt="Logo Best Hair" loading="lazy" />
          <p>Best Hair</p>
          <span>Coiffeur - Barbier</span>
        </aside>
      </div>
    </section>

    <section class="reviews reveal" id="avis">
      <div class="section-head">
        <p>Avis client</p>
        <h2>Barème de satisfaction client</h2>
      </div>
      <article class="review-card">
        <div class="review-header">
          <h3>Coiffeur Best Hair</h3>
          <p>Salon de coiffure - Nantes</p>
        </div>
        <div class="review-rating" aria-label="Note 4,9 sur 5">
          <p class="review-score">4,9</p>
          <p class="stars" aria-hidden="true">&#9733;&#9733;&#9733;&#9733;&#9733;</p>
          <p class="review-count">(187 avis)</p>
        </div>
        <div class="review-legend" aria-label="Niveau de satisfaction">
          <span class="review-pill">Niveau: Incroyable</span>
          <span class="review-pill">Moyenne générale: 4,9 / 5</span>
        </div>
        <div class="review-scale" aria-label="Barème de notes">
          <div class="scale-row">
            <span>5 étoiles</span>
            <div class="scale-track"><i style="width: 94%"></i></div>
            <strong>94%</strong>
          </div>
          <div class="scale-row">
            <span>4 étoiles</span>
            <div class="scale-track"><i style="width: 5%"></i></div>
            <strong>5%</strong>
          </div>
          <div class="scale-row">
            <span>3 étoiles</span>
            <div class="scale-track"><i style="width: 1%"></i></div>
            <strong>1%</strong>
          </div>
          <div class="scale-row">
            <span>2 étoiles</span>
            <div class="scale-track"><i style="width: 0.5%"></i></div>
            <strong>&lt;1%</strong>
          </div>
          <div class="scale-row">
            <span>1 étoile</span>
            <div class="scale-track"><i style="width: 0.5%"></i></div>
            <strong>&lt;1%</strong>
          </div>
        </div>
        <div class="review-info">
          <span>Ferme</span>
          <span>Ouvre à 10:00 vendredi</span>
          <a href="tel:+33666734713">06 66 73 47 13</a>
        </div>
      </article>
    </section>

    <div class="photo-lightbox" id="photo-lightbox" hidden>
      <button type="button" class="lightbox-close" id="lightbox-close" aria-label="Fermer">Fermer</button>
      <img id="lightbox-image" src="" alt="" />
    </div>
  </main>
`;

setupRevealAnimation();
setupBookingForm();
setupPhotoLightbox();
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

function setupBookingForm(): void {
  const form = mustElement<HTMLFormElement>('#booking-form');
  const dateInput = mustElement<HTMLInputElement>('#booking-date');
  const slotList = mustElement<HTMLElement>('#slot-list');
  const slotInput = mustElement<HTMLInputElement>('#booking-slot');
  const feedback = mustElement<HTMLElement>('#booking-feedback');

  dateInput.min = toIsoDate(new Date());
  dateInput.value = findNextOpenDate();

  const refreshSlots = () => {
    renderSlots(slotList, slotInput, feedback, dateInput.value);
  };

  dateInput.addEventListener('change', refreshSlots);
  refreshSlots();

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      feedback.textContent = 'Merci de remplir tous les champs.';
      feedback.className = 'booking-feedback error';
      return;
    }

    const formData = new FormData(form);
    const name = String(formData.get('name') ?? '').trim();
    const phone = String(formData.get('phone') ?? '').trim();
    const service = String(formData.get('service') ?? '').trim();
    const slot = String(formData.get('slot') ?? '').trim();
    const date = String(formData.get('date') ?? '').trim();

    if (!slot) {
      feedback.textContent = 'Sélectionnez un créneau avant de confirmer.';
      feedback.className = 'booking-feedback error';
      return;
    }

    feedback.textContent = `Demande envoyée: ${name}, ${service}, le ${formatDate(date)} à ${slot}. Nous vous rappelons au ${phone}.`;
    feedback.className = 'booking-feedback success';
    form.reset();
    dateInput.value = findNextOpenDate();
    slotInput.value = '';
    refreshSlots();
  });
}

function setupPhotoLightbox(): void {
  const lightbox = mustElement<HTMLElement>('#photo-lightbox');
  const lightboxImage = mustElement<HTMLImageElement>('#lightbox-image');
  const closeButton = mustElement<HTMLButtonElement>('#lightbox-close');
  const triggers = Array.from(document.querySelectorAll<HTMLButtonElement>('.home-photo-trigger'));

  const close = () => {
    lightbox.hidden = true;
    document.body.style.overflow = '';
  };

  const open = (src: string, alt: string) => {
    lightboxImage.src = src;
    lightboxImage.alt = alt;
    lightbox.hidden = false;
    document.body.style.overflow = 'hidden';
  };

  triggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      open(trigger.dataset.src ?? '', trigger.dataset.alt ?? '');
    });
  });

  closeButton.addEventListener('click', close);
  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) {
      close();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !lightbox.hidden) {
      close();
    }
  });
}

function setupCenteredTabs(): void {
  const tabLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>('.topbar nav a[href^="#"]'));

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

function renderSlots(slotList: HTMLElement, slotInput: HTMLInputElement, feedback: HTMLElement, isoDate: string): void {
  const date = new Date(`${isoDate}T12:00:00`);
  const day = Number.isNaN(date.getTime()) ? null : openingByDayIndex.get(date.getDay()) ?? null;
  const slots = day ? day.ranges.flatMap((range) => createSlots(range.start, range.end, 30)) : [];

  slotInput.value = '';

  if (slots.length === 0) {
    slotList.innerHTML = '<p class="slots-empty">Salon fermé ce jour-là. Choisissez une autre date.</p>';
    feedback.textContent = '';
    feedback.className = 'booking-feedback';
    return;
  }

  slotList.innerHTML = slots
    .map((slot) => `<button type="button" class="slot-btn" data-slot="${slot}">${slot}</button>`)
    .join('');

  const buttons = Array.from(slotList.querySelectorAll<HTMLButtonElement>('.slot-btn'));
  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      buttons.forEach((item) => item.classList.remove('is-active'));
      button.classList.add('is-active');
      slotInput.value = button.dataset.slot ?? '';
      feedback.textContent = '';
      feedback.className = 'booking-feedback';
    });
  });
}

function createSlots(start: string, end: string, step: number): string[] {
  const startMinutes = toMinutes(start);
  const endMinutes = toMinutes(end);
  const slots: string[] = [];

  for (let time = startMinutes; time + step <= endMinutes; time += step) {
    slots.push(fromMinutes(time));
  }

  return slots;
}

function toMinutes(value: string): number {
  const [hoursRaw, minutesRaw] = value.split(':');
  const hours = Number(hoursRaw ?? '0');
  const minutes = Number(minutesRaw ?? '0');
  return hours * 60 + minutes;
}

function fromMinutes(value: number): string {
  const hours = Math.floor(value / 60)
    .toString()
    .padStart(2, '0');
  const minutes = (value % 60).toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}

function findNextOpenDate(): string {
  const probe = new Date();
  for (let index = 0; index < 14; index += 1) {
    const day = openingByDayIndex.get(probe.getDay());
    if (day && day.ranges.length > 0) {
      return toIsoDate(probe);
    }
    probe.setDate(probe.getDate() + 1);
  }
  return toIsoDate(new Date());
}

function formatDate(isoDate: string): string {
  const value = new Date(`${isoDate}T12:00:00`);
  if (Number.isNaN(value.getTime())) {
    return isoDate;
  }
  return new Intl.DateTimeFormat('fr-FR', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  }).format(value);
}

function toIsoDate(date: Date): string {
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60_000);
  return local.toISOString().slice(0, 10);
}

function mustElement<T extends Element>(selector: string): T {
  const node = document.querySelector<T>(selector);
  if (!node) {
    throw new Error(`Missing element: ${selector}`);
  }
  return node;
}


