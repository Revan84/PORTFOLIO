"use client";

import Link from "next/link";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  return (
    <>
      <p role="alert">{error.message}</p>
      <button type="button" onClick={reset}>
        Réessayer
      </button>
      <Link href="/">Retour à la première page</Link>
    </>
  );
}
