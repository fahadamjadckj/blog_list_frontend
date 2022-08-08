/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/userService'

const allUsersSlice = createSlice({
  name: 'allUsers',
  initialState: [],
  reducers: {
    getAllUsers(state, action) {
      return state
    },
    setAllUsers(state, action) {
      return action.payload
    }
  }
})

export const { getAllUsers, setAllUsers } = allUsersSlice.actions

export const initUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAllUsers()
    dispatch(setAllUsers(users))
  }
}

export default allUsersSlice.reducer
