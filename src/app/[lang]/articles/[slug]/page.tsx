import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleCover } from "../../../../components/ArticleCover";
import { MarkdownContent } from "../../../../components/MarkdownContent";
import { isLocale, localeFormats, localizePath } from "../../../../i18n/locales";
import { pageMetadata } from "../../../../lib/metadata";
import { fetchArticleBySlug, fetchArticleSlugs } from "../../../../services/articles";
import styles from "./article.module.css";

// Published articles are built ahead and refreshed every 5 minutes; a slug added later is
// rendered on its first visit. Without streaming, an unknown slug answers a real 404.
export const revalidate = 300;

// Built for each language of the layout; the slugs are the same in both.
export async function generateStaticParams() {
  const slugs = await fetchArticleSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata(props: PageProps<"/[lang]/articles/[slug]">): Promise<Metadata> {
  const { lang, slug } = await props.params;
  if (!isLocale(lang)) return {};
  const article = await fetchArticleBySlug(slug, lang);
  if (article === null) return {};
  return pageMetadata({
    locale: lang,
    title: article.title,
    description: article.excerpt,
    path: `/articles/${encodeURIComponent(article.slug)}`,
    type: "article",
  });
}

export default async function ArticlePage(props: PageProps<"/[lang]/articles/[slug]">) {
  const { lang, slug } = await props.params;
  if (!isLocale(lang)) notFound();
  const article = await fetchArticleBySlug(slug, lang);
  if (article === null) notFound();

  const dateFormat = new Intl.DateTimeFormat(localeFormats[lang].intl, { dateStyle: "long" });

  return (
    <article className={`container ${styles.article}`}>
      <Link href={localizePath(lang, "/articles")} className={styles.back}>
        cd ../writing
      </Link>
      <ArticleCover url={article.cover_url} alt={article.cover_alt} />
      <h1 className={styles.title}>{article.title}</h1>
      <time dateTime={article.published_at} className={styles.date}>
        {dateFormat.format(new Date(article.published_at))}
      </time>
      <div className={styles.content}>
        <MarkdownContent locale={lang}>{article.content ?? article.excerpt}</MarkdownContent>
      </div>
    </article>
  );
}
