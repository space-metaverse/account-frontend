import { Dots } from '@space-metaverse-ag/space-ui/icons'
import Link from 'next/link'
import styled from 'styled-components'

const Logo = styled(Link)`
  padding: 1.25rem 1.5rem;
  display: flex;
  border-right: ${({ theme }) => `1px solid ${theme.colors.dark[200]}`};
`

const Route = styled(Link)`
  ${({ theme }) => theme.fonts.size.sm};
  color: ${({ theme }) => theme.colors.dark[800]};
  padding: 0 .75rem;
  font-weight: ${({ theme }) => theme.fonts.weight.bold};
  transition: ${({ theme }) => `all .3s ${theme.transitions.ease}`};
  letter-spacing: 2px;
  text-transform: uppercase;
  text-decoration: none;

  :hover {
    color: ${({ theme }) => theme.colors.blue[400]};
  }
`

const Routes = styled.ul`
  gap: 1.5rem;
  display: flex;
  align-items: center;
`

const Wrapper = styled.nav`
  height: 4rem;
  display: flex;
  align-items: center;
  border-bottom: ${({ theme }) => `1px solid ${theme.colors.dark[200]}`};
`

const Actions = styled.div`
  height: 100%;
  display: flex;
  padding: 0 1.5rem;
  margin-left: auto;
  align-items: center;
  border-left: ${({ theme }) => `1px solid ${theme.colors.dark[200]}`};

  p {
    ${({ theme }) => theme.fonts.size.sm};
    color: ${({ theme }) => theme.colors.dark[800]};
    font-weight: ${({ theme }) => theme.fonts.weight.bold};
    margin-left: .75rem;
    margin-right: 1.5rem;
    letter-spacing: 2px;
    text-transform: uppercase;
  }
`

const Profile = styled.div`
  width: 2rem;
  height: 2rem;
  background-color: ${({ theme }) => theme.colors.dark[200]};

  &,
  img {
    border-radius: 999px;
  }
`

const IconAction = styled(Dots)`
  cursor: pointer;
`

export default {
  Logo,
  Route,
  Routes,
  Wrapper,
  Actions,
  Profile,
  IconAction
}
