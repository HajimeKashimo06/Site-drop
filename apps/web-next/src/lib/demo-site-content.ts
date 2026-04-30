export type DemoSiteCategory = "salon" | "law" | "tattoo" | "generic";

type DemoTheme = {
  pageBackground: string;
  heroBackground: string;
  panelBackground: string;
  panelBorder: string;
  ink: string;
  inkSoft: string;
  accent: string;
  accentStrong: string;
  accentContrast: string;
};

export type DemoSiteDefinition = {
  id: string;
  name: string;
  title: string;
  eyebrow: string;
  location: string;
  description: string;
  category: DemoSiteCategory;
  badges: string[];
  stats: Array<{
    value: string;
    label: string;
  }>;
  sections: Array<{
    title: string;
    items: string[];
  }>;
  process: Array<{
    title: string;
    text: string;
  }>;
  highlights: string[];
  contactCards: Array<{
    title: string;
    detail: string;
  }>;
  heroImage?: string;
  heroImageAlt?: string;
  secondaryImage?: string;
  secondaryImageAlt?: string;
  logoImage?: string;
  gallery: Array<{
    src: string;
    alt: string;
  }>;
  theme: DemoTheme;
};

const salonTheme: DemoTheme = {
  pageBackground:
    "radial-gradient(960px 460px at 0% 0%, rgba(211, 170, 117, 0.2), transparent 68%), linear-gradient(180deg, #fbf6f1 0%, #f1e4d7 100%)",
  heroBackground:
    "radial-gradient(circle at top right, rgba(224, 178, 112, 0.22), transparent 34%), linear-gradient(135deg, #fff7ef, #f2dfcb)",
  panelBackground: "rgba(255, 251, 247, 0.9)",
  panelBorder: "rgba(175, 141, 111, 0.22)",
  ink: "#2b1d16",
  inkSoft: "#735d4c",
  accent: "#8a552f",
  accentStrong: "#6f4324",
  accentContrast: "#fff7ef",
};

const lawTheme: DemoTheme = {
  pageBackground:
    "radial-gradient(920px 420px at 6% 0%, rgba(60, 125, 154, 0.18), transparent 64%), linear-gradient(180deg, #eef5f7 0%, #f8fcfd 100%)",
  heroBackground:
    "radial-gradient(circle at top right, rgba(76, 137, 165, 0.2), transparent 35%), linear-gradient(140deg, #ffffff, #edf6fa)",
  panelBackground: "rgba(255, 255, 255, 0.88)",
  panelBorder: "rgba(117, 157, 177, 0.24)",
  ink: "#1f3140",
  inkSoft: "#5d7285",
  accent: "#2f6f8f",
  accentStrong: "#22546d",
  accentContrast: "#edf7fb",
};

const tattooTheme: DemoTheme = {
  pageBackground:
    "radial-gradient(760px 360px at 16% 0%, rgba(255, 255, 255, 0.1), transparent 44%), linear-gradient(180deg, #0b0b10 0%, #060609 100%)",
  heroBackground:
    "radial-gradient(circle at top right, rgba(255, 255, 255, 0.08), transparent 30%), linear-gradient(145deg, #13131a, #0d0d12)",
  panelBackground: "rgba(20, 20, 27, 0.86)",
  panelBorder: "rgba(255, 255, 255, 0.12)",
  ink: "#f5f6f8",
  inkSoft: "#abb0ba",
  accent: "#ffffff",
  accentStrong: "#d7dbe2",
  accentContrast: "#121318",
};

const genericTheme: DemoTheme = {
  pageBackground:
    "radial-gradient(860px 360px at 0% 0%, rgba(69, 130, 199, 0.16), transparent 65%), linear-gradient(180deg, #f2f7fc 0%, #e6eef8 100%)",
  heroBackground:
    "radial-gradient(circle at top right, rgba(106, 176, 255, 0.18), transparent 30%), linear-gradient(145deg, #ffffff, #eef4fb)",
  panelBackground: "rgba(255, 255, 255, 0.86)",
  panelBorder: "rgba(84, 120, 158, 0.2)",
  ink: "#16304d",
  inkSoft: "#61748a",
  accent: "#224f80",
  accentStrong: "#173a62",
  accentContrast: "#eff6ff",
};

type SiteInput = {
  id: string;
  name: string;
  title: string;
  eyebrow: string;
  location: string;
  description: string;
  badges: string[];
  stats: Array<{ value: string; label: string }>;
  sections: Array<{ title: string; items: string[] }>;
  process: Array<{ title: string; text: string }>;
  highlights: string[];
  contactCards: Array<{ title: string; detail: string }>;
  heroImage?: string;
  heroImageAlt?: string;
  secondaryImage?: string;
  secondaryImageAlt?: string;
  logoImage?: string;
  gallery?: Array<{ src: string; alt: string }>;
};

function createSalonSite(input: SiteInput): DemoSiteDefinition {
  return {
    ...input,
    category: "salon",
    gallery: input.gallery ?? [],
    theme: salonTheme,
  };
}

function createLawSite(input: SiteInput): DemoSiteDefinition {
  return {
    ...input,
    category: "law",
    gallery: input.gallery ?? [],
    theme: lawTheme,
  };
}

function createTattooSite(input: SiteInput): DemoSiteDefinition {
  return {
    ...input,
    category: "tattoo",
    gallery: input.gallery ?? [],
    theme: tattooTheme,
  };
}

function createGenericSite(input: SiteInput): DemoSiteDefinition {
  return {
    ...input,
    category: "generic",
    gallery: input.gallery ?? [],
    theme: genericTheme,
  };
}

