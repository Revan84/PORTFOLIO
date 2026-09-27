import Markdown, { type Components } from "react-markdown";
import { site } from "../content/site";
import { ExternalLink, isExternalUrl } from "./ExternalLink";

// Markdown from Supabase, with links to other sites opening in a new tab.
const components: Components = {
  a: ({ href, children }) =>
    href && isExternalUrl(href, site.url) ? (
      <ExternalLink href={href}>{children}</ExternalLink>
    ) : (
      <a href={href}>{children}</a>
    ),
};

interface MarkdownContentProps {
  children: string;
}

export function MarkdownContent({ children }: MarkdownContentProps) {
  return <Markdown components={components}>{children}</Markdown>;
}
