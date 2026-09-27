import { useCallback } from "react";
import { fetchPageBySlug } from "../services/pages";
import type { Page } from "../types/page";
import { createCache } from "./cache";
import { useResource, type ResourceState } from "./useResource";

const pageCache = createCache<Page | null>();

export type PageState = ResourceState<Page | null>;

export function usePage(slug: string): PageState {
  const load = useCallback((signal: AbortSignal) => fetchPageBySlug(slug, signal), [slug]);
  return useResource(slug, load, pageCache);
}
