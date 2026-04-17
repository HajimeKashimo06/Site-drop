import './contact.css';

document.title = 'Hproweb | Être rappelé';

const app = mustElement<HTMLDivElement>('#app');
app.innerHTML = `
  <main class="contact-shell">
    <header class="contact-header">
      <a class="brand-link" href="/index.html">
        <img class="brand-logo" src="/hplogo.png" alt="HP logo" />
        <span>Création de sites internet</span>
      </a>
      <nav>
        <a href="/index.html#offres">Offres</a>
        <a href="/index.html#process">Méthode</a>
        <a href="/demo-site.html">Démo site</a>
        <a href="/admin.html">Connexion</a>
      </nav>
    </header>

    <section class="contact-grid">
      <article class="intro-card">
        <p class="kicker">Demande de rappel</p>
        <h1>Laissez vos coordonnées et nous vous contactons rapidement.</h1>
        <p>
          Ce formulaire envoie votre demande directement à l'adresse
          <strong>contact@hproweb.fr</strong>.
        </p>
        <ul>
          <li>Réservation de démo 100% gratuite</li>
          <li>Réponse sous 24h en général</li>
          <li>Échange clair sur vos besoins</li>
          <li>Aucun engagement au premier contact</li>
        </ul>
      </article>

      <section class="form-card" aria-label="Fiche contact">
        <h2>Fiche contact</h2>
        <p>Complétez les champs puis cliquez sur Envoyer. La réservation de démo est gratuite.</p>
        <form id="callback-form" novalidate>
          <label for="contact-name">Nom complet</label>
          <input id="contact-name" name="name" type="text" required maxlength="120" autocomplete="name" />

          <label for="contact-phone">Téléphone</label>
          <input id="contact-phone" name="phone" type="tel" required maxlength="30" autocomplete="tel" />

          <label for="contact-email">Email</label>
          <input id="contact-email" name="email" type="email" required maxlength="160" autocomplete="email" />

          <label for="contact-company">Société (optionnel)</label>
          <input id="contact-company" name="company" type="text" maxlength="160" autocomplete="organization" />

          <label for="contact-window">Plage de rappel (optionnel)</label>
          <input
            id="contact-window"
            name="preferredWindow"
            type="text"
            maxlength="120"
            placeholder="Ex: mardi 14h-16h"
          />

          <label for="contact-subject">Sujet (optionnel)</label>
          <input id="contact-subject" name="subject" type="text" maxlength="140" />

          <label for="contact-message">Message</label>
          <textarea
            id="contact-message"
            name="message"
            required
            minlength="10"
            maxlength="3000"
            rows="5"
            placeholder="Décrivez votre besoin en quelques lignes."
          ></textarea>

          <input
            class="honeypot"
            type="text"
            id="contact-website"
            name="website"
            tabindex="-1"
            autocomplete="off"
            aria-hidden="true"
          />

          <label class="consent-row" for="contact-consent">
            <input id="contact-consent" name="consent" type="checkbox" />
            <span>J'accepte d'être contacté au sujet de ma demande.</span>
          </label>

          <button id="contact-submit" type="submit">Envoyer la demande</button>
          <p id="contact-feedback" role="status" aria-live="polite"></p>
        </form>
      </section>
    </section>
  </main>
`;

const form = mustElement<HTMLFormElement>('#callback-form');
const feedback = mustElement<HTMLParagraphElement>('#contact-feedback');
const submitButton = mustElement<HTMLButtonElement>('#contact-submit');
const consentCheckbox = mustElement<HTMLInputElement>('#contact-consent');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  feedback.textContent = '';
  feedback.className = '';

  if (!consentCheckbox.checked) {
    setFeedback('Vous devez accepter d’être contacté pour envoyer la demande.', 'error');
    return;
  }

  const formData = new FormData(form);
  const payload = {
    name: getString(formData, 'name'),
    phone: getString(formData, 'phone'),
    email: getString(formData, 'email'),
    company: getString(formData, 'company'),
    subject: getString(formData, 'subject'),
    preferredWindow: getString(formData, 'preferredWindow'),
    message: getString(formData, 'message'),
    website: getString(formData, 'website'),
    sourcePage: window.location.pathname
  };

  if (!payload.name || !payload.phone || !payload.email || !payload.message) {
    setFeedback('Nom, téléphone, email et message sont obligatoires.', 'error');
    return;
  }

  submitButton.disabled = true;

  try {
    const response = await fetch('/api/contact-request', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = (await response.json().catch(() => null)) as { message?: unknown; error?: unknown } | null;
    if (!response.ok) {
      const errorMessage =
        data && typeof data.error === 'string' && data.error.trim()
          ? data.error
          : 'Envoi impossible pour le moment.';
      setFeedback(errorMessage, 'error');
      return;
    }

    const okMessage =
      data && typeof data.message === 'string' && data.message.trim()
        ? data.message
        : 'Demande envoyée. Merci.';
    setFeedback(okMessage, 'success');
    form.reset();
  } catch {
    setFeedback('Erreur réseau. Veuillez réessayer dans un instant.', 'error');
  } finally {
    submitButton.disabled = false;
  }
});

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
