"use client";

import Link from "next/link";
import type { FormEvent, ReactNode } from "react";
import { useEffect, useState } from "react";

import { FadeIn } from "@/components/fade-in";
import type {
  AdminUser,
  DemoSite,
  SiteAnalytics,
  SiteSettings,
  UserRole,
} from "@/lib/site";

type FeedbackTone = "success" | "error" | "";

const initialUserForm = {
  username: "",
  password: "",
  role: "admin" as UserRole,
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

  const [users, setUsers] = useState<AdminUser[]>([]);
  const [demoSites, setDemoSites] = useState<DemoSite[]>([]);
  const [siteSettings, setSiteSettings] = useState<SiteSettings>({
    demoSitesPublic: false,
  });
  const [analyticsSites, setAnalyticsSites] = useState<SiteAnalytics[]>([]);
  const [analyticsTotal, setAnalyticsTotal] = useState(0);

  const [accountFeedback, setAccountFeedback] = useState("");
  const [accountTone, setAccountTone] = useState<FeedbackTone>("");
  const [siteFeedback, setSiteFeedback] = useState("");
  const [siteTone, setSiteTone] = useState<FeedbackTone>("");
  const [settingsFeedback, setSettingsFeedback] = useState("");
  const [settingsTone, setSettingsTone] = useState<FeedbackTone>("");
  const [analyticsFeedback, setAnalyticsFeedback] = useState("");
  const [analyticsTone, setAnalyticsTone] = useState<FeedbackTone>("");

  const [userForm, setUserForm] = useState(initialUserForm);
  const [siteCreateName, setSiteCreateName] = useState("");
  const [siteCreateId, setSiteCreateId] = useState("");
  const [submittingLogin, setSubmittingLogin] = useState(false);
  const [submittingUser, setSubmittingUser] = useState(false);
  const [submittingSite, setSubmittingSite] = useState(false);
  const [togglingPublicMode, setTogglingPublicMode] = useState(false);

  async function refreshAll() {
    await Promise.all([
      refreshUsers(),
      refreshDemoSites(),
      refreshSiteSettings(),
      refreshAnalytics(),
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    const nextSites = Array.isArray(payload?.sites) ? payload.sites : [];
    setDemoSites(nextSites);
    setUserForm((current) =>
      current.role === "client" && !current.siteId && nextSites[0]?.id
        ? {
            ...current,
            siteId: nextSites[0]?.id ?? "",
          }
        : current,
    );
  }

  async function refreshSiteSettings() {
    const response = await fetch("/api/admin/site-settings", {
      method: "GET",
      credentials: "include",
    });
    if (!response.ok) {
      setSiteSettings({ demoSitesPublic: false });
      return;
    }

    const payload = (await readJson(response)) as
      | { settings?: SiteSettings }
      | null;
    setSiteSettings(
      payload?.settings && typeof payload.settings.demoSitesPublic === "boolean"
        ? payload.settings
        : { demoSitesPublic: false },
    );
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
    setAnalyticsTotal(
      Number.isFinite(totalRaw) ? Math.max(0, Math.floor(totalRaw)) : 0,
    );
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
      setLoginFeedback("Connexion validée.");
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
  };

  const onSaveUser = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setAccountFeedback("");
    setAccountTone("");

    if (!userForm.username.trim()) {
      setAccountFeedback("Formulaire incomplet.");
      setAccountTone("error");
      return;
    }

    if (userForm.role === "client" && !userForm.siteId) {
      setAccountFeedback("Choisis un site de démo pour ce compte client.");
      setAccountTone("error");
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
          siteId: userForm.role === "client" ? userForm.siteId : "",
          active: userForm.active,
        }),
      });

      const payload = await readJson(response);
      if (!response.ok) {
        setAccountFeedback(
          typeof payload?.error === "string" ? payload.error : "Opération refusée.",
        );
        setAccountTone("error");
        return;
      }

      setAccountFeedback("Compte enregistré.");
      setAccountTone("success");
      setUserForm({
        username: "",
        password: "",
        role: "admin",
        siteId: "",
        active: true,
      });
      await refreshUsers();
    } catch {
      setAccountFeedback("Erreur réseau.");
      setAccountTone("error");
    } finally {
      setSubmittingUser(false);
    }
  };

  const onToggleUser = async (user: AdminUser) => {
    setAccountFeedback("");
    setAccountTone("");
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
        setAccountFeedback(
          typeof payload?.error === "string" ? payload.error : "Action refusee.",
        );
        setAccountTone("error");
        return;
      }

      setAccountFeedback(`État du compte mis à jour : ${user.username}`);
      setAccountTone("success");
      await refreshUsers();
    } catch {
      setAccountFeedback("Erreur réseau.");
      setAccountTone("error");
    }
  };

  const onCreateSite = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSiteFeedback("");
    setSiteTone("");

    if (!siteCreateName.trim()) {
      setSiteFeedback("Indique au moins un nom de site.");
      setSiteTone("error");
      return;
    }

    setSubmittingSite(true);
    try {
      const response = await fetch("/api/admin/demo-sites", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: siteCreateName.trim(),
          siteId: siteCreateId.trim(),
        }),
      });

      const payload = await readJson(response);
      if (!response.ok) {
        setSiteFeedback(
          typeof payload?.error === "string" ? payload.error : "Création impossible.",
        );
        setSiteTone("error");
        return;
      }

      const folderPath =
        typeof payload?.siteFolderPath === "string" ? payload.siteFolderPath : "";
      setSiteFeedback(
        folderPath
          ? `Site de démo créé. Dossier prêt : ${folderPath}`
          : "Site de démo créé.",
      );
      setSiteTone("success");
      setSiteCreateName("");
      setSiteCreateId("");
      await Promise.all([refreshDemoSites(), refreshAnalytics()]);
    } catch {
      setSiteFeedback("Erreur réseau.");
      setSiteTone("error");
    } finally {
      setSubmittingSite(false);
    }
  };

  const onDeleteSite = async (site: DemoSite) => {
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

      const payload = await readJson(response);
      if (!response.ok) {
        setSiteFeedback(
          typeof payload?.error === "string" ? payload.error : "Suppression impossible.",
        );
        setSiteTone("error");
        return;
      }

      if (userForm.siteId === site.id) {
        setUserForm((current) => ({
          ...current,
          siteId: "",
        }));
      }
      setSiteFeedback(`Site supprimé : ${site.name}`);
      setSiteTone("success");
      await Promise.all([refreshDemoSites(), refreshUsers(), refreshAnalytics()]);
    } catch {
      setSiteFeedback("Erreur réseau.");
      setSiteTone("error");
    }
  };

  const onTogglePublicMode = async () => {
    setSettingsFeedback("");
    setSettingsTone("");
    setTogglingPublicMode(true);

    try {
      const response = await fetch("/api/admin/site-settings", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          demoSitesPublic: !siteSettings.demoSitesPublic,
        }),
      });

      const payload = await readJson(response);
      if (!response.ok) {
        setSettingsFeedback(
          typeof payload?.error === "string" ? payload.error : "Mise à jour impossible.",
        );
        setSettingsTone("error");
        return;
      }

      setSettingsFeedback(
        !siteSettings.demoSitesPublic
          ? "Les liens démo sont maintenant visibles sans connexion."
          : "Les liens démo sont de nouveau réservés aux comptes autorisés.",
      );
      setSettingsTone("success");
      await refreshSiteSettings();
    } catch {
      setSettingsFeedback("Erreur réseau.");
      setSettingsTone("error");
    } finally {
      setTogglingPublicMode(false);
    }
  };

  return (
    <main className="px-4 py-4 md:px-6">
      <div className="mx-auto w-full max-w-6xl">
        {!authenticated ? (
        <section className="glass-panel rounded-[1.8rem] px-6 py-7">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="font-display text-sm font-semibold uppercase tracking-[0.24em] text-[var(--brand-soft)]">
                Connexion
              </p>
              <h2 className="mt-3 font-display text-3xl font-semibold text-[var(--ink-strong)]">
                Se connecter
              </h2>
            </div>
            <Link
              href="/"
              className="rounded-full border border-[var(--line-strong)] bg-white px-4 py-3 text-sm font-semibold text-[var(--brand)]"
            >
              Retour accueil
            </Link>
          </div>
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
                    Accès et comptes
                  </h2>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/"
                    className="rounded-full border border-[var(--line-strong)] bg-white px-4 py-3 text-sm font-semibold text-[var(--brand)]"
                  >
                    Retour accueil
                  </Link>
                  <button
                    type="button"
                    onClick={onLogout}
                    className="rounded-full border border-[var(--line-strong)] bg-[var(--surface-strong)] px-4 py-3 text-sm font-semibold text-white"
                  >
                    Se déconnecter
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
                Accès et comptes
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
              <section className="glass-panel rounded-[1.8rem] px-6 py-6">
                <p className="font-display text-sm font-semibold uppercase tracking-[0.24em] text-[var(--brand-soft)]">
                  Comptes
                </p>
                <h3 className="mt-2 font-display text-2xl font-semibold text-[var(--ink-strong)]">
                  Créer ou mettre à jour un compte
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
                      placeholder="ex: client-demo"
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

                  <Field label="Rôle">
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

                  {userForm.role === "client" ? (
                    <Field label="Site de démo autorisé">
                      <select
                        value={userForm.siteId}
                        onChange={(event) =>
                          setUserForm((current) => ({
                            ...current,
                            siteId: event.target.value,
                          }))
                        }
                        className={fieldClassName}
                        disabled={demoSites.length === 0}
                      >
                        {demoSites.length === 0 ? (
                          <option value="">Aucun site de démo disponible</option>
                        ) : null}
                        {demoSites.map((site) => (
                          <option key={site.id} value={site.id}>
                            {site.name}
                          </option>
                        ))}
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
                    {submittingUser ? "Enregistrement..." : "Créer / mettre à jour"}
                  </button>

                  <Feedback text={accountFeedback} tone={accountTone} />
                </form>

                <div className="mt-6 overflow-x-auto">
                  <table className="min-w-full border-separate border-spacing-y-2">
                    <thead>
                      <tr className="text-left text-xs font-semibold uppercase tracking-[0.16em] text-[var(--brand-soft)]">
                        <th className="px-3 py-2">Identifiant</th>
                        <th className="px-3 py-2">Rôle</th>
                        <th className="px-3 py-2">Site</th>
                        <th className="px-3 py-2">État</th>
                        <th className="px-3 py-2">Mise à jour</th>
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
                          <tr
                            key={user.username}
                            className="bg-white/72 text-sm text-[var(--ink-strong)]"
                          >
                            <td className="rounded-l-[1rem] px-3 py-4 font-semibold">
                              {user.username}
                            </td>
                            <td className="px-3 py-4">{user.role}</td>
                            <td className="px-3 py-4">
                              {user.siteName
                                ? `${user.siteName} (${user.sitePath ?? ""})`
                                : "-"}
                            </td>
                            <td className="px-3 py-4">
                              {user.active ? "Actif" : "Désactivé"}
                            </td>
                            <td className="px-3 py-4">
                              {formatDateTime(user.updatedAt)}
                            </td>
                            <td className="rounded-r-[1rem] px-3 py-4">
                              <button
                                type="button"
                                onClick={() => onToggleUser(user)}
                                className="rounded-full border border-[var(--line-strong)] bg-white px-4 py-2 text-xs font-semibold text-[var(--brand)]"
                              >
                                {user.active ? "Désactiver" : "Activer"}
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </section>
            ) : (
              <div className="grid gap-4">
                <section className="glass-panel rounded-[1.8rem] px-6 py-6">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div className="max-w-2xl">
                      <p className="font-display text-sm font-semibold uppercase tracking-[0.24em] text-[var(--brand-soft)]">
                        Démos
                      </p>
                      <h3 className="mt-2 font-display text-2xl font-semibold text-[var(--ink-strong)]">
                        Créer et gérer vos sites de démonstration
                      </h3>
                      <p className="mt-3 text-sm leading-6 text-[var(--ink-soft)]">
                        Crée un nouveau site de démo, ouvre son dossier pour y
                        glisser tes fichiers, puis partage le lien public ou
                        un compte client selon ton besoin.
                      </p>
                    </div>

                    <div className="rounded-[1.2rem] border border-[var(--line-strong)] bg-white/80 px-4 py-4 text-sm">
                      <p className="font-semibold text-[var(--ink-strong)]">
                        Accès public
                      </p>
                      <p className="mt-2 text-[var(--ink-soft)]">
                        {siteSettings.demoSitesPublic
                          ? "Les liens démo sont visibles sans connexion."
                          : "Les liens démo restent privés sans connexion."}
                      </p>
                      <button
                        type="button"
                        onClick={onTogglePublicMode}
                        disabled={togglingPublicMode}
                        className="mt-4 rounded-full bg-[var(--surface-strong)] px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-70"
                      >
                        {togglingPublicMode
                          ? "Mise à jour..."
                          : siteSettings.demoSitesPublic
                            ? "Repasser en privé"
                            : "Rendre public"}
                      </button>
                      <Feedback text={settingsFeedback} tone={settingsTone} />
                    </div>
                  </div>

                  <form
                    className="mt-6 grid gap-4 rounded-[1.4rem] border border-[var(--line-strong)] bg-white/72 p-5"
                    onSubmit={onCreateSite}
                    noValidate
                  >
                    <div className="grid gap-4 md:grid-cols-2">
                      <Field label="Nom du site de démo">
                        <input
                          value={siteCreateName}
                          onChange={(event) => setSiteCreateName(event.target.value)}
                          className={fieldClassName}
                          placeholder="ex: Demo avocat premium"
                          required
                        />
                      </Field>

                      <Field label="Identifiant (optionnel)">
                        <input
                          value={siteCreateId}
                          onChange={(event) => setSiteCreateId(event.target.value)}
                          className={fieldClassName}
                          placeholder="ex: demo-avocat"
                        />
                      </Field>
                    </div>

                    <button
                      type="submit"
                      disabled={submittingSite}
                      className="w-fit rounded-full bg-[linear-gradient(110deg,#6f9f29,#8abf39)] px-5 py-3 text-sm font-extrabold text-white disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {submittingSite ? "Création..." : "Créer un site de démo"}
                    </button>

                    <Feedback text={siteFeedback} tone={siteTone} />
                  </form>
                </section>

                <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {demoSites.length === 0 ? (
                    <div className="glass-panel rounded-[1.8rem] px-6 py-6 text-sm text-[var(--ink-soft)]">
                      Aucun site de démo pour le moment.
                    </div>
                  ) : (
                    demoSites.map((site, index) => (
                      <FadeIn
                        key={site.id}
                        delay={0.04 * index}
                        className="glass-panel rounded-[1.8rem] px-6 py-6"
                      >
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand-soft)]">
                          {site.id}
                        </p>
                        <h4 className="mt-3 font-display text-2xl font-semibold text-[var(--ink-strong)]">
                          {site.name}
                        </h4>
                        <p className="mt-3 text-sm text-[var(--ink-soft)]">
                          {site.path}
                        </p>

                        <div className="mt-6 flex flex-wrap gap-3">
                          <Link
                            href={withCacheBuster(site.path)}
                            className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-[var(--brand)]"
                          >
                            Voir le site
                          </Link>
                          <button
                            type="button"
                            onClick={() => onDeleteSite(site)}
                            className="rounded-full border border-[var(--line-strong)] bg-transparent px-4 py-2 text-sm font-semibold text-[var(--ink-strong)]"
                          >
                            Supprimer
                          </button>
                        </div>
                      </FadeIn>
                    ))
                  )}
                </section>

                <section className="glass-panel rounded-[1.8rem] px-6 py-6">
                  <p className="font-display text-sm font-semibold uppercase tracking-[0.24em] text-[var(--brand-soft)]">
                    Performance
                  </p>
                  <h3 className="mt-2 font-display text-2xl font-semibold text-[var(--ink-strong)]">
                    Sites et clics
                  </h3>
                  <p className="mt-3 text-sm font-semibold text-[var(--ink-soft)]">
                    Total des clics hors connexion : {formatNumber(analyticsTotal)}
                  </p>
                  <Feedback text={analyticsFeedback} tone={analyticsTone} />

                  <div className="mt-6 overflow-x-auto">
                    <table className="min-w-full border-separate border-spacing-y-2">
                      <thead>
                        <tr className="text-left text-xs font-semibold uppercase tracking-[0.16em] text-[var(--brand-soft)]">
                          <th className="px-3 py-2">Site</th>
                          <th className="px-3 py-2">URL</th>
                          <th className="px-3 py-2">Clics hors connexion</th>
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
                            <tr
                              key={site.id}
                              className="bg-white/72 text-sm text-[var(--ink-strong)]"
                            >
                              <td className="rounded-l-[1rem] px-3 py-4 font-semibold">
                                {site.name}
                              </td>
                              <td className="px-3 py-4">{site.path}</td>
                              <td className="px-3 py-4">
                                {formatNumber(site.nonAdminClicks)}
                              </td>
                              <td className="px-3 py-4">
                                {site.lastClickAt
                                  ? formatDateTime(site.lastClickAt)
                                  : "-"}
                              </td>
                              <td className="rounded-r-[1rem] px-3 py-4">
                                <Link
                                  href={withCacheBuster(site.path)}
                                  className="inline-flex whitespace-nowrap rounded-full border border-[var(--line-strong)] bg-white px-4 py-2 text-xs font-semibold text-[var(--brand)]"
                                >
                                  Voir le site
                                </Link>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </section>
              </div>
            )}
          </section>
        )}
      </div>
    </main>
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

    const payload = (await readJson(response)) as
      | { authenticated?: boolean }
      | null;
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
