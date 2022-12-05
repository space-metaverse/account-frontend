import { type ReactElement } from "react";

import { Button, TextInput } from "@space-metaverse-ag/space-ui";
import Profile from "layouts/profile";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import styled from "styled-components";

import type { NextPageWithLayout } from "../../../types";

const Container = styled.div`
  gap: 5rem;
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;

  h2 {
    ${({ theme }) => theme.fonts.size['2xl']};
    font-weight: ${({ theme }) => theme.fonts.weight.bold};
  }

  span {
    margin: .75rem 0 1.5rem;

    a {
      color: ${({ theme }) => theme.colors.blue};
      cursor: pointer;
      font-weight: ${({ theme }) => theme.fonts.weight.medium};
      text-decoration: none;
    }
  }

  small {
    ${({ theme }) => theme.fonts.size.sm};
    margin-bottom: .5rem;
  }

  p,
  h2 {
    color: ${({ theme }) => theme.colors.dark[800]};
  }

  span,
  small {
    color: ${({ theme }) => theme.colors.dark[600]};
  }

  p,
  span {
    ${({ theme }) => theme.fonts.size.md};
    font-family: ${({ theme }) => theme.fonts.family.body};
  }
`;

const Details = styled.div`
  gap: 3rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  ${Content} {
    grid-column: span 2/span 2;
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  position: relative;
  min-height: 20.5rem;

  img {
    border-radius: ${({ theme }) => theme.radius.xl};
  }
`

const PhygitalDetails: NextPageWithLayout = () => {
  const router = useRouter();

  return (
    <Container>
      <Details>
        <ImageContainer>
          <Image
            src="https://picsum.photos/400"
            alt="Avatar of Toni Papperoni"
            fill
            sizes="100vw"
            priority
          />
        </ImageContainer>

        <Content>
          <h2>RTFKT x Nike Dunk Genesis CRYPTOKICKS</h2>

          <span>
            Created By:{" "}
            <a
              rel="noreferrer"
              href={`https://google.com`}
              target="_blank"
            >
              RTFKT
            </a>
          </span>

          <small>Description:</small>

          <p>
            Introducing the first RTFKT x Nike Sneaker NFT, the RTFKT X Nike Dunk
            Genesis CRYPTOKICKS Sneaker 🧪.
            <br /> When equipped with a RTFKT Skin Vial NFT, the look of the RTFKT
            x NIKE DUNK GENESIS CRYPTOKICKS changes according to the traits of the
            vial.
          </p>

          <TextInput label="Value (ETH)" value="0" />

          <Button label="Mint NFT" color="blue" size="medium" />
        </Content>
      </Details>
    </Container>
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
