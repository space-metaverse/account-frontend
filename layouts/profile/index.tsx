import type { PropsWithChildren } from 'react'

import type { NextPage } from 'next'

import SideNav from '../sidenav'
import { MainStyles, SharedStyles } from './styles'

interface ProfileLayoutProps extends PropsWithChildren {
  title: string
}

const Layout: NextPage<ProfileLayoutProps> = ({
  title,
  children
}) => (
  <MainStyles.Wrapper>
    <SideNav />

    <MainStyles.Content>
      <MainStyles.Title>{title}</MainStyles.Title>

      {children}
    </MainStyles.Content>
  </MainStyles.Wrapper>
)

export default {
  Layout,
  SharedStyles
}
