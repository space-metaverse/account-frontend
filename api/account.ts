import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface GetMyAccountRequest {

}

interface GetMyAccountResponse {
  username: string
}

function getBaseURl () {
  switch (process.env.NEXT_PUBLIC_ENV) {
    case 'local':
      return 'http://localhost:3001/account'
    case 'dev':
      return 'https://api.dev.tryspace.com/account'
    case 'prod':
      return 'https://api.tryspace.com/account'
    default:
      console.log('No ENV set')
      return 'https://api.dev.tryspace.com/account'
  }
}

export const accountApi = createApi({
  reducerPath: 'accountApi',
  baseQuery: fetchBaseQuery({ baseUrl: getBaseURl() }),
  endpoints: (builder) => ({
    getMyAccount: builder.mutation<GetMyAccountResponse, GetMyAccountRequest>({
      query: () => ({
        url: '/me',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('immerToken') as string}`
        }
      })
    })
  })
})

export const {
  useGetMyAccountMutation
} = accountApi
