import { type ReactElement } from "react";

import Layout from "layouts/layout";
import Head from "next/head";

import type { NextPageWithLayout } from "../../../types";
import { useRouter } from "next/router";
import Image from "next/image";
import PhygitalStyles from "layouts/phygital/styles";
import { Button, TextInput } from "@space-metaverse-ag/space-ui";

const PhygitalDetails: NextPageWithLayout = () => {
  const router = useRouter();

  return (
    <PhygitalStyles.RowNotCentered>
      <PhygitalStyles.ImageContainer>
        <Image
          src="https://picsum.photos/400"
          alt="Avatar of Toni Papperoni"
          width={400}
          height={400}
        />
      </PhygitalStyles.ImageContainer>

      <PhygitalStyles.TextContainer>
        <h2>RTFKT x Nike Dunk Genesis CRYPTOKICKS</h2>
        <small>
          Created By:{" "}
          <PhygitalStyles.AuthorLink
            href={`https://google.com`}
            target="_blank"
          >
            RTFKT
          </PhygitalStyles.AuthorLink>
        </small>
        <p>
          <b>Description:</b>
          <br />
          Introducing the first RTFKT x Nike Sneaker NFT, the RTFKT X Nike Dunk
          Genesis CRYPTOKICKS Sneaker 🧪.
          <br /> When equipped with a RTFKT Skin Vial NFT, the look of the RTFKT
          x NIKE DUNK GENESIS CRYPTOKICKS changes according to the traits of the
          vial.
        </p>

        <TextInput label="Value (ETH)" value="0" />
        <Button label="Mint NFT" color="blue" size="medium" />
      </PhygitalStyles.TextContainer>
    </PhygitalStyles.RowNotCentered>
  );
};

PhygitalDetails.getLayout = (page: ReactElement) => (
  <Layout.Layout title="NFT Details">
    <Head>
      <title>NFT Details | SPACE</title>
      <meta name="description" content="SPACE NFT Details" />
    </Head>

    {page}
  </Layout.Layout>
);

export default PhygitalDetails;
