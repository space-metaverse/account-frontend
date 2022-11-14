import { type ReactElement } from 'react'

import { Button } from '@space-metaverse-ag/space-ui'
import { rgba } from '@space-metaverse-ag/space-ui/helpers'
import { ExternalLink } from '@space-metaverse-ag/space-ui/icons'
import Profile from 'layouts/profile'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styled from 'styled-components'

import type { NextPageWithLayout } from '../../types'

const Message = styled.p`
  ${({ theme }) => theme.fonts.size.sm};
  color: ${({ theme }) => theme.colors.dark['800']};
  padding: 1.5rem 0;
  margin-top: 2rem;
  border-top: ${({ theme }) => `1px solid ${theme.colors.dark[200]}`};
  font-weight: ${({ theme }) => theme.fonts.weight.bold};
  letter-spacing: 1px;
  text-transform: uppercase;

  b {
    color: ${({ theme }) => theme.colors.blue['400']};
  }
`

const ConnectWallet = styled.div`
  display: flex;
  padding: 1rem 1rem 1rem 1.5rem;
  margin-top: 2rem;
  align-items: center;
  border-radius: ${({ theme }) => theme.radius.xl};
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.dark['100']};

  p {
    ${({ theme }) => theme.fonts.size.sm};
    color: ${({ theme }) => theme.colors.dark['800']};
    font-weight: ${({ theme }) => theme.fonts.weight.bold};
    letter-spacing: 1px;
    text-transform: uppercase;
  }

  @media screen and (max-width: 640px) {
    gap: 1.5rem;
    align-items: flex-start;
    flex-direction: column;
  }
`

const WalletConnected = {
  Base: styled.div`
    border: ${({ theme }) => `1px solid ${theme.colors.dark['200']}`};
    display: flex;
    padding: 1rem;
    align-items: center;
    border-radius: ${({ theme }) => theme.radius.xl};
    justify-content: space-between;
  
    > div {
      display: flex;
      align-items: center;
    }

    @media screen and (max-width: 640px) {
      gap: 1.5rem;
      align-items: flex-start;
      flex-direction: column;
    }
  `,

  Name: styled.h6`
    ${({ theme }) => theme.fonts.size.sm};
    color: ${({ theme }) => theme.colors.dark['800']};
    margin: 0 .75rem 0 1rem;
    font-weight: ${({ theme }) => theme.fonts.weight.bold};
    letter-spacing: 1px;
    text-transform: uppercase;
  `,

  Badge: styled.span`
    ${({ theme }) => theme.fonts.size.sm};
    color: ${({ theme }) => theme.colors.dark['600']};
    padding: .25rem .75rem;
    font-weight: ${({ theme }) => theme.fonts.weight.medium};
    font-family: ${({ theme }) => theme.fonts.family.body};
    border-radius: ${({ theme }) => theme.radius.full};
    background-color: ${({ theme }) => rgba(theme.colors.dark['600'], '.12')};
  `,

  Icon: styled(ExternalLink)`
    cursor: pointer;
    padding: .5rem;
    margin-left: 1rem;

    path {
      stroke: ${({ theme }) => theme.colors.dark['800']};
      transition: ${({ theme }) => theme.transitions.ease};
    }

    &:hover path {
      stroke: ${({ theme }) => theme.colors.blue['400']};
    }
  `
}

const Wallet: NextPageWithLayout = () => (
  <Profile.SharedStyles.Container>
    <WalletConnected.Base>
      <div>
        <Image
          src="/icons/icon-metamask.svg"
          alt="Metamask"
          width={32}
          height={32}
        />

        <WalletConnected.Name>Metamask</WalletConnected.Name>

        <WalletConnected.Badge>0x12r45... 6HJ9</WalletConnected.Badge>
      </div>

      <div>
        <Button
          size="small"
          color="red"
          label="Disconnect"
          outline
        />

        <WalletConnected.Icon />
      </div>
    </WalletConnected.Base>

    <ConnectWallet>
      <p>
        You can connect more wallets to your account
      </p>

      <Link href="connect">
        <Button
          size="small"
          color="blue"
          label="CONNECT"
        />
      </Link>
    </ConnectWallet>

    <Message>
      Dont Have a wallet? <br />
      No Problem, Check our <b>step by step guides</b> how to create wallet
    </Message>
  </Profile.SharedStyles.Container>
)

Wallet.getLayout = (page: ReactElement) => (
  <Profile.Layout title="Active Wallets">
    <Head>
      <title>Active Wallets | SPACE</title>
      <meta name='description' content='SPACE Accounts' />
    </Head>

    {page}
  </Profile.Layout>
)

export default Wallet
