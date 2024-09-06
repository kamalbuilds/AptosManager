/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // This allows any hostname
        port: '',
        pathname: '/**', // This allows any path
      },
    ],
  },
  experimental: {
    appDir: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  }
}

export default nextConfig
