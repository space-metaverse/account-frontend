import { Modal, ModalProps } from "@space-metaverse-ag/space-ui"
import Image from 'next/image'
import { useAccount, useConnect, useDisconnect, useSignMessage } from "wagmi"
import wallets from 'data/wallets'
import { RefObject, useEffect } from "react"
import styled from "styled-components"
import { useGetNonceQuery, usePostSignatureMutation } from "api/account"

const WalletsGrid = styled.div`
  display: flex;

  div {
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 8rem;
    width: 10rem;
    cursor: pointer;

    &:hover {
      background-color: ${({ theme }) => theme.colors.dark['100']};
    }
  }
`

interface ConnectWalletModalProps {
  modalRef: RefObject<ModalProps>
  refetchWallets: () => void
}

const ConnectWalletModal = ({ modalRef, refetchWallets }: ConnectWalletModalProps) => {
  const {
    reset,
    connect,
    connectors,
    pendingConnector,
    isSuccess: isConnectSuccess
  } = useConnect()

  const {
    address
  } = useAccount()

  const {
    disconnect
  } = useDisconnect()

  const {
    data: getNonceData,
  } = useGetNonceQuery({
    skip: !pendingConnector
  })

  const [
    postSignature, {
      isSuccess: isPostSignatureSuccess,
    }
  ] = usePostSignatureMutation()

  const {
    data: signMessageData,
    isSuccess: isSignMessageSuccess,
    signMessage,
  } = useSignMessage({
    message: getNonceData?.nonce
  })

  useEffect(() => {
    if (isConnectSuccess && getNonceData?.nonce) {
      signMessage()
    }
  }, [isConnectSuccess, getNonceData?.nonce])

  useEffect(() => {
    if (isSignMessageSuccess && signMessageData && address) {
      postSignature({
        signature: signMessageData,
        address
      })
    }
  }, [isSignMessageSuccess, signMessageData, address])

  useEffect(() => {
    if (isPostSignatureSuccess) {
      modalRef.current?.closed()
      disconnect()
      refetchWallets()
    }
  }, [isPostSignatureSuccess])

  const handleConnect = (connector: any) => {
    reset()
    disconnect()
    setTimeout(() => {
      connect({ connector })
    }, 1000)
  }

  return (
    <Modal ref={modalRef} title="Connect Wallet">
      <WalletsGrid>
        {
          connectors.map((connector) => {
            const { id, name } = connector;
            return (
              <div key={id} onClick={() => handleConnect(connector)}>
                <Image
                  src={wallets[id as keyof typeof wallets]}
                  alt={name}
                  width={60}
                  height={60}
                />
              </div>
            )
          })
        }
      </WalletsGrid>
    </Modal>
  )
}

export default ConnectWalletModal;