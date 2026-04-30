"use client";

import type { FormEvent, ReactNode } from "react";
import { useState } from "react";

import { PublicPageShell } from "@/components/public-page-shell";

type FeedbackTone = "success" | "error" | "";

type ContactFormState = {
  name: string;
  phone: string;
  email: string;
  company: string;
  preferredWindow: string;
  subject: string;
  message: string;
  website: string;
  consent: boolean;
};

const initialState: ContactFormState = {
  name: "",
  phone: "",
  email: "",
  company: "",
  preferredWindow: "",
  subject: "",
  message: "",
  website: "",
  consent: false,
};

export function ContactPage() {
  const [form, setForm] = useState<ContactFormState>(initialState);
  const [feedback, setFeedback] = useState("");
  const [tone, setTone] = useState<FeedbackTone>("");
  const [submitting, setSubmitting] = useState(false);

  const updateField = <K extends keyof ContactFormState>(
    key: K,
    value: ContactFormState[K],
  ) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFeedback("");
    setTone("");

    if (!form.consent) {
      setFeedback("Vous devez accepter d'etre contacte pour envoyer la demande.");
      setTone("error");
      return;
    }

    if (!form.name.trim() || !form.phone.trim() || !form.email.trim() || !form.message.trim()) {
      setFeedback("Nom, telephone, email et message sont obligatoires.");
      setTone("error");
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch("/api/contact-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          phone: form.phone.trim(),
          email: form.email.trim(),
          company: form.company.trim(),
          subject: form.subject.trim(),
          preferredWindow: form.preferredWindow.trim(),
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
          : "Demande envoyee. Merci.",
      );
      setTone("success");
      setForm(initialState);
    } catch {
      setFeedback("Erreur reseau. Veuillez reessayer dans un instant.");
      setTone("error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PublicPageShell
      eyebrow="Demande de rappel"
      title="Laissez vos coordonnees et nous vous contactons rapidement."
      description="Ce formulaire envoie votre demande directement a l'adresse contact@hproweb.fr."
    >
      <article className="rounded-[1.8rem] border border-[rgba(25,76,138,0.24)] bg-[linear-gradient(118deg,rgba(11,31,56,0.82),rgba(23,78,134,0.84))] px-6 py-7 text-white shadow-[0_24px_46px_rgba(18,45,77,0.22)]">
        <p className="font-display text-sm font-semibold uppercase tracking-[0.24em] text-[#aed0f8]">
          Rappel gratuit
        </p>
        <h2 className="mt-4 max-w-lg text-balance font-display text-3xl font-semibold leading-tight md:text-4xl">
          Reservation de demo gratuite, reponse rapide et echange clair.
        </h2>
        <ul className="mt-6 grid gap-3 text-sm leading-7 text-white/90 md:text-base">
          {[
            "Reservation de demo 100% gratuite",
            "Reponse sous 24h en general",
            "Echange clair sur vos besoins",
            "Aucun engagement au premier contact",
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
          Fiche contact
        </h2>
        <p className="mt-3 text-sm leading-7 text-[var(--ink-soft)] md:text-base">
          Completez les champs puis cliquez sur Envoyer. La reservation de demo est gratuite.
        </p>

        <form className="mt-6 grid gap-4" onSubmit={onSubmit} noValidate>
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

          <Field label="Telephone">
            <input
              value={form.phone}
              onChange={(event) => updateField("phone", event.target.value)}
              className={fieldClassName}
              maxLength={30}
              autoComplete="tel"
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

          <Field label="Societe (optionnel)">
            <input
              value={form.company}
              onChange={(event) => updateField("company", event.target.value)}
              className={fieldClassName}
              maxLength={160}
              autoComplete="organization"
            />
          </Field>

          <Field label="Plage de rappel (optionnel)">
            <input
              value={form.preferredWindow}
              onChange={(event) => updateField("preferredWindow", event.target.value)}
              className={fieldClassName}
              maxLength={120}
              placeholder="Ex: mardi 14h-16h"
            />
          </Field>

          <Field label="Sujet (optionnel)">
            <input
              value={form.subject}
              onChange={(event) => updateField("subject", event.target.value)}
              className={fieldClassName}
              maxLength={140}
            />
          </Field>

          <Field label="Message">
            <textarea
              value={form.message}
              onChange={(event) => updateField("message", event.target.value)}
              className={`${fieldClassName} min-h-32 resize-y`}
              rows={5}
              minLength={10}
              maxLength={3000}
              placeholder="Decrivez votre besoin en quelques lignes."
              required
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
            <span>J&apos;accepte d&apos;etre contacte au sujet de ma demande.</span>
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
