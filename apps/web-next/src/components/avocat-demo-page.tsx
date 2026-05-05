"use client";

import "@google/model-viewer";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  createElement,
  useEffect,
  useRef,
  useState,
  type RefObject,
} from "react";

type DemoSiteRecord = {
  id: string;
  name: string;
  path: string;
};

type AvocatDemoPageProps = {
  site: DemoSiteRecord;
};

const navItems = [
  { label: "Presentation", href: "#presentation" },
  { label: "Expertises", href: "#expertises" },
  { label: "Contact", href: "#contact" },
] as const;

const expertiseItems = [
  "Contrats",
  "Contentieux locatif",
  "Divorce",
  "Pension alimentaire",
  "Titres de sejour",
  "Nationalite francaise",
] as const;

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
};

export function AvocatDemoPage({ site }: AvocatDemoPageProps) {
  const betweenBlocksRef = useRef<HTMLDivElement | null>(null);
  const { scrollY, scrollYProgress } = useScroll();
  const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const backdropY = useTransform(scrollY, [0, 1200], [0, -90]);
  const portraitY = useTransform(scrollY, [0, 800], [0, 50]);

  return (
    <main id="top" className="bg-[#f3ede4] text-[#15283c]">
      <motion.div
        className="fixed inset-x-0 top-0 z-[120] h-[3px] origin-left bg-[linear-gradient(90deg,#c8a36d,#f1dfbc)]"
        style={{ scaleX: progressScale }}
      />

      <section className="relative isolate overflow-hidden bg-[#8fc7db] text-[#f9f5ef]">
        <motion.div style={{ y: backdropY }} className="absolute inset-0">
          <Image
            src="/sites/avocatdemo/nice.png"
            alt="Vue de Nice"
            fill
            priority
            className="object-cover object-center opacity-90"
            sizes="100vw"
          />
        </motion.div>
        <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(8,28,46,0.76)_0%,rgba(10,44,68,0.52)_42%,rgba(93,170,201,0.08)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(241,223,188,0.32),transparent_22%),radial-gradient(circle_at_left,rgba(255,255,255,0.2),transparent_20%)]" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-[linear-gradient(0deg,rgba(8,28,46,0.82),rgba(8,28,46,0.16),transparent)]" />
        <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col px-4 pb-12 pt-5 md:px-6 md:pb-16 md:pt-6">
          <header className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-full border border-white/14 bg-white/[0.06] px-4 py-2 text-[0.76rem] font-semibold uppercase tracking-[0.14em] text-white/86 backdrop-blur-sm"
              >
                <span aria-hidden="true">&lt;-</span>
                Retour
              </Link>

              <div>
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-[#ead6b0]">
                  MAITRE MYRIAM ABDALLAOUI
                </p>
                <p className="mt-1 text-xs text-white/58">Avocat au Barreau de Nice</p>
              </div>
            </div>

            <nav className="hidden items-center gap-7 lg:flex">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-[0.76rem] font-semibold uppercase tracking-[0.18em] text-white/68 transition hover:text-white"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </header>

          <div className="grid flex-1 items-center gap-10 py-10 lg:grid-cols-[1.02fr_0.98fr] lg:py-14">
            <div className="max-w-2xl">
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-[0.78rem] font-semibold uppercase tracking-[0.3em] text-[#ead6b0]"
              >
                Cabinet d&apos;avocat a Nice
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.08 }}
                className="mt-5 font-display text-[clamp(3rem,8vw,6.2rem)] font-semibold leading-[0.94] tracking-[-0.05em]"
              >
                Defense,
                <br />
                conseil,
                <br />
                representation.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.16 }}
                className="mt-5 max-w-xl text-[1rem] leading-7 text-white/76 md:text-[1.08rem]"
              >
                Une version plus simple, plus credible et plus directe, basee
                sur les informations du cabinet.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.24 }}
                className="mt-8 flex flex-wrap gap-3"
              >
                <a
                  href="#contact"
                  className="inline-flex min-h-12 items-center justify-center rounded-full bg-[linear-gradient(135deg,#c8a36d,#f1dfbc)] px-6 text-sm font-semibold text-[#102336]"
                >
                  Contacter le cabinet
                </a>
                <a
                  href="#expertises"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/14 bg-white/[0.06] px-6 text-sm font-semibold text-white backdrop-blur-sm"
                >
                  Voir les expertises
                </a>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.16 }}
              className="relative mx-auto w-full max-w-[28rem]"
            >
              <motion.div
                style={{ y: portraitY }}
                className="relative overflow-hidden rounded-[2rem] border border-white/12 bg-white/[0.08] p-3 shadow-[0_35px_80px_-45px_rgba(0,0,0,0.72)] backdrop-blur-md"
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem]">
                  <Image
                    src="/sites/avocatdemo/portrait.png"
                    alt="Portrait de Maitre Myriam Abdallaoui"
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 36vw"
                  />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <div
        ref={betweenBlocksRef}
        className="relative overflow-hidden bg-[linear-gradient(180deg,#eef4f7_0%,#f6f1e8_48%,#edf5f9_100%)]"
      >
        <BetweenBlocksBackdrop targetRef={betweenBlocksRef} />

        <section
          id="presentation"
          className="relative border-b border-[rgba(180,205,220,0.5)] px-4 py-16 md:px-6"
        >
          <motion.div
            {...reveal}
            className="relative mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.88fr_1.12fr]"
          >
            <div>
              <p className="text-[0.75rem] font-semibold uppercase tracking-[0.26em] text-[#a17b4d]">
                Presentation
              </p>
              <h2 className="mt-4 font-display text-[clamp(2.1rem,4vw,3.8rem)] font-semibold leading-[0.96] tracking-[-0.04em]">
                Un cabinet ancre a Nice.
              </h2>
            </div>

            <div className="grid gap-5">
              <article className="rounded-[1.7rem] border border-[rgba(188,215,231,0.78)] bg-[rgba(246,251,255,0.66)] p-6 shadow-[0_24px_50px_-42px_rgba(21,40,60,0.38)] backdrop-blur-[10px]">
                <p className="text-[1rem] leading-7 text-[#435467]">
                  Inscrite au Barreau de Nice, Maitre Myriam Abdallaoui accompagne
                  ses clients avec rigueur et determination.
                </p>
              </article>

              <article className="rounded-[1.7rem] border border-[rgba(188,215,231,0.78)] bg-[rgba(246,251,255,0.66)] p-6 shadow-[0_24px_50px_-42px_rgba(21,40,60,0.38)] backdrop-blur-[10px]">
                <p className="text-[1rem] leading-7 text-[#435467]">
                  Formation en droit prive, droit des responsabilites et ecole des
                  avocats du Sud-Est a Marseille.
                </p>
              </article>

              <article className="rounded-[1.7rem] border border-[rgba(188,215,231,0.78)] bg-[rgba(246,251,255,0.66)] p-6 shadow-[0_24px_50px_-42px_rgba(21,40,60,0.38)] backdrop-blur-[10px]">
                <p className="text-[1rem] leading-7 text-[#435467]">
                  Intervention devant les juridictions de Nice, de Grasse et plus
                  largement dans le ressort de la Cour d&apos;appel d&apos;Aix-en-Provence.
                </p>
              </article>

              <article className="rounded-[1.7rem] border border-[rgba(188,215,231,0.78)] bg-[rgba(246,251,255,0.66)] p-6 shadow-[0_24px_50px_-42px_rgba(21,40,60,0.38)] backdrop-blur-[10px]">
                <p className="text-[1rem] leading-7 text-[#435467]">
                  Le cabinet assure aussi des missions de postulation et de
                  representation pour les confreres exterieurs au Barreau de Nice.
                </p>
              </article>
            </div>
          </motion.div>
        </section>

        <section
          id="expertises"
          className="relative border-b border-[rgba(180,205,220,0.5)] px-4 py-16 md:px-6"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(117,181,214,0.12),transparent_22%)]" />
          <motion.div {...reveal} className="relative mx-auto max-w-7xl">
            <p className="text-[0.75rem] font-semibold uppercase tracking-[0.26em] text-[#a17b4d]">
              Domaines d&apos;expertise
            </p>
            <h2 className="mt-4 font-display text-[clamp(2.2rem,4vw,4rem)] font-semibold leading-[0.96] tracking-[-0.04em]">
              Les interventions du cabinet.
            </h2>

            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {expertiseItems.map((item, index) => (
                <motion.article
                  key={item}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.22 }}
                  transition={{ duration: 0.5, delay: index * 0.06 }}
                  whileHover={{ y: -8, rotateX: 4, rotateY: index % 2 === 0 ? -4 : 4 }}
                  className="rounded-[1.6rem] border border-[rgba(188,215,231,0.8)] bg-[rgba(248,252,255,0.68)] p-6 shadow-[0_22px_46px_-40px_rgba(21,40,60,0.38)] backdrop-blur-[10px] [transform-style:preserve-3d]"
                >
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[#5d94b5]">
                    Expertise
                  </p>
                  <h3 className="mt-4 font-display text-[1.6rem] font-semibold tracking-[-0.03em] text-[#15283c]">
                    {item}
                  </h3>
                </motion.article>
              ))}
            </div>
          </motion.div>
        </section>
      </div>

      <section id="contact" className="relative overflow-hidden bg-[#10253b] px-4 py-16 text-[#f9f5ef] md:px-6">
        <div className="absolute inset-0">
          <Image
            src="/sites/avocatdemo/nice.png"
            alt="Littoral de Nice"
            fill
            className="object-cover object-center opacity-18"
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(10,27,43,0.94),rgba(10,27,43,0.84))]" />

        <motion.div
          {...reveal}
          className="relative mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr]"
        >
          <div>
            <p className="text-[0.75rem] font-semibold uppercase tracking-[0.26em] text-[#ead6b0]">
              Contact
            </p>
            <h2 className="mt-4 font-display text-[clamp(2.2rem,4vw,4.2rem)] font-semibold leading-[0.96] tracking-[-0.04em]">
              Prendre rendez-vous.
            </h2>
            <p className="mt-4 max-w-md text-[1rem] leading-7 text-white/68">
              Le cabinet travaille principalement par mail. Pour un rendez-vous,
              le contact telephonique est possible.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <article className="rounded-[1.7rem] border border-white/10 bg-white/[0.06] p-6 backdrop-blur-md">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[#ead6b0]">
                Coordonnees
              </p>
              <div className="mt-5 grid gap-3 text-sm leading-7 text-white/76">
                <p>Telephone : 06.04.65.39.13</p>
                <p>E-mail : myriam-abdallaoui@hotmail.com</p>
                <p>11b Boulevard Dubouchage</p>
                <p>06000 Nice</p>
              </div>
            </article>

            <article className="rounded-[1.7rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.09),rgba(255,255,255,0.05))] p-6 backdrop-blur-md">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[#ead6b0]">
                Horaires
              </p>
              <div className="mt-5 grid gap-3 text-sm leading-7 text-white/76">
                <p>Lundi - Vendredi : 9h00 - 18h00</p>
                <p>Sur rendez-vous</p>
              </div>
              <div className="mt-6 flex flex-col gap-3">
                <a
                  href="mailto:myriam-abdallaoui@hotmail.com"
                  className="inline-flex min-h-12 items-center justify-center rounded-full bg-[linear-gradient(135deg,#c8a36d,#f1dfbc)] px-6 text-sm font-semibold text-[#102336]"
                >
                  Envoyer un mail
                </a>
                <a
                  href="tel:0604653913"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/12 bg-white/[0.06] px-6 text-sm font-semibold text-white"
                >
                  Appeler le cabinet
                </a>
              </div>
            </article>
          </div>
        </motion.div>
      </section>

      <footer className="border-t border-[#19324b] bg-[#10253b] px-4 py-6 text-[0.8rem] text-white/42 md:px-6">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <p>{site.path} - demo avocat</p>
          <a href="#top" className="transition hover:text-white/72">
            Retour en haut
          </a>
        </div>
      </footer>
    </main>
  );
}

