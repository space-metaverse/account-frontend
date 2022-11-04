import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AccountState {
  username?: string
}

const initialState: AccountState = {
  username: "Not Logged In"
}

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setAccountUsername: (state: AccountState, action: PayloadAction<{ username: string }>) => {
      state.username = action.payload.username
    }
  }
})

export const {
  setAccountUsername
} = accountSlice.actions

export default accountSlice.reducer
