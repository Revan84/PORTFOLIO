import { profile } from "../../content/profile";
import type { StackLayer } from "../../types/stack";
import section from "./Section.module.css";
import { SectionLabel } from "./SectionLabel";
import { StackExplorer } from "./StackExplorer";

interface StackSectionProps {
  layers: StackLayer[];
}

export function StackSection({ layers }: StackSectionProps) {
  return (
    <section id="stack" className={section.section} aria-labelledby="stack-title">
      <div className={section.heading} data-reveal="">
        <SectionLabel index="03" path="stack" />
        <h2 id="stack-title" className={section.title} data-cursor="lens">
          The stack, top to bottom
        </h2>
      </div>
      <StackExplorer layers={layers} softSkills={profile.softSkills} />
    </section>
  );
}
