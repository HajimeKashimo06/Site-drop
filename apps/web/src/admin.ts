import './admin.css';

type UserRole = 'admin' | 'client';

type DemoSite = {
  id: string;
  name: string;
  path: string;
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

document.title = 'Hproweb | Espace admin';

const app = mustElement<HTMLDivElement>('#app');
app.innerHTML = `
  <main class="admin-shell">
    <header class="admin-header reveal">
      <div class="brand">
        <img class="brand-logo" src="/hplogo.png" alt="HP logo" />
        <span>Espace administration</span>
      </div>
      <div class="header-actions">
        <a class="header-link" href="/">Retour accueil</a>
        <a class="header-link" href="/demo-site.html">Démo site</a>
      </div>
    </header>

    <section class="admin-card reveal" id="admin-login-card">
      <div class="section-head">
        <p>Compte admin</p>
        <h1>Connexion administration</h1>
      </div>
      <form id="admin-login-form" novalidate>
        <label>
          Identifiant admin
          <input type="text" name="username" required autocomplete="username" />
        </label>
        <label>
          Mot de passe admin
          <input type="password" name="password" required autocomplete="current-password" />
        </label>
        <button type="submit">Se connecter</button>
      </form>
      <p class="feedback" id="login-feedback" aria-live="polite"></p>
    </section>

    <section class="admin-card reveal" id="admin-panel" hidden>
      <div class="panel-top">
        <div>
          <p class="small-kicker">Administration</p>
          <h2>Gestion des accès</h2>
        </div>
        <div class="top-actions">
          <a class="secondary-btn" href="/demo-site.html">Ouvrir le site démo</a>
          <button id="admin-logout-btn" class="secondary-btn" type="button">Se déconnecter</button>
        </div>
      </div>

      <div class="sites-zone">
        <p class="small-kicker">Sites démo</p>
        <h3>Sites disponibles</h3>
        <ul id="sites-list"></ul>
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
          Rôle
          <select name="role" id="role-select">
            <option value="client">client</option>
            <option value="admin">admin</option>
          </select>
        </label>
        <label id="site-select-wrapper">
          Site démo autorisé
          <select name="siteId" id="site-select"></select>
        </label>
        <label class="checkbox-line">
          <input type="checkbox" name="active" checked />
          Actif
        </label>
        <button type="submit">Créer / Mettre à jour</button>
      </form>

      <p class="feedback" id="admin-feedback" aria-live="polite"></p>

      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Identifiant</th>
              <th>Rôle</th>
              <th>Site</th>
              <th>État</th>
              <th>Mise à jour</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody id="users-body"></tbody>
        </table>
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
  const loginForm = mustElement<HTMLFormElement>('#admin-login-form');
  const userForm = mustElement<HTMLFormElement>('#admin-user-form');
  const logoutButton = mustElement<HTMLButtonElement>('#admin-logout-btn');
  const roleSelect = mustElement<HTMLSelectElement>('#role-select');
  const siteSelect = mustElement<HTMLSelectElement>('#site-select');
  const siteWrapper = mustElement<HTMLElement>('#site-select-wrapper');
  const sitesList = mustElement<HTMLElement>('#sites-list');

  const refreshDemoSites = async () => {
    const demoSites = await fetchDemoSites();
    populateSiteSelect(siteSelect, demoSites);
    renderSiteZone(sitesList, demoSites);
  };

  const refreshRoleUI = () => {
    const role = roleSelect.value as UserRole;
    const isClient = role === 'client';
    siteWrapper.classList.toggle('is-hidden', !isClient);
    siteSelect.disabled = !isClient;
  };
  roleSelect.addEventListener('change', refreshRoleUI);
  refreshRoleUI();

  const session = await fetchAdminSession();
  if (session.authenticated) {
    loginCard.hidden = true;
    panel.hidden = false;
    await refreshDemoSites();
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
        loginFeedback.textContent = 'Connexion admin invalide.';
        loginFeedback.className = 'feedback error';
        return;
      }

      loginFeedback.textContent = 'Connexion admin validée.';
      loginFeedback.className = 'feedback success';
      loginCard.hidden = true;
      panel.hidden = false;
      await refreshDemoSites();
      await refreshUsers(adminFeedback);
    } catch {
      loginFeedback.textContent = 'Connexion impossible pour le moment.';
      loginFeedback.className = 'feedback error';
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
      adminFeedback.textContent = 'Choisis un site démo pour ce compte client.';
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
        adminFeedback.textContent = typeof payload?.error === 'string' ? payload.error : 'Opération refusée.';
        adminFeedback.className = 'feedback error';
        return;
      }

      adminFeedback.textContent = 'Utilisateur enregistré.';
      adminFeedback.className = 'feedback success';
      userForm.reset();
      mustElement<HTMLInputElement>('#admin-user-form input[name="active"]').checked = true;
      roleSelect.value = 'client';
      refreshRoleUI();
      await refreshUsers(adminFeedback);
    } catch {
      adminFeedback.textContent = 'Erreur réseau.';
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
      body.innerHTML = '<tr><td colspan="6">Accès admin refusé.</td></tr>';
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
        const stateLabel = user.active ? 'Actif' : 'Désactivé';
        const actionLabel = user.active ? 'Désactiver' : 'Activer';
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
            feedback.textContent = typeof payload?.error === 'string' ? payload.error : 'Action refusée.';
            feedback.className = 'feedback error';
            return;
          }

          feedback.textContent = `État utilisateur mis à jour: ${username}`;
          feedback.className = 'feedback success';
          await refreshUsers(feedback);
        } catch {
          feedback.textContent = 'Erreur réseau.';
          feedback.className = 'feedback error';
        } finally {
          button.disabled = false;
        }
      });
    });
  } catch {
    body.innerHTML = '<tr><td colspan="6">Erreur réseau.</td></tr>';
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

function populateSiteSelect(select: HTMLSelectElement, sites: DemoSite[]): void {
  if (sites.length === 0) {
    select.innerHTML = '<option value="">Aucun site démo</option>';
    return;
  }

  select.innerHTML = sites
    .map((site) => `<option value="${escapeHtml(site.id)}">${escapeHtml(site.name)} (${escapeHtml(site.path)})</option>`)
    .join('');
}

function renderSiteZone(node: HTMLElement, sites: DemoSite[]): void {
  if (sites.length === 0) {
    node.innerHTML = '<li>Aucun site démo disponible.</li>';
    return;
  }

  node.innerHTML = sites.map((site) => `<li><strong>${escapeHtml(site.name)}</strong> <span>${escapeHtml(site.path)}</span></li>`).join('');
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
