import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  reactStrictMode: true,
  transpilePackages: ["swiper"],
  turbopack: {
    root: process.cwd(),
  },
  trailingSlash: true,
  async rewrites() {
    if (process.env.NODE_ENV !== "development") {
      return { beforeFiles: [], afterFiles: [], fallback: [] };
    }

    return {
      beforeFiles: [
        {
          source: "/api/mpurse.php",
          destination: "http://127.0.0.1:8093/mpurse.php",
        },
        {
          source: "/api/mpurse-webhook.php",
          destination: "http://127.0.0.1:8093/mpurse-webhook.php",
        },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
};

export default nextConfig;
