/**
 * @type {import('next').NextConfig}
 */
export default {
  images: {
    domains: ["picsum.photos"],
  },
  compiler: {
    styledComponents: true,
  },

  async redirects() {
    return [
      {
        source: "/",
        permanent: true,
        destination: "/profile/information",
      },
    ];
  },

  experimental: {
    transpilePackages: ["@space-metaverse-ag/space-ui"],
  },

  reactStrictMode: true,
};
