import type { NextConfig } from "next";


const isDeploy = process.env.NEXT_PUBLIC_DEPLOY === "true";
const isGithubPages = process.env.GITHUB_ACTIONS || false;

const nextConfig: NextConfig = {
  basePath: isGithubPages ? '/lifegameConway-react' : '',
  assetPrefix: isGithubPages ? '/lifegameConway-react/' : '',
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
