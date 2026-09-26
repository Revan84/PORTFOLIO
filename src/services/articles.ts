import {
  articleListSchema,
  articlePreviewListSchema,
  type Article,
  type ArticlePreview,
} from "../types/article";
import { apiHeaders, restUrl } from "./supabase";

const PREVIEW_COLUMNS = "id,title,slug,excerpt,cover_url,cover_alt";
const ARTICLE_COLUMNS = `${PREVIEW_COLUMNS},content,published_at`;

async function getJson(url: URL, signal?: AbortSignal): Promise<unknown> {
  const response = await fetch(url, { headers: apiHeaders, signal });
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  return response.json();
}

export async function fetchArticles(
  query: string,
  signal?: AbortSignal,
): Promise<ArticlePreview[]> {
  const url = restUrl("articles");
  url.searchParams.set("select", PREVIEW_COLUMNS);
  url.searchParams.set("order", "created_at.desc,id.desc");

  const term = query.trim();
  if (term !== "") {
    url.searchParams.set("title", `ilike.*${term}*`);
  }

  const result = articlePreviewListSchema.safeParse(await getJson(url, signal));
  if (!result.success) {
    throw new Error(`Invalid articles response: ${result.error.message}`);
  }
  return result.data;
}

export async function fetchArticleBySlug(
  slug: string,
  signal?: AbortSignal,
): Promise<Article | null> {
  const url = restUrl("articles");
  url.searchParams.set("select", ARTICLE_COLUMNS);
  url.searchParams.set("slug", `eq.${slug}`);

  const result = articleListSchema.safeParse(await getJson(url, signal));
  if (!result.success) {
    throw new Error(`Invalid article response: ${result.error.message}`);
  }
  return result.data[0] ?? null;
}
