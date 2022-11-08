import type { NextPage } from 'next'
import Head from 'next/head'
import styled from 'styled-components'

const Page = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

const Home: NextPage = () => (
  <Page>
    <Head>
      <title>Accounts | SPACE</title>
      <meta name='description' content='SPACE Accounts' />
    </Head>

    <h1>Accounts</h1>
  </Page>
)

export default Home
