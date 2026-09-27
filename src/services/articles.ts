import {
  articleListSchema,
  articlePreviewListSchema,
  type Article,
  type ArticlePage,
} from "../types/article";
import { request } from "./http";
import { PAGE_SIZE, readTotal } from "./pagination";
import { restUrl } from "./supabase";

const PREVIEW_COLUMNS = "id,title,slug,excerpt,cover_url,cover_alt";
const ARTICLE_COLUMNS = `${PREVIEW_COLUMNS},content,published_at`;

export function buildArticlesUrl(query: string, page: number): URL {
  const url = restUrl("articles");
  url.searchParams.set("select", PREVIEW_COLUMNS);
  url.searchParams.set("order", "created_at.desc,id.desc");

  const term = query.trim();
  if (term !== "") {
    url.searchParams.set("title", `ilike.*${term}*`);
  }

  url.searchParams.set("limit", String(PAGE_SIZE));
  url.searchParams.set("offset", String((page - 1) * PAGE_SIZE));
  return url;
}

export async function fetchArticles(
  query: string,
  page: number,
  signal?: AbortSignal,
): Promise<ArticlePage> {
  const response = await request(buildArticlesUrl(query, page), signal, {
    Prefer: "count=exact",
  });

  const result = articlePreviewListSchema.safeParse(await response.json());
  if (!result.success) {
    throw new Error(`Invalid articles response: ${result.error.message}`);
  }
  return { articles: result.data, total: readTotal(response.headers.get("Content-Range")) };
}

export async function fetchArticleBySlug(
  slug: string,
  signal?: AbortSignal,
): Promise<Article | null> {
  const url = restUrl("articles");
  url.searchParams.set("select", ARTICLE_COLUMNS);
  url.searchParams.set("slug", `eq.${slug}`);

  const response = await request(url, signal);
  const result = articleListSchema.safeParse(await response.json());
  if (!result.success) {
    throw new Error(`Invalid article response: ${result.error.message}`);
  }
  return result.data[0] ?? null;
}
