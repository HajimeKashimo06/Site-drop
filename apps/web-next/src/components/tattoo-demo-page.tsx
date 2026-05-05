"use client";

import "@google/model-viewer";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

type DemoSiteRecord = {
  id: string;
  name: string;
  path: string;
};

type TattooDemoPageProps = {
  site: DemoSiteRecord;
};

declare global {
  namespace React.JSX {
    interface IntrinsicElements {
      "model-viewer": any;
    }
  }
}

type Artist = {
  id: string;
  name: string;
  image: string;
  accent: string;
};

const artists: readonly Artist[] = [
  {
    id: "artline-tattoo",
    name: "ARTLINE TATTOO",
    image: "/sites/demo999/t1.png",
    accent: "from-[#153a35] to-[#48bab4]",
  },
  {
    id: "sparkle-by-nl",
    name: "SPARKLE BY NL",
    image: "/sites/demo999/t2.png",
    accent: "from-[#123632] to-[#5ed2cb]",
  },
  {
    id: "macao-ink",
    name: "MACAO INK",
    image: "/sites/demo999/t3.png",
    accent: "from-[#173f39] to-[#389790]",
  },
  {
    id: "cave-tattoo",
    name: "CAVE TATTOO",
    image: "/sites/demo999/t4.png",
    accent: "from-[#102f2c] to-[#45a9a2]",
  },
] as const;

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

const headerLeftArtists = artists.slice(0, 2);
const headerRightArtists = artists.slice(2);
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

