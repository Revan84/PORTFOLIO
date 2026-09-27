"use client";

import { useEffect, useRef } from "react";
import { formatParisTime } from "../lib/time";

interface NavClockProps {
  className?: string;
}

// Writes the time straight into the DOM once a second instead of re-rendering React.
export function NavClock({ className }: NavClockProps) {
  const timeRef = useRef<HTMLTimeElement>(null);

  useEffect(() => {
    const tick = () => {
      if (timeRef.current) timeRef.current.textContent = formatParisTime(new Date());
    };
    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <span className={className}>
      MTP{" "}
      <time ref={timeRef} suppressHydrationWarning>
        --:--:--
      </time>
    </span>
  );
}
