"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { PublicLoginLink } from "@/components/public-login-link";
import { SiteFooter } from "@/components/site-footer";
import {
  offerFamilies,
  offerTierOptions,
  type OfferFamilyId,
} from "@/lib/site";

const familyDecor = {
  premium: {
    panel:
      "linear-gradient(135deg, rgba(14,24,46,0.96) 0%, rgba(20,47,86,0.94) 50%, rgba(35,74,120,0.92) 100%)",
    border: "rgba(173, 205, 244, 0.22)",
    glow: "rgba(117, 171, 255, 0.24)",
    orbA: "rgba(165, 126, 255, 0.22)",
    orbB: "rgba(106, 176, 255, 0.18)",
    card:
      "linear-gradient(180deg, rgba(255,255,255,0.13), rgba(255,255,255,0.07))",
    cardBorder: "rgba(214, 232, 255, 0.16)",
    badge: "bg-[rgba(106,176,255,0.18)] text-[#d8ecff]",
    iconBg: "bg-[rgba(255,255,255,0.12)]",
    buttonBg: "#ffffff",
    buttonText: "#173763",
    buttonBorder: "rgba(23, 58, 98, 0.16)",
    featureDot: "rgba(181, 224, 255, 0.92)",
  },
  "premium-deluxe": {
    panel:
      "linear-gradient(135deg, rgba(30,22,17,0.97) 0%, rgba(88,62,35,0.96) 42%, rgba(145,110,60,0.94) 74%, rgba(194,153,84,0.9) 100%)",
    border: "rgba(255, 226, 166, 0.3)",
    glow: "rgba(255, 207, 112, 0.32)",
    orbA: "rgba(255, 224, 162, 0.24)",
    orbB: "rgba(255, 244, 212, 0.18)",
    card:
      "linear-gradient(180deg, rgba(255,248,235,0.2), rgba(255,255,255,0.08))",
    cardBorder: "rgba(255, 232, 182, 0.24)",
    badge: "bg-[linear-gradient(135deg,rgba(255,224,158,0.26),rgba(255,245,214,0.18))] text-[#fff3d6]",
    iconBg: "bg-[linear-gradient(135deg,rgba(255,240,205,0.18),rgba(255,255,255,0.08))]",
    buttonBg: "#fffaf4",
    buttonText: "#6d4c27",
    buttonBorder: "rgba(109, 76, 39, 0.16)",
    featureDot: "rgba(255, 242, 214, 0.94)",
  },
} as const;

const familyCopy: Record<
  OfferFamilyId,
  {
    label: string;
    headline?: string;
    intro: string;
    helper: string;
    tierBadges: [string, string, string];
    footer: string;
  }
> = {
  premium: {
    label: "Solutions web",
    headline: "Offre premium",
    intro:
      "Une gamme claire pour lancer un site professionnel, plus rassurant et plus facile a faire evoluer.",
    helper: "Glissez horizontalement sur mobile pour comparer les cartes.",
    tierBadges: ["Essentiel", "Pro gestion", "Experience complete"],
    footer: "Support technique et ajustements inclus",
  },
  "premium-deluxe": {
    label: "Offre complete",
    headline: "Solutions web + carte de visite + prospectus inclus",
    intro:
      "Le site web est livre avec votre carte de visite et votre prospectus pour donner une image plus serieuse et plus complete des le lancement.",
    helper: "Le pack le plus visible pour les clients qui veulent tout recevoir en une seule offre.",
    tierBadges: ["Pack lance", "Pack atelier", "Pack signature"],
    footer: "Site, identite print et accompagnement",
  },
};

