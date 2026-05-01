import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Manrope, Sora } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Hproweb | Visibilité totale",
    template: "%s | Hproweb",
  },
  description:
    "Création de sites internet sur-mesure pour entreprises, indépendants et commerces qui veulent une image professionnelle en ligne.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${manrope.variable} ${sora.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full bg-[var(--surface-base)] text-[var(--ink-strong)]">
        {children}
      </body>
    </html>
  );
}
