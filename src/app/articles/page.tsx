import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { ArticleList } from "../../components/ArticleList";
import { Pagination } from "../../components/Pagination";
import { SearchForm } from "../../components/SearchForm";
import { pageMetadata } from "../../lib/metadata";
import { fetchArticles } from "../../services/articles";
import { articlesHref, countPages } from "../../services/pagination";
import { articlesSearchSchema } from "../../types/search";
import styles from "./articles.module.css";

export const metadata: Metadata = pageMetadata({
  title: "Writing",
  description: "Notes from the build: articles on web, mobile and self-hosted projects.",
  path: "/articles",
});

export default async function ArticlesPage(props: PageProps<"/articles">) {
  const { q, page } = articlesSearchSchema.parse(await props.searchParams);
  const { articles, total } = await fetchArticles(q, page);
  const pageCount = countPages(total);
  if (page > pageCount) redirect(articlesHref(q, pageCount));

  return (
    <div className="container">
      <p className="section-label">
        [06] <span>/writing</span>
      </p>
      <h1 className={styles.title} data-cursor="lens">Notes from the build</h1>
      <SearchForm query={q} />
      {articles.length === 0 ? (
        <p className={styles.empty}>No article matches this search.</p>
      ) : (
        <>
          <ArticleList articles={articles} />
          <Pagination query={q} page={page} pageCount={pageCount} />
        </>
      )}
    </div>
  );
}
