"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { coverScreen, revealScreen } from "./matrix";
import styles from "./MatrixTransition.module.css";
import { transitionHref } from "./navigation";

// If the new page never arrives (network error...), uncover the screen anyway.
const GIVE_UP_MS = 5000;
// Navigate even if the cover animation cannot run (a tab that is not painting).
const COVER_TIMEOUT_MS = 300;

const delay = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

// Plays the matrix transition between pages: a click on an internal link covers the screen,
// Next.js navigates underneath, and the new page is revealed once its pathname is live.
// Back / forward and links that stay on the current page navigate without it.
export function MatrixTransition() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();
  // Set while the screen is covered and the navigation is under way.
  const pendingRef = useRef(false);
  const giveUpRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (reducedMotion) return;

    const onClick = (event: MouseEvent) => {
      const canvas = canvasRef.current;
      if (!canvas || event.defaultPrevented || pendingRef.current) return;
      if (!(event.target instanceof Element)) return;
      const anchor = event.target.closest("a[href]");
      if (!(anchor instanceof HTMLAnchorElement)) return;

      const href = transitionHref(
        {
          href: anchor.href,
          target: anchor.getAttribute("target"),
          download: anchor.hasAttribute("download"),
          modified: event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey,
        },
        new URL(window.location.href),
      );
      if (href === null) return;

      // Runs before Next.js' own link handler, which skips prevented clicks.
      event.preventDefault();
      pendingRef.current = true;
      void Promise.race([coverScreen(canvas), delay(COVER_TIMEOUT_MS)]).then(() => {
        router.push(href);
        giveUpRef.current = setTimeout(() => {
          pendingRef.current = false;
          void revealScreen(canvas);
        }, GIVE_UP_MS);
      });
    };

    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, [reducedMotion, router]);

  // The new page is in place: wipe the cover away.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !pendingRef.current) return;
    pendingRef.current = false;
    if (giveUpRef.current !== null) clearTimeout(giveUpRef.current);
    // One frame for the new page to paint under the cover.
    requestAnimationFrame(() => void revealScreen(canvas));
  }, [pathname]);

  return <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />;
}
