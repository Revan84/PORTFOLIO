import Form from "next/form";
import { getDictionary } from "../i18n/dictionaries";
import { localizePath, type Locale } from "../i18n/locales";
import styles from "./SearchForm.module.css";

interface SearchFormProps {
  query: string;
  locale: Locale;
}

// A GET form: submitting navigates to /articles?q=... and drops the page, so a new search starts on page 1.
export function SearchForm({ query, locale }: SearchFormProps) {
  const text = getDictionary(locale).articles;

  return (
    <Form action={localizePath(locale, "/articles")} role="search" className={styles.form}>
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
          placeholder={text.searchPlaceholder}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        {text.search}
      </button>
    </Form>
  );
}
