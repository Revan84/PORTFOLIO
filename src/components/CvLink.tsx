import { site } from "../content/site";

interface CvLinkProps {
  className?: string;
}

// Rendered only when public/cv.pdf existed at build time (see next.config.ts), so the header
// never links to a missing file. Adding the CV takes a new deployment.
export function CvLink({ className }: CvLinkProps) {
  if (process.env.CV_AVAILABLE !== "true") return null;

  return (
    <a href={site.cvPath} className={`btn btn-primary ${className ?? ""}`} download>
      cv.pdf ↓
    </a>
  );
}
