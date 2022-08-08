/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: null,
  reducers: {
    add_notification(state, action) {
      return action.payload
    },
    remove_notification(state, action) {
      return null
    }
  }
})

export const { add_notification, remove_notification } =
  notificationSlice.actions

export const setNotification = (notification) => {
  return async (dispatch) => {
    dispatch(add_notification(notification))
    await setTimeout(() => {
      dispatch(remove_notification())
    }, 5000)
  }
}
export default notificationSlice.reducer
