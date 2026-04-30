"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import { FadeIn } from "@/components/fade-in";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { migrationSteps, offers, routeStatuses } from "@/lib/site";

export function HomePage() {
  return (
    <main className="px-4 py-4 md:px-6">
      <SiteHeader />

      <section className="mx-auto mt-6 grid w-full max-w-6xl gap-6 lg:grid-cols-[1.08fr_0.92fr]">
        <FadeIn className="glass-panel relative overflow-hidden rounded-[2rem] px-6 py-8 md:px-8 md:py-10">
          <div className="hero-orb hero-orb-a" />
          <div className="hero-orb hero-orb-b" />

          <div className="relative z-10">
            <p className="font-display text-sm font-semibold uppercase tracking-[0.24em] text-[var(--brand-soft)]">
              Migration 2026
            </p>
            <h1 className="mt-4 max-w-3xl text-balance font-display text-4xl font-semibold leading-tight md:text-6xl">
              Un site plus propre, plus rapide, sans la 3D de fond qui alourdissait tout.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-[var(--ink-soft)] md:text-lg">
              Le decor WebGL a ete retire puis le front a ete reconstruit avec Next.js,
              Tailwind CSS et Framer Motion. Les pages publiques, l&apos;admin et les demos
              clientes passent maintenant par la meme base propre.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="rounded-full bg-[var(--surface-strong)] px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5"
              >
                Lancer la migration
              </Link>
              <Link
                href="/demo-site"
                className="rounded-full border border-[var(--line-strong)] bg-white px-5 py-3 text-sm font-semibold text-[var(--brand)]"
              >
                Voir les demos
              </Link>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                "Fond 3D retire dans l'ancien front",
                "Nouvelle base Next.js en production interne",
                "Admin et demos migres sur des routes unifiees",
              ].map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.08, duration: 0.5 }}
                  className="rounded-[1.25rem] border border-white/60 bg-white/70 px-4 py-4 text-sm font-medium text-[var(--ink-strong)] shadow-[0_14px_32px_rgba(19,37,61,0.06)]"
                >
                  {item}
                </motion.div>
              ))}
            </div>
          </div>
        </FadeIn>

        <FadeIn className="grid gap-4" delay={0.08}>
          <div className="glass-panel overflow-hidden rounded-[2rem] p-3">
            <div className="grid gap-3 md:grid-cols-2">
              <div className="overflow-hidden rounded-[1.4rem]">
                <Image
                  src="/hero/photoia.png"
                  alt="Presentation Hproweb"
                  width={1200}
                  height={1200}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="overflow-hidden rounded-[1.4rem]">
                <Image
                  src="/hero/appel.png"
                  alt="Echange client Hproweb"
                  width={1200}
                  height={1200}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>

          <div className="glass-panel rounded-[2rem] px-6 py-6">
            <p className="font-display text-sm font-semibold uppercase tracking-[0.24em] text-[var(--brand-soft)]">
              Direction
            </p>
            <p className="mt-3 text-base leading-7 text-[var(--ink-soft)]">
              Le nouveau front n&apos;est pas une copie brute. Il repose sur une structure
              moderne, un routeur unique pour toutes les pages clientes, et des animations
              UI legeres a la place des anciennes couches fragiles.
            </p>
          </div>
        </FadeIn>
      </section>

      <section className="mx-auto mt-8 w-full max-w-6xl">
        <FadeIn className="mb-5">
          <p className="font-display text-sm font-semibold uppercase tracking-[0.24em] text-[var(--brand-soft)]">
            Offre signature
          </p>
          <h2 className="mt-3 max-w-2xl text-balance font-display text-3xl font-semibold md:text-4xl">
            Trois supports, une seule direction visuelle.
          </h2>
        </FadeIn>

        <div className="grid gap-4 lg:grid-cols-3">
          {offers.map((offer, index) => (
            <FadeIn
              key={offer.title}
              delay={0.08 * index}
              className="glass-panel rounded-[1.75rem] p-5"
            >
              <div className="overflow-hidden rounded-[1.25rem] border border-white/70 bg-white/80 p-4">
                <Image
                  src={offer.image}
                  alt={offer.alt}
                  width={900}
                  height={700}
                  className="h-48 w-full object-contain"
                />
              </div>
              <p className="mt-5 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--brand-soft)]">
                {offer.tagline}
              </p>
              <h3 className="mt-2 font-display text-2xl font-semibold">{offer.title}</h3>
              <p className="mt-3 text-sm leading-6 text-[var(--ink-soft)]">{offer.summary}</p>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-8 grid w-full max-w-6xl gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <FadeIn className="glass-panel rounded-[2rem] px-6 py-7">
          <p className="font-display text-sm font-semibold uppercase tracking-[0.24em] text-[var(--brand-soft)]">
            Roadmap
          </p>
          <h2 className="mt-3 text-balance font-display text-3xl font-semibold">
            Migration terminee, base propre, trajectoire claire.
          </h2>
          <div className="mt-6 space-y-4">
            {migrationSteps.map((step, index) => (
              <div
                key={step.title}
                className="rounded-[1.4rem] border border-white/70 bg-white/72 px-4 py-4"
              >
                <p className="text-sm font-semibold text-[var(--brand)]">0{index + 1}</p>
                <h3 className="mt-1 text-lg font-semibold text-[var(--ink-strong)]">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-[var(--ink-soft)]">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </FadeIn>

        <FadeIn className="glass-panel rounded-[2rem] px-6 py-7" delay={0.08}>
          <p className="font-display text-sm font-semibold uppercase tracking-[0.24em] text-[var(--brand-soft)]">
            Etat des routes
          </p>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {routeStatuses.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="rounded-[1.3rem] border border-white/70 bg-white/76 px-4 py-4 transition hover:-translate-y-1"
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-semibold text-[var(--ink-strong)]">{item.title}</h3>
                  <span className="rounded-full bg-[var(--surface-base)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--brand)]">
                    {item.status}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-6 text-[var(--ink-soft)]">{item.detail}</p>
              </Link>
            ))}
          </div>
        </FadeIn>
      </section>

      <SiteFooter />
    </main>
  );
}
