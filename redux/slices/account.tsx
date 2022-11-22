import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AccountState {
  username?: string,
  phone?: string
}

const initialState: AccountState = {
  username: 'Not Logged In',
  phone: ''
}

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setAccountUsername: (state: AccountState, action: PayloadAction<{ username: string }>) => {
      state.username = action.payload.username
    },
    setAccountPhone: (state: AccountState, action: PayloadAction<{ phone: string}>) => {
      state.phone = action.payload.phone
    }
  }
})

export const {
  setAccountUsername,
  setAccountPhone
} = accountSlice.actions

export default accountSlice.reducer
