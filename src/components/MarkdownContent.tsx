import Markdown, { type Components } from "react-markdown";
import { site } from "../content/site";
import type { Locale } from "../i18n/locales";
import { ExternalLink, isExternalUrl } from "./ExternalLink";

interface MarkdownContentProps {
  children: string;
  locale: Locale;
  // Drops the wrapping paragraph, for a one-line text inside a list item or a sentence.
  inline?: boolean;
}

// Markdown from Supabase, with links to other sites opening in a new tab.
export function MarkdownContent({ children, locale, inline = false }: MarkdownContentProps) {
  const components: Components = {
    a: ({ href, children: text }) =>
      href && isExternalUrl(href, site.url) ? (
        <ExternalLink href={href} locale={locale}>
          {text}
        </ExternalLink>
      ) : (
        <a href={href}>{text}</a>
      ),
  };

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
