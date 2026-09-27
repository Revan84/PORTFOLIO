import { NextResponse, type NextRequest } from "next/server";
import {
  defaultLocale,
  isLocale,
  LOCALE_COOKIE,
  localeFromPathname,
  localizePath,
  negotiateLocale,
} from "./i18n/locales";

// Every page lives under app/[lang]. French URLs already carry their segment ("/fr/...");
// English ones do not, so they are rewritten to "/en/..." without the address bar changing.
// A visitor who picked French with the switch, or whose browser asks for French first, is
// sent from an English URL to its French version.
export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // "/en/..." is only the internal form: send it to the public URL.
  if (pathname === `/${defaultLocale}` || pathname.startsWith(`/${defaultLocale}/`)) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(defaultLocale.length + 1) || "/";
    return NextResponse.redirect(url, 308);
  }

  if (localeFromPathname(pathname) !== defaultLocale) return NextResponse.next();

  const cookie = request.cookies.get(LOCALE_COOKIE)?.value;
  const preferred =
    cookie !== undefined && isLocale(cookie)
      ? cookie
      : negotiateLocale(request.headers.get("accept-language"));
  if (preferred !== null && preferred !== defaultLocale) {
    return NextResponse.redirect(new URL(`${localizePath(preferred, pathname)}${search}`, request.url));
  }

  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Pages only: not Next.js or Vercel internals (analytics), the metadata routes at the app
  // root, or files (anything with a dot, such as /cv.pdf).
  matcher: ["/((?!_next/|_vercel/|opengraph-image|icon|robots\\.txt|sitemap\\.xml|.*\\.).*)"],
};
