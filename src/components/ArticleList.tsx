import type { ArticlePreview } from "../types/article";
import { ArticleCard } from "./ArticleCard";
import styles from "./ArticleList.module.css";

interface ArticleListProps {
  articles: ArticlePreview[];
}

export function ArticleList({ articles }: ArticleListProps) {
  return (
    <ul className={styles.list}>
      {articles.map((article) => (
        <li key={article.id}>
          <ArticleCard article={article} />
        </li>
      ))}
    </ul>
  );
}
