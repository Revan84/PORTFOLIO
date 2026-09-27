import { notFound } from "next/navigation";

// The root layout sits under [lang], so there is no app-wide 404 for unknown URLs: this
// catch-all sends them to [lang]/not-found.tsx, inside the site's layout and language.
export default function MissingPage() {
  notFound();
}
