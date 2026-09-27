"use client";

import { useState } from "react";
import type { StackLayer } from "../../types/stack";
import styles from "./StackSection.module.css";

interface StackExplorerProps {
  layers: StackLayer[];
  softSkills: readonly string[];
  softSkillsLabel: string;
}

// Hovering or tapping a layer in the list lifts the matching plate in the pile.
export function StackExplorer({ layers, softSkills, softSkillsLabel }: StackExplorerProps) {
  const [active, setActive] = useState(0);

  return (
    <div className={styles.grid}>
      <div className={styles.pile} aria-hidden="true">
        {layers.map((layer, index) => (
          <div
            key={layer.code}
            className={`${styles.plate} ${index === active ? styles.active : ""}`}
            onMouseEnter={() => setActive(index)}
          >
            <span className={styles.plateLabel}>
              {layer.code} {layer.name}
            </span>
          </div>
        ))}
      </div>

      <div data-reveal="">
        <ol className={styles.layers}>
          {layers.map((layer, index) => (
            <li
              key={layer.code}
              className={`${styles.layer} ${index === active ? styles.active : ""}`}
              onMouseEnter={() => setActive(index)}
              onClick={() => setActive(index)}
            >
              <span className={styles.code}>{layer.code}</span>
              <div className={styles.layerBody}>
                <h3 className={styles.layerName}>{layer.name}</h3>
                <ul className={styles.tools}>
                  {layer.skills.map((skill) => (
                    <li key={skill.name} className="tag tag-neutral">
                      {skill.name}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
        <p className={styles.softSkills}>
          <strong>{softSkillsLabel}</strong> · {softSkills.join(", ")}
        </p>
      </div>
    </div>
  );
}
