import './admin.css';

type UserRole = 'admin' | 'client';

type DemoSite = {
  id: string;
  name: string;
  path: string;
};

type SiteAnalytics = {
  id: string;
  name: string;
  path: string;
  nonAdminClicks: number;
  lastClickAt: string | null;
};

type CreateSiteResponse = {
  site?: DemoSite;
  vscodeUri?: string;
  siteFolderPath?: string;
  error?: string;
};

type DeleteSiteResponse = {
  removedSite?: DemoSite | null;
  error?: string;
};

type AdminUser = {
  username: string;
  role: UserRole;
  active: boolean;
  siteId: string | null;
  siteName: string | null;
  sitePath: string | null;
  createdAt: string;
  updatedAt: string;
};

document.title = 'Hproweb | Connexion';

const app = mustElement<HTMLDivElement>('#app');
app.innerHTML = `
  <main class="admin-shell">
    <header class="admin-header reveal">
      <div class="brand">
        <img class="brand-logo" src="/hplogo.png" alt="HP logo" />
        <span>Espace connexion</span>
      </div>
      <div class="header-actions">
        <a class="header-link" href="/">Retour accueil</a>
        <a class="header-link" href="/demo-site.html">Demo site</a>
      </div>
    </header>

    <section class="admin-card reveal" id="admin-login-card">
      <div class="section-head">
        <p>Compte</p>
        <h1>Connexion</h1>
      </div>
      <form id="admin-login-form" novalidate>
        <label>
          Identifiant
          <input type="text" name="username" required autocomplete="username" />
        </label>
        <label>
          Mot de passe
          <input type="password" name="password" required autocomplete="current-password" />
        </label>
        <button type="submit">Se connecter</button>
      </form>
      <p class="feedback" id="login-feedback" aria-live="polite"></p>
    </section>

    <section class="admin-card reveal" id="admin-panel" hidden>
      <div class="panel-top">
        <div>
          <p class="small-kicker">Gestion</p>
          <h2>Gestion des acces</h2>
        </div>
        <div class="top-actions">
          <a class="secondary-btn" href="/demo-site.html">Ouvrir le site demo</a>
          <button id="admin-logout-btn" class="secondary-btn" type="button">Se deconnecter</button>
        </div>
      </div>

      <div class="admin-tabs" role="tablist" aria-label="Sections admin">
        <button type="button" class="tab-btn is-active" id="tab-access-btn">Acces et comptes</button>
        <button type="button" class="tab-btn" id="tab-sites-btn">Sites et clics</button>
      </div>

      <div class="admin-tab-panel" id="tab-panel-access">
        <div class="sites-zone">
          <p class="small-kicker">Sites demo</p>
          <h3>Sites disponibles</h3>
          <ul id="sites-list"></ul>
          <button id="site-create-open-btn" type="button" class="site-create-open-btn">Creer un site</button>
          <form id="site-create-form" class="site-create-form is-hidden" novalidate>
            <label>
              Nom du site
              <input type="text" name="siteName" placeholder="Ex: Site test coiffure 2" required />
            </label>
            <div class="site-create-actions">
              <button type="submit">Valider</button>
              <button type="button" id="site-create-cancel-btn" class="secondary-btn">Annuler</button>
            </div>
          </form>
          <a id="site-vscode-link" class="site-vscode-link" href="#" hidden>Ouvrir dans VS Code</a>
          <p class="feedback" id="site-feedback" aria-live="polite"></p>
        </div>

        <form id="admin-user-form" class="user-form" novalidate>
          <label>
            Identifiant utilisateur
            <input type="text" name="username" placeholder="ex: coiffure2" required />
          </label>
          <label>
            Mot de passe (laisser vide pour garder l'ancien)
            <input type="text" name="password" placeholder="Nouveau mot de passe" />
          </label>
          <label>
            Role
            <select name="role" id="role-select">
              <option value="client">client</option>
              <option value="admin">admin</option>
            </select>
          </label>
          <label id="site-select-wrapper">
            Site demo autorise
            <select name="siteId" id="site-select"></select>
          </label>
          <label class="checkbox-line">
            <input type="checkbox" name="active" checked />
            Actif
          </label>
          <button type="submit">Creer / Mettre a jour</button>
        </form>

        <p class="feedback" id="admin-feedback" aria-live="polite"></p>

        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Identifiant</th>
                <th>Role</th>
                <th>Site</th>
                <th>Etat</th>
                <th>Mise a jour</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody id="users-body"></tbody>
          </table>
        </div>
      </div>

      <div class="admin-tab-panel" id="tab-panel-sites" hidden>
        <div class="sites-zone analytics-zone">
          <p class="small-kicker">Performance</p>
          <h3>Tous les sites</h3>
          <p class="analytics-total" id="analytics-total">Chargement...</p>
          <div class="table-wrap analytics-table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Site</th>
                  <th>URL</th>
                  <th>Clics hors admin</th>
                  <th>Dernier clic</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody id="analytics-body"></tbody>
            </table>
          </div>
          <p class="feedback" id="analytics-feedback" aria-live="polite"></p>
        </div>
      </div>
    </section>
  </main>
`;