export function TattooDemoPage({ site }: TattooDemoPageProps) {
  const [showLoader, setShowLoader] = useState(true);
  const [progress, setProgress] = useState(0);
  const [today, setToday] = useState<Date | null>(null);
  const [currentMonth, setCurrentMonth] = useState<Date | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedArtistId, setSelectedArtistId] = useState<string>(artists[0].id);

  useEffect(() => {
    const timer = window.setTimeout(() => setShowLoader(false), 1100);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const now = startOfDay(new Date());
    setToday(now);
    setCurrentMonth(startOfMonth(now));
    setSelectedDate(findFirstAvailableDate(startOfMonth(now), now));
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

  useEffect(() => {
    if (!today || !currentMonth) {
      return;
    }

    if (!selectedDate || !isSameMonth(selectedDate, currentMonth)) {
      setSelectedDate(findFirstAvailableDate(currentMonth, today));
      setSelectedTime(null);
    }
  }, [currentMonth, selectedDate, today]);

  const calendarCells = useMemo(() => {
    if (!currentMonth) {
      return [] as CalendarCell[];
    }

    return buildCalendarCells(currentMonth);
  }, [currentMonth]);

  const monthOptions = useMemo(() => {
    if (!today) {
      return [] as Date[];
    }

    return Array.from({ length: bookingMonthCount }, (_, index) =>
      addMonths(startOfMonth(today), index),
    );
  }, [today]);

  const availableSlots = useMemo(() => {
    if (!selectedDate || !today) {
      return [] as string[];
    }

    return appointmentSlots.filter((slot) =>
      isSlotAvailable(slot, selectedDate, today),
    );
  }, [selectedDate, today]);

  useEffect(() => {
    if (!availableSlots.length) {
      setSelectedTime(null);
      return;
    }

    if (!selectedTime || !availableSlots.includes(selectedTime)) {
      setSelectedTime(availableSlots[0]);
    }
  }, [availableSlots, selectedTime]);

  const selectedArtist =
    artists.find((artist) => artist.id === selectedArtistId) ?? artists[0];

  return (
    <>
      <AnimatePresence>
        {showLoader ? (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.35, ease: "easeOut" } }}
            className="fixed inset-0 z-[100] overflow-hidden bg-[#081512]"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(85,206,197,0.22),transparent_24%),linear-gradient(180deg,#081512_0%,#10231d_100%)]" />
            <motion.div
              animate={{ opacity: [0.2, 0.55, 0.2], scale: [0.92, 1.06, 0.92] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute left-1/2 top-1/2 h-[15rem] w-[15rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#4acdc4]/18 blur-[70px]"
            />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 9, ease: "linear", repeat: Infinity }}
              className="absolute left-1/2 top-1/2 h-[16rem] w-[16rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#67d0ca]/10"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 12, ease: "linear", repeat: Infinity }}
              className="absolute left-1/2 top-1/2 h-[12.5rem] w-[12.5rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#67d0ca]/16 shadow-[0_0_36px_rgba(103,208,202,0.18)]"
            />
            <motion.div
              animate={{ rotate: [0, 180, 360], opacity: [0.35, 0.8, 0.35] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute left-1/2 top-1/2 h-[10rem] w-[10rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-transparent border-t-[#73e6de] border-r-[#2aa098]/40"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
              <motion.div
                animate={{ y: [0, -8, 0], scale: [1, 1.03, 1] }}
                transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-[min(62vw,11rem)]"
              >
                <Image
                  src="/sites/demo999/tattoo2.png"
                  alt="999 Studio"
                  width={1024}
                  height={1024}
                  priority
                  className="h-auto w-full drop-shadow-[0_0_28px_rgba(76,205,196,0.22)]"
                />
              </motion.div>
              <motion.div
                animate={{ scaleX: [0.4, 1, 0.4], opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2.1, repeat: Infinity, ease: "easeInOut" }}
                className="mt-5 h-[2px] w-28 origin-center rounded-full bg-[linear-gradient(90deg,transparent,#69ddd5,transparent)]"
              />
              <p className="mt-4 text-[0.8rem] font-bold uppercase tracking-[0.34em] text-[#67d0ca]">
                999 Studio
              </p>
              <p className="mt-2 text-[0.62rem] font-semibold uppercase tracking-[0.28em] text-white/34">
                Chargement du studio
              </p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <main id="top" className="bg-[#0a1713] text-white">
        <div className="fixed inset-x-0 top-0 z-[90] h-[2px] bg-white/6">
          <div
            className="h-full bg-[linear-gradient(90deg,#1a5b53,#67d0ca)] shadow-[0_0_16px_rgba(103,208,202,0.34)]"
            style={{ width: `${progress}%` }}
          />
        </div>

        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[#06100d]" />
          <video
            className="absolute inset-0 hidden h-full w-full object-cover md:block"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="/sites/demo999/p4.png"
          >
            <source src="/sites/demo999/video.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,16,13,0.55)_0%,rgba(6,16,13,0.76)_34%,rgba(6,16,13,0.88)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(86,208,198,0.14),transparent_24%)]" />
          <div className="absolute inset-x-0 top-0 h-40 bg-[linear-gradient(180deg,rgba(6,16,13,0.72),transparent)]" />
          <div className="absolute inset-x-0 bottom-0 h-48 bg-[linear-gradient(0deg,rgba(6,16,13,0.94),transparent)]" />
          <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:48px_48px]" />

          <div className="relative z-10 mx-auto flex min-h-[100svh] w-[min(1280px,calc(100vw-20px))] flex-col px-0 pb-10 pt-2 md:min-h-screen md:w-[min(1280px,calc(100vw-32px))] md:px-1 md:pb-16 md:pt-4">
            <header className="relative rounded-[1.35rem] border border-white/8 bg-[rgba(10,10,10,0.78)] px-3 py-1.5 backdrop-blur-xl md:rounded-[1.5rem] md:px-6 md:py-3">
              <Link
                href="/"
                className="absolute left-3 top-2 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-2 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.08em] text-white/80 md:left-6 md:top-3 md:px-3 md:py-2 md:text-[0.72rem] md:tracking-[0.12em]"
              >
                <span aria-hidden="true">&lt;-</span>
                Retour
              </Link>

              <div className="mx-auto flex max-w-[980px] flex-col items-center gap-0.5">
                <div className="relative w-24 md:w-24 lg:hidden">
                  <Image
                    src="/sites/demo999/tattoo2.png"
                    alt="999 Studio"
                    width={1024}
                    height={1024}
                    className="h-auto w-full"
                  />
                </div>

                <div className="grid w-full max-w-[20rem] grid-cols-2 gap-1 pt-4 lg:hidden">
                  {artists.map((artist) => (
                    <a
                      key={artist.id}
                      href={`#${artist.id}`}
                      className="rounded-full border border-white/10 bg-white/[0.03] px-2 py-1.5 text-center text-[0.52rem] font-semibold uppercase tracking-[0.04em] text-white/60"
                    >
                      {artist.name}
                    </a>
                  ))}
                </div>

                <div className="hidden w-full items-center justify-center gap-3 lg:flex">
                  <nav className="flex items-center justify-end gap-3 xl:gap-4">
                    {headerLeftArtists.map((artist) => (
                      <a
                        key={artist.id}
                        href={`#${artist.id}`}
                        className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-white/56 transition hover:text-white"
                      >
                        {artist.name}
                      </a>
                    ))}
                  </nav>

                  <div className="relative w-20 shrink-0 xl:w-24">
                    <Image
                      src="/sites/demo999/tattoo2.png"
                      alt="999 Studio"
                      width={1024}
                      height={1024}
                      className="h-auto w-full"
                    />
                  </div>

                  <nav className="flex items-center justify-start gap-3 xl:gap-4">
                    {headerRightArtists.map((artist) => (
                      <a
                        key={artist.id}
                        href={`#${artist.id}`}
                        className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-white/56 transition hover:text-white"
                      >
                        {artist.name}
                      </a>
                    ))}
                  </nav>
                </div>
              </div>
            </header>

            <div className="flex flex-1 flex-col justify-center py-6 sm:py-12">
              <div className="mx-auto mb-6 w-full max-w-[22rem] md:hidden">
                <div className="overflow-hidden rounded-[1.55rem] border border-white/10 bg-[rgba(8,20,17,0.86)] p-2 shadow-[0_18px_50px_rgba(0,0,0,0.34)]">
                  <video
                    className="h-[22rem] w-full rounded-[1.1rem] object-cover object-center"
                    autoPlay
                    muted
                    loop
                    playsInline
                    controls
                    preload="metadata"
                    poster="/sites/demo999/p4.png"
                  >
                    <source src="/sites/demo999/video.mp4" type="video/mp4" />
                  </video>
                </div>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.06 }}
                className="text-center text-[0.62rem] font-extrabold uppercase tracking-[0.3em] text-[#67d0ca] sm:text-[0.7rem] sm:tracking-[0.34em]"
              >
                999 Studio
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.12 }}
                className="mx-auto mt-3 flex max-w-2xl flex-col items-center gap-3 px-3 text-center"
              >
                <h1 className="font-display text-[clamp(2rem,8.7vw,5.2rem)] font-semibold leading-[0.92] tracking-[-0.05em]">
                  Nos tatoueurs
                </h1>
                <p className="max-w-[19rem] text-[0.84rem] leading-6 text-white/56 sm:max-w-[34rem] sm:text-[0.95rem] sm:leading-7">
                  Quatre univers. Quatre signatures. Une base sobre, noire, nette.
                </p>
              </motion.div>

              <div className="mt-12 hidden items-end gap-4 lg:grid lg:grid-cols-4 xl:gap-6">
                {artists.map((artist, index) => (
                  <ArtistHeroCard
                    key={artist.id}
                    artist={artist}
                    align={index < 2 ? "right" : "left"}
                  />
                ))}
              </div>

              <div className="-mx-1 mt-7 flex snap-x snap-mandatory gap-3 overflow-x-auto px-1 pb-2 lg:hidden">
                {artists.map((artist, index) => (
                  <ArtistHeroCard
                    key={artist.id}
                    artist={artist}
                    align={index % 2 === 0 ? "right" : "left"}
                    compact
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="relative">
          <div className="pointer-events-none absolute inset-0 z-[0] hidden lg:block">
            <div className="sticky top-28 h-[80vh] overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(86,208,198,0.08),transparent_40%)]" />
              <motion.div
                animate={{
                  rotate: [0, -12, -24, -10, 8, 22, 12, -6, -18, 0],
                  x: [0, -42, -86, -28, 34, 92, 48, -18, -64, 0],
                  y: [0, 18, 58, 96, 74, 22, -28, -62, -18, 0],
                  scale: [1.52, 1.56, 1.54, 1.58, 1.55, 1.53, 1.57, 1.54, 1.56, 1.52],
                }}
                transition={{
                  duration: 34,
                  repeat: Infinity,
                  ease: "easeInOut",
                  times: [0, 0.08, 0.18, 0.31, 0.44, 0.58, 0.71, 0.84, 0.93, 1],
                }}
                className="h-full w-full"
                style={{
                  opacity: 0.16,
                  filter: "drop-shadow(0 30px 60px rgba(0,0,0,0.25))",
                }}
              >
                <model-viewer
                  src="/sites/demo999/tattoo_machine.glb"
                  alt="Machine de tatouage 3D"
                  camera-orbit="28deg 82deg 90%"
                  min-camera-orbit="auto auto 90%"
                  max-camera-orbit="auto auto 90%"
                  interaction-prompt="none"
                  disable-pan
                  disable-zoom
                  shadow-intensity="0"
                  exposure="0.95"
                  environment-image="neutral"
                  loading="lazy"
                  style={{
                    width: "100%",
                    height: "100%",
                    backgroundColor: "transparent",
                  }}
                />
              </motion.div>
            </div>
          </div>

        {artists.map((artist, index) => (
          <div key={artist.id}>
            {index > 0 ? (
              <div className="mx-auto w-[min(1280px,calc(100vw-20px))] px-0 py-4 sm:w-[min(1280px,calc(100vw-32px))] sm:px-1 sm:py-6">
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.45 }}
                  className="relative flex items-center justify-center overflow-hidden py-4"
                >
                  <motion.div
                    animate={{ x: [-18, 18, -18], opacity: [0.08, 0.2, 0.08] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute h-12 w-40 rounded-full bg-[#4bc5be]/18 blur-[36px]"
                  />
                  <div className="h-px w-full max-w-5xl bg-[linear-gradient(90deg,transparent,rgba(76,197,190,0.32),transparent)]" />
                  <div className="absolute rounded-full border border-[#67d0ca]/20 bg-[#0e1f1a] px-4 py-2 text-[0.62rem] font-extrabold uppercase tracking-[0.24em] text-[#67d0ca]">
                    999 Studio
                  </div>
                </motion.div>
              </div>
            ) : null}

            <section
              id={artist.id}
              className="mx-auto w-[min(1280px,calc(100vw-20px))] px-0 py-8 sm:w-[min(1280px,calc(100vw-32px))] sm:px-1 sm:py-12"
            >
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5 }}
                className="relative overflow-hidden rounded-[1.65rem] border border-white/8 bg-[linear-gradient(180deg,rgba(12,18,16,0.94),rgba(8,12,10,0.98))] p-4 sm:rounded-[2rem] sm:p-6 lg:p-8"
              >
                <div className="relative z-[2] grid gap-6 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
                  <div className={`order-1 ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                    <div className="relative overflow-hidden rounded-[1.8rem] border border-white/8 bg-[radial-gradient(circle_at_top,rgba(87,210,202,0.08),transparent_22%),#0c1412] p-4">
                      <motion.div
                        whileHover={{ y: -8, scale: 1.02 }}
                        transition={{ duration: 0.28, ease: "easeOut" }}
                        className={`relative min-h-[20rem] overflow-hidden rounded-[1.4rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))] sm:min-h-[24rem]`}
                      >
                        <div className={`absolute inset-x-[14%] bottom-0 top-[28%] rounded-t-[2rem] bg-gradient-to-b ${artist.accent} opacity-18 blur-[80px]`} />
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

                  <div className={`order-2 ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                    <p className="text-[0.72rem] font-extrabold uppercase tracking-[0.32em] text-[#67d0ca]">
                      Tatoueur
                    </p>
                    <h2 className="mt-3 font-display text-[clamp(2.4rem,8vw,5rem)] font-semibold leading-[0.88] tracking-[-0.06em]">
                      {artist.name}
                    </h2>
                    <p className="mt-4 max-w-[28rem] text-[0.9rem] leading-6 text-white/56 sm:text-[0.95rem] sm:leading-7">
                      Espace dedie pour construire l'univers de {artist.name}. On
                      branchera ici ses photos, ses projets et son style propre.
                    </p>

                    <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
                      {["Photo 1", "Photo 2", "Photo 3"].map((label) => (
                        <div
                          key={`${artist.id}-${label}`}
                          className="flex min-h-[8.5rem] items-end rounded-[1.15rem] border border-dashed border-white/12 bg-white/[0.02] p-3 sm:min-h-[10rem] sm:rounded-[1.35rem] sm:p-4"
                        >
                          <div>
                            <p className="text-[0.7rem] font-extrabold uppercase tracking-[0.24em] text-[#67d0ca]">
                              A ajouter
                            </p>
                            <p className="mt-2 text-sm text-white/44">{label}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                      <a
                        href="#reservation"
                        onClick={() => setSelectedArtistId(artist.id)}
                        className="inline-flex min-h-11 items-center justify-center rounded-full bg-[linear-gradient(135deg,#1a5b53,#67d0ca)] px-5 text-sm font-bold text-[#071311] sm:min-h-12"
                      >
                        Reserver avec {artist.name}
                      </a>
                      <a
                        href={instaHref}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex min-h-11 items-center justify-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-5 text-sm font-semibold text-white/84 sm:min-h-12"
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
              </motion.div>
            </section>
          </div>
        ))}
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
            className="overflow-hidden rounded-[1.65rem] border border-white/8 bg-[linear-gradient(180deg,rgba(12,18,16,0.94),rgba(8,12,10,0.98))] p-4 sm:rounded-[2rem] sm:p-6 lg:p-8"
          >
            <div className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
              <div>
                <p className="text-[0.72rem] font-extrabold uppercase tracking-[0.32em] text-[#67d0ca]">
                  Reservation
                </p>
                <h2 className="mt-3 font-display text-[clamp(1.85rem,7vw,4.5rem)] font-semibold leading-[0.92] tracking-[-0.05em]">
                  Choisissez tatoueur, date, heure.
                </h2>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {artists.map((artist) => {
                    const active = selectedArtistId === artist.id;

                    return (
                      <button
                        key={artist.id}
                        type="button"
                        onClick={() => setSelectedArtistId(artist.id)}
                        className={`rounded-[1rem] border px-3 py-3.5 text-left transition sm:rounded-[1.2rem] sm:px-4 sm:py-4 ${
                          active
                            ? "border-[#67d0ca]/30 bg-[#67d0ca]/12 text-white"
                            : "border-white/10 bg-white/[0.03] text-white/74"
                        }`}
                      >
                        <p className="text-[0.68rem] font-extrabold uppercase tracking-[0.2em] text-[#67d0ca]">
                          Tatoueur
                        </p>
                        <p className="mt-2 text-sm font-semibold">{artist.name}</p>
                      </button>
                    );
                  })}
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
                        onClick={() => setCurrentMonth(month)}
                        className={`shrink-0 snap-start rounded-full border px-3 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.08em] transition sm:px-4 sm:text-sm ${
                          active
                            ? "border-[#67d0ca]/30 bg-[#67d0ca] text-[#071311]"
                            : "border-white/10 bg-white/[0.03] text-white/68"
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
                      className="text-center text-[0.56rem] uppercase tracking-[0.08em] text-white/42 sm:text-[0.72rem] sm:tracking-[0.16em]"
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
                            ? "border-[#67d0ca]/30 bg-[#67d0ca] text-[#071311]"
                            : disabled
                              ? "border-white/8 bg-white/[0.03] text-white/22"
                              : "border-white/10 bg-white/[0.03] text-white hover:border-[#67d0ca]/20"
                        }`}
                      >
                        <p className="font-display text-[0.92rem] font-semibold leading-none sm:text-[1.5rem]">
                          {cell.date.getDate()}
                        </p>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-5 rounded-[1.1rem] border border-white/10 bg-white/[0.03] p-3.5 sm:rounded-[1.25rem] sm:p-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-[0.72rem] uppercase tracking-[0.22em] text-[#67d0ca]">
                        {selectedDate
                          ? capitalize(dayFormatter.format(selectedDate))
                          : "Aucune date"}
                      </p>
                      <p className="mt-2 text-sm text-white/58">
                        {availableSlots.length
                          ? "Choisissez ensuite votre heure."
                          : "Aucun creneau disponible sur cette date."}
                      </p>
                    </div>
                    <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-white/62">
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
                              ? "border-[#67d0ca]/30 bg-[#67d0ca] text-[#071311]"
                              : "border-white/10 bg-white/[0.03] text-white/78"
                          }`}
                        >
                          {slot}
                        </button>
                      ))
                    ) : (
                      <div className="col-span-2 rounded-[1rem] border border-white/8 bg-white/[0.03] px-4 py-4 text-sm text-white/42 sm:col-span-3">
                        Aucun creneau sur ce jour.
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid gap-5">
                <article className="overflow-hidden rounded-[1.8rem] border border-white/10 bg-[rgba(10,10,10,0.8)]">
                  <div className="relative min-h-[13rem] sm:min-h-[16rem]">
                    <Image
                      src="/sites/demo999/map.png"
                      alt="Carte 999 Studio"
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 36vw"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(5,5,5,0.9))]" />
                    <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6">
                      <p className="text-[0.72rem] uppercase tracking-[0.22em] text-[#67d0ca]">
                        Localisation
                      </p>
                      <p className="mt-2 text-base font-semibold text-white">
                        Remire-Montjoly, Guyane francaise
                      </p>
                      <p className="mt-2 text-sm leading-6 text-white/68">
                        1er etage, batiment Machdeal Store
                        <br />
                        Residence Les Clos de Samana
                        <br />
                        1301 route de Remire, 97354
                      </p>
                    </div>
                  </div>
                </article>

                <article className="rounded-[1.5rem] border border-white/10 bg-[rgba(10,10,10,0.8)] p-4 sm:rounded-[1.8rem] sm:p-6">
                  <div className="rounded-[1.1rem] border border-white/10 bg-white/[0.03] p-4 sm:rounded-[1.25rem]">
                    <p className="text-[0.72rem] uppercase tracking-[0.22em] text-[#67d0ca]">
                      Recapitulatif
                    </p>
                    <div className="mt-4 grid gap-3 text-sm text-white/68">
                      <div className="flex items-start justify-between gap-4">
                        <span>Tatoueur</span>
                        <strong className="max-w-[13rem] text-right text-white">
                          {selectedArtist.name}
                        </strong>
                      </div>
                      <div className="flex items-start justify-between gap-4">
                        <span>Date</span>
                        <strong className="max-w-[13rem] text-right text-white">
                          {selectedDate
                            ? capitalize(dayFormatter.format(selectedDate))
                            : "Choisissez un jour"}
                        </strong>
                      </div>
                      <div className="flex items-start justify-between gap-4">
                        <span>Heure</span>
                        <strong className="text-white">
                          {selectedTime ?? "Choisissez une heure"}
                        </strong>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 rounded-[1.1rem] border border-white/10 bg-white/[0.03] p-4 sm:rounded-[1.25rem]">
                    <p className="text-[0.72rem] uppercase tracking-[0.22em] text-[#67d0ca]">
                      Contact
                    </p>
                    <p className="mt-3 text-sm leading-7 text-white/68">
                      {phoneDisplay}
                      <br />
                      Lundi au samedi, 09h00 - 21h00
                    </p>
                  </div>

                  <div className="mt-5 flex flex-col gap-3">
                    <a
                      href={phoneHref}
                      className="inline-flex min-h-11 items-center justify-center rounded-full bg-[linear-gradient(135deg,#1a5b53,#67d0ca)] px-6 text-sm font-bold text-[#071311] sm:min-h-12"
                    >
                      Reserver avec {selectedArtist.name}
                    </a>
                    <a
                      href={mapHref}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] px-6 text-sm font-semibold text-white/84 sm:min-h-12"
                    >
                      Ouvrir l'adresse
                    </a>
                    <a
                      href={instaHref}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex min-h-11 items-center justify-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-6 text-sm font-semibold text-white/84 sm:min-h-12"
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
            className="overflow-hidden rounded-[1.65rem] border border-white/8 bg-[linear-gradient(180deg,rgba(12,18,16,0.94),rgba(8,12,10,0.98))] p-4 sm:rounded-[2rem] sm:p-6 lg:p-8"
          >
            <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
              <div>
                <p className="text-[0.72rem] font-extrabold uppercase tracking-[0.32em] text-[#67d0ca]">
                  Avis
                </p>
                <h2 className="mt-3 font-display text-[clamp(1.85rem,7vw,4.5rem)] font-semibold leading-[0.92] tracking-[-0.05em]">
                  Les retours du studio.
                </h2>
              </div>

              <div className="grid gap-5">
                <article className="rounded-[1.45rem] border border-white/10 bg-[rgba(10,10,10,0.76)] p-4 sm:rounded-[1.8rem] sm:p-6">
                  <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                    <div className="min-w-0 flex-1">
                      <p className="text-base font-semibold text-white sm:text-lg">Resume des avis</p>
                      <p className="mt-2 text-sm text-white/42">Les avis ne sont pas verifies</p>

                      <div className="mt-5 grid gap-3">
                        {reviewBreakdown.map((row) => {
                          const width = `${(row.value / 7) * 100}%`;

                          return (
                            <div key={row.label} className="grid grid-cols-[18px_1fr] items-center gap-3">
                              <span className="text-sm font-semibold text-white/74">
                                {row.label}
                              </span>
                              <div className="h-2.5 overflow-hidden rounded-full bg-white/12">
                                <div
                                  className="h-full rounded-full bg-[#f6bf26]"
                                  style={{ width }}
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="flex min-w-[7rem] flex-row items-end justify-between gap-4 md:flex-col md:items-end">
                      <div className="text-[3.2rem] font-semibold leading-none tracking-[-0.06em] text-white/84 sm:text-[4rem]">
                        5,0
                      </div>
                      <div className="pb-2 text-right">
                        <p className="text-lg tracking-[0.18em] text-[#f6bf26]">★★★★★</p>
                        <p className="mt-1 text-sm text-white/52">7 avis</p>
                      </div>
                    </div>
                  </div>
                </article>

                <div className="grid gap-5 md:grid-cols-3">
                  {reviewItems.map((review) => (
                    <article
                      key={review.author}
                      className="rounded-[1.25rem] border border-white/10 bg-[rgba(10,10,10,0.76)] p-4 sm:rounded-[1.5rem] sm:p-5"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <p className="font-semibold text-white">{review.author}</p>
                        <p className="text-sm font-bold text-[#f6bf26]">{review.note}</p>
                      </div>
                      <p className="mt-2 text-sm tracking-[0.18em] text-[#f6bf26]">★★★★★</p>
                      <p className="mt-4 text-[0.9rem] leading-6 text-white/66 sm:text-[0.94rem] sm:leading-7">
                        {review.text}
                      </p>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        <footer className="mx-auto flex w-[min(1280px,calc(100vw-20px))] flex-col justify-between gap-3 px-0 pb-8 pt-4 text-[0.76rem] text-white/34 sm:w-[min(1280px,calc(100vw-32px))] sm:px-1 sm:text-[0.82rem] md:flex-row">
          <p>{site.path} - 999 Studio</p>
          <a href="#top" className="transition hover:text-white/72">
            Retour en haut
          </a>
        </footer>
      </main>
    </>
  );
}

function ArtistHeroCard({
  artist,
  align,
  compact = false,
}: {
  artist: Artist;
  align: "left" | "right";
  compact?: boolean;
}) {
  return (
    <motion.a
      href={`#${artist.id}`}
      whileHover={{ y: -10, scale: 1.02 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
      className={`group relative shrink-0 overflow-hidden rounded-[1.45rem] border border-white/10 bg-[linear-gradient(180deg,rgba(11,22,18,0.96),rgba(7,12,10,0.98))] p-3 sm:rounded-[1.8rem] sm:p-4 ${compact ? "min-h-[15rem] w-[78vw] snap-center sm:min-h-[19rem] sm:w-auto" : "min-h-[28rem]"}`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(98,213,205,0.08),transparent_28%)]" />
      <div
        className={`absolute inset-x-[12%] bottom-6 top-[36%] rounded-t-[2rem] bg-gradient-to-b ${artist.accent} opacity-0 blur-[80px] transition duration-300 group-hover:opacity-35`}
      />
      <motion.div
        animate={{ y: [0, -3, 0], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        className={`absolute top-3 z-[3] flex items-center gap-2 rounded-full border border-[#67d0ca]/24 bg-[rgba(7,20,18,0.88)] px-2.5 py-1.5 text-[0.55rem] font-extrabold uppercase tracking-[0.14em] text-[#67d0ca] shadow-[0_0_18px_rgba(103,208,202,0.12)] sm:top-4 sm:px-3 sm:py-2 sm:text-[0.62rem] sm:tracking-[0.18em] ${align === "right" ? "right-3 sm:right-4" : "left-3 sm:left-4"}`}
      >
        <span className="inline-flex h-2 w-2 rounded-full bg-[#67d0ca]" />
        Cliquer
      </motion.div>
      <div className={`relative flex h-full flex-col ${align === "right" ? "items-end text-right" : "items-start text-left"}`}>
        <div className={`relative w-full ${compact ? "min-h-[9.5rem] sm:min-h-[13rem]" : "min-h-[20rem]"}`}>
          <Image
            src={artist.image}
            alt={artist.name}
            fill
            className="object-contain object-bottom transition duration-300 group-hover:scale-[1.04]"
            sizes={compact ? "(max-width: 1024px) 50vw, 22vw" : "24vw"}
          />
        </div>
        <div className="mt-auto pt-3">
          <p className="text-[0.58rem] font-extrabold uppercase tracking-[0.24em] text-[#67d0ca] sm:text-[0.68rem] sm:tracking-[0.28em]">
            999 Studio
          </p>
          <p className="mt-2 text-[0.92rem] font-semibold tracking-[0.01em] text-white sm:text-[1.08rem]">
            {artist.name}
          </p>
        </div>
      </div>
    </motion.a>
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
