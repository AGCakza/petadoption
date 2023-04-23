const nextPWA = require('next-pwa')({
  dest: 'public'
})

/** @type {import('next').NextConfig} */
const nextConfig = nextPWA({

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'petty.agcakza.me',
        port: '',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/uploads/**',
      },
      {
        protocol: 'http',
        hostname: '192.168.1.101',
        port: '3000',
        pathname: '/uploads/**',
      },
    ],
  },
  experimental: {
    appDir: true, serverComponentsExternalPackages: ["mongoose"]
  },
  webpack(config) {
    config.experiments = { ...config.experiments, topLevelAwait: true }
    return config
  }
})

module.exports = nextConfig
