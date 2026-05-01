"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const faqItems = [
  {
    question: "Est-ce que je peux intégrer des paiements sur mon site ?",
    answer:
      "Oui, c'est possible. Nous pouvons intégrer des solutions de paiement selon votre besoin, que ce soit pour vendre un service, accepter des réservations payantes ou proposer un règlement en ligne avec un parcours simple et rassurant pour vos clients.",
  },
  {
    question: "Est-ce que le nom de domaine sera à mon nom ?",
    answer:
      "Oui. Le nom de domaine sera bien le vôtre. Votre site est ensuite hébergé directement chez nous, ce qui permet de centraliser la gestion technique tout en gardant un cadre clair et professionnel pour votre activité.",
  },
  {
    question: "Le site sera-t-il adapté au téléphone et à l'ordinateur ?",
    answer:
      "Oui. Chaque site est pensé pour une lecture fluide sur mobile, tablette et ordinateur afin de garder une image professionnelle sur tous les écrans.",
  },
  {
    question: "Puis-je gérer mon site moi-même ?",
    answer:
      "Oui, selon la formule choisie. Certaines offres restent simples sans espace de gestion, d'autres incluent un compte pour administrer votre contenu, et les formules les plus complètes peuvent intégrer des comptes clients illimités.",
  },
  {
    question: "Est-il possible d'intégrer une prise de réservation ou un formulaire ?",
    answer:
      "Oui. Nous pouvons intégrer une prise de réservation, un formulaire de contact ou un parcours adapté à votre activité afin de faciliter les demandes entrantes.",
  },
  {
    question: "L'offre premium deluxe comprend quoi en plus ?",
    answer:
      "L'offre premium deluxe ajoute au site internet une carte de visite et un prospectus, afin de garder une communication cohérente entre votre présence en ligne et vos supports physiques.",
  },
] as const;

export function HomeFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="mx-auto mt-16 w-full max-w-6xl">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--brand-soft)]">
          Questions fréquentes
        </p>
        <h2 className="mt-3 font-display text-4xl font-semibold leading-tight md:text-5xl">
          Des questions ?
        </h2>
      </div>

      <div className="mt-8 rounded-[2rem] border border-white/60 bg-white/78 shadow-[0_24px_54px_rgba(15,23,42,0.08)] backdrop-blur">
        {faqItems.map((item, index) => {
          const isOpen = openIndex === index;

          return (
            <div
              key={item.question}
              className={index === 0 ? "" : "border-t border-[rgba(15,23,42,0.08)]"}
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex w-full items-center justify-between gap-5 px-6 py-5 text-left transition hover:bg-[rgba(255,255,255,0.48)] md:px-8 md:py-6"
              >
                <span className="pr-4 text-xl font-medium leading-tight text-[var(--ink-strong)] md:text-[1.85rem]">
                  {item.question}
                </span>
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#111827] text-white shadow-[0_14px_30px_rgba(15,23,42,0.14)]">
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.22, ease: "easeOut" }}
                    className="text-3xl leading-none"
                  >
                    +
                  </motion.span>
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen ? (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pr-20 text-sm leading-8 text-[var(--ink-soft)] md:px-8 md:pb-8 md:text-base">
                      {item.answer}
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
