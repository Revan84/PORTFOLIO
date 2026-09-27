import { useCallback } from "react";
import { fetchArticleBySlug } from "../services/articles";
import type { Article } from "../types/article";
import { createCache } from "./cache";
import { useResource, type ResourceState } from "./useResource";

const articleCache = createCache<Article | null>();

export type ArticleState = ResourceState<Article | null>;

export function useArticle(slug: string): ArticleState {
  const load = useCallback((signal: AbortSignal) => fetchArticleBySlug(slug, signal), [slug]);
  return useResource(slug, load, articleCache);
}
