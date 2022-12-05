import { Provider } from 'react-redux'

import { ThemeProvider, GlobalStyles } from '@space-metaverse-ag/space-ui'
import "@space-metaverse-ag/space-ui/index.css"
import Auth from 'components/Auth'
import { LazyMotion, domAnimation } from "framer-motion"
import TopNav from 'layouts/topnav'
import type { AppProps } from 'next/app'
import { store } from 'redux/store'
import {
  WagmiConfig,
  createClient,
  defaultChains,
  configureChains
} from 'wagmi'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
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

          <LazyMotion features={domAnimation}>
            {layout(<Component {...pageProps} />)}
          </LazyMotion>
        </ThemeProvider>
      </Provider>
    </WagmiConfig>
  )
}

export default Root
