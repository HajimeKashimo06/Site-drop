"use client";

import Link from "next/link";
import type { FormEvent, ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";

import { FadeIn } from "@/components/fade-in";
import { PublicPageShell } from "@/components/public-page-shell";
import type { AdminUser, DemoSite, SiteAnalytics, SiteSettings, UserRole } from "@/lib/site";

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

type FeedbackTone = "success" | "error" | "";

const initialUserForm = {
  username: "",
  password: "",
  role: "client" as UserRole,
  siteId: "",
  active: true,
};

export function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"access" | "sites">("access");

  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginFeedback, setLoginFeedback] = useState("");
  const [loginTone, setLoginTone] = useState<FeedbackTone>("");

  const [demoSites, setDemoSites] = useState<DemoSite[]>([]);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [analyticsSites, setAnalyticsSites] = useState<SiteAnalytics[]>([]);
  const [analyticsTotal, setAnalyticsTotal] = useState(0);
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null);

  const [adminFeedback, setAdminFeedback] = useState("");
  const [adminTone, setAdminTone] = useState<FeedbackTone>("");
  const [siteFeedback, setSiteFeedback] = useState("");
  const [siteTone, setSiteTone] = useState<FeedbackTone>("");
  const [analyticsFeedback, setAnalyticsFeedback] = useState("");
  const [analyticsTone, setAnalyticsTone] = useState<FeedbackTone>("");
  const [settingsFeedback, setSettingsFeedback] = useState("");
  const [settingsTone, setSettingsTone] = useState<FeedbackTone>("");

  const [siteCreateOpen, setSiteCreateOpen] = useState(false);
  const [siteCreateName, setSiteCreateName] = useState("");
  const [siteVsCodeLink, setSiteVsCodeLink] = useState("");

  const [userForm, setUserForm] = useState(initialUserForm);
  const [submittingLogin, setSubmittingLogin] = useState(false);
  const [submittingUser, setSubmittingUser] = useState(false);
  const [submittingSite, setSubmittingSite] = useState(false);
  const [togglingPublicMode, setTogglingPublicMode] = useState(false);

  const roleNeedsSite = userForm.role === "client";
  const activeSiteCount = useMemo(() => demoSites.length, [demoSites]);

  async function refreshAll() {
    await Promise.all([
      refreshDemoSites(),
      refreshUsers(),
      refreshAnalytics(),
      refreshSiteSettings(),
    ]);
  }

  useEffect(() => {
    let cancelled = false;

    const bootstrap = async () => {
      setLoading(true);
      const session = await fetchAdminSession();
      if (cancelled) {
        return;
      }

      if (!session.authenticated) {
        setAuthenticated(false);
        setLoading(false);
        return;
      }

      setAuthenticated(true);
      await refreshAll();
      if (!cancelled) {
        setLoading(false);
      }
    };

    void bootstrap();

    return () => {
      cancelled = true;
    };
    // Intentional one-shot bootstrap on first mount.
    // Subsequent refreshes are triggered by explicit admin actions.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function refreshDemoSites() {
    const response = await fetch("/api/admin/demo-sites", {
      method: "GET",
      credentials: "include",
    });
    if (!response.ok) {
      setDemoSites([]);
      return;
    }

    const payload = (await readJson(response)) as { sites?: DemoSite[] } | null;
    const sites = Array.isArray(payload?.sites) ? payload.sites : [];
    setDemoSites(sites);

    setUserForm((current) => {
      if (current.role !== "client") {
        return current;
      }
      const hasSelectedSite = sites.some((site) => site.id === current.siteId);
      return {
        ...current,
        siteId: hasSelectedSite ? current.siteId : sites[0]?.id ?? "",
      };
    });
  }

  async function refreshUsers() {
    const response = await fetch("/api/admin/users", {
      method: "GET",
      credentials: "include",
    });
    if (!response.ok) {
      setUsers([]);
      return;
    }

    const payload = (await readJson(response)) as { users?: AdminUser[] } | null;
    setUsers(Array.isArray(payload?.users) ? payload.users : []);
  }

  async function refreshAnalytics() {
    setAnalyticsFeedback("");
    setAnalyticsTone("");
    const response = await fetch("/api/admin/site-analytics", {
      method: "GET",
      credentials: "include",
    });
    if (!response.ok) {
      setAnalyticsSites([]);
      setAnalyticsTotal(0);
      setAnalyticsFeedback("Stats indisponibles.");
      setAnalyticsTone("error");
      return;
    }

    const payload = (await readJson(response)) as
      | { sites?: SiteAnalytics[]; totalNonAdminClicks?: unknown }
      | null;
    setAnalyticsSites(Array.isArray(payload?.sites) ? payload.sites : []);
    const totalRaw = Number(payload?.totalNonAdminClicks ?? 0);
    setAnalyticsTotal(Number.isFinite(totalRaw) ? Math.max(0, Math.floor(totalRaw)) : 0);
  }

  async function refreshSiteSettings() {
    const response = await fetch("/api/admin/site-settings", {
      method: "GET",
      credentials: "include",
    });
    if (!response.ok) {
      setSiteSettings(null);
      return;
    }

    const payload = (await readJson(response)) as { settings?: SiteSettings } | null;
    if (payload?.settings && typeof payload.settings.demoSitesPublic === "boolean") {
      setSiteSettings(payload.settings);
    }
  }

  const onLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoginFeedback("");
    setLoginTone("");

    if (!loginUsername.trim() || !loginPassword.trim()) {
      setLoginFeedback("Merci de remplir tous les champs.");
      setLoginTone("error");
      return;
    }

    setSubmittingLogin(true);
    try {
      const response = await fetch("/api/auth/admin-login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: loginUsername.trim(),
          password: loginPassword.trim(),
        }),
      });

      if (!response.ok) {
        const payload = (await readJson(response)) as { error?: unknown } | null;
        setLoginFeedback(
          typeof payload?.error === "string"
            ? payload.error
            : response.status >= 500
              ? "Connexion impossible pour le moment."
              : "Connexion invalide.",
        );
        setLoginTone("error");
        return;
      }

      setAuthenticated(true);
      setLoginFeedback("Connexion validee.");
      setLoginTone("success");
      await refreshAll();
    } catch {
      setLoginFeedback("Connexion impossible pour le moment.");
      setLoginTone("error");
    } finally {
      setSubmittingLogin(false);
    }
  };

  const onLogout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    setAuthenticated(false);
    setUsers([]);
    setDemoSites([]);
    setAnalyticsSites([]);
    setAnalyticsTotal(0);
    setSiteSettings(null);
  };

  const onCreateSite = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSiteFeedback("");
    setSiteTone("");
    setSiteVsCodeLink("");

    if (!siteCreateName.trim()) {
      setSiteFeedback("Nom du site invalide.");
      setSiteTone("error");
      return;
    }

    setSubmittingSite(true);
    try {
      const response = await fetch("/api/admin/demo-sites", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: siteCreateName.trim() }),
      });

      const payload = (await readJson(response)) as CreateSiteResponse | null;
      if (!response.ok) {
        setSiteFeedback(
          typeof payload?.error === "string" ? payload.error : "Creation refusee.",
        );
        setSiteTone("error");
        return;
      }

      setSiteFeedback(
        payload?.site
          ? `Site cree: ${payload.site.name} (${payload.site.path})${
              payload.siteFolderPath ? ` | Dossier: ${payload.siteFolderPath}` : ""
            }`
          : "Site cree.",
      );
      setSiteTone("success");
      setSiteCreateOpen(false);
      setSiteCreateName("");
      setSiteVsCodeLink(
        typeof payload?.vscodeUri === "string" ? payload.vscodeUri : "",
      );
      await refreshDemoSites();
      await refreshAnalytics();
    } catch {
      setSiteFeedback("Erreur reseau pendant la creation du site.");
      setSiteTone("error");
    } finally {
      setSubmittingSite(false);
    }
  };

  const onDeleteSite = async (site: DemoSite) => {
    const confirmed = window.confirm(
      `Supprimer le site "${site.name}" ? Cette action est definitive.`,
    );
    if (!confirmed) {
      return;
    }

    setSiteFeedback("");
    setSiteTone("");
    try {
      const response = await fetch(
        `/api/admin/demo-sites/${encodeURIComponent(site.id)}`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );

      const payload = (await readJson(response)) as DeleteSiteResponse | null;
      if (!response.ok) {
        setSiteFeedback(
          typeof payload?.error === "string" ? payload.error : "Suppression refusee.",
        );
        setSiteTone("error");
        return;
      }

      setSiteFeedback(`Site supprime: ${site.name}`);
      setSiteTone("success");
      await refreshDemoSites();
      await refreshAnalytics();
      await refreshUsers();
    } catch {
      setSiteFeedback("Erreur reseau pendant la suppression.");
      setSiteTone("error");
    }
  };

  const onSaveUser = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setAdminFeedback("");
    setAdminTone("");

    if (!userForm.username.trim()) {
      setAdminFeedback("Formulaire incomplet.");
      setAdminTone("error");
      return;
    }

    if (roleNeedsSite && !userForm.siteId) {
      setAdminFeedback("Veuillez choisir un site demo pour ce compte client.");
      setAdminTone("error");
      return;
    }

    setSubmittingUser(true);
    try {
      const response = await fetch("/api/admin/users", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: userForm.username.trim().toLowerCase(),
          password: userForm.password.trim(),
          role: userForm.role,
          active: userForm.active,
          siteId: userForm.role === "client" ? userForm.siteId : "",
        }),
      });

      const payload = await readJson(response);
      if (!response.ok) {
        setAdminFeedback(
          typeof payload?.error === "string" ? payload.error : "Operation refusee.",
        );
        setAdminTone("error");
        return;
      }

      setAdminFeedback("Utilisateur enregistre.");
      setAdminTone("success");
      setUserForm({
        username: "",
        password: "",
        role: "client",
        siteId: demoSites[0]?.id ?? "",
        active: true,
      });
      await refreshUsers();
    } catch {
      setAdminFeedback("Erreur reseau.");
      setAdminTone("error");
    } finally {
      setSubmittingUser(false);
    }
  };

  const onToggleUser = async (user: AdminUser) => {
    setAdminFeedback("");
    setAdminTone("");
    try {
      const response = await fetch(
        `/api/admin/users/${encodeURIComponent(user.username)}/toggle`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ active: !user.active }),
        },
      );

      const payload = await readJson(response);
      if (!response.ok) {
        setAdminFeedback(
          typeof payload?.error === "string" ? payload.error : "Action refusee.",
        );
        setAdminTone("error");
        return;
      }

      setAdminFeedback(`Etat utilisateur mis a jour: ${user.username}`);
      setAdminTone("success");
      await refreshUsers();
    } catch {
      setAdminFeedback("Erreur reseau.");
      setAdminTone("error");
    }
  };

  const onTogglePublicMode = async (nextValue: boolean) => {
    setTogglingPublicMode(true);
    setSettingsFeedback("");
    setSettingsTone("");
    try {
      const response = await fetch("/api/admin/site-settings", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ demoSitesPublic: nextValue }),
      });

      const payload = (await readJson(response)) as { settings?: SiteSettings } | null;
      if (!response.ok || !payload?.settings) {
        setSettingsFeedback("Impossible de mettre a jour le mode.");
        setSettingsTone("error");
        await refreshSiteSettings();
        return;
      }

      setSiteSettings(payload.settings);
      setSettingsFeedback(
        payload.settings.demoSitesPublic
          ? "Mode public active: les liens demo s'ouvrent sans code."
          : "Mode protege active: le code est a nouveau requis.",
      );
      setSettingsTone("success");
    } catch {
      setSettingsFeedback("Impossible de mettre a jour le mode.");
      setSettingsTone("error");
    } finally {
      setTogglingPublicMode(false);
    }
  };

  return (
    <PublicPageShell
      eyebrow="Compte"
      title="Connexion et administration"
      description="Le nouvel espace admin Next.js garde les flux existants: connexion, gestion des acces, sites demo et analytics."
      navLinks={[
        { href: "/", label: "Retour accueil" },
        { href: "/demo-site", label: "Demo site" },
      ]}
    >
      {!authenticated ? (
        <section className="glass-panel rounded-[1.8rem] px-6 py-7">
          <p className="font-display text-sm font-semibold uppercase tracking-[0.24em] text-[var(--brand-soft)]">
            Connexion
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-[var(--ink-strong)]">
            Espace admin
          </h2>
          <form className="mt-6 grid gap-4" onSubmit={onLogin} noValidate>
            <Field label="Identifiant">
              <input
                value={loginUsername}
                onChange={(event) => setLoginUsername(event.target.value)}
                className={fieldClassName}
                autoComplete="username"
                required
              />
            </Field>

            <Field label="Mot de passe">
              <input
                type="password"
                value={loginPassword}
                onChange={(event) => setLoginPassword(event.target.value)}
                className={fieldClassName}
                autoComplete="current-password"
                required
              />
            </Field>

            <button
              type="submit"
              disabled={submittingLogin || loading}
              className="rounded-full bg-[linear-gradient(110deg,#6f9f29,#8abf39)] px-5 py-3 text-sm font-extrabold text-white transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {submittingLogin ? "Connexion..." : "Se connecter"}
            </button>

            <Feedback text={loginFeedback} tone={loginTone} />
          </form>
        </section>
      ) : (
        <section className="grid gap-4">
          <FadeIn className="glass-panel rounded-[1.8rem] px-6 py-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="font-display text-sm font-semibold uppercase tracking-[0.24em] text-[var(--brand-soft)]">
                  Gestion
                </p>
                <h2 className="mt-2 font-display text-3xl font-semibold text-[var(--ink-strong)]">
                  Gestion des acces
                </h2>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/demo-site"
                  className="rounded-full border border-[var(--line-strong)] bg-white px-4 py-3 text-sm font-semibold text-[var(--brand)]"
                >
                  Ouvrir le portail demo
                </Link>
                <button
                  type="button"
                  onClick={onLogout}
                  className="rounded-full border border-[var(--line-strong)] bg-[var(--surface-strong)] px-4 py-3 text-sm font-semibold text-white"
                >
                  Se deconnecter
                </button>
              </div>
            </div>
          </FadeIn>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setActiveTab("access")}
              className={`rounded-full px-4 py-3 text-sm font-semibold transition ${
                activeTab === "access"
                  ? "bg-[var(--surface-strong)] text-white"
                  : "border border-[var(--line-strong)] bg-white text-[var(--brand)]"
              }`}
            >
              Acces et comptes
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("sites")}
              className={`rounded-full px-4 py-3 text-sm font-semibold transition ${
                activeTab === "sites"
                  ? "bg-[var(--surface-strong)] text-white"
                  : "border border-[var(--line-strong)] bg-white text-[var(--brand)]"
              }`}
            >
              Sites et clics
            </button>
          </div>

          {activeTab === "access" ? (
            <>
              <section className="glass-panel rounded-[1.8rem] px-6 py-6">
                <p className="font-display text-sm font-semibold uppercase tracking-[0.24em] text-[var(--brand-soft)]">
                  Visibilite
                </p>
                <h3 className="mt-2 font-display text-2xl font-semibold text-[var(--ink-strong)]">
                  Acces aux liens demo
                </h3>
                <p className="mt-3 text-sm leading-7 text-[var(--ink-soft)]">
                  {siteSettings?.demoSitesPublic
                    ? "Mode actuel: liens demo ouverts publiquement (sans code)."
                    : "Mode actuel: protection par code active."}
                </p>
                <label className="mt-4 flex items-start gap-3 text-sm font-semibold text-[var(--ink-soft)]">
                  <input
                    type="checkbox"
                    checked={siteSettings?.demoSitesPublic ?? false}
                    onChange={(event) => onTogglePublicMode(event.target.checked)}
                    disabled={togglingPublicMode}
                    className="mt-1 h-4 w-4 rounded border-[var(--line-strong)]"
                  />
                  <span>Liens publics (sans code)</span>
                </label>
                <Feedback text={settingsFeedback} tone={settingsTone} />
              </section>

              <section className="glass-panel rounded-[1.8rem] px-6 py-6">
                <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <p className="font-display text-sm font-semibold uppercase tracking-[0.24em] text-[var(--brand-soft)]">
                      Sites demo
                    </p>
                    <h3 className="mt-2 font-display text-2xl font-semibold text-[var(--ink-strong)]">
                      Sites disponibles
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSiteCreateOpen((current) => !current)}
                    className="rounded-full bg-[var(--surface-strong)] px-4 py-3 text-sm font-semibold text-white"
                  >
                    {siteCreateOpen ? "Fermer" : "Creer un site"}
                  </button>
                </div>

                {siteCreateOpen ? (
                  <form className="mt-5 grid gap-4" onSubmit={onCreateSite} noValidate>
                    <Field label="Nom du site">
                      <input
                        value={siteCreateName}
                        onChange={(event) => setSiteCreateName(event.target.value)}
                        className={fieldClassName}
                        placeholder="Ex: Site test coiffure 2"
                        required
                      />
                    </Field>
                    <button
                      type="submit"
                      disabled={submittingSite}
                      className="w-fit rounded-full bg-[linear-gradient(110deg,#6f9f29,#8abf39)] px-5 py-3 text-sm font-extrabold text-white disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {submittingSite ? "Creation..." : "Valider"}
                    </button>
                  </form>
                ) : null}

                {siteVsCodeLink ? (
                  <a
                    href={siteVsCodeLink}
                    className="mt-4 inline-flex text-sm font-bold text-[var(--brand)]"
                  >
                    Ouvrir dans VS Code
                  </a>
                ) : null}

                <Feedback text={siteFeedback} tone={siteTone} />

                <div className="mt-5 grid gap-3">
                  {demoSites.length === 0 ? (
                    <p className="rounded-[1.2rem] border border-white/70 bg-white/72 px-4 py-4 text-sm text-[var(--ink-soft)]">
                      Aucun site demo disponible.
                    </p>
                  ) : (
                    demoSites.map((site) => (
                      <div
                        key={site.id}
                        className="flex flex-col gap-3 rounded-[1.2rem] border border-white/70 bg-white/72 px-4 py-4 lg:flex-row lg:items-center lg:justify-between"
                      >
                        <div>
                          <p className="font-semibold text-[var(--ink-strong)]">{site.name}</p>
                          <p className="text-sm text-[var(--ink-soft)]">{site.path}</p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <Link
                            href={withCacheBuster(site.path)}
                            className="rounded-full border border-[var(--line-strong)] bg-white px-4 py-2 text-xs font-semibold text-[var(--brand)]"
                          >
                            Voir site
                          </Link>
                          <button
                            type="button"
                            onClick={() => onDeleteSite(site)}
                            className="rounded-full border border-[#d58f8f] bg-[#fff4f4] px-4 py-2 text-xs font-semibold text-[#8f2b2b]"
                          >
                            Supprimer
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </section>

              <section className="glass-panel rounded-[1.8rem] px-6 py-6">
                <p className="font-display text-sm font-semibold uppercase tracking-[0.24em] text-[var(--brand-soft)]">
                  Comptes
                </p>
                <h3 className="mt-2 font-display text-2xl font-semibold text-[var(--ink-strong)]">
                  Creer ou mettre a jour un utilisateur
                </h3>

                <form className="mt-5 grid gap-4" onSubmit={onSaveUser} noValidate>
                  <Field label="Identifiant utilisateur">
                    <input
                      value={userForm.username}
                      onChange={(event) =>
                        setUserForm((current) => ({
                          ...current,
                          username: event.target.value,
                        }))
                      }
                      className={fieldClassName}
                      placeholder="ex: coiffure2"
                      required
                    />
                  </Field>

                  <Field label="Mot de passe (laisser vide pour garder l'ancien)">
                    <input
                      value={userForm.password}
                      onChange={(event) =>
                        setUserForm((current) => ({
                          ...current,
                          password: event.target.value,
                        }))
                      }
                      className={fieldClassName}
                      placeholder="Nouveau mot de passe"
                    />
                  </Field>

                  <Field label="Role">
                    <select
                      value={userForm.role}
                      onChange={(event) =>
                        setUserForm((current) => ({
                          ...current,
                          role: event.target.value as UserRole,
                          siteId:
                            event.target.value === "client"
                              ? current.siteId || demoSites[0]?.id || ""
                              : "",
                        }))
                      }
                      className={fieldClassName}
                    >
                      <option value="client">client</option>
                      <option value="admin">admin</option>
                    </select>
                  </Field>

                  {roleNeedsSite ? (
                    <Field label="Site demo autorise">
                      <select
                        value={userForm.siteId}
                        onChange={(event) =>
                          setUserForm((current) => ({
                            ...current,
                            siteId: event.target.value,
                          }))
                        }
                        className={fieldClassName}
                        disabled={activeSiteCount === 0}
                      >
                        {demoSites.length === 0 ? (
                          <option value="">Aucun site demo</option>
                        ) : (
                          demoSites.map((site) => (
                            <option key={site.id} value={site.id}>
                              {site.name} ({site.path})
                            </option>
                          ))
                        )}
                      </select>
                    </Field>
                  ) : null}

                  <label className="flex items-start gap-3 text-sm font-semibold text-[var(--ink-soft)]">
                    <input
                      type="checkbox"
                      checked={userForm.active}
                      onChange={(event) =>
                        setUserForm((current) => ({
                          ...current,
                          active: event.target.checked,
                        }))
                      }
                      className="mt-1 h-4 w-4 rounded border-[var(--line-strong)]"
                    />
                    <span>Actif</span>
                  </label>

                  <button
                    type="submit"
                    disabled={submittingUser}
                    className="w-fit rounded-full bg-[linear-gradient(110deg,#6f9f29,#8abf39)] px-5 py-3 text-sm font-extrabold text-white disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {submittingUser ? "Enregistrement..." : "Creer / Mettre a jour"}
                  </button>

                  <Feedback text={adminFeedback} tone={adminTone} />
                </form>

                <div className="mt-6 overflow-x-auto">
                  <table className="min-w-full border-separate border-spacing-y-2">
                    <thead>
                      <tr className="text-left text-xs font-semibold uppercase tracking-[0.16em] text-[var(--brand-soft)]">
                        <th className="px-3 py-2">Identifiant</th>
                        <th className="px-3 py-2">Role</th>
                        <th className="px-3 py-2">Site</th>
                        <th className="px-3 py-2">Etat</th>
                        <th className="px-3 py-2">Mise a jour</th>
                        <th className="px-3 py-2">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.length === 0 ? (
                        <tr>
                          <td
                            colSpan={6}
                            className="rounded-[1rem] bg-white/72 px-3 py-4 text-sm text-[var(--ink-soft)]"
                          >
                            Aucun utilisateur.
                          </td>
                        </tr>
                      ) : (
                        users.map((user) => (
                          <tr key={user.username} className="bg-white/72 text-sm text-[var(--ink-strong)]">
                            <td className="rounded-l-[1rem] px-3 py-4 font-semibold">
                              {user.username}
                            </td>
                            <td className="px-3 py-4">{user.role}</td>
                            <td className="px-3 py-4">
                              {user.siteName
                                ? `${user.siteName} (${user.sitePath ?? ""})`
                                : "-"}
                            </td>
                            <td className="px-3 py-4">{user.active ? "Actif" : "Desactive"}</td>
                            <td className="px-3 py-4">{formatDateTime(user.updatedAt)}</td>
                            <td className="rounded-r-[1rem] px-3 py-4">
                              <button
                                type="button"
                                onClick={() => onToggleUser(user)}
                                className="rounded-full border border-[var(--line-strong)] bg-white px-4 py-2 text-xs font-semibold text-[var(--brand)]"
                              >
                                {user.active ? "Desactiver" : "Activer"}
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </section>
            </>
          ) : (
            <section className="glass-panel rounded-[1.8rem] px-6 py-6">
              <p className="font-display text-sm font-semibold uppercase tracking-[0.24em] text-[var(--brand-soft)]">
                Performance
              </p>
              <h3 className="mt-2 font-display text-2xl font-semibold text-[var(--ink-strong)]">
                Tous les sites
              </h3>
              <p className="mt-3 text-sm font-semibold text-[var(--ink-soft)]">
                Total clics hors admin: {formatNumber(analyticsTotal)}
              </p>
              <Feedback text={analyticsFeedback} tone={analyticsTone} />

              <div className="mt-6 overflow-x-auto">
                <table className="min-w-full border-separate border-spacing-y-2">
                  <thead>
                    <tr className="text-left text-xs font-semibold uppercase tracking-[0.16em] text-[var(--brand-soft)]">
                      <th className="px-3 py-2">Site</th>
                      <th className="px-3 py-2">URL</th>
                      <th className="px-3 py-2">Clics hors admin</th>
                      <th className="px-3 py-2">Dernier clic</th>
                      <th className="px-3 py-2">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {analyticsSites.length === 0 ? (
                      <tr>
                        <td
                          colSpan={5}
                          className="rounded-[1rem] bg-white/72 px-3 py-4 text-sm text-[var(--ink-soft)]"
                        >
                          Aucun site.
                        </td>
                      </tr>
                    ) : (
                      analyticsSites.map((site) => (
                        <tr key={site.id} className="bg-white/72 text-sm text-[var(--ink-strong)]">
                          <td className="rounded-l-[1rem] px-3 py-4 font-semibold">
                            {site.name}
                          </td>
                          <td className="px-3 py-4">{site.path}</td>
                          <td className="px-3 py-4">{formatNumber(site.nonAdminClicks)}</td>
                          <td className="px-3 py-4">
                            {site.lastClickAt ? formatDateTime(site.lastClickAt) : "-"}
                          </td>
                          <td className="rounded-r-[1rem] px-3 py-4">
                            <Link
                              href={withCacheBuster(site.path)}
                              className="rounded-full border border-[var(--line-strong)] bg-white px-4 py-2 text-xs font-semibold text-[var(--brand)]"
                            >
                              Voir site
                            </Link>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </section>
          )}
        </section>
      )}
    </PublicPageShell>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="grid gap-2 text-sm font-bold text-[var(--brand)]">
      <span>{label}</span>
      {children}
    </label>
  );
}

function Feedback({
  text,
  tone,
}: {
  text: string;
  tone: FeedbackTone;
}) {
  return (
    <p
      className={`min-h-6 text-sm font-bold ${
        tone === "success"
          ? "text-[#2f6f1f]"
          : tone === "error"
            ? "text-[#bf3f3f]"
            : "text-transparent"
      }`}
    >
      {text || "."}
    </p>
  );
}

async function fetchAdminSession(): Promise<{ authenticated: boolean }> {
  try {
    const response = await fetch("/api/auth/admin-session", {
      method: "GET",
      credentials: "include",
    });
    if (!response.ok) {
      return { authenticated: false };
    }

    const payload = (await readJson(response)) as { authenticated?: boolean } | null;
    return { authenticated: payload?.authenticated === true };
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
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function formatNumber(value: number): string {
  return new Intl.NumberFormat("fr-FR").format(value);
}

function withCacheBuster(path: string): string {
  if (!path.startsWith("/")) {
    return path;
  }
  const separator = path.includes("?") ? "&" : "?";
  return `${path}${separator}v=${Date.now()}`;
}

const fieldClassName =
  "w-full rounded-[0.95rem] border border-[rgba(24,79,143,0.18)] bg-white px-4 py-3 text-sm text-[var(--ink-strong)] outline-none transition focus:border-[rgba(24,79,143,0.48)] focus:ring-4 focus:ring-[rgba(43,113,187,0.12)]";
