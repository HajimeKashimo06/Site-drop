import './demo-site.css';

const FALLBACK_TARGET_PATH = '/page-test.html';

document.title = 'Hproweb | Connexion démo site';

const app = mustElement<HTMLDivElement>('#app');
app.innerHTML = `
  <main class="login-shell">
    <header class="login-header reveal">
      <div class="brand">
        <img class="brand-logo" src="/hplogo.png" alt="HP logo" />
        <span>Création de sites internet</span>
      </div>
      <div class="header-actions">
        <a class="back-link" href="/">Retour accueil</a>
        <a class="reserve-link" href="/contact.html">Réserver votre démo</a>
      </div>
    </header>

    <section class="login-hero reveal">
      <article>
        <p class="kicker">Démo site</p>
        <h1>Connexion au site client</h1>
        <p class="lead">
          Entrez les identifiants que vous avez créés pour ouvrir votre site dédié.
        </p>
      </article>

      <form id="login-form" class="login-card" novalidate>
        <label for="login-username">Identifiant</label>
        <input
          id="login-username"
          name="username"
          type="text"
          autocomplete="username"
          placeholder="Entrez votre identifiant"
          required
        />

        <label for="login-password">Mot de passe</label>
        <input
          id="login-password"
          name="password"
          type="password"
          autocomplete="current-password"
          placeholder="Entrez votre mot de passe"
          required
        />

        <button type="submit">Se connecter</button>
        <a id="open-site-link" class="secondary-btn" href="${FALLBACK_TARGET_PATH}" hidden>Ouvrir mon site</a>
        <button id="logout-btn" class="secondary-btn" type="button" hidden>Se déconnecter</button>
        <p id="login-feedback" class="login-feedback" aria-live="polite"></p>
      </form>
    </section>
  </main>
`;

setupRevealAnimation();
void bootstrapAuth();

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

async function bootstrapAuth(): Promise<void> {
  const feedback = mustElement<HTMLElement>('#login-feedback');
  const openSiteLink = mustElement<HTMLAnchorElement>('#open-site-link');
  const logoutButton = mustElement<HTMLButtonElement>('#logout-btn');

  const session = await getSession();
  if (session.authenticated) {
    const redirectPath = resolveRedirectPath(session.redirectPath);
    openSiteLink.href = redirectPath;
    openSiteLink.hidden = false;
    logoutButton.hidden = false;
    feedback.textContent = 'Session déjà active. Vous pouvez ouvrir votre site ou vous déconnecter.';
    feedback.className = 'login-feedback success';
  }

  setupLoginForm();
}

function setupLoginForm(): void {
  const form = mustElement<HTMLFormElement>('#login-form');
  const submitButton = mustElement<HTMLButtonElement>('#login-form button[type="submit"]');
  const openSiteLink = mustElement<HTMLAnchorElement>('#open-site-link');
  const logoutButton = mustElement<HTMLButtonElement>('#logout-btn');
  const feedback = mustElement<HTMLElement>('#login-feedback');

  logoutButton.addEventListener('click', async () => {
    logoutButton.disabled = true;
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
      });
      openSiteLink.hidden = true;
      logoutButton.hidden = true;
      feedback.textContent = 'Session fermée. Vous pouvez vous reconnecter.';
      feedback.className = 'login-feedback success';
    } catch {
      feedback.textContent = 'Déconnexion impossible pour le moment.';
      feedback.className = 'login-feedback error';
    } finally {
      logoutButton.disabled = false;
    }
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      feedback.textContent = 'Merci de remplir tous les champs.';
      feedback.className = 'login-feedback error';
      return;
    }

    const data = new FormData(form);
    const username = String(data.get('username') ?? '').trim();
    const password = String(data.get('password') ?? '').trim();

    submitButton.disabled = true;

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      const payload = await readJsonResponse(response);
      if (response.ok) {
        const redirectPath = resolveRedirectPath(payload?.redirectPath);
        feedback.textContent = 'Connexion validée. Redirection en cours...';
        feedback.className = 'login-feedback success';
        openSiteLink.href = redirectPath;
        openSiteLink.hidden = false;
        logoutButton.hidden = false;
        window.setTimeout(() => {
          window.location.assign(redirectPath);
        }, 250);
        return;
      }

      const errorMessage = typeof payload?.error === 'string' ? payload.error : 'Identifiant ou mot de passe invalide.';
      feedback.textContent = errorMessage;
      feedback.className = 'login-feedback error';
    } catch {
      feedback.textContent = 'Connexion impossible pour le moment. Réessayez.';
      feedback.className = 'login-feedback error';
    } finally {
      submitButton.disabled = false;
    }
  });
}

async function getSession(): Promise<{ authenticated: boolean; redirectPath: string | null }> {
  try {
    const response = await fetch('/api/auth/session', {
      method: 'GET',
      credentials: 'include'
    });
    if (!response.ok) {
      return { authenticated: false, redirectPath: null };
    }
    const payload = (await response.json()) as { authenticated?: boolean; redirectPath?: unknown };
    return {
      authenticated: payload.authenticated === true,
      redirectPath: typeof payload.redirectPath === 'string' ? payload.redirectPath : null
    };
  } catch {
    return { authenticated: false, redirectPath: null };
  }
}

function resolveRedirectPath(rawPath: unknown): string {
  if (typeof rawPath !== 'string') {
    return FALLBACK_TARGET_PATH;
  }
  if (!rawPath.startsWith('/')) {
    return FALLBACK_TARGET_PATH;
  }
  return rawPath;
}

async function readJsonResponse(response: Response): Promise<Record<string, unknown> | null> {
  try {
    const payload = (await response.json()) as Record<string, unknown>;
    return payload;
  } catch {
    return null;
  }
}

function mustElement<T extends Element>(selector: string): T {
  const node = document.querySelector<T>(selector);
  if (!node) {
    throw new Error(`Missing element: ${selector}`);
  }
  return node;
}
