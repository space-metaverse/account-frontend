import { useEffect, useState, type ReactElement } from "react";
import CardInventory from 'components/CardInventory'
import Layout from "layouts/layout";
import Head from "next/head";
import styled from "styled-components";
import type { NextPageWithLayout } from "../../types";
import { GetPhygitalNftsResponse } from "api/moralis";
import { useGetWalletsQuery } from "api/account";

const Wrapper = styled.div`
  gap: 1rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Phygital: NextPageWithLayout = () => {
  const [nfts, setNfts] = useState<GetPhygitalNftsResponse["result"]>([]);

  const {
    data: getWalletsData,
    isLoading: getWalletsLoading,
    isSuccess: getWalletsSuccess,
    refetch: getWalletsRefetch,
  } = useGetWalletsQuery({})

  useEffect(() => {
    if (getWalletsData?.wallets && getWalletsSuccess) {
      const wallets = getWalletsData.wallets;
      const nfts = [];
      wallets.forEach(async (wallet) => {
        const response = await fetch(`https://deep-index.moralis.io/api/v2/${wallet}/nft/?chain=mumbai&format=decimal&token_addresses=${process.env.NEXT_PUBLIC_PHYGITAL_CONTRACT}&normalizeMetadata=true`, {
          headers: {
            'X-API-KEY': process.env.NEXT_PUBLIC_MORALIS_API_KEY as string,
            'accept': 'application/json'
          }
        })
        if (response.ok) {
          const data: GetPhygitalNftsResponse = await response.json();
          if (data.result.length > 0) {
            nfts.push(...data.result)
          }
        }
      })
    }
  }, [getWalletsData, getWalletsSuccess])

  return (
    <Wrapper>
      {nfts?.map((nft) => {
        return (
          <CardInventory
            key={nft.token_id}
            id={nft.token_id}
            name={nft.normalized_metadata.name}
            cover={nft.normalized_metadata.image !== "BLOB" ? nft.normalized_metadata.image : "/no-image.png"}
            author={nft.minter_address}
          />
        )
      })}
    </Wrapper>
  )
};

Phygital.getLayout = (page: ReactElement) => {
  return (
    <Layout.Layout title="My NFT Collection">
      <Head>
        <title>My NFT Collection | SPACE</title>
        <meta name="description" content="SPACE Inventory" />
      </Head>
      {page}
    </Layout.Layout>
  )
};

export default Phygital;
