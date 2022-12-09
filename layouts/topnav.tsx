import { TopNav } from '@space-metaverse-ag/space-ui'
import { Logout as IconLogout } from '@space-metaverse-ag/space-ui/icons'
import { useGetMeQuery } from 'api/account'
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
  const {
    data,
  } = useGetMeQuery({})

  const { username } = useAppSelector(state => state.account)

  const logout = async (): Promise<void> => {
    await global.analytics.track('Signed Out', {
      userId: data?.accountId as string,
      username: username as string,
    })

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
