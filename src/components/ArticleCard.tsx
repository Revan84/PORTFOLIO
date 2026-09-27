import Link from "next/link";
import type { ArticlePreview } from "../types/article";
import { ArticleCover } from "./ArticleCover";

interface ArticleCardProps {
  article: ArticlePreview;
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <article>
      <ArticleCover url={article.cover_url} alt={article.cover_alt} />
      <h2>{article.title}</h2>
      <p>{article.excerpt}</p>
      <Link
        href={`/articles/${encodeURIComponent(article.slug)}`}
        aria-label={`Lire l'article : ${article.title}`}
      >
        Lire l&apos;article
      </Link>
    </article>
  );
}
