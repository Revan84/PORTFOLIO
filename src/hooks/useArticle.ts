import { useEffect, useState } from "react";
import { fetchArticleBySlug } from "../services/articles";
import type { Article } from "../types/article";

type Settled =
  | { status: "error"; message: string }
  | { status: "success"; article: Article | null };
export type ArticleState = { status: "loading" } | Settled;

export function useArticle(slug: string): ArticleState {
  const [result, setResult] = useState<{ slug: string; state: Settled } | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    fetchArticleBySlug(slug, controller.signal)
      .then((article): Settled => ({ status: "success", article }))
      .catch((error: unknown): Settled => ({
        status: "error",
        message: error instanceof Error ? error.message : "Unknown error",
      }))
      .then((state) => {
        if (!controller.signal.aborted) setResult({ slug, state });
      });
    return () => controller.abort();
  }, [slug]);

  return result?.slug === slug ? result.state : { status: "loading" };
}
