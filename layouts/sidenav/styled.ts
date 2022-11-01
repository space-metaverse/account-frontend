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

const Options = styled.ul`
  display: flex;
  flex-direction: column;
  list-style-type: none;
  text-transform: uppercase;
  font-size: 12px;
  padding: 0;
`
const Option = styled.li`
  height: 56px;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const OptionContent = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 20px;
`

const Wrapper = styled.nav`
  display: flex;
  flex-direction: column;
  width: 312px;
  background-color: #FAFAFC;
  border-radius: 16px;
  margin: 16px;
  color: #111114;
`
const Content = styled.div`
  padding: 0 0 0 20px;
`

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #F0F0F5;
`

const Title = styled.h1`
  font-weight: 700;
  font-size: 20px;
  height: 63px;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 12px;
`

export default {
  Logo,
  Title,
  Route,
  Options,
  Option,
  OptionContent,
  Wrapper,
  Divider,
  Content
}

