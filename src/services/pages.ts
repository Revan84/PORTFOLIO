import { pageListSchema, type Page } from "../types/page";
import { request } from "./http";
import { restUrl } from "./supabase";

export async function fetchPageBySlug(slug: string, signal?: AbortSignal): Promise<Page | null> {
  const url = restUrl("pages");
  url.searchParams.set("select", "id,title,slug,content,published_at");
  url.searchParams.set("slug", `eq.${slug}`);

  const response = await request(url, signal);
  const result = pageListSchema.safeParse(await response.json());
  if (!result.success) {
    throw new Error(`Invalid page response: ${result.error.message}`);
  }
  return result.data[0] ?? null;
}
