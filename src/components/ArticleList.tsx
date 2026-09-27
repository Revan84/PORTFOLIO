import type { ArticlePreview } from "../types/article";
import { ArticleCard } from "./ArticleCard";

interface ArticleListProps {
  articles: ArticlePreview[];
}

export function ArticleList({ articles }: ArticleListProps) {
  return (
    <ul>
      {articles.map((article) => (
        <li key={article.id}>
          <ArticleCard article={article} />
        </li>
      ))}
    </ul>
  );
}
