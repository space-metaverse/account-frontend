import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { parseCookies } from 'nookies'

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

interface SendSMSCodeRequest {
  phoneNumber: string
}

interface SendSMSCodeResponse {
  message: string
}

interface VerifySMSCodeRequest {
  code: string
}

interface VerifySMSCodeResponse {
  message: string
}

const getBaseURL = (): string => {
  switch (process.env.NEXT_PUBLIC_ENV) {
    case 'local':
      return 'http://localhost:3002/auth'
    case 'dev':
      return 'https://api.dev.tryspace.com/auth'
    case 'qa':
      return 'https://api.qa.tryspace.com/auth'
    case 'prod':
      return 'https://api.tryspace.com/auth'
    default:
      console.log('No ENV set')
      return 'https://api.dev.tryspace.com/auth'
  }
}

const cookies = parseCookies()

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: getBaseURL() }),
  endpoints: (builder) => ({
    getVerifyCode: builder.query<VerifyCodeResponse, VerifyCodeRequest>({
      query: ({ loginCode }) => ({
        url: '/verifyCode',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${loginCode}`
        }
      })
    }),
    getVerifyToken: builder.query<VerifyTokenResponse, VerifyTokenRequest>({
      query: ({ immerToken }) => ({
        url: '/verifyToken',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${immerToken}`
        }
      })
    }),
    sendSMSCode: builder.mutation<SendSMSCodeResponse, SendSMSCodeRequest>({
      query: ({ phoneNumber }) => ({
        url: '/sendSMSCode',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${cookies.immerToken}`
        },
        body: {
          phoneNumber: phoneNumber.includes('+') ? phoneNumber : `+${phoneNumber}`,
        }
      })
    }),
    verifySMSCode: builder.mutation<VerifySMSCodeResponse, VerifySMSCodeRequest>({
      query: ({ code }) => ({
        url: '/verifySMSCode',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${cookies.immerToken}`
        },
        body: {
          code
        }
      })
    })
  })
})

export const {
  useGetVerifyCodeQuery,
  useGetVerifyTokenQuery,
  useSendSMSCodeMutation,
  useVerifySMSCodeMutation
} = authApi
