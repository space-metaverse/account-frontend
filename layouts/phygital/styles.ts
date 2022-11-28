import styled from "styled-components";

const Row = styled.div`
  gap: 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 500px) {
    flex-direction: column;
  }
`;

const AuthorLink = styled.a`
  color: ${({ theme }) => theme.colors.blue};
  text-decoration: none;
  font-weight: ${({ theme }) => theme.fonts.weight.bold};
  cursor: pointer;
`;

const CardButton = styled.div`
  position: absolute;
  top: 6px;
  right: 6px;
  width: 30px;
  height: 30px;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  display: flex;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.4);

  &:hover {
    background-color: rgba(0, 0, 0, 0.6);
  }
`;

const CardContainer = styled.div`
  position: relative;
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

const RowNotCentered = styled(Row)`
  align-items: flex-start;
  @media (max-width: 800px) {
    flex-direction: column;
  }
`;

export default {
  Row,
  AuthorLink,
  CardButton,
  CardContainer,
  ImageContainer,
  TextContainer,
  RowNotCentered,
};
