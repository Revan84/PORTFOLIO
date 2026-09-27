import Link from "next/link";
import { getDictionary } from "../i18n/dictionaries";
import type { Locale } from "../i18n/locales";
import { articlesHref } from "../services/pagination";
import styles from "./Pagination.module.css";

interface PaginationProps {
  query: string;
  page: number;
  pageCount: number;
  locale: Locale;
}

export function Pagination({ query, page, pageCount, locale }: PaginationProps) {
  const text = getDictionary(locale).articles;

  return (
    <nav aria-label={text.pagination} className={styles.nav}>
      {page > 1 ? (
        <Link href={articlesHref(locale, query, page - 1)} className="btn btn-secondary">
          {text.previous}
        </Link>
      ) : (
        <span aria-disabled="true" className="btn btn-secondary">
          {text.previous}
        </span>
      )}
      <span className={styles.status}>
        {String(page).padStart(2, "0")} / {String(pageCount).padStart(2, "0")}
      </span>
      {page < pageCount ? (
        <Link href={articlesHref(locale, query, page + 1)} className="btn btn-secondary">
          {text.next}
        </Link>
      ) : (
        <span aria-disabled="true" className="btn btn-secondary">
          {text.next}
        </span>
      )}
    </nav>
  );
}
