"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { AvocatDemoPage } from "@/components/avocat-demo-page";
import { CoiffeurDemoPage } from "@/components/coiffeur-demo-page";
import { RestaurantDemoPage } from "@/components/restaurant-demo-page";
import { RestaurantDemoSeasidePage } from "@/components/restaurant-demo-seaside-page";
import { TattooMartDemoPage } from "@/components/tattoo-mart-demo-page";
import { TattooDemoPage } from "@/components/tattoo-demo-page";

type DemoSiteAsset = {
  fileName: string;
  publicPath: string;
};

type DemoSiteRecord = {
  id: string;
  name: string;
  path: string;
};

type DemoSitePageProps = {
  site: DemoSiteRecord;
  assets: DemoSiteAsset[];
  htmlPreviewPath: string | null;
};

type AccessState = "loading" | "granted" | "denied";

export function DemoSitePage({
  site,
  assets,
  htmlPreviewPath,
}: DemoSitePageProps) {
  const [accessState, setAccessState] = useState<AccessState>("loading");

  useEffect(() => {
    let cancelled = false;

    const verifyAccess = async () => {
      try {
        const response = await fetch(
          `/api/auth/session?site=${encodeURIComponent(site.id)}`,
          {
            method: "GET",
            credentials: "include",
          },
        );

        if (cancelled) {
          return;
        }

        if (!response.ok) {
          setAccessState("denied");
          return;
        }

        setAccessState("granted");
      } catch {
        if (!cancelled) {
          setAccessState("denied");
        }
      }
    };

    void verifyAccess();

    return () => {
      cancelled = true;
    };
  }, [site.id]);

  if (accessState === "loading") {
    return (
      <main className="px-4 py-8 md:px-6">
        <div className="mx-auto max-w-5xl rounded-[2rem] border border-[rgba(15,23,42,0.08)] bg-white/84 px-6 py-10 text-center shadow-[0_30px_80px_-50px_rgba(15,23,42,0.3)]">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--brand-soft)]">
            Chargement
          </p>
          <h1 className="mt-4 font-display text-4xl font-semibold text-[var(--ink-strong)]">
            Ouverture de la démonstration
          </h1>
        </div>
      </main>
    );
  }

  if (accessState === "denied") {
    return (
      <main className="px-4 py-8 md:px-6">
        <div className="mx-auto max-w-4xl rounded-[2rem] border border-[rgba(15,23,42,0.08)] bg-white/88 px-6 py-10 shadow-[0_30px_80px_-50px_rgba(15,23,42,0.3)]">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--brand-soft)]">
            Accès limité
          </p>
          <h1 className="mt-4 font-display text-4xl font-semibold text-[var(--ink-strong)]">
            Cette démonstration n&apos;est pas accessible actuellement
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--ink-soft)]">
            Le lien peut être réservé à un compte client ou temporairement
            privé. Reviens au portail des démos ou contacte-nous pour obtenir
            l&apos;accès.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/demo-site"
              className="rounded-full bg-[var(--surface-strong)] px-5 py-3 text-sm font-semibold text-white"
            >
              Retour au portail démo
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-[var(--line-strong)] bg-white px-5 py-3 text-sm font-semibold text-[var(--brand)]"
            >
              Nous contacter
            </Link>
          </div>
        </div>
      </main>
    );
  }

  if (site.id === "restaudemo" && !htmlPreviewPath) {
    return <RestaurantDemoPage site={site} />;
  }

  if (site.id === "restaudemo2" && !htmlPreviewPath) {
    return <RestaurantDemoSeasidePage site={site} />;
  }

  if (site.id === "coiffeurdemo") {
    return <CoiffeurDemoPage site={site} />;
  }

  if (site.id === "demo999") {
    return <TattooDemoPage site={site} />;
  }

  if (site.id === "avocatdemo") {
    return <AvocatDemoPage site={site} />;
  }

  if (site.id === "tattoomart") {
    return <TattooMartDemoPage site={site} />;
  }

  return (
    <main className="px-4 py-8 md:px-6">
      <section className="mx-auto max-w-6xl rounded-[2rem] border border-[rgba(15,23,42,0.08)] bg-[radial-gradient(circle_at_top,#ffffff_0%,#f5f7fb_56%,#eef2f8_100%)] px-6 py-8 shadow-[0_30px_80px_-50px_rgba(15,23,42,0.32)] md:px-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--brand-soft)]">
              Démo client
            </p>
            <h1 className="mt-4 font-display text-4xl font-semibold text-[var(--ink-strong)] md:text-5xl">
              {site.name}
            </h1>
            <p className="mt-3 text-sm text-[var(--ink-soft)]">{site.path}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="rounded-full border border-[var(--line-strong)] bg-white px-5 py-3 text-sm font-semibold text-[var(--brand)]"
            >
              Demander ce type de site
            </Link>
            <Link
              href="/offres"
              className="rounded-full bg-[var(--surface-strong)] px-5 py-3 text-sm font-semibold text-white"
            >
              Voir nos offres
            </Link>
          </div>
        </div>

        {htmlPreviewPath ? (
          <div className="mt-8 overflow-hidden rounded-[1.8rem] border border-[rgba(15,23,42,0.08)] bg-white shadow-[0_30px_80px_-55px_rgba(15,23,42,0.35)]">
            <iframe
              src={htmlPreviewPath}
              title={site.name}
              className="h-[78vh] w-full"
            />
          </div>
        ) : assets.length > 0 ? (
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {assets.map((asset) => (
              <div
                key={asset.publicPath}
                className="relative aspect-[4/5] overflow-hidden rounded-[1.6rem] border border-[rgba(15,23,42,0.08)] bg-white shadow-[0_30px_70px_-55px_rgba(15,23,42,0.35)]"
              >
                <Image
                  src={asset.publicPath}
                  alt={asset.fileName}
                  fill
                  unoptimized
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-[1.8rem] border border-dashed border-[rgba(15,23,42,0.14)] bg-white/80 px-6 py-8">
            <h2 className="font-display text-2xl font-semibold text-[var(--ink-strong)]">
              Espace démo prêt à être alimenté
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--ink-soft)]">
              Ce lien est déjà actif. Il ne reste plus qu&apos;à ajouter vos
              maquettes, captures ou fichiers du site pour transformer cette
              base en démonstration client.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
