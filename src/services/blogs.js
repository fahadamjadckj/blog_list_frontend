import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const allBlogs = async () => {
  const blogs = await axios.get(baseUrl)
  return blogs.data
}

const addBlog = async (blogData) => {
  const config = {
    headers: {
      Authorization: token
    }
  }
  const blog = await axios.post(baseUrl, blogData, config)
  return blog.data
}

const updateBlog = async (blogData) => {
  const url = baseUrl + `/${blogData.id}`
  const config = {
    headers: {
      Authorization: token
    }
  }
  const updated = await axios.put(url, blogData, config)
  return updated.data
}

const deleteBlog = async (blogData) => {
  const url = baseUrl + `/${blogData.id}`
  const config = {
    headers: {
      Authorization: token
    }
  }
  await axios.delete(url, config)
  return true
}


export default {
  allBlogs,
  setToken,
  addBlog,
  updateBlog,
  deleteBlog
}
