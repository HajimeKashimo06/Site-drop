import './devis.css';

document.title = 'Hproweb | Demande de devis';

const offers = [
  { id: 'essentiel', label: 'Essentiel' },
  { id: 'pro', label: 'Pro' },
  { id: 'grand-format', label: 'Grand format' }
] as const;

type OfferId = (typeof offers)[number]['id'];

const selectedOffer = resolveOfferFromQuery();

const app = mustElement<HTMLDivElement>('#app');
app.innerHTML = `
  <main class="quote-shell">
    <header class="quote-header">
      <a class="brand-link" href="/index.html">
        <img class="brand-logo" src="/hplogo.png" alt="HP logo" />
        <span>Création de sites internet</span>
      </a>
      <nav>
        <a href="/index.html#offres">Offres</a>
        <a href="/contact.html">Être rappelé</a>
        <a href="/demo-site.html">Démo site</a>
      </nav>
    </header>

    <section class="quote-grid">
      <article class="intro-card">
        <p class="kicker">Demande de devis</p>
        <h1>Parlons de votre projet et de l’offre la plus adaptée.</h1>
        <p>
          Cette demande est envoyée directement à
          <strong>contact@hproweb.fr</strong>.
        </p>
        <ul>
          <li>Réponse rapide et claire</li>
          <li>Validation du pack choisi</li>
          <li>Ajustements possibles selon vos besoins</li>
        </ul>
      </article>

      <section class="form-card" aria-label="Formulaire devis">
        <h2>Votre devis</h2>
        <p>Renseignez vos coordonnées et l’offre souhaitée.</p>
        <form id="quote-form" novalidate>
          <label for="quote-offer">Offre choisie</label>
          <select id="quote-offer" name="offer" required>
            ${offers
              .map(
                (offer) =>
                  `<option value="${offer.id}" ${offer.id === selectedOffer ? 'selected' : ''}>${offer.label}</option>`
              )
              .join('')}
          </select>

          <label for="quote-name">Nom complet</label>
          <input id="quote-name" name="name" type="text" required maxlength="120" autocomplete="name" />

          <label for="quote-email">Email</label>
          <input id="quote-email" name="email" type="email" required maxlength="160" autocomplete="email" />

          <label for="quote-phone">Téléphone</label>
          <input id="quote-phone" name="phone" type="tel" required maxlength="30" autocomplete="tel" />

          <label for="quote-message">Détails du besoin (optionnel)</label>
          <textarea
            id="quote-message"
            name="message"
            maxlength="3000"
            rows="5"
            placeholder="Ajoutez des infos utiles sur votre activité et votre besoin."
          ></textarea>

          <input
            class="honeypot"
            type="text"
            id="quote-website"
            name="website"
            tabindex="-1"
            autocomplete="off"
            aria-hidden="true"
          />

          <label class="consent-row" for="quote-consent">
            <input id="quote-consent" name="consent" type="checkbox" />
            <span>J'accepte d'être contacté au sujet de ma demande de devis.</span>
          </label>

          <button id="quote-submit" type="submit">Envoyer la demande</button>
          <p id="quote-feedback" role="status" aria-live="polite"></p>
        </form>
      </section>
    </section>
  </main>
`;

const form = mustElement<HTMLFormElement>('#quote-form');
const feedback = mustElement<HTMLParagraphElement>('#quote-feedback');
const submitButton = mustElement<HTMLButtonElement>('#quote-submit');
const consentCheckbox = mustElement<HTMLInputElement>('#quote-consent');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  feedback.textContent = '';
  feedback.className = '';

  if (!consentCheckbox.checked) {
    setFeedback("Vous devez accepter d'être contacté pour envoyer la demande.", 'error');
    return;
  }

  const formData = new FormData(form);
  const payload = {
    offer: getString(formData, 'offer'),
    name: getString(formData, 'name'),
    phone: getString(formData, 'phone'),
    email: getString(formData, 'email'),
    message: getString(formData, 'message'),
    website: getString(formData, 'website'),
    sourcePage: window.location.pathname
  };

  if (!payload.offer || !payload.name || !payload.phone || !payload.email) {
    setFeedback('Offre, nom, téléphone et email sont obligatoires.', 'error');
    return;
  }

  submitButton.disabled = true;

  try {
    const response = await fetch('/api/quote-request', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = (await response.json().catch(() => null)) as { message?: unknown; error?: unknown } | null;
    if (!response.ok) {
      const errorMessage =
        data && typeof data.error === 'string' && data.error.trim() ? data.error : 'Envoi impossible pour le moment.';
      setFeedback(errorMessage, 'error');
      return;
    }

    const okMessage =
      data && typeof data.message === 'string' && data.message.trim()
        ? data.message
        : 'Votre demande de devis a bien été envoyée.';
    setFeedback(okMessage, 'success');
    form.reset();
    mustElement<HTMLSelectElement>('#quote-offer').value = selectedOffer;
  } catch {
    setFeedback('Erreur réseau. Veuillez réessayer dans un instant.', 'error');
  } finally {
    submitButton.disabled = false;
  }
});

function resolveOfferFromQuery(): OfferId {
  const param = new URLSearchParams(window.location.search).get('offer') ?? '';
  const normalized = param.trim().toLowerCase();
  return offers.some((offer) => offer.id === normalized) ? (normalized as OfferId) : 'essentiel';
}

function setFeedback(message: string, tone: 'success' | 'error'): void {
  feedback.textContent = message;
  feedback.className = tone;
}

function getString(formData: FormData, field: string): string {
  const value = formData.get(field);
  return typeof value === 'string' ? value.trim() : '';
}

function mustElement<T extends Element>(selector: string): T {
  const node = document.querySelector<T>(selector);
  if (!node) {
    throw new Error(`Missing element: ${selector}`);
  }
  return node;
}
