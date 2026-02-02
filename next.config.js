const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  basePath: process.env.NODE_ENV === "production" ? "/lives-in-weeks" : "",
  images: {
    unoptimized: true,
  },
  experimental: {
    swcPlugins: [["@onlook/nextjs", { root: path.resolve(".") }]],
  },
};

module.exports = nextConfig;
