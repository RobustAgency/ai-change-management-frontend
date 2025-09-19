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
    ],
  },
  webpack: (config, { isServer, nextRuntime }) => {
    // Handle Node.js modules for client-side builds
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        https: false,
        http: false,
        net: false,
        tls: false,
        crypto: false,
        stream: false,
        url: false,
        zlib: false,
        querystring: false,
        path: false,
        os: false,
        util: false,
      };

      // Add externals to handle node: imports
      config.externals = config.externals || [];
      config.externals.push({
        'node:fs': 'commonjs node:fs',
        'node:https': 'commonjs node:https',
        'node:http': 'commonjs node:http',
        'node:crypto': 'commonjs node:crypto',
        'node:stream': 'commonjs node:stream',
        'node:url': 'commonjs node:url',
        'node:zlib': 'commonjs node:zlib',
        'node:querystring': 'commonjs node:querystring',
        'node:path': 'commonjs node:path',
        'node:os': 'commonjs node:os',
        'node:util': 'commonjs node:util',
      });
    }

    // For server builds, completely exclude pptxgenjs to prevent Node.js module issues
    if (isServer) {
      config.externals = config.externals || [];
      if (Array.isArray(config.externals)) {
        config.externals.push(({ request }: { request?: string }, callback: (error?: Error | null, result?: string) => void) => {
          if (request === 'pptxgenjs') {
            return callback(null, 'commonjs pptxgenjs');
          }
          return callback();
        });
      }
    }

    // Handle node: protocol imports with alias
    config.resolve.alias = {
      ...config.resolve.alias,
      'node:fs': false,
      'node:https': false,
      'node:http': false,
      'node:crypto': false,
      'node:stream': false,
      'node:url': false,
      'node:zlib': false,
      'node:querystring': false,
      'node:path': false,
      'node:os': false,
      'node:util': false,
    };

    return config;
  },
};

export default nextConfig;
