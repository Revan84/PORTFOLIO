"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { BOOTED_EVENT, isBooting } from "./boot/bootFlag";
import styles from "./ScrambleText.module.css";

const GLYPHS = "01<>/{}=+*#$%&?!";
const TICK_MS = 45;
const SETTLE_MS = 380;
const STAGGER_MS = 85;
const START_STAGGER_MS = 40;

interface Frame {
  now: number;
  settleAt: number[];
  glyphs: string[];
}

interface ScrambleTextProps {
  text: string;
  delay?: number;
  className?: string;
  // Turns the custom cursor into its lens over the word.
  lens?: boolean;
}

const randomGlyph = () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)];

// Each letter flickers through code glyphs before settling, as if the word were being decoded.
// Hovering a letter scrambles it again. The real word stays available to assistive tech.
export function ScrambleText({ text, delay = 0, className, lens = false }: ScrambleTextProps) {
  const reducedMotion = useReducedMotion();
  const letters = [...text];
  const count = letters.length;
  const [frame, setFrame] = useState<Frame | null>(null);
  const originRef = useRef(0);
  const settleRef = useRef<number[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  // Letters hovered since the last tick; the tick gives them a new settle time.
  const hoveredRef = useRef(new Set<number>());

  // Ticks until every letter has settled, then stops.
  const run = useCallback(() => {
    if (timerRef.current !== null) return;
    const timer = setInterval(() => {
      const now = performance.now() - originRef.current;
      for (const index of hoveredRef.current) settleRef.current[index] = now + SETTLE_MS;
      hoveredRef.current.clear();
      const settleAt = [...settleRef.current];
      setFrame({ now, settleAt, glyphs: settleAt.map(randomGlyph) });
      if (settleAt.every((at) => now > at)) {
        clearInterval(timer);
        timerRef.current = null;
      }
    }, TICK_MS);
    timerRef.current = timer;
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const start = () => {
      originRef.current = performance.now();
      settleRef.current = Array.from({ length: count }, (_, index) => delay + SETTLE_MS + index * STAGGER_MS);
      run();
    };
    // Behind the boot screen the effect would play unseen: wait for it to leave.
    if (isBooting()) window.addEventListener(BOOTED_EVENT, start, { once: true });
    else start();
    return () => {
      window.removeEventListener(BOOTED_EVENT, start);
      if (timerRef.current !== null) clearInterval(timerRef.current);
      timerRef.current = null;
    };
  }, [reducedMotion, count, delay, run]);

  const rescramble = (index: number) => {
    if (reducedMotion || frame === null) return;
    hoveredRef.current.add(index);
    run();
  };

  return (
    <span className={className} data-cursor={lens ? "lens" : undefined}>
      <span className="visually-hidden">{text}</span>
      <span aria-hidden="true">
        {letters.map((letter, index) => {
          const settled = frame === null || frame.now > frame.settleAt[index];
          const started = frame !== null && frame.now > delay + index * START_STAGGER_MS;
          return (
            <span key={index} className={styles.letter} onMouseEnter={() => rescramble(index)}>
              <span className={settled ? undefined : styles.hidden}>{letter}</span>
              {!settled && started && <span className={styles.glyph}>{frame.glyphs[index]}</span>}
            </span>
          );
        })}
      </span>
    </span>
  );
}
