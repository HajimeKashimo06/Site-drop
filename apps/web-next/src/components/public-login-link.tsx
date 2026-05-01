import Link from "next/link";

type PublicLoginLinkProps = {
  className?: string;
};

export function PublicLoginLink({ className = "" }: PublicLoginLinkProps) {
  return (
    <Link
      href="/admin"
      aria-label="Accéder à votre compte"
      className={`inline-flex h-12 w-12 items-center justify-center rounded-full border border-[rgba(15,23,42,0.08)] bg-white/88 text-[var(--ink-strong)] shadow-[0_18px_40px_rgba(15,23,42,0.08)] backdrop-blur transition hover:-translate-y-0.5 hover:bg-white ${className}`.trim()}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20 21a8 8 0 0 0-16 0" />
        <circle cx="12" cy="8" r="4" />
      </svg>
    </Link>
  );
}
