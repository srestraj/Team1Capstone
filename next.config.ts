import type { NextConfig } from "next";

const { NEXT_PUBLIC_SITE_PROTOCOL, NEXT_PUBLIC_SITE_NAME } = process.env;

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: (NEXT_PUBLIC_SITE_PROTOCOL || "https") as "http" | "https",
        hostname: NEXT_PUBLIC_SITE_NAME || "",
        pathname: "/**",
      },
      {
        protocol: (NEXT_PUBLIC_SITE_PROTOCOL || "https") as "http" | "https",
        hostname: "pexels.com",
        pathname: "/**",
      }
    ],
    formats: ["image/webp"]
  }
};

export default nextConfig;
