import { softSkills, stackLayers } from "../../content/stack";
import section from "./Section.module.css";
import { SectionLabel } from "./SectionLabel";
import styles from "./StackSection.module.css";

// The hover interaction between the pile and the list arrives in step 4; the top layer is lit for now.
const ACTIVE_LAYER = 0;

export function StackSection() {
  return (
    <section id="stack" className={section.section} aria-labelledby="stack-title">
      <div className={section.heading}>
        <SectionLabel index="03" path="stack" />
        <h2 id="stack-title" className={section.title}>
          The stack, top to bottom
        </h2>
      </div>

      <div className={styles.grid}>
        <div className={styles.pile} aria-hidden="true">
          {stackLayers.map((layer, index) => (
            <div
              key={layer.code}
              className={`${styles.plate} ${index === ACTIVE_LAYER ? styles.active : ""}`}
            >
              <span className={styles.plateLabel}>
                {layer.code} {layer.name}
              </span>
            </div>
          ))}
        </div>

        <div>
          <ol className={styles.layers}>
            {stackLayers.map((layer, index) => (
              <li
                key={layer.code}
                className={`${styles.layer} ${index === ACTIVE_LAYER ? styles.active : ""}`}
              >
                <span className={styles.code}>{layer.code}</span>
                <div className={styles.layerBody}>
                  <h3 className={styles.layerName}>{layer.name}</h3>
                  <ul className={styles.tools}>
                    {layer.tools.map((tool) => (
                      <li key={tool} className="tag tag-neutral">
                        {tool}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
          <p className={styles.softSkills}>
            <strong>Soft skills</strong> · {softSkills.join(", ")}
          </p>
        </div>
      </div>
    </section>
  );
}
