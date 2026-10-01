import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  reactStrictMode: true,
  transpilePackages: ["swiper"],
  turbopack: {
    root: process.cwd(),
  },
  trailingSlash: true,
  // Development only. The static export has no rewrites; in production Apache /
  // LiteSpeed serves the PHP directly from public_html/api/.
  async rewrites() {
    if (process.env.NODE_ENV !== "development") {
      return { beforeFiles: [], afterFiles: [], fallback: [] };
    }

    return {
      // yarn php:api serves the public/ folder, mirroring public_html, so these
      // paths match production exactly.
      beforeFiles: [
        {
          source: "/api/mpurse.php",
          destination: "http://127.0.0.1:8088/api/mpurse.php",
        },
        {
          source: "/api/mpurse-webhook.php",
          destination: "http://127.0.0.1:8088/api/mpurse-webhook.php",
        },
        {
          source: "/submit.php",
          destination: "http://127.0.0.1:8088/submit.php",
        },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
};

export default nextConfig;
