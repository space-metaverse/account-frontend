import { useMemo, type ReactElement } from "react";

import { Table, Spinner } from '@space-metaverse-ag/space-ui';
import { useGetOrderQuery } from 'api/account'
import { format } from 'date-fns'
import formatPrice from 'helpers/price'
import Profile from "layouts/profile";
import type { GetServerSideProps } from "next";
import Head from "next/head";
import styled from "styled-components";

import type { NextPageWithLayout } from "../../../types";

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

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const CustomizedTable = styled(Table)`
  padding: 2rem 0;
  border-top: ${({ theme }) => theme.colors.dark[200]};
  border-bottom: ${({ theme }) => theme.colors.dark[200]};
`

interface OrderProps {
  id: string
}

const Order: NextPageWithLayout<OrderProps> = ({ id }) => {
  const {
    data,
    isLoading,
    isFetching,
  } = useGetOrderQuery({ id })

  console.log({ data })

  const rows = useMemo(() => {
    if (data && data.items.length > 0) {
      return data.items.map(({
        price,
        quantity,
      }) => ({
        product: '-',
        quantity: quantity || '0',
        price: price <= 0
          ? 'Crypto'
          : formatPrice(price),
        subTotal: formatPrice(quantity * price),
      }))
    }

    return []
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
                  <span>{data.id}</span>
                </div>

                <div className="is-group">
                  <p>Shipping Details:</p>
                  <span>
                    {data.customer.name}<br />
                    {data.customer.address}<br />
                    {data.customer.city}, {data.customer.state}, {data.customer.country} {data.customer.zipcode}
                    <br />
                    <br />

                    {data.customer.email}
                    <br />
                    <br />

                    {data.customer.phone ? `+${data.customer.phone}` : ''}
                  </span>
                </div>

                <div className="is-group">
                  <p>Billed To:</p>
                  <span>
                    Jeremiah Patel
                    VISA Ending: 1234
                  </span>
                </div>
              </div>
            </Content>

            <Content>
              <h6>Seller Info</h6>

              <div className="cols-1">
                <div className="is-group">
                  <p>Seller:</p>
                  <span>{data.store.name}</span>
                </div>

                <div className="is-group">
                  <p>Address:</p>
                  <span>
                    {data.store.name}<br />
                    {data.store.address}<br />
                    {data.store.city}, {data.store.state}, {data.store.country} {data.store.zipcode}
                    <br />
                    <br />

                    {data.store.email}
                    <br />
                    <br />

                    {data.store.phone ? `+${data.store.phone}` : ''}
                  </span>
                </div>
              </div>
            </Content>
          </Wrapper>

          <CustomizedTable
            rows={rows}
            columns={["Product", "Quantity", "Price", "SubTotal"]}
            withBorder={false}
          />
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
  <Profile.Layout
    title="Order Details"
    isBack
  >
    <Head>
      <title>Order Details | SPACE</title>
      <meta name="description" content="SPACE Order Details" />
    </Head>

    {page}
  </Profile.Layout>
);

export default Order;
