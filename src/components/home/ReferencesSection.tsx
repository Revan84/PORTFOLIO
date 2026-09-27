import { publishedReferences } from "../../content/references";
import styles from "./ReferencesSection.module.css";
import section from "./Section.module.css";
import { SectionLabel } from "./SectionLabel";

// Hidden while every quote is a draft. The carousel arrives in step 4.
export function ReferencesSection() {
  if (publishedReferences.length === 0) return null;

  return (
    <section className={`${section.section} ${section.split}`} aria-labelledby="references-title">
      <h2 id="references-title" className="visually-hidden">
        References
      </h2>
      <SectionLabel index="04" path="references" className={section.labelOffset} />
      <div className={styles.quotes}>
        {publishedReferences.map((reference) => (
          <figure key={reference.quote} className={styles.figure}>
            <blockquote className={styles.quote}>“{reference.quote}”</blockquote>
            <figcaption className={styles.caption}>
              — {reference.author}, {reference.role}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
