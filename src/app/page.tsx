import { redirect } from "next/navigation";
import { ArticleList } from "../components/ArticleList";
import { Pagination } from "../components/Pagination";
import { SearchForm } from "../components/SearchForm";
import { fetchArticles } from "../services/articles";
import { articlesHref, countPages } from "../services/pagination";
import { articlesSearchSchema } from "../types/search";

export default async function HomePage(props: PageProps<"/">) {
  const { q, page } = articlesSearchSchema.parse(await props.searchParams);
  const { articles, total } = await fetchArticles(q, page);
  const pageCount = countPages(total);
  if (page > pageCount) redirect(articlesHref(q, pageCount));

  return (
    <>
      <h1>Articles</h1>
      <SearchForm query={q} />
      {articles.length === 0 ? (
        <p>Aucun article ne correspond à la recherche.</p>
      ) : (
        <>
          <ArticleList articles={articles} />
          <Pagination query={q} page={page} pageCount={pageCount} />
        </>
      )}
    </>
  );
}
