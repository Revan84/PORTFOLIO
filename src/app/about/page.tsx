import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";
import { fetchPageBySlug } from "../../services/pages";

export const metadata: Metadata = { title: "About" };

// Temporary: the about text moves to the home #about section in step 2.
export default async function AboutPage() {
  const page = await fetchPageBySlug("about");
  if (page === null) notFound();

  return (
    <article className="container">
      <h1>{page.title}</h1>
      <Markdown>{page.content ?? ""}</Markdown>
    </article>
  );
}
