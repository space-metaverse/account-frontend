import { useState } from 'react'

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
  DropUp,
  ArrowLeft,
  SVGProps
} from '@space-metaverse-ag/space-ui/icons'

import * as Styled from './styles'

interface OptionType {
  label: string
  Icon: (props?: SVGProps) => JSX.Element
  showChildren: boolean
  children?: Array<{ label: string, Icon: any }>
}
type OptionsType = OptionType[]

const options: OptionsType = [
  {
    label: 'Profile',
    Icon: User,
    showChildren: false,
    children: [
      {
        label: 'Profile Information',
        Icon: Profile
      },
      {
        label: 'Avatars',
        Icon: Avatar
      },
      {
        label: 'Security Settings',
        Icon: Security
      }
    ]
  },
  {
    label: 'Friends',
    Icon: Friends,
    showChildren: false,
    children: [
      {
        label: 'Your Friends',
        Icon: FriendsList
      },
      {
        label: 'Add Friend',
        Icon: FriendsAdd
      },
      {
        label: 'Manage Requests',
        Icon: FriendsRequests
      }
    ]
  },
  {
    label: 'Connected Wallets',
    Icon: Wallet,
    showChildren: false
  },
  {
    label: 'NFT Inventory',
    Icon: NFT,
    showChildren: false
  },
  {
    label: 'Space Inventory',
    Icon: Collection,
    showChildren: false
  }
]

type OptionComponentType = OptionType & {
  noDivider?: boolean
  toggleState: () => void
  selected: string
  select: (name: string) => void
}

const Option = ({
  label,
  Icon,
  showChildren,
  children,
  noDivider,
  toggleState,
  selected,
  select
}: OptionComponentType) => {
  return (
    <Styled.OptionWrapper>
      <Styled.Option
        onClick={() => {
          (children == null) && select(label)
          ;(children != null) &&
            !children.map((c) => c.label).includes(selected) &&
            toggleState()
        }}
        selected={label === selected && (children == null)}
      >
        <div>
          <Icon />
          <p>{label}</p>
        </div>
        {showChildren && (children != null) ? <DropUp /> : <DropDown />}
      </Styled.Option>

      {(children != null) && showChildren && (
        <Styled.Options child>
          {children.map((item, index) => {
            return (
              <Styled.Option
                child
                onClick={() => select(item.label)}
                selected={selected === item.label}
                key={item.label}
              >
                <div>
                  <item.Icon />
                  <p>{item.label}</p>
                </div>
              </Styled.Option>
            )
          })}
        </Styled.Options>
      )}

      {!noDivider && <Styled.Divider absolute />}
    </Styled.OptionWrapper>
  )
}

const Sidenav: React.FC = () => {
  const [SideOptions, setSideOptions] = useState(options)
  const [OptionSelected, setOptionSelected] = useState('')

  function toggleState (index: number) {
    const copy = [...SideOptions]
    copy[index].showChildren = !copy[index].showChildren
    setSideOptions(copy)
  }

  function selectItem (name: string) {
    setOptionSelected(name)
  }

  return (
    <Styled.Wrapper>
      <Styled.Content>
        <Styled.Title>
          <Styled.BackIconButton>
            <ArrowLeft />
          </Styled.BackIconButton>
          Account Settings
        </Styled.Title>
      </Styled.Content>

      <Styled.Divider />

      <Styled.Content>
        <Styled.Options>
          {SideOptions.map((option, index) => {
            return (
              <div key={option.label}>
                <Option
                  label={option.label}
                  Icon={option.Icon}
                  showChildren={option.showChildren}
                  children={option.children}
                  noDivider={index == SideOptions.length - 1}
                  selected={OptionSelected}
                  select={selectItem}
                  toggleState={() => toggleState(index)}
                />
              </div>
            )
          })}
        </Styled.Options>
      </Styled.Content>
    </Styled.Wrapper>
  )
}

export default Sidenav
