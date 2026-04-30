type DemoSiteRegistryEntry = {
  id?: unknown;
  active?: unknown;
};

type DemoSitesResponse = {
  sites?: DemoSiteRegistryEntry[];
};

const apiBaseUrl = process.env.API_INTERNAL_URL ?? "http://127.0.0.1:8787";
const defaultDemoSiteIds = new Set(["page-test"]);

export function normalizeDemoSiteId(value: string): string {
  const normalized = value.trim().toLowerCase();
  if (!/^[a-z0-9-]{2,40}$/.test(normalized)) {
    return "";
  }
  return normalized;
}

export async function isActiveDemoSite(siteId: string): Promise<boolean> {
  const normalizedSiteId = normalizeDemoSiteId(siteId);
  if (!normalizedSiteId) {
    return false;
  }

  const activeSiteIds = await loadActiveDemoSiteIds();
  return activeSiteIds.has(normalizedSiteId);
}

async function loadActiveDemoSiteIds(): Promise<Set<string>> {
  try {
    const response = await fetch(`${apiBaseUrl}/api/demo-sites`, {
      cache: "no-store",
    });
    if (!response.ok) {
      return new Set(defaultDemoSiteIds);
    }

    const payload = (await response.json()) as DemoSitesResponse;
    return normalizeActiveDemoSiteIds(payload.sites ?? []);
  } catch {
    return new Set(defaultDemoSiteIds);
  }
}

function normalizeActiveDemoSiteIds(input: unknown): Set<string> {
  if (!Array.isArray(input)) {
    return new Set(defaultDemoSiteIds);
  }

  const ids = new Set<string>();

  for (const item of input) {
    const candidate = item as DemoSiteRegistryEntry;
    const normalizedId =
      typeof candidate.id === "string" ? normalizeDemoSiteId(candidate.id) : "";
    const active = candidate.active === undefined ? true : candidate.active === true;

    if (!normalizedId || !active) {
      continue;
    }

    ids.add(normalizedId);
  }

  return ids.size > 0 ? ids : new Set(defaultDemoSiteIds);
}
