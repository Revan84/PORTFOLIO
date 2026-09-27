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
  // Drops the wrapping paragraph, for a one-line text inside a list item or a sentence.
  inline?: boolean;
}

export function MarkdownContent({ children, inline = false }: MarkdownContentProps) {
  return (
    <Markdown
      components={components}
      disallowedElements={inline ? ["p"] : undefined}
      unwrapDisallowed={inline}
    >
      {children}
    </Markdown>
  );
}
