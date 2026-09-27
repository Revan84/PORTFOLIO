import { z } from "zod";
import { defaultLocale, type Locale } from "../i18n/locales";

const envSchema = z.object({
  SUPABASE_URL: z.url(),
  SUPABASE_PUBLISHABLE_KEY: z.string().startsWith("sb_publishable_"),
});

const env = envSchema.parse(process.env);

export const apiHeaders = { apikey: env.SUPABASE_PUBLISHABLE_KEY };

export function restUrl(table: string): URL {
  return new URL(`/rest/v1/${table}`, env.SUPABASE_URL);
}

// A PostgREST select list in a language. Translated columns have a "_fr" twin; in French the
// twin is read under the English name ("title:title_fr"), so both languages parse with the
// same schema.
export function selectColumns(
  columns: readonly string[],
  translated: readonly string[],
  locale: Locale,
): string {
  return columns
    .map((column) =>
      locale !== defaultLocale && translated.includes(column) ? `${column}:${column}_${locale}` : column,
    )
    .join(",");
}

// The column to search in a language: "title" or "title_fr".
export function localizedColumn(column: string, locale: Locale): string {
  return locale === defaultLocale ? column : `${column}_${locale}`;
}
