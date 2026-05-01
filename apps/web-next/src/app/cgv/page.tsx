import type { Metadata } from "next";

import { InfoPage } from "@/components/info-page";

export const metadata: Metadata = {
  title: "Conditions générales de vente",
};

export default function CgvPage() {
  return (
    <InfoPage
      eyebrow="Cadre contractuel"
      title="Conditions Générales de Vente (CGV)"
      subtitle="Mise à jour : 17 avril 2026"
      sections={[
        {
          title: "1. Identification du vendeur",
          paragraphs: [
            "Nom commercial : Hproweb",
            "Entrepreneur : AY (micro-entreprise)",
            "SIRET : 91939380100015",
            "Adresse : 176 avenue de la Californie",
            "Email : contact@hproweb.fr",
          ],
        },
        {
          title: "2. Objet",
          paragraphs: [
            "Les présentes CGV définissent les conditions dans lesquelles Hproweb propose des prestations de conception, développement, mise en ligne et accompagnement de sites internet.",
          ],
        },
        {
          title: "3. Prestations",
          paragraphs: [
            "Les prestations sont décrites sur le site et/ou dans le devis transmis au client. Le contenu précis, le périmètre technique, les options, les délais et le prix final sont confirmés dans le devis accepté.",
          ],
        },
        {
          title: "4. Commande et formation du contrat",
          paragraphs: [
            "La commande est considérée comme ferme à réception de l'acceptation écrite du devis (email ou signature) et, le cas échéant, du règlement d'acompte prévu au devis.",
          ],
        },
        {
          title: "5. Prix et modalités de paiement",
          paragraphs: [
            "Les prix sont indiqués en euros. Sauf mention contraire, les modalités de paiement (acompte, échéances, solde) sont celles précisées sur le devis validé par le client.",
            "En cas de retard de paiement, Hproweb peut suspendre l'exécution de la prestation après relance restée sans effet.",
          ],
        },
        {
          title: "6. Délais de réalisation",
          paragraphs: [
            "Les délais sont communiqués à titre estimatif et peuvent évoluer selon la complexité du projet, les demandes de modification et la réactivité du client pour valider les étapes.",
          ],
        },
        {
          title: "7. Droit de rétractation (clients consommateurs)",
          paragraphs: [
            "Conformément aux articles L221-18 et suivants du Code de la consommation, le client consommateur dispose d'un délai de 14 jours pour exercer son droit de rétractation pour les contrats conclus à distance.",
            "Si le client demande expressément l'exécution de la prestation avant la fin du délai de rétractation, il peut être tenu de payer la part de service déjà exécutée en cas de rétractation, selon les dispositions légales.",
          ],
        },
        {
          title: "8. Obligations du client",
          paragraphs: [
            "Le client s'engage à fournir des informations exactes, les contenus nécessaires (textes, images, accès) et à respecter les délais de validation pour permettre l'avancement du projet.",
          ],
        },
        {
          title: "9. Propriété intellectuelle",
          paragraphs: [
            "Sauf clause contraire au devis, les droits d'utilisation du site livré sont cédés au client après paiement intégral des sommes dues. Les outils, composants, méthodes et savoir-faire propres à Hproweb restent sa propriété.",
          ],
        },
        {
          title: "10. Responsabilité",
          paragraphs: [
            "Hproweb met en œuvre les moyens professionnels adaptés à la réalisation des prestations. La responsabilité est limitée aux dommages directs, à l'exclusion des dommages indirects (perte d'exploitation, perte de chiffre d'affaires, perte d'opportunité, etc.).",
          ],
        },
        {
          title: "11. Réclamations et médiation",
          paragraphs: [
            "En cas de litige, le client est invité à adresser une réclamation écrite à contact@hproweb.fr afin de rechercher une solution amiable.",
            "Pour les clients consommateurs, un dispositif de médiation de la consommation est applicable conformément aux articles L612-1 et suivants du Code de la consommation. Les coordonnées du médiateur compétent seront communiquées sur demande tant que la désignation formelle est en cours.",
          ],
        },
        {
          title: "12. Droit applicable et juridiction",
          paragraphs: [
            "Les présentes CGV sont soumises au droit français. À défaut d'accord amiable, le litige est porté devant la juridiction compétente selon les règles légales en vigueur.",
          ],
        },
      ]}
    />
  );
}
