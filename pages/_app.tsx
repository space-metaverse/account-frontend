import { Provider } from 'react-redux'

import { ThemeProvider, GlobalStyles } from '@space-metaverse-ag/space-ui'
import type { AppProps } from 'next/app'
import { store } from 'redux/store'
import styled from 'styled-components'

import Auth from '../components/Auth'
import { TopNav, SideNav } from '../layouts'

const Container = styled.div`
  width: 100%;
  height: 100%;
  margin: 0 auto;
  padding: 1.5rem; 
  max-width: 82.5rem;
`

const Root: React.FC<AppProps> = ({ Component, pageProps }) => (
  <Provider store={store}>
    <ThemeProvider>
      <GlobalStyles />
      <TopNav />
      <SideNav />
      <Auth />
      <Container>
        <Component {...pageProps} />
      </Container>
    </ThemeProvider>
  </Provider>
)

export default Root
