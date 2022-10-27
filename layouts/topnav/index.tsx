import Image from 'next/image'

import Styled from './styled'

const routes = [
  'token',
  'litepaper',
  'builder',
  'marketplace',
  'about',
  'faq'
]

const TopNav: React.FC = () => (
  <Styled.Wrapper>
    <Styled.Logo href="/">
      <Image
        src="/space-logo.png"
        alt="Logo space"
        width={58}
        height={24}
      />
    </Styled.Logo>

    <Styled.Routes>
      {routes.map((route) => (
        <li key={route}>
          <Styled.Route href={route}>
            {route}
          </Styled.Route>
        </li>
      ))}
    </Styled.Routes>
  </Styled.Wrapper>
)

export default TopNav
