import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  sassOptions: {
    // Lets `@use "sass-mq"` resolve straight from node_modules.
    loadPaths: [path.join(process.cwd(), "node_modules")],
  },
};

export default nextConfig;
