import { useId, useState, type FormEvent } from "react";

interface SearchFormProps {
  onSearch: (query: string) => void;
}

export function SearchForm({ onSearch }: SearchFormProps) {
  const [text, setText] = useState("");
  const inputId = useId();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSearch(text);
  }

  return (
    <form role="search" onSubmit={handleSubmit}>
      <label htmlFor={inputId}>Rechercher un article</label>
      <input
        id={inputId}
        type="search"
        value={text}
        onChange={(event) => setText(event.target.value)}
      />
      <button type="submit">Rechercher</button>
    </form>
  );
}
