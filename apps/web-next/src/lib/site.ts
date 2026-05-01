export const mainNavigation = [
  { href: "/", label: "Accueil" },
  { href: "/offres", label: "Nos offres" },
  { href: "/contact", label: "Contact" },
  { href: "/admin", label: "Admin" },
] as const;

export const legalNavigation = [
  { href: "/mentions-legales", label: "Mentions légales" },
  { href: "/cgv", label: "Conditions générales de vente" },
  { href: "/qui-sommes-nous", label: "Qui sommes-nous" },
] as const;

export const quoteOffers = [
  { id: "premium-base", label: "Offre premium - Option 1" },
  { id: "premium-admin", label: "Offre premium - Option 2" },
  {
    id: "premium-admin-clients",
    label: "Offre premium - Option 3",
  },
  { id: "premium-deluxe-base", label: "Offre premium deluxe - Option 1" },
  { id: "premium-deluxe-admin", label: "Offre premium deluxe - Option 2" },
  {
    id: "premium-deluxe-admin-clients",
    label: "Offre premium deluxe - Option 3",
  },
] as const;

export type QuoteOfferId = (typeof quoteOffers)[number]["id"];

export const offerFamilies = [
  {
    id: "premium",
    eyebrow: "Site internet",
    title: "Offre premium",
    price: "À partir de 300 EUR",
    summary:
      "3 options pour créer votre site avec le bon niveau de gestion selon votre besoin.",
    accentBackground: "linear-gradient(135deg, #0f172f 0%, #173763 48%, #234d84 100%)",
    highlights: [
      "Site sur-mesure",
      "Réservation ou contact",
      "Support inclus",
    ],
  },
  {
    id: "premium-deluxe",
    eyebrow: "Site + print",
    title: "Offre premium deluxe",
    price: "À partir de 450 EUR",
    summary:
      "Les mêmes 3 options que l'offre premium, avec en plus le site, la carte de visite et le prospectus.",
    accentBackground: "linear-gradient(135deg, #201914 0%, #6d4c27 46%, #c59548 100%)",
    highlights: [
      "Site sur-mesure",
      "Carte de visite",
      "Prospectus inclus",
    ],
  },
] as const;

export type OfferFamilyId = (typeof offerFamilies)[number]["id"];

export type OfferTierOption = {
  id: QuoteOfferId;
  title: string;
  price: string;
  summary: string;
  features: string[];
  ctaLabel: string;
};

export const offerTierOptions: Record<OfferFamilyId, readonly OfferTierOption[]> = {
  premium: [
    {
      id: "premium-base",
      title: "Option 1",
      price: "300 EUR",
      summary:
        "Site avec réservation possible, sans compte admin.",
      features: [
        "Site vitrine premium",
        "Réservation intégrée",
        "Sans compte admin",
        "Problèmes techniques pris en charge",
        "Modifications possibles selon la demande",
      ],
      ctaLabel: "Choisir l'option 1",
    },
    {
      id: "premium-admin",
      title: "Option 2",
      price: "500 EUR",
      summary:
        "Site avec réservation et compte admin pour gérer votre contenu.",
      features: [
        "Site premium complet",
        "Compte admin pour gérer votre contenu",
        "Réservation intégrée",
        "Problèmes techniques pris en charge",
        "Modifications possibles selon la demande",
      ],
      ctaLabel: "Choisir l'option 2",
    },
    {
      id: "premium-admin-clients",
      title: "Option 3",
      price: "900 EUR",
      summary:
        "Site avec compte admin et comptes clients illimités.",
      features: [
        "Compte admin complet",
        "Comptes clients illimités",
        "Réservation intégrée",
        "Problèmes techniques pris en charge",
        "Modifications possibles selon la demande",
      ],
      ctaLabel: "Choisir l'option 3",
    },
  ],
  "premium-deluxe": [
    {
      id: "premium-deluxe-base",
      title: "Option 1",
      price: "450 EUR",
      summary:
        "Option 1 premium avec le site, la carte de visite et le prospectus.",
      features: [
        "Site internet premium",
        "Réservation intégrée",
        "Carte de visite incluse",
        "Prospectus inclus",
        "Sans compte admin",
        "Problèmes techniques pris en charge",
        "Modifications possibles selon la demande",
      ],
      ctaLabel: "Choisir l'option 1",
    },
    {
      id: "premium-deluxe-admin",
      title: "Option 2",
      price: "650 EUR",
      summary:
        "Option 2 premium avec le site, la carte de visite et le prospectus.",
      features: [
        "Site internet premium",
        "Réservation intégrée",
        "Carte de visite et prospectus",
        "Compte admin inclus",
        "Problèmes techniques pris en charge",
        "Modifications possibles selon la demande",
      ],
      ctaLabel: "Choisir l'option 2",
    },
    {
      id: "premium-deluxe-admin-clients",
      title: "Option 3",
      price: "1 050 EUR",
      summary:
        "Option 3 premium avec le site, la carte de visite, le prospectus et les comptes clients illimités.",
      features: [
        "Site internet premium deluxe",
        "Compte admin complet",
        "Comptes clients illimités",
        "Réservation intégrée",
        "Carte de visite et prospectus",
        "Problèmes techniques pris en charge",
        "Modifications possibles selon la demande",
      ],
      ctaLabel: "Choisir l'option 3",
    },
  ],
};

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
