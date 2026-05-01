"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

type DemoSiteRecord = {
  id: string;
  name: string;
  path: string;
};

type RestaurantDemoSeasidePageProps = {
  site: DemoSiteRecord;
};

const navItems = ["Accueil", "Carte", "Réservation", "Avis", "Contact"] as const;

const reveal = {
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.22 },
  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
};

const reviews = [
  {
    author: "Camille",
    note: "4.9",
    text: "Une entrée plus chic, plus nette, plus crédible.",
  },
  {
    author: "Sophie",
    note: "5.0",
    text: "Une ambiance claire, fraîche et vraiment élégante.",
  },
] as const;

const hours = [
  "Mardi au jeudi : 12h00 - 14h00 / 19h00 - 22h30",
  "Vendredi : 12h00 - 14h00 / 19h00 - 23h00",
  "Samedi : 19h00 - 23h00",
  "Dimanche et lundi : fermé",
] as const;

export function RestaurantDemoSeasidePage({
  site,
}: RestaurantDemoSeasidePageProps) {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setShowLoader(false), 2200);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {showLoader ? (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.55, ease: "easeOut" } }}
            className="fixed inset-0 z-[80] overflow-hidden bg-[linear-gradient(180deg,#f8f5ef_0%,#eef4f6_52%,#d7e5ea_100%)]"
          >
            <div className="absolute inset-x-0 bottom-0 h-[38%] bg-[linear-gradient(180deg,rgba(129,175,195,0),rgba(129,175,195,0.18))]" />
            <motion.div
              animate={{ y: [0, -10, 0], rotate: [0, -1.5, 0, 1.5, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute left-1/2 top-[33%] z-10 w-[min(74vw,32rem)] -translate-x-1/2"
            >
              <Image
                src="/sites/restaudemo2/logo.png"
                alt="Le Bistronome"
                width={900}
                height={320}
                priority
                className="h-auto w-full"
              />
            </motion.div>

            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-x-0 bottom-[18%] z-0"
            >
              <svg viewBox="0 0 1440 260" className="h-auto w-full" preserveAspectRatio="none">
                <motion.path
                  d="M0,140 C120,110 240,180 360,150 C480,120 600,70 720,96 C840,122 960,196 1080,176 C1200,156 1320,92 1440,118 L1440,260 L0,260 Z"
                  fill="rgba(119,165,186,0.32)"
                  animate={{ x: [0, -36, 0] }}
                  transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.path
                  d="M0,168 C144,136 288,220 432,188 C576,156 720,84 864,110 C1008,136 1152,212 1296,188 C1368,176 1404,164 1440,156 L1440,260 L0,260 Z"
                  fill="rgba(168,206,219,0.48)"
                  animate={{ x: [0, 28, 0] }}
                  transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.path
                  d="M0,196 C160,172 320,230 480,206 C640,182 800,114 960,134 C1120,154 1280,222 1440,198 L1440,260 L0,260 Z"
                  fill="rgba(239,246,248,0.9)"
                  animate={{ x: [0, -18, 0] }}
                  transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
                />
              </svg>
            </motion.div>

            <motion.p
              initial={{ opacity: 0.4 }}
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-[10%] left-1/2 -translate-x-1/2 text-[0.78rem] font-semibold uppercase tracking-[0.26em] text-[#516f80]"
            >
              Ouverture du site
            </motion.p>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <main className="bg-[#f6f3ec] text-[#163249]">
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="relative min-h-screen overflow-hidden"
        >
          <div className="absolute inset-0">
            <Image
              src="/sites/restaudemo2/p1.png"
              alt="Plat signature"
              fill
              priority
              className="object-cover object-center"
              sizes="100vw"
            />
          </div>
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(15,32,45,0.26))]" />
          <div className="absolute inset-y-0 left-0 w-[52%] bg-[linear-gradient(90deg,rgba(11,24,36,0.62)_0%,rgba(11,24,36,0.36)_46%,rgba(11,24,36,0)_100%)]" />

          <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col px-4 pb-12 pt-5 md:px-6 md:pb-14">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 rounded-full border border-[rgba(22,50,73,0.12)] bg-white/82 px-4 py-2 text-[0.82rem] font-semibold text-[#163249] backdrop-blur-sm transition hover:bg-white"
                >
                  <span aria-hidden="true">←</span>
                  Retour accueil
                </Link>

                <div className="hidden w-[12rem] lg:block">
                  <Image
                    src="/sites/restaudemo2/logo.png"
                    alt="Le Bistronome"
                    width={700}
                    height={220}
                    priority
                    className="h-auto w-full"
                  />
                </div>
              </div>

              <nav className="hidden items-center gap-8 lg:flex">
                {navItems.map((item) => (
                  <span key={item} className="text-[0.8rem] font-semibold uppercase tracking-[0.08em] text-white/86">
                    {item}
                  </span>
                ))}
              </nav>

              <span className="text-[0.76rem] font-semibold uppercase tracking-[0.14em] text-white/54">
                {site.id}
              </span>
            </div>

            <div className="mt-auto max-w-3xl pb-4 pt-20">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08, duration: 0.5 }}
                className="w-[min(78vw,34rem)] lg:hidden"
              >
                <Image
                  src="/sites/restaudemo2/logo.png"
                  alt="Le Bistronome"
                  width={1000}
                  height={320}
                  priority
                  className="h-auto w-full"
                />
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.16, duration: 0.55 }}
                className="mt-6 max-w-xl text-[1rem] leading-7 text-white/82 md:text-[1.08rem]"
                style={{ textShadow: "0 10px 24px rgba(0,0,0,0.24)" }}
              >
                Une table plus blanche, plus lumineuse, plus chic.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.24, duration: 0.55 }}
                className="mt-7 flex flex-wrap gap-3"
              >
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full bg-[#163249] px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5"
                >
                  Réserver une table
                </Link>
                <Link
                  href="/demo-site"
                  className="inline-flex items-center justify-center rounded-full border border-[rgba(22,50,73,0.12)] bg-white/82 px-6 py-3 text-sm font-semibold text-[#163249] backdrop-blur-sm transition hover:-translate-y-0.5"
                >
                  Voir les démos
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.section>

        <section className="mx-auto max-w-6xl px-4 py-16 md:px-6">
          <motion.div
            {...reveal}
            className="grid gap-10 border-b border-[rgba(22,50,73,0.08)] pb-14 lg:grid-cols-[1.05fr_0.95fr]"
          >
            <div>
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[#8e7a61]">
                Réservation
              </p>
              <h2 className="mt-4 font-display text-[2.2rem] font-semibold leading-tight md:text-[2.8rem]">
                Réserver, simplement.
              </h2>
              <p className="mt-4 max-w-xl text-[1rem] leading-7 text-[#33526a]/82">
                Une action claire, visible, et bien placée.
              </p>
            </div>

            <div className="flex items-end lg:justify-end">
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex rounded-full bg-[#163249] px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5"
                >
                  Ouvrir la réservation
                </Link>
                <span className="inline-flex rounded-full border border-[rgba(22,50,73,0.12)] bg-white/72 px-5 py-3 text-sm font-semibold text-[#33526a]/76">
                  Service midi & soir
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            {...reveal}
            className="grid gap-12 border-b border-[rgba(22,50,73,0.08)] py-14 lg:grid-cols-[0.9fr_1.1fr]"
          >
            <div>
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[#8e7a61]">
                Signature
              </p>
              <h2 className="mt-4 font-display text-[2rem] font-semibold leading-tight">
                Plus de goût.
              </h2>
              <p className="mt-4 max-w-md text-[1rem] leading-7 text-[#33526a]/80">
                Des images simples, bien posées, et une lecture plus éditoriale.
              </p>
            </div>

            <div className="relative grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-start">
              <div className="relative mx-auto aspect-[3/4] w-full max-w-[17rem] overflow-hidden rounded-t-[8rem] rounded-b-[1rem]">
                <Image
                  src="/sites/restaudemo2/p2.png"
                  alt="Entrée gastronomique"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 30vw"
                />
              </div>

              <div className="relative md:pt-16">
                <p className="mb-8 text-center font-display text-[clamp(2.3rem,4vw,4rem)] font-semibold tracking-[-0.04em] text-[#163249] md:text-left">
                  Plus de goût
                </p>
                <div className="relative ml-auto aspect-[4/5] w-full max-w-[18rem] overflow-hidden rounded-t-[8rem] rounded-b-[1rem]">
                  <Image
                    src="/sites/restaudemo2/p3.png"
                    alt="Burger signature"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 34vw"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            {...reveal}
            className="grid gap-12 border-b border-[rgba(22,50,73,0.08)] py-14 lg:grid-cols-[0.92fr_1.08fr]"
          >
            <div>
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[#8e7a61]">
                Lumière
              </p>
              <h2 className="mt-4 font-display text-[2rem] font-semibold leading-tight">
                Plus de lumière,
                <br />
                plus de sensation.
              </h2>
            </div>

            <div className="relative">
              <div className="absolute left-0 right-0 top-[35%] h-px bg-[rgba(22,50,73,0.08)]" />
              <div className="relative mx-auto aspect-[16/7] w-full max-w-[42rem] overflow-hidden rounded-[2rem]">
                <Image
                  src="/sites/restaudemo2/p1.png"
                  alt="Plat signature"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 60vw"
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            {...reveal}
            className="grid gap-10 border-b border-[rgba(22,50,73,0.08)] py-14 lg:grid-cols-[0.9fr_1.1fr]"
          >
            <div>
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[#8e7a61]">
                Avis
              </p>
            </div>

            <div className="space-y-8">
              {reviews.map((review) => (
                <div key={review.author} className="border-b border-[rgba(22,50,73,0.08)] pb-8 last:border-b-0 last:pb-0">
                  <div className="flex items-center justify-between gap-4">
                    <p className="font-semibold text-[#163249]">{review.author}</p>
                    <p className="text-sm font-semibold text-[#b49363]">{review.note}</p>
                  </div>
                  <p className="mt-4 max-w-2xl text-[1rem] leading-7 text-[#33526a]/80">{review.text}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            {...reveal}
            className="grid gap-10 border-b border-[rgba(22,50,73,0.08)] py-14 lg:grid-cols-[0.95fr_1.05fr]"
          >
            <div>
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[#8e7a61]">
                Map
              </p>
              <h2 className="mt-4 font-display text-[2rem] font-semibold leading-tight">
                Plus de vue.
              </h2>
            </div>

            <div className="space-y-6">
              <div className="h-[18rem] w-full bg-[linear-gradient(135deg,#f2ede3_0%,#dbe5ea_38%,#8ab2c7_100%)]" />
              <div className="flex flex-col gap-2 text-[#33526a]/80">
                <p className="text-base font-semibold text-[#163249]">12 rue des Ateliers, Lyon</p>
                <p className="text-[0.98rem] leading-7">
                  Une adresse lisible, dans le même ton clair et chic.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            {...reveal}
            className="grid gap-10 py-14 lg:grid-cols-[0.95fr_1.05fr]"
          >
            <div>
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[#8e7a61]">
                Horaires
              </p>
              <h2 className="mt-4 font-display text-[2rem] font-semibold leading-tight">
                Les essentiels.
              </h2>
            </div>

            <div className="space-y-4">
              {hours.map((item) => (
                <div key={item} className="flex items-center justify-between border-b border-[rgba(22,50,73,0.08)] pb-4 text-[0.98rem] text-[#33526a]/80">
                  <span>{item}</span>
                  <span className="h-2.5 w-2.5 rounded-full bg-[#b49363]" />
                </div>
              ))}

              <div className="pt-4">
                <span className="text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-[#33526a]/50">
                  {site.path}
                </span>
              </div>
            </div>
          </motion.div>
        </section>
      </main>
    </>
  );
}
