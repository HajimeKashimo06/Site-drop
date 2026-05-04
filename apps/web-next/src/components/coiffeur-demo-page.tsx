"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type DemoSiteRecord = {
  id: string;
  name: string;
  path: string;
};

type CoiffeurDemoPageProps = {
  site: DemoSiteRecord;
};

type PricingTier = {
  label: string;
  price: string;
  summary: string;
  features: readonly string[];
  featured?: boolean;
};

const navItems = [
  { href: "#concept", label: "Concept" },
  { href: "#prestations", label: "Prestations" },
  { href: "#ambiance", label: "Ambiance" },
  { href: "#tarifs", label: "Tarifs" },
  { href: "#contact", label: "Contact" },
] as const;

const services = [
  {
    id: "01",
    title: "Coupe precision",
    text: "Contours propres, volume maitrise et finition nette pour un rendu plus credible que standard.",
  },
  {
    id: "02",
    title: "Barbe structuree",
    text: "Travail des lignes, discipline du volume et silhouette plus forte sans alourdir la lecture.",
  },
  {
    id: "03",
    title: "Rituel complet",
    text: "Coupe, barbe et finition dans une logique d experience complete, plus premium.",
  },
] as const;

const pricing: readonly PricingTier[] = [
  {
    label: "Essentiel",
    price: "29 EUR",
    summary: "Coupe simple avec finition propre.",
    features: ["Consultation rapide", "Coupe complete", "Contours inclus"],
  },
  {
    label: "Signature",
    price: "45 EUR",
    summary: "Le bloc central a pousser dans la vente.",
    features: ["Coupe premium", "Barbe incluse", "Styling final"],
    featured: true,
  },
  {
    label: "Rituel",
    price: "62 EUR",
    summary: "Experience complete a forte valeur percue.",
    features: ["Coupe et barbe", "Serviette chaude", "Conseils et finition"],
  },
] as const;

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
};

