import { publishedReferences } from "../../content/references";
import { getDictionary } from "../../i18n/dictionaries";
import type { Locale } from "../../i18n/locales";
import styles from "./ReferencesSection.module.css";
import section from "./Section.module.css";
import { SectionLabel } from "./SectionLabel";

interface ReferencesSectionProps {
  locale: Locale;
}

// Hidden while every quote is a draft. The carousel arrives in step 4.
export function ReferencesSection({ locale }: ReferencesSectionProps) {
  if (publishedReferences.length === 0) return null;

  return (
    <section className={`${section.section} ${section.split}`} aria-labelledby="references-title">
      <h2 id="references-title" className="visually-hidden">
        {getDictionary(locale).references.title}
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
