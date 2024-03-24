import { configureStore } from '@reduxjs/toolkit'
import loginCredsReducer from '../features/loginDetails/loginAuth'

export default configureStore({
  reducer: {
    loginCreds: loginCredsReducer,
  },
})