export function CoiffeurDemoPage({ site }: CoiffeurDemoPageProps) {
  const [progress, setProgress] = useState(0);

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

  return (
    <main
      id="top"
      className="relative overflow-hidden bg-[#0d0b0a] text-[#f7efe4]"
    >
      <div className="fixed inset-x-0 top-0 z-[90] h-[2px] bg-white/6">
        <div
          className="h-full bg-[linear-gradient(90deg,#8b5e33,#d0a56c)] shadow-[0_0_24px_rgba(208,165,108,0.5)]"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top_left,rgba(208,165,108,0.12),transparent_30%),radial-gradient(circle_at_82%_14%,rgba(208,165,108,0.08),transparent_20%),linear-gradient(180deg,#0d0b0a_0%,#120f0d_42%,#17120f_100%)]" />
      <div className="pointer-events-none fixed left-[-8rem] top-[8%] h-[24rem] w-[24rem] rounded-full bg-[#a9793f]/10 blur-[90px]" />
      <div className="pointer-events-none fixed bottom-[8%] right-[-10rem] h-[28rem] w-[28rem] rounded-full bg-[#734a23]/16 blur-[110px]" />

      <div className="relative z-10">
        <header className="sticky top-3 z-40 mx-auto mt-3 flex w-[min(1180px,calc(100vw-24px))] flex-wrap items-center justify-between gap-4 rounded-[2rem] border border-[rgba(208,165,108,0.16)] bg-[rgba(16,13,11,0.78)] px-4 py-4 backdrop-blur-xl md:px-6">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[rgba(208,165,108,0.24)] bg-[linear-gradient(135deg,rgba(208,165,108,0.22),rgba(255,255,255,0.03))] font-display text-xl font-semibold tracking-[0.1em] text-[#f4d1a4]"
            >
              MS
            </Link>
            <div>
              <p className="text-[0.92rem] font-extrabold uppercase tracking-[0.14em] text-white/92">
                Maison Sculpte
              </p>
              <p className="text-[0.78rem] uppercase tracking-[0.16em] text-white/46">
                Barber studio
              </p>
            </div>
          </div>

          <nav className="hidden items-center gap-6 lg:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-[0.84rem] font-semibold uppercase tracking-[0.12em] text-white/70 transition hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <span className="hidden text-[0.76rem] font-semibold uppercase tracking-[0.16em] text-white/44 md:inline-flex">
              {site.id}
            </span>
            <a
              href="#contact"
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-[linear-gradient(135deg,#764a22,#d0a56c)] px-5 text-sm font-bold text-[#180f08] transition hover:-translate-y-0.5"
            >
              Reserver
            </a>
          </div>
        </header>

        <section className="mx-auto grid min-h-screen w-[min(1180px,calc(100vw-32px))] items-center gap-12 px-1 pb-16 pt-24 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="text-[0.78rem] font-extrabold uppercase tracking-[0.28em] text-[#d0a56c]"
            >
              Template coiffeur premium
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.14 }}
              className="mt-5 max-w-[9ch] font-display text-[clamp(4rem,9vw,7.4rem)] font-semibold leading-[0.9] tracking-[-0.05em]"
            >
              Lignes nettes,
              <span className="block text-[#efc389]">presence forte.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.22 }}
              className="mt-6 max-w-2xl text-[1rem] leading-8 text-white/70 md:text-[1.08rem]"
            >
              Une demo plein ecran, sobre et classe, pensee pour un barber shop
              ou un salon homme. Pas d images pour l instant, mais une vraie
              presence visuelle avec des volumes, de la matiere et des sections
              deja pretes a accueillir les futurs visuels.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.3 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <a
                href="#tarifs"
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-[linear-gradient(135deg,#764a22,#d0a56c)] px-6 text-sm font-bold text-[#180f08] transition hover:-translate-y-0.5"
              >
                Voir les formules
              </a>
              <a
                href="#concept"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-[rgba(208,165,108,0.24)] bg-white/[0.03] px-6 text-sm font-semibold text-white/86 transition hover:-translate-y-0.5"
              >
                Explorer le concept
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.18 }}
            className="relative min-h-[40rem]"
          >
            <div className="absolute inset-x-0 inset-y-0 rounded-[2rem] border border-[rgba(208,165,108,0.14)] bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01))] shadow-[0_40px_100px_rgba(0,0,0,0.42)]" />

            <div className="absolute left-0 top-0 h-[78%] w-[86%] rounded-[2rem] border border-[rgba(208,165,108,0.12)] bg-[linear-gradient(145deg,rgba(208,165,108,0.1),rgba(255,255,255,0.02))] p-7 shadow-[0_30px_80px_rgba(0,0,0,0.34)]">
              <p className="text-[0.78rem] font-bold uppercase tracking-[0.24em] text-[#efc389]">
                Signature
              </p>
              <h2 className="mt-5 max-w-[9ch] font-display text-[clamp(2.2rem,5vw,4rem)] font-semibold leading-[0.92]">
                Coupe, barbe, finition.
              </h2>
              <p className="mt-5 max-w-md text-[0.98rem] leading-7 text-white/68">
                Une entree forte sans image, avec assez de presence pour donner
                de la valeur au salon avant meme le premier rendez-vous.
              </p>
            </div>

            <div className="absolute right-0 top-12 w-[13rem] rounded-[1.6rem] border border-[rgba(208,165,108,0.16)] bg-[rgba(20,17,15,0.92)] p-5 shadow-[0_26px_70px_rgba(0,0,0,0.38)]">
              <p className="text-[0.76rem] font-semibold uppercase tracking-[0.18em] text-white/42">
                Visuels a venir
              </p>
              <p className="mt-3 font-display text-[1.55rem] font-semibold text-white">
                Galerie editoriale
              </p>
            </div>

            <div className="absolute bottom-0 left-8 w-[14rem] rounded-[1.6rem] border border-[rgba(208,165,108,0.16)] bg-[rgba(20,17,15,0.94)] p-5 shadow-[0_26px_70px_rgba(0,0,0,0.38)]">
              <p className="font-display text-[3.3rem] font-semibold leading-none text-[#efc389]">
                12
              </p>
              <p className="mt-2 text-sm leading-6 text-white/62">
                creneaux demo disponibles cette semaine
              </p>
            </div>
          </motion.div>
        </section>

        <section className="overflow-hidden border-y border-[rgba(208,165,108,0.12)] bg-white/[0.02]">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 24, ease: "linear", repeat: Infinity }}
            className="mx-auto flex w-max min-w-full gap-8 px-6 py-5 text-[0.8rem] font-extrabold uppercase tracking-[0.22em] text-white/42"
          >
            {[
              "Fade propre",
              "Contour net",
              "Barbe tracee",
              "Rituel serviette chaude",
              "Experience privee",
              "Style urbain",
              "Fade propre",
              "Contour net",
              "Barbe tracee",
              "Rituel serviette chaude",
              "Experience privee",
              "Style urbain",
            ].map((item, index) => (
              <span key={`${item}-${index}`} className="after:ml-8 after:text-[#d0a56c] after:content-['+']">
                {item}
              </span>
            ))}
          </motion.div>
        </section>

        <section
          id="concept"
          className="mx-auto grid w-[min(1180px,calc(100vw-32px))] gap-8 px-1 py-24 lg:grid-cols-[0.9fr_1.1fr]"
        >
          <motion.div {...reveal}>
            <p className="text-[0.78rem] font-extrabold uppercase tracking-[0.28em] text-[#d0a56c]">
              Direction artistique
            </p>
            <h2 className="mt-5 max-w-[12ch] font-display text-[clamp(2.8rem,5vw,4.6rem)] font-semibold leading-[0.94] tracking-[-0.04em]">
              Une ambiance plus cinema que catalogue.
            </h2>
            <p className="mt-6 max-w-xl text-[1rem] leading-8 text-white/68">
              Le site de reference pousse un univers barber tres marque. Ici,
              l idee est la meme, mais avec une base plus propre a reutiliser,
              plus souple pour la suite, et sans dependre d images des le
              premier jour.
            </p>
          </motion.div>

          <div className="grid gap-5 md:grid-cols-3">
            {[
              {
                id: "01",
                title: "Accueil fort",
                text: "Grande typo, CTA net et composition hero qui tient toute la hauteur.",
              },
              {
                id: "02",
                title: "Navigation fluide",
                text: "Header flottant, progression de scroll et reveal propres sur toute la page.",
              },
              {
                id: "03",
                title: "Conversion propre",
                text: "Tarifs, horaires et reservation mis au bon endroit, sans dilution visuelle.",
              },
            ].map((item, index) => (
              <motion.article
                key={item.id}
                {...reveal}
                transition={{
                  ...reveal.transition,
                  delay: index * 0.08,
                }}
                className="rounded-[1.8rem] border border-[rgba(208,165,108,0.12)] bg-[rgba(20,17,15,0.76)] p-6 shadow-[0_26px_70px_rgba(0,0,0,0.34)]"
              >
                <p className="text-[0.78rem] font-bold uppercase tracking-[0.22em] text-white/42">
                  {item.id}
                </p>
                <h3 className="mt-5 font-display text-[2rem] font-semibold leading-none">
                  {item.title}
                </h3>
                <p className="mt-4 text-[0.98rem] leading-7 text-white/64">
                  {item.text}
                </p>
              </motion.article>
            ))}
          </div>
        </section>

        <section
          id="prestations"
          className="mx-auto w-[min(1180px,calc(100vw-32px))] px-1 py-6"
        >
          <motion.div {...reveal}>
            <p className="text-[0.78rem] font-extrabold uppercase tracking-[0.28em] text-[#d0a56c]">
              Prestations signature
            </p>
            <h2 className="mt-5 max-w-[13ch] font-display text-[clamp(2.8rem,5vw,4.3rem)] font-semibold leading-[0.94] tracking-[-0.04em]">
              Des services presentes comme des pieces fortes.
            </h2>
          </motion.div>

          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {services.map((service, index) => (
              <motion.article
                key={service.id}
                {...reveal}
                transition={{
                  ...reveal.transition,
                  delay: index * 0.08,
                }}
                className="rounded-[1.8rem] border border-[rgba(208,165,108,0.12)] bg-[rgba(20,17,15,0.76)] p-7 shadow-[0_26px_70px_rgba(0,0,0,0.34)]"
              >
                <p className="text-[0.78rem] font-extrabold uppercase tracking-[0.24em] text-[#efc389]">
                  {service.id}
                </p>
                <h3 className="mt-5 font-display text-[2rem] font-semibold leading-none">
                  {service.title}
                </h3>
                <p className="mt-4 text-[1rem] leading-7 text-white/66">
                  {service.text}
                </p>
              </motion.article>
            ))}
          </div>
        </section>

        <section
          id="ambiance"
          className="mx-auto grid w-[min(1180px,calc(100vw-32px))] items-center gap-8 px-1 py-24 lg:grid-cols-[0.9fr_1.1fr]"
        >
          <motion.div {...reveal}>
            <p className="text-[0.78rem] font-extrabold uppercase tracking-[0.28em] text-[#d0a56c]">
              Ambiance
            </p>
            <h2 className="mt-5 max-w-[12ch] font-display text-[clamp(2.8rem,5vw,4.3rem)] font-semibold leading-[0.94] tracking-[-0.04em]">
              Sans image pour l instant, sans vide visuel.
            </h2>
            <p className="mt-6 max-w-xl text-[1rem] leading-8 text-white/68">
              Ces cadres sont la pour recevoir plus tard portraits, details de
              coupe, interieur du salon ou textures produit. En attendant, ils
              tiennent deja le rythme visuel du site.
            </p>
            <div className="mt-8 grid gap-3 text-[0.98rem] text-white/64">
              <p>Cadres editoriaux remplacables par vos futures photos</p>
              <p>Palette noire, ivoire fumee et bronze satine</p>
              <p>Animations discretes pour donner du relief sans lourdeur</p>
            </div>
          </motion.div>

          <motion.div
            {...reveal}
            className="relative min-h-[34rem]"
          >
            <div className="absolute left-0 top-0 h-[24rem] w-[min(100%,33rem)] rounded-[2rem] border border-[rgba(208,165,108,0.14)] bg-[linear-gradient(135deg,rgba(208,165,108,0.12),rgba(255,255,255,0.02))] p-7 shadow-[0_30px_80px_rgba(0,0,0,0.36)]">
              <p className="text-[0.76rem] font-semibold uppercase tracking-[0.18em] text-white/44">
                Portrait client
              </p>
              <p className="mt-3 font-display text-[2rem] font-semibold">
                Zone visuelle principale
              </p>
            </div>

            <div className="absolute right-2 top-16 h-[11rem] w-[15rem] rounded-[1.6rem] border border-[rgba(208,165,108,0.14)] bg-[rgba(22,18,16,0.9)] p-5 shadow-[0_24px_60px_rgba(0,0,0,0.3)]">
              <p className="text-[0.76rem] font-semibold uppercase tracking-[0.18em] text-white/44">
                Interieur salon
              </p>
              <p className="mt-3 font-display text-[1.5rem] font-semibold">
                Visuel secondaire
              </p>
            </div>

            <div className="absolute bottom-0 right-10 h-[12rem] w-[17rem] rounded-[1.6rem] border border-[rgba(208,165,108,0.14)] bg-[rgba(22,18,16,0.94)] p-5 shadow-[0_24px_60px_rgba(0,0,0,0.3)]">
              <p className="text-[0.76rem] font-semibold uppercase tracking-[0.18em] text-white/44">
                Detail barbe
              </p>
              <p className="mt-3 font-display text-[1.5rem] font-semibold">
                Visuel texture
              </p>
            </div>
          </motion.div>
        </section>

        <section
          id="tarifs"
          className="mx-auto w-[min(1180px,calc(100vw-32px))] px-1 py-6"
        >
          <motion.div {...reveal}>
            <p className="text-[0.78rem] font-extrabold uppercase tracking-[0.28em] text-[#d0a56c]">
              Tarifs demo
            </p>
            <h2 className="mt-5 max-w-[13ch] font-display text-[clamp(2.8rem,5vw,4.3rem)] font-semibold leading-[0.94] tracking-[-0.04em]">
              Une presentation lisible sans perdre le cote premium.
            </h2>
          </motion.div>

          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {pricing.map((item, index) => (
              <motion.article
                key={item.label}
                {...reveal}
                transition={{
                  ...reveal.transition,
                  delay: index * 0.08,
                }}
                className={`rounded-[1.8rem] border p-7 shadow-[0_26px_70px_rgba(0,0,0,0.34)] ${
                  item.featured
                    ? "border-[rgba(208,165,108,0.28)] bg-[linear-gradient(180deg,rgba(208,165,108,0.08),rgba(22,18,16,0.95))] lg:-mt-4"
                    : "border-[rgba(208,165,108,0.12)] bg-[rgba(20,17,15,0.76)]"
                }`}
              >
                <p className="text-[0.78rem] font-extrabold uppercase tracking-[0.24em] text-[#efc389]">
                  {item.label}
                </p>
                <h3 className="mt-4 font-display text-[3rem] font-semibold leading-none">
                  {item.price}
                </h3>
                <p className="mt-4 text-[1rem] leading-7 text-white/66">
                  {item.summary}
                </p>
                <div className="mt-6 grid gap-3">
                  {item.features.map((feature) => (
                    <p key={feature} className="pl-4 text-[0.98rem] text-white/62 before:ml-[-1rem] before:mr-3 before:text-[#d0a56c] before:content-['+']">
                      {feature}
                    </p>
                  ))}
                </div>
                <a
                  href="#contact"
                  className="mt-7 inline-flex text-sm font-bold text-[#efc389]"
                >
                  Choisir cette formule
                </a>
              </motion.article>
            ))}
          </div>
        </section>

        <section
          id="contact"
          className="mx-auto grid w-[min(1180px,calc(100vw-32px))] items-center gap-8 px-1 py-24 lg:grid-cols-[0.92fr_1.08fr]"
        >
          <motion.div {...reveal}>
            <p className="text-[0.78rem] font-extrabold uppercase tracking-[0.28em] text-[#d0a56c]">
              Reservation
            </p>
            <h2 className="mt-5 max-w-[12ch] font-display text-[clamp(2.8rem,5vw,4.3rem)] font-semibold leading-[0.94] tracking-[-0.04em]">
              Une fin de page qui pousse vraiment a l action.
            </h2>
            <p className="mt-6 max-w-xl text-[1rem] leading-8 text-white/68">
              Tu pourras brancher ici un module de reservation, WhatsApp,
              Instagram ou un formulaire. Pour la demo, on garde une structure
              simple et credible.
            </p>
          </motion.div>

          <motion.div
            {...reveal}
            className="rounded-[2rem] border border-[rgba(208,165,108,0.14)] bg-[radial-gradient(circle_at_top_right,rgba(208,165,108,0.12),transparent_30%),rgba(22,18,16,0.94)] p-7 shadow-[0_30px_80px_rgba(0,0,0,0.38)]"
          >
            {[
              ["Adresse", "12 rue du style, Nice"],
              ["Horaires", "Lun - Sam - 9h30 - 19h30"],
              ["Contact", "07 00 00 00 00"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="flex flex-col gap-2 border-b border-[rgba(208,165,108,0.1)] py-5 last:border-b-0 md:flex-row md:items-center md:justify-between"
              >
                <span className="text-sm uppercase tracking-[0.12em] text-white/42">
                  {label}
                </span>
                <strong className="text-base font-semibold text-white md:text-right">
                  {value}
                </strong>
              </div>
            ))}

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="tel:+33700000000"
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-[linear-gradient(135deg,#764a22,#d0a56c)] px-6 text-sm font-bold text-[#180f08] transition hover:-translate-y-0.5"
              >
                Appeler
              </a>
              <a
                href="mailto:contact@maisonsculpte.fr"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-[rgba(208,165,108,0.24)] bg-white/[0.03] px-6 text-sm font-semibold text-white/86 transition hover:-translate-y-0.5"
              >
                Envoyer un message
              </a>
            </div>
          </motion.div>
        </section>

        <footer className="mx-auto flex w-[min(1180px,calc(100vw-32px))] flex-col justify-between gap-3 px-1 pb-8 text-[0.82rem] text-white/40 md:flex-row">
          <p>{site.path} - template salon / barber sans images</p>
          <a href="#top" className="transition hover:text-white/72">
            Retour en haut
          </a>
        </footer>
      </div>
    </main>
  );
}
