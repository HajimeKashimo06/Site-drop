import Link from "next/link";

import { FadeIn } from "@/components/fade-in";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

type RoutePlaceholderProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function RoutePlaceholder({
  eyebrow,
  title,
  description,
}: RoutePlaceholderProps) {
  return (
    <main className="px-4 py-4 md:px-6">
      <SiteHeader />

      <section className="mx-auto mt-10 flex w-full max-w-4xl flex-col gap-6">
        <FadeIn className="glass-panel rounded-[2rem] px-6 py-10 md:px-10">
          <p className="font-display text-sm font-semibold uppercase tracking-[0.24em] text-[var(--brand-soft)]">
            {eyebrow}
          </p>
          <h1 className="mt-4 max-w-2xl text-balance font-display text-4xl font-semibold text-[var(--ink-strong)] md:text-5xl">
            {title}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--ink-soft)] md:text-lg">
            {description}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/"
              className="rounded-full bg-[var(--surface-strong)] px-5 py-3 text-sm font-semibold text-white"
            >
              Revenir a l&apos;accueil
            </Link>
            <Link
              href="/demo-site"
              className="rounded-full border border-[var(--line-strong)] bg-white px-5 py-3 text-sm font-semibold text-[var(--brand)]"
            >
              Voir les demos
            </Link>
          </div>
        </FadeIn>
      </section>

      <SiteFooter />
    </main>
  );
}
