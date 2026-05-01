"use client";

import Link from "next/link";

import { FadeIn } from "@/components/fade-in";
import { HomeFaq } from "@/components/home-faq";
import { PublicLoginLink } from "@/components/public-login-link";
import { SiteGrowthChart } from "@/components/site-growth-chart";
import { SiteFooter } from "@/components/site-footer";
import { SiteShowcaseCarousel } from "@/components/site-showcase-carousel";

export function HomePage() {
  return (
    <main className="px-4 py-4 md:px-6">
      <div className="mx-auto flex w-full max-w-7xl justify-end">
        <PublicLoginLink />
      </div>

      <section className="mx-auto mt-3 w-full max-w-7xl">
        <FadeIn className="mx-auto w-full max-w-5xl px-4 text-center">
          <div className="inline-flex rounded-full border border-white/70 bg-white/80 px-5 py-2 text-xs font-semibold uppercase tracking-[0.26em] text-[var(--brand-soft)] shadow-[0_18px_40px_rgba(15,23,42,0.06)] backdrop-blur">
            Création de sites internet
          </div>
          <h1 className="mx-auto mt-5 max-w-4xl text-balance font-display text-[clamp(2.8rem,7vw,5.4rem)] font-semibold leading-[0.92] tracking-[-0.05em]">
            Des sites internet sur-mesure pour donner une image sérieuse et moderne à votre entreprise.
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-[var(--ink-soft)] md:text-lg">
            Hproweb crée des sites clairs, élégants et efficaces pour présenter votre activité,
            rassurer vos visiteurs et vous aider à obtenir plus de demandes de contact.
          </p>
        </FadeIn>

        <div className="mt-8">
          <SiteShowcaseCarousel />
        </div>
      </section>

      <section className="mx-auto mt-10 flex w-full max-w-4xl flex-col items-center">
        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <Link
            href="/contact"
            className="inline-flex min-w-[15rem] justify-center rounded-full border border-[rgba(15,23,42,0.08)] bg-white px-7 py-4 text-base font-semibold text-[var(--surface-strong)] shadow-[0_24px_50px_rgba(15,23,42,0.12)] transition hover:-translate-y-1"
          >
            Demander une démo gratuite
          </Link>
          <Link
            href="/offres"
            className="inline-flex min-w-[15rem] justify-center rounded-full border border-[rgba(15,23,42,0.1)] bg-white/88 px-7 py-4 text-base font-semibold text-[var(--ink-strong)] shadow-[0_20px_46px_rgba(15,23,42,0.08)] transition hover:-translate-y-1"
          >
            Voir nos offres
          </Link>
        </div>

        <FadeIn className="w-full" delay={0.08}>
          <SiteGrowthChart />
        </FadeIn>
      </section>

      <HomeFaq />

      <SiteFooter />
    </main>
  );
}