const salonProcess = [
  {
    title: "Prise de brief",
    text: "Le visiteur comprend vite le positionnement, les services proposes et le ton du salon.",
  },
  {
    title: "Navigation fluide",
    text: "Les sections importantes restent visibles sans surcharge visuelle ni scripts fragiles.",
  },
  {
    title: "Conversion claire",
    text: "Les appels a l'action renvoient vers un contact ou une prise de rendez-vous simple.",
  },
] as const;

const lawProcess = [
  {
    title: "Positionnement net",
    text: "Le cabinet met en avant sa specialite, sa ville et le niveau d'accompagnement des les premieres secondes.",
  },
  {
    title: "Reassurance",
    text: "La page articule l'expertise, le cadre d'intervention et la methode de travail dans une forme lisible.",
  },
  {
    title: "Prise de contact",
    text: "Le visiteur est redirige vers une demande de rappel ou une prise de rendez-vous sans friction.",
  },
] as const;

const tattooProcess = [
  {
    title: "Impact visuel",
    text: "Le hero pose une identite plus marquee, avec une ambiance sombre et un rythme plus editorial.",
  },
  {
    title: "Portfolio",
    text: "Les pieces et styles passent avant le blabla pour garder la page concentree sur le travail produit.",
  },
  {
    title: "Brief client",
    text: "La maquette guide ensuite vers une prise de contact simple pour qualifier le projet.",
  },
] as const;

