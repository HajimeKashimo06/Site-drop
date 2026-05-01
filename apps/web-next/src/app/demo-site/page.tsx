import type { Metadata } from "next";

import { DemoSitesPage } from "@/components/demo-sites-page";

export const metadata: Metadata = {
  title: "Portail démo",
};

export default function DemoSiteRoute() {
  return <DemoSitesPage />;
}
