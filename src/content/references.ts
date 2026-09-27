export interface Reference {
  quote: string;
  author: string;
  role: string;
  // Drafts stay out of the page until a real quote replaces the placeholder.
  draft: boolean;
}

export const references: Reference[] = [
  {
    quote:
      "Placeholder: a short quote from a former manager about Quentin's reliability and range, from interface to server.",
    author: "Name Surname",
    role: "Role · Company",
    draft: true,
  },
  {
    quote: "Placeholder: a second quote from a colleague or client about working with Quentin.",
    author: "Name Surname",
    role: "Role · Company",
    draft: true,
  },
];

export const publishedReferences = references.filter((reference) => !reference.draft);
