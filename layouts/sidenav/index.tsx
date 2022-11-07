import { useState, useEffect } from 'react'

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
import { useRouter } from 'next/router'

import * as Styled from './styles'
import type { OptionProps, OptionComponentProps } from './types'

const options: OptionProps[] = [
  {
    Icon: User,
    label: 'Profile',
    route: null,
    children: [
      {
        Icon: Profile,
        route: '/profile/information',
        label: 'Profile Information'
      },
      {
        Icon: Avatar,
        route: '/profile/avatars',
        label: 'Avatars'
      },
      {
        Icon: Security,
        route: '/profile/security',
        label: 'Security Settings'
      }
    ]
  },
  {
    Icon: Friends,
    label: 'Friends',
    route: null,
    children: [
      {
        Icon: FriendsList,
        route: '/friends/your-friends',
        label: 'Your Friends'
      },
      {
        Icon: FriendsAdd,
        route: '/friends/add-friend',
        label: 'Add Friend'
      },
      {
        Icon: FriendsRequests,
        route: '/friends/manage',
        label: 'Manage Requests'
      }
    ]
  },
  {
    Icon: Wallet,
    route: '/wallet',
    label: 'Connected Wallets'
  },
  {
    Icon: NFT,
    label: 'NFT Inventory',
    route: '/nft-inventory'
  },
  {
    Icon: Collection,
    label: 'Space Inventory',
    route: '/space-inventory'
  }
]

const Option: React.FC<OptionComponentProps> = ({
  show,
  Icon,
  route,
  label,
  select,
  selected,
  children,
  toggleState
}) => (
  <Styled.OptionWrapper>
    <Styled.Option
      onClick={() => {
        (!children) && select(label, route)
        toggleState()
      }}
      animate={show}
      selected={label === selected && !children}
    >
      <Icon width={24} height={24} />
      <p>{label}</p>
      {children && <Styled.IconDropDown />}
    </Styled.Option>

    {children && (
      <Styled.Options show={show} animate>
        {children.map((item) => (
          <Styled.Option
            key={item.label}
            child
            onClick={() => select(item.label, item.route)}
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

  const {
    push,
    pathname
  } = useRouter()

  const navigate = (name: string, route: string | null): void => {
    setOptionSelected(name)

    if (route) push(route)
  }

  useEffect(() => {
    options.forEach(({ route, label, children }, index) => {
      if (route) {
        const path = pathname.includes(route)

        if (path) {
          setOptionSelected(label)

          setShow(index)
        }
      }

      if (children) {
        children.forEach((child) => {
          const path = pathname.includes(child.route)

          if (path) {
            setOptionSelected(child.label)

            setShow(index)
          }
        })
      }

      return false
    })
  }, [pathname])

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

      <Styled.Options animate={false}>
        {options.map((props, index) => (
          <Option
            {...props}
            key={props.label}
            show={show === index}
            select={navigate}
            selected={optionSelected}
            toggleState={() => setShow((prev) => prev !== index ? index : -1)}
          >
            {props.children}
          </Option>
        ))}
      </Styled.Options>
    </Styled.Wrapper>
  )
}

export default Sidenav
