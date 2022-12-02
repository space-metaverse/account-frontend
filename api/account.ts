import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface GetOrderResponse {
  id: string
  date: Date
  store: string
  items: Array<{
    name: string
    price: number
    quantity: string
    model_url: string
    description: string
    order_item_id: string
    thumbnail_url: string
  }>
  status: string
  amount: number
  currency: string
  customer: {
    name: string
    country: string
    zipcode: string
    address: string
    account_id: string
  }
  order_sid: string
  crypto_amount: number
  shipping_cost: string
  shipping_status: string
}

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

interface GetNonceResponse {
  message: string
  nonce: string
}

interface PostSignatureResponse {
  message: string
  address: string
}

interface PostSignatureRequest {
  signature: string
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
    }),
    getOrders: builder.query<GetOrderResponse[], unknown>({
      query: () => ({
        url: '/orders',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('immerToken') as string}`
        }
      })
    }),
    getNonce: builder.query<GetNonceResponse, unknown>({
      query: () => ({
        url: '/wallet/nonce',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('immerToken') as string}`
        }
      })
    }),
    postSignature: builder.mutation<PostSignatureResponse, PostSignatureRequest>({
      query: ({ signature }) => ({
        url: '/wallet/signature',
        method: 'POST',
        body: {
          signature
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('immerToken') as string}`
        }
      })
    }),
  })
})

export const {
  useGetMeQuery,
  useGetOrdersQuery,
  usePostMeMutation,
  useGetNonceQuery,
  usePostSignatureMutation
} = accountApi
