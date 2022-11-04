import { useState } from 'react'

import {
  User,
  Friends,
  Wallet,
  NFT,
  Collection,
  Profile,
  Avatar,
  Security,
  FriendsList,
  FriendsAdd,
  FriendsRequests,
  ArrowLeft,
  SVGProps
} from '@space-metaverse-ag/space-ui/icons'

import * as Styled from './styles'

interface OptionType {
  label: string
  Icon: (props?: SVGProps) => JSX.Element
  children?: Array<{ label: string, Icon: any }>
}
type OptionsType = OptionType[]

const options: OptionsType = [
  {
    Icon: User,
    label: 'Profile',
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
    Icon: Friends,
    label: 'Friends',
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
    Icon: Wallet,
    label: 'Connected Wallets'
  },
  {
    label: 'NFT Inventory',
    Icon: NFT
  },
  {
    label: 'Space Inventory',
    Icon: Collection
  }
]

type OptionComponentType = OptionType & {
  show: boolean
  select: (name: string) => void
  selected: string
  toggleState: () => void
}

const Option = ({
  show,
  Icon,
  label,
  select,
  selected,
  children,
  toggleState
}: OptionComponentType) => (
  <Styled.OptionWrapper>
    <Styled.Option
      onClick={() => {
        (children == null) && select(label);
        (children != null) && toggleState()
      }}
      selected={label === selected && (children == null)}
    >
      <Icon width={24} height={24} />
      <p>{label}</p>
      {children != null && <Styled.IconDropDown />}
    </Styled.Option>

    {show && children != null && (
      <Styled.Options>
        {children.map((item) => (
          <Styled.Option
            key={item.label}
            child
            onClick={() => select(item.label)}
            selected={selected === item.label}
          >
            <item.Icon width={24} height={24} />
            <p>{item.label}</p>
          </Styled.Option>
        ))}
      </Styled.Options>
    )}
  </Styled.OptionWrapper>
)

const Sidenav: React.FC = () => {
  const [show, setShow] = useState(-1)
  const [optionSelected, setOptionSelected] = useState('')

  const toggleState = (index: number, hasChildren: boolean): void => {
    if (hasChildren) setShow((prev) => prev !== index ? index : -1)
  }

  const selectItem = (name: string): void => {
    setOptionSelected(name)
  }

  return (
    <Styled.Wrapper>
      <Styled.Content>
        <Styled.BackIconButton>
          <ArrowLeft />
        </Styled.BackIconButton>
        <Styled.Title>
          Account Settings
        </Styled.Title>
      </Styled.Content>

      <Styled.Options>
        {options.map((option, index) => (
          <Option
            key={option.label}
            show={show === index}
            Icon={option.Icon}
            label={option.label}
            select={selectItem}
            selected={optionSelected}
            toggleState={() => toggleState(index, option.children)}
          >
            {option.children}
          </Option>
        ))}
      </Styled.Options>
    </Styled.Wrapper>
  )
}

export default Sidenav
