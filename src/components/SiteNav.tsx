export type View = "articles" | "projects" | "about";

const LINKS: { view: View; label: string }[] = [
  { view: "articles", label: "Articles" },
  { view: "projects", label: "Projets" },
  { view: "about", label: "À propos" },
];

interface SiteNavProps {
  current: View;
  onNavigate: (view: View) => void;
}

export function SiteNav({ current, onNavigate }: SiteNavProps) {
  return (
    <nav aria-label="Navigation principale">
      <ul>
        {LINKS.map((link) => (
          <li key={link.view}>
            <button
              type="button"
              aria-current={link.view === current ? "page" : undefined}
              onClick={() => onNavigate(link.view)}
            >
              {link.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
