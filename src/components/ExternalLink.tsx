import type { AnchorHTMLAttributes, ReactNode } from "react";
import type { Locale } from "../i18n/locales";

// Kept here rather than in the dictionaries: client components render this link too, and
// they should not ship every interface text.
const NEW_TAB: Record<Locale, string> = {
  en: "(opens in a new tab)",
  fr: "(s'ouvre dans un nouvel onglet)",
};

interface ExternalLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "target" | "rel"> {
  href: string;
  locale: Locale;
  children: ReactNode;
}

// Opens another site in a new tab. `noopener noreferrer` keeps that site from reaching back
// into this page, and screen readers hear that a new tab will open.
export function ExternalLink({ href, locale, children, ...rest }: ExternalLinkProps) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
      {children}
      <span className="visually-hidden"> {NEW_TAB[locale]}</span>
    </a>
  );
}

// True for http(s) links that leave this site; relative links, anchors and mailto: stay put.
export function isExternalUrl(href: string, siteUrl: string): boolean {
  if (!/^https?:\/\//i.test(href)) return false;
  return new URL(href).host !== new URL(siteUrl).host;
}
