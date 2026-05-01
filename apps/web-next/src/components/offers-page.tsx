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
    aura: "rgba(89,146,240,0.24)",
    subCard:
      "linear-gradient(180deg, rgba(234,243,255,0.96), rgba(218,232,252,0.9))",
    subBorder: "rgba(104, 146, 206, 0.26)",
    button: "bg-[#173763] text-white",
    price:
      "bg-[rgba(255,255,255,0.94)] text-[#173763] border-[rgba(23,58,98,0.12)]",
    microTag:
      "border-[rgba(23,58,98,0.12)] bg-[rgba(255,255,255,0.78)] text-[#173763]",
    feature:
      "border-[rgba(23,58,98,0.08)] bg-[rgba(255,255,255,0.7)] text-[#173763]",
  },
  "premium-deluxe": {
    aura: "rgba(214,166,84,0.26)",
    subCard:
      "linear-gradient(180deg, rgba(255,244,224,0.96), rgba(247,228,194,0.9))",
    subBorder: "rgba(161, 112, 42, 0.24)",
    button: "bg-[#6d4c27] text-white",
    price:
      "bg-[rgba(255,252,247,0.96)] text-[#6d4c27] border-[rgba(109,76,39,0.14)]",
    microTag:
      "border-[rgba(109,76,39,0.14)] bg-[rgba(255,250,241,0.74)] text-[#6d4c27]",
    feature:
      "border-[rgba(109,76,39,0.1)] bg-[rgba(255,249,240,0.72)] text-[#6d4c27]",
  },
} as const;

const familyCopy: Record<
  OfferFamilyId,
  {
    lead: string;
    closing: string;
    tone: string;
    tierLabels: [string, string, string];
    bonus: string;
  }
> = {
  premium: {
    lead: "3 options pour choisir le bon niveau de gestion de votre site.",
    closing: "Choisissez simplement l'option qui correspond à votre besoin.",
    tone: "Site internet",
    tierLabels: ["Option 1", "Option 2", "Option 3"],
    bonus: "Site sur-mesure inclus",
  },
  "premium-deluxe": {
    lead: "Les mêmes 3 options, avec en plus le site, la carte de visite et le prospectus.",
    closing: "Vous gardez les mêmes choix, avec une image plus complète.",
    tone: "Site + print",
    tierLabels: ["Option 1", "Option 2", "Option 3"],
    bonus: "Site + carte de visite + prospectus",
  },
};

export function OffersPage() {
  return (
    <main className="px-4 py-4 md:px-6">
      <div className="mx-auto flex w-full max-w-7xl justify-end">
        <PublicLoginLink />
      </div>

      <section className="mx-auto mt-8 w-full max-w-7xl">
        <div className="grid gap-5 xl:grid-cols-2">
          {offerFamilies.map((family, familyIndex) => {
            const copy = familyCopy[family.id];
            const theme = familyDecor[family.id];
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
                className="group relative overflow-hidden rounded-[2.4rem] border border-white/70 p-[1px] shadow-[0_32px_80px_rgba(15,23,42,0.12)]"
              >
                <div
                  className="relative h-full overflow-hidden rounded-[2.35rem] px-5 py-5 text-white sm:px-6 sm:py-6 lg:px-7 lg:py-7"
                  style={{ background: family.accentBackground }}
                >
                  <div
                    className="pointer-events-none absolute -right-12 top-0 h-44 w-44 rounded-full blur-3xl transition duration-500 group-hover:scale-110"
                    style={{ backgroundColor: theme.aura }}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02)_30%,rgba(0,0,0,0.08)_100%)]" />

                  <div className="relative z-10">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.26em] text-white/72">
                          {family.eyebrow}
                        </p>
                        <p className="mt-3 text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-white/56 sm:text-xs">
                          {copy.tone}
                        </p>
                      </div>
                      <span className="rounded-full border border-white/18 bg-white/10 px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-white/88 backdrop-blur-sm sm:text-xs">
                        3 options
                      </span>
                    </div>

                    <h1 className="mt-7 max-w-[18rem] font-display text-4xl font-semibold leading-[0.96] md:text-5xl">
                      {family.title}
                    </h1>

                    <p className="mt-4 text-base font-medium text-white/74">{family.price}</p>
                    <p className="mt-5 max-w-[33rem] text-base leading-7 text-white/92 md:text-lg md:leading-8">
                      {copy.lead}
                    </p>
                    <p className="mt-3 max-w-[34rem] text-sm font-semibold leading-7 text-white/78 md:text-base">
                      {family.summary}
                    </p>

                    <div className="mt-5 grid gap-3 sm:grid-cols-3">
                      {family.highlights.map((highlight) => (
                        <div
                          key={highlight}
                          className="rounded-[1.2rem] border border-white/14 bg-white/10 px-4 py-4 text-sm font-medium text-white/90 backdrop-blur-sm"
                        >
                          {highlight}
                        </div>
                      ))}
                    </div>

                    <div className="mt-5 flex items-center gap-3 text-sm text-white/80">
                      <span className="h-px flex-1 bg-white/18" />
                      <p>{copy.bonus}</p>
                    </div>
                  </div>

                  <div className="relative z-10 mt-7 grid gap-3">
                    {tiers.map((tier, tierIndex) => (
                      <motion.article
                        key={tier.id}
                        initial={{ opacity: 0, y: 26, scale: 0.98, filter: "blur(8px)" }}
                        animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                        transition={{
                          delay: familyIndex * 0.08 + tierIndex * 0.08,
                          duration: 0.5,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="overflow-hidden rounded-[1.7rem] border p-4 shadow-[0_22px_45px_rgba(15,23,42,0.08)] backdrop-blur-sm sm:p-5"
                        style={{
                          background: theme.subCard,
                          borderColor: theme.subBorder,
                        }}
                      >
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <span
                            className={`rounded-full border px-3 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.18em] ${theme.microTag}`}
                          >
                            {copy.tierLabels[tierIndex]}
                          </span>
                          <span
                            className={`rounded-full border px-4 py-2 text-sm font-semibold ${theme.price}`}
                          >
                            {tier.price}
                          </span>
                        </div>

                        <h2 className="mt-4 font-display text-2xl font-semibold leading-tight text-[var(--ink-strong)]">
                          {tier.title}
                        </h2>
                        <p className="mt-2 text-sm font-semibold leading-7 text-[rgba(19,37,61,0.82)] sm:text-[0.96rem]">
                          {tier.summary}
                        </p>

                        <div className="mt-4 flex flex-wrap gap-2">
                          {tier.features.map((feature) => (
                            <span
                              key={feature}
                              className={`rounded-full border px-3 py-2 text-[0.72rem] font-semibold sm:text-[0.78rem] ${theme.feature}`}
                            >
                              {feature}
                            </span>
                          ))}
                        </div>

                        <Link
                          href={`/devis?offer=${tier.id}`}
                          className={`mt-5 inline-flex rounded-full px-5 py-3 text-sm font-semibold shadow-[0_16px_34px_rgba(15,23,42,0.12)] transition hover:-translate-y-0.5 ${theme.button}`}
                        >
                          {tier.ctaLabel}
                        </Link>
                      </motion.article>
                    ))}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
