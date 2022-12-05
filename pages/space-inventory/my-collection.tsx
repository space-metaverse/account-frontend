import { type ReactElement } from "react";

import CardInventory from 'components/CardInventory'
import Profile from "layouts/profile";
import Head from "next/head";
import styled from "styled-components";

import type { NextPageWithLayout } from "../../types";

const Wrapper = styled.div`
  gap: 1rem;
  display: grid;
  grid-template-columns: repeat(4, 1fr);

  @media (max-width: 1324px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 767px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 456px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const nfts = [
  {
    id: '1',
    name: "NFT 1",
    cover: "https://picsum.photos/200",
    author: {
      name: "Author 1",
      url: "https://google.com",
    },
  },
  {
    id: '2',
    name: "NFT 2",
    cover: "https://picsum.photos/200?random=1",
    author: {
      name: "Author 2",
      url: "https://google.ca",
    },
  },
];

const Phygital: NextPageWithLayout = () => (
  <Wrapper>
    {nfts.map((props) => <CardInventory key={props.id} {...props} />)}
  </Wrapper>
);

Phygital.getLayout = (page: ReactElement) => (
  <Profile.Layout title="My NFT Collection">
    <Head>
      <title>My NFT Collection | SPACE</title>
      <meta name="description" content="SPACE Inventory" />
    </Head>

    {page}
  </Profile.Layout>
);

export default Phygital;
