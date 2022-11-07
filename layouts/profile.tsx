import type { PropsWithChildren } from 'react'

import type { NextPage } from 'next'
import styled from 'styled-components'

import SideNav from './sidenav'

const Container = styled.div`
  gap: 3rem;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  padding: 1.5rem 4rem;
`

const Wrapper: NextPage<PropsWithChildren> = ({ children }) => (
  <Container>
    <SideNav />

    {children}
  </Container>
)

export default Wrapper
