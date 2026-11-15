import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    // Avatar user DummyJSON setelah login.
    remotePatterns: [new URL('https://dummyjson.com/**')],
  },
};

export default nextConfig;
