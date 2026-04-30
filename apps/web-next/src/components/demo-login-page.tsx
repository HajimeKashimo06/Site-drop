"use client";

import Link from "next/link";
import type { FormEvent } from "react";
import { useEffect, useState } from "react";

import { PublicPageShell } from "@/components/public-page-shell";
import type { DemoSite } from "@/lib/site";

const FALLBACK_TARGET_PATH = "/demo-site";

type SessionState = {
  authenticated: boolean;
  redirectPath: string | null;
  sites: DemoSite[];
};

export function DemoLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [feedback, setFeedback] = useState("");
  const [tone, setTone] = useState<"success" | "error" | "">("");
  const [submitting, setSubmitting] = useState(false);
  const [session, setSession] = useState<SessionState>({
    authenticated: false,
    redirectPath: null,
    sites: [],
  });

  useEffect(() => {
    let cancelled = false;

    const bootstrap = async () => {
      const currentSession = await getSession();
      if (!currentSession.authenticated || cancelled) {
        return;
      }

      setSession(currentSession);
      setFeedback(
        "Session deja active. Vous pouvez ouvrir votre site ou vous deconnecter.",
      );
      setTone("success");
    };

    void bootstrap();

    return () => {
      cancelled = true;
    };
  }, []);

  const onLogout = async () => {
    setSubmitting(true);
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      setSession({ authenticated: false, redirectPath: null, sites: [] });
      setFeedback("Session fermee. Vous pouvez vous reconnecter.");
      setTone("success");
    } catch {
      setFeedback("Deconnexion impossible pour le moment.");
      setTone("error");
    } finally {
      setSubmitting(false);
    }
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFeedback("");
    setTone("");

    if (!username.trim() || !password.trim()) {
      setFeedback("Merci de remplir tous les champs.");
      setTone("error");
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username.trim(),
          password: password.trim(),
        }),
      });

      const payload = (await response.json().catch(() => null)) as
        | { redirectPath?: unknown; error?: unknown; sites?: DemoSite[] }
        | null;

      if (!response.ok) {
        setFeedback(
          typeof payload?.error === "string"
            ? payload.error
            : "Identifiant ou mot de passe invalide.",
        );
        setTone("error");
        return;
      }

      const redirectPath = resolveRedirectPath(payload?.redirectPath);
      setSession({
        authenticated: true,
        redirectPath,
        sites: Array.isArray(payload?.sites) ? payload.sites : [],
      });
      setFeedback("Connexion validee. Redirection en cours...");
      setTone("success");
      window.setTimeout(() => {
        window.location.assign(redirectPath);
      }, 250);
    } catch {
      setFeedback("Connexion impossible pour le moment. Reessayez.");
      setTone("error");
    } finally {
      setSubmitting(false);
    }
  };

  const openSiteHref = resolveSessionRedirectPath(session);

  return (
    <PublicPageShell
      eyebrow="Site demo"
      title="Connexion au site client"
      description="Entrez les identifiants que vous avez crees pour ouvrir votre site dedie."
      navLinks={[
        { href: "/", label: "Retour a l'accueil" },
        { href: "/contact", label: "Reserver votre demo" },
      ]}
    >
      <article className="rounded-[1.8rem] border border-[rgba(25,76,138,0.24)] bg-[linear-gradient(118deg,rgba(11,31,56,0.82),rgba(23,78,134,0.84))] px-6 py-7 text-white shadow-[0_24px_46px_rgba(18,45,77,0.22)]">
        <p className="font-display text-sm font-semibold uppercase tracking-[0.24em] text-[#aed0f8]">
          Portail client
        </p>
        <h2 className="mt-4 max-w-lg text-balance font-display text-3xl font-semibold leading-tight md:text-4xl">
          Une seule connexion pour ouvrir votre site dedie.
        </h2>
        <p className="mt-5 text-sm leading-7 text-white/88 md:text-base">
          Le nouveau front conserve la logique d&apos;acces et les sessions. Les anciens
          liens legacy sont rediriges vers les nouvelles routes Next.
        </p>
      </article>

      <section className="glass-panel rounded-[1.8rem] px-6 py-7">
        <h2 className="font-display text-3xl font-semibold text-[var(--ink-strong)]">
          Se connecter
        </h2>

        <form className="mt-6 grid gap-4" onSubmit={onSubmit} noValidate>
          <label className="grid gap-2 text-sm font-bold text-[var(--brand)]">
            <span>Identifiant</span>
            <input
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              className={fieldClassName}
              autoComplete="username"
              placeholder="Entrez votre identifiant"
              required
            />
          </label>

          <label className="grid gap-2 text-sm font-bold text-[var(--brand)]">
            <span>Mot de passe</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className={fieldClassName}
              autoComplete="current-password"
              placeholder="Entrez votre mot de passe"
              required
            />
          </label>

          <button
            type="submit"
            disabled={submitting}
            className="rounded-full bg-[linear-gradient(110deg,#6f9f29,#8abf39)] px-5 py-3 text-sm font-extrabold text-white transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {submitting ? "Connexion..." : "Se connecter"}
          </button>

          <div className="flex flex-wrap gap-3">
            <Link
              href={openSiteHref}
              className={`rounded-full border px-4 py-3 text-sm font-semibold transition ${
                session.authenticated
                  ? "border-[var(--line-strong)] bg-white text-[var(--brand)]"
                  : "pointer-events-none border-[var(--line-soft)] bg-white/50 text-[var(--ink-soft)] opacity-60"
              }`}
            >
              Ouvrir mon site
            </Link>
            <button
              type="button"
              onClick={onLogout}
              disabled={!session.authenticated || submitting}
              className="rounded-full border border-[var(--line-strong)] bg-white px-4 py-3 text-sm font-semibold text-[var(--brand)] transition disabled:cursor-not-allowed disabled:opacity-60"
            >
              Se deconnecter
            </button>
          </div>

          {session.authenticated && session.sites.length > 0 ? (
            <div className="rounded-[1.2rem] border border-white/70 bg-white/72 px-4 py-4">
              <p className="text-sm font-semibold text-[var(--ink-strong)]">
                Sites autorises
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {session.sites.map((site) => (
                  <Link
                    key={site.id}
                    href={site.path}
                    className="rounded-full border border-[var(--line-soft)] bg-white px-3 py-2 text-xs font-semibold text-[var(--brand)]"
                  >
                    {site.name}
                  </Link>
                ))}
              </div>
            </div>
          ) : null}

          <p
            className={`min-h-6 text-sm font-bold ${
              tone === "success"
                ? "text-[#2f6f1f]"
                : tone === "error"
                  ? "text-[#bf3f3f]"
                  : "text-transparent"
            }`}
          >
            {feedback || "."}
          </p>
        </form>
      </section>
    </PublicPageShell>
  );
}

