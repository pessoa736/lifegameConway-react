import type { NextConfig } from "next";


const isGithubPages = process.env.GITHUB_ACTIONS || false;
const repo = isGithubPages ? '/lifegameConway-react' : ''

const nextConfig: NextConfig = {
  basePath: repo,
  assetPrefix: repo,
  env: {
    NEXT_PUBLIC_BASE_PATH: repo
  },
  output: (isGithubPages ?  "export" : undefined),
  reactStrictMode: true,
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
