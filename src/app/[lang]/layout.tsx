import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BOOT_FLAG_SCRIPT } from "../../components/boot/bootFlag";
import { BootScreen, type BootLine } from "../../components/boot/BootScreen";
import { CustomCursor } from "../../components/CustomCursor";
import { InlineScript } from "../../components/InlineScript";
import { SiteFooter } from "../../components/SiteFooter";
import { SiteHeader } from "../../components/SiteHeader";
import { MatrixTransition } from "../../components/transition/MatrixTransition";
import { site, siteText } from "../../content/site";
import { getDictionary } from "../../i18n/dictionaries";
import { isLocale, localeFormats, locales, localizePath } from "../../i18n/locales";
import { languageAlternates } from "../../lib/metadata";
import { inter, jetbrainsMono, martianMono } from "../fonts";
import "../globals.css";

// Both languages are built ahead. No `dynamicParams = false` here: child segments inherit it,
// and it would stop articles and projects added later from rendering on their first visit.
// src/proxy.ts only lets "en" and "fr" through, and the layout checks it again.
export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata(props: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await props.params;
  if (!isLocale(lang)) return {};
  const { title, description } = siteText[lang];
  return {
    metadataBase: new URL(site.url),
    title: { default: title, template: `%s · ${site.name}` },
    description,
    alternates: { canonical: localizePath(lang, "/"), languages: languageAlternates("/") },
    openGraph: {
      type: "website",
      siteName: site.name,
      title,
      description,
      url: localizePath(lang, "/"),
      locale: localeFormats[lang].openGraph,
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

const bootLines: BootLine[] = [
  { tag: ">", text: "booting quentin.os v2026.09", at: 0 },
  { tag: "[ ok ]", text: "loading /experience · git log", at: 22 },
  { tag: "[ ok ]", text: "mounting /stack · 6 layers", at: 45 },
  { tag: "[ ok ]", text: "connecting mqtt://montpellier", at: 68 },
  { tag: "[ ok ]", text: "compiling /work", at: 86 },
  { tag: "[ ok ]", text: "ready", at: 100 },
];

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dictionary = getDictionary(lang);

  return (
    // The boot script sets data-boot on <html> before React hydrates.
    <html
      lang={lang}
      className={`${inter.variable} ${jetbrainsMono.variable} ${martianMono.variable}`}
      // Smooth scrolling for in-page anchors only, not when Next.js changes route.
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body>
        <InlineScript code={BOOT_FLAG_SCRIPT} />
        <a href="#content" className="skip-link">
          {dictionary.skipLink}
        </a>
        <BootScreen lines={bootLines} caption={dictionary.boot.caption} />
        <SiteHeader locale={lang} />
        <main id="content" className="page">
          {children}
        </main>
        <SiteFooter locale={lang} />
        <MatrixTransition />
        <CustomCursor />
        {/* Vercel Web Analytics: page views and visitors, cookieless. Sends nothing outside Vercel. */}
        <Analytics />
        {/* Vercel Speed Insights: Core Web Vitals measured on real visits. */}
        <SpeedInsights />
      </body>
    </html>
  );
}
