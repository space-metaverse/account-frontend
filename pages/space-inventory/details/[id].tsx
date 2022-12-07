import 'swiper/css'

import { useRef, useState, type ReactElement } from "react";

import { Button } from "@space-metaverse-ag/space-ui";
import { rgba } from "@space-metaverse-ag/space-ui/helpers";
import { useOutsideClick } from "@space-metaverse-ag/space-ui/hooks"
import {
  Close as IconClose,
  Share as IconShare,
  Refresh as IconRefresh,
  ArrowLeft as IconArrowLeft,
  ArrowRight as IconArrowRight,
  Fullscreen as IconFullscreen,
  ExternalLink as IconExternalLink
} from '@space-metaverse-ag/space-ui/icons'
import { motion, LayoutGroup, AnimatePresence } from 'framer-motion';
import Layout from "layouts/layout";
import Head from "next/head";
import Image from "next/image";
import styled from "styled-components";
import { Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { NavigationOptions } from 'swiper/types'

import type { NextPageWithLayout } from "../../../types";

const Gallery = styled.div`
  display: flex;
  margin-bottom: 4rem;
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

  @media screen and (max-width: 1480px) {
    align-items: flex-start;
    flex-direction: column;

    button {
      width: 100%;
    }
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

        > div {
          cursor: pointer;
        }
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

  @media screen and (max-width: 1480px) {
    grid-template-columns: repeat(2, 1fr);

    ${Content} {
      grid-column: span 1/span 1;
    }
  }

  @media screen and (max-width: 1199px) {
    grid-template-columns: repeat(1, 1fr);
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

const GalleryAction = styled.div`
  height: 100%;
  z-index: 9;
  display: flex;
  opacity: 1;
  position: absolute;
  transition: ${({ theme }) => theme.transitions.ease};
  align-items: center;

  button {
    width: 3.5rem;
    height: 3.5rem;
    cursor: pointer;
    border: none;
    box-shadow: ${({ theme }) => `0px 12px 32px -12px ${theme.colors.blue[200]}`};
    border-radius: ${({ theme }) => theme.radius.full};
    background-color: ${({ theme }) => theme.colors.white};
  
    path {
      stroke: ${({ theme }) => theme.colors.dark[500]};
      transition: ${({ theme }) => theme.transitions.ease};
    }

    &:hover path {
      stroke: ${({ theme }) => theme.colors.blue[400]};
    }
  }

  &.is-left {
    left: 0;
    padding: 0 5rem 0 1.5rem;
    background: ${({ theme }) => `linear-gradient(-270deg, ${theme.colors.white} 0%, ${rgba(theme.colors.dark[800], '0')} 100%)`};
  }

  &.is-right {
    right: 0;
    padding: 0 1.5rem 0 5rem;
    background: ${({ theme }) => `linear-gradient(270deg, ${theme.colors.white} 0%, ${rgba(theme.colors.dark[800], '0')} 100%)`};
  }

  &:has(button.swiper-button-disabled) {
    opacity: 0;
    pointer-events: none;
  }
`;

const GalleryContent = styled.div`
  display: flex;
  position: relative;
  align-items: center;

  .gallery-swiper {
    width: 100%;

    &-slide {
      width: 100%;
      height: 22rem;
      position: relative;
      max-width: 22rem;

      img {
        border-radius: ${({ theme }) => theme.radius.xl};
      } 
    }
  }
`

const ContainerFullScreen = styled(motion.div)`
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  display: flex;
  overflow: hidden;
  position: fixed;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => rgba(theme.colors.dark[800], '.48')};

  .fullscreen-image {
    width: 100%;
    height: 100%;
    position: relative;
    max-width: 30rem;
    max-height: 30rem;

    img {
      border-radius: ${({ theme }) => theme.radius.xl};
    } 
  }
`

const IconButton = styled.svg`
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

const gallery = [
  "https://picsum.photos/400",
  "https://picsum.photos/400",
  "https://picsum.photos/400",
  "https://picsum.photos/400",
  "https://picsum.photos/400",
  "https://picsum.photos/400",
]

const PhygitalDetails: NextPageWithLayout = () => {
  const [fullscreen, setFullscreen] = useState(false)

  const prevRef = useRef<HTMLButtonElement>(null)
  const nextRef = useRef<HTMLButtonElement>(null)
  const fullScreenRef = useRef<HTMLDivElement>(null)

  useOutsideClick(fullScreenRef, () => setFullscreen(false))

  return (
    <AnimatePresence mode="popLayout">
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

            <IconButton as={IconFullscreen} onClick={() => setFullscreen((prev) => !prev)} />
          </ImageContainer>

          <Content>
            <div className="content-head">
              <h2>RTFKT x Nike Dunk Genesis CRYPTOKICKS</h2>

              <div className="content-head-actions">
                <IconRefresh />

                <IconExternalLink />

                <IconShare onClick={async () => await navigator.clipboard.writeText('https://app.tryspace.com')} />
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

          <GalleryContent>
            <GalleryAction className="is-left">
              <button ref={prevRef}>
                <IconArrowLeft />
              </button>
            </GalleryAction>

            <Swiper
              modules={[Navigation]}
              className="gallery-swiper"
              grabCursor
              navigation={{
                prevEl: prevRef.current,
                nextEl: nextRef.current
              }}
              spaceBetween={16}
              onBeforeInit={(swiper) => {
                const navigation = swiper.params.navigation as NavigationOptions

                if (navigation) {
                  navigation.prevEl = prevRef.current
                  navigation.nextEl = nextRef.current
                }

                swiper.navigation.init()
                swiper.navigation.update()
              }}
              slidesPerView="auto"
            >
              {gallery.map((picture, index) => (
                <SwiperSlide
                  key={`${picture}-${index}`}
                  className="gallery-swiper-slide"
                >
                  <Image
                    src={picture}
                    alt=""
                    fill
                    sizes="100vw"
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            <GalleryAction className="is-right">
              <button ref={nextRef}>
                <IconArrowRight />
              </button>
            </GalleryAction>
          </GalleryContent>
        </Gallery>

        {fullscreen && (
          <ContainerFullScreen
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              ref={fullScreenRef}
              layoutId="image-expand"
              className="fullscreen-image"
            >
              <Image
                src="https://picsum.photos/400"
                alt=""
                fill
                sizes="100vw"
                priority
              />

              <IconButton as={IconClose} onClick={() => setFullscreen((prev) => !prev)} />
            </motion.div>
          </ContainerFullScreen>
        )}
      </Container>
    </AnimatePresence>
  );
};

PhygitalDetails.getLayout = (page: ReactElement) => (
  <Layout.Layout title="NFT Details">
    <Head>
      <title>NFT Details | SPACE</title>
      <meta name="description" content="SPACE NFT Details" />
    </Head>

    <LayoutGroup>
      {page}
    </LayoutGroup>
  </Layout.Layout>
);

export default PhygitalDetails;
