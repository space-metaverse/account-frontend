import { Provider } from 'react-redux'

import { ThemeProvider } from '@space-metaverse-ag/space-ui'
import "@space-metaverse-ag/space-ui/index.css"
import Auth from 'components/Auth'
import { LazyMotion, domAnimation } from "framer-motion"
import TopNav from 'layouts/topnav'
import type { AppProps } from 'next/app'
import Script from 'next/script'
import { store } from 'redux/store'
import {
  WagmiConfig,
  createClient,
  defaultChains,
  configureChains
} from 'wagmi'
import * as snippet from '@segment/snippet'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { publicProvider } from 'wagmi/providers/public'

import type { NextPageWithLayout } from '../types'
import "../styles/global.css";

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
    new MetaMaskConnector({ chains }),
    new WalletConnectConnector({
      chains,
      options: {
        qrcode: true
      }
    }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: 'Space'
      }
    })
  ],
  autoConnect: false,
  storage: undefined,
  webSocketProvider
})

const analytics = () => {
  const options = {
    page: false,
    apiKey: process.env.NEXT_PUBLIC_SEGMENT_WRITE_KEY,
  }

  if (process.env.NODE_ENV === 'development') return snippet.max(options)

  return snippet.min(options)
}

const Root = ({ Component, pageProps }: AppPropsWithLayout): JSX.Element => {
  const layout = Component.getLayout ?? ((page) => page)

  return (
    <WagmiConfig client={client}>
      <Script
        id="segment-script"
        dangerouslySetInnerHTML={{ __html: analytics() }}
      />

      <Provider store={store}>
        <ThemeProvider>

          <Auth />

          <TopNav />

          <LazyMotion features={domAnimation}>
            {layout(<Component {...pageProps} />)}
          </LazyMotion>
        </ThemeProvider>
      </Provider>
    </WagmiConfig>
  )
}

export default Root