function BetweenBlocksBackdrop({
  targetRef,
}: {
  targetRef: RefObject<HTMLDivElement | null>;
}) {
  const [mobileTravel, setMobileTravel] = useState(620);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });
  const mobileModelY = useTransform(scrollYProgress, [0, 1], [0, mobileTravel]);

  useEffect(() => {
    const element = targetRef.current;

    if (!element) {
      return;
    }

    const updateTravel = () => {
      const nextTravel = Math.max(520, element.offsetHeight - 360);
      setMobileTravel(nextTravel);
    };

    updateTravel();

    const observer = new ResizeObserver(updateTravel);
    observer.observe(element);
    window.addEventListener("resize", updateTravel);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateTravel);
    };
  }, [targetRef]);

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(103,180,219,0.18)_0%,rgba(103,180,219,0.08)_28%,transparent_62%)]" />
      <div className="absolute inset-x-0 top-[8%] h-[48%] bg-[linear-gradient(180deg,rgba(240,248,252,0.74),rgba(240,248,252,0.22),transparent)]" />
      <div className="absolute inset-x-0 bottom-0 h-[24%] bg-[linear-gradient(0deg,rgba(246,241,232,0.92),rgba(246,241,232,0.46),transparent)]" />

      <motion.div
        style={{ y: mobileModelY }}
        className="absolute left-1/2 top-0 h-[26rem] w-[26rem] -translate-x-1/2 opacity-[0.44] md:hidden"
      >
        {createElement("model-viewer", {
          src: "/sites/avocatdemo/angel_of_justice.glb",
          alt: "Angel of justice",
          "camera-orbit": "8deg 88deg 140%",
          "min-camera-orbit": "8deg 88deg 140%",
          "max-camera-orbit": "8deg 88deg 140%",
          "interaction-prompt": "none",
          "disable-pan": true,
          "disable-zoom": true,
          "shadow-intensity": "0",
          exposure: "1.05",
          "environment-image": "neutral",
          loading: "eager",
          style: {
            width: "100%",
            height: "100%",
            backgroundColor: "transparent",
          },
        })}
      </motion.div>

      <motion.div
        animate={{ y: [0, -12, 0], rotate: [0, 2, 0, -2, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-1/2 top-1/2 hidden h-[70rem] w-[70rem] -translate-x-1/2 -translate-y-[46%] opacity-[0.42] md:block xl:h-[82rem] xl:w-[82rem]"
        style={{ filter: "drop-shadow(0 40px 80px rgba(79, 136, 168, 0.18))" }}
      >
        {createElement("model-viewer", {
          src: "/sites/avocatdemo/angel_of_justice.glb",
          alt: "Angel of justice",
          "camera-orbit": "8deg 88deg 130%",
          "min-camera-orbit": "8deg 88deg 130%",
          "max-camera-orbit": "8deg 88deg 130%",
          "interaction-prompt": "none",
          "disable-pan": true,
          "disable-zoom": true,
          "shadow-intensity": "0",
          exposure: "1.05",
          "environment-image": "neutral",
          loading: "eager",
          style: {
            width: "100%",
            height: "100%",
            backgroundColor: "transparent",
          },
        })}
      </motion.div>
    </div>
  );
}
