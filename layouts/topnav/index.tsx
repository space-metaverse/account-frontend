import { useState } from 'react'

import Image from 'next/image'
import { useAppSelector } from 'redux/hooks'

import Styled from './styles'

const routes = [
  {
    route: 'https://app.tryspace.com/token',
    label: 'token',
    disabled: true,
    isExternal: true
  },
  {
    route: 'https://app.tryspace.com/litepaper',
    label: 'litepaper',
    disabled: true,
    isExternal: true
  },
  {
    route: '/builder',
    label: 'builder',
    disabled: false,
    isExternal: false
  },
  {
    route: '/marketplace',
    label: 'marketplace',
    disabled: true,
    isExternal: false
  },
  {
    route: 'https://app.tryspace.com/about',
    label: 'about',
    disabled: true,
    isExternal: true
  },
  {
    route: 'https://app.tryspace.com/faq',
    label: 'faq',
    disabled: false,
    isExternal: true
  }
]

const TopNav: React.FC = () => {
  const [responsive, setResponsive] = useState(false)

  const { username } = useAppSelector(state => state.account)

  return (
    <Styled.Wrapper show={responsive}>
      <Styled.Logo href="/">
        <Image
          src="/space-logo.png"
          alt="Logo space"
          width={58}
          height={24}
        />
      </Styled.Logo>

      <Styled.Routes>
        {routes.map(({
          route,
          label,
          disabled,
          isExternal
        }) => (
          <li key={route}>
            <Styled.Route
              href={route}
              target={isExternal ? '_blank' : '_self'}
              disabled={disabled}
            >
              {label}
            </Styled.Route>
          </li>
        ))}
      </Styled.Routes>

      <Styled.Actions>
        <Styled.Profile>
          <Image
            src="/avatar.png"
            alt="Avatar of Toni Papperoni"
            width={32}
            height={32}
          />
        </Styled.Profile>

        <p>{username}</p>

        <Styled.IconAction />
      </Styled.Actions>

      <Styled.Hamburger
        show={responsive}
        onClick={() => setResponsive((prev) => !prev)}
      >
        <div />
        <div />
        <div />
      </Styled.Hamburger>
    </Styled.Wrapper>
  )
}

export default TopNav
