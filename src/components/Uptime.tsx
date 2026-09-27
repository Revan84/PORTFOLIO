"use client";

import { useEffect, useRef } from "react";
import { formatUptime } from "../lib/time";

interface UptimeProps {
  since: string;
  className?: string;
}

export function Uptime({ since, className }: UptimeProps) {
  const valueRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const start = new Date(since);
    const tick = () => {
      if (valueRef.current) valueRef.current.textContent = formatUptime(start, new Date());
    };
    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, [since]);

  return (
    <span>
      uptime{" "}
      <span ref={valueRef} className={className} suppressHydrationWarning>
        —
      </span>
    </span>
  );
}
