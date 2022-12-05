import { type ReactElement } from "react";

import Layout from "layouts/layout";
import PhygitalStyles from "layouts/phygital/styles";
import Head from "next/head";

import type { NextPageWithLayout } from "../../types";
import { Card, Popover } from "@space-metaverse-ag/space-ui";
import { Dots, DragPoint } from "@space-metaverse-ag/space-ui/icons";
import { useRouter } from "next/router";

const nfts = [
  {
    id: 1,
    name: "NFT 1",
    image: "https://picsum.photos/200",
    description: "This is a description",
    author: {
      name: "Author 1",
      url: "https://google.com",
    },
  },
  {
    id: 2,
    name: "NFT 2",
    image: "https://picsum.photos/200?random=1",
    description: "This is a description",
    author: {
      name: "Author 2",
      url: "https://google.ca",
    },
  },
];

const Phygital: NextPageWithLayout = () => {
  const router = useRouter();

  return (
    <PhygitalStyles.Row>
      {nfts.map((nft) => (
        <PhygitalStyles.CardContainer key={nft.id}>
          <Popover
            options={[
              {
                icon: DragPoint,
                label: "Details",
                callback: async () =>
                  await router.push(`/space-inventory/details/${nft.id}`),
              },
            ]}
            className="is-popover"
          >
            <PhygitalStyles.CardButton>
              <Dots stroke="#fff" />
            </PhygitalStyles.CardButton>
          </Popover>

          <Card image={nft.image}>
            <div>
              <h2>{nft.name}</h2>
              <small>
                Created By:{" "}
                <PhygitalStyles.AuthorLink
                  href={nft.author.url}
                  target="_blank"
                >
                  {nft.author.name}
                </PhygitalStyles.AuthorLink>
              </small>
            </div>
          </Card>
        </PhygitalStyles.CardContainer>
      ))}
    </PhygitalStyles.Row>
  );
};

Phygital.getLayout = (page: ReactElement) => (
  <Layout.Layout title="My NFT Collection">
    <Head>
      <title>My NFT Collection | SPACE</title>
      <meta name="description" content="SPACE Inventory" />
    </Head>

    {page}
  </Layout.Layout>
);

export default Phygital;