setupRevealAnimation();
void bootstrapAdmin();

async function bootstrapAdmin(): Promise<void> {
  const loginCard = mustElement<HTMLElement>('#admin-login-card');
  const panel = mustElement<HTMLElement>('#admin-panel');
  const loginFeedback = mustElement<HTMLElement>('#login-feedback');
  const adminFeedback = mustElement<HTMLElement>('#admin-feedback');
  const siteFeedback = mustElement<HTMLElement>('#site-feedback');
  const analyticsFeedback = mustElement<HTMLElement>('#analytics-feedback');
  const analyticsTotal = mustElement<HTMLElement>('#analytics-total');
  const analyticsBody = mustElement<HTMLTableSectionElement>('#analytics-body');
  const loginForm = mustElement<HTMLFormElement>('#admin-login-form');
  const siteCreateOpenButton = mustElement<HTMLButtonElement>('#site-create-open-btn');
  const siteCreateCancelButton = mustElement<HTMLButtonElement>('#site-create-cancel-btn');
  const siteVsCodeLink = mustElement<HTMLAnchorElement>('#site-vscode-link');
  const siteCreateForm = mustElement<HTMLFormElement>('#site-create-form');
  const userForm = mustElement<HTMLFormElement>('#admin-user-form');
  const logoutButton = mustElement<HTMLButtonElement>('#admin-logout-btn');
  const roleSelect = mustElement<HTMLSelectElement>('#role-select');
  const siteSelect = mustElement<HTMLSelectElement>('#site-select');
  const siteWrapper = mustElement<HTMLElement>('#site-select-wrapper');
  const sitesList = mustElement<HTMLElement>('#sites-list');
  const accessTabButton = mustElement<HTMLButtonElement>('#tab-access-btn');
  const sitesTabButton = mustElement<HTMLButtonElement>('#tab-sites-btn');
  const accessPanel = mustElement<HTMLElement>('#tab-panel-access');
  const sitesPanel = mustElement<HTMLElement>('#tab-panel-sites');

  const switchTab = (tab: 'access' | 'sites'): void => {
    const showAccess = tab === 'access';
    accessTabButton.classList.toggle('is-active', showAccess);
    sitesTabButton.classList.toggle('is-active', !showAccess);
    accessPanel.hidden = !showAccess;
    sitesPanel.hidden = showAccess;
  };

  const refreshSiteAnalytics = async (): Promise<void> => {
    analyticsTotal.textContent = 'Chargement...';
    analyticsBody.innerHTML = '<tr><td colspan="5">Chargement...</td></tr>';
    analyticsFeedback.textContent = '';
    analyticsFeedback.className = 'feedback';

    const payload = await fetchSiteAnalytics();
    if (!payload) {
      analyticsTotal.textContent = 'Stats indisponibles.';
      analyticsBody.innerHTML = '<tr><td colspan="5">Erreur de chargement.</td></tr>';
      return;
    }

    analyticsTotal.textContent = `Total clics hors admin: ${formatNumber(payload.totalNonAdminClicks)}`;

    if (payload.sites.length === 0) {
      analyticsBody.innerHTML = '<tr><td colspan="5">Aucun site.</td></tr>';
      return;
    }

    analyticsBody.innerHTML = payload.sites
      .map((site) => {
        const lastClickLabel = site.lastClickAt ? formatDateTime(site.lastClickAt) : '-';
        return `
          <tr>
            <td>${escapeHtml(site.name)}</td>
            <td>${escapeHtml(site.path)}</td>
            <td>${formatNumber(site.nonAdminClicks)}</td>
            <td>${escapeHtml(lastClickLabel)}</td>
            <td><a class="table-link" href="${escapeHtml(site.path)}" target="_blank" rel="noopener">Voir site</a></td>
          </tr>
        `;
      })
      .join('');
  };

  const refreshDemoSites = async (): Promise<DemoSite[]> => {
    const demoSites = await fetchDemoSites();
    populateSiteSelect(siteSelect, demoSites);
    renderSiteZone(sitesList, demoSites);
    return demoSites;
  };

  accessTabButton.addEventListener('click', () => switchTab('access'));
  sitesTabButton.addEventListener('click', async () => {
    switchTab('sites');
    await refreshSiteAnalytics();
  });
  switchTab('access');

  const refreshRoleUI = () => {
    const role = roleSelect.value as UserRole;
    const isClient = role === 'client';
    siteWrapper.classList.toggle('is-hidden', !isClient);
    siteSelect.disabled = !isClient;
  };
  roleSelect.addEventListener('change', refreshRoleUI);
  refreshRoleUI();

  const closeSiteCreateForm = () => {
    siteCreateForm.reset();
    siteCreateForm.classList.add('is-hidden');
    siteCreateOpenButton.hidden = false;
  };

  const openSiteCreateForm = () => {
    siteFeedback.textContent = '';
    siteFeedback.className = 'feedback';
    siteVsCodeLink.hidden = true;
    siteVsCodeLink.removeAttribute('href');
    siteCreateForm.classList.remove('is-hidden');
    siteCreateOpenButton.hidden = true;
    const nameInput = siteCreateForm.querySelector<HTMLInputElement>('input[name="siteName"]');
    nameInput?.focus();
  };

  siteCreateOpenButton.addEventListener('click', openSiteCreateForm);
  siteCreateCancelButton.addEventListener('click', closeSiteCreateForm);

  sitesList.addEventListener('click', async (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) {
      return;
    }

    const button = target.closest<HTMLButtonElement>('button[data-site-delete-id]');
    if (!button) {
      return;
    }

    const siteId = button.dataset.siteDeleteId ?? '';
    const siteName = button.dataset.siteName ?? siteId;
    if (!siteId) {
      return;
    }

    const confirmed = window.confirm(`Supprimer le site "${siteName}" ? Cette action est definitive.`);
    if (!confirmed) {
      return;
    }

    siteFeedback.textContent = '';
    siteFeedback.className = 'feedback';
    button.disabled = true;

    try {
      const response = await fetch(`/api/admin/demo-sites/${encodeURIComponent(siteId)}`, {
        method: 'DELETE',
        credentials: 'include'
      });

      const payload = (await readJson(response)) as DeleteSiteResponse | null;
      if (!response.ok) {
        const errorMessage = typeof payload?.error === 'string' ? payload.error : 'Suppression refusee.';
        siteFeedback.textContent = errorMessage;
        siteFeedback.className = 'feedback error';
        return;
      }

      siteFeedback.textContent = `Site supprime: ${siteName}`;
      siteFeedback.className = 'feedback success';
      await refreshDemoSites();
      await refreshSiteAnalytics();
      await refreshUsers(adminFeedback);
    } catch {
      siteFeedback.textContent = 'Erreur reseau pendant la suppression.';
      siteFeedback.className = 'feedback error';
    } finally {
      button.disabled = false;
    }
  });

  const session = await fetchAdminSession();
  if (session.authenticated) {
    loginCard.hidden = true;
    panel.hidden = false;
    await refreshDemoSites();
    await refreshSiteAnalytics();
    await refreshUsers(adminFeedback);
  }

  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    loginFeedback.textContent = '';
    loginFeedback.className = 'feedback';

    if (!loginForm.checkValidity()) {
      loginFeedback.textContent = 'Merci de remplir tous les champs.';
      loginFeedback.className = 'feedback error';
      return;
    }

    const formData = new FormData(loginForm);
    const username = String(formData.get('username') ?? '').trim();
    const password = String(formData.get('password') ?? '').trim();

    try {
      const response = await fetch('/api/auth/admin-login', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      if (!response.ok) {
        loginFeedback.textContent = 'Connexion invalide.';
        loginFeedback.className = 'feedback error';
        return;
      }

      loginFeedback.textContent = 'Connexion validee.';
      loginFeedback.className = 'feedback success';
      loginCard.hidden = true;
      panel.hidden = false;
      await refreshDemoSites();
      await refreshSiteAnalytics();
      await refreshUsers(adminFeedback);
    } catch {
      loginFeedback.textContent = 'Connexion impossible pour le moment.';
      loginFeedback.className = 'feedback error';
    }
  });

  siteCreateForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    siteFeedback.textContent = '';
    siteFeedback.className = 'feedback';
    siteVsCodeLink.hidden = true;
    siteVsCodeLink.removeAttribute('href');

    if (!siteCreateForm.checkValidity()) {
      siteFeedback.textContent = 'Formulaire de creation incomplet.';
      siteFeedback.className = 'feedback error';
      return;
    }

    const submitButton = siteCreateForm.querySelector<HTMLButtonElement>('button[type="submit"]');
    const formData = new FormData(siteCreateForm);
    const siteName = String(formData.get('siteName') ?? '').trim();

    if (submitButton) {
      submitButton.disabled = true;
    }

    try {
      const response = await fetch('/api/admin/demo-sites', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: siteName })
      });

      const payload = (await readJson(response)) as CreateSiteResponse | null;
      if (!response.ok) {
        const errorMessage = typeof payload?.error === 'string' ? payload.error : 'Creation refusee.';
        siteFeedback.textContent = errorMessage;
        siteFeedback.className = 'feedback error';
        return;
      }

      const createdSite = payload?.site;
      const siteFolderPath = typeof payload?.siteFolderPath === 'string' ? payload.siteFolderPath : '';
      siteFeedback.textContent = createdSite
        ? `Site cree: ${createdSite.name} (${createdSite.path})${siteFolderPath ? ` | Dossier: ${siteFolderPath}` : ''}`
        : 'Site cree.';
      siteFeedback.className = 'feedback success';
      closeSiteCreateForm();

      const sites = await refreshDemoSites();
      await refreshSiteAnalytics();
      if (roleSelect.value === 'client' && createdSite) {
        const siteExists = sites.some((site) => site.id === createdSite.id);
        if (siteExists) {
          siteSelect.value = createdSite.id;
        }
      }

      const vscodeUri = typeof payload?.vscodeUri === 'string' ? payload.vscodeUri : '';
      if (vscodeUri.startsWith('vscode://')) {
        siteVsCodeLink.href = vscodeUri;
        siteVsCodeLink.hidden = false;
        window.setTimeout(() => {
          window.location.href = vscodeUri;
        }, 250);
      }
    } catch {
      siteFeedback.textContent = 'Erreur reseau pendant la creation du site.';
      siteFeedback.className = 'feedback error';
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
      }
    }
  });

  userForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    adminFeedback.textContent = '';
    adminFeedback.className = 'feedback';

    if (!userForm.checkValidity()) {
      adminFeedback.textContent = 'Formulaire incomplet.';
      adminFeedback.className = 'feedback error';
      return;
    }

    const formData = new FormData(userForm);
    const username = String(formData.get('username') ?? '').trim().toLowerCase();
    const password = String(formData.get('password') ?? '').trim();
    const role = String(formData.get('role') ?? 'client') as UserRole;
    const active = formData.get('active') !== null;
    const siteId = role === 'client' ? String(formData.get('siteId') ?? '').trim().toLowerCase() : '';

    if (role === 'client' && !siteId) {
      adminFeedback.textContent = 'Veuillez choisir un site demo pour ce compte client.';
      adminFeedback.className = 'feedback error';
      return;
    }

    try {
      const response = await fetch('/api/admin/users', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          password,
          role,
          active,
          siteId
        })
      });

      const payload = await readJson(response);
      if (!response.ok) {
        adminFeedback.textContent = typeof payload?.error === 'string' ? payload.error : 'Operation refusee.';
        adminFeedback.className = 'feedback error';
        return;
      }

      adminFeedback.textContent = 'Utilisateur enregistre.';
      adminFeedback.className = 'feedback success';
      userForm.reset();
      mustElement<HTMLInputElement>('#admin-user-form input[name="active"]').checked = true;
      roleSelect.value = 'client';
      refreshRoleUI();
      await refreshUsers(adminFeedback);
    } catch {
      adminFeedback.textContent = 'Erreur reseau.';
      adminFeedback.className = 'feedback error';
    }
  });

  logoutButton.addEventListener('click', async () => {
    await fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'include'
    });
    window.location.reload();
  });
}

