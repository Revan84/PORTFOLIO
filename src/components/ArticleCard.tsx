import Link from "next/link";
import type { ArticlePreview } from "../types/article";
import styles from "./ArticleCard.module.css";
import { ArticleCover } from "./ArticleCover";

interface ArticleCardProps {
  article: ArticlePreview;
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <article className={`card ${styles.card}`}>
      <ArticleCover url={article.cover_url} alt={article.cover_alt} />
      <h2 className={styles.title}>{article.title}</h2>
      <p className={styles.excerpt}>{article.excerpt}</p>
      <Link
        href={`/articles/${encodeURIComponent(article.slug)}`}
        className={styles.link}
        aria-label={`Read the article: ${article.title}`}
      >
        read →
      </Link>
    </article>
  );
}
