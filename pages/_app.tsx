import { Provider } from 'react-redux'

import { ThemeProvider, GlobalStyles } from '@space-metaverse-ag/space-ui'
import type { AppProps } from 'next/app'

import { TopNav, Container } from '~/layouts'
import { store } from '~/redux/store'

const Root: React.FC<AppProps> = ({ Component, pageProps }) => (
  <Provider store={store}>
    <ThemeProvider>
      <GlobalStyles />

      <TopNav />

      <Container>
        <Component {...pageProps} />
      </Container>
    </ThemeProvider>
  </Provider>
)

export default Root
