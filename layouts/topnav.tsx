import { TopNav } from '@space-metaverse-ag/space-ui'
import { Logout as IconLogout } from '@space-metaverse-ag/space-ui/icons'
import { useAppSelector } from 'redux/hooks'

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
    route: 'https://app.tryspace.com/create-space',
    label: 'builder',
    disabled: false,
    isExternal: true
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

const Topnav: React.FC = () => {
  const { username } = useAppSelector(state => state.account)

  const logout = (): void => {
    window.localStorage.removeItem('immerToken')

    location.reload()
  }

  return (
    <TopNav
      user={{
        name: username ?? '',
        avatar: '/avatar.png',
      }}
      routes={routes}
      options={[
        {
          icon: IconLogout,
          label: 'Logout',
          callback: logout
        }
      ]}
    />
  )
}

export default Topnav
