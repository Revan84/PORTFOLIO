"use client";

import Link from "next/link";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  return (
    <div className="container">
      <p className="section-label">
        error <span>/request-failed</span>
      </p>
      <p role="alert">{error.message}</p>
      <p>
        <button type="button" className="btn btn-primary" onClick={reset}>
          Try again
        </button>{" "}
        <Link href="/" className="btn btn-secondary">
          Back home
        </Link>
      </p>
    </div>
  );
}
