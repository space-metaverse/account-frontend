import truncate from "helpers/truncate";
import { useRouter } from "next/router";
import styled from "styled-components";

interface CardInventoryProps {
  id: string
  name: string
  cover: string
  author: string
}

const Card = styled.div`
  width: 16rem;
  position: relative;
  cursor: pointer;
  border: ${({ theme }) => `1px solid ${theme.colors.dark['200']}`};
  transition: ${({ theme }) => theme.transitions.ease};
  border-radius: ${({ theme }) => theme.radius['2xl']};

  img {
    height: 5rem;
    width: 100%;
    min-height: 12rem;
    object-fit: cover;
    border-radius: ${({ theme }) => `${theme.radius['2xl']} ${theme.radius['2xl']} 0 0`};
  }
  
  &:hover {
    border-color: ${({ theme }) => theme.colors.dark['300']};
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.dark[100]};
    box-shadow: 0 0 0 1px ${({ theme }) => theme.colors.dark[200]};
  }
`

const Content = styled.div`
  padding: 1rem 1.5rem 1.5rem 1.5rem;

  p {
    color: ${({ theme }) => theme.colors.dark[600]};
    margin-top: .75rem;
    font-family: ${({ theme }) => theme.fonts.family.body};

    a {
      color: ${({ theme }) => theme.colors.blue};
      cursor: pointer;
      font-weight: ${({ theme }) => theme.fonts.weight.medium};
      text-decoration: none;
    }
  }

  h2 {
    color: ${({ theme }) => theme.colors.dark[800]};
    font-weight: ${({ theme }) => theme.fonts.weight.semibold};
  }

  p,
  h2 {
    ${({ theme }) => theme.fonts.size.md};
  }
`

const CardInventory: React.FC<CardInventoryProps> = ({
  id,
  name,
  cover,
  author,
}) => {
  const {
    push
  } = useRouter();

  return (
    <Card onClick={async () => await push(`/space-inventory/details/${id}`)}>
      <img src={cover} alt={name} />
      <Content>
        <h2>{name}</h2>
        <p>
          Created by:
        </p>
        <p>
          {truncate(author)}
        </p>
      </Content>
    </Card>
  )
}

export default CardInventory
