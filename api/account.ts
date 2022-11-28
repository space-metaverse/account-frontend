import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface GetMeResponse {
  message: string
  username: string
  lastName?: string
  userEmail?: string
  firstName?: string
  phoneNumber?: string
  tryspaceEmail?: string
}

interface PostMeRequest {
  firstName?: string
  lastName?: string
  email?: string
}

interface PostMeResponse {
  message: string
}

const getBaseURl = (): string => {
  switch (process.env.NEXT_PUBLIC_ENV) {
    case 'local':
      return 'http://localhost:3003/account'
    case 'dev':
      return 'https://api.dev.tryspace.com/account'
    case 'qa':
      return 'https://api.qa.tryspace.com/account'
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
    getMe: builder.query<GetMeResponse, unknown>({
      query: () => ({
        url: '/me',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('immerToken') as string}`
        }
      })
    }),
    postMe: builder.mutation<PostMeResponse, PostMeRequest>({
      query: ({ firstName, lastName, email }) => ({
        url: '/me',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('immerToken') as string}`
        },
        body: {
          firstName,
          lastName,
          email
        }
      })
    })
  })
})

export const {
  useGetMeQuery,
  usePostMeMutation,
} = accountApi
