"use client";

interface InlineScriptProps {
  code: string;
}

// A script that runs while the server HTML is parsed, before the first paint. When React
// renders it in the browser instead (a client-rendered error or 404 page), a script tag would
// never run and React warns about it: there it becomes inert text/plain. This is the pattern
// from the Next.js guide "Preventing flash before hydration".
export function InlineScript({ code }: InlineScriptProps) {
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: code }}
    />
  );
}
