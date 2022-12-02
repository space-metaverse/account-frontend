import { useEffect, type ReactElement } from 'react'

import { rgba } from '@space-metaverse-ag/space-ui/helpers'
import { Check } from '@space-metaverse-ag/space-ui/icons'
import wallets from 'data/wallets'
import Profile from 'layouts/profile'
import Head from 'next/head'
import Image from 'next/image'
import styled from 'styled-components'
import { useAccount, useConnect, useSignMessage } from 'wagmi'

import type { NextPageWithLayout } from '../../types'
import { useGetNonceQuery, usePostSignatureMutation } from 'api/account'

const Card = styled.div<{ disabled: boolean }>`
  border: ${({ theme }) => `1px solid ${theme.colors.dark['200']}`};
  cursor: ${({ disabled }) => disabled ? 'not-allowed' : 'pointer'};
  display: flex;
  padding: 1.5rem 1.25rem;
  position: relative;
  align-items: center;
  border-radius: ${({ theme }) => theme.radius.xl};
  justify-content: space-between;

  div {
    display: flex;
    align-items: center;
  }
`

const Title = styled.h6`
  ${({ theme }) => theme.fonts.size.sm};
  color: ${({ theme }) => theme.colors.dark['800']};
  margin: 0 .75rem 0 1rem;
  font-weight: ${({ theme }) => theme.fonts.weight.bold};
  letter-spacing: 1px;
  text-transform: uppercase;
`

const Loading = styled.span`
  ${({ theme }) => theme.fonts.size.sm};
  color: ${({ theme }) => theme.colors.dark['600']};
  font-weight: ${({ theme }) => theme.fonts.weight.medium};
  font-family: ${({ theme }) => theme.fonts.family.body};
`

const Error = styled.p`
  ${({ theme }) => theme.fonts.size.sm};
  color: ${({ theme }) => theme.colors.red['400']};
  width: fit-content;
  padding: .25rem .75rem;
  margin-top: .75rem;
  border-radius: ${({ theme }) => theme.radius.lg};
  background-color: ${({ theme }) => theme.colors.red['100']};
`

const Badge = styled.span`
  ${({ theme }) => theme.fonts.size.sm};
  color: ${({ theme }) => theme.colors.dark['600']};
  padding: .25rem .75rem;
  font-weight: ${({ theme }) => theme.fonts.weight.medium};
  font-family: ${({ theme }) => theme.fonts.family.body};
  border-radius: ${({ theme }) => theme.radius.full};
  background-color: ${({ theme }) => rgba(theme.colors.dark['600'], '.12')};
`

const IconCheck = styled(Check)`
  right: 1.5rem;
  position: absolute;

  path {
    stroke: ${({ theme }) => theme.colors.green['400']}
  }
`

const comingSoon = [
  {
    id: 'binance',
    name: 'Binance'
  },
  {
    id: 'trustWallet',
    name: 'Trust Wallet'
  },
  {
    id: 'myEtherWallet',
    name: 'My Ether Wallet'
  }
]

const Wallet: NextPageWithLayout = () => {
  const {
    reset,
    error,
    isError,
    connect,
    isLoading,
    connectors,
    pendingConnector,
    isSuccess: isConnectSuccess
  } = useConnect()

  const {
    connector: activeConnector
  } = useAccount()

  const {
    data: getNonceData,
  } = useGetNonceQuery({
    skip: !pendingConnector
  })

  const [
    postSignature,
  ] = usePostSignatureMutation()

  const {
    data: signMessageData,
    isSuccess: isSignMessageSuccess,
    signMessage
  } = useSignMessage({
    message: getNonceData?.nonce
  })

  useEffect(() => {
    if (isConnectSuccess) {
      signMessage()
    }
  }, [isConnectSuccess])

  useEffect(() => {
    if (isSignMessageSuccess && signMessageData) {
      postSignature({ signature: signMessageData })
    }
  }, [isSignMessageSuccess, signMessageData])

  return (
    <Profile.SharedStyles.Container style={{ gap: '.75rem' }}>
      {connectors.map((connector) => {
        const {
          id,
          name
        } = connector

        const connected = activeConnector?.id === id

        const handleConnect = (): void => {
          if (!connected) {
            reset()
            connect({ connector })
          }
        }

        return (
          <Card
            key={id}
            onClick={handleConnect}
            disabled={false}
          >
            <div>
              <Image
                src={wallets[id as keyof typeof wallets]}
                alt={name}
                width={32}
                height={32}
              />

              <Title>{name}</Title>
            </div>

            {isLoading && pendingConnector?.id === connector.id &&
              <Loading> (connecting)</Loading>}

            {connected && <IconCheck />}
          </Card>
        )
      })}

      {comingSoon.map(({ id, name }) => (
        <Card
          key={id}
          disabled
        >
          <div>
            <Image
              src={wallets[id as keyof typeof wallets]}
              alt={name}
              width={32}
              height={32}
            />

            <Title>{name}</Title>
          </div>

          <Badge>Coming soon</Badge>
        </Card>
      ))}

      {isError && error && <Error>{error.message}</Error>}
    </Profile.SharedStyles.Container>
  )
}

Wallet.getLayout = (page: ReactElement) => (
  <Profile.Layout title="Connect New Wallet">
    <Head>
      <title>Connect New Wallet | SPACE</title>
      <meta name='description' content='SPACE Accounts' />
    </Head>

    {page}
  </Profile.Layout>
)

export default Wallet
