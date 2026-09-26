import { articlePreviewListSchema, type ArticlePreview } from "../types/article";
import { apiHeaders, restUrl } from "./supabase";

const PREVIEW_COLUMNS = "id,title,slug,excerpt,cover_url,cover_alt";

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

  const response = await fetch(url, { headers: apiHeaders, signal });
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  const result = articlePreviewListSchema.safeParse(await response.json());
  if (!result.success) {
    throw new Error(`Invalid articles payload: ${result.error.message}`);
  }

  return result.data;
}