import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'mdksfodbznbnsncsyxng.supabase.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'ai.robustapps.dev',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'change-mgmt.robustapps.net',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
