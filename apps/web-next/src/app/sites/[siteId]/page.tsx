import { readdir, readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { resolve } from "node:path";

import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { DemoSitePage } from "@/components/demo-site-page";

type DemoSiteRecord = {
  id: string;
  name: string;
  path: string;
  active?: boolean;
};

type PageProps = {
  params: Promise<{ siteId: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { siteId } = await params;
  const site = await getDemoSite(siteId);
  return {
    title: site ? `${site.name}` : "Demo",
  };
}

export default async function DemoSiteRoute({ params }: PageProps) {
  const { siteId } = await params;
  const site = await getDemoSite(siteId);
  if (!site) {
    notFound();
  }

  const assetsDirectory = resolve(process.cwd(), "public", "sites", site.id);
  const htmlPreviewPath = existsSync(resolve(assetsDirectory, "index.html"))
    ? `/sites/${site.id}/index.html`
    : null;

  let assets: Array<{ fileName: string; publicPath: string }> = [];
  if (existsSync(assetsDirectory)) {
    const entries = await readdir(assetsDirectory, { withFileTypes: true });
    assets = entries
      .filter(
        (entry) =>
          entry.isFile() &&
          /\.(png|jpe?g|webp|avif|gif|svg)$/i.test(entry.name),
      )
      .sort((left, right) => left.name.localeCompare(right.name, "fr"))
      .map((entry) => ({
        fileName: entry.name,
        publicPath: `/sites/${site.id}/${entry.name}`,
      }));
  }

  return (
    <DemoSitePage
      site={{ id: site.id, name: site.name, path: site.path }}
      assets={assets}
      htmlPreviewPath={htmlPreviewPath}
    />
  );
}

async function getDemoSite(siteId: string): Promise<DemoSiteRecord | null> {
  try {
    const dataPath = resolve(process.cwd(), "..", "api", "data", "demo-sites.json");
    const raw = await readFile(dataPath, "utf8");
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) {
      return null;
    }

    const normalizedId = siteId.trim().toLowerCase();
    const site = parsed.find((entry) => {
      const candidate = entry as DemoSiteRecord;
      return (
        typeof candidate?.id === "string" &&
        candidate.id.trim().toLowerCase() === normalizedId &&
        candidate.active !== false
      );
    }) as DemoSiteRecord | undefined;

    return site ?? null;
  } catch {
    return null;
  }
}
