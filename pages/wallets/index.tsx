import { useEffect, useRef, type ReactElement } from 'react'

import { Button, ModalProps, Spinner } from '@space-metaverse-ag/space-ui'
import { rgba } from '@space-metaverse-ag/space-ui/helpers'
import { ExternalLink } from '@space-metaverse-ag/space-ui/icons'
import truncate from 'helpers/truncate'
import Layout from 'layouts/layout'
import Head from 'next/head'
import styled from 'styled-components'

import type { NextPageWithLayout } from '../../types'
import ConnectWalletModal from './ConnectWalletModal'
import { useDeleteWalletMutation, useGetWalletsQuery, usePostPrimaryWalletMutation } from 'api/account'

const Message = styled.p`
  ${({ theme }) => theme.fonts.size.sm};
  color: ${({ theme }) => theme.colors.dark['800']};
  padding: 1.5rem 0;
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
  align-items: center;
  border-radius: ${({ theme }) => theme.radius.xl};
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.dark['100']};
  margin-bottom: 2rem;

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
    margin-bottom: 2rem;
    border-radius: ${({ theme }) => theme.radius.xl};
    justify-content: space-between;
  
    > div {
      display: flex;
      align-items: center;
      gap: 1rem;

      p {
        color: ${({ theme }) => theme.colors.green['500']};
      }
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
    ${({ theme }) => theme.fonts.size.md};
    color: ${({ theme }) => theme.colors.dark['800']};
    padding: .25rem .75rem;
    font-weight: ${({ theme }) => theme.fonts.weight.medium};
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

const SpinnerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5rem;
`

const Wallet: NextPageWithLayout = () => {
  const modalRef = useRef<ModalProps>(null);

  const {
    data: getWalletsData,
    isLoading: getWalletsLoading,
    refetch: getWalletsRefetch,
  } = useGetWalletsQuery({})

  const [
    postPrimaryWallet, {
      isSuccess: postPrimaryWalletSuccess,
      isLoading: postPrimaryWalletLoading,
    }
  ] = usePostPrimaryWalletMutation()

  const [
    deleteWallet, {
      isSuccess: deleteWalletSuccess,
      isLoading: isDeleteWalletLoading,
    }
  ] = useDeleteWalletMutation()

  useEffect(() => {
    if (postPrimaryWalletSuccess || deleteWalletSuccess) {
      getWalletsRefetch()
    }
  }, [postPrimaryWalletSuccess, deleteWalletSuccess])

  const handleSetPrimaryWallet = (address: string): void => {
    postPrimaryWallet({ primaryWallet: address })
  }

  return (
    <>
      <Layout.SharedStyles.Container>
        <ConnectWallet>
          <p>
            You can connect many wallets to your account
          </p>
          <Button
            size="small"
            color="blue"
            label="CONNECT"
            onClick={() => modalRef?.current?.opened()}
          />
        </ConnectWallet>
        {
          !getWalletsLoading ? getWalletsData?.wallets?.map((wallet, index) => (
            <WalletConnected.Base key={wallet}>
              <div>
                <WalletConnected.Badge title={wallet}>{truncate(wallet)}</WalletConnected.Badge>
              </div>
              <div>
                {
                  getWalletsData?.primaryWallet === wallet ? (
                    <p>Primary</p>
                  ) : (
                    <Button
                      size="small"
                      color="blue"
                      label={postPrimaryWalletLoading ? <Spinner size='small' /> : "Make Primary"}
                      outline
                      onClick={() => handleSetPrimaryWallet(wallet)}
                    />
                  )
                }
                <Button
                  size="small"
                  color="red"
                  label={postPrimaryWalletLoading ? <Spinner size='small' /> : "Remove"}
                  outline
                  onClick={() => deleteWallet({ address: wallet })}
                />
              </div>
            </WalletConnected.Base>
          )) : <SpinnerContainer>
            <Spinner />
          </SpinnerContainer>
        }
        <Message>
          Dont Have a wallet? <br />
          No Problem, Check our <b>step by step guides</b> how to create wallet
        </Message>
      </Layout.SharedStyles.Container>
      <ConnectWalletModal modalRef={modalRef} refetchWallets={getWalletsRefetch} />
    </>
  )
}

Wallet.getLayout = (page: ReactElement) => (
  <Layout.Layout title="Active Wallets">
    <Head>
      <title>Active Wallets | SPACE</title>
      <meta name='description' content='SPACE Accounts' />
    </Head>
    {page}
  </Layout.Layout>
)

export default Wallet