async function refreshUsers(feedback: HTMLElement): Promise<void> {
  const body = mustElement<HTMLTableSectionElement>('#users-body');
  body.innerHTML = '<tr><td colspan="6">Chargement...</td></tr>';

  try {
    const response = await fetch('/api/admin/users', {
      method: 'GET',
      credentials: 'include'
    });

    if (!response.ok) {
      body.innerHTML = '<tr><td colspan="6">Acces admin refuse.</td></tr>';
      return;
    }

    const payload = (await response.json()) as { users?: AdminUser[] };
    const users = payload.users ?? [];

    if (users.length === 0) {
      body.innerHTML = '<tr><td colspan="6">Aucun utilisateur.</td></tr>';
      return;
    }

    body.innerHTML = users
      .map((user) => {
        const stateLabel = user.active ? 'Actif' : 'Desactive';
        const actionLabel = user.active ? 'Desactiver' : 'Activer';
        const siteLabel = user.siteName ? `${user.siteName} (${user.sitePath ?? ''})` : '-';
        return `
          <tr>
            <td>${escapeHtml(user.username)}</td>
            <td>${escapeHtml(user.role)}</td>
            <td>${escapeHtml(siteLabel)}</td>
            <td>${stateLabel}</td>
            <td>${formatDateTime(user.updatedAt)}</td>
            <td><button type="button" class="table-btn" data-username="${escapeHtml(user.username)}" data-next="${String(!user.active)}">${actionLabel}</button></td>
          </tr>
        `;
      })
      .join('');

    const buttons = Array.from(document.querySelectorAll<HTMLButtonElement>('.table-btn'));
    buttons.forEach((button) => {
      button.addEventListener('click', async () => {
        const username = button.dataset.username ?? '';
        const nextActive = button.dataset.next === 'true';
        button.disabled = true;
        try {
          const response = await fetch(`/api/admin/users/${encodeURIComponent(username)}/toggle`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ active: nextActive })
          });

          const payload = await readJson(response);
          if (!response.ok) {
            feedback.textContent = typeof payload?.error === 'string' ? payload.error : 'Action refusee.';
            feedback.className = 'feedback error';
            return;
          }

          feedback.textContent = `Etat utilisateur mis a jour: ${username}`;
          feedback.className = 'feedback success';
          await refreshUsers(feedback);
        } catch {
          feedback.textContent = 'Erreur reseau.';
          feedback.className = 'feedback error';
        } finally {
          button.disabled = false;
        }
      });
    });
  } catch {
    body.innerHTML = '<tr><td colspan="6">Erreur reseau.</td></tr>';
  }
}

