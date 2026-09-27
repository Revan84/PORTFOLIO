import Link from "next/link";
import { getDictionary } from "../i18n/dictionaries";
import { localizePath, type Locale } from "../i18n/locales";
import type { ArticlePreview } from "../types/article";
import styles from "./ArticleCard.module.css";
import { ArticleCover } from "./ArticleCover";

interface ArticleCardProps {
  article: ArticlePreview;
  locale: Locale;
}

export function ArticleCard({ article, locale }: ArticleCardProps) {
  const text = getDictionary(locale).articles;

  return (
    <article className={`card ${styles.card}`}>
      <ArticleCover url={article.cover_url} alt={article.cover_alt} />
      <h2 className={styles.title}>{article.title}</h2>
      <p className={styles.excerpt}>{article.excerpt}</p>
      <Link
        href={localizePath(locale, `/articles/${encodeURIComponent(article.slug)}`)}
        className={styles.link}
        aria-label={`${text.readLabel} ${article.title}`}
      >
        {text.read}
      </Link>
    </article>
  );
}
