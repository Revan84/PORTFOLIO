import { apiHeaders } from "./supabase";

export async function request(
  url: URL,
  signal?: AbortSignal,
  headers: Record<string, string> = {},
): Promise<Response> {
  const response = await fetch(url, { headers: { ...apiHeaders, ...headers }, signal });
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  return response;
}
