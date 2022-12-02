import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface GetOrderRequest {
  id: string
}

interface GetOrdersResponse {
  id: string
  date: Date
  store: string
  items: Array<{
    name: string
    type: string
    price: number
    color: string | null
    quantity: number
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
  shipping_cost: number
  payment_method: 'Stripe' | 'Crypto'
  shipping_status: string
}

interface GetOrderResponse extends Omit<GetOrdersResponse, 'store' | 'customer'> {
  store: {
    city: string
    name: string
    state: string
    email: string
    phone: string
    country: string
    zipcode: string
    address: string
    address_two: string
  }
  customer: {
    city: string
    name: string
    state: string
    email: string
    phone: string
    country: string
    zipcode: string
    address: string
    account_id: string
    address_two: string
  }
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

const getBaseURl = (): string => {
  switch (process.env.NEXT_PUBLIC_ENV) {
    case 'local':
      return 'http://localhost:3003/account'
    case 'dev':
      return 'http://localhost:3003/account'
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
    getOrder: builder.query<GetOrderResponse, GetOrderRequest>({
      query: ({ id }) => ({
        url: `/orders/${id}`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('immerToken') as string}`
        }
      })
    }),
    getOrders: builder.query<GetOrdersResponse[], unknown>({
      query: () => ({
        url: '/orders',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('immerToken') as string}`
        }
      })
    }),
  })
})

export const {
  useGetMeQuery,
  useGetOrderQuery,
  useGetOrdersQuery,
  usePostMeMutation,
} = accountApi
