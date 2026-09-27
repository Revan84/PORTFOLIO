import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The about text now lives on the home page.
  async redirects() {
    return [{ source: "/about", destination: "/#about", permanent: false }];
  },
};

export default nextConfig;
