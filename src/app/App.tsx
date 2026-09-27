import { useState } from "react";
import { ArticleDetail } from "../components/ArticleDetail";
import { ArticleList } from "../components/ArticleList";
import { Pagination } from "../components/Pagination";
import { SearchForm } from "../components/SearchForm";
import { useArticles, type ArticlesState } from "../hooks/useArticles";
import { countPages } from "../services/pagination";

interface ArticlesContentProps {
  state: ArticlesState;
  page: number;
  onSelect: (slug: string) => void;
  onPageChange: (page: number) => void;
}

function ArticlesContent({ state, page, onSelect, onPageChange }: ArticlesContentProps) {
  switch (state.status) {
    case "loading":
      return <p role="status">Chargement des articles...</p>;
    case "error":
      return <p role="alert">{state.message}</p>;
    case "success":
      return state.articles.length === 0 ? (
        <p>Aucun article ne correspond à la recherche.</p>
      ) : (
        <>
          <ArticleList articles={state.articles} onSelect={onSelect} />
          <Pagination
            page={page}
            pageCount={countPages(state.total)}
            onPageChange={onPageChange}
          />
        </>
      );
  }
}

export default function App() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const state = useArticles(query, page);

  function handleSearch(nextQuery: string) {
    setQuery(nextQuery);
    setPage(1);
    setSelectedSlug(null);
  }

  return (
    <main>
      <h1>Portfolio</h1>
      <SearchForm onSearch={handleSearch} />
      {selectedSlug === null ? (
        <ArticlesContent
          state={state}
          page={page}
          onSelect={setSelectedSlug}
          onPageChange={setPage}
        />
      ) : (
        <ArticleDetail slug={selectedSlug} onClose={() => setSelectedSlug(null)} />
      )}
    </main>
  );
}
