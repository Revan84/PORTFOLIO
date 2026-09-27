"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "../hooks/useReducedMotion";
import styles from "./CustomCursor.module.css";

// Where the native cursor must stay: typing needs the text caret.
const TEXT_TARGETS = "input, textarea, [contenteditable='true']";
const LENS_TARGETS = "[data-cursor='lens']";
const LINK_TARGETS = "a, button, [role='button'], label, summary";
// How much of the remaining distance the ring covers each frame.
const FOLLOW = 0.18;

type CursorState = "default" | "link" | "lens" | "text";

function stateFor(target: EventTarget | null): { state: CursorState; link: boolean } {
  if (!(target instanceof Element)) return { state: "default", link: false };
  const link = target.closest(LINK_TARGETS) !== null;
  if (target.closest(TEXT_TARGETS)) return { state: "text", link };
  if (target.closest(LENS_TARGETS)) return { state: "lens", link };
  return { state: link ? "link" : "default", link };
}

// A diamond that sits on the pointer and a ring that trails it. The ring grows over links
// and turns into an inverting lens over the big titles. Only for a mouse or a trackpad:
// touch screens and pens keep their native behaviour.
export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!cursor || !dot || !ring) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const root = document.documentElement;
    root.dataset.cursor = "custom";

    const target = { x: -100, y: -100 };
    const trail = { x: -100, y: -100 };
    let frame = 0;

    const place = (element: HTMLElement, x: number, y: number) => {
      element.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };

    const follow = () => {
      trail.x += (target.x - trail.x) * FOLLOW;
      trail.y += (target.y - trail.y) * FOLLOW;
      place(ring, trail.x, trail.y);
      const settled = Math.abs(target.x - trail.x) < 0.1 && Math.abs(target.y - trail.y) < 0.1;
      frame = settled ? 0 : requestAnimationFrame(follow);
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      target.x = event.clientX;
      target.y = event.clientY;
      cursor.dataset.visible = "true";
      place(dot, target.x, target.y);
      if (reducedMotion) {
        trail.x = target.x;
        trail.y = target.y;
        place(ring, trail.x, trail.y);
      } else if (frame === 0) {
        frame = requestAnimationFrame(follow);
      }
    };

    const onOver = (event: PointerEvent) => {
      const { state, link } = stateFor(event.target);
      cursor.dataset.state = state;
      cursor.dataset.link = String(link);
    };

    const onDown = () => (cursor.dataset.pressed = "true");
    const onUp = () => (cursor.dataset.pressed = "false");
    const onLeave = () => (cursor.dataset.visible = "false");

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    document.documentElement.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(frame);
      delete root.dataset.cursor;
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [reducedMotion]);

  return (
    <div ref={cursorRef} className={styles.cursor} aria-hidden="true">
      <div ref={ringRef} className={styles.ringAnchor}>
        <div className={styles.ring} />
      </div>
      <div ref={dotRef} className={styles.dotAnchor}>
        <div className={styles.dot} />
      </div>
    </div>
  );
}
