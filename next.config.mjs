/**
 * @type {import('next').NextConfig}
 */
export default {
  images: {
    domains: [
      'picsum.photos',
      'space-staging-assets.metaverse-demo.com'
    ]
  },
  compiler: {
    styledComponents: true
  },

  async redirects () {
    return [
      {
        source: '/',
        permanent: true,
        destination: '/profile/information'
      }
    ]
  },

  transpilePackages: ['@space-metaverse-ag/space-ui'],
  reactStrictMode: true
}
