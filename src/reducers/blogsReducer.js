/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogsSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    getBlogs(state, action) {
      return state
    },
    setBlogs(state, action) {
      return action.payload
    },
    addBlog(state, action) {
      return state.concat(action.payload)
    },
    removeBlog(state, action) {
      return state.filter((n) => n.id !== action.payload.id)
    },
    addLike(state, action) {
      const updated = action.payload
      return state.map((x) => {
        if (x.id === updated.id) {
          return updated
        }
        return x
      })
    },
    addComment(state, action) {
      const updated = action.payload
      return state.map((x) => {
        if (x.id === updated.id) {
          return updated
        }
        return x
      })
    }
  }
})

export const { getBlogs, setBlogs, addBlog, removeBlog, addLike, addComment } =
  blogsSlice.actions

export const initBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.allBlogs()
    dispatch(setBlogs(blogs))
  }
}

export const createNew = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogService.addBlog(blog)
    dispatch(addBlog(newBlog))
    return newBlog
  }
}

export const deleteBlog = (blog) => {
  return async (dispatch) => {
    await blogService.deleteBlog(blog)
    dispatch(removeBlog(blog))
  }
}

export const pushLike = (blog) => {
  return async (dispatch) => {
    const updated = await blogService.updateBlog(blog)
    dispatch(addLike(updated))
    return updated
  }
}

export const pushComment = (blog) => {
  return async (dispatch) => {
    const updated = await blogService.updateBlog(blog)
    dispatch(addComment(blog))
    return updated
  }
}

export default blogsSlice.reducer