function SectionIcon({ familyId }: { familyId: OfferFamilyId }) {
  if (familyId === "premium-deluxe") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="none">
        <rect x="4" y="5" width="16" height="11" rx="2.5" stroke="currentColor" strokeWidth="1.8" />
        <path d="M8 9H16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M7 19H17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="none">
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.8" />
      <path d="M4 12H20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M12 4C14.7 6.4 16 9.06 16 12C16 14.94 14.7 17.6 12 20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M12 4C9.3 6.4 8 9.06 8 12C8 14.94 9.3 17.6 12 20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function TierIcon({ index }: { index: number }) {
  if (index === 1) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="none">
        <rect x="4" y="4" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
        <rect x="14" y="4" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
        <rect x="4" y="14" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
        <path d="M14 17H20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  if (index === 2) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="none">
        <path d="M12 4L18 7V12C18 15.3 15.75 18.28 12 20C8.25 18.28 6 15.3 6 12V7L12 4Z" stroke="currentColor" strokeWidth="1.8" />
        <path d="M9.5 12L11.2 13.7L14.8 10.1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="none">
      <path d="M12 4V9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M12 15V20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M4 12H9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M15 12H20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M6.3 6.3L9.8 9.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M14.2 14.2L17.7 17.7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function OffersPage() {
  return (
    <main className="px-4 py-4 md:px-6">
      <div className="mx-auto flex w-full max-w-7xl justify-end">
        <PublicLoginLink />
      </div>

      <section className="mx-auto mt-6 w-full max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-[2.2rem] border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(243,240,232,0.88))] px-5 py-6 shadow-[0_24px_52px_rgba(15,23,42,0.07)] md:px-7 md:py-7"
        >
          <div className="hero-orb hero-orb-a" />
          <div className="hero-orb hero-orb-b" />

          <div className="relative z-10 mb-5">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-[rgba(19,37,61,0.1)] bg-white/82 px-4 py-2 text-[0.82rem] font-semibold text-[var(--ink-strong)] shadow-[0_12px_26px_rgba(15,23,42,0.05)] transition hover:-translate-y-0.5"
            >
              <span aria-hidden="true">←</span>
              Retour a l&apos;accueil
            </Link>
          </div>

          <div className="relative z-10 flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
            <div className="max-w-[42rem]">
              <div className="inline-flex items-center gap-3 rounded-full border border-white/70 bg-white/80 px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[var(--brand-soft)] shadow-[0_16px_36px_rgba(15,23,42,0.05)]">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[rgba(23,58,98,0.08)] text-[var(--brand)]">
                  <SectionIcon familyId="premium" />
                </span>
                Offres
              </div>

              <h1 className="mt-4 max-w-4xl text-balance font-display text-[clamp(2.1rem,4.4vw,3.7rem)] font-semibold leading-[0.97] tracking-[-0.045em]">
                Des offres plus premium, plus lisibles, et pensees pour inspirer confiance des la premiere visite.
              </h1>

              <p className="mt-3 max-w-3xl text-[0.95rem] leading-7 text-[var(--ink-soft)] md:text-[1.02rem]">
                Chaque formule garde ton contenu actuel, mais la presentation passe en mode
                comparaison claire: meme langage visuel que la page d&apos;accueil, cartes plus
                desirees, lecture plus simple et meilleur niveau percu.
              </p>

              <div className="mt-4 inline-flex items-center gap-3 rounded-full border border-[rgba(23,58,98,0.1)] bg-white/88 px-4 py-2 text-[0.8rem] font-semibold uppercase tracking-[0.16em] text-[var(--brand)] shadow-[0_14px_30px_rgba(15,23,42,0.05)]">
                <span className="rounded-full bg-[rgba(23,58,98,0.08)] px-2.5 py-1 text-[0.7rem] tracking-[0.14em] text-[var(--brand-soft)]">
                  4x
                </span>
                Paiement en 4 fois possible
              </div>
            </div>

            <div className="max-w-sm rounded-[1.5rem] border border-[rgba(19,37,61,0.08)] bg-white/76 px-4 py-4 text-[0.92rem] leading-6 text-[var(--ink-soft)] shadow-[0_16px_34px_rgba(15,23,42,0.05)] backdrop-blur-sm">
              Glissez horizontalement sur mobile pour comparer les cartes. Sur grand ecran, chaque
              famille s&apos;affiche comme un bloc editorial avec ses trois niveaux.
            </div>
          </div>
        </motion.div>
      </section>

      <section className="mx-auto mt-8 w-full max-w-7xl space-y-7">
        {offerFamilies.map((family, familyIndex) => {
          const theme = familyDecor[family.id];
          const copy = familyCopy[family.id];
          const tiers = offerTierOptions[family.id];

          return (
            <motion.article
              key={family.id}
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: familyIndex * 0.08,
                duration: 0.55,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative overflow-hidden rounded-[2.35rem] border p-[1px] shadow-[0_26px_68px_rgba(15,23,42,0.11)]"
              style={{ borderColor: theme.border }}
            >
              <div
                className="relative overflow-hidden rounded-[2.3rem] px-4 py-5 text-white sm:px-5 sm:py-6 lg:px-6"
                style={{ background: theme.panel }}
              >
                <div
                  className="pointer-events-none absolute -left-10 top-10 h-40 w-40 rounded-full blur-3xl transition duration-500 group-hover:scale-110"
                  style={{ backgroundColor: theme.orbA }}
                />
                <div
                  className="pointer-events-none absolute right-0 top-0 h-56 w-56 rounded-full blur-3xl transition duration-500 group-hover:scale-110"
                  style={{ backgroundColor: theme.glow }}
                />
                <div
                  className="pointer-events-none absolute bottom-0 right-16 h-44 w-44 rounded-full blur-3xl transition duration-500 group-hover:scale-110"
                  style={{ backgroundColor: theme.orbB }}
                />
                {family.id === "premium-deluxe" ? (
                  <>
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[linear-gradient(180deg,rgba(255,248,224,0.22),rgba(255,248,224,0))]" />
                    <div className="pointer-events-none absolute -right-12 top-14 h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(255,239,194,0.34),rgba(255,239,194,0)_68%)] blur-2xl" />
                    <div className="pointer-events-none absolute left-[12%] top-0 h-px w-40 bg-[linear-gradient(90deg,rgba(255,255,255,0),rgba(255,233,182,0.9),rgba(255,255,255,0))]" />
                  </>
                ) : null}
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02)_36%,rgba(0,0,0,0.1)_100%)]" />

                <div className="relative z-10">
                  <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
                    <div className="max-w-[40rem]">
                      <div className="inline-flex items-center gap-3 rounded-full border border-white/12 bg-white/10 px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-white/84 backdrop-blur-sm">
                        <span className="text-white/90">
                          <SectionIcon familyId={family.id} />
                        </span>
                        {copy.label}
                      </div>
                      <h2
                        className="mt-4 max-w-3xl font-display text-[2.2rem] font-semibold leading-[0.98] tracking-[-0.04em] md:text-[2.9rem]"
                        style={
                          family.id === "premium-deluxe"
                            ? {
                                color: "#fff4d6",
                                textShadow:
                                  "0 0 18px rgba(255,216,128,0.2), 0 0 34px rgba(255,216,128,0.12)",
                              }
                            : undefined
                        }
                      >
                        {copy.headline ?? family.title}
                      </h2>
                      {family.id === "premium-deluxe" ? (
                        <div className="pointer-events-none mt-2 h-px w-full max-w-[26rem] bg-[linear-gradient(90deg,rgba(255,255,255,0),rgba(255,224,163,0.95),rgba(255,246,220,0.82),rgba(255,255,255,0))]" />
                      ) : null}

                      <p className="mt-3 max-w-3xl text-[0.95rem] leading-7 text-white/86 md:text-[1.02rem] md:leading-7">
                        {copy.intro}
                      </p>

                      <p className="mt-2 max-w-3xl text-sm leading-6 text-white/68 md:text-[0.95rem]">
                        {family.summary}
                      </p>
                    </div>

                    <div className="max-w-[18rem] rounded-[1.45rem] border border-white/12 bg-white/10 px-4 py-3 text-[0.9rem] leading-6 text-white/76 backdrop-blur-sm">
                      <p className="font-semibold uppercase tracking-[0.16em] text-white/60">
                        Comparaison
                      </p>
                      <p className="mt-2">{copy.helper}</p>
                      <p className="mt-3 font-semibold text-white">{family.price}</p>
                      <p className="mt-2 rounded-full bg-white/12 px-3 py-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-white/92">
                        Paiement en 4 fois possible
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2.5">
                    {family.highlights.map((highlight) => (
                      <span
                        key={highlight}
                        className="rounded-full border border-white/14 bg-white/10 px-3.5 py-1.5 text-[0.82rem] font-medium text-white/88 backdrop-blur-sm"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 flex gap-3 overflow-x-auto pb-2 xl:grid xl:grid-cols-3 xl:overflow-visible">
                    {tiers.map((tier, tierIndex) => (
                      <motion.article
                        key={tier.id}
                        initial={{ opacity: 0, y: 24, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{
                          delay: familyIndex * 0.08 + tierIndex * 0.08,
                          duration: 0.48,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        whileHover={{ y: -3 }}
                        className="relative min-w-[16.5rem] snap-start overflow-hidden rounded-[1.6rem] border p-4 shadow-[0_18px_38px_rgba(0,0,0,0.16)] backdrop-blur-sm sm:min-w-[18rem] sm:p-5"
                        style={{
                          background: theme.card,
                          borderColor: theme.cardBorder,
                        }}
                      >
                        <div
                          className="pointer-events-none absolute inset-x-auto right-0 top-0 h-36 w-36 rounded-full blur-3xl"
                          style={{ backgroundColor: theme.glow }}
                        />
                        {family.id === "premium-deluxe" ? (
                          <>
                            <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-[linear-gradient(180deg,rgba(255,244,212,0.2),rgba(255,244,212,0))]" />
                            <div className="pointer-events-none absolute right-6 top-5 h-px w-20 bg-[linear-gradient(90deg,rgba(255,255,255,0),rgba(255,230,173,0.9),rgba(255,255,255,0))]" />
                          </>
                        ) : null}

                        <div className="relative z-10 flex h-full flex-col">
                          <div className="flex items-start justify-between gap-4">
                            <span className={`rounded-full px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.18em] ${theme.badge}`}>
                              {copy.tierBadges[tierIndex]}
                            </span>

                            <span className={`flex h-10 w-10 items-center justify-center rounded-[1rem] ${theme.iconBg} text-white/92`}>
                              <TierIcon index={tierIndex} />
                            </span>
                          </div>

                          <h3 className="mt-4 font-display text-[1.55rem] font-semibold leading-tight">
                            {tier.title}
                          </h3>

                          <p className="mt-2 text-[0.92rem] leading-6 text-white/78">
                            {tier.summary}
                          </p>

                          <p className="mt-4 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[#d4f7ff]">
                            {copy.footer}
                          </p>

                          <div className="mt-4 space-y-2.5">
                            {tier.features.map((feature) => (
                              <div key={feature} className="flex items-start gap-2.5 text-[0.88rem] leading-5 text-white/88">
                                <span
                                  className="mt-1.5 h-2 w-2 shrink-0 rounded-full"
                                  style={{ backgroundColor: theme.featureDot }}
                                />
                                <span>{feature}</span>
                              </div>
                            ))}
                          </div>

                          <div className="mt-5 border-t border-white/12 pt-4">
                            <div className="flex flex-col gap-4">
                              <div>
                                <p className="text-[0.72rem] uppercase tracking-[0.16em] text-white/56">
                                  A partir de
                                </p>
                                <p className="mt-1.5 font-display text-[1.85rem] font-semibold text-white">
                                  {tier.price}
                                </p>
                                <p className="mt-2 inline-flex rounded-full bg-white/10 px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-white/88">
                                  Paiement possible en 4 fois
                                </p>
                              </div>

                              <Link
                                href={`/devis?offer=${tier.id}`}
                                className="inline-flex w-full items-center justify-center rounded-full border px-4 py-2.5 text-[0.9rem] font-semibold shadow-[0_14px_30px_rgba(15,23,42,0.12)] transition hover:-translate-y-0.5"
                                style={{
                                  backgroundColor: theme.buttonBg,
                                  color: theme.buttonText,
                                  borderColor: theme.buttonBorder,
                                }}
                              >
                                {tier.ctaLabel}
                              </Link>
                            </div>
                          </div>
                        </div>
                      </motion.article>
                    ))}
                  </div>
                </div>
              </div>
            </motion.article>
          );
        })}
      </section>

      <SiteFooter />
    </main>
  );
}
