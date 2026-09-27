import { z } from "zod";

const envSchema = z.object({
  SUPABASE_URL: z.url(),
  SUPABASE_PUBLISHABLE_KEY: z.string().startsWith("sb_publishable_"),
});

const env = envSchema.parse(process.env);

export const apiHeaders = { apikey: env.SUPABASE_PUBLISHABLE_KEY };

export function restUrl(table: string): URL {
  return new URL(`/rest/v1/${table}`, env.SUPABASE_URL);
}
