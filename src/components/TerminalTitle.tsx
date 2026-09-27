import { ScrambleText } from "./ScrambleText";
import styles from "./TerminalTitle.module.css";

interface TerminalTitleProps {
  id?: string;
  // Shown on the first line; the last word gets the fade and the caret.
  lead: string;
  last: string;
  // The fake markup around the title, e.g. `h1 class="name"`.
  tag: string;
  className?: string;
}

// An h1 dressed as source code: `<h1 class="...">`, the words, a blinking caret, `</h1>`.
// The fake tags are CSS generated content, so the heading text is just the words, for
// search engines and screen readers alike.
export function TerminalTitle({ id, lead, last, tag, className }: TerminalTitleProps) {
  return (
    <h1 id={id} className={`${styles.title} ${className ?? ""}`} data-open-tag={`<${tag}>`}>
      {lead !== "" && (
        <>
          <ScrambleText text={lead} delay={120} className={`${styles.line} ${styles.word}`} lens />{" "}
        </>
      )}
      <span className={`${styles.line} ${styles.closingLine}`} data-close-tag={`</${tag.split(" ")[0]}>`}>
        <ScrambleText text={last} delay={420} className={`${styles.word} ${styles.fade}`} lens />
        <span className={`caret ${styles.caret}`} aria-hidden="true" />
      </span>
    </h1>
  );
}

// Splits a title so its last word carries the fade: "HomeApp Backend" → ["HomeApp", "Backend"].
export function splitTitle(title: string): { lead: string; last: string } {
  const words = title.trim().split(/\s+/);
  const last = words.pop() ?? "";
  return { lead: words.join(" "), last };
}
