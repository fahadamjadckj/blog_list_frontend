import { useEffect, useState, useRef } from 'react'
import login from './services/login'
import Notification from './components/Notification'
import blogService from './services/blogs'
import Blogs from './components/Blogs'
import Logout from './components/Logout'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import AddBlogForm from './components/AddBlogForm'

function App() {

  const [message, setMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])

  // noteFormRef

  const blogFormRef = useRef()

  const hideBlogForm = () => {
    blogFormRef.current.toggleVisibility()
  }


  useEffect(() => {
    blogService
      .allBlogs()
      .then(blogs => {
        setBlogs(blogs)
      })
      .catch(error => setMessage(error))

  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser')
    if(loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])



  const handleLogin = async (credentials) => {
    try {
      const loggedUser = await login(credentials)
      setUser(loggedUser)
      window.localStorage.setItem('loggedUser', JSON.stringify(loggedUser))
      blogService
        .setToken(loggedUser.token)
    } catch (error) {
      console.log(error)
      setMessage('wrong credentials')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }


  const createBlog = async (newBlog) => {
    try {
      const blog = await blogService.addBlog(newBlog)
      setBlogs(blogs.concat(blog))
    } catch (error) {
      setMessage(error)
      setInterval(() => {
        setMessage(null)
      }, 5000)
    }

  }

  return (
    <div>
      <Notification message={message} />
      <h1>Blogs</h1>
      { user ? <p><u>
        logged in as {user.name}
        <Logout setUser={setUser} />
      </u></p>
        : <Togglable label={'login'}>
          <LoginForm
            handleLogin={handleLogin}
          />
        </Togglable>
      }
      { user && <Blogs blogs={blogs}  />}
      { user &&
        <Togglable label={'new blog'} ref={blogFormRef} >
          <AddBlogForm
            setBlogs={setBlogs}
            blogs={blogs}
            setMessage={setMessage}
            hideBlogForm={hideBlogForm}
            createBlog={createBlog}
          />
        </Togglable>
      }
    </div>
  )
}

export default App
