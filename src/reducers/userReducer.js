/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit'
import login from '../services/login'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
    unsetUser(state, action) {
      return null
    }
  }
})

export const { setUser, unsetUser } = userSlice.actions

export const loginUser = (user) => {
  return async (dispatch) => {
    const loggedUser = await login(user)
    dispatch(setUser(loggedUser))
    return loggedUser
  }
}

export default userSlice.reducer
