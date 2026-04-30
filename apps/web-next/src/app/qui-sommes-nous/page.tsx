import type { Metadata } from "next";

import { InfoPage } from "@/components/info-page";

export const metadata: Metadata = {
  title: "Qui sommes-nous",
};

export default function QuiSommesNousPage() {
  return (
    <InfoPage
      eyebrow="Notre vision"
      title="Qui sommes-nous ?"
      subtitle="Une approche humaine, directe et orientee resultats."
      sections={[
        {
          title: "Hproweb, un projet porte par un passionne",
          paragraphs: [
            "Je suis AY, fondateur de Hproweb. Je suis passionne par le web, le design utile et les outils digitaux qui aident concretement les entreprises a mieux se presenter et a convertir leurs visiteurs.",
            "Mon objectif est simple : livrer des sites clairs, rapides et professionnels, avec un accompagnement reel, sans jargon inutile.",
          ],
        },
        {
          title: "Notre maniere de travailler",
          bullets: [
            "Ecoute : comprendre votre activite, vos priorites et vos objectifs.",
            "Clarte : proposer une structure lisible et des offres transparentes.",
            "Qualite : livrer un site propre, responsive et pret a etre exploite.",
            "Suivi : rester disponible apres mise en ligne pour faire evoluer le projet.",
          ],
        },
        {
          title: "Pour qui ?",
          paragraphs: [
            "Hproweb accompagne les independants, artisans, commercants et petites structures qui veulent un site fiable, une image professionnelle et un interlocuteur unique.",
          ],
        },
        {
          title: "Nous contacter",
          paragraphs: [
            "Vous avez un projet ou une idee a lancer ? Demandez a etre rappele et nous construisons la meilleure version de votre site ensemble.",
          ],
        },
      ]}
    />
  );
}
