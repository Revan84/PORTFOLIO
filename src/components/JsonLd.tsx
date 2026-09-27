interface JsonLdProps {
  data: Record<string, unknown>;
}

// Structured data for search engines (schema.org), as Next.js recommends: a JSON script tag.
// This is the one place the project uses dangerouslySetInnerHTML. The data is built in the
// code from src/content, never from a visitor or the database, and "<" is escaped so the JSON
// can never close the script tag.
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
