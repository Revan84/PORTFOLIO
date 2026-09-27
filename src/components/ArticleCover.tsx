import Image from "next/image";

interface ArticleCoverProps {
  url: string | null;
  alt: string | null;
}

// Covers come from any host stored in Supabase: served as is, without Next.js optimization.
export function ArticleCover({ url, alt }: ArticleCoverProps) {
  if (url === null) return null;
  return <Image src={url} alt={alt ?? ""} width={1200} height={630} unoptimized />;
}
