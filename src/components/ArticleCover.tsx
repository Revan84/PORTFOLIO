interface ArticleCoverProps {
  url: string | null;
  alt: string | null;
}

export function ArticleCover({ url, alt }: ArticleCoverProps) {
  if (url === null) return null;
  return <img src={url} alt={alt ?? ""} loading="lazy" />;
}
