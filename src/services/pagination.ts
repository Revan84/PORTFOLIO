import { localizePath, type Locale } from "../i18n/locales";

export const PAGE_SIZE = 6;

export function readTotal(contentRange: string | null): number {
  const match = contentRange?.match(/\/(\d+)$/);
  if (!match) {
    throw new Error(`Invalid Content-Range: ${contentRange}`);
  }
  return Number(match[1]);
}

export function countPages(total: number): number {
  return Math.max(1, Math.ceil(total / PAGE_SIZE));
}

export function articlesHref(locale: Locale, query: string, page: number): string {
  const params = new URLSearchParams();
  if (query !== "") params.set("q", query);
  if (page > 1) params.set("page", String(page));
  const search = params.toString();
  const path = localizePath(locale, "/articles");
  return search === "" ? path : `${path}?${search}`;
}
