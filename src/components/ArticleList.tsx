import type { Locale } from "../i18n/locales";
import type { ArticlePreview } from "../types/article";
import { ArticleCard } from "./ArticleCard";
import styles from "./ArticleList.module.css";

interface ArticleListProps {
  articles: ArticlePreview[];
  locale: Locale;
}

export function ArticleList({ articles, locale }: ArticleListProps) {
  return (
    <ul className={styles.list}>
      {articles.map((article) => (
        <li key={article.id}>
          <ArticleCard article={article} locale={locale} />
        </li>
      ))}
    </ul>
  );
}
