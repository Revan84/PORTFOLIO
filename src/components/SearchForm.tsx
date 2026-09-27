import Form from "next/form";
import styles from "./SearchForm.module.css";

interface SearchFormProps {
  query: string;
}

// A GET form: submitting navigates to /articles?q=... and drops the page, so a new search starts on page 1.
export function SearchForm({ query }: SearchFormProps) {
  return (
    <Form action="/articles" role="search" className={styles.form}>
      <div className={styles.field}>
        <label htmlFor="search-query" className={styles.label}>
          $ grep --title
        </label>
        <input
          key={query}
          id="search-query"
          className="input"
          type="search"
          name="q"
          defaultValue={query}
          placeholder="Search articles"
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Search
      </button>
    </Form>
  );
}
