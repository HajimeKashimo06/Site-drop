import type { Metadata } from "next";

import { DemoLoginPage } from "@/components/demo-login-page";

export const metadata: Metadata = {
  title: "Connexion site demo",
};

export default function DemoSiteRoute() {
  return <DemoLoginPage />;
}
