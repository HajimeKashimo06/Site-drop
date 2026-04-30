"use client";

import type { CSSProperties } from "react";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import { FadeIn } from "@/components/fade-in";
import type { DemoSiteDefinition } from "@/lib/demo-site-content";

type DemoSitePageProps = {
  site: DemoSiteDefinition;
};

type AccessState = "loading" | "ready" | "blocked";

export function DemoSitePage({ site }: DemoSitePageProps) {
  const [access, setAccess] = useState<AccessState>("loading");
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);

  useEffect(() => {
    let cancelled = false;

    const bootstrap = async () => {
      try {
        const response = await fetch(`/api/auth/session?site=${encodeURIComponent(site.id)}`, {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          if (!cancelled) {
            setAccess("blocked");
            window.location.replace("/demo-site");
          }
          return;
        }

        if (!cancelled) {
          setAccess("ready");
        }
      } catch {
        if (!cancelled) {
          setAccess("blocked");
          window.location.replace("/demo-site");
        }
      }
    };

    void bootstrap();

    return () => {
      cancelled = true;
    };
  }, [site.id]);

  if (access === "loading") {
    return (
      <main className="flex min-h-screen items-center justify-center px-4 text-center text-sm font-semibold text-[var(--ink-soft)]">
        Verification de l&apos;acces au site demo...
      </main>
    );
  }

  if (access !== "ready") {
    return null;
  }

  return (
    <main className="min-h-screen px-4 py-4 md:px-6" style={buildThemeStyle(site)}>
      <header className="mx-auto flex w-full max-w-6xl flex-col gap-4 rounded-[1.5rem] border border-[var(--demo-line)] bg-[var(--demo-panel)] px-5 py-4 shadow-[0_20px_44px_rgba(16,24,38,0.12)] backdrop-blur lg:flex-row lg:items-center lg:justify-between">
        <Link href="/" className="flex items-center gap-4">
          {site.logoImage ? (
            <Image
              src={site.logoImage}
              alt={`${site.title} logo`}
              width={88}
              height={88}
              className="h-16 w-16 rounded-[1rem] border border-[var(--demo-line)] bg-white/80 object-contain p-2"
            />
          ) : (
            <div className="flex h-16 w-16 items-center justify-center rounded-[1rem] border border-[var(--demo-line)] bg-[var(--demo-accent-soft)] text-lg font-black text-[var(--demo-accent)]">
              {getInitials(site.title)}
            </div>
          )}
          <div>
            <p className="font-display text-2xl font-semibold text-[var(--demo-ink)]">
              {site.title}
            </p>
            <p className="text-sm text-[var(--demo-ink-soft)]">
              {site.eyebrow} - {site.location}
            </p>
          </div>
        </Link>

        <nav className="flex flex-wrap gap-2">
          {[
            { href: "#presentation", label: "Presentation" },
            { href: "#sections", label: "Contenu" },
            { href: "#process", label: "Process" },
            { href: "#contact", label: "Contact" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full border border-[var(--demo-line)] bg-white/70 px-4 py-2 text-sm font-semibold text-[var(--demo-accent)] transition hover:-translate-y-0.5"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </header>

      <section
        id="presentation"
        className="mx-auto mt-6 grid w-full max-w-6xl gap-6 rounded-[2rem] border border-[var(--demo-line)] px-6 py-8 shadow-[0_24px_52px_rgba(16,24,38,0.12)] lg:grid-cols-[1.05fr_0.95fr] lg:px-8"
        style={{ backgroundImage: "var(--demo-hero-bg)" }}
      >
        <FadeIn>
          <p className="font-display text-sm font-semibold uppercase tracking-[0.24em] text-[var(--demo-accent)]">
            {site.eyebrow}
          </p>
          <h1 className="mt-4 max-w-3xl text-balance font-display text-5xl font-semibold leading-none text-[var(--demo-ink)] md:text-6xl">
            {site.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-[var(--demo-ink-soft)]">
            {site.description}
          </p>

          <div className="mt-6 flex flex-wrap gap-2 text-sm font-semibold text-[var(--demo-ink-soft)]">
            {site.badges.map((badge) => (
              <span
                key={badge}
                className="rounded-full border border-[var(--demo-line)] bg-white/72 px-4 py-2"
              >
                {badge}
              </span>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="rounded-full bg-[var(--demo-accent)] px-5 py-3 text-sm font-semibold text-[var(--demo-accent-contrast)] transition hover:-translate-y-0.5"
            >
              Demander cette maquette
            </Link>
            <Link
              href="/demo-site"
              className="rounded-full border border-[var(--demo-line)] bg-white/72 px-5 py-3 text-sm font-semibold text-[var(--demo-accent)]"
            >
              Revenir au portail demo
            </Link>
          </div>
        </FadeIn>

        <FadeIn className="grid gap-4" delay={0.08}>
          {site.heroImage ? (
            <div className="overflow-hidden rounded-[1.8rem] border border-[var(--demo-line)] bg-[var(--demo-panel)]">
              <Image
                src={site.heroImage}
                alt={site.heroImageAlt ?? site.title}
                width={1200}
                height={1000}
                className="h-full w-full object-cover"
                priority
              />
            </div>
          ) : (
            <div className="rounded-[1.8rem] border border-[var(--demo-line)] bg-[var(--demo-panel)] p-6">
              <div className="rounded-[1.4rem] border border-[var(--demo-line)] bg-white/40 px-5 py-6">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--demo-accent)]">
                  Site migre
                </p>
                <p className="mt-3 text-3xl font-semibold text-[var(--demo-ink)]">{site.title}</p>
                <p className="mt-3 text-sm leading-7 text-[var(--demo-ink-soft)]">
                  Cette demo utilise maintenant une route Next dynamique partagee au lieu d&apos;un
                  fichier HTML isole.
                </p>
              </div>
            </div>
          )}

          <div className="grid gap-3 sm:grid-cols-3">
            {site.stats.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12 + index * 0.08, duration: 0.45 }}
                className="rounded-[1.35rem] border border-[var(--demo-line)] bg-[var(--demo-panel)] px-4 py-4"
              >
                <p className="text-2xl font-black text-[var(--demo-ink)]">{item.value}</p>
                <p className="mt-1 text-sm font-semibold text-[var(--demo-ink-soft)]">
                  {item.label}
                </p>
              </motion.div>
            ))}
          </div>
        </FadeIn>
      </section>

      <section id="sections" className="mx-auto mt-8 grid w-full max-w-6xl gap-4 lg:grid-cols-[1.08fr_0.92fr]">
        <FadeIn className="rounded-[1.8rem] border border-[var(--demo-line)] bg-[var(--demo-panel)] px-6 py-6">
          <p className="font-display text-sm font-semibold uppercase tracking-[0.24em] text-[var(--demo-accent)]">
            Contenu
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-[var(--demo-ink)]">
            Sections migrees dans la nouvelle base
          </h2>
          <div className="mt-6 grid gap-4">
            {site.sections.map((section) => (
              <article
                key={section.title}
                className="rounded-[1.35rem] border border-[var(--demo-line)] bg-white/50 px-5 py-5"
              >
                <h3 className="font-display text-2xl font-semibold text-[var(--demo-ink)]">
                  {section.title}
                </h3>
                <ul className="mt-4 grid gap-3 text-sm leading-7 text-[var(--demo-ink-soft)]">
                  {section.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-[1rem] border border-[var(--demo-line)] bg-white/70 px-4 py-3"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </FadeIn>

        <FadeIn className="grid gap-4" delay={0.08}>
          {site.secondaryImage ? (
            <div className="overflow-hidden rounded-[1.8rem] border border-[var(--demo-line)] bg-[var(--demo-panel)]">
              <Image
                src={site.secondaryImage}
                alt={site.secondaryImageAlt ?? site.title}
                width={1200}
                height={1000}
                className="h-full w-full object-cover"
              />
            </div>
          ) : null}

          <div className="rounded-[1.8rem] border border-[var(--demo-line)] bg-[var(--demo-panel)] px-6 py-6">
            <p className="font-display text-sm font-semibold uppercase tracking-[0.24em] text-[var(--demo-accent)]">
              Points forts
            </p>
            <div className="mt-4 grid gap-3">
              {site.highlights.map((item) => (
                <div
                  key={item}
                  className="rounded-[1.2rem] border border-[var(--demo-line)] bg-white/60 px-4 py-4 text-sm font-semibold text-[var(--demo-ink)]"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </section>

      {site.gallery.length > 0 ? (
        <section className="mx-auto mt-8 w-full max-w-6xl">
          <FadeIn>
            <p className="font-display text-sm font-semibold uppercase tracking-[0.24em] text-[var(--demo-accent)]">
              Galerie
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-[var(--demo-ink)]">
              Assets existants reutilises proprement
            </h2>
          </FadeIn>
          <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {site.gallery.map((image, index) => (
              <FadeIn
                key={image.src}
                delay={0.06 * index}
                className="overflow-hidden rounded-[1.6rem] border border-[var(--demo-line)] bg-[var(--demo-panel)]"
              >
                <button type="button" onClick={() => setLightbox(image)} className="block w-full">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={900}
                    height={700}
                    className="h-64 w-full object-cover transition duration-300 hover:scale-[1.03]"
                  />
                </button>
              </FadeIn>
            ))}
          </div>
        </section>
      ) : null}

      <section className="mx-auto mt-8 grid w-full max-w-6xl gap-4 lg:grid-cols-[1fr_1fr]">
        <section id="process">
          <FadeIn className="rounded-[1.8rem] border border-[var(--demo-line)] bg-[var(--demo-panel)] px-6 py-6">
          <p className="font-display text-sm font-semibold uppercase tracking-[0.24em] text-[var(--demo-accent)]">
            Process
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-[var(--demo-ink)]">
            Comment la demo fonctionne maintenant
          </h2>
          <div className="mt-6 space-y-4">
            {site.process.map((step, index) => (
              <div
                key={step.title}
                className="rounded-[1.3rem] border border-[var(--demo-line)] bg-white/55 px-4 py-4"
              >
                <p className="text-sm font-black text-[var(--demo-accent)]">0{index + 1}</p>
                <h3 className="mt-1 text-lg font-semibold text-[var(--demo-ink)]">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-7 text-[var(--demo-ink-soft)]">{step.text}</p>
              </div>
            ))}
          </div>
          </FadeIn>
        </section>

        <section id="contact">
          <FadeIn
            className="rounded-[1.8rem] border border-[var(--demo-line)] bg-[var(--demo-panel)] px-6 py-6"
            delay={0.08}
          >
          <p className="font-display text-sm font-semibold uppercase tracking-[0.24em] text-[var(--demo-accent)]">
            Contact
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-[var(--demo-ink)]">
            Suite de la migration
          </h2>
          <p className="mt-3 text-sm leading-7 text-[var(--demo-ink-soft)]">
            La maquette est maintenant servie par la nouvelle stack. Les prochaines iterations
            concernent uniquement le contenu client, pas la base technique.
          </p>
          <div className="mt-6 grid gap-3">
            {site.contactCards.map((card) => (
              <div
                key={card.title}
                className="rounded-[1.25rem] border border-[var(--demo-line)] bg-white/62 px-4 py-4"
              >
                <p className="text-sm font-black uppercase tracking-[0.16em] text-[var(--demo-accent)]">
                  {card.title}
                </p>
                <p className="mt-2 text-sm leading-7 text-[var(--demo-ink-soft)]">
                  {card.detail}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="rounded-full bg-[var(--demo-accent)] px-5 py-3 text-sm font-semibold text-[var(--demo-accent-contrast)]"
            >
              Ouvrir le formulaire de contact
            </Link>
            <Link
              href="/admin"
              className="rounded-full border border-[var(--demo-line)] bg-white/70 px-5 py-3 text-sm font-semibold text-[var(--demo-accent)]"
            >
              Retour admin
            </Link>
          </div>
          </FadeIn>
        </section>
      </section>

      {lightbox ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4"
          onClick={() => setLightbox(null)}
        >
          <button
            type="button"
            onClick={() => setLightbox(null)}
            className="absolute right-4 top-4 rounded-full bg-white px-4 py-2 text-sm font-semibold text-black"
          >
            Fermer
          </button>
          <Image
            src={lightbox.src}
            alt={lightbox.alt}
            width={1600}
            height={1200}
            className="max-h-[84vh] w-auto rounded-[1.5rem] object-contain"
          />
        </div>
      ) : null}
    </main>
  );
}

function getInitials(value: string): string {
  return value
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
}

function buildThemeStyle(site: DemoSiteDefinition): CSSProperties {
  return {
    backgroundImage: site.theme.pageBackground,
    color: site.theme.ink,
    ["--demo-hero-bg" as string]: site.theme.heroBackground,
    ["--demo-panel" as string]: site.theme.panelBackground,
    ["--demo-line" as string]: site.theme.panelBorder,
    ["--demo-ink" as string]: site.theme.ink,
    ["--demo-ink-soft" as string]: site.theme.inkSoft,
    ["--demo-accent" as string]: site.theme.accent,
    ["--demo-accent-strong" as string]: site.theme.accentStrong,
    ["--demo-accent-contrast" as string]: site.theme.accentContrast,
    ["--demo-accent-soft" as string]: `${site.theme.accent}18`,
  };
}
