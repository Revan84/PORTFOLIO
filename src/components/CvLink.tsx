import { existsSync } from "node:fs";
import { join } from "node:path";
import { site } from "../content/site";

interface CvLinkProps {
  className?: string;
}

// Rendered only once public/cv.pdf exists, so the header never links to a missing file.
export function CvLink({ className }: CvLinkProps) {
  if (!existsSync(join(process.cwd(), "public", site.cvPath))) return null;

  return (
    <a href={site.cvPath} className={`btn btn-primary ${className ?? ""}`} download>
      cv.pdf ↓
    </a>
  );
}
