import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    dangerouslyAllowSVG: true,
    domains: ["play-lh.googleusercontent.com", "api.dicebear.com"],
  },
  eslint: {
    ignoreDuringBuilds: true,
  }
};

export default nextConfig;
