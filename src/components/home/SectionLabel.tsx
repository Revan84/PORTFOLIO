interface SectionLabelProps {
  index: string;
  path: string;
  className?: string;
}

export function SectionLabel({ index, path, className }: SectionLabelProps) {
  return (
    <span className={`section-label ${className ?? ""}`}>
      [{index}] <span>/{path}</span>
    </span>
  );
}
