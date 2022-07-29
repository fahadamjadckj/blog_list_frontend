import { useState } from 'react'
import blogService from '../services/blogs'
import Like from './Like'

const Blog = ({ blogData }) => {
  const [showDetail, setShowDetail] = useState(false)
  const [blog, setBlog] = useState(blogData)

  const toggleDetail = () => {
    setShowDetail(!showDetail)
  }

  const label = showDetail ? 'hide' : 'show'

  const blogStyle = {
    border: 'solid',
    borderWidth: 2,
    padding: 10,
    margin: 5
  }

  const likeStyle = {
    color: 'white',
    background: '#24a0ed',
    border: 5
  }
  const removeStyle = {
    color: 'white',
    background: 'purple',
    border: 5,
    margin: 5
  }

  const addLike = async () => {
    const data = { ...blog, likes: blog.likes + 1 }
    try {
      const update = await blogService.updateBlog(data)
      setBlog(update)
    } catch (error) {
      console.log('blog error', error)
    }
  }

  const removeBlog = async () => {
    if(window.confirm('Delete post ?')) {
      try {
        blogService
          .deleteBlog(blog)
        setBlog({ ...blog, title: 'deleted' })
      } catch (error) {
        console.log(error)
      }

    }
  }

  const show = showDetail
    ? <div style={blogStyle} className='blog-more'>
      <h3>
        {blog.title}
        <Like likeHandler={addLike} likeStyle={likeStyle} />
      </h3>
      <p className='url'>{blog.url}</p>
      <p className='likes'>likes { blog.likes } </p>
      <p>{blog.author}</p>
      <button style={likeStyle} onClick={addLike} >Like</button>
      <button style={removeStyle} onClick={removeBlog} className='remove' >remove</button>
    </div>
    : <div style={blogStyle} className='blog-less'>
      <p>
        {blog.title}
        <button onClick={toggleDetail} className="toggleDetail">{label}</button>
      </p>
      <p>{blog.author}</p>
      <Like likeHandler={addLike} likeStyle={likeStyle} />
    </div>

  return show
}

export default Blog