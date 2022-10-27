import Link from 'next/link'
import styled from 'styled-components'

const Logo = styled(Link)`
  padding: 1.25rem 1.5rem;
  border-right: ${({ theme }) => `1px solid ${theme.colors.dark[200]}`};
`

const Route = styled(Link)`
  ${({ theme }) => theme.fonts.size.sm};
  color: ${({ theme }) => theme.colors.dark[800]};
  padding: 0 .75rem;
  letter-spacing: 2px;
  font-weight: ${({ theme }) => theme.fonts.weight.bold};
  text-transform: uppercase;
  text-decoration: none;
`

const Routes = styled.ul`
  gap: 1.5rem;
  display: flex;
  align-items: center;
`

const Wrapper = styled.nav`
  display: flex;
  align-items: center;
  border-bottom: ${({ theme }) => `1px solid ${theme.colors.dark[200]}`};
`

export default {
  Logo,
  Route,
  Routes,
  Wrapper
}
