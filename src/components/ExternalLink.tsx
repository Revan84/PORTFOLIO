import type { AnchorHTMLAttributes, ReactNode } from "react";

interface ExternalLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "target" | "rel"> {
  href: string;
  children: ReactNode;
}

// Opens another site in a new tab. `noopener noreferrer` keeps that site from reaching back
// into this page, and screen readers hear that a new tab will open.
export function ExternalLink({ href, children, ...rest }: ExternalLinkProps) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
      {children}
      <span className="visually-hidden"> (opens in a new tab)</span>
    </a>
  );
}

// True for http(s) links that leave this site; relative links, anchors and mailto: stay put.
export function isExternalUrl(href: string, siteUrl: string): boolean {
  if (!/^https?:\/\//i.test(href)) return false;
  return new URL(href).host !== new URL(siteUrl).host;
}
