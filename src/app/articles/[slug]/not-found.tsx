import Link from "next/link";

export default function ArticleNotFound() {
  return (
    <>
      <h1>Article introuvable</h1>
      <Link href="/">Retour à la liste</Link>
    </>
  );
}
