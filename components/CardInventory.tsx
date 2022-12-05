import { Popover, Card as CustomCard } from "@space-metaverse-ag/space-ui";
import { rgba } from "@space-metaverse-ag/space-ui/helpers";
import { Dots, DragPoint } from "@space-metaverse-ag/space-ui/icons";
import { useRouter } from "next/router";
import styled from "styled-components";

interface CardInventoryProps {
  id: string
  name: string
  cover: string
  author: {
    url: string
    name: string
  }
}

const Button = styled.div`
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

const Wrapper = styled.div`
  width: 100%;
  position: relative;

  .is-popover + div {
    top: 2rem;
    right: .5rem;
  }
`;

const Card = styled(CustomCard)`
  width: 100%;

  img {
    height: 14.25rem;
  }
`

const Content = styled.div`
  p {
    color: ${({ theme }) => theme.colors.dark[600]};
    margin-top: .75rem;

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
    font-family: ${({ theme }) => theme.fonts.family.body};
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
    <Wrapper>
      <Popover
        options={[
          {
            icon: DragPoint,
            label: "Details",
            callback: async () =>
              await push(`/space-inventory/details/${id}`),
          },
        ]}
        className="is-popover"
      >
        <Button>
          <Dots stroke="#fff" />
        </Button>
      </Popover>

      <Card image={cover}>
        <Content>
          <h2>{name}</h2>

          <p>
            Created By:{" "}

            <a
              rel="noopener noreferrer"
              href={author.url}
              target="_blank"
            >
              {author.name}
            </a>
          </p>
        </Content>
      </Card>
    </Wrapper>
  )
}

export default CardInventory
