import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Disable Turbopack and just use standard webpack to avoid Windows native bindings issue
  transpilePackages: ['lucide-react', 'gsap'],
  // Disable experimental barrel optimization for lucide-react if it's causing issues
  experimental: {
    optimizePackageImports: [],
  }
};

export default nextConfig;
