import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

import { accountApi } from '../api/account'
import { authApi } from '../api/auth'
import accountReducer from './slices/account'
import appReducer from './slices/app'

export const store = configureStore({
  reducer: {
    app: appReducer,
    account: accountReducer,
    [authApi.reducerPath]: authApi.reducer,
    [accountApi.reducerPath]: accountApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
    authApi.middleware,
    accountApi.middleware
  )
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
