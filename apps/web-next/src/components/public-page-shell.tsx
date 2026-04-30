import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import { FadeIn } from "@/components/fade-in";
import { SiteFooter } from "@/components/site-footer";

type PublicPageShellProps = {
  title: string;
  description: string;
  eyebrow: string;
  children: ReactNode;
  navLinks?: Array<{ href: string; label: string }>;
};

const defaultNavLinks = [
  { href: "/#offres", label: "Offres" },
  { href: "/#process", label: "Methode" },
  { href: "/demo-site", label: "Site demo" },
  { href: "/admin", label: "Connexion" },
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
      <header className="mx-auto flex w-full max-w-6xl flex-col gap-4 rounded-[1.4rem] border border-[var(--line-soft)] bg-white/80 px-5 py-4 shadow-[0_18px_40px_rgba(19,37,61,0.08)] backdrop-blur lg:flex-row lg:items-center lg:justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/hplogo.png"
            alt="Logo Hproweb"
            width={88}
            height={88}
            className="h-16 w-auto object-contain"
          />
          <div>
            <p className="font-display text-sm font-semibold uppercase tracking-[0.24em] text-[var(--brand)]">
              Hproweb
            </p>
            <p className="text-xs text-[var(--ink-soft)]">Creation de sites internet</p>
          </div>
        </Link>

        <nav className="flex flex-wrap gap-2">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full border border-[var(--line-soft)] bg-white px-4 py-2 text-sm font-semibold text-[var(--brand)] transition hover:-translate-y-0.5"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </header>

      <section className="mx-auto mt-6 grid w-full max-w-6xl gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <FadeIn className="glass-panel rounded-[2rem] px-6 py-8 md:px-8 md:py-9">
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
