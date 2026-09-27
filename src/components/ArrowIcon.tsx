interface ArrowIconProps {
  size: number;
  className?: string;
}

// Phosphor "arrow-right", the design system's icon set.
export function ArrowIcon({ size, className }: ArrowIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 256 256"
      fill="var(--color-accent)"
      aria-hidden="true"
      className={className}
    >
      <path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z" />
    </svg>
  );
}
