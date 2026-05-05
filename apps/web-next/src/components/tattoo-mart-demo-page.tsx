"use client";

import "@google/model-viewer";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { createElement, useEffect, useMemo, useState } from "react";

type DemoSiteRecord = {
  id: string;
  name: string;
  path: string;
};

type TattooMartDemoPageProps = {
  site: DemoSiteRecord;
};

const artist = {
  name: "Tattoo Mart",
  role: "Artiste resident",
  image: "/sites/demo999/t1.png",
} as const;

const reviewItems = [
  {
    author: "Kevin",
    note: "5,0",
    text: "Studio propre, ambiance serieuse et rendu tres net.",
  },
  {
    author: "Laura",
    note: "5,0",
    text: "Bonne ecoute, projet bien place et finition clean.",
  },
  {
    author: "Mickael",
    note: "5,0",
    text: "Vrais conseils, vraie presence, piece tres propre.",
  },
] as const;

const reviewBreakdown = [
  { label: "5", value: 7 },
  { label: "4", value: 0 },
  { label: "3", value: 0 },
  { label: "2", value: 0 },
  { label: "1", value: 0 },
] as const;

const weekLabels = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"] as const;
const appointmentSlots = [
  "09:00",
  "10:30",
  "12:00",
  "14:00",
  "16:30",
  "19:00",
] as const;
const bookingMonthCount = 4;
const phoneDisplay = "+594 694 27 22 94";
const phoneHref = "tel:+594694272294";
const mapHref =
  "https://www.google.com/maps/search/?api=1&query=1ER+ETAGE+BATIMENT+MACHDEAL+STORE+RESIDENCE+LES+CLOS+DE+SAMANA+1301+Route+de+Remire+Remire-Montjoly+97354+Guyane+francaise";
const instaHref = "https://www.instagram.com/studio_9.9.9/";

const monthFormatter = new Intl.DateTimeFormat("fr-FR", {
  month: "long",
  year: "numeric",
});

const dayFormatter = new Intl.DateTimeFormat("fr-FR", {
  weekday: "long",
  day: "numeric",
  month: "long",
});

type CalendarCell = {
  date: Date;
  inCurrentMonth: boolean;
};

