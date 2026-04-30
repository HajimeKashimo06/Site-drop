import type { Metadata } from "next";

import { ContactPage } from "@/components/contact-page";

export const metadata: Metadata = {
  title: "Etre rappele",
};

export default function ContactRoute() {
  return <ContactPage />;
}
