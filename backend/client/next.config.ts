import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:5000/api/:path*", // https://api.demo.simplyeverything.com/api/:path*
      },
    ];
  },
};

export default nextConfig;
