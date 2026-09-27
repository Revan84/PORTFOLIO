import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The about text and the project list now live on the home page.
  async redirects() {
    return [
      { source: "/about", destination: "/#about", permanent: false },
      { source: "/projects", destination: "/#work", permanent: false },
    ];
  },
};

export default nextConfig;
