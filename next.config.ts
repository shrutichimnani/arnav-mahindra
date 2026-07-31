import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  allowedDevOrigins: ["10.5.50.63"], // 
  experimental: {
    scrollRestoration: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 2678400,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "imgd.aeplcdn.com",
      },
      {
        protocol: "https",
        hostname: "images.openai.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "bunny-wp-pullzone-cghvklkcns.b-cdn.net",
      },
      {
        protocol: "https",
        hostname: "www.hyundai.com",
      },
      {
        protocol: "https",
        hostname: "auto.mahindra.com",
      },
      {
        protocol: "https",
        hostname: "www.mahindraelectricsuv.com",
      },
      {
        protocol: "https",
        hostname: "stimg.cardekho.com",
      },
      {
        protocol: "https",
        hostname: "truckcdn.cardekho.com",
      },
      {
        protocol: "https",
        hostname: "media.licdn.com",
      },
    ],
  },
};

export default nextConfig;
