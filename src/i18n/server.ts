import { lang } from "next/root-params";
import { defaultLocale, isLocale, type Locale } from "./locales";

// The language of the page being rendered, for the Server Components that receive no params
// (not-found files). Pages and layouts read it from their params instead.
export async function currentLocale(): Promise<Locale> {
  const value = await lang();
  return isLocale(value) ? value : defaultLocale;
}
