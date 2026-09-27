import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container">
      <p className="section-label">
        404 <span>/not-found</span>
      </p>
      <h1>This page does not exist</h1>
      <Link href="/" className="btn btn-primary">
        Back home
      </Link>
    </div>
  );
}
