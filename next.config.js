/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'www.creativefabrica.com'],
  }
}

module.exports = nextConfig