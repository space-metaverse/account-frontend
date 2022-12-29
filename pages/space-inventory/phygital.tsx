import { type ReactElement } from "react";
import CardInventory from 'components/CardInventory'
import Layout from "layouts/layout";
import Head from "next/head";
import styled from "styled-components";
import type { NextPageWithLayout } from "../../types";
import { useGetPhygitalNftsQuery } from "api/moralis";

const Wrapper = styled.div`
  gap: 1rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Phygital: NextPageWithLayout = () => {
  const {
    data: getPhygitalsData,
    isLoading: getPhygitalsLoading,
    refetch: getPhygitalsRefetch,
  } = useGetPhygitalNftsQuery({
    address: "0x3C000EBf6a0f75a3b830aEB1C2eDC33738e9A3Ea"
  })

  return (
    <Wrapper>
      {getPhygitalsData?.result?.map((nft) => {
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
