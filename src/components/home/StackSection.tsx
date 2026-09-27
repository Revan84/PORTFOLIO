import { softSkills, stackLayers } from "../../content/stack";
import section from "./Section.module.css";
import { SectionLabel } from "./SectionLabel";
import { StackExplorer } from "./StackExplorer";

export function StackSection() {
  return (
    <section id="stack" className={section.section} aria-labelledby="stack-title">
      <div className={section.heading} data-reveal="">
        <SectionLabel index="03" path="stack" />
        <h2 id="stack-title" className={section.title} data-cursor="lens">
          The stack, top to bottom
        </h2>
      </div>
      <StackExplorer layers={stackLayers} softSkills={softSkills} />
    </section>
  );
}