export function TattooMartDemoPage({ site }: TattooMartDemoPageProps) {
  const [showLoader, setShowLoader] = useState(true);
  const [progress, setProgress] = useState(0);
  const [today] = useState<Date>(() => startOfDay(new Date()));
  const [currentMonth, setCurrentMonth] = useState<Date>(() =>
    startOfMonth(startOfDay(new Date())),
  );
  const [selectedDate, setSelectedDate] = useState<Date | null>(() =>
    findFirstAvailableDate(startOfMonth(startOfDay(new Date())), startOfDay(new Date())),
  );
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => setShowLoader(false), 950);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const updateProgress = () => {
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const next = scrollHeight > 0 ? (window.scrollY / scrollHeight) * 100 : 0;
      setProgress(Math.max(0, Math.min(100, next)));
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  const calendarCells = useMemo(() => {
    return buildCalendarCells(currentMonth);
  }, [currentMonth]);

  const monthOptions = useMemo(() => {
    return Array.from({ length: bookingMonthCount }, (_, index) =>
      addMonths(startOfMonth(today), index),
    );
  }, [today]);

  const availableSlots = useMemo(() => {
    if (!selectedDate) {
      return [] as string[];
    }

    return appointmentSlots.filter((slot) =>
      isSlotAvailable(slot, selectedDate, today),
    );
  }, [selectedDate, today]);

  const effectiveSelectedTime =
    selectedTime && availableSlots.includes(selectedTime)
      ? selectedTime
      : availableSlots[0] ?? null;

  return (
    <>
      <AnimatePresence>
        {showLoader ? (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.35, ease: "easeOut" } }}
            className="fixed inset-0 z-[100] overflow-hidden bg-[#fbf7f1]"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(249,208,145,0.3),transparent_24%),linear-gradient(180deg,#fbf7f1_0%,#f1e6d8_100%)]" />
            <motion.div
              animate={{ opacity: [0.2, 0.6, 0.2], scale: [0.94, 1.05, 0.94] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute left-1/2 top-1/2 h-[15rem] w-[15rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ead4b6]/30 blur-[70px]"
            />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 9, ease: "linear", repeat: Infinity }}
              className="absolute left-1/2 top-1/2 h-[16rem] w-[16rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#d8c2a6]/36"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
              <motion.div
                animate={{ y: [0, -8, 0], scale: [1, 1.03, 1] }}
                transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-[min(62vw,11rem)]"
              >
                <Image
                  src="/sites/demo999/tattoo2.png"
                  alt="Tattoo Mart"
                  width={1024}
                  height={1024}
                  priority
                  className="h-auto w-full drop-shadow-[0_0_28px_rgba(214,190,160,0.4)]"
                />
              </motion.div>
              <motion.div
                animate={{ scaleX: [0.4, 1, 0.4], opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2.1, repeat: Infinity, ease: "easeInOut" }}
                className="mt-5 h-[2px] w-28 origin-center rounded-full bg-[linear-gradient(90deg,transparent,#bc8d5d,transparent)]"
              />
              <p className="mt-4 text-[0.8rem] font-bold uppercase tracking-[0.34em] text-[#7d2830]">
                Tattoo Mart
              </p>
              <p className="mt-2 text-[0.62rem] font-semibold uppercase tracking-[0.28em] text-[#8b7563]">
                Ouverture du studio
              </p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <main id="top" className="bg-[#f8f3ec] text-[#1f2428]">
        <div className="fixed inset-x-0 top-0 z-[90] h-[2px] bg-black/6">
          <div
            className="h-full bg-[linear-gradient(90deg,#b98350,#e9d5bd)] shadow-[0_0_16px_rgba(185,131,80,0.28)]"
            style={{ width: `${progress}%` }}
          />
        </div>

        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[#fcf8f2]" />
          <div className="absolute inset-0 hidden md:block">
            <Image
              src="/sites/demo999/p4.png"
              alt="Ambiance tattoo"
              fill
              className="object-cover object-center opacity-[0.16]"
              sizes="100vw"
            />
          </div>
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(252,248,242,0.94)_0%,rgba(246,239,229,0.88)_38%,rgba(242,232,219,0.92)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,221,170,0.26),transparent_20%)]" />
          <div className="absolute inset-x-0 top-0 h-40 bg-[linear-gradient(180deg,rgba(252,248,242,0.94),transparent)]" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(0deg,rgba(242,232,219,0.94),transparent)]" />
          <div className="absolute inset-0 opacity-[0.04] [background-image:linear-gradient(rgba(26,38,48,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(26,38,48,0.18)_1px,transparent_1px)] [background-size:44px_44px]" />

          <div className="relative z-10 mx-auto flex min-h-[100svh] w-[min(1280px,calc(100vw-20px))] flex-col px-0 pb-10 pt-2 md:min-h-screen md:w-[min(1280px,calc(100vw-32px))] md:px-1 md:pb-16 md:pt-4">
            <header className="relative rounded-[1.35rem] border border-[rgba(26,38,48,0.08)] bg-white/72 px-3 py-1.5 backdrop-blur-xl md:rounded-[1.5rem] md:px-6 md:py-3">
              <Link
                href="/"
                className="absolute left-3 top-2 inline-flex items-center gap-2 rounded-full border border-[rgba(26,38,48,0.08)] bg-white/82 px-2 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.08em] text-[#1a2630] md:left-6 md:top-3 md:px-3 md:py-2 md:text-[0.72rem] md:tracking-[0.12em]"
              >
                <span aria-hidden="true">&lt;-</span>
                Retour
              </Link>

              <div className="mx-auto flex max-w-[980px] flex-col items-center gap-0.5">
                <div className="relative w-24 md:w-24 lg:hidden">
                  <Image
                    src="/sites/demo999/tattoo2.png"
                    alt="Tattoo Mart"
                    width={1024}
                    height={1024}
                    className="h-auto w-full"
                  />
                </div>

                <div className="grid w-full max-w-[20rem] grid-cols-3 gap-1 pt-4 lg:hidden">
                  {["Studio", "Reservation", "Avis"].map((item) => (
                    <a
                      key={item}
                      href={`#${item.toLowerCase()}`}
                      className="rounded-full border border-[rgba(26,38,48,0.08)] bg-white/70 px-2 py-1.5 text-center text-[0.52rem] font-semibold uppercase tracking-[0.04em] text-[#61717e]"
                    >
                      {item}
                    </a>
                  ))}
                </div>

                <div className="hidden w-full items-center justify-center gap-4 lg:flex">
                  <nav className="flex items-center gap-4 xl:gap-5">
                    {["Studio", "Projet", "Reservation"].map((item) => (
                      <a
                        key={item}
                        href={`#${item.toLowerCase()}`}
                        className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-[#687684] transition hover:text-[#1a2630]"
                      >
                        {item}
                      </a>
                    ))}
                  </nav>

                  <div className="relative w-20 shrink-0 xl:w-24">
                    <Image
                      src="/sites/demo999/tattoo2.png"
                      alt="Tattoo Mart"
                      width={1024}
                      height={1024}
                      className="h-auto w-full"
                    />
                  </div>

                  <nav className="flex items-center gap-4 xl:gap-5">
                    {["Contact", "Localisation", "Avis"].map((item) => (
                      <a
                        key={item}
                        href={`#${item.toLowerCase()}`}
                        className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-[#687684] transition hover:text-[#1a2630]"
                      >
                        {item}
                      </a>
                    ))}
                  </nav>
                </div>
              </div>
            </header>

            <div className="flex flex-1 flex-col justify-center py-6 sm:py-12">
              <div className="mx-auto mb-6 w-full max-w-[22rem] md:hidden">
                <div className="overflow-hidden rounded-[1.55rem] border border-[rgba(31,36,40,0.08)] bg-white/88 p-2 shadow-[0_18px_50px_rgba(31,36,40,0.1)]">
                  <div className="relative h-[22rem] w-full rounded-[1.1rem] bg-[linear-gradient(135deg,#fffdf9_0%,#f3e8da_58%,#ead8c4_100%)]">
                    <div className="absolute left-[8%] top-[12%] h-16 w-16 rounded-full bg-[radial-gradient(circle,#ffd37e_0%,#f1bf67_48%,#171717_50%,#171717_100%)] shadow-[0_18px_40px_-20px_rgba(26,38,48,0.35)]" />
                    <div className="absolute left-[22%] top-[42%] h-[22%] w-[46%] rotate-[-2deg] rounded-[1rem] border border-[rgba(26,38,48,0.12)] bg-[linear-gradient(180deg,#252d33_0%,#12161a_100%)]" />
                    <div className="absolute right-[10%] top-[20%] h-[64%] w-[32%] rounded-[1.1rem] bg-[linear-gradient(180deg,rgba(250,245,237,0.86),rgba(227,207,182,0.4))]" />
                    <div className="absolute right-[12%] top-[52%] w-[18%] rounded-[1rem] bg-[linear-gradient(180deg,#8f4d33_0%,#5f3626_100%)] p-2">
                      <div className="h-4 rounded bg-black/24" />
                      <div className="mt-2 h-8 rounded bg-black/18" />
                    </div>
                  </div>
                </div>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.06 }}
                className="text-center text-[0.62rem] font-extrabold uppercase tracking-[0.3em] text-[#9a5a3c] sm:text-[0.7rem] sm:tracking-[0.34em]"
              >
                Tattoo Mart
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.12 }}
                className="mx-auto mt-3 flex max-w-2xl flex-col items-center gap-3 px-3 text-center"
              >
                <h1 className="font-display text-[clamp(2rem,8.7vw,5.2rem)] font-semibold leading-[0.92] tracking-[-0.05em] text-[#1a2630]">
                  Un seul artiste
                </h1>
                <p className="max-w-[20rem] text-[0.84rem] leading-6 text-[#6e655c] sm:max-w-[34rem] sm:text-[0.95rem] sm:leading-7">
                  Meme mecanique que demo999, mais un ton plus clair, plus chic,
                  plus calme et centre sur une seule personne.
                </p>
              </motion.div>

              <div className="mt-12 hidden items-center gap-6 lg:grid lg:grid-cols-[0.85fr_1.15fr] xl:gap-8">
                <motion.div
                  whileHover={{ y: -10, scale: 1.02 }}
                  transition={{ duration: 0.28, ease: "easeOut" }}
                  className="overflow-hidden rounded-[1.8rem] border border-[rgba(31,36,40,0.08)] bg-white/88 p-4 shadow-[0_26px_60px_-42px_rgba(31,36,40,0.16)]"
                >
                  <div className="relative min-h-[26rem] overflow-hidden rounded-[1.4rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.72),rgba(236,222,204,0.5))]">
                    <div className="absolute inset-x-[14%] bottom-0 top-[28%] rounded-t-[2rem] bg-[linear-gradient(180deg,rgba(154,90,60,0.16),rgba(233,212,188,0.28))] blur-[80px]" />
                    <Image
                      src={artist.image}
                      alt={artist.name}
                      fill
                      className="object-contain object-bottom p-2"
                      sizes="(max-width: 1024px) 100vw, 32vw"
                    />
                  </div>
                </motion.div>

                <div>
                  <p className="text-[0.72rem] font-extrabold uppercase tracking-[0.32em] text-[#9a5a3c]">
                    Artiste
                  </p>
                  <h2 className="mt-3 font-display text-[clamp(2.6rem,8vw,5rem)] font-semibold leading-[0.88] tracking-[-0.06em] text-[#1a2630]">
                    {artist.name}
                  </h2>
                  <p className="mt-2 text-[0.84rem] font-semibold uppercase tracking-[0.18em] text-[#8a7767]">
                    {artist.role}
                  </p>
                  <p className="mt-4 max-w-[28rem] text-[0.92rem] leading-7 text-[#6e655c]">
                    On reprend la logique premium tattoo du site precedent, mais
                    on retire le collectif. Cette page peut ensuite accueillir le
                    vrai nom, les vraies pieces, le vrai style et la vraie prise
                    de rendez-vous d&apos;une seule personne.
                  </p>

                  <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {["Projet 1", "Projet 2", "Projet 3"].map((label, index) => (
                      <div
                        key={label}
                        className="overflow-hidden rounded-[1.15rem] border border-[rgba(31,36,40,0.08)] bg-white/86 p-3 shadow-[0_18px_40px_-34px_rgba(31,36,40,0.12)] sm:rounded-[1.35rem] sm:p-4"
                      >
                        <div className="relative aspect-[4/5] overflow-hidden rounded-[0.95rem]">
                          <Image
                            src={`/sites/demo999/t${index + 1}.png`}
                            alt={label}
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) 33vw, 12vw"
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <a
                      href="#reservation"
                      className="inline-flex min-h-11 items-center justify-center rounded-full bg-[linear-gradient(135deg,#9a5a3c,#cfa57a)] px-5 text-sm font-bold text-white sm:min-h-12"
                    >
                      Reserver avec {artist.name}
                    </a>
                    <a
                      href={instaHref}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex min-h-11 items-center justify-center gap-3 rounded-full border border-[rgba(31,36,40,0.08)] bg-white/88 px-5 text-sm font-semibold text-[#1f2428] sm:min-h-12"
                    >
                      <span className="relative h-7 w-7 overflow-hidden rounded-full">
                        <Image
                          src="/sites/demo999/insta.png"
                          alt="Instagram"
                          fill
                          className="object-cover"
                          sizes="28px"
                        />
                      </span>
                      Instagram
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="relative">
          <div className="pointer-events-none absolute inset-0 z-[0] hidden lg:block">
            <div className="sticky top-28 h-[80vh] overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(207,165,122,0.12),transparent_42%)]" />
              <motion.div
                animate={{
                  rotate: [0, -8, -18, -8, 6, 14, 8, 0],
                  x: [0, -28, -60, -20, 24, 64, 22, 0],
                  y: [0, 14, 40, 70, 48, 18, -18, 0],
                  scale: [1.44, 1.48, 1.46, 1.49, 1.45, 1.47, 1.46, 1.44],
                }}
                transition={{
                  duration: 30,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="h-full w-full"
                style={{
                  opacity: 0.12,
                  filter: "drop-shadow(0 30px 60px rgba(177, 145, 113, 0.16))",
                }}
              >
                {createElement("model-viewer", {
                  src: "/sites/demo999/tattoo_machine.glb",
                  alt: "Machine de tatouage 3D",
                  "camera-orbit": "28deg 82deg 90%",
                  "min-camera-orbit": "auto auto 90%",
                  "max-camera-orbit": "auto auto 90%",
                  "interaction-prompt": "none",
                  "disable-pan": true,
                  "disable-zoom": true,
                  "shadow-intensity": "0",
                  exposure: "1.05",
                  "environment-image": "neutral",
                  loading: "lazy",
                  style: {
                    width: "100%",
                    height: "100%",
                    backgroundColor: "transparent",
                  },
                })}
              </motion.div>
            </div>
          </div>

          <section
            id="studio"
            className="mx-auto w-[min(1280px,calc(100vw-20px))] px-0 py-8 sm:w-[min(1280px,calc(100vw-32px))] sm:px-1 sm:py-12"
          >
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5 }}
              className="grid gap-6 lg:grid-cols-[1.02fr_0.98fr]"
            >
              <div className="order-2 lg:order-1">
                <p className="text-[0.72rem] font-extrabold uppercase tracking-[0.32em] text-[#9a5a3c]">
                  Studio
                </p>
                <h2 className="mt-3 font-display text-[clamp(2.4rem,8vw,5rem)] font-semibold leading-[0.88] tracking-[-0.06em] text-[#1a2630]">
                  Une seule signature.
                </h2>
                <p className="mt-4 max-w-[28rem] text-[0.92rem] leading-7 text-[#6e655c]">
                  On garde la meme logique de mise en avant qu&apos;un site tattoo
                  premium, mais tout tourne maintenant autour d&apos;un seul artiste
                  et d&apos;une ambiance plus lumineuse, plus propre, plus nette.
                </p>

                <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {["/sites/demo999/t1.png", "/sites/demo999/t2.png", "/sites/demo999/t3.png"].map(
                    (image, index) => (
                      <div
                        key={image}
                        className="overflow-hidden rounded-[1.15rem] border border-[rgba(31,36,40,0.08)] bg-white/88 p-3 shadow-[0_18px_40px_-34px_rgba(31,36,40,0.12)] sm:rounded-[1.35rem] sm:p-4"
                      >
                        <div className="relative aspect-[4/5] overflow-hidden rounded-[0.95rem]">
                          <Image
                            src={image}
                            alt={`Projet ${index + 1}`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) 33vw, 12vw"
                          />
                        </div>
                      </div>
                    ),
                  )}
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <a
                    href="#reservation"
                    className="inline-flex min-h-11 items-center justify-center rounded-full bg-[linear-gradient(135deg,#9a5a3c,#cfa57a)] px-5 text-sm font-bold text-white sm:min-h-12"
                  >
                    Reserver avec {artist.name}
                  </a>
                  <a
                    href={instaHref}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-11 items-center justify-center gap-3 rounded-full border border-[rgba(31,36,40,0.08)] bg-white/88 px-5 text-sm font-semibold text-[#1f2428] sm:min-h-12"
                  >
                    <span className="relative h-7 w-7 overflow-hidden rounded-full">
                      <Image
                        src="/sites/demo999/insta.png"
                        alt="Instagram"
                        fill
                        className="object-cover"
                        sizes="28px"
                      />
                    </span>
                    Instagram
                  </a>
                </div>
              </div>

              <div className="order-1 lg:order-2">
                <div className="relative overflow-hidden rounded-[1.8rem] border border-[rgba(31,36,40,0.08)] bg-[radial-gradient(circle_at_top,rgba(207,165,122,0.12),transparent_24%),white] p-4 shadow-[0_26px_60px_-40px_rgba(31,36,40,0.14)]">
                  <motion.div
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ duration: 0.28, ease: "easeOut" }}
                    className="relative min-h-[20rem] overflow-hidden rounded-[1.4rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.82),rgba(236,222,204,0.46))] sm:min-h-[24rem]"
                  >
                    <div className="absolute inset-x-[14%] bottom-0 top-[28%] rounded-t-[2rem] bg-[linear-gradient(180deg,rgba(154,90,60,0.14),rgba(233,212,188,0.24))] blur-[80px]" />
                    <Image
                      src={artist.image}
                      alt={artist.name}
                      fill
                      className="object-contain object-bottom p-2"
                      sizes="(max-width: 1024px) 100vw, 32vw"
                    />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </section>
        </div>

        <section
          id="reservation"
          className="mx-auto w-[min(1280px,calc(100vw-20px))] px-0 py-8 sm:w-[min(1280px,calc(100vw-32px))] sm:px-1 sm:py-12"
        >
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            className="overflow-hidden rounded-[1.65rem] border border-[rgba(31,36,40,0.08)] bg-[linear-gradient(180deg,rgba(255,255,255,0.94),rgba(245,237,227,0.96))] p-4 shadow-[0_28px_65px_-42px_rgba(31,36,40,0.14)] sm:rounded-[2rem] sm:p-6 lg:p-8"
          >
            <div className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
              <div>
                <p className="text-[0.72rem] font-extrabold uppercase tracking-[0.32em] text-[#9a5a3c]">
                  Reservation
                </p>
                <h2 className="mt-3 font-display text-[clamp(1.85rem,7vw,4.5rem)] font-semibold leading-[0.92] tracking-[-0.05em] text-[#1a2630]">
                  Choisissez date et heure.
                </h2>

                <div className="mt-6 rounded-[1rem] border border-[rgba(31,36,40,0.08)] bg-white/90 px-4 py-4 sm:rounded-[1.2rem]">
                  <p className="text-[0.68rem] font-extrabold uppercase tracking-[0.2em] text-[#9a5a3c]">
                    Artiste
                  </p>
                  <p className="mt-2 text-sm font-semibold text-[#1a2630]">
                    {artist.name}
                  </p>
                </div>

                <div className="mt-6 flex snap-x snap-mandatory gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible">
                  {monthOptions.map((month) => {
                    const active = Boolean(
                      currentMonth && isSameMonth(month, currentMonth),
                    );

                    return (
                      <button
                        key={month.toISOString()}
                        type="button"
                        onClick={() => {
                          setCurrentMonth(month);
                          setSelectedDate(findFirstAvailableDate(month, today));
                          setSelectedTime(null);
                        }}
                        className={`shrink-0 snap-start rounded-full border px-3 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.08em] transition sm:px-4 sm:text-sm ${
                          active
                            ? "border-[#cfa57a]/40 bg-[#cfa57a] text-white"
                            : "border-[rgba(31,36,40,0.08)] bg-white/88 text-[#7d6a5a]"
                        }`}
                      >
                        {monthFormatter.format(month)}
                      </button>
                    );
                  })}
                </div>

                <div className="mt-5 grid grid-cols-7 gap-1 sm:gap-3">
                  {weekLabels.map((label) => (
                    <div
                      key={label}
                      className="text-center text-[0.56rem] uppercase tracking-[0.08em] text-[#8a98a4] sm:text-[0.72rem] sm:tracking-[0.16em]"
                    >
                      {label}
                    </div>
                  ))}

                  {calendarCells.map((cell) => {
                    const disabled =
                      !today ||
                      !isDateBookable(cell.date, today) ||
                      !cell.inCurrentMonth;
                    const selected = Boolean(
                      selectedDate && isSameDay(cell.date, selectedDate),
                    );

                    return (
                      <button
                        key={cell.date.toISOString()}
                        type="button"
                        disabled={disabled}
                        onClick={() => {
                          setSelectedDate(cell.date);
                          setSelectedTime(null);
                        }}
                        className={`rounded-[0.8rem] border px-1 py-2 text-center transition sm:rounded-[1.15rem] sm:px-2 sm:py-4 ${
                          selected
                            ? "border-[#cfa57a]/40 bg-[#cfa57a] text-white"
                            : disabled
                              ? "border-[rgba(31,36,40,0.05)] bg-white/45 text-[#c7beb5]"
                              : "border-[rgba(31,36,40,0.08)] bg-white/88 text-[#1f2428] hover:border-[#9a5a3c]/22"
                        }`}
                      >
                        <p className="font-display text-[0.92rem] font-semibold leading-none sm:text-[1.5rem]">
                          {cell.date.getDate()}
                        </p>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-5 rounded-[1.1rem] border border-[rgba(31,36,40,0.08)] bg-white/90 p-3.5 sm:rounded-[1.25rem] sm:p-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-[0.72rem] uppercase tracking-[0.22em] text-[#9a5a3c]">
                        {selectedDate
                          ? capitalize(dayFormatter.format(selectedDate))
                          : "Aucune date"}
                      </p>
                      <p className="mt-2 text-sm text-[#7b6c60]">
                        {availableSlots.length
                          ? "Choisissez ensuite votre heure."
                          : "Aucun creneau disponible sur cette date."}
                      </p>
                    </div>
                    <span className="rounded-full border border-[rgba(31,36,40,0.08)] bg-white/80 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[#8a7767]">
                      {availableSlots.length ? "Disponible" : "Ferme"}
                    </span>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3">
                    {availableSlots.length ? (
                      availableSlots.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setSelectedTime(slot)}
                          className={`rounded-[0.95rem] border px-3 py-3 text-sm font-semibold transition ${
                            selectedTime === slot
                              ? "border-[#9a5a3c]/32 bg-[#9a5a3c] text-white"
                              : "border-[rgba(31,36,40,0.08)] bg-white/84 text-[#1f2428]"
                          }`}
                        >
                          {slot}
                        </button>
                      ))
                    ) : (
                      <div className="col-span-2 rounded-[1rem] border border-[rgba(31,36,40,0.06)] bg-white/72 px-4 py-4 text-sm text-[#b0a59a] sm:col-span-3">
                        Aucun creneau sur ce jour.
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid gap-5">
                <article
                  id="localisation"
                  className="overflow-hidden rounded-[1.8rem] border border-[rgba(31,36,40,0.08)] bg-white/90 shadow-[0_24px_54px_-38px_rgba(31,36,40,0.14)]"
                >
                  <div className="relative min-h-[13rem] sm:min-h-[16rem]">
                    <Image
                      src="/sites/demo999/map.png"
                      alt="Carte Tattoo Mart"
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 36vw"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(252,247,240,0.94))]" />
                    <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6">
                      <p className="text-[0.72rem] uppercase tracking-[0.22em] text-[#9a5a3c]">
                        Localisation
                      </p>
                      <p className="mt-2 text-base font-semibold text-[#1a2630]">
                        Remire-Montjoly, Guyane francaise
                      </p>
                      <p className="mt-2 text-sm leading-6 text-[#6e655c]">
                        1er etage, batiment Machdeal Store
                        <br />
                        Residence Les Clos de Samana
                        <br />
                        1301 route de Remire, 97354
                      </p>
                    </div>
                  </div>
                </article>

                <article
                  id="contact"
                  className="rounded-[1.5rem] border border-[rgba(31,36,40,0.08)] bg-white/90 p-4 shadow-[0_24px_54px_-38px_rgba(31,36,40,0.14)] sm:rounded-[1.8rem] sm:p-6"
                >
                  <div className="rounded-[1.1rem] border border-[rgba(31,36,40,0.08)] bg-[#f8f0e4] p-4 sm:rounded-[1.25rem]">
                    <p className="text-[0.72rem] uppercase tracking-[0.22em] text-[#9a5a3c]">
                      Recapitulatif
                    </p>
                    <div className="mt-4 grid gap-3 text-sm text-[#6e655c]">
                      <div className="flex items-start justify-between gap-4">
                        <span>Artiste</span>
                        <strong className="max-w-[13rem] text-right text-[#1a2630]">
                          {artist.name}
                        </strong>
                      </div>
                      <div className="flex items-start justify-between gap-4">
                        <span>Date</span>
                        <strong className="max-w-[13rem] text-right text-[#1a2630]">
                          {selectedDate
                            ? capitalize(dayFormatter.format(selectedDate))
                            : "Choisissez un jour"}
                        </strong>
                      </div>
                      <div className="flex items-start justify-between gap-4">
                        <span>Heure</span>
                        <strong className="text-[#1a2630]">
                          {effectiveSelectedTime ?? "Choisissez une heure"}
                        </strong>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 rounded-[1.1rem] border border-[rgba(31,36,40,0.08)] bg-[#f8f0e4] p-4 sm:rounded-[1.25rem]">
                    <p className="text-[0.72rem] uppercase tracking-[0.22em] text-[#9a5a3c]">
                      Contact
                    </p>
                    <p className="mt-3 text-sm leading-7 text-[#6e655c]">
                      {phoneDisplay}
                      <br />
                      Lundi au samedi, 09h00 - 21h00
                    </p>
                  </div>

                  <div className="mt-5 flex flex-col gap-3">
                    <a
                      href={phoneHref}
                      className="inline-flex min-h-11 items-center justify-center rounded-full bg-[linear-gradient(135deg,#9a5a3c,#cfa57a)] px-6 text-sm font-bold text-white sm:min-h-12"
                    >
                      Reserver avec {artist.name}
                    </a>
                    <a
                      href={mapHref}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex min-h-11 items-center justify-center rounded-full border border-[rgba(31,36,40,0.08)] bg-white/88 px-6 text-sm font-semibold text-[#1f2428] sm:min-h-12"
                    >
                      Ouvrir l&apos;adresse
                    </a>
                    <a
                      href={instaHref}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex min-h-11 items-center justify-center gap-3 rounded-full border border-[rgba(31,36,40,0.08)] bg-white/88 px-6 text-sm font-semibold text-[#1f2428] sm:min-h-12"
                    >
                      <span className="relative h-7 w-7 overflow-hidden rounded-full">
                        <Image
                          src="/sites/demo999/insta.png"
                          alt="Instagram"
                          fill
                          className="object-cover"
                          sizes="28px"
                        />
                      </span>
                      Instagram Studio 9.9.9
                    </a>
                  </div>
                </article>
              </div>
            </div>
          </motion.div>
        </section>

        <section
          id="avis"
          className="mx-auto w-[min(1280px,calc(100vw-20px))] px-0 py-8 sm:w-[min(1280px,calc(100vw-32px))] sm:px-1 sm:py-12"
        >
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            className="overflow-hidden rounded-[1.65rem] border border-[rgba(31,36,40,0.08)] bg-[linear-gradient(180deg,rgba(255,255,255,0.95),rgba(245,237,227,0.94))] p-4 shadow-[0_28px_65px_-42px_rgba(31,36,40,0.14)] sm:rounded-[2rem] sm:p-6 lg:p-8"
          >
            <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
              <div>
                <p className="text-[0.72rem] font-extrabold uppercase tracking-[0.32em] text-[#9a5a3c]">
                  Avis
                </p>
                <h2 className="mt-3 font-display text-[clamp(1.85rem,7vw,4.5rem)] font-semibold leading-[0.92] tracking-[-0.05em] text-[#1a2630]">
                  Les retours du studio.
                </h2>
              </div>

              <div className="grid gap-5">
                <article className="rounded-[1.45rem] border border-[rgba(31,36,40,0.08)] bg-white/90 p-4 shadow-[0_24px_54px_-38px_rgba(31,36,40,0.12)] sm:rounded-[1.8rem] sm:p-6">
                  <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                    <div className="min-w-0 flex-1">
                      <p className="text-base font-semibold text-[#1a2630] sm:text-lg">
                        Resume des avis
                      </p>
                      <p className="mt-2 text-sm text-[#8a7767]">
                        Les avis ne sont pas verifies
                      </p>

                      <div className="mt-5 grid gap-3">
                        {reviewBreakdown.map((row) => {
                          const width = `${(row.value / 7) * 100}%`;

                          return (
                            <div key={row.label} className="grid grid-cols-[18px_1fr] items-center gap-3">
                              <span className="text-sm font-semibold text-[#53606d]">
                                {row.label}
                              </span>
                              <div className="h-2.5 overflow-hidden rounded-full bg-[#eadfce]">
                                <div
                                  className="h-full rounded-full bg-[#cfa57a]"
                                  style={{ width }}
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="flex min-w-[7rem] flex-row items-end justify-between gap-4 md:flex-col md:items-end">
                      <div className="text-[3.2rem] font-semibold leading-none tracking-[-0.06em] text-[#1a2630] sm:text-[4rem]">
                        5,0
                      </div>
                      <div className="pb-2 text-right">
                        <p className="text-lg tracking-[0.18em] text-[#cfa57a]">★★★★★</p>
                        <p className="mt-1 text-sm text-[#8a7767]">7 avis</p>
                      </div>
                    </div>
                  </div>
                </article>

                <div className="grid gap-5 md:grid-cols-3">
                  {reviewItems.map((review) => (
                    <article
                      key={review.author}
                      className="rounded-[1.25rem] border border-[rgba(31,36,40,0.08)] bg-white/90 p-4 shadow-[0_24px_54px_-38px_rgba(31,36,40,0.12)] sm:rounded-[1.5rem] sm:p-5"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <p className="font-semibold text-[#1a2630]">{review.author}</p>
                        <p className="text-sm font-bold text-[#cfa57a]">{review.note}</p>
                      </div>
                      <p className="mt-2 text-sm tracking-[0.18em] text-[#cfa57a]">★★★★★</p>
                      <p className="mt-4 text-[0.9rem] leading-6 text-[#6e655c] sm:text-[0.94rem] sm:leading-7">
                        {review.text}
                      </p>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        <footer className="mx-auto flex w-[min(1280px,calc(100vw-20px))] flex-col justify-between gap-3 px-0 pb-8 pt-4 text-[0.76rem] text-[#8a7767] sm:w-[min(1280px,calc(100vw-32px))] sm:px-1 sm:text-[0.82rem] md:flex-row">
          <p>{site.path} - tattoo studio solo version claire</p>
          <a href="#top" className="transition hover:text-[#1a2630]">
            Retour en haut
          </a>
        </footer>
      </main>
    </>
  );
}

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function addMonths(date: Date, amount: number) {
  return new Date(date.getFullYear(), date.getMonth() + amount, 1);
}

function isSameMonth(left: Date, right: Date) {
  return (
    left.getFullYear() === right.getFullYear() &&
    left.getMonth() === right.getMonth()
  );
}

function isSameDay(left: Date, right: Date) {
  return (
    left.getFullYear() === right.getFullYear() &&
    left.getMonth() === right.getMonth() &&
    left.getDate() === right.getDate()
  );
}

function isDateBookable(date: Date, today: Date) {
  const current = startOfDay(date);
  if (current.getTime() < today.getTime()) {
    return false;
  }

  return current.getDay() !== 0;
}

function findFirstAvailableDate(month: Date, today: Date) {
  const lastDay = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();

  for (let day = 1; day <= lastDay; day += 1) {
    const candidate = new Date(month.getFullYear(), month.getMonth(), day);
    if (isDateBookable(candidate, today)) {
      return candidate;
    }
  }

  return null;
}

function buildCalendarCells(month: Date): CalendarCell[] {
  const firstDay = new Date(month.getFullYear(), month.getMonth(), 1);
  const firstWeekDay = (firstDay.getDay() + 6) % 7;
  const gridStart = new Date(month.getFullYear(), month.getMonth(), 1 - firstWeekDay);
  const cells: CalendarCell[] = [];

  for (let index = 0; index < 42; index += 1) {
    const date = new Date(
      gridStart.getFullYear(),
      gridStart.getMonth(),
      gridStart.getDate() + index,
    );

    cells.push({
      date,
      inCurrentMonth: date.getMonth() === month.getMonth(),
    });
  }

  return cells;
}

function isSlotAvailable(slot: string, selectedDate: Date, today: Date) {
  if (!isSameDay(selectedDate, today)) {
    return true;
  }

  const [hours, minutes] = slot.split(":").map(Number);
  const slotDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
    hours,
    minutes,
  );

  return slotDate.getTime() > Date.now() + 45 * 60 * 1000;
}

function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
