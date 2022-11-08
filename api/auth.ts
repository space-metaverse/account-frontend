import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface VerifyCodeRequest {
  loginCode: string
}

interface VerifyCodeResponse {
  hubsToken?: string
  immerToken?: string
  username?: string
  message: string
}

interface VerifyTokenRequest {
  immerToken: string
}

interface VerifyTokenResponse {
  username?: string
  message: string
}

function getBaseURL () {
  switch (process.env.NEXT_PUBLIC_ENV) {
    case 'local':
      return 'https://api.dev.tryspace.com/auth'
    case 'dev':
      return 'https://api.dev.tryspace.com/auth'
    case 'prod':
      return 'https://api.tryspace.com/auth'
    default:
      console.log('No ENV set')
      return 'https://api.dev.tryspace.com/auth'
  }
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: getBaseURL() }),
  endpoints: (builder) => ({
    getVerifyCode: builder.mutation<VerifyCodeResponse, VerifyCodeRequest>({
      query: ({ loginCode }) => ({
        url: '/verifyCode',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${loginCode}`
        }
      })
    }),
    getVerifyToken: builder.mutation<VerifyTokenResponse, VerifyTokenRequest>({
      query: ({ immerToken }) => ({
        url: '/verifyToken',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${immerToken}`
        }
      })
    })
  })
})

export const {
  useGetVerifyCodeMutation,
  useGetVerifyTokenMutation
} = authApi
