export const mainNavigation = [
  { href: "/", label: "Accueil" },
  { href: "/demo-site", label: "Site demo" },
  { href: "/devis", label: "Devis" },
  { href: "/contact", label: "Contact" },
  { href: "/admin", label: "Admin" },
] as const;

export const legalNavigation = [
  { href: "/mentions-legales", label: "Mentions legales" },
  { href: "/cgv", label: "Conditions generales de vente" },
  { href: "/qui-sommes-nous", label: "Qui sommes-nous" },
] as const;

export const offers = [
  {
    title: "Site web",
    tagline: "Confiance en ligne",
    summary: "Un front plus rapide, plus net et plus simple a maintenir.",
    image: "/pack/pclogofinal.png",
    alt: "Mockup site web Hproweb",
  },
  {
    title: "Carte de visite",
    tagline: "Premier contact",
    summary: "Le systeme visuel reste cohherent entre l'ecran et le terrain.",
    image: "/pack/cartevi.png",
    alt: "Carte de visite Hproweb",
  },
  {
    title: "Prospectus",
    tagline: "Presence locale",
    summary: "Les supports print restent dans la meme direction de marque.",
    image: "/pack/prospectus.png",
    alt: "Prospectus Hproweb",
  },
] as const;

export const migrationSteps = [
  {
    title: "Fond 3D retire",
    description:
      "Le canvas WebGL a ete retire du front principal. Le rendu reste plus leger, plus lisible et plus stable.",
  },
  {
    title: "Nouvelle base Next.js",
    description:
      "Le front principal tourne maintenant sur Next.js avec Tailwind CSS et Framer Motion dans une base separee et propre.",
  },
  {
    title: "Demos unifiees",
    description:
      "Les pages publiques, l'admin et toutes les demos passent maintenant par des routes Next, sans point d'entree HTML legacy.",
  },
] as const;

export const routeStatuses = [
  { title: "Accueil", status: "Pret", href: "/", detail: "Nouvelle direction visuelle et structure de base en place." },
  { title: "Contact", status: "Migre", href: "/contact", detail: "Formulaire branche sur l'API via le proxy Next." },
  { title: "Devis", status: "Migre", href: "/devis", detail: "Selection d'offre et envoi vers l'API conserves." },
  { title: "Admin", status: "Migre", href: "/admin", detail: "Connexion, gestion des users, sites et stats portes dans Next." },
  { title: "Demo", status: "Migre", href: "/demo-site", detail: "Portail, protections et sites clients servis par les routes Next unifiees." },
  { title: "Legal", status: "Migre", href: "/mentions-legales", detail: "Contenus editoriaux portes dans la nouvelle structure." },
] as const;

export const quoteOffers = [
  { id: "essentiel", label: "Essentiel" },
  { id: "pro", label: "Pro" },
  { id: "grand-format", label: "Grand format" },
] as const;

export type QuoteOfferId = (typeof quoteOffers)[number]["id"];

export type DemoSite = {
  id: string;
  name: string;
  path: string;
};

export type SiteAnalytics = {
  id: string;
  name: string;
  path: string;
  nonAdminClicks: number;
  lastClickAt: string | null;
};

export type SiteSettings = {
  demoSitesPublic: boolean;
};

export type UserRole = "admin" | "client";

export type AdminUser = {
  username: string;
  role: UserRole;
  active: boolean;
  siteId: string | null;
  siteName: string | null;
  sitePath: string | null;
  createdAt: string;
  updatedAt: string;
};
