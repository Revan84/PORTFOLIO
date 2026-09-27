import Link from "next/link";
import { articlesHref } from "../services/pagination";

interface PaginationProps {
  query: string;
  page: number;
  pageCount: number;
}

export function Pagination({ query, page, pageCount }: PaginationProps) {
  return (
    <nav aria-label="Pagination">
      {page > 1 ? (
        <Link href={articlesHref(query, page - 1)}>Page précédente</Link>
      ) : (
        <span aria-disabled="true">Page précédente</span>
      )}
      <span>
        Page {page} sur {pageCount}
      </span>
      {page < pageCount ? (
        <Link href={articlesHref(query, page + 1)}>Page suivante</Link>
      ) : (
        <span aria-disabled="true">Page suivante</span>
      )}
    </nav>
  );
}
