import { type ReactElement } from "react";

import { Button, TextInput } from "@space-metaverse-ag/space-ui";
import PhygitalStyles from "layouts/phygital/styles";
import Profile from "layouts/profile";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";

import type { NextPageWithLayout } from "../../../types";

const PhygitalDetails: NextPageWithLayout = () => {
  const router = useRouter();

  return (
    <PhygitalStyles.Wrapper>
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
    </PhygitalStyles.Wrapper>
  );
};

PhygitalDetails.getLayout = (page: ReactElement) => (
  <Profile.Layout title="NFT Details">
    <Head>
      <title>NFT Details | SPACE</title>
      <meta name="description" content="SPACE NFT Details" />
    </Head>

    {page}
  </Profile.Layout>
);

export default PhygitalDetails;