const demoSitesById: Record<string, DemoSiteDefinition> = {
  "page-test": createSalonSite({
    id: "page-test",
    name: "Best Hair",
    title: "Best Hair",
    eyebrow: "Coiffeur - barbier",
    location: "Nantes",
    description:
      "Maquette salon premium, orientee reservation et lisibilite mobile, migree proprement dans Next.js.",
    badges: ["Coiffeur barbier", "Reservation rapide", "Version Next.js"],
    stats: [
      { value: "4.9/5", label: "Avis clients" },
      { value: "30 min", label: "Creneau type" },
      { value: "7/7 sections", label: "Parcours clarifie" },
    ],
    sections: [
      {
        title: "Prestations signatures",
        items: [
          "Coupe homme, barbe et entretien premium.",
          "Presentation rapide des prix pour eviter le flou avant appel.",
          "CTA direct vers la prise de rendez-vous ou le rappel.",
        ],
      },
      {
        title: "Experience visiteur",
        items: [
          "Hero simple et fort, sans decor 3D ni distractions inutiles.",
          "Galerie visuelle optimisee avec assets servis par Next.",
          "Parcours mobile plus propre pour convertir plus vite.",
        ],
      },
    ],
    process: [...salonProcess],
    highlights: [
      "Design chaud et rassurant.",
      "Lecture immediate des services.",
      "Section contact/reprise de rendez-vous claire.",
    ],
    contactCards: [
      { title: "Usage ideal", detail: "Demo salon orientee reservation et vitrine locale." },
      { title: "Migration", detail: "Ancienne page client remplacee par une vraie route Next." },
    ],
    heroImage: "/coiffure1/photo1.png",
    heroImageAlt: "Coupe en cours dans le salon Best Hair",
    secondaryImage: "/coiffure1/logo.png",
    secondaryImageAlt: "Logo Best Hair",
    logoImage: "/coiffure1/logo.png",
    gallery: [
      { src: "/coiffure1/photo4.png", alt: "Devanture du salon" },
      { src: "/coiffure1/photo3.png", alt: "Poste de coupe interieur" },
      { src: "/coiffure1/photo2.png", alt: "Selection de produits capillaires" },
      { src: "/coiffure1/photo1.png", alt: "Client et barbier" },
    ],
  }),
  testcoiffure1: createSalonSite({
    id: "testcoiffure1",
    name: "M lady coiff",
    title: "M lady coiff",
    eyebrow: "Studio couleur femme",
    location: "Demo coiffure",
    description:
      "Version salon plus feminine, centree sur la couleur, la matiere et un rendu editorial propre.",
    badges: ["Couleur femme", "Galerie riche", "Version Next.js"],
    stats: [
      { value: "11", label: "Visuels servis proprement" },
      { value: "Mobile", label: "Navigation soignee" },
      { value: "0 HTML legacy", label: "Affichage migre" },
    ],
    sections: [
      {
        title: "Direction artistique",
        items: [
          "Palette plus douce, composition plus editorialise.",
          "Sections pensees pour mettre en avant les photos et le style du salon.",
          "Narration plus nette entre expertise, ambiance et conversion.",
        ],
      },
      {
        title: "Parcours client",
        items: [
          "Mise en avant de l'univers du salon avant la prise de contact.",
          "Cards plus stables et plus faciles a maintenir dans le temps.",
          "Rendu plus fluide sans dependance a une page HTML autonome.",
        ],
      },
    ],
    process: [...salonProcess],
    highlights: [
      "Photos hero et galerie reutilisees depuis les assets existants.",
      "Look plus propre pour une demo client.",
      "Base compatible avec une suite de personnalisation.",
    ],
    contactCards: [
      { title: "Base de travail", detail: "Template salon premium adaptee au site testcoiffure1." },
      { title: "Prochaine etape", detail: "Briefer les tarifs et les horaires definitifs du client." },
    ],
    heroImage: "/sites/testcoiffure1/images/p1.jpeg",
    heroImageAlt: "Photo principale du salon M lady coiff",
    secondaryImage: "/sites/testcoiffure1/images/p10.jpg",
    secondaryImageAlt: "Ambiance interieure du salon",
    gallery: [
      { src: "/sites/testcoiffure1/images/p2.jpg", alt: "Vue detaillee du salon" },
      { src: "/sites/testcoiffure1/images/p4.jpg", alt: "Mise en scene coiffure" },
      { src: "/sites/testcoiffure1/images/p8.jpg", alt: "Espace de travail du salon" },
      { src: "/sites/testcoiffure1/images/p11.jpg", alt: "Ambiance premium" },
    ],
  }),
  betacoiffure2: createSalonSite({
    id: "betacoiffure2",
    name: "Nabil Coiffure",
    title: "Nabil Coiffure",
    eyebrow: "Page test client",
    location: "Demo coiffure",
    description:
      "Demo salon sobre et directe, reconstruite dans la stack Next/Tailwind avec un rendu plus fiable.",
    badges: ["Demo client", "Visuel simple", "Migration complete"],
    stats: [
      { value: "4", label: "Visuels disponibles" },
      { value: "Rapide", label: "Chargement plus propre" },
      { value: "Maintenable", label: "Structure unifiee" },
    ],
    sections: [
      {
        title: "Structure",
        items: [
          "Template plus epure pour presenter le salon rapidement.",
          "Sections courtes et faciles a enrichir ensuite.",
          "Compatibilite propre avec l'acces prive et l'admin.",
        ],
      },
      {
        title: "Objectif",
        items: [
          "Donner au client une maquette exploitable sans dette front legacy.",
          "Eviter les pages isolees difficiles a maintenir.",
          "Centraliser la logique d'acces et d'affichage.",
        ],
      },
    ],
    process: [...salonProcess],
    highlights: [
      "Assets existants recuperes depuis le dossier public.",
      "Meme socle technique que le reste du front.",
      "Pret pour ajout de tarifs ou horaires.",
    ],
    contactCards: [
      { title: "Usage ideal", detail: "Demo de base pour salon local." },
      { title: "Prochaine etape", detail: "Ajouter contenu final et CTA de reservation reel." },
    ],
    heroImage: "/sites/betacoiffure2/images/p2.png",
    heroImageAlt: "Photo principale Nabil Coiffure",
    secondaryImage: "/sites/betacoiffure2/images/p4.png",
    secondaryImageAlt: "Visuel secondaire du salon",
    gallery: [
      { src: "/sites/betacoiffure2/images/p1.png", alt: "Photo 1 du salon" },
      { src: "/sites/betacoiffure2/images/p2.png", alt: "Photo 2 du salon" },
      { src: "/sites/betacoiffure2/images/p3.png", alt: "Photo 3 du salon" },
      { src: "/sites/betacoiffure2/images/p4.png", alt: "Photo 4 du salon" },
    ],
  }),
  betaimagi: createSalonSite({
    id: "betaimagi",
    name: "Imaginatif's",
    title: "Imaginatif's",
    eyebrow: "Salon de coiffure",
    location: "Demo coiffure",
    description:
      "Salon oriente image de marque, avec logo, galerie et presentation plus premium dans un cadre Next moderne.",
    badges: ["Identite marquee", "Logo present", "Version propre"],
    stats: [
      { value: "4", label: "Images hero / galerie" },
      { value: "Branding", label: "Direction plus premium" },
      { value: "1 route", label: "Architecture unifiee" },
    ],
    sections: [
      {
        title: "Branding",
        items: [
          "Logo et galerie mis en avant des le hero.",
          "Typographie et structure plus premium pour la presentation.",
          "Visuels reutilises sans garder une page HTML legacy a part.",
        ],
      },
      {
        title: "Presentation",
        items: [
          "Sections concises pour les prestations, l'ambiance et la prise de contact.",
          "Composants Tailwind reutilisables au lieu d'un code inline fragile.",
          "Base plus propre pour enrichissement futur.",
        ],
      },
    ],
    process: [...salonProcess],
    highlights: [
      "Logo SVG conserve.",
      "Direction creme, or et charbon reprise dans le nouveau front.",
      "Demo beaucoup plus simple a maintenir.",
    ],
    contactCards: [
      { title: "Point fort", detail: "Bonne base pour une vitrine salon plus haut de gamme." },
      { title: "Suite logique", detail: "Ajouter tarifs, equipe et formulaire reel si besoin." },
    ],
    heroImage: "/sites/betaimagi/images/p1.png",
    heroImageAlt: "Visuel principal Imaginatif's",
    secondaryImage: "/sites/betaimagi/images/logo-imaginatifs.svg",
    secondaryImageAlt: "Logo Imaginatif's",
    logoImage: "/sites/betaimagi/images/logo-imaginatifs.svg",
    gallery: [
      { src: "/sites/betaimagi/images/p1.png", alt: "Photo 1 du salon" },
      { src: "/sites/betaimagi/images/p2.png", alt: "Photo 2 du salon" },
      { src: "/sites/betaimagi/images/p3.png", alt: "Photo 3 du salon" },
      { src: "/sites/betaimagi/images/p4.png", alt: "Photo 4 du salon" },
    ],
  }),
  modernef: createSalonSite({
    id: "modernef",
    name: "Moderne F",
    title: "Moderne F",
    eyebrow: "Salon feminin",
    location: "Demo coiffure",
    description:
      "Version salon feminin migree sur le nouveau socle, prete a recevoir ses contenus definitifs sans code legacy.",
    badges: ["Salon feminin", "Base propre", "Personnalisation ouverte"],
    stats: [
      { value: "100%", label: "Route Next" },
      { value: "0", label: "Dependance HTML" },
      { value: "Ready", label: "Pour iteration client" },
    ],
    sections: [
      {
        title: "Base de maquette",
        items: [
          "Socle propre pour integrer photos, tarifs et univers feminin ensuite.",
          "Aucune page statique externe necessaire pour l'affichage.",
          "Protection demo et navigation gerees dans la meme app.",
        ],
      },
      {
        title: "Direction",
        items: [
          "Interface douce et legere, pensee pour un salon plus feminin.",
          "Sections prêtes pour offres, forfaits et contact.",
          "Comportement uniforme avec le reste des demos.",
        ],
      },
    ],
    process: [...salonProcess],
    highlights: [
      "Bonne base de refonte sans legacy.",
      "Peut recevoir des assets plus tard sans changer la structure.",
      "Parcours demo standardise.",
    ],
    contactCards: [
      { title: "Etat actuel", detail: "Maquette propre sans assets dedies dans le dossier public." },
      { title: "Prochaine etape", detail: "Injecter visuels et contenu client final si necessaire." },
    ],
    gallery: [],
  }),
  modernemix: createSalonSite({
    id: "modernemix",
    name: "Moderne Mix",
    title: "Moderne Mix",
    eyebrow: "Salon chic bois clair",
    location: "Demo coiffure",
    description:
      "Template salon mixte plus sobre, standardise dans Next pour servir de base propre a un futur contenu client.",
    badges: ["Salon mixte", "Look chic", "Stack unifiee"],
    stats: [
      { value: "Stable", label: "Structure" },
      { value: "Clair", label: "Parcours" },
      { value: "Reactif", label: "Evolution future" },
    ],
    sections: [
      {
        title: "Positionnement",
        items: [
          "Demo orientee salon mixte, ambiance claire et rassurante.",
          "Hero et cartes plus lisibles que dans la version HTML autonome.",
          "Compatible avec l'acces prive et l'analytics existant.",
        ],
      },
      {
        title: "Modularite",
        items: [
          "Peut accueillir tarifs, equipe, horaires ou galerie sans refondre la base.",
          "Sections factorisees pour rester maintenables.",
          "Meme socle que le reste des demos clients.",
        ],
      },
    ],
    process: [...salonProcess],
    highlights: [
      "Migration complete de la page d'entree.",
      "Plus de dependance a un fichier HTML public.",
      "Pret pour enrichissement contenu.",
    ],
    contactCards: [
      { title: "Etat actuel", detail: "Demo chic et minimale, sans assets dedies a conserver." },
      { title: "Prochaine etape", detail: "Ajouter galerie et details si le client valide cette direction." },
    ],
    gallery: [],
  }),
  avocattest: createLawSite({
    id: "avocattest",
    name: "Caroline RODRIGUEZ",
    title: "Caroline RODRIGUEZ",
    eyebrow: "Droit immobilier",
    location: "Nice",
    description:
      "Presentation cabinet orientee droit immobilier, avec un rendu plus propre, plus stable et plus simple a maintenir.",
    badges: ["Cabinet d'avocat", "Droit immobilier", "Nice"],
    stats: [
      { value: "Conseil", label: "Approche metier" },
      { value: "Prive", label: "Acces demo gere" },
      { value: "Next.js", label: "Migration complete" },
    ],
    sections: [
      {
        title: "Domaines d'intervention",
        items: [
          "Baux, copropriete, ventes et contentieux lies a l'immobilier.",
          "Structure plus claire pour faire comprendre le positionnement du cabinet.",
          "Contenu plus lisible sur mobile et sur ecrans larges.",
        ],
      },
      {
        title: "Reassurance",
        items: [
          "Univers plus institutionnel sans tomber dans le template froid.",
          "Mise en avant de l'expertise et du rendez-vous des le hero.",
          "Suppression de la dette front legacy autour de cette demo.",
        ],
      },
    ],
    process: [...lawProcess],
    highlights: [
      "Visuels de cabinet et portrait conserves.",
      "Direction bleu acier plus propre.",
      "Page centralisee dans la nouvelle app.",
    ],
    contactCards: [
      { title: "Format", detail: "Vitrine cabinet avec prise de contact rapide." },
      { title: "Prochaine etape", detail: "Ajuster specialites, bio et infos legales finales." },
    ],
    heroImage: "/sites/avocattest/cabinet.png",
    heroImageAlt: "Cabinet d'avocat a Nice",
    secondaryImage: "/sites/avocattest/avocate.png",
    secondaryImageAlt: "Portrait de Caroline Rodriguez",
    gallery: [
      { src: "/sites/avocattest/cabinet.png", alt: "Cabinet d'avocat" },
      { src: "/sites/avocattest/p2.png", alt: "Visuel secondaire du cabinet" },
      { src: "/sites/avocattest/avocate.png", alt: "Portrait professionnel" },
    ],
  }),
  avocattest2: createLawSite({
    id: "avocattest2",
    name: "Julie ROVERE-TABONE",
    title: "Julie ROVERE-TABONE",
    eyebrow: "Avocat",
    location: "Nice",
    description:
      "Page cabinet sobre et rassurante, migree dans Next avec un parcours de consultation plus clair.",
    badges: ["Cabinet d'avocat", "Nice", "Parcours clarifie"],
    stats: [
      { value: "Rassurant", label: "Positionnement" },
      { value: "Lisible", label: "Sur mobile" },
      { value: "Sans legacy", label: "Front migre" },
    ],
    sections: [
      {
        title: "Presentation du cabinet",
        items: [
          "Structure plus nette entre expertise, presentation et prise de contact.",
          "Portrait et visuels cabinets reutilises sans page HTML dediee.",
          "Navigation simplifiee pour gagner en lisibilite.",
        ],
      },
      {
        title: "Usage client",
        items: [
          "Bonne base de demo pour un cabinet a Nice.",
          "Adaptable a des specialites civiles, immobilieres ou familiales.",
          "Pile front standardisee avec le reste du projet.",
        ],
      },
    ],
    process: [...lawProcess],
    highlights: [
      "Portrait et visuels existants conserves.",
      "Hero plus propre et plus editorial.",
      "Entree demo centralisee dans Next.",
    ],
    contactCards: [
      { title: "Format", detail: "Cabinet vitrine avec mise en avant de la specialite." },
      { title: "Prochaine etape", detail: "Renseigner les vraies expertises et coordonnees client." },
    ],
    heroImage: "/sites/avocattest2/cabinet.png",
    heroImageAlt: "Vue du cabinet a Nice",
    secondaryImage: "/sites/avocattest2/julie.png",
    secondaryImageAlt: "Portrait de Julie ROVERE-TABONE",
    gallery: [
      { src: "/sites/avocattest2/cabinet.png", alt: "Cabinet d'avocat" },
      { src: "/sites/avocattest2/julie.png", alt: "Portrait professionnel" },
    ],
  }),
  avocattest3: createLawSite({
    id: "avocattest3",
    name: "Michele Esposito",
    title: "Michele Esposito",
    eyebrow: "Cabinet d'avocat",
    location: "Nice",
    description:
      "Maquette cabinet axee sur la confiance et la clarte, basculee proprement sur le nouveau front.",
    badges: ["Cabinet", "Nice", "Migration Next"],
    stats: [
      { value: "Expertise", label: "Mise en avant" },
      { value: "Fluide", label: "Navigation" },
      { value: "Responsive", label: "Base moderne" },
    ],
    sections: [
      {
        title: "Cadre d'intervention",
        items: [
          "Structure propre pour exposer les domaines d'intervention du cabinet.",
          "Ambiance plus institutionnelle et plus lisible.",
          "Entree unique dans l'application Next pour toutes les demos.",
        ],
      },
      {
        title: "Base client",
        items: [
          "Visuel de fond conserve comme point d'appui de la maquette.",
          "Peut accueillir un portrait et du contenu metier supplementaire.",
          "Suppression du point d'entree HTML legacy.",
        ],
      },
    ],
    process: [...lawProcess],
    highlights: [
      "Fond Cote d'Azur reutilise.",
      "Socle legal standardise.",
      "Pret pour contenu plus complet.",
    ],
    contactCards: [
      { title: "Etat actuel", detail: "Maquette demo sobre, sans portrait dedie a afficher." },
      { title: "Prochaine etape", detail: "Ajouter bio et specialites finales du cabinet." },
    ],
    heroImage: "/sites/avocattest3/fond-cotedazur.png",
    heroImageAlt: "Vue de la Cote d'Azur",
    gallery: [{ src: "/sites/avocattest3/fond-cotedazur.png", alt: "Fond visuel du cabinet" }],
  }),
  avocattest4: createLawSite({
    id: "avocattest4",
    name: "Myriam ABDALLAOUI",
    title: "Myriam ABDALLAOUI",
    eyebrow: "Avocat",
    location: "Nice",
    description:
      "Version cabinet basee sur une presence plus personnelle, avec portrait et positionnement net.",
    badges: ["Avocat", "Nice", "Portrait visible"],
    stats: [
      { value: "Humain", label: "Positionnement" },
      { value: "Propre", label: "Front migre" },
      { value: "Stable", label: "Maintenance" },
    ],
    sections: [
      {
        title: "Positionnement",
        items: [
          "La page met en avant la personne et la relation de confiance.",
          "Le parcours reste court, lisible et oriente prise de rendez-vous.",
          "Le rendu visuel est desormais gere par les composants Next.",
        ],
      },
      {
        title: "Contenu",
        items: [
          "Fond de contexte et portrait existants remis dans une structure plus propre.",
          "Sections modulables pour specialites, methode et contact.",
          "Plus de logique inline ou de page HTML autonome a maintenir.",
        ],
      },
    ],
    process: [...lawProcess],
    highlights: [
      "Portrait client reutilise.",
      "Fond Nice conserve.",
      "Nouveau socle technique uniforme.",
    ],
    contactCards: [
      { title: "Format", detail: "Cabinet vitrine a tonalite plus humaine." },
      { title: "Prochaine etape", detail: "Renseigner bio et lignes de pratique finales." },
    ],
    heroImage: "/sites/avocattest4/fond-cotedazur.png",
    heroImageAlt: "Fond du cabinet a Nice",
    secondaryImage: "/sites/avocattest4/myriam.png",
    secondaryImageAlt: "Portrait de Myriam ABDALLAOUI",
    gallery: [
      { src: "/sites/avocattest4/fond-cotedazur.png", alt: "Fond visuel du cabinet" },
      { src: "/sites/avocattest4/myriam.png", alt: "Portrait professionnel" },
    ],
  }),
  avocattest5: createLawSite({
    id: "avocattest5",
    name: "Florian ABASSIT",
    title: "Florian ABASSIT",
    eyebrow: "Avocat",
    location: "Nice",
    description:
      "Maquette cabinet basculee proprement dans Next, avec un rendu plus simple a faire evoluer.",
    badges: ["Cabinet", "Nice", "Version migree"],
    stats: [
      { value: "Simple", label: "Parcours" },
      { value: "Clair", label: "Specialite" },
      { value: "Pro", label: "Presentation" },
    ],
    sections: [
      {
        title: "Experience",
        items: [
          "Le visiteur identifie vite le cabinet, la ville et le ton du site.",
          "Le socle technique est desormais partage avec toutes les autres demos.",
          "Le contenu peut etre enrichi sans refaire la structure.",
        ],
      },
      {
        title: "Evolution",
        items: [
          "Portrait et fond existants sont conserves.",
          "La page peut accueillir expertises, FAQ et contact plus detailles.",
          "Suppression du legacy HTML comme point d'entree principal.",
        ],
      },
    ],
    process: [...lawProcess],
    highlights: [
      "Portrait Florian conserve.",
      "Fond Nice conserve.",
      "Version Next plus nette.",
    ],
    contactCards: [
      { title: "Etat actuel", detail: "Vitrine cabinet propre et maintenable." },
      { title: "Prochaine etape", detail: "Injecter les contenus definitifs du cabinet si valides." },
    ],
    heroImage: "/sites/avocattest5/fond-cotedazur.png",
    heroImageAlt: "Fond de presentation a Nice",
    secondaryImage: "/sites/avocattest5/florian.png",
    secondaryImageAlt: "Portrait de Florian ABASSIT",
    gallery: [
      { src: "/sites/avocattest5/fond-cotedazur.png", alt: "Fond du cabinet" },
      { src: "/sites/avocattest5/florian.png", alt: "Portrait professionnel" },
    ],
  }),
  avocattest6: createLawSite({
    id: "avocattest6",
    name: "Stephanie ABIER-ROUGERON",
    title: "Stephanie ABIER-ROUGERON",
    eyebrow: "Avocat",
    location: "Nice",
    description:
      "Version cabinet plus claire et plus maintainable, sans dependance au HTML public ancien.",
    badges: ["Cabinet", "Nice", "Route Next"],
    stats: [
      { value: "Clean", label: "Migration" },
      { value: "Bleu clair", label: "Direction visuelle" },
      { value: "Stable", label: "Base technique" },
    ],
    sections: [
      {
        title: "Direction visuelle",
        items: [
          "Le rendu garde la tonalite institutionnelle et legere du cabinet.",
          "Les visuels existants sont reutilises dans une page React unique.",
          "Les composants restent simples a faire evoluer ensuite.",
        ],
      },
      {
        title: "Usage",
        items: [
          "Bonne base pour une demo cabinet orientee confiance.",
          "La page peut recevoir facilement pratique, bio et procedure de contact.",
          "Le controle d'acces reste gere par l'API existante.",
        ],
      },
    ],
    process: [...lawProcess],
    highlights: [
      "Portrait Stephanie conserve.",
      "Fond Nice conserve.",
      "HTML legacy retire de l'affichage.",
    ],
    contactCards: [
      { title: "Format", detail: "Cabinet vitrine avec narration courte et propre." },
      { title: "Prochaine etape", detail: "Completer expertises et mentions client finales." },
    ],
    heroImage: "/sites/avocattest6/fond-cotedazur.png",
    heroImageAlt: "Fond visuel du cabinet",
    secondaryImage: "/sites/avocattest6/stephanie.png",
    secondaryImageAlt: "Portrait de Stephanie ABIER-ROUGERON",
    gallery: [
      { src: "/sites/avocattest6/fond-cotedazur.png", alt: "Fond de cabinet" },
      { src: "/sites/avocattest6/stephanie.png", alt: "Portrait professionnel" },
    ],
  }),
  avocattest7: createLawSite({
    id: "avocattest7",
    name: "Julien MARLINGE",
    title: "Julien MARLINGE",
    eyebrow: "Avocat",
    location: "Toulon",
    description:
      "Version Toulon migree sur le meme socle Next, avec une presentation cabinet plus sobre et homogone.",
    badges: ["Cabinet", "Toulon", "Presentation claire"],
    stats: [
      { value: "Toulon", label: "Ancrage local" },
      { value: "Uniforme", label: "Stack front" },
      { value: "Maintenable", label: "Dans la duree" },
    ],
    sections: [
      {
        title: "Base cabinet",
        items: [
          "Le cabinet conserve son ancrage local avec une page plus nette.",
          "Structure adaptee pour expertise, bio et prise de rendez-vous.",
          "Aucune page HTML externe necessaire pour le rendu.",
        ],
      },
      {
        title: "Cohesion",
        items: [
          "Le front des demos cabinet est desormais homogene.",
          "La maquette reste simple a enrichir apres validation.",
          "Compatibilite maintenue avec la logique d'acces existante.",
        ],
      },
    ],
    process: [...lawProcess],
    highlights: [
      "Fond Toulon conserve.",
      "Route Next unique pour la demo.",
      "Look plus institutionnel et stable.",
    ],
    contactCards: [
      { title: "Etat actuel", detail: "Base propre pour cabinet a Toulon." },
      { title: "Prochaine etape", detail: "Ajouter portrait et informations definitives si souhaite." },
    ],
    heroImage: "/sites/avocattest7/fond-toulon.png",
    heroImageAlt: "Fond Toulon pour le cabinet",
    secondaryImage: "/sites/avocattest7/julien.png",
    secondaryImageAlt: "Portrait de Julien MARLINGE",
    gallery: [
      { src: "/sites/avocattest7/fond-toulon.png", alt: "Fond Toulon" },
      { src: "/sites/avocattest7/julien.png", alt: "Portrait professionnel" },
    ],
  }),
  avocattest8: createLawSite({
    id: "avocattest8",
    name: "Marc OREGGIA",
    title: "Marc OREGGIA",
    eyebrow: "Avocat",
    location: "Toulon",
    description:
      "Cabinet Toulon migre vers la nouvelle stack, avec un affichage plus propre et plus simple a faire vivre.",
    badges: ["Cabinet", "Toulon", "Base migree"],
    stats: [
      { value: "Sobre", label: "Look" },
      { value: "Clair", label: "Parcours" },
      { value: "Next", label: "Architecture" },
    ],
    sections: [
      {
        title: "Presentation",
        items: [
          "Le site expose plus clairement le cabinet et son cadre d'intervention.",
          "Le hero et les cartes gardent une ambiance professionnelle sans lourdeur.",
          "Les assets existants sont reutilises dans des composants modernes.",
        ],
      },
      {
        title: "Maintien",
        items: [
          "La maintenance est centralisee dans une seule application.",
          "La demo peut etre enrichie sans repartir d'un HTML autonome.",
          "Le mode public ou protege reste gere par l'admin.",
        ],
      },
    ],
    process: [...lawProcess],
    highlights: [
      "Fond Toulon et portrait Marc conserves.",
      "Route demo propre.",
      "Structure factorisee avec les autres cabinets.",
    ],
    contactCards: [
      { title: "Format", detail: "Cabinet vitrine propre pour validation client." },
      { title: "Prochaine etape", detail: "Finaliser textes et appels a l'action selon le dossier." },
    ],
    heroImage: "/sites/avocattest8/fond-toulon.png",
    heroImageAlt: "Fond Toulon pour le cabinet",
    secondaryImage: "/sites/avocattest8/marc.png",
    secondaryImageAlt: "Portrait de Marc OREGGIA",
    gallery: [
      { src: "/sites/avocattest8/fond-toulon.png", alt: "Fond Toulon" },
      { src: "/sites/avocattest8/marc.png", alt: "Portrait professionnel" },
    ],
  }),
  tattoo1: createTattooSite({
    id: "tattoo1",
    name: "Ink'Olive",
    title: "Ink'Olive",
    eyebrow: "Tattoo, piercing & content",
    location: "Demo tattoo",
    description:
      "Univers tattoo plus direct, sombre et editoral, migre dans la stack Next sans page HTML autonome.",
    badges: ["Tattoo", "Piercing", "Direction dark"],
    stats: [
      { value: "5", label: "Visuels portfolio" },
      { value: "Dark", label: "Direction marquee" },
      { value: "React", label: "Socle moderne" },
    ],
    sections: [
      {
        title: "Portfolio",
        items: [
          "Le visuel passe en premier avec une hiarchie plus nette.",
          "La galerie est servie depuis les assets publics existants.",
          "Le rendu garde l'esprit studio sans scripts legacy specifiques.",
        ],
      },
      {
        title: "Usage client",
        items: [
          "Bonne base pour valider une DA tattoo plus frontale.",
          "Sections prêtes pour styles, process et prise de brief.",
          "Maintenance simplifiee dans le monorepo actuel.",
        ],
      },
    ],
    process: [...tattooProcess],
    highlights: [
      "Logo et portfolio conserves.",
      "Mood plus tranchant et plus propre.",
      "Ancien HTML remplace par une route Next.",
    ],
    contactCards: [
      { title: "Point fort", detail: "Impact visuel immediate pour une demo studio tattoo." },
      { title: "Prochaine etape", detail: "Ajouter formulaire de brief reel si besoin." },
    ],
    heroImage: "/sites/tattoo1/p1.png",
    heroImageAlt: "Piece tattoo hero",
    secondaryImage: "/sites/tattoo1/logo.png",
    secondaryImageAlt: "Logo Ink'Olive",
    logoImage: "/sites/tattoo1/logo.png",
    gallery: [
      { src: "/sites/tattoo1/p1.png", alt: "Tatouage 1" },
      { src: "/sites/tattoo1/p2.png", alt: "Tatouage 2" },
      { src: "/sites/tattoo1/p3.png", alt: "Tatouage 3" },
      { src: "/sites/tattoo1/p4.png", alt: "Tatouage 4" },
    ],
  }),
  tattoo2: createTattooSite({
    id: "tattoo2",
    name: "Epicure INK",
    title: "Epicure INK",
    eyebrow: "Tattoo, piercing & content",
    location: "Demo tattoo",
    description:
      "Version tattoo plus epuree, migree vers le nouveau front avec une galerie stable et des sections factorisees.",
    badges: ["Tattoo", "Piercing", "Portfolio propre"],
    stats: [
      { value: "3", label: "Visuels principaux" },
      { value: "Clean", label: "Layout" },
      { value: "Unified", label: "Architecture" },
    ],
    sections: [
      {
        title: "Presentation studio",
        items: [
          "Hero et galerie reconstruits dans un composant React maintenable.",
          "Parcours plus net pour un futur brief client.",
          "Rendu plus fiable que l'ancien point d'entree statique.",
        ],
      },
      {
        title: "Direction",
        items: [
          "Le look reste sombre et concentre sur les pieces.",
          "Logo et visuels existants sont conserves.",
          "Base prete pour enrichissement contenu ou prise de rendez-vous.",
        ],
      },
    ],
    process: [...tattooProcess],
    highlights: [
      "Galerie tattoo conservee.",
      "Logo conserve.",
      "Migration complete du rendu.",
    ],
    contactCards: [
      { title: "Usage ideal", detail: "Demo studio tattoo plus minimaliste." },
      { title: "Prochaine etape", detail: "Ajouter styles et infos artistes si necessaire." },
    ],
    heroImage: "/sites/tattoo2/p1.png",
    heroImageAlt: "Piece tattoo principale",
    secondaryImage: "/sites/tattoo2/logofinal.png",
    secondaryImageAlt: "Logo Epicure INK",
    logoImage: "/sites/tattoo2/logofinal.png",
    gallery: [
      { src: "/sites/tattoo2/p1.png", alt: "Tatouage 1" },
      { src: "/sites/tattoo2/p2.png", alt: "Tatouage 2" },
      { src: "/sites/tattoo2/p3.png", alt: "Tatouage 3" },
    ],
  }),
  tattoo3: createTattooSite({
    id: "tattoo3",
    name: "L'atelier du trace",
    title: "L'atelier du trace",
    eyebrow: "Tattoo, piercing & content",
    location: "Demo tattoo",
    description:
      "Studio tattoo migre sur Next, avec une base sombre plus nette et un portfolio servi sans legacy HTML.",
    badges: ["Studio tattoo", "Look editorial", "Version Next"],
    stats: [
      { value: "3", label: "Pieces visibles" },
      { value: "Dark", label: "Direction" },
      { value: "Stable", label: "Maintenance" },
    ],
    sections: [
      {
        title: "Visibilite",
        items: [
          "La page met le travail en avant avant toute autre chose.",
          "Les assets existants restent disponibles via le dossier public.",
          "Le rendu est plus simple a faire evoluer pour un client reel.",
        ],
      },
      {
        title: "Parcours",
        items: [
          "Sections courtes pour clarifier styles, process et prise de brief.",
          "Plus de duplication de logique front hors application principale.",
          "Compatibilite complete avec la connexion demo actuelle.",
        ],
      },
    ],
    process: [...tattooProcess],
    highlights: [
      "Logo conserve.",
      "Portfolio conserve.",
      "Affichage migre en React/Tailwind.",
    ],
    contactCards: [
      { title: "Format", detail: "Demo studio tattoo a forte presence visuelle." },
      { title: "Prochaine etape", detail: "Completer contenu branding, artistes et formulaires." },
    ],
    heroImage: "/sites/tattoo3/p1.png",
    heroImageAlt: "Piece tattoo hero",
    secondaryImage: "/sites/tattoo3/logo.png",
    secondaryImageAlt: "Logo du studio",
    logoImage: "/sites/tattoo3/logo.png",
    gallery: [
      { src: "/sites/tattoo3/p1.png", alt: "Tatouage 1" },
      { src: "/sites/tattoo3/p2.png", alt: "Tatouage 2" },
      { src: "/sites/tattoo3/p3.png", alt: "Tatouage 3" },
    ],
  }),
  moderne: createTattooSite({
    id: "moderne",
    name: "999 STUDIO",
    title: "999 STUDIO",
    eyebrow: "Tattoo, piercing & content",
    location: "Demo tattoo",
    description:
      "Malgre son nom, cette demo est traitee comme un studio tattoo: DA sombre, portfolio et identite visuelle forte.",
    badges: ["999 Studio", "Tattoo", "Portfolio"],
    stats: [
      { value: "6+", label: "Assets disponibles" },
      { value: "Bold", label: "Direction" },
      { value: "Migrated", label: "Route Next" },
    ],
    sections: [
      {
        title: "Identite studio",
        items: [
          "Le hero met en avant la marque et l'impact visuel des pieces.",
          "Les images existantes restent reutilisees dans une structure plus propre.",
          "Le studio gagne un front maintenable et uniforme avec le reste du projet.",
        ],
      },
      {
        title: "Narration",
        items: [
          "Sections concises pour portfolio, process et contact.",
          "Look sombre sans surcharge technique inutile.",
          "Base evolutive pour enrichir le studio ensuite.",
        ],
      },
    ],
    process: [...tattooProcess],
    highlights: [
      "Logo tattoo conserve.",
      "Portfolio p1 a p4 conserve.",
      "Page HTML retiree de l'affichage principal.",
    ],
    contactCards: [
      { title: "Usage ideal", detail: "Demo studio tattoo avec plus de matiere visuelle." },
      { title: "Prochaine etape", detail: "Ajouter infos artistes, Instagram et prise de brief si valide." },
    ],
    heroImage: "/sites/moderne/p1.png",
    heroImageAlt: "Visuel hero du studio 999",
    secondaryImage: "/sites/moderne/tattoologofinal.png",
    secondaryImageAlt: "Logo du studio 999",
    logoImage: "/sites/moderne/tattoologofinal.png",
    gallery: [
      { src: "/sites/moderne/p1.png", alt: "Tatouage 1" },
      { src: "/sites/moderne/p2.png", alt: "Tatouage 2" },
      { src: "/sites/moderne/p3.png", alt: "Tatouage 3" },
      { src: "/sites/moderne/p4.png", alt: "Tatouage 4" },
    ],
  }),
};

