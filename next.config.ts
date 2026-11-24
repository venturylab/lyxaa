import type { NextConfig } from "next";
import { isSiteIndexable } from "./src/lib/indexing";

const previewRobots = { key: "X-Robots-Tag", value: "noindex, nofollow" };

const nextConfig: NextConfig = {
  poweredByHeader: false,
  devIndicators: false,
  async headers() {
    if (isSiteIndexable()) return [];
    return [
      { source: "/:path*", headers: [previewRobots] },
      { source: "/", headers: [previewRobots] },
    ];
  },
};

export default nextConfig;
