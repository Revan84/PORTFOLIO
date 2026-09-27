import Link from "next/link";
import { articlesHref } from "../services/pagination";
import styles from "./Pagination.module.css";

interface PaginationProps {
  query: string;
  page: number;
  pageCount: number;
}

export function Pagination({ query, page, pageCount }: PaginationProps) {
  return (
    <nav aria-label="Pagination" className={styles.nav}>
      {page > 1 ? (
        <Link href={articlesHref(query, page - 1)} className="btn btn-secondary">
          ← Previous page
        </Link>
      ) : (
        <span aria-disabled="true" className="btn btn-secondary">
          ← Previous page
        </span>
      )}
      <span className={styles.status}>
        {String(page).padStart(2, "0")} / {String(pageCount).padStart(2, "0")}
      </span>
      {page < pageCount ? (
        <Link href={articlesHref(query, page + 1)} className="btn btn-secondary">
          Next page →
        </Link>
      ) : (
        <span aria-disabled="true" className="btn btn-secondary">
          Next page →
        </span>
      )}
    </nav>
  );
}
