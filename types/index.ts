import type { ReactNode, ReactElement } from 'react'

import type { NextPage } from 'next'

export type NextPageWithLayout<T = unknown> = NextPage<T> & {
  getLayout?: (page: ReactElement) => ReactNode
}
