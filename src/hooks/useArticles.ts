import { useEffect, useState } from "react";
import { fetchArticles } from "../services/articles";
import type { ArticlePreview } from "../types/article";

type Settled =
  | { status: "error"; message: string }
  | { status: "success"; articles: ArticlePreview[] };
export type ArticlesState = { status: "loading" } | Settled;

export function useArticles(query: string): ArticlesState {
  const [result, setResult] = useState<{ query: string; state: Settled } | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    fetchArticles(query, controller.signal)
      .then((articles): Settled => ({ status: "success", articles }))
      .catch((error: unknown): Settled => ({
        status: "error",
        message: error instanceof Error ? error.message : "Unknown error",
      }))
      .then((state) => {
        if (!controller.signal.aborted) setResult({ query, state });
      });
    return () => controller.abort();
  }, [query]);

  return result?.query === query ? result.state : { status: "loading" };
}
