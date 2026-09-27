export interface LinkClick {
  href: string;
  target: string | null;
  download: boolean;
  // Any modifier key or a non-primary button: the visitor wants a new tab or window.
  modified: boolean;
}

// Where a link click should navigate with the transition, or null to let the browser and
// Next.js handle it as usual: other sites, new tabs, downloads, and links that stay on the
// current page (an anchor, or new search parameters such as the articles pagination).
export function transitionHref(click: LinkClick, current: URL): string | null {
  if (click.modified || click.download) return null;
  if (click.target !== null && click.target !== "" && click.target !== "_self") return null;

  let next: URL;
  try {
    next = new URL(click.href, current);
  } catch {
    return null;
  }
  if (next.origin !== current.origin) return null;
  if (next.pathname === current.pathname) return null;
  return `${next.pathname}${next.search}${next.hash}`;
}
