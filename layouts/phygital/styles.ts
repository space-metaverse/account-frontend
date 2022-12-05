import { Card as CustomCard } from "@space-metaverse-ag/space-ui";
import { rgba } from "@space-metaverse-ag/space-ui/helpers";
import styled from "styled-components";

const AuthorLink = styled.a`
  color: ${({ theme }) => theme.colors.blue};
  cursor: pointer;
  font-weight: ${({ theme }) => theme.fonts.weight.bold};
  text-decoration: none;
`;

const CardButton = styled.div`
  top: .5rem;
  right: .5rem;
  width: 2rem;
  height: 2rem;
  cursor: pointer;
  display: flex;
  position: absolute;
  transition: ${({ theme }) => theme.transitions.ease};
  align-items: center;
  border-radius: ${({ theme }) => theme.radius.full};
  justify-content: center;
  background-color: ${({ theme }) => rgba(theme.colors.dark[600], '.24')};

  &:hover {
    background-color: ${({ theme }) => rgba(theme.colors.dark[600], '.48')};
  }
`;

const CardWrapper = styled.div`
  width: 100%;
  position: relative;

  .is-popover + div {
    top: 2rem;
    right: .5rem;
  }
`;

const ImageContainer = styled.div`
  margin-right: 1rem;

  @media (max-width: 700px) {
    flex-basis: 100%;
  }

  img {
    border-radius: 0.5rem;
    width: 100%;
  }
`;

const TextContainer = styled.div`
  flex: 1;
  flex-direction: column;

  @media (max-width: 600px) {
    flex-basis: 100%;
  }

  & > * {
    margin-top: 1.75rem;
    margin-bottom: 1rem;
  }
`;

const Card = styled(CustomCard)`
  width: 100%;
`

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

export default {
  Card,
  Wrapper,
  AuthorLink,
  CardButton,
  CardWrapper,
  ImageContainer,
  TextContainer,
};
