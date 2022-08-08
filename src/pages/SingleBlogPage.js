import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import AddComment from '../components/AddComment'
import Like from '../components/Like'
import { pushLike, deleteBlog } from '../reducers/blogsReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const SingleBlogPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const id = useParams().id
  const blogs = useSelector((state) => state.blogs)

  const currentBlog = blogs.find((x) => x.id.toString() === id.toString())
  if (!currentBlog) {
    return null
  }

  // const [blog, setBlog] = useState(currentBlog)

  const likeStyle = {
    color: 'white',
    background: '#24a0ed',
    border: 5
  }

  const removeStyle = {
    color: 'white',
    border: 5,
    margin: 5
  }

  const addLike = async () => {
    const data = { ...currentBlog, likes: currentBlog.likes + 1 }
    try {
      await dispatch(pushLike(data))
    } catch (error) {
      console.log('blog error', error)
      setNotification(error)
    }
  }

  const removeBlog = async () => {
    if (window.confirm('Delete post ?')) {
      navigate('/')
      dispatch(setNotification('post deleted'))
      dispatch(deleteBlog(currentBlog)).catch((err) => {
        console.log(err.response.data.error)
        useDispatch(setNotification(err.response.data.error))
      })
    }
  }

  return (
    <div className="container">
      <br></br>
      <em
        style={{
          display: 'block',
          fontSize: '40px'
        }}
        className="display-2"
      >
        {currentBlog.title}
      </em>
      <br></br>
      <a href={currentBlog.url}>{currentBlog.url}</a>
      <p>Author: {currentBlog.author}</p>
      <p>Likes: {currentBlog.likes}</p>
      <Like likeHandler={addLike} likeStyle={likeStyle} />
      <Button
        onClick={removeBlog}
        className="remove"
        variant="danger"
        style={removeStyle}
      >
        remove
      </Button>
      <h4>Comments</h4>
      <AddComment blog={currentBlog} />
      <ul>
        {currentBlog.comments.map((x, index) => (
          <li key={index}>{x}</li>
        ))}
      </ul>
      <br></br>
    </div>
  )
}

export default SingleBlogPage
