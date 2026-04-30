import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { DemoSitePage } from "@/components/demo-site-page";
import { getDemoSiteDefinition } from "@/lib/demo-site-content";
import { isActiveDemoSite, normalizeDemoSiteId } from "@/lib/demo-site-registry";

export const dynamic = "force-dynamic";

type DemoSiteRouteProps = {
  params: Promise<{
    siteId: string;
  }>;
};

export async function generateMetadata({
  params,
}: DemoSiteRouteProps): Promise<Metadata> {
  const { siteId: rawSiteId } = await params;
  const siteId = normalizeDemoSiteId(rawSiteId);
  if (!siteId || !(await isActiveDemoSite(siteId))) {
    notFound();
  }
  const site = getDemoSiteDefinition(siteId);

  return {
    title: `${site.title} | Site demo`,
    description: site.description,
  };
}

export default async function DemoSiteRoute({ params }: DemoSiteRouteProps) {
  const { siteId: rawSiteId } = await params;
  const siteId = normalizeDemoSiteId(rawSiteId);
  if (!siteId || !(await isActiveDemoSite(siteId))) {
    notFound();
  }
  const site = getDemoSiteDefinition(siteId);

  return <DemoSitePage site={site} />;
}
