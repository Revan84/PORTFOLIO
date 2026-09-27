import { useProjects } from "../hooks/useProjects";
import { ProjectList } from "./ProjectList";

export function ProjectsView() {
  const state = useProjects();

  switch (state.status) {
    case "loading":
      return <p role="status">Chargement des projets...</p>;
    case "error":
      return <p role="alert">{state.message}</p>;
    case "success":
      return state.data.length === 0 ? (
        <p>Aucun projet publié pour le moment.</p>
      ) : (
        <ProjectList projects={state.data} />
      );
  }
}
