import Link from "next/link";

import { legalNavigation, mainNavigation } from "@/lib/site";

const publicFooterNavigation = mainNavigation.filter((item) => item.href !== "/admin");

export function SiteFooter() {
  return (
    <footer className="mx-auto mt-16 w-full max-w-6xl rounded-[1.8rem] border border-[var(--line-soft)] bg-white/72 px-6 py-8 shadow-[0_18px_40px_rgba(19,37,61,0.08)] backdrop-blur">
      <div className="flex flex-col gap-8 md:flex-row md:justify-between">
        <div className="max-w-md">
          <p className="font-display text-lg font-semibold text-[var(--brand)]">Hproweb</p>
          <p className="mt-2 text-sm leading-6 text-[var(--ink-soft)]">
            Création de sites internet sur-mesure pour indépendants, commerces et petites
            entreprises qui veulent une image plus sérieuse et plus professionnelle en ligne.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <p className="text-sm font-semibold text-[var(--ink-strong)]">Navigation</p>
            <div className="mt-3 flex flex-col gap-2 text-sm text-[var(--ink-soft)]">
              {publicFooterNavigation.map((item) => (
                <Link key={item.href} href={item.href}>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-[var(--ink-strong)]">Informations</p>
            <div className="mt-3 flex flex-col gap-2 text-sm text-[var(--ink-soft)]">
              {legalNavigation.map((item) => (
                <Link key={item.href} href={item.href}>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
