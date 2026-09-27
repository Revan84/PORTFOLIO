"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import styles from "./RotatingRole.module.css";

const INTERVAL_MS = 2600;

interface RotatingRoleProps {
  roles: readonly string[];
}

// Cycles through the roles. Screen readers get the whole list once instead of a changing word.
export function RotatingRole({ roles }: RotatingRoleProps) {
  const [index, setIndex] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const timer = setInterval(() => setIndex((current) => (current + 1) % roles.length), INTERVAL_MS);
    return () => clearInterval(timer);
  }, [reducedMotion, roles.length]);

  return (
    <>
      <span className="visually-hidden">{roles.join(", ")}</span>
      <span key={index} className={styles.role} aria-hidden="true">
        {roles[reducedMotion ? 0 : index]}
      </span>
    </>
  );
}
