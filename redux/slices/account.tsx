import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AccountState {
  username?: string,
  phoneNumber?: string
}

const initialState: AccountState = {
  username: 'Not Logged In',
  phoneNumber: ''
}

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setAccountUsername: (state: AccountState, action: PayloadAction<{ username: string }>) => {
      state.username = action.payload.username
    },
    setAccountPhoneNumber: (state: AccountState, action: PayloadAction<{ phoneNumber: string}>) => {
      state.phoneNumber = action.payload.phoneNumber
    }
  }
})

export const {
  setAccountUsername,
  setAccountPhoneNumber
} = accountSlice.actions

export default accountSlice.reducer
