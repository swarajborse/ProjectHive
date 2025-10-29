/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },
  
  images: {
    domains: ['localhost', 'avatars.githubusercontent.com', 'github.com'],
    formats: ['image/webp', 'image/avif'],
    // Netlify doesn't support Next.js Image Optimization by default
    unoptimized: true,
  },
  
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Disable X-Powered-By header
  poweredByHeader: false,
  
  // Enable strict mode
  reactStrictMode: true,
  
  // Handle trailing slashes
  trailingSlash: false,
  
  // Environment variables
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  
  // Webpack configuration for better compatibility
  webpack: (config, { dev, isServer }) => {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    
    return config;
  },
}

export default nextConfig