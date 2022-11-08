import { Provider } from 'react-redux'

import { ThemeProvider, GlobalStyles } from '@space-metaverse-ag/space-ui'
import Auth from 'components/Auth'
import TopNav from 'layouts/topnav'
import type { AppProps } from 'next/app'
import { store } from 'redux/store'
import styled from 'styled-components'

import type { NextPageWithLayout } from '../types'

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const Container = styled.div`
  margin-top: 6rem;
`

const Root = ({ Component, pageProps }: AppPropsWithLayout): JSX.Element => {
  const layout = Component.getLayout ?? ((page) => page)

  return (
    <Provider store={store}>
      <ThemeProvider>
        <GlobalStyles />

        <Auth />

        <TopNav />

        <Container>
          {layout(<Component {...pageProps} />)}
        </Container>
      </ThemeProvider>
    </Provider>
  )
}

export default Root
