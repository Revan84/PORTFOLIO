import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";
import { fetchPageBySlug } from "../../services/pages";

export const metadata: Metadata = { title: "À propos" };

export default async function AboutPage() {
  const page = await fetchPageBySlug("about");
  if (page === null) notFound();

  return (
    <article>
      <h1>{page.title}</h1>
      <Markdown>{page.content ?? ""}</Markdown>
    </article>
  );
}
