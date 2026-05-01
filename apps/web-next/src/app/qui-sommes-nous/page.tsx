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
      subtitle="Une approche humaine, directe et orientée résultats."
      sections={[
        {
          title: "Hproweb, un projet porté par un passionné",
          paragraphs: [
            "Je suis AY, fondateur de Hproweb. Je suis passionné par le web, le design utile et les outils digitaux qui aident concrètement les entreprises à mieux se présenter et à convertir leurs visiteurs.",
            "Mon objectif est simple : livrer des sites clairs, rapides et professionnels, avec un accompagnement réel, sans jargon inutile.",
          ],
        },
        {
          title: "Notre manière de travailler",
          bullets: [
            "Écoute : comprendre votre activité, vos priorités et vos objectifs.",
            "Clarté : proposer une structure lisible et des offres transparentes.",
            "Qualité : livrer un site propre, responsive et prêt à être exploité.",
            "Suivi : rester disponible après mise en ligne pour faire évoluer le projet.",
          ],
        },
        {
          title: "Pour qui ?",
          paragraphs: [
            "Hproweb accompagne les indépendants, artisans, commerçants et petites structures qui veulent un site fiable, une image professionnelle et un interlocuteur unique.",
          ],
        },
        {
          title: "Nous contacter",
          paragraphs: [
            "Vous avez un projet ou une idée à lancer ? Demandez à être rappelé et nous construisons la meilleure version de votre site ensemble.",
          ],
        },
      ]}
    />
  );
}
