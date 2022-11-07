import { useState } from 'react'

import { Button, TextInput, ImageInput } from '@space-metaverse-ag/space-ui'
import type { NextPage } from 'next'
import Head from 'next/head'
import styled from 'styled-components'

const Page = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

const Form = styled.div`
  gap: 1rem;
  display: flex;
  margin-top: 2rem;
  margin-bottom: 4rem;
  flex-direction: column;

  .is-grid {
    gap: 1rem;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
`

const Actions = styled.div`
  gap: .75rem;
  padding: 1.25rem 0;
  display: flex;
  border-top: ${({ theme }) => `1px solid ${theme.colors.dark[200]}`};
  align-items: center;
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
            size: 'small',
            label: 'Change Avatar',
            color: 'blue'
          }}
          showDummyAvatar
          changeLabelWhenFileSelected
        />

        <Form>
          <div className="is-grid">
            <TextInput
              label="First name"
              placeholder="Enter your first name"
            />

            <TextInput
              label="Last name"
              placeholder="Enter your last name"
            />
          </div>

          <div className="is-grid">
            <TextInput
              label="Email"
              placeholder="Enter your email"
            />
          </div>

          <div className="is-grid">
            <TextInput
              label="Phone number"
              placeholder="(XX) XXXX-XXXX"
            />
          </div>
        </Form>
      </Container>

      <Actions>
        <Button
          size="medium"
          color="blue"
          label="Save changes"
        />

        <Button
          size="medium"
          color="white"
          label="Discard"
        />
      </Actions>
    </Page>
  )
}

export default Home
