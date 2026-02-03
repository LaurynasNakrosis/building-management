/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'unkey.dev',
      },
      {
        protocol: 'https',
        hostname: 'highstorm.app',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'www.google.com',
      },
      {
        protocol: 'https',
        hostname: 'www.jabdesign.co.uk',
      },
      {
        protocol: 'https',
        hostname: 'images.squarespace-cdn.com',
      },
    ],
  },
  webpack: (config, { isServer }) => {
    // Suppress webpack warnings about postcss-import resolution
    config.infrastructureLogging = {
      level: 'error',
    }

    // Filter out specific webpack warnings
    config.ignoreWarnings = [
      {
        module: /node_modules/,
        message: /Resolving 'postcss-import\/index'/,
      },
    ]

    return config
  },
}

export default nextConfig
