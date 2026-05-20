import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Landing page is fully static — export for Vercel/CDN deployment.
  // Remove this line if you add API routes.
  output: "export",
  trailingSlash: false,
  images: {
    unoptimized: true, // Required for static export
  },
};

export default nextConfig;
