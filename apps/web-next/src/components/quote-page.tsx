"use client";

import { useSearchParams } from "next/navigation";
import type { FormEvent, ReactNode } from "react";
import { useState } from "react";

import { PublicPageShell } from "@/components/public-page-shell";
import { quoteOffers, type QuoteOfferId } from "@/lib/site";

type FeedbackTone = "success" | "error" | "";

type QuoteFormState = {
  name: string;
  email: string;
  phone: string;
  message: string;
  website: string;
  consent: boolean;
};

const defaultOffer: QuoteOfferId = "premium-base";

function resolveOffer(rawValue: string | null): QuoteOfferId {
  const normalized = (rawValue ?? "").trim().toLowerCase();
  return quoteOffers.some((offer) => offer.id === normalized)
    ? (normalized as QuoteOfferId)
    : defaultOffer;
}

export function QuotePage() {
  const searchParams = useSearchParams();
  const requestedOffer = resolveOffer(searchParams.get("offer"));
  const [offerOverride, setOfferOverride] = useState<QuoteOfferId | null>(null);
  const [form, setForm] = useState<QuoteFormState>({
    name: "",
    email: "",
    phone: "",
    message: "",
    website: "",
    consent: false,
  });
  const [feedback, setFeedback] = useState("");
  const [tone, setTone] = useState<FeedbackTone>("");
  const [submitting, setSubmitting] = useState(false);
  const selectedOffer = offerOverride ?? requestedOffer;

  const updateField = <K extends keyof QuoteFormState>(key: K, value: QuoteFormState[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFeedback("");
    setTone("");

    if (!form.consent) {
      setFeedback("Vous devez accepter d'être contacté pour envoyer la demande.");
      setTone("error");
      return;
    }

    if (!form.name.trim() || !form.phone.trim() || !form.email.trim()) {
      setFeedback("Offre, nom, téléphone et email sont obligatoires.");
      setTone("error");
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch("/api/quote-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          offer: selectedOffer,
          name: form.name.trim(),
          phone: form.phone.trim(),
          email: form.email.trim(),
          message: form.message.trim(),
          website: form.website.trim(),
          sourcePage: window.location.pathname,
        }),
      });

      const data = (await response.json().catch(() => null)) as
        | { message?: unknown; error?: unknown }
        | null;

      if (!response.ok) {
        setFeedback(
          data && typeof data.error === "string" && data.error.trim()
            ? data.error
            : "Envoi impossible pour le moment.",
        );
        setTone("error");
        return;
      }

      setFeedback(
        data && typeof data.message === "string" && data.message.trim()
          ? data.message
          : "Votre demande de devis a bien ete envoyee.",
      );
      setTone("success");
      setOfferOverride(null);
      setForm({
        name: "",
        email: "",
        phone: "",
        message: "",
        website: "",
        consent: false,
      });
    } catch {
      setFeedback("Erreur réseau. Veuillez réessayer dans un instant.");
      setTone("error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PublicPageShell
      eyebrow="Demande de devis"
      title="Recevez un devis adapté à votre projet."
      description="Choisissez une offre, laissez vos coordonnées et précisez votre besoin pour obtenir une proposition claire."
    >
      <article className="rounded-[1.8rem] border border-[rgba(25,76,138,0.24)] bg-[linear-gradient(118deg,rgba(11,31,56,0.82),rgba(23,78,134,0.84))] px-6 py-7 text-white shadow-[0_24px_46px_rgba(18,45,77,0.22)]">
        <p className="font-display text-sm font-semibold uppercase tracking-[0.24em] text-[#aed0f8]">
          Demande de devis
        </p>
        <h2 className="mt-4 max-w-lg text-balance font-display text-3xl font-semibold leading-tight md:text-4xl">
          Une proposition claire selon votre activité, vos besoins et le niveau de finition attendu.
        </h2>
        <ul className="mt-6 grid gap-3 text-sm leading-7 text-white/90 md:text-base">
          {[
            "Offre choisie ou ajustée avec vous",
            "Budget et périmètre clarifiés",
            "Réponse adaptée à votre projet",
          ].map((item) => (
            <li
              key={item}
              className="rounded-[1.2rem] border border-white/14 bg-white/8 px-4 py-3"
            >
              {item}
            </li>
          ))}
        </ul>
      </article>

      <section className="glass-panel rounded-[1.8rem] px-6 py-7">
        <h2 className="font-display text-3xl font-semibold text-[var(--ink-strong)]">
          Votre devis
        </h2>
        <p className="mt-3 text-sm leading-7 text-[var(--ink-soft)] md:text-base">
          Renseignez vos coordonnées et décrivez votre besoin en quelques lignes.
        </p>

        <form className="mt-6 grid gap-4" onSubmit={onSubmit} noValidate>
          <Field label="Offre choisie">
            <select
              value={selectedOffer}
              onChange={(event) =>
                setOfferOverride(event.target.value as QuoteOfferId)
              }
              className={fieldClassName}
              required
            >
              {quoteOffers.map((offer) => (
                <option key={offer.id} value={offer.id}>
                  {offer.label}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Nom complet">
            <input
              value={form.name}
              onChange={(event) => updateField("name", event.target.value)}
              className={fieldClassName}
              maxLength={120}
              autoComplete="name"
              required
            />
          </Field>

          <Field label="Email">
            <input
              type="email"
              value={form.email}
              onChange={(event) => updateField("email", event.target.value)}
              className={fieldClassName}
              maxLength={160}
              autoComplete="email"
              required
            />
          </Field>

          <Field label="Téléphone">
            <input
              value={form.phone}
              onChange={(event) => updateField("phone", event.target.value)}
              className={fieldClassName}
              maxLength={30}
              autoComplete="tel"
              required
            />
          </Field>

          <Field label="Détails du besoin (optionnel)">
            <textarea
              value={form.message}
              onChange={(event) => updateField("message", event.target.value)}
              className={`${fieldClassName} min-h-32 resize-y`}
              rows={5}
              maxLength={3000}
              placeholder="Ajoutez des infos utiles sur votre activité et votre besoin."
            />
          </Field>

          <input
            value={form.website}
            onChange={(event) => updateField("website", event.target.value)}
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />

          <label className="flex items-start gap-3 text-sm font-semibold text-[var(--ink-soft)]">
            <input
              type="checkbox"
              checked={form.consent}
              onChange={(event) => updateField("consent", event.target.checked)}
              className="mt-1 h-4 w-4 rounded border-[var(--line-strong)]"
            />
            <span>J&apos;accepte d&apos;être contacté au sujet de ma demande de devis.</span>
          </label>

          <button
            type="submit"
            disabled={submitting}
            className="rounded-full bg-[linear-gradient(110deg,#6f9f29,#8abf39)] px-5 py-3 text-sm font-extrabold text-white transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {submitting ? "Envoi..." : "Envoyer la demande"}
          </button>

          <p
            className={`min-h-6 text-sm font-bold ${
              tone === "success"
                ? "text-[#2f6f1f]"
                : tone === "error"
                  ? "text-[#bf3f3f]"
                  : "text-transparent"
            }`}
          >
            {feedback || "."}
          </p>
        </form>
      </section>
    </PublicPageShell>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="grid gap-2 text-sm font-bold text-[var(--brand)]">
      <span>{label}</span>
      {children}
    </label>
  );
}

const fieldClassName =
  "w-full rounded-[0.95rem] border border-[rgba(24,79,143,0.18)] bg-white px-4 py-3 text-sm text-[var(--ink-strong)] outline-none transition focus:border-[rgba(24,79,143,0.48)] focus:ring-4 focus:ring-[rgba(43,113,187,0.12)]";
