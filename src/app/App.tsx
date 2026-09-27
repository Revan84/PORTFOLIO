import { useState } from "react";
import { AboutView } from "../components/AboutView";
import { ArticleDetail } from "../components/ArticleDetail";
import { ArticleList } from "../components/ArticleList";
import { Pagination } from "../components/Pagination";
import { ProjectsView } from "../components/ProjectsView";
import { SearchForm } from "../components/SearchForm";
import { SiteNav, type View } from "../components/SiteNav";
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
      return state.data.articles.length === 0 ? (
        <p>Aucun article ne correspond à la recherche.</p>
      ) : (
        <>
          <ArticleList articles={state.data.articles} onSelect={onSelect} />
          <Pagination
            page={page}
            pageCount={countPages(state.data.total)}
            onPageChange={onPageChange}
          />
        </>
      );
  }
}

export default function App() {
  const [view, setView] = useState<View>("articles");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const state = useArticles(query, page);

  function handleNavigate(nextView: View) {
    setView(nextView);
    setSelectedSlug(null);
  }

  function handleSearch(nextQuery: string) {
    setQuery(nextQuery);
    setPage(1);
    setSelectedSlug(null);
  }

  return (
    <>
      <header>
        <h1>Portfolio</h1>
        <SiteNav current={view} onNavigate={handleNavigate} />
      </header>
      <main>
        {view === "projects" && <ProjectsView />}
        {view === "about" && <AboutView />}
        {view === "articles" && (
          <>
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
          </>
        )}
      </main>
    </>
  );
}
