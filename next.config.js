/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ["page.tsx", "api.tsx", "api.ts"],
  images: {
    domains: ["https://lh3.googleusercontent.com/"],
  },
};

module.exports = nextConfig;
