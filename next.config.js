/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  experimental: {
    appDir: true,
  },
  output: "standalone",
  images: {
    domains: [process.env.IMAGE],
    formats: ["image/avif", "image/webp"],
  },
  env: {
    CMS: process.env.CMS,
    IMAGE: process.env.IMAGE,
    CONTROLLER: process.env.CONTROLLER,
    MODE: process.env.MODE,
    MY_SECRET_TOKEN: process.env.MY_SECRET_TOKEN,
    NEXT_SHARP_PATH: "/tmp/node_modules/sharp",
  },
  // productionBrowserSourceMaps: true,
};

module.exports = nextConfig;
