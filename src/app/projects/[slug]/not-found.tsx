import Link from "next/link";

export default function ProjectNotFound() {
  return (
    <div className="container">
      <p className="section-label">
        404 <span>/work</span>
      </p>
      <h1>Project not found</h1>
      <Link href="/#work" className="btn btn-primary">
        Back to work
      </Link>
    </div>
  );
}
