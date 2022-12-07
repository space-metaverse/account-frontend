import { useState, type ReactElement } from "react";

import { Button } from "@space-metaverse-ag/space-ui";
import { rgba } from "@space-metaverse-ag/space-ui/helpers";
import {
  Share as IconShare,
  Refresh as IconRefresh,
  Fullscreen as IconFullscreen,
  ExternalLink as IconExternalLink
} from '@space-metaverse-ag/space-ui/icons'
import { motion, LayoutGroup } from 'framer-motion';
import Profile from "layouts/profile";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import styled from "styled-components";

import type { NextPageWithLayout } from "../../../types";

const Gallery = styled.div`
  display: flex;
  flex-direction: column;

  h2 {
    ${({ theme }) => theme.fonts.size['2xl']};
    color: ${({ theme }) => theme.colors.dark[800]};
    font-weight: ${({ theme }) => theme.fonts.weight.bold};
    margin-bottom: 2rem;
    border-bottom: ${({ theme }) => `1px solid ${theme.colors.dark[200]}`};
    padding-bottom: 1.25rem;
  }
`

const Container = styled.div`
  gap: 5rem;
  display: flex;
  flex-direction: column;
`;

const Actions = styled.div`
  gap: 1.5rem;
  display: flex;
  margin-top: 3rem;
  align-items: center;

  button {
    min-width: 14.25rem;
    min-height: 3.5rem;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;

  h2 {
    ${({ theme }) => theme.fonts.size['2xl']};
    max-width: 28rem;
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

  .content {
    &-head {
      display: flex;
      align-items: center;

      &-actions {
        gap: 1rem;
        display: flex;
        margin-left: auto;
      }
    }
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

const TextInput = styled.div`
  gap: 1rem;
  width: 100%;
  border: ${({ theme }) => `1px solid ${theme.colors.dark[200]}`};
  display: flex;
  padding: 1.25rem 1.5rem;
  align-items: center;
  border-radius: ${({ theme }) => theme.radius.xl};
  justify-content: space-between;

  p {
    ${({ theme }) => theme.fonts.size.sm};
    font-weight: ${({ theme }) => theme.fonts.weight.bold};
    text-transform: uppercase;

    &:last-of-type {
      color: ${({ theme }) => theme.colors.blue[400]};
    }

    &:first-of-type {
      color: ${({ theme }) => theme.colors.dark[500]};
    }
  }
`;

const ContainerFullScreen = styled(motion.div)``

const ButtonFullScreen = styled(IconFullscreen)`
  top: .5rem;
  right: .5rem;
  width: 2rem;
  height: 2rem;
  cursor: pointer;
  display: flex;
  position: absolute;
  align-items: center;
  border-radius: ${({ theme }) => theme.radius.full};
  justify-content: center;
  background-color: ${({ theme }) => rgba(theme.colors.dark[800], '.24')};

  path {
    stroke: ${({ theme }) => theme.colors.white};
  }
`

const ImageContainer = styled(motion.div)`
  width: 100%;
  position: relative;
  min-height: 20.5rem;

  img {
    border-radius: ${({ theme }) => theme.radius.xl};
  }
`

const PhygitalDetails: NextPageWithLayout = () => {
  const [fullscreen, setFullscreen] = useState(false)

  const router = useRouter();

  return (
    <Container>
      <Details>
        <ImageContainer layoutId="image-expand">
          <Image
            src="https://picsum.photos/400"
            alt=""
            fill
            sizes="100vw"
            priority
          />

          <ButtonFullScreen onClick={() => setFullscreen((prev) => !prev)} />
        </ImageContainer>

        <Content>
          <div className="content-head">
            <h2>RTFKT x Nike Dunk Genesis CRYPTOKICKS</h2>

            <div className="content-head-actions">
              <IconRefresh />

              <IconExternalLink />

              <IconShare />
            </div>
          </div>

          <span>
            Created by:{" "}
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

          <Actions>
            <Button
              size="medium"
              label="Mint NFT"
              color="blue"
            />

            <TextInput>
              <p>Value:</p>
              <p>1.2 ETH</p>
            </TextInput>
          </Actions>
        </Content>
      </Details>

      <Gallery>
        <h2>Gallery</h2>
      </Gallery>

      <ContainerFullScreen
        initial={{ opacity: 0, pointerEvents: 'none' }}
        animate={{ opacity: fullscreen ? 100 : 0, pointerEvents: fullscreen ? 'auto' : 'none' }}
        transition={{ type: 'spring' }}
        layoutId="image-expand"
      >
        <Image
          src="https://picsum.photos/400"
          alt=""
          fill
          sizes="100vw"
          priority
        />
      </ContainerFullScreen>
    </Container>
  );
};

PhygitalDetails.getLayout = (page: ReactElement) => (
  <Profile.Layout title="NFT Details">
    <Head>
      <title>NFT Details | SPACE</title>
      <meta name="description" content="SPACE NFT Details" />
    </Head>

    <LayoutGroup>
      {page}
    </LayoutGroup>
  </Profile.Layout>
);

export default PhygitalDetails;
