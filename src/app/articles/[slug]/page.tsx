import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleCover } from "../../../components/ArticleCover";
import { MarkdownContent } from "../../../components/MarkdownContent";
import { pageMetadata } from "../../../lib/metadata";
import { fetchArticleBySlug, fetchArticleSlugs } from "../../../services/articles";
import styles from "./article.module.css";

const dateFormat = new Intl.DateTimeFormat("en-GB", { dateStyle: "long" });

// Published articles are built ahead and refreshed every 5 minutes; a slug added later is
// rendered on its first visit. Without streaming, an unknown slug answers a real 404.
export const revalidate = 300;

export async function generateStaticParams() {
  const slugs = await fetchArticleSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata(props: PageProps<"/articles/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const article = await fetchArticleBySlug(slug);
  if (article === null) return {};
  return pageMetadata({
    title: article.title,
    description: article.excerpt,
    path: `/articles/${encodeURIComponent(article.slug)}`,
    type: "article",
  });
}

export default async function ArticlePage(props: PageProps<"/articles/[slug]">) {
  const { slug } = await props.params;
  const article = await fetchArticleBySlug(slug);
  if (article === null) notFound();

  return (
    <article className={`container ${styles.article}`}>
      <Link href="/articles" className={styles.back}>
        cd ../writing
      </Link>
      <ArticleCover url={article.cover_url} alt={article.cover_alt} />
      <h1 className={styles.title}>{article.title}</h1>
      <time dateTime={article.published_at} className={styles.date}>
        {dateFormat.format(new Date(article.published_at))}
      </time>
      <div className={styles.content}>
        <MarkdownContent>{article.content ?? article.excerpt}</MarkdownContent>
      </div>
    </article>
  );
}
