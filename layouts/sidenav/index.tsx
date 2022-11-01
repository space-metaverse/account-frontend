import * as Styled from "./styles";
import {
  User,
  Friends,
  Wallet,
  NFT,
  Collection,
  DropDown,
  Profile,
  Avatar,
  Security,
  FriendsList,
  FriendsAdd,
  FriendsRequests,
} from "@space-metaverse-ag/space-ui/icons";

type OptionType = {
  label: string;
  icon: any;
  children?: Array<{ label: string; icon: any }>;
};
type OptionsType = Array<OptionType>;

const options: OptionsType = [
  {
    label: "Profile",
    icon: User,
    children: [
      {
        label: "Profile Information",
        icon: Profile,
      },
      {
        label: "Avatars",
        icon: Avatar,
      },
      {
        label: "Security Settings",
        icon: Security,
      },
    ],
  },
  {
    label: "Friends",
    icon: Friends,
    children: [
      {
        label: "Your Friends",
        icon: FriendsList,
      },
      {
        label: "Add Friend",
        icon: FriendsAdd,
      },
      {
        label: "Manage Requests",
        icon: FriendsRequests,
      },
    ],
  },
  {
    label: "Connected Wallets",
    icon: Wallet,
  },
  {
    label: "NFT Inventory",
    icon: NFT,
  },
  {
    label: "Space Inventory",
    icon: Collection,
  },
];

function OptionIcon({ Icon }: any) {
  if (!Icon) return <></>;
  return <Icon></Icon>;
}

const BuildList = ({ list }: { list: OptionsType }) => {
  return (
    <Styled.Options>
      {list.map((item, index) => {
        return (
          <>
            <Styled.Option key={item.label}>
              <Styled.OptionContent>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "12px" }}
                >
                  <OptionIcon Icon={item.icon} />
                  {item.label}
                </div>
                <DropDown />
              </Styled.OptionContent>
              {item.children && (
                <Styled.Options
                  style={{ marginLeft: "34px", paddingTop: "10px" }}
                >
                  {item.children.map((child) => {
                    return (
                      <Styled.Option style={{ padding: "10px 0" }}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                          }}
                        >
                          <OptionIcon Icon={child.icon} />
                          {child.label}
                        </div>
                      </Styled.Option>
                    );
                  })}
                </Styled.Options>
              )}
            </Styled.Option>
            {index !== list.length - 1 && <Styled.Divider />}
          </>
        );
      })}
    </Styled.Options>
  );
};

const Sidenav: React.FC = () => {
  return (
    <Styled.Wrapper>
      <Styled.Content>
        <Styled.Title>
          <Styled.BackIconButton />
          Account Settings
        </Styled.Title>
      </Styled.Content>

      <Styled.Divider />
      <Styled.Content>
        <Styled.Options>
          <BuildList list={options} />
        </Styled.Options>
      </Styled.Content>
    </Styled.Wrapper>
  );
};

export default Sidenav;
