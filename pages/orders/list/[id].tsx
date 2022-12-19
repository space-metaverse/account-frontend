import { useMemo, useState, type ReactElement } from "react";

import {
  Alert,
  Table,
  Button,
  Spinner
} from '@space-metaverse-ag/space-ui';
import { useGetOrderQuery } from 'api/account'
import { format } from 'date-fns'
import formatPrice from 'helpers/price'
import Layout from "layouts/layout";
import type { GetServerSideProps } from "next";
import Head from "next/head";
import Image from 'next/image'
import styled from "styled-components";

import type { NextPageWithLayout } from "../../../types";

const Infos = styled.div`
  width: 100%;
  display: flex;
  max-width: 18.5rem;
  margin-left: auto;
  flex-direction: column;

  > div {
    display: flex;
    font-family: ${({ theme }) => theme.fonts.family.body};
    align-items: center;
    justify-content: space-between;

    p {
      color: ${({ theme }) => theme.colors.dark[800]};
    }

    span {
      color: ${({ theme }) => theme.colors.dark[600]};
    }

    &.is-item {
      p {
        ${({ theme }) => theme.fonts.size.md};
      }

      span {
        ${({ theme }) => theme.fonts.size.sm};
        font-weight: ${({ theme }) => theme.fonts.weight.semibold};
      }

      &:not(:first-of-type) {
        margin-top: 1.5rem;
      }
    }

    &.is-total {
      margin-top: 1.5rem;
      border-top: ${({ theme }) => `1px solid ${theme.colors.dark[200]}`};
      padding-top: 1.5rem;

      p,
      span {
        ${({ theme }) => theme.fonts.size.xl};
        font-weight: ${({ theme }) => theme.fonts.weight.medium};
      }
    }
  }
`

const Content = styled.div`
  display: flex;
  flex-direction: column;

  p {
    color: ${({ theme }) => theme.colors.dark[600]};
    font-weight: ${({ theme }) => theme.fonts.weight.semibold};
  }

  h6 {
    font-weight: ${({ theme }) => theme.fonts.weight.bold};
    margin-bottom: 1.5rem;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  span {
    ${({ theme }) => theme.fonts.size.md};
  }

  h6, 
  span {
    color: ${({ theme }) => theme.colors.dark[800]};
  }

  p,
  h6 {
    ${({ theme }) => theme.fonts.size.sm};
  }

  p,
  span {
    font-family: ${({ theme }) => theme.fonts.family.body};
  }

  .cols-1 {
    gap: 2rem;
    display: flex;
    flex-direction: column;
  }

  .cols-2 {
    gap: 2rem 3rem;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }

  .is-group {
    gap: .5rem;
    display: flex;
    flex-direction: column;
  }
`

const Wrapper = styled.div`
  gap: 2rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  .is-large {
    grid-column: span 2/span 2;
  }
`

const Loading = styled.div`
  width: 100%;
  margin: 5rem auto;
  display: flex;
  justify-content: center;
`

const Actions = styled.div`
  gap: 1rem;
  margin: 2rem 0 6rem;
  display: flex;
  position: relative;
  border-top: ${({ theme }) => `1px solid ${theme.colors.dark[200]}`};
  padding-top: 2rem;
  align-items: center;
`

const ListProducts = styled.div`
  margin: 2rem 0;
  padding: 2rem 0;
  border-top: ${({ theme }) => `1px solid ${theme.colors.dark[200]}`};
  border-bottom: ${({ theme }) => `1px solid ${theme.colors.dark[200]}`};
`

const CustomizedTable = styled(Table)`
  thead {
    background-color: transparent;

    th > div > div {
      display: none;
    }
  }

  .product {
    display: flex;
    align-items: center;

    &-thumb {
      width: 5rem;
      height: 5rem;
      position: relative;
      min-width: 5rem;
      border-radius: ${({ theme }) => theme.radius['2xl']};
      background-color: ${({ theme }) => theme.colors.dark[200]};

      img {
        object-fit: cover;
        border-radius: ${({ theme }) => theme.radius['2xl']};
      }
    }

    &-container {
      gap: .5rem;
      display: flex;
      margin-left: 1.5rem;
      font-family: ${({ theme }) => theme.fonts.family.body};
      flex-direction: column;

      * {
        text-align: left !important;
      }

      h6 {
        ${({ theme }) => theme.fonts.size.md};
        color: ${({ theme }) => theme.colors.dark[800]};
        font-weight: ${({ theme }) => theme.fonts.weight.semibold};
      }

      &-infos {
        gap: 4rem;
        display: grid;
        grid-template-columns: repeat(3, 1fr);

        span {
          ${({ theme }) => theme.fonts.size.md};
          color: ${({ theme }) => theme.colors.dark[800]};
          display: flex;
          text-transform: capitalize;
          flex-direction: column;

          b {
            ${({ theme }) => theme.fonts.size.sm};
            color: ${({ theme }) => theme.colors.dark[600]};
          }
        }
      }
    }
  }
`

const Message = styled(Alert)`
  top: 7rem;
  position: absolute;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 1279px) {
    ${Content} {
      .cols-2 {
        gap: 2rem 1rem;
      }
    }
  }

  @media screen and (max-width: 640px) {
    ${Wrapper} {
      grid-template-columns: repeat(1, 1fr);
    }

    ${Actions} {
      flex-direction: column;

      button {
        width: 100%;
      }
    }

    ${CustomizedTable} {
      .product-container-infos {
        grid-template-columns: repeat(1, 1fr);
      }
    }
  }

  @media screen and (max-width: 448px) {
    ${Content} {
      .cols-2 {
        grid-template-columns: repeat(1, 1fr);
      }
    }
  }
`

