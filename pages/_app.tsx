import { Provider } from 'react-redux'

import { ThemeProvider, GlobalStyles } from '@space-metaverse-ag/space-ui'
import type { AppProps } from 'next/app'
import { store } from 'redux/store'
import styled from 'styled-components'

import Auth from '../components/Auth'
import { TopNav, SideNav } from '../layouts'

const Container = styled.div`
  margin-top: 6rem;
`

const Root: React.FC<AppProps> = ({ Component, pageProps }) => (
  <Provider store={store}>
    <ThemeProvider>
      <GlobalStyles />
      <TopNav />
      <Auth />
      <Container>
        <SideNav />

        <Component {...pageProps} />
      </Container>
    </ThemeProvider>
  </Provider>
)

export default Root
