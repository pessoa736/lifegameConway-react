import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.(png|jpg|gif|svg|woff2)$/,
      type: 'asset/resource',
    });
    return config;
  },
  productionBrowserSourceMaps: true,
  /* config options here */
  experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
  }
};

export default nextConfig;
