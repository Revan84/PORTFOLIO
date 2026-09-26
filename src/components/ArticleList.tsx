import type { ArticlePreview } from "../types/article";
import { ArticleCard } from "./ArticleCard";

interface ArticleListProps {
  articles: ArticlePreview[];
  onSelect: (slug: string) => void;
}

export function ArticleList({ articles, onSelect }: ArticleListProps) {
  return (
    <ul>
      {articles.map((article) => (
        <li key={article.id}>
          <ArticleCard article={article} onSelect={onSelect} />
        </li>
      ))}
    </ul>
  );
}
