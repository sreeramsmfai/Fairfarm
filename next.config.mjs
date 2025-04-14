/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'assets-prd.ignimgs.com',
      'thehill.com',
    ],// Add any other domains you use
  },
};

export default nextConfig;
