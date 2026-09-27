import Form from "next/form";

interface SearchFormProps {
  query: string;
}

// A GET form: submitting navigates to /?q=... and drops the page, so a new search starts on page 1.
export function SearchForm({ query }: SearchFormProps) {
  return (
    <Form action="/" role="search">
      <label htmlFor="search-query">Rechercher un article</label>
      <input key={query} id="search-query" type="search" name="q" defaultValue={query} />
      <button type="submit">Rechercher</button>
    </Form>
  );
}
