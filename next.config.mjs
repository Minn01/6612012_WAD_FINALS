/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/fin-customer',
  assetPrefix: '/fin-customer',
  env: {
    NEXT_PUBLIC_BASE_PATH: '/fin-customer',
  },
  experimental: {
    instrumentationHook: true,
  },
};

export default nextConfig;