async function getSession(): Promise<SessionState> {
  try {
    const response = await fetch("/api/auth/session", {
      method: "GET",
      credentials: "include",
    });
    if (!response.ok) {
      return { authenticated: false, redirectPath: null, sites: [] };
    }

    const payload = (await response.json()) as {
      authenticated?: boolean;
      redirectPath?: unknown;
      sites?: DemoSite[];
    };

    return {
      authenticated: payload.authenticated === true,
      redirectPath: typeof payload.redirectPath === "string" ? payload.redirectPath : null,
      sites: Array.isArray(payload.sites) ? payload.sites : [],
    };
  } catch {
    return { authenticated: false, redirectPath: null, sites: [] };
  }
}

function resolveRedirectPath(rawPath: unknown): string {
  if (typeof rawPath !== "string" || !rawPath.startsWith("/")) {
    return FALLBACK_TARGET_PATH;
  }
  return rawPath;
}

function resolveSessionRedirectPath(session: SessionState): string {
  const directPath = resolveRedirectPath(session.redirectPath);
  if (directPath !== "/admin.html" && directPath !== "/admin") {
    return directPath;
  }

  const firstSitePath = session.sites.find((site) => site.path.startsWith("/"))?.path;
  return firstSitePath ?? FALLBACK_TARGET_PATH;
}

const fieldClassName =
  "w-full rounded-[0.95rem] border border-[rgba(24,79,143,0.18)] bg-white px-4 py-3 text-sm text-[var(--ink-strong)] outline-none transition focus:border-[rgba(24,79,143,0.48)] focus:ring-4 focus:ring-[rgba(43,113,187,0.12)]";
