import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { ArticleList } from "../../../components/ArticleList";
import { Pagination } from "../../../components/Pagination";
import { SearchForm } from "../../../components/SearchForm";
import { getDictionary } from "../../../i18n/dictionaries";
import { isLocale } from "../../../i18n/locales";
import { pageMetadata } from "../../../lib/metadata";
import { fetchArticles } from "../../../services/articles";
import { articlesHref, countPages } from "../../../services/pagination";
import { articlesSearchSchema } from "../../../types/search";
import styles from "./articles.module.css";

export async function generateMetadata(props: PageProps<"/[lang]/articles">): Promise<Metadata> {
  const { lang } = await props.params;
  if (!isLocale(lang)) return {};
  const text = getDictionary(lang).articles;
  return pageMetadata({ locale: lang, title: text.title, description: text.description, path: "/articles" });
}

export default async function ArticlesPage(props: PageProps<"/[lang]/articles">) {
  const { lang } = await props.params;
  if (!isLocale(lang)) notFound();
  const text = getDictionary(lang).articles;

  const { q, page } = articlesSearchSchema.parse(await props.searchParams);
  const { articles, total } = await fetchArticles(q, page, lang);
  const pageCount = countPages(total);
  if (page > pageCount) redirect(articlesHref(lang, q, pageCount));

  return (
    <div className="container">
      <p className="section-label">
        [06] <span>/writing</span>
      </p>
      <h1 className={styles.title} data-cursor="lens">{text.heading}</h1>
      <SearchForm query={q} locale={lang} />
      {articles.length === 0 ? (
        <p className={styles.empty}>{text.empty}</p>
      ) : (
        <>
          <ArticleList articles={articles} locale={lang} />
          <Pagination query={q} page={page} pageCount={pageCount} locale={lang} />
        </>
      )}
    </div>
  );
}