interface OrderProps {
  id: string
}

const Order: NextPageWithLayout<OrderProps> = ({ id }) => {
  const [comingSoon, setComingSoon] = useState(false)

  const {
    data,
    isLoading,
    isFetching,
  } = useGetOrderQuery({ id })

  const showComingSoon = () => {
    setComingSoon(true)

    setTimeout(() => setComingSoon(false), 4000);
  }

  const rows = useMemo(() => {
    if (data && data.items.length > 0) {
      return data.items.map(({
        type,
        name,
        color,
        price,
        quantity,
        thumbnail_url: thumbnailUrl
      }) => ({
        product: (
          <div className="product">
            <div className="product-thumb">
              {thumbnailUrl && (
                <Image
                  alt=""
                  src={thumbnailUrl}
                  fill
                />
              )}
            </div>

            <div className="product-container">
              <h6>{name}</h6>

              <div className="product-container-infos">
                <span>
                  <b>Type:</b>
                  {type}
                </span>

                {color && (
                  <span>
                    <b>Color:</b>
                    {color}
                  </span>
                )}
              </div>
            </div>
          </div>
        ),
        quantity: quantity || '0',
        price: price <= 0
          ? 'Crypto'
          : formatPrice(price),
        subTotal: formatPrice(quantity * price),
      }))
    }

    return []
  }, [data])

  const subTotal = useMemo(() => {
    if (data) {
      const calculate = data.items.map(({ quantity, price }) => price > 0 ? quantity * price : 0)

      return calculate.reduce((acc, curr) => acc + curr, 0)
    }

    return 0
  }, [data])

  return (
    <div>
      {isFetching && (
        <Loading>
          <Spinner />
        </Loading>
      )}

      {data && !isLoading && (
        <Container>
          <Wrapper>
            <Content className="is-large">
              <h6>Order Info</h6>

              <div className="cols-2">
                <div className="is-group">
                  <p>Order Date:</p>
                  <span>{format(new Date(data.date), 'dd MMM yyyy')}</span>
                </div>

                <div className="is-group">
                  <p>Order Number:</p>
                  <span>{data.order_sid}</span>
                </div>

                <div className="is-group">
                  <p>Shipping Details:</p>
                  <span>
                    {data.customer.name}<br />
                    {data.customer.address}<br />
                    {data.customer.city ? `${data.customer.city},` : ''} {data.customer.state ? `${data.customer.state},` : ''} {data.customer.zipcode}
                    <br />
                    <br />

                    {data.customer.email || 'No email available'}
                    <br />
                    <br />

                    {data.customer.phone || 'No phone available'}
                  </span>
                </div>

                <div className="is-group">
                  <p>Billed To:</p>
                  <span>
                    {data.customer.name}
                  </span>
                </div>
              </div>
            </Content>

            <Content>
              <h6>Seller Info</h6>

              <div className="cols-1">
                <div className="is-group">
                  <p>Seller:</p>
                  <span>{data.store.name || '-'}</span>
                </div>

                <div className="is-group">
                  <p>Address:</p>
                  <span>
                    {data.store.name}<br />
                    {data.store.address}<br />
                    {data.store.city ? `${data.store.city},` : ''} {data.store.state ? `${data.store.state},` : ''} {data.store.zipcode}
                    <br />
                    <br />

                    {data.store.email || 'No email available'}
                    <br />
                    <br />

                    {data.store.phone || 'No phone available'}
                  </span>
                </div>
              </div>
            </Content>
          </Wrapper>

          <ListProducts>
            <CustomizedTable
              rows={rows}
              columns={["Product", "Quantity", "Price", "SubTotal"]}
              withBorder={false}
            />
          </ListProducts>

          <Infos>
            <div className="is-item">
              <span>Sub Total:</span>
              <p>{formatPrice(subTotal)}</p>
            </div>

            <div className="is-item">
              <span>Shipping:</span>
              <p>{data.shipping_cost ? formatPrice(data.shipping_cost) : '-'}</p>
            </div>

            <div className="is-item">
              <span>Taxes:</span>
              <p>$0</p>
            </div>

            <div className="is-total">
              <span>Total:</span>
              <p>{data.amount ? formatPrice(data.amount) : data.crypto_amount}</p>
            </div>
          </Infos>

          <Actions>
            <Button
              size="large"
              label="Download Receipt"
              color="blue"
              onClick={showComingSoon}
            />

            <Button
              size="large"
              label="Return All Items"
              color="red"
              outline
              onClick={showComingSoon}
            />

            {comingSoon && (
              <Message
                text="Feature coming soon"
                type="info"
              />
            )}
          </Actions>
        </Container>
      )}
    </div>
  )
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: {
      id: ctx.query.id
    },
  }
};

Order.getLayout = (page: ReactElement) => (
  <Layout.Layout
    title="Order Details"
    isBack
  >
    <Head>
      <title>Order Details | SPACE</title>
      <meta name="description" content="SPACE Order Details" />
    </Head>

    {page}
  </Layout.Layout>
);

export default Order;
