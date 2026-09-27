import { existsSync } from "node:fs";
import { join } from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Checked once at build time: serverless functions on Vercel do not ship public/,
  // so a runtime check would hide the CV button on pages rendered on demand.
  env: {
    CV_AVAILABLE: String(existsSync(join(process.cwd(), "public", "cv.pdf"))),
  },
  // Hardening headers on every response. HSTS is already sent by Vercel. A full script CSP
  // would need nonces (the inline boot script, Next.js' own scripts), so the CSP here only
  // forbids framing the site.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Content-Security-Policy", value: "frame-ancestors 'none'" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
          },
        ],
      },
    ];
  },
  // The about text and the project list now live on the home page.
  async redirects() {
    return [
      { source: "/about", destination: "/#about", permanent: false },
      { source: "/projects", destination: "/#work", permanent: false },
    ];
  },
};

export default nextConfig;
