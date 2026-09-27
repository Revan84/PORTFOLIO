import type { ReactNode } from "react";
import styles from "./FactList.module.css";

export interface Fact {
  label: string;
  value: ReactNode;
  highlight?: boolean;
}

interface FactListProps {
  facts: readonly Fact[];
  className?: string;
}

export function FactList({ facts, className }: FactListProps) {
  return (
    <dl className={`${styles.facts} ${className ?? ""}`}>
      {facts.map((fact) => (
        <div key={fact.label} className={styles.fact}>
          <dt>{fact.label}</dt>
          <dd className={fact.highlight ? styles.highlight : undefined}>{fact.value}</dd>
        </div>
      ))}
    </dl>
  );
}
