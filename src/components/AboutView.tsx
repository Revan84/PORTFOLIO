import Markdown from "react-markdown";
import { usePage } from "../hooks/usePage";

export function AboutView() {
  const state = usePage("about");

  switch (state.status) {
    case "loading":
      return <p role="status">Chargement de la page...</p>;
    case "error":
      return <p role="alert">{state.message}</p>;
    case "success":
      return state.data === null ? (
        <p>Page introuvable.</p>
      ) : (
        <article>
          <h2>{state.data.title}</h2>
          <Markdown>{state.data.content ?? ""}</Markdown>
        </article>
      );
  }
}
