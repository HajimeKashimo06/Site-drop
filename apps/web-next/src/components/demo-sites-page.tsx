"use client";

import Link from "next/link";
import type { FormEvent } from "react";
import { useEffect, useState } from "react";

import { FadeIn } from "@/components/fade-in";
import { PublicPageShell } from "@/components/public-page-shell";
import type { DemoSite } from "@/lib/site";

type FeedbackTone = "success" | "error" | "";

export function DemoSitesPage() {
  const [sites, setSites] = useState<DemoSite[]>([]);
  const [loadingSites, setLoadingSites] = useState(true);
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [feedback, setFeedback] = useState("");
  const [tone, setTone] = useState<FeedbackTone>("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const loadSites = async () => {
      setLoadingSites(true);
      try {
        const response = await fetch("/api/demo-sites", {
          method: "GET",
          credentials: "include",
        });
        const payload = await readJson(response);
        if (!cancelled) {
          setSites(Array.isArray(payload?.sites) ? (payload.sites as DemoSite[]) : []);
        }
      } catch {
        if (!cancelled) {
          setSites([]);
        }
      } finally {
        if (!cancelled) {
          setLoadingSites(false);
        }
      }
    };

    void loadSites();

    return () => {
      cancelled = true;
    };
  }, []);

  const onLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFeedback("");
    setTone("");

    if (!loginUsername.trim() || !loginPassword.trim()) {
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
          username: loginUsername.trim(),
          password: loginPassword.trim(),
        }),
      });

      const payload = await readJson(response);
      if (!response.ok) {
        setFeedback(
          typeof payload?.error === "string" ? payload.error : "Connexion impossible.",
        );
        setTone("error");
        return;
      }

      const redirectPath =
        typeof payload?.redirectPath === "string" ? payload.redirectPath : "";
      if (redirectPath) {
        window.location.href = redirectPath;
        return;
      }

      setFeedback("Connexion validée.");
      setTone("success");
    } catch {
      setFeedback("Connexion impossible pour le moment.");
      setTone("error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PublicPageShell
      eyebrow="Portail démos"
      title="Accédez à vos démonstrations en ligne"
      description="Retrouvez les liens de démo publics ou connectez-vous avec un compte client pour ouvrir un site de démonstration privé."
      navLinks={[
        { href: "/", label: "Accueil" },
        { href: "/offres", label: "Nos offres" },
        { href: "/contact", label: "Contact" },
      ]}
    >
      <FadeIn className="glass-panel rounded-[2rem] px-6 py-8 md:px-8 md:py-9">
        <p className="font-display text-sm font-semibold uppercase tracking-[0.24em] text-[var(--brand-soft)]">
          Connexion client
        </p>
        <h2 className="mt-3 font-display text-3xl font-semibold text-[var(--ink-strong)]">
          Ouvrir un accès privé
        </h2>
        <form className="mt-6 grid gap-4" onSubmit={onLogin} noValidate>
          <label className="grid gap-2 text-sm font-bold text-[var(--brand)]">
            <span>Identifiant</span>
            <input
              value={loginUsername}
              onChange={(event) => setLoginUsername(event.target.value)}
              className={fieldClassName}
              autoComplete="username"
              required
            />
          </label>
          <label className="grid gap-2 text-sm font-bold text-[var(--brand)]">
            <span>Mot de passe</span>
            <input
              type="password"
              value={loginPassword}
              onChange={(event) => setLoginPassword(event.target.value)}
              className={fieldClassName}
              autoComplete="current-password"
              required
            />
          </label>

          <button
            type="submit"
            disabled={submitting}
            className="w-fit rounded-full bg-[linear-gradient(110deg,#6f9f29,#8abf39)] px-5 py-3 text-sm font-extrabold text-white disabled:cursor-not-allowed disabled:opacity-70"
          >
            {submitting ? "Connexion..." : "Se connecter"}
          </button>

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
      </FadeIn>

      <FadeIn className="glass-panel rounded-[2rem] px-6 py-8 md:px-8 md:py-9" delay={0.08}>
        <p className="font-display text-sm font-semibold uppercase tracking-[0.24em] text-[var(--brand-soft)]">
          Démos publiques
        </p>
        <h2 className="mt-3 font-display text-3xl font-semibold text-[var(--ink-strong)]">
          Liens disponibles
        </h2>

        {loadingSites ? (
          <p className="mt-6 text-sm text-[var(--ink-soft)]">Chargement des démos...</p>
        ) : sites.length === 0 ? (
          <p className="mt-6 text-sm leading-6 text-[var(--ink-soft)]">
            Aucune démonstration publique n&apos;est disponible pour le moment.
          </p>
        ) : (
          <div className="mt-6 grid gap-4">
            {sites.map((site, index) => (
              <FadeIn
                key={site.id}
                delay={0.04 * index}
                className="rounded-[1.4rem] border border-[var(--line-strong)] bg-white/84 px-5 py-5"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand-soft)]">
                  {site.id}
                </p>
                <h3 className="mt-2 font-display text-2xl font-semibold text-[var(--ink-strong)]">
                  {site.name}
                </h3>
                <p className="mt-2 text-sm text-[var(--ink-soft)]">{site.path}</p>
                <Link
                  href={site.path}
                  className="mt-5 inline-flex rounded-full bg-white px-4 py-2 text-sm font-semibold text-[var(--brand)]"
                >
                  Voir la démo
                </Link>
              </FadeIn>
            ))}
          </div>
        )}
      </FadeIn>
    </PublicPageShell>
  );
}

async function readJson(
  response: Response,
): Promise<Record<string, unknown> | null> {
  try {
    return (await response.json()) as Record<string, unknown>;
  } catch {
    return null;
  }
}

const fieldClassName =
  "w-full rounded-[0.95rem] border border-[rgba(24,79,143,0.18)] bg-white px-4 py-3 text-sm text-[var(--ink-strong)] outline-none transition focus:border-[rgba(24,79,143,0.48)] focus:ring-4 focus:ring-[rgba(43,113,187,0.12)]";
