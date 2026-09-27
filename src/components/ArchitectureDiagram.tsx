import type { CaseStudy } from "../content/caseStudies";
import styles from "./ArchitectureDiagram.module.css";

interface ArchitectureDiagramProps {
  architecture: NonNullable<CaseStudy["architecture"]>;
}

export function ArchitectureDiagram({ architecture }: ArchitectureDiagramProps) {
  return (
    <div className={styles.diagram}>
      <ol className={styles.flow}>
        {architecture.nodes.map((node, index) => (
          <li key={node.kind} className={styles.step}>
            {index > 0 && <span className={styles.link} aria-hidden="true" />}
            <span className={`card ${styles.node} ${node.highlight ? styles.highlight : ""}`}>
              <span className={styles.kind}>{node.kind}</span>
              <span className={styles.nodeTitle}>{node.title}</span>
              <span className={styles.detail}>{node.detail}</span>
            </span>
          </li>
        ))}
      </ol>
      {architecture.host && (
        <p className={styles.host}>
          <span className={`tag tag-accent ${styles.hostTag}`}>{architecture.host.tag}</span>
          {architecture.host.text}
        </p>
      )}
    </div>
  );
}
