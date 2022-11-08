import type { PropsWithChildren } from 'react'

import type { NextPage } from 'next'
import styled from 'styled-components'

import SideNav from './sidenav'

const Title = styled.h1`
  ${({ theme }) => theme.fonts.size['3xl']};
  font-weight: ${({ theme }) => theme.fonts.weight.bold};
  border-bottom: ${({ theme }) => `1px solid ${theme.colors.dark['200']}`};
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
`

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

const Container = styled.div`
  gap: 3rem;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  padding: 1.5rem 4rem;
`

interface ProfileLayoutProps extends PropsWithChildren {
  title: string
}

const Wrapper: NextPage<ProfileLayoutProps> = ({
  title,
  children
}) => (
  <Container>
    <SideNav />

    <Content>
      <Title>{title}</Title>

      {children}
    </Content>
  </Container>
)

export default Wrapper
