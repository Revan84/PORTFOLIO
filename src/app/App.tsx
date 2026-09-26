import { useState } from "react";
import { ArticleList } from "../components/ArticleList";
import { SearchForm } from "../components/SearchForm";
import { useArticles, type ArticlesState } from "../hooks/useArticles";

function ArticlesContent({ state }: { state: ArticlesState }) {
  switch (state.status) {
    case "loading":
      return <p role="status">Chargement des articles...</p>;
    case "error":
      return <p role="alert">{state.message}</p>;
    case "success":
      return state.articles.length === 0 ? (
        <p>Aucun article ne correspond à la recherche.</p>
      ) : (
        <ArticleList articles={state.articles} />
      );
  }
}

export default function App() {
  const [query, setQuery] = useState("");
  const state = useArticles(query);

  return (
    <main>
      <h1>Portfolio</h1>
      <SearchForm onSearch={setQuery} />
      <ArticlesContent state={state} />
    </main>
  );
}
