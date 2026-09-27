import { useCallback } from "react";
import { fetchArticles } from "../services/articles";
import type { ArticlePage } from "../types/article";
import { createCache } from "./cache";
import { useResource, type ResourceState } from "./useResource";

const articlesCache = createCache<ArticlePage>();

export type ArticlesState = ResourceState<ArticlePage>;

export function useArticles(query: string, page: number): ArticlesState {
  const load = useCallback(
    (signal: AbortSignal) => fetchArticles(query, page, signal),
    [query, page],
  );
  return useResource(`${query.trim()}|${page}`, load, articlesCache);
}
