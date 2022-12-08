import type { PropsWithChildren } from "react";

import { SideNav, type SideNavProps } from "@space-metaverse-ag/space-ui";
import {
  NFT,
  User,
  Wallet,
  Orders,
  Avatar,
  Friends,
  Profile,
  Security,
  Phygital,
  ArrowLeft,
  OrdersList,
  Collection,
  FriendsAdd,
  FriendsList,
  ReturnAndRefund,
  FriendsRequests,
  ConnectedWallets,
  ConnectNewWallet,
} from "@space-metaverse-ag/space-ui/icons";
import type { NextPage } from "next";
import { useRouter } from "next/router";

import { MainStyles, SharedStyles } from "./layoutStyles";

interface LayoutProps extends PropsWithChildren {
  title: string
  isBack?: boolean
}

const options: SideNavProps["routes"] = [
  {
    Icon: User,
    label: "Profile",
    route: null,
    disabled: false,
    children: [
      {
        Icon: Profile,
        route: "/profile/information",
        label: "Profile Information",
        disabled: false,
      },
      {
        Icon: Avatar,
        route: "/profile/avatars",
        label: "Avatars",
        disabled: true,
      },
      {
        Icon: Security,
        route: "/profile/security",
        label: "Security Settings",
        disabled: false,
      },
    ],
  },
  {
    Icon: Friends,
    label: "Friends",
    route: null,
    disabled: true,
    children: [
      {
        Icon: FriendsList,
        route: "/friends/your-friends",
        label: "Your Friends",
      },
      {
        Icon: FriendsAdd,
        route: "/friends/add-friend",
        label: "Add Friend",
      },
      {
        Icon: FriendsRequests,
        route: "/friends/manage",
        label: "Manage Requests",
      },
    ],
  },
  {
    Icon: Wallet,
    route: "/wallets",
    label: "Wallets",
    disabled: false,
  },
  {
    Icon: Orders,
    route: null,
    label: "My Orders",
    disabled: false,
    children: [
      {
        Icon: OrdersList,
        route: "/orders/list",
        label: "Orders List",
      },
      {
        Icon: ReturnAndRefund,
        route: "/orders/return-requests",
        label: "Return Requests",
        disabled: true,
      },
    ],
  },
  {
    Icon: NFT,
    label: "NFT Inventory",
    route: "/nft-inventory",
    disabled: true,
  },
  {
    Icon: Collection,
    label: "Space Inventory",
    route: "/space-inventory",
    disabled: false,
    children: [
      {
        Icon: Phygital,
        label: "Phygital",
        route: "/space-inventory/phygital",
      },
    ],
  },
];

const Layout: NextPage<LayoutProps> = ({
  title,
  isBack,
  children,
}) => {
  const {
    back,
    push
  } = useRouter();

  return (
    <MainStyles.Wrapper>
      <SideNav
        title="Account Settings"
        goBack={back}
        routes={options}
        onNavigate={push}
      />

      <MainStyles.Content>
        <MainStyles.Title>
          {isBack && <ArrowLeft onClick={back} />}

          {title}
        </MainStyles.Title>

        {children}
      </MainStyles.Content>
    </MainStyles.Wrapper>
  );
};

export default {
  Layout,
  SharedStyles,
};
