import { type ReactElement } from "react";

import Profile from "layouts/profile";
import Head from "next/head";

import { Table, Chip, Popover } from "@space-metaverse-ag/space-ui";
import type { NextPageWithLayout } from "../../types";
import styled from "styled-components";

import { Dots, Edit, Delete } from "@space-metaverse-ag/space-ui/icons";

const columns = ["Order Number", "Order Date", "Items", "Total", "Status", ""];

const OrderLabel = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: #3332fe;
  cursor: pointer;
`;

const ButtonDots = styled.div`
  cursor: pointer;
`;

const OrdersList: NextPageWithLayout = () => {
  const rows = [
    {
      orderNumber: <OrderLabel>1000100-001</OrderLabel>,
      orderDate: "1 Jan 2022",
      items: "4 items",
      total: "$1257.98",
      status: <Chip label="Pending" color="grey" />,
      actions: (
        <Popover
          options={[
            {
              icon: () => <Edit />,
              label: "Edit",
              callback: () => console.log("edit"),
            },
            {
              icon: () => <Delete />,
              label: "Delete",
              callback: () => console.log("delete"),
            },
          ]}
          position="bottom"
        >
          <ButtonDots>
            <Dots style={{ height: "2rem" }} />
          </ButtonDots>
        </Popover>
      ),
    },
    {
      orderNumber: <OrderLabel>1000100-002</OrderLabel>,
      orderDate: "1 Jan 2022",
      items: "4 items",
      total: "$1257.98",
      status: <Chip label="Complete" color="green" />,
      actions: (
        <Popover
          options={[
            {
              icon: () => <Edit />,
              label: "Edit",
              callback: () => console.log("edit"),
            },
            {
              icon: () => <Delete />,
              label: "Delete",
              callback: () => console.log("delete"),
            },
          ]}
          position="bottom"
        >
          <ButtonDots>
            <Dots style={{ height: "2rem" }} />
          </ButtonDots>
        </Popover>
      ),
    },
    {
      orderNumber: <OrderLabel>1000100-003</OrderLabel>,
      orderDate: "1 Jan 2022",
      items: "4 items",
      total: "$1257.98",
      status: <Chip label="In Process" color="orange" />,
      actions: (
        <Popover
          options={[
            {
              icon: () => <Edit />,
              label: "Edit",
              callback: () => console.log("edit"),
            },
            {
              icon: () => <Delete />,
              label: "Delete",
              callback: () => console.log("delete"),
            },
          ]}
          position="bottom"
        >
          <ButtonDots>
            <Dots style={{ height: "2rem" }} />
          </ButtonDots>
        </Popover>
      ),
    },
    {
      orderNumber: <OrderLabel>1000100-004</OrderLabel>,
      orderDate: "1 Jan 2022",
      items: "4 items",
      total: "$1257.98",
      status: <Chip label="Shipped" color="blue" />,
      actions: (
        <Popover
          options={[
            {
              icon: () => <Edit />,
              label: "Edit",
              callback: () => console.log("edit"),
            },
            {
              icon: () => <Delete />,
              label: "Delete",
              callback: () => console.log("delete"),
            },
          ]}
          position="bottom"
        >
          <ButtonDots>
            <Dots style={{ height: "2rem" }} />
          </ButtonDots>
        </Popover>
      ),
    },
    {
      orderNumber: <OrderLabel>1000100-005</OrderLabel>,
      orderDate: "1 Jan 2022",
      items: "4 items",
      total: "$1257.98",
      status: <Chip label="Cancelled" color="red" />,
      actions: (
        <Popover
          options={[
            {
              icon: () => <Edit />,
              label: "Edit",
              callback: () => console.log("edit"),
            },
            {
              icon: () => <Delete />,
              label: "Delete",
              callback: () => console.log("delete"),
            },
          ]}
          position="bottom"
        >
          <ButtonDots>
            <Dots style={{ height: "2rem" }} />
          </ButtonDots>
        </Popover>
      ),
    },
  ];

  return <Table columns={columns} rows={rows} withBorder={false} />;
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
