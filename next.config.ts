import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: ["i.imgur.com"], // Thêm hostname của ảnh ở đây
  },
};

export default nextConfig;
