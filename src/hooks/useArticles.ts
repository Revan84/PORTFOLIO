import { useEffect, useState } from "react";
import { fetchArticles } from "../services/articles";
import type { ArticlePage } from "../types/article";

type Settled =
  | { status: "error"; message: string }
  | ({ status: "success" } & ArticlePage);
export type ArticlesState = { status: "loading" } | Settled;

export function useArticles(query: string, page: number): ArticlesState {
  const key = `${query}|${page}`;
  const [result, setResult] = useState<{ key: string; state: Settled } | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    fetchArticles(query, page, controller.signal)
      .then((articlePage): Settled => ({ status: "success", ...articlePage }))
      .catch((error: unknown): Settled => ({
        status: "error",
        message: error instanceof Error ? error.message : "Unknown error",
      }))
      .then((state) => {
        if (!controller.signal.aborted) setResult({ key: `${query}|${page}`, state });
      });
    return () => controller.abort();
  }, [query, page]);

  return result?.key === key ? result.state : { status: "loading" };
}
