import Link from "next/link";
import type { ReactNode } from "react";

import { FadeIn } from "@/components/fade-in";
import { PublicLoginLink } from "@/components/public-login-link";
import { SiteFooter } from "@/components/site-footer";

type PublicPageShellProps = {
  title: string;
  description: string;
  eyebrow: string;
  children: ReactNode;
  navLinks?: Array<{ href: string; label: string }>;
};

const defaultNavLinks = [
  { href: "/", label: "Accueil" },
  { href: "/offres", label: "Nos offres" },
  { href: "/contact", label: "Contact" },
];

export function PublicPageShell({
  title,
  description,
  eyebrow,
  children,
  navLinks = defaultNavLinks,
}: PublicPageShellProps) {
  return (
    <main className="px-4 py-4 md:px-6">
      <div className="mx-auto flex w-full max-w-6xl justify-end">
        <PublicLoginLink />
      </div>

      <section className="mx-auto mt-6 grid w-full max-w-6xl gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <FadeIn className="glass-panel rounded-[2rem] px-6 py-8 md:px-8 md:py-9">
          <nav className="mb-6 flex flex-wrap gap-2">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full border border-[rgba(15,23,42,0.08)] bg-white/88 px-4 py-2 text-sm font-semibold text-[var(--brand)] transition hover:-translate-y-0.5"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <p className="font-display text-sm font-semibold uppercase tracking-[0.24em] text-[var(--brand-soft)]">
            {eyebrow}
          </p>
          <h1 className="mt-4 max-w-xl text-balance font-display text-4xl font-semibold leading-tight md:text-5xl">
            {title}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-[var(--ink-soft)] md:text-lg">
            {description}
          </p>
        </FadeIn>

        <FadeIn className="grid gap-4" delay={0.08}>
          {children}
        </FadeIn>
      </section>

      <SiteFooter />
    </main>
  );
}
