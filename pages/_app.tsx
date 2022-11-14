import { Provider } from 'react-redux'

import { ThemeProvider, GlobalStyles } from '@space-metaverse-ag/space-ui'
import Auth from 'components/Auth'
import TopNav from 'layouts/topnav'
import type { AppProps } from 'next/app'
import { store } from 'redux/store'
import {
  WagmiConfig,
  createClient,
  defaultChains,
  configureChains
} from 'wagmi'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { publicProvider } from 'wagmi/providers/public'

import type { NextPageWithLayout } from '../types'

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const {
  chains,
  provider,
  webSocketProvider
} = configureChains(defaultChains, [publicProvider()])

const client = createClient({
  provider,
  connectors: [
    new MetaMaskConnector({ chains })
  ],
  autoConnect: true,
  webSocketProvider
})

const Root = ({ Component, pageProps }: AppPropsWithLayout): JSX.Element => {
  const layout = Component.getLayout ?? ((page) => page)

  return (
    <WagmiConfig client={client}>
      <Provider store={store}>
        <ThemeProvider>
          <GlobalStyles />

          <Auth />

          <TopNav />

          {layout(<Component {...pageProps} />)}
        </ThemeProvider>
      </Provider>
    </WagmiConfig>
  )
}

export default Root
