import Image from "next/image";
import Link from "next/link";

import { mainNavigation } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="sticky top-3 z-30 mx-auto flex w-full max-w-6xl items-center justify-between gap-4 rounded-[1.25rem] border border-[var(--line-soft)] bg-white/78 px-4 py-3 shadow-[0_18px_40px_rgba(19,37,61,0.1)] backdrop-blur md:px-6">
      <Link href="/" className="flex items-center gap-3">
        <Image
          src="/brand/hplogo.png"
          alt="Logo Hproweb"
          width={60}
          height={60}
          priority
          className="h-12 w-auto object-contain"
        />
        <div>
          <p className="font-display text-sm font-semibold uppercase tracking-[0.24em] text-[var(--brand)]">
            Hproweb
          </p>
          <p className="text-xs text-[var(--ink-soft)]">Migration front propre et progressive</p>
        </div>
      </Link>

      <nav className="hidden items-center gap-2 lg:flex">
        {mainNavigation.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-full border border-transparent px-4 py-2 text-sm font-semibold text-[var(--ink-soft)] transition hover:border-[var(--line-soft)] hover:bg-white hover:text-[var(--brand)]"
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="flex items-center gap-2">
        <Link
          href="/contact"
          className="rounded-full border border-[var(--line-strong)] bg-[var(--surface-strong)] px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5"
        >
          Etre rappele
        </Link>
      </div>
    </header>
  );
}
