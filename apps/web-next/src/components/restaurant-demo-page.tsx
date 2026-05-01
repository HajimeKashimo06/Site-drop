"use client";

import Link from "next/link";
import { motion } from "framer-motion";

type DemoSiteRecord = {
  id: string;
  name: string;
  path: string;
};

type RestaurantDemoPageProps = {
  site: DemoSiteRecord;
};

const reveal = {
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.24 },
  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
};

const navItems = ["Accueil", "Carte", "Reservation", "Avis", "Contact"] as const;

const reviews = [
  {
    author: "Camille",
    note: "4.9",
    text: "Une ambiance plus calme et plus haut de gamme. La page laisse respirer le lieu.",
  },
  {
    author: "Leo",
    note: "5.0",
    text: "Simple, lisible et plus credible pour un restaurant. Le hero fait l essentiel sans en faire trop.",
  },
] as const;

const hours = [
  "Mardi au jeudi : 19h00 - 22h30",
  "Vendredi : 19h00 - 23h30",
  "Samedi : 12h00 - 14h00 / 19h00 - 23h30",
  "Dimanche et lundi : ferme",
] as const;

export function RestaurantDemoPage({ site }: RestaurantDemoPageProps) {
  return (
    <main className="bg-[#151311] text-white">
      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        className="relative min-h-screen overflow-hidden"
      >
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,8,8,0.16),rgba(9,8,8,0.72))]" />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#241d18_0%,#3e3026_22%,#725640_42%,#c7ae8d_58%,#85654b_72%,#221b17_100%)]" />
        <div className="absolute inset-y-0 left-0 w-[58%] bg-[linear-gradient(90deg,rgba(9,8,8,0.94)_0%,rgba(9,8,8,0.82)_46%,rgba(9,8,8,0.16)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_34%,rgba(255,247,232,0.2),transparent_18%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_64%_48%,rgba(255,235,205,0.14),transparent_24%)]" />

        <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col px-4 pb-12 pt-5 md:px-6 md:pb-14">
          <div className="flex items-center justify-between gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-[0.82rem] font-semibold text-white/86 transition hover:bg-white/6"
            >
              <span aria-hidden="true">←</span>
              Retour accueil
            </Link>

            <nav className="hidden items-center gap-8 lg:flex">
              {navItems.map((item) => (
                <span key={item} className="text-[0.8rem] font-semibold uppercase tracking-[0.08em] text-white/82">
                  {item}
                </span>
              ))}
            </nav>

            <span className="text-[0.76rem] font-semibold uppercase tracking-[0.14em] text-white/58">
              {site.id}
            </span>
          </div>

          <div className="mt-auto max-w-2xl pb-6 pt-20">
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08, duration: 0.5 }}
              className="text-[0.78rem] font-semibold uppercase tracking-[0.24em] text-[#d4ae7c]"
            >
              Restaurant demo
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.62 }}
              className="mt-4 max-w-xl font-display text-[clamp(3.2rem,8vw,6.5rem)] font-semibold leading-[0.9] tracking-[-0.05em]"
            >
              Une table simple,
              <br />
              sombre et elegante.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.22, duration: 0.62 }}
              className="mt-5 max-w-xl text-[1rem] leading-7 text-white/72 md:text-[1.08rem]"
            >
              Un accueil visuel fort, mais sans effet inutile. Le ton reste sobre,
              plus raffine, plus credible pour un restaurant.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.62 }}
              className="mt-7 flex flex-wrap gap-3"
            >
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-[#efe0c8] px-6 py-3 text-sm font-semibold text-[#241b14] transition hover:-translate-y-0.5"
              >
                Reserver une table
              </Link>
              <Link
                href="/demo-site"
                className="inline-flex items-center justify-center rounded-full border border-white/10 px-6 py-3 text-sm font-semibold text-white/88 transition hover:-translate-y-0.5"
              >
                Voir les demos
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <section className="mx-auto max-w-6xl px-4 py-16 md:px-6">
        <motion.div
          {...reveal}
          className="grid gap-10 border-b border-white/8 pb-12 lg:grid-cols-[1.05fr_0.95fr]"
        >
          <div>
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[#cfa978]">
              Reservation
            </p>
            <h2 className="mt-4 font-display text-[2.2rem] font-semibold leading-tight md:text-[2.8rem]">
              L information importante, sans sur-design.
            </h2>
            <p className="mt-4 max-w-xl text-[1rem] leading-7 text-white/70">
              Apres la grande image d accueil, la page descend naturellement vers
              ce qui compte vraiment: reserver, rassurer, situer le lieu.
            </p>
          </div>

          <div className="flex items-end lg:justify-end">
            <div className="flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex rounded-full bg-[#efe0c8] px-5 py-3 text-sm font-semibold text-[#241b14] transition hover:-translate-y-0.5"
              >
                Ouvrir la reservation
              </Link>
              <span className="inline-flex rounded-full border border-white/10 px-5 py-3 text-sm font-semibold text-white/68">
                Reservation en ligne disponible
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div
          {...reveal}
          className="grid gap-10 border-b border-white/8 py-12 lg:grid-cols-[0.9fr_1.1fr]"
        >
          <div>
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[#cfa978]">
              Avis
            </p>
          </div>

          <div className="space-y-8">
            {reviews.map((review) => (
              <div key={review.author} className="border-b border-white/8 pb-8 last:border-b-0 last:pb-0">
                <div className="flex items-center justify-between gap-4">
                  <p className="font-semibold text-white">{review.author}</p>
                  <p className="text-sm font-semibold text-[#f4c869]">{review.note}</p>
                </div>
                <p className="mt-4 max-w-2xl text-[1rem] leading-7 text-white/70">{review.text}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          {...reveal}
          className="grid gap-10 border-b border-white/8 py-12 lg:grid-cols-[0.95fr_1.05fr]"
        >
          <div>
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[#cfa978]">
              Map
            </p>
            <h2 className="mt-4 font-display text-[2rem] font-semibold leading-tight">
              Une localisation claire, simplement integree.
            </h2>
          </div>

          <div className="space-y-6">
            <div className="h-[18rem] w-full bg-[linear-gradient(135deg,#2a241f_0%,#3d3329_100%)]" />
            <div className="flex flex-col gap-2 text-white/70">
              <p className="text-base font-semibold text-white">12 rue des Ateliers, Lyon</p>
              <p className="text-[0.98rem] leading-7">
                Une zone map sobre, sans contour inutile, pour garder une lecture
                plus classe et plus calme.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          {...reveal}
          className="grid gap-10 py-12 lg:grid-cols-[0.95fr_1.05fr]"
        >
          <div>
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[#cfa978]">
              Horaires
            </p>
            <h2 className="mt-4 font-display text-[2rem] font-semibold leading-tight">
              La suite utile, dans le meme ton.
            </h2>
          </div>

          <div className="space-y-4">
            {hours.map((item) => (
              <div key={item} className="flex items-center justify-between border-b border-white/8 pb-4 text-[0.98rem] text-white/74">
                <span>{item}</span>
                <span className="h-2.5 w-2.5 rounded-full bg-[#d8b17b]" />
              </div>
            ))}

            <div className="pt-4">
              <span className="text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-white/54">
                {site.path}
              </span>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
