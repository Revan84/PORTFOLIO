"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { defaultLocale, isLocale, localizePath, type Locale } from "../../i18n/locales";

// A Client Component cannot read the dictionaries, so its few words live here.
const TEXT: Record<Locale, { retry: string; home: string }> = {
  en: { retry: "Try again", home: "Back home" },
  fr: { retry: "Réessayer", home: "Retour à l'accueil" },
};

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  const { lang } = useParams<{ lang: string }>();
  const locale = isLocale(lang) ? lang : defaultLocale;

  return (
    <div className="container">
      <p className="section-label">
        error <span>/request-failed</span>
      </p>
      <p role="alert">{error.message}</p>
      <p>
        <button type="button" className="btn btn-primary" onClick={reset}>
          {TEXT[locale].retry}
        </button>{" "}
        <Link href={localizePath(locale, "/")} className="btn btn-secondary">
          {TEXT[locale].home}
        </Link>
      </p>
    </div>
  );
}
