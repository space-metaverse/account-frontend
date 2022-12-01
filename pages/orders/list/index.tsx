import { useMemo, type ReactElement } from "react";

import {
  Chip,
  Table,
  Spinner,
  type ChipProps,
} from '@space-metaverse-ag/space-ui';
import { DropRight, Products as IconProducts } from "@space-metaverse-ag/space-ui/icons";
import { useGetOrdersQuery } from 'api/account'
import { format } from 'date-fns'
import Profile from "layouts/profile";
import Head from "next/head";
import { useRouter } from 'next/router'
import styled from "styled-components";

import type { NextPageWithLayout } from "../../../types";

const Empty = styled.div`
  width: 100%;
  display: flex;
  padding: 7rem 1.5rem;
  align-items: center;
  border-radius: ${({ theme }) => `${theme.radius.xl} 0 0 ${theme.radius.xl}`};
  flex-direction: column;
  justify-content: center;

  h2 {
    ${({ theme }) => theme.fonts.size.xl};
    color: ${({ theme }) => theme.colors.dark['800']};
    max-width: 18rem;
    margin-top: 1rem;
    text-align: center;
    font-weight: ${({ theme }) => theme.fonts.weight.bold};
  }

  path {
    stroke: ${({ theme }) => theme.colors.blue['400']};
  }
`

const Loading = styled.div`
  width: 100%;
  margin: 5rem auto;
  display: flex;
  justify-content: center;
`

const CustomizedTable = styled(Table)`
  tbody {
    td {
      path {
        stroke: ${({ theme }) => theme.colors.dark[600]};
      }

      .order-number {
        color: ${({ theme }) => theme.colors.blue[400]};
        font-weight: ${({ theme }) => theme.fonts.weight.semibold};
      }
    }
  }
`

const listStatus = {
  completed: {
    label: 'Completed',
    appearance: 'green'
  },
  delivered: {
    label: 'Delivered',
    appearance: 'blue'
  },
  dispatched: {
    label: 'Dispatched',
    appearance: 'blue'
  },
  payment_failed: {
    label: 'Failed',
    appearance: 'red',
  },
  payment_canceled: {
    label: 'Canceled',
    appearance: 'grey',
  },
  payment_succeeded: {
    label: 'Succeeded',
    appearance: 'green',
  },
  payment_processing: {
    label: 'Processing',
    appearance: 'orange',
  }
}

const OrdersList: NextPageWithLayout = () => {
  const {
    push
  } = useRouter();

  const {
    data,
    isLoading,
    isFetching,
  } = useGetOrdersQuery({})

  const rows = useMemo(() => {
    if (data && data.length > 0) {
      return data.map(({
        id,
        date,
        items,
        store,
        status,
        amount,
      }) => {
        const currentStatus = listStatus[status as keyof typeof listStatus]

        return ({
          orderNumber: <p title={id} className="order-number">{id}</p>,
          name: store,
          orderDate: format(new Date(date), 'dd MMM yyyy'),
          items: `${items.length} Item${items.length > 1 ? 's' : ''}`,
          total: amount <= 0
            ? 'Crypto'
            : new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD'
            }).format(amount),
          status: <Chip color={currentStatus ? currentStatus.appearance as ChipProps['color'] : 'grey'} label={currentStatus ? currentStatus.label : 'Uninformed'} />,
          more: <DropRight style={{ width: 'fit-content', cursor: 'pointer' }} onClick={async () => await push(`list/${id}`)} />,
        })
      })
    }

    return []
  }, [push, data])

  return (
    <div>
      {isFetching && (
        <Loading>
          <Spinner />
        </Loading>
      )}

      {!isFetching && !isLoading && data && data.length <= 0 && (
        <Empty>
          <IconProducts width={40} height={40} />

          <h2>
            Sorry, you don&apos;t have any orders placed.
          </h2>
        </Empty>
      )}

      {!isFetching && rows.length > 0 && (
        <CustomizedTable
          rows={rows}
          columns={["Order Number", "Name", "Order Date", "Items", "Total", "Status", "Info"]}
          withBorder={false}
        />
      )}
    </div>
  );
};

OrdersList.getLayout = (page: ReactElement) => (
  <Profile.Layout title="Orders List">
    <Head>
      <title>Orders List | SPACE</title>
      <meta name="description" content="SPACE Orders" />
    </Head>

    {page}
  </Profile.Layout>
);

export default OrdersList;
