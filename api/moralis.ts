import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface NFTAttribute {
  display_type: string
  max_value: number
  order: number
  trait_count: number
  trait_type: string
  value: any[]
}

interface NFTMetadata {
  animation_url: string
  description: string
  external_link: string
  image: string
  name: string
  attributes: NFTAttribute[]
}

interface NFT {
  amount: string
  block_number: string
  block_number_minted: string
  contract_type: string
  last_metadata_sync: string
  last_token_uri_sync: string
  metadata: string
  normalized_metadata: NFTMetadata
  minter_address: string
  name: string
  owner_of: string
  symbol: string
  token_address: string
  token_hash: string
  token_id: string
  token_uri: string
}

interface GetPhygitalNftsRequest {
  address: string
}

export interface GetPhygitalNftsResponse {
  cursor: number
  page: number
  page_size: number
  result: NFT[]
  status: string
  total: number
}

interface GetPhygitalNftRequest {
  tokenId: string
}

export const moralisApi = createApi({
  reducerPath: 'moralisApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `https://deep-index.moralis.io/api/v2/`
  }),
  endpoints: (builder) => ({
    getPhygitalNfts: builder.query<GetPhygitalNftsResponse, GetPhygitalNftsRequest>({
      query: ({ address }) => ({
        url: `/${address}/nft`,
        method: 'GET',
        params: {
          chain: 'mumbai',
          format: 'decimal',
          token_addresses: process.env.NEXT_PUBLIC_PHYGITAL_CONTRACT,
          normalizeMetadata: true
        },
        headers: {
          'X-API-KEY': process.env.NEXT_PUBLIC_MORALIS_API_KEY,
          'accept': 'application/json'
        }
      })
    }),
    getPhygitalNft: builder.query<NFT, GetPhygitalNftRequest>({
      query: ({ tokenId }) => ({
        url: `/nft/${process.env.NEXT_PUBLIC_PHYGITAL_CONTRACT}/${tokenId}`,
        method: 'GET',
        params: {
          chain: 'mumbai',
          format: 'decimal',
          token_addresses: process.env.NEXT_PUBLIC_PHYGITAL_CONTRACT,
          normalizeMetadata: true
        },
        headers: {
          'X-API-KEY': process.env.NEXT_PUBLIC_MORALIS_API_KEY,
          'accept': 'application/json'
        }
      })
    }),
  })
})

export const {
  useGetPhygitalNftsQuery,
  useGetPhygitalNftQuery
} = moralisApi
