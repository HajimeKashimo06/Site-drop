import type { Metadata } from "next";
import { Suspense } from "react";

import { QuotePage } from "@/components/quote-page";

export const metadata: Metadata = {
  title: "Demande de devis",
};

export default function DevisRoute() {
  return (
    <Suspense fallback={null}>
      <QuotePage />
    </Suspense>
  );
}
