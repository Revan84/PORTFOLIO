import { apiHeaders } from "./supabase";

// Public content changes rarely: Next.js keeps each response for 5 minutes.
export const REVALIDATE_SECONDS = 300;

export async function request(
  url: URL,
  signal?: AbortSignal,
  headers: Record<string, string> = {},
  acceptedStatuses: number[] = [],
): Promise<Response> {
  const response = await fetch(url, {
    headers: { ...apiHeaders, ...headers },
    signal,
    next: { revalidate: REVALIDATE_SECONDS },
  });
  if (!response.ok && !acceptedStatuses.includes(response.status)) {
    throw new Error(`HTTP ${response.status}`);
  }
  return response;
}
