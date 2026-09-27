import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";
import { ArticleCover } from "../../../components/ArticleCover";
import { fetchArticleBySlug } from "../../../services/articles";
import styles from "./article.module.css";

const dateFormat = new Intl.DateTimeFormat("en-GB", { dateStyle: "long" });

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
        <Markdown>{article.content ?? article.excerpt}</Markdown>
      </div>
    </article>
  );
}
