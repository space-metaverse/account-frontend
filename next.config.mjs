import withTranspileModules from 'next-transpile-modules'

const withTM = withTranspileModules([
  '@space-metaverse-ag/space-ui'
])

/**
 * @type {import('next').NextConfig}
 */
export default withTM({
  compiler: {
    styledComponents: true
  },

  reactStrictMode: true
})