function formatSiteName(siteId: string): string {
  return siteId
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function createFallbackSite(siteId: string): DemoSiteDefinition {
  const title = formatSiteName(siteId) || "Site demo";
  return createGenericSite({
    id: siteId,
    name: title,
    title,
    eyebrow: "Site demo",
    location: "Version migree",
    description:
      "Ce site demo est maintenant servi par Next.js, Tailwind CSS et Framer Motion, meme si son contenu final n'a pas encore ete renseigne.",
    badges: ["Route Next", "Base propre", "A personnaliser"],
    stats: [
      { value: "100%", label: "Migration front" },
      { value: "0", label: "Dependance HTML" },
      { value: "Ready", label: "Pour iteration" },
    ],
    sections: [
      {
        title: "Etat actuel",
        items: [
          "Le point d'entree legacy a ete remplace par une vraie page Next.",
          "La logique d'acces, les redirects et l'analytics passent par le nouveau socle.",
          "Le contenu de ce site peut maintenant etre enrichi proprement.",
        ],
      },
      {
        title: "Suite logique",
        items: [
          "Ajouter les visuels publics dans le dossier assets du site.",
          "Renseigner les sections metier et les appels a l'action.",
          "Conserver la meme base technique pour eviter de recreer du legacy.",
        ],
      },
    ],
    process: [
      {
        title: "Structure en place",
        text: "Le site est deja branche sur la nouvelle architecture de l'application.",
      },
      {
        title: "Contenu a injecter",
        text: "Il reste simplement a personnaliser les textes, visuels et sections si besoin.",
      },
      {
        title: "Publication",
        text: "Une fois le contenu final valide, la page est deja prete a etre servie proprement.",
      },
    ],
    highlights: [
      "Route dynamique deja fonctionnelle.",
      "Compatibilite avec l'admin existant.",
      "Base saine pour la suite.",
    ],
    contactCards: [
      { title: "Statut", detail: "Page generee depuis le nouveau routeur Next." },
      { title: "Action", detail: "Ajouter les contenus finals pour cette demo si necessaire." },
    ],
    gallery: [],
  });
}

export function getDemoSiteDefinition(siteId: string): DemoSiteDefinition {
  return demoSitesById[siteId] ?? createFallbackSite(siteId);
}
