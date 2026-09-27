import type { Locale } from "../i18n/locales";
import {
  articleListSchema,
  articleSlugListSchema,
  articlePreviewListSchema,
  type Article,
  type ArticlePage,
} from "../types/article";
import { request } from "./http";
import { PAGE_SIZE, readTotal } from "./pagination";
import { localizedColumn, restUrl, selectColumns } from "./supabase";

const PREVIEW_COLUMNS = ["id", "title", "slug", "excerpt", "cover_url", "cover_alt"];
const ARTICLE_COLUMNS = [...PREVIEW_COLUMNS, "content", "published_at"];
const TRANSLATED = ["title", "excerpt", "content", "cover_alt"];

export function buildArticlesUrl(query: string, page: number, locale: Locale): URL {
  const url = restUrl("articles");
  url.searchParams.set("select", selectColumns(PREVIEW_COLUMNS, TRANSLATED, locale));
  url.searchParams.set("order", "created_at.desc,id.desc");

  // The search looks at the titles the visitor can read.
  const term = query.trim();
  if (term !== "") {
    url.searchParams.set(localizedColumn("title", locale), `ilike.*${term}*`);
  }

  url.searchParams.set("limit", String(PAGE_SIZE));
  url.searchParams.set("offset", String((page - 1) * PAGE_SIZE));
  return url;
}

export async function fetchArticles(
  query: string,
  page: number,
  locale: Locale,
  signal?: AbortSignal,
): Promise<ArticlePage> {
  // 416: the offset is past the last article. Supabase still sends the total (*/9).
  const response = await request(
    buildArticlesUrl(query, page, locale),
    signal,
    { Prefer: "count=exact" },
    [416],
  );
  const total = readTotal(response.headers.get("Content-Range"));
  if (response.status === 416) {
    return { articles: [], total };
  }

  const result = articlePreviewListSchema.safeParse(await response.json());
  if (!result.success) {
    throw new Error(`Invalid articles response: ${result.error.message}`);
  }
  return { articles: result.data, total };
}

// Every published slug, for static generation and the sitemap. RLS hides the drafts.
export async function fetchArticleSlugs(signal?: AbortSignal): Promise<string[]> {
  const url = restUrl("articles");
  url.searchParams.set("select", "slug");
  url.searchParams.set("order", "created_at.desc,id.desc");

  const response = await request(url, signal);
  const result = articleSlugListSchema.safeParse(await response.json());
  if (!result.success) {
    throw new Error(`Invalid article slugs response: ${result.error.message}`);
  }
  return result.data.map((row) => row.slug);
}

export async function fetchArticleBySlug(
  slug: string,
  locale: Locale,
  signal?: AbortSignal,
): Promise<Article | null> {
  const url = restUrl("articles");
  url.searchParams.set("select", selectColumns(ARTICLE_COLUMNS, TRANSLATED, locale));
  url.searchParams.set("slug", `eq.${slug}`);

  const response = await request(url, signal);
  const result = articleListSchema.safeParse(await response.json());
  if (!result.success) {
    throw new Error(`Invalid article response: ${result.error.message}`);
  }
  return result.data[0] ?? null;
}
