import { useState } from 'react'

import { ImageInput } from '@space-metaverse-ag/space-ui'
import type { NextPage } from 'next'
import Head from 'next/head'
import styled from 'styled-components'

const Page = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

const Title = styled.h1`
  ${({ theme }) => theme.fonts.size['3xl']};
  font-weight: ${({ theme }) => theme.fonts.weight.bold};
  border-bottom: ${({ theme }) => `1px solid ${theme.colors.dark['200']}`};
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
`

const Container = styled.div`
  width: 100%;
  display: flex;
  max-width: 37.5rem;
  flex-direction: column;
`

const Home: NextPage = () => {
  const [file, setFile] = useState<File | null>(null)

  return (
    <Page>
      <Head>
        <title>Accounts | SPACE</title>
        <meta name='description' content='SPACE Accounts' />
      </Head>

      <Title>Profile Information</Title>

      <Container>
        <ImageInput
          file={file}
          header="Toni Papperoni"
          onFile={setFile}
          button={{
            size: 'medium',
            label: 'Change Avatar',
            color: 'blue'
          }}
          showDummyAvatar
          changeLabelWhenFileSelected
        />
      </Container>
    </Page>
  )
}

export default Home
