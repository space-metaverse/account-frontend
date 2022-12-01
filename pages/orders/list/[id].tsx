import { type ReactElement } from "react";

import { Table, Spinner } from '@space-metaverse-ag/space-ui';
import { DropRight } from "@space-metaverse-ag/space-ui/icons";
import { useGetOrderQuery } from 'api/account'
import { format } from 'date-fns'
import Profile from "layouts/profile";
import Head from "next/head";
import { useRouter } from 'next/router'
import styled from "styled-components";

import type { NextPageWithLayout } from "../../../types";

const Order: NextPageWithLayout = () => <h1>Order</h1>;

Order.getLayout = (page: ReactElement) => (
  <Profile.Layout title="Order">
    <Head>
      <title>Orders | SPACE</title>
      <meta name="description" content="SPACE Order" />
    </Head>

    {page}
  </Profile.Layout>
);

export default Order;
