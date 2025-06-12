import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: { unoptimized: true },
  assetPrefix: '/golgappaking/',
  basePath: '/golgappaking',
};

export default nextConfig;
