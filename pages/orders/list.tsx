import type { ReactElement } from "react";

import { Table, Chip } from "@space-metaverse-ag/space-ui";
import { DropRight } from "@space-metaverse-ag/space-ui/icons";
import Profile from "layouts/profile";
import Head from "next/head";
import styled from "styled-components";

import type { NextPageWithLayout } from "../../types";

const columns = ["Order Number", "Name", "Order Date", "Items", "Total", "Status", "Info"];

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

const OrdersList: NextPageWithLayout = () => {
  const rows = [
    {
      name: 'Jeremiah Patel',
      orderDate: "1 Jan 2022",
      items: "4 items",
      total: "$1257.98",
      status: <Chip label="Pending" color="grey" />,
      more: <DropRight style={{ width: 'fit-content' }} />,
    },
    {
      name: 'Jeremiah Patel',
      orderDate: "1 Jan 2022",
      items: "4 items",
      total: "$1257.98",
      status: <Chip label="Complete" color="green" />,
      more: <DropRight style={{ width: 'fit-content' }} />,
    },
    {
      name: 'Jeremiah Patel',
      orderDate: "1 Jan 2022",
      items: "4 items",
      total: "$1257.98",
      status: <Chip label="In Process" color="orange" />,
      more: <DropRight style={{ width: 'fit-content' }} />,
    },
    {
      name: 'Jeremiah Patel',
      orderDate: "1 Jan 2022",
      items: "4 items",
      total: "$1257.98",
      status: <Chip label="Shipped" color="blue" />,
      more: <DropRight style={{ width: 'fit-content' }} />,
    },
    {
      name: 'Jeremiah Patel',
      orderDate: "1 Jan 2022",
      items: "4 items",
      total: "$1257.98",
      status: <Chip label="Cancelled" color="red" />,
      more: <DropRight style={{ width: 'fit-content' }} />,
    },
  ];

  const data = rows.map((row, index) => ({
    orderNumber: <p className="order-number">{`1000100-00${index + 1}`}</p>,
    ...row,
  }))

  return (
    <CustomizedTable
      rows={data}
      columns={columns}
      withBorder={false}
    />
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
