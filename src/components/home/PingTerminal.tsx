"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { ExternalLink } from "../ExternalLink";
import styles from "./ContactSection.module.css";

const LINE_DELAY_MS = 420;

interface PingTerminalProps {
  replies: readonly string[];
  links: { label: string; href: string }[];
}

// A fake shell: "run" prints the ping replies one line at a time.
export function PingTerminal({ replies, links }: PingTerminalProps) {
  const [shown, setShown] = useState(0);
  const [run, setRun] = useState(0);
  const reducedMotion = useReducedMotion();

  // One timeout per line: each printed line schedules the next until the replies run out.
  useEffect(() => {
    if (run === 0 || shown >= replies.length) return;
    const timer = setTimeout(() => setShown((count) => count + 1), reducedMotion ? 0 : LINE_DELAY_MS);
    return () => clearTimeout(timer);
  }, [run, shown, reducedMotion, replies.length]);

  const start = () => {
    setShown(0);
    setRun((count) => count + 1);
  };

  return (
    <div className={styles.screen}>
      <span>
        <span className={styles.dollar}>$</span> ping quentin
        <span className={`caret ${styles.terminalCaret}`} aria-hidden="true" />
      </span>
      <div role="log" aria-live="polite" className={styles.output}>
        {replies.slice(0, shown).map((reply) => (
          <span key={reply} className={styles.reply}>
            {reply}
          </span>
        ))}
      </div>
      <div className={styles.actions}>
        <button type="button" className="btn btn-primary" onClick={start}>
          ▸ run
        </button>
        {links.map((link) => (
          <ExternalLink key={link.label} href={link.href} className="btn btn-secondary">
            {link.label}
          </ExternalLink>
        ))}
      </div>
    </div>
  );
}
