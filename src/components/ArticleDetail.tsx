import Markdown from "react-markdown";
import { useArticle } from "../hooks/useArticle";
import { ArticleCover } from "./ArticleCover";

interface ArticleDetailProps {
  slug: string;
  onClose: () => void;
}

const dateFormat = new Intl.DateTimeFormat("fr-FR", { dateStyle: "long" });

export function ArticleDetail({ slug, onClose }: ArticleDetailProps) {
  const state = useArticle(slug);

  return (
    <section aria-live="polite">
      <button type="button" onClick={onClose}>
        Retour à la liste
      </button>
      {state.status === "loading" && <p role="status">Chargement de l'article...</p>}
      {state.status === "error" && <p role="alert">{state.message}</p>}
      {state.status === "success" && state.article === null && <p>Article introuvable.</p>}
      {state.status === "success" && state.article !== null && (
        <article>
          <ArticleCover url={state.article.cover_url} alt={state.article.cover_alt} />
          <h2>{state.article.title}</h2>
          <time dateTime={state.article.published_at}>
            {dateFormat.format(new Date(state.article.published_at))}
          </time>
          <Markdown>{state.article.content ?? state.article.excerpt}</Markdown>
        </article>
      )}
    </section>
  );
}
