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
      {state.status === "success" && state.data === null && <p>Article introuvable.</p>}
      {state.status === "success" && state.data !== null && (
        <article>
          <ArticleCover url={state.data.cover_url} alt={state.data.cover_alt} />
          <h2>{state.data.title}</h2>
          <time dateTime={state.data.published_at}>
            {dateFormat.format(new Date(state.data.published_at))}
          </time>
          <Markdown>{state.data.content ?? state.data.excerpt}</Markdown>
        </article>
      )}
    </section>
  );
}
