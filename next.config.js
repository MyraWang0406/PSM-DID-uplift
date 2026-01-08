const isGithub = process.env.DEPLOY_TARGET === "github";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  trailingSlash: true,
  basePath: isGithub ? "/PSM-DID-uplift" : "",
  assetPrefix: isGithub ? "/PSM-DID-uplift/" : "",
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig

