import { type ReactElement } from 'react'

import { rgba } from '@space-metaverse-ag/space-ui/helpers'
import { ExternalLink } from '@space-metaverse-ag/space-ui/icons'
import Profile from 'layouts/profile'
import Head from 'next/head'
import Image from 'next/image'
import styled from 'styled-components'
import {
  useAccount,
  useConnect,
  useDisconnect,
  useSignMessage
} from 'wagmi'

import type { NextPageWithLayout } from '../../types'

const Card = styled.div`
  border: ${({ theme }) => `1px solid ${theme.colors.dark['200']}`};
  display: flex;
  padding: 1rem;
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

const Badge = styled.span`
  ${({ theme }) => theme.fonts.size.sm};
  color: ${({ theme }) => theme.colors.dark['600']};
  padding: .25rem .75rem;
  font-weight: ${({ theme }) => theme.fonts.weight.medium};
  font-family: ${({ theme }) => theme.fonts.family.body};
  border-radius: ${({ theme }) => theme.radius.full};
  background-color: ${({ theme }) => rgba(theme.colors.dark['600'], '.12')};
`

const icons = {
  binance: '/icons/icon-binance.svg',
  coinbase: '/icons/icon-coinbase.svg',
  metaMask: '/icons/icon-metamask.svg',
  trustWallet: '/icons/icon-trust-wallet.svg',
  walletConnect: '/icons/icon-wallet-connect.svg',
  myEtherWallet: '/icons/icon-my-ether-wallet.svg'
}

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
    isLoading,
    connectors,
    connectAsync
  } = useConnect()

  const {
    isConnected
  } = useAccount()

  const {
    disconnectAsync
  } = useDisconnect()

  const {
    signMessageAsync
  } = useSignMessage()

  console.log({
    isLoading,
    isConnected,
    connectors
  })

  return (
    <Profile.SharedStyles.Container style={{ gap: '.75rem' }}>
      {connectors.map(({ id, name }) => (
        <Card key={id}>
          <div>
            <Image
              src={icons[id as keyof typeof icons]}
              alt={name}
              width={32}
              height={32}
            />

            <Title>{name}</Title>
          </div>
        </Card>
      ))}

      {comingSoon.map(({ id, name }) => (
        <Card key={id}>
          <div>
            <Image
              src={icons[id as keyof typeof icons]}
              alt={name}
              width={32}
              height={32}
            />

            <Title>{name}</Title>
          </div>

          <Badge>Coming soon</Badge>
        </Card>
      ))}
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