async function fetchDemoSites(): Promise<DemoSite[]> {
  try {
    const response = await fetch('/api/admin/demo-sites', {
      method: 'GET',
      credentials: 'include'
    });
    if (!response.ok) {
      return [];
    }

    const payload = (await response.json()) as { sites?: DemoSite[] };
    return payload.sites ?? [];
  } catch {
    return [];
  }
}

async function fetchSiteAnalytics(): Promise<{ sites: SiteAnalytics[]; totalNonAdminClicks: number } | null> {
  try {
    const response = await fetch('/api/admin/site-analytics', {
      method: 'GET',
      credentials: 'include'
    });
    if (!response.ok) {
      return null;
    }

    const payload = (await response.json()) as { sites?: SiteAnalytics[]; totalNonAdminClicks?: unknown };
    const sites = Array.isArray(payload.sites) ? payload.sites : [];
    const totalRaw = Number(payload.totalNonAdminClicks ?? 0);
    const totalNonAdminClicks = Number.isFinite(totalRaw) ? Math.max(0, Math.floor(totalRaw)) : 0;
    return { sites, totalNonAdminClicks };
  } catch {
    return null;
  }
}

function populateSiteSelect(select: HTMLSelectElement, sites: DemoSite[]): void {
  if (sites.length === 0) {
    select.innerHTML = '<option value="">Aucun site demo</option>';
    return;
  }

  select.innerHTML = sites
    .map((site) => `<option value="${escapeHtml(site.id)}">${escapeHtml(site.name)} (${escapeHtml(site.path)})</option>`)
    .join('');
}

