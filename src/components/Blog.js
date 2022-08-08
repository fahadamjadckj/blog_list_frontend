import { useState } from 'react'
import Like from './Like'
import { setNotification } from '../reducers/notificationReducer'
import { deleteBlog, pushLike } from '../reducers/blogsReducer'
import { useDispatch } from 'react-redux'

const Blog = ({ blogData }) => {
  const [showDetail, setShowDetail] = useState(false)
  const [blog, setBlog] = useState(blogData)
  const dispatch = useDispatch()

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
      const update = await dispatch(pushLike(data))
      setBlog(update)
    } catch (error) {
      console.log('blog error', error)
      setNotification(error)
    }
  }

  const removeBlog = async () => {
    if (window.confirm('Delete post ?')) {
      dispatch(deleteBlog(blog)).catch((err) => {
        console.log(err.response.data.error)
        setNotification(err.response.data.error)
      })
      setBlog({ ...blog, title: 'deleted' })
    }
  }

  const show = showDetail ? (
    <div style={blogStyle} className="blog-more">
      <h3>
        {blog.title}
        <button onClick={toggleDetail} className="toggleDetail">
          {label}
        </button>
      </h3>
      <p className="url">{blog.url}</p>
      <p className="likes">likes {blog.likes} </p>
      <p>{blog.author}</p>
      <button style={likeStyle} onClick={addLike}>
        Like
      </button>
      <button style={removeStyle} onClick={removeBlog} className="remove">
        remove
      </button>
    </div>
  ) : (
    <div style={blogStyle} className="blog-less">
      <p>
        {blog.title}
        <button onClick={toggleDetail} className="toggleDetail">
          {label}
        </button>
      </p>
      <p>{blog.author}</p>
      <Like likeHandler={addLike} likeStyle={likeStyle} />
    </div>
  )

  return show
}

export default Blog
