import type { Metadata } from "next";

import { InfoPage } from "@/components/info-page";

export const metadata: Metadata = {
  title: "Conditions generales de vente",
};

export default function CgvPage() {
  return (
    <InfoPage
      eyebrow="Cadre contractuel"
      title="Conditions Generales de Vente (CGV)"
      subtitle="Mise a jour : 17 avril 2026"
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
            "Les presentes CGV definissent les conditions dans lesquelles Hproweb propose des prestations de conception, developpement, mise en ligne et accompagnement de sites internet.",
          ],
        },
        {
          title: "3. Prestations",
          paragraphs: [
            "Les prestations sont decrites sur le site et/ou dans le devis transmis au client. Le contenu precis, le perimetre technique, les options, les delais et le prix final sont confirmes dans le devis accepte.",
          ],
        },
        {
          title: "4. Commande et formation du contrat",
          paragraphs: [
            "La commande est consideree comme ferme a reception de l'acceptation ecrite du devis (email ou signature) et, le cas echeant, du reglement d'acompte prevu au devis.",
          ],
        },
        {
          title: "5. Prix et modalites de paiement",
          paragraphs: [
            "Les prix sont indiques en euros. Sauf mention contraire, les modalites de paiement (acompte, echeances, solde) sont celles precisees sur le devis valide par le client.",
            "En cas de retard de paiement, Hproweb peut suspendre l'execution de la prestation apres relance restee sans effet.",
          ],
        },
        {
          title: "6. Delais de realisation",
          paragraphs: [
            "Les delais sont communiques a titre estimatif et peuvent evoluer selon la complexite du projet, les demandes de modification et la reactivite du client pour valider les etapes.",
          ],
        },
        {
          title: "7. Droit de retractation (clients consommateurs)",
          paragraphs: [
            "Conformement aux articles L221-18 et suivants du Code de la consommation, le client consommateur dispose d'un delai de 14 jours pour exercer son droit de retractation pour les contrats conclus a distance.",
            "Si le client demande expressement l'execution de la prestation avant la fin du delai de retractation, il peut etre tenu de payer la part de service deja executee en cas de retractation, selon les dispositions legales.",
          ],
        },
        {
          title: "8. Obligations du client",
          paragraphs: [
            "Le client s'engage a fournir des informations exactes, les contenus necessaires (textes, images, acces) et a respecter les delais de validation pour permettre l'avancement du projet.",
          ],
        },
        {
          title: "9. Propriete intellectuelle",
          paragraphs: [
            "Sauf clause contraire au devis, les droits d'utilisation du site livre sont cedes au client apres paiement integral des sommes dues. Les outils, composants, methodes et savoir-faire propres a Hproweb restent sa propriete.",
          ],
        },
        {
          title: "10. Responsabilite",
          paragraphs: [
            "Hproweb met en oeuvre les moyens professionnels adaptes a la realisation des prestations. La responsabilite est limitee aux dommages directs, a l'exclusion des dommages indirects (perte d'exploitation, perte de chiffre d'affaires, perte d'opportunite, etc.).",
          ],
        },
        {
          title: "11. Reclamations et mediation",
          paragraphs: [
            "En cas de litige, le client est invite a adresser une reclamation ecrite a contact@hproweb.fr afin de rechercher une solution amiable.",
            "Pour les clients consommateurs, un dispositif de mediation de la consommation est applicable conformement aux articles L612-1 et suivants du Code de la consommation. Les coordonnees du mediateur competent seront communiquees sur demande tant que la designation formelle est en cours.",
          ],
        },
        {
          title: "12. Droit applicable et juridiction",
          paragraphs: [
            "Les presentes CGV sont soumises au droit francais. A defaut d'accord amiable, le litige est porte devant la juridiction competente selon les regles legales en vigueur.",
          ],
        },
      ]}
    />
  );
}
