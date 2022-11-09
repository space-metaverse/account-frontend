import { useRef, useState, useEffect } from 'react'

import { useOutsideClick } from '@space-metaverse-ag/space-ui/hooks'
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
import type { OptionProps, SimpleOptionProps, OptionComponentProps } from './types'

const options: OptionProps[] = [
  {
    Icon: User,
    label: 'Profile',
    route: null,
    disabled: false,
    children: [
      {
        Icon: Profile,
        route: '/profile/information',
        label: 'Profile Information',
        disabled: false
      },
      {
        Icon: Avatar,
        route: '/profile/avatars',
        label: 'Avatars',
        disabled: true
      },
      {
        Icon: Security,
        route: '/profile/security',
        label: 'Security Settings',
        disabled: true
      }
    ]
  },
  {
    Icon: Friends,
    label: 'Friends',
    route: null,
    disabled: true,
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
    label: 'Connected Wallets',
    disabled: true
  },
  {
    Icon: NFT,
    label: 'NFT Inventory',
    route: '/nft-inventory',
    disabled: true
  },
  {
    Icon: Collection,
    label: 'Space Inventory',
    route: '/space-inventory',
    disabled: true
  }
]

const Option: React.FC<OptionComponentProps> = ({
  show,
  Icon,
  route,
  label,
  select,
  disabled,
  selected,
  children,
  toggleState
}) => (
  <Styled.OptionWrapper>
    <Styled.Option
      onClick={() => {
        if (!disabled) {
          (!children) && select({ label, Icon }, route)
          toggleState()
        }
      }}
      animate={show}
      disabled={disabled}
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
            onClick={() => {
              !item.disabled && select({ Icon: item.Icon, label: item.label }, item.route)
            }}
            selected={selected === item.label}
            disabled={item.disabled}
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
  const [dropdown, setDropdown] = useState(false)
  const [optionSelected, setOptionSelected] = useState<SimpleOptionProps | null>(null)

  const dropdownRef = useRef<HTMLDivElement>(null)

  const {
    push,
    pathname
  } = useRouter()

  const navigate = (option: SimpleOptionProps, route: string | null): void => {
    setOptionSelected(option)

    if (route) push(route)
  }

  useEffect(() => {
    options.forEach(({ Icon, route, label, children }, index) => {
      if (route) {
        const path = pathname.includes(route)

        if (path) setOptionSelected({ Icon, label })
      }

      if (children) {
        children.forEach((child) => {
          const path = pathname.includes(child.route)

          if (path) {
            setOptionSelected({ Icon: child.Icon, label: child.label })

            setShow(index)
          }
        })
      }

      return false
    })
  }, [pathname])

  useOutsideClick(dropdownRef, () => setDropdown(false))

  return (
    <Styled.Wrapper
      ref={dropdownRef}
      dropdown={dropdown}
    >
      <Styled.Preview
        as={Styled.Option}
        animate={dropdown}
        onClick={() => setDropdown((prev) => !prev)}
      >
        {optionSelected?.Icon && <Styled.Title as={optionSelected?.Icon} />}

        <p>{optionSelected?.label}</p>

        <Styled.IconDropDown />
      </Styled.Preview>

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
            selected={optionSelected?.label}
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
