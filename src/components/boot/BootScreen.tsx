"use client";

import { useEffect, useState } from "react";
import { BOOT_STORAGE_KEY, BOOTED_EVENT, isBooting } from "./bootFlag";
import styles from "./BootScreen.module.css";

const TICK_MS = 45;
const EXIT_MS = 950;
const BAR_CELLS = 25;

export interface BootLine {
  tag: string;
  text: string;
  // Printed once the counter reaches this percentage.
  at: number;
}

interface BootScreenProps {
  lines: BootLine[];
}

type Phase = "loading" | "exit" | "done";

// "booting quentin.os": a counter runs to 100 %, the boot log prints, then the screen
// wipes upwards. Shown once per session; a click or a key press skips it.
export function BootScreen({ lines }: BootScreenProps) {
  const [percent, setPercent] = useState(0);
  const [phase, setPhase] = useState<Phase>("loading");

  // Count up with an easing step: fast at first, slower near 100.
  useEffect(() => {
    if (phase !== "loading" || !isBooting()) return;
    const timer = setInterval(() => {
      setPercent((current) => {
        const step = Math.max(1, Math.round((100 - current) * (0.03 + Math.random() * 0.06)));
        return Math.min(100, current + step);
      });
    }, TICK_MS);
    return () => clearInterval(timer);
  }, [phase]);

  useEffect(() => {
    if (percent < 100 || phase !== "loading") return;
    const timer = setTimeout(() => setPhase("exit"), 380);
    return () => clearTimeout(timer);
  }, [percent, phase]);

  useEffect(() => {
    if (phase !== "exit") return;
    // The page shows through the wipe: let the effects waiting for the boot start now.
    window.dispatchEvent(new Event(BOOTED_EVENT));
    const timer = setTimeout(() => setPhase("done"), EXIT_MS);
    return () => clearTimeout(timer);
  }, [phase]);

  useEffect(() => {
    if (phase !== "done" || !isBooting()) return;
    try {
      sessionStorage.setItem(BOOT_STORAGE_KEY, "1");
    } catch {
      // Private browsing may refuse storage; the screen simply shows again next time.
    }
    delete document.documentElement.dataset.boot;
  }, [phase]);

  useEffect(() => {
    if (!isBooting()) return;
    const skip = () => setPhase((current) => (current === "loading" ? "exit" : current));
    window.addEventListener("keydown", skip);
    window.addEventListener("pointerdown", skip);
    return () => {
      window.removeEventListener("keydown", skip);
      window.removeEventListener("pointerdown", skip);
    };
  }, []);

  const filled = Math.round((percent / 100) * BAR_CELLS);
  const dim = percent < 10 ? "00" : percent < 100 ? "0" : "";

  return (
    <div
      className={`${styles.screen} ${phase === "exit" ? styles.exit : ""} ${phase === "done" ? styles.done : ""}`}
      aria-hidden="true"
    >
      <div className={styles.glow} />
      <div className={styles.inner}>
        <div className={styles.top}>
          <span className={styles.brand}>
            <span className={styles.monogram}>QE</span>quentin.os
          </span>
          <span className={styles.state}>
            <span className={styles.pulse} />
            booting
          </span>
        </div>

        <div className={styles.middle}>
          <div className={styles.counter}>
            <span className={styles.declaration}>
              <span className={styles.keyword}>const</span> <span className={styles.name}>loaded</span> ={" "}
              <span className={styles.comment}>{"// uint8"}</span>
            </span>
            <div className={styles.percent}>
              <span className={styles.dim}>{dim}</span>
              <span>{percent}</span>
              <span className={styles.sign}>%</span>
              <span className={`caret ${styles.caret}`} />
            </div>
            <span className={styles.bar}>
              <span className={styles.bracket}>[</span>
              <span className={styles.fill}>{"█".repeat(filled)}</span>
              <span className={styles.empty}>{"░".repeat(BAR_CELLS - filled)}</span>
              <span className={styles.bracket}>]</span>
              {"  "}0x{percent.toString(16).toUpperCase().padStart(2, "0")} / 0x64
            </span>
          </div>
          <div className={styles.log}>
            {lines
              .filter((line) => percent >= line.at)
              .map((line) => (
                <span key={line.text} className={styles.line}>
                  <span className={styles.tag}>{line.tag}</span>
                  <span>{line.text}</span>
                </span>
              ))}
          </div>
        </div>

        <div className={styles.bottom}>
          <div className={styles.track}>
            <div className={styles.progress} style={{ width: `${percent}%` }} />
          </div>
          <div className={styles.caption}>
            <span>Full-stack developer · Systems &amp; network architect</span>
            <span>Montpellier, FR · 43.61°N 3.88°E</span>
          </div>
        </div>
      </div>
    </div>
  );
}
