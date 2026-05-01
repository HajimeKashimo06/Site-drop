import type { Metadata } from "next";

import { OffersPage } from "@/components/offers-page";

export const metadata: Metadata = {
  title: "Offres",
};

export default function OffersRoute() {
  return <OffersPage />;
}
