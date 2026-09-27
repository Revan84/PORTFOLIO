import { useEffect, useState } from "react";
import type { Cache } from "./cache";

type Settled<T> = { status: "error"; message: string } | { status: "success"; data: T };
export type ResourceState<T> = { status: "loading" } | Settled<T>;

export function useResource<T>(
  key: string,
  load: (signal: AbortSignal) => Promise<T>,
  cache: Cache<T>,
): ResourceState<T> {
  const [result, setResult] = useState<{ key: string; state: Settled<T> } | null>(null);

  useEffect(() => {
    if (cache.get(key) !== undefined) return;
    const controller = new AbortController();
    load(controller.signal)
      .then((data): Settled<T> => {
        cache.set(key, data);
        return { status: "success", data };
      })
      .catch((error: unknown): Settled<T> => ({
        status: "error",
        message: error instanceof Error ? error.message : "Unknown error",
      }))
      .then((state) => {
        if (!controller.signal.aborted) setResult({ key, state });
      });
    return () => controller.abort();
  }, [key, load, cache]);

  if (result?.key === key) return result.state;
  const cached = cache.get(key);
  return cached === undefined ? { status: "loading" } : { status: "success", data: cached };
}
