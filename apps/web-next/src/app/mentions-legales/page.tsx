import type { Metadata } from "next";

import { InfoPage } from "@/components/info-page";

export const metadata: Metadata = {
  title: "Mentions legales",
};

export default function MentionsLegalesPage() {
  return (
    <InfoPage
      eyebrow="Informations legales"
      title="Mentions legales du site Hproweb"
      subtitle="Mise a jour : 17 avril 2026"
      sections={[
        {
          title: "Editeur du site",
          paragraphs: [
            "Nom commercial : Hproweb",
            "Entrepreneur : AY",
            "Statut : Entrepreneur individuel (micro-entreprise)",
            "SIRET : 91939380100015",
            "Adresse : 176 avenue de la Californie",
            "Email : contact@hproweb.fr",
          ],
        },
        {
          title: "Directeur de la publication",
          paragraphs: ["Le directeur de la publication du site est AY."],
        },
        {
          title: "Hebergement",
          paragraphs: [
            "Hebergeur declare : Hproweb",
            "Pour toute demande liee a l'hebergement, contactez : contact@hproweb.fr.",
          ],
        },
        {
          title: "Propriete intellectuelle",
          paragraphs: [
            "L'ensemble des contenus presents sur ce site (textes, visuels, identite graphique, elements techniques) est protege par le droit d'auteur et le droit de la propriete intellectuelle.",
            "Toute reproduction, representation, adaptation ou exploitation, totale ou partielle, sans autorisation ecrite prealable, est interdite.",
          ],
        },
        {
          title: "Donnees personnelles",
          paragraphs: [
            "Les donnees collectees via les formulaires (contact, devis, rappel) sont utilisees uniquement pour traiter votre demande commerciale et assurer le suivi de la relation client.",
            "Vous pouvez demander l'acces, la rectification ou la suppression de vos donnees en ecrivant a contact@hproweb.fr.",
          ],
        },
        {
          title: "References legales",
          paragraphs: [
            "Ce document est redige en coherence avec les obligations applicables aux sites professionnels en France, notamment la loi numero 2004-575 du 21 juin 2004 (LCEN).",
          ],
        },
      ]}
    />
  );
}
