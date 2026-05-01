import type { Metadata } from "next";

import { InfoPage } from "@/components/info-page";

export const metadata: Metadata = {
  title: "Mentions légales",
};

export default function MentionsLegalesPage() {
  return (
    <InfoPage
      eyebrow="Informations légales"
      title="Mentions légales du site Hproweb"
      subtitle="Mise à jour : 17 avril 2026"
      sections={[
        {
          title: "Éditeur du site",
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
            "Hébergeur déclaré : Hproweb",
            "Pour toute demande liée à l'hébergement, contactez : contact@hproweb.fr.",
          ],
        },
        {
          title: "Propriété intellectuelle",
          paragraphs: [
            "L'ensemble des contenus présents sur ce site (textes, visuels, identité graphique, éléments techniques) est protégé par le droit d'auteur et le droit de la propriété intellectuelle.",
            "Toute reproduction, représentation, adaptation ou exploitation, totale ou partielle, sans autorisation écrite préalable, est interdite.",
          ],
        },
        {
          title: "Données personnelles",
          paragraphs: [
            "Les données collectées via les formulaires (contact, devis, rappel) sont utilisées uniquement pour traiter votre demande commerciale et assurer le suivi de la relation client.",
            "Vous pouvez demander l'accès, la rectification ou la suppression de vos données en écrivant à contact@hproweb.fr.",
          ],
        },
        {
          title: "Références légales",
          paragraphs: [
            "Ce document est rédigé en cohérence avec les obligations applicables aux sites professionnels en France, notamment la loi numéro 2004-575 du 21 juin 2004 (LCEN).",
          ],
        },
      ]}
    />
  );
}
