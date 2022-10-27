import { Provider } from 'react-redux'

import { ThemeProvider, GlobalStyles } from '@space-metaverse-ag/space-ui'
import type { AppProps } from 'next/app'

import { TopNav } from '~/layouts'
import { store } from '~/redux/store'

const App: React.FC<AppProps> = ({ Component, pageProps }) => (
  <Provider store={store}>
    <ThemeProvider>
      <GlobalStyles />

      <TopNav />

      <Component {...pageProps} />
    </ThemeProvider>
  </Provider>
)

export default App
