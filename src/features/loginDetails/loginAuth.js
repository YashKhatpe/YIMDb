import { createSlice } from '@reduxjs/toolkit'

export const loginSlice = createSlice({
  name: 'loginCreds',
  initialState: {
    value: '',
  },
  reducers: {
    storeAuth: (state, action) => {
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { storeAuth } = loginSlice.actions

export default loginSlice.reducer