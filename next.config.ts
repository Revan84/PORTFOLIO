import { existsSync } from "node:fs";
import { join } from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Checked once at build time: serverless functions on Vercel do not ship public/,
  // so a runtime check would hide the CV button on pages rendered on demand.
  env: {
    CV_AVAILABLE: String(existsSync(join(process.cwd(), "public", "cv.pdf"))),
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
