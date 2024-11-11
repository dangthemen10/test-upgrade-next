/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  assetPrefix: '/search',
  // basePath: '/search',
  // rewrites: async () => {
  //   return [
  //     {
  //       source: '/search/:path*',
  //       destination: '/:path*',
  //     },
  //   ];
  // },
};

module.exports = nextConfig;
