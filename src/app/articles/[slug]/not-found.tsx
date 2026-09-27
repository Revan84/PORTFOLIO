import Link from "next/link";

export default function ArticleNotFound() {
  return (
    <div className="container">
      <p className="section-label">
        404 <span>/writing</span>
      </p>
      <h1>Article not found</h1>
      <Link href="/articles" className="btn btn-primary">
        Back to writing
      </Link>
    </div>
  );
}
