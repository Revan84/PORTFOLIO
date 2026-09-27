import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";
import { ArticleCover } from "../../../components/ArticleCover";
import { fetchArticleBySlug } from "../../../services/articles";

const dateFormat = new Intl.DateTimeFormat("fr-FR", { dateStyle: "long" });

export async function generateMetadata(props: PageProps<"/articles/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const article = await fetchArticleBySlug(slug);
  return article === null ? {} : { title: article.title, description: article.excerpt };
}

export default async function ArticlePage(props: PageProps<"/articles/[slug]">) {
  const { slug } = await props.params;
  const article = await fetchArticleBySlug(slug);
  if (article === null) notFound();

  return (
    <article>
      <Link href="/">Retour à la liste</Link>
      <ArticleCover url={article.cover_url} alt={article.cover_alt} />
      <h1>{article.title}</h1>
      <time dateTime={article.published_at}>
        {dateFormat.format(new Date(article.published_at))}
      </time>
      <Markdown>{article.content ?? article.excerpt}</Markdown>
    </article>
  );
}
