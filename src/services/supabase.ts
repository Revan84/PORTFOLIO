import { z } from "zod";

const envSchema = z.object({
  VITE_SUPABASE_URL: z.url(),
  VITE_SUPABASE_PUBLISHABLE_KEY: z.string().startsWith("sb_publishable_"),
});

const env = envSchema.parse(import.meta.env);

export const apiHeaders = { apikey: env.VITE_SUPABASE_PUBLISHABLE_KEY };

export function restUrl(table: string): URL {
  return new URL(`/rest/v1/${table}`, env.VITE_SUPABASE_URL);
}
