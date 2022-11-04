import { Provider } from 'react-redux'

import { ThemeProvider, GlobalStyles } from '@space-metaverse-ag/space-ui'
import type { AppProps } from 'next/app'
import { store } from 'redux/store'
import styled from 'styled-components'

import { TopNav, SideNav } from '../layouts'

const Container = styled.div`
  gap: 3rem;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  padding: 1.5rem 4rem;
`

const Root: React.FC<AppProps> = ({ Component, pageProps }) => (
  <Provider store={store}>
    <ThemeProvider>
      <GlobalStyles />

      <TopNav />

      <Container>
        <SideNav />

        <Component {...pageProps} />
      </Container>
    </ThemeProvider>
  </Provider>
)

export default Root