function renderSiteZone(node: HTMLElement, sites: DemoSite[]): void {
  if (sites.length === 0) {
    node.innerHTML = '<li>Aucun site demo disponible.</li>';
    return;
  }

  node.innerHTML = sites
    .map(
      (site) => `
        <li>
          <div class="site-row">
            <div class="site-row-text">
              <strong>${escapeHtml(site.name)}</strong>
              <span>${escapeHtml(site.path)}</span>
            </div>
            <div class="site-row-actions">
              <a class="site-view-btn" href="${escapeHtml(site.path)}" target="_blank" rel="noopener">Voir site</a>
              <button
                type="button"
                class="site-delete-btn"
                data-site-delete-id="${escapeHtml(site.id)}"
                data-site-name="${escapeHtml(site.name)}"
              >
                Supprimer
              </button>
            </div>
          </div>
        </li>
      `
    )
    .join('');
}

async function fetchAdminSession(): Promise<{ authenticated: boolean }> {
  try {
    const response = await fetch('/api/auth/admin-session', {
      method: 'GET',
      credentials: 'include'
    });
    if (!response.ok) {
      return { authenticated: false };
    }
    const payload = (await response.json()) as { authenticated?: boolean };
    return { authenticated: payload.authenticated === true };
  } catch {
    return { authenticated: false };
  }
}

async function readJson(response: Response): Promise<Record<string, unknown> | null> {
  try {
    return (await response.json()) as Record<string, unknown>;
  } catch {
    return null;
  }
}

function formatDateTime(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }
  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
}

function formatNumber(value: number): string {
  return new Intl.NumberFormat('fr-FR').format(value);
}

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

function mustElement<T extends Element>(selector: string): T {
  const node = document.querySelector<T>(selector);
  if (!node) {
    throw new Error(`Missing element: ${selector}`);
  }
  return node;
}

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}
