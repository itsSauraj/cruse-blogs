/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'www.creativefabrica.com'],
  },
  experimental: {
    urlImports: [''],
  },
}

module.exports = nextConfig