import { FadeIn } from "@/components/fade-in";
import { PublicPageShell } from "@/components/public-page-shell";

type InfoSection = {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
};

type InfoPageProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
  sections: InfoSection[];
};

export function InfoPage({
  eyebrow,
  title,
  subtitle,
  sections,
}: InfoPageProps) {
  return (
    <PublicPageShell
      eyebrow={eyebrow}
      title={title}
      description={subtitle}
      navLinks={[
        { href: "/offres", label: "Offres" },
        { href: "/mentions-legales", label: "Mentions légales" },
        { href: "/cgv", label: "CGV" },
        { href: "/contact", label: "Nous contacter" },
      ]}
    >
      <div className="grid gap-4">
        {sections.map((section, index) => (
          <FadeIn
            key={section.title}
            delay={0.06 * index}
            className="glass-panel rounded-[1.75rem] px-5 py-5 md:px-6"
          >
            <h2 className="font-display text-2xl font-semibold text-[var(--ink-strong)]">
              {section.title}
            </h2>
            {section.paragraphs?.map((paragraph) => (
              <p
                key={paragraph}
                className="mt-3 text-sm leading-7 text-[var(--ink-soft)] md:text-base"
              >
                {paragraph}
              </p>
            ))}
            {section.bullets ? (
              <ul className="mt-4 grid gap-3 text-sm leading-7 text-[var(--ink-soft)] md:text-base">
                {section.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="rounded-[1.1rem] border border-white/70 bg-white/70 px-4 py-3"
                  >
                    {bullet}
                  </li>
                ))}
              </ul>
            ) : null}
          </FadeIn>
        ))}
      </div>
    </PublicPageShell>
  );
}
