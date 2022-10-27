import type { NextPage } from 'next'
import Head from 'next/head'
import styled from 'styled-components'

const Page = styled.div`
  height: 100%;
  width: 100%;
`

const Main = styled.main`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Home: NextPage = () => (
  <Page>
    <Head>
      <title>Accounts | SPACE</title>
      <meta name='description' content='SPACE Accounts' />
    </Head>
    <Main>
      <h1>Welcome to Accounts!</h1>
    </Main>
  </Page>
)

export default Home
