// English lives at the root ("/projects/homeapp"), French under "/fr" ("/fr/projects/homeapp").
// Internally every route sits under app/[lang]: src/proxy.ts rewrites the English URLs to
// "/en/...", which never shows in the address bar.
export const locales = ["en", "fr"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

// Remembers the language the visitor picked with the switch, read by src/proxy.ts.
export const LOCALE_COOKIE = "lang";

// `intl` formats dates, `openGraph` labels the share previews.
export const localeFormats: Record<Locale, { intl: string; openGraph: string }> = {
  en: { intl: "en-GB", openGraph: "en_GB" },
  fr: { intl: "fr-FR", openGraph: "fr_FR" },
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

// The public URL of a path in a language. `path` is the English one and starts with "/";
// it may carry a query or a hash: "/#work" becomes "/fr#work".
export function localizePath(locale: Locale, path: string): string {
  if (locale === defaultLocale) return path;
  if (path === "/") return `/${locale}`;
  return path.startsWith("/#") || path.startsWith("/?") ? `/${locale}${path.slice(1)}` : `/${locale}${path}`;
}

// The language of a public pathname: "/fr" and "/fr/..." are French, everything else English.
export function localeFromPathname(pathname: string): Locale {
  for (const locale of locales) {
    if (locale !== defaultLocale && (pathname === `/${locale}` || pathname.startsWith(`/${locale}/`))) {
      return locale;
    }
  }
  return defaultLocale;
}

// The English path behind a public pathname: "/fr/articles" → "/articles", "/fr" → "/".
export function stripLocale(pathname: string): string {
  const locale = localeFromPathname(pathname);
  if (locale === defaultLocale) return pathname;
  const rest = pathname.slice(locale.length + 1);
  return rest === "" ? "/" : rest;
}

// The visitor's preferred supported language from an Accept-Language header, or null when
// it names none of them. "fr-FR,fr;q=0.9,en;q=0.8" → "fr".
export function negotiateLocale(header: string | null): Locale | null {
  if (header === null) return null;
  const ranked = header
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().split(";");
      const quality = params.find((param) => param.trim().startsWith("q="));
      return { language: tag.trim().toLowerCase().split("-")[0], q: quality ? Number(quality.trim().slice(2)) : 1 };
    })
    .filter((entry) => entry.q > 0 && !Number.isNaN(entry.q))
    .sort((a, b) => b.q - a.q);
  return ranked.map((entry) => entry.language).find(isLocale) ?? null;
}
