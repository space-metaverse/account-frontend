import { useState } from 'react'

import {
  NFT,
  User,
  Wallet,
  Avatar,
  Friends,
  Profile,
  Security,
  ArrowLeft,
  Collection,
  FriendsAdd,
  FriendsList,
  FriendsRequests
} from '@space-metaverse-ag/space-ui/icons'

import * as Styled from './styles'
import type { OptionProps, OptionComponentProps } from './types'

const options: OptionProps[] = [
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

const Option: React.FC<OptionComponentProps> = ({
  show,
  Icon,
  label,
  select,
  selected,
  children,
  toggleState
}) => (
  <Styled.OptionWrapper>
    <Styled.Option
      onClick={() => {
        (!children) && select(label);
        (children) && toggleState()
      }}
      selected={label === selected && !children}
    >
      <Icon width={24} height={24} />
      <p>{label}</p>
      {children && <Styled.IconDropDown />}
    </Styled.Option>

    {show && children && (
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
            toggleState={() => toggleState(index, !!option?.children)}
          >
            {option.children}
          </Option>
        ))}
      </Styled.Options>
    </Styled.Wrapper>
  )
}

export default Sidenav
