import { profileText } from "../../content/profile";
import { getDictionary } from "../../i18n/dictionaries";
import type { Locale } from "../../i18n/locales";
import type { StackLayer } from "../../types/stack";
import section from "./Section.module.css";
import { SectionLabel } from "./SectionLabel";
import { StackExplorer } from "./StackExplorer";

interface StackSectionProps {
  layers: StackLayer[];
  locale: Locale;
}

export function StackSection({ layers, locale }: StackSectionProps) {
  const text = getDictionary(locale).stack;

  return (
    <section id="stack" className={section.section} aria-labelledby="stack-title">
      <div className={section.heading} data-reveal="">
        <SectionLabel index="03" path="stack" />
        <h2 id="stack-title" className={section.title} data-cursor="lens">
          {text.title}
        </h2>
      </div>
      <StackExplorer
        layers={layers}
        softSkills={profileText[locale].softSkills}
        softSkillsLabel={text.softSkills}
      />
    </section>
  );
}
