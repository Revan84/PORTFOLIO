import type { ArticlePreview } from "../types/article";
import { ArticleCover } from "./ArticleCover";

interface ArticleCardProps {
  article: ArticlePreview;
  onSelect: (slug: string) => void;
}

export function ArticleCard({ article, onSelect }: ArticleCardProps) {
  return (
    <article>
      <ArticleCover url={article.cover_url} alt={article.cover_alt} />
      <h2>{article.title}</h2>
      <p>{article.excerpt}</p>
      <button type="button" onClick={() => onSelect(article.slug)}>
        Lire l'article
      </button>
    </article>
  );
}
