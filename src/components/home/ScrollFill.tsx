"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import styles from "./ScrollFill.module.css";

interface ScrollFillProps {
  children: ReactNode;
  className?: string;
}

// The text lights up from left to right as it scrolls through the viewport,
// driven by the --fill custom property. Without JavaScript it stays fully lit.
export function ScrollFill({ children, className }: ScrollFillProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const element = ref.current;
    if (!element || reducedMotion) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const box = element.getBoundingClientRect();
      const progress = (window.innerHeight * 0.85 - box.top) / (box.height + window.innerHeight * 0.35);
      element.style.setProperty("--fill", `${(Math.min(1, Math.max(0, progress)) * 100).toFixed(1)}%`);
    };
    const onScroll = () => {
      if (frame === 0) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      element.style.removeProperty("--fill");
    };
  }, [reducedMotion]);

  return (
    <p ref={ref} className={className}>
      <span className={styles.fill}>{children}</span>
    </p>
  );
}
