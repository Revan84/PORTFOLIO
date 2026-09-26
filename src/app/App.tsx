import { useState } from "react";
import { ArticleDetail } from "../components/ArticleDetail";
import { ArticleList } from "../components/ArticleList";
import { SearchForm } from "../components/SearchForm";
import { useArticles, type ArticlesState } from "../hooks/useArticles";

interface ArticlesContentProps {
  state: ArticlesState;
  onSelect: (slug: string) => void;
}

function ArticlesContent({ state, onSelect }: ArticlesContentProps) {
  switch (state.status) {
    case "loading":
      return <p role="status">Chargement des articles...</p>;
    case "error":
      return <p role="alert">{state.message}</p>;
    case "success":
      return state.articles.length === 0 ? (
        <p>Aucun article ne correspond à la recherche.</p>
      ) : (
        <ArticleList articles={state.articles} onSelect={onSelect} />
      );
  }
}

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const state = useArticles(query);

  function handleSearch(nextQuery: string) {
    setQuery(nextQuery);
    setSelectedSlug(null);
  }

  return (
    <main>
      <h1>Portfolio</h1>
      <SearchForm onSearch={handleSearch} />
      {selectedSlug === null ? (
        <ArticlesContent state={state} onSelect={setSelectedSlug} />
      ) : (
        <ArticleDetail slug={selectedSlug} onClose={() => setSelectedSlug(null)} />
      )}
    </main>
  );
}
