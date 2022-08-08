/* eslint-disable no-unused-vars */
import { useEffect, useState, useRef } from 'react'
import Notification from './components/Notification'
import blogService from './services/blogs'
import Logout from './components/Logout'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import AddBlogForm from './components/AddBlogForm'
import { useDispatch } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { useSelector } from 'react-redux'
import { initBlogs, createNew } from './reducers/blogsReducer'
import { loginUser } from './reducers/userReducer'
import { unsetUser, setUser } from './reducers/userReducer'
import { Route, Routes } from 'react-router-dom'
import UserPage from './pages/allUsersPage'
import HomePage from './pages/homePage'
import SingleUserPage from './pages/SingleUserPage'
import { initUsers } from './reducers/allUsersReducer'
import SingleBlogPage from './pages/SingleBlogPage'
import Navigation from './components/Nav'
import { Container, Toast } from 'react-bootstrap'
import Footer from './components/Footer'

function App() {
  const [blogs, setBlogs] = useState([])
  const user = useSelector((state) => state.user)

  // setting up useDispatch
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initBlogs())
    dispatch(initUsers())
  }, [])

  // noteFormRef

  const blogFormRef = useRef()

  const hideBlogForm = () => {
    blogFormRef.current.toggleVisibility()
  }

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (credentials) => {
    try {
      const loggedUser = await dispatch(loginUser(credentials))
      console.log('logged user', loggedUser)
      window.localStorage.setItem('loggedUser', JSON.stringify(loggedUser))
      blogService.setToken(loggedUser.token)
    } catch (error) {
      console.log(error)
      dispatch(setNotification(error.response.data.error))
    }
  }

  const createBlog = async (newBlog) => {
    let blog = ''
    try {
      blog = await dispatch(createNew(newBlog))
    } catch (err) {
      setNotification(err.response.data.error)
      if (err.response.data.error === 'token expired') {
        console.log('token expired')
        dispatch(setNotification('token expired, login again'))
        window.localStorage.clear()
        setUser(null)
      }
      dispatch(setNotification(err.response.data.err))
    }
  }
  return (
    <div>
      <Notification />
      <Navigation />
      {user ? (
        <div>
          <Container style={{ marginTop: 5 }}>
            <div
              className="mt-4 p-5 bg-secondary text-white rounded"
              style={{
                backgroundImage:
                  // eslint-disable-next-line quotes
                  "url('https://images.unsplash.com/photo-1659830686710-9c6df95f8cf3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=876&q=80')",
                backgroundSize: 'cover',
                backgroundPosition: 'top'
              }}
            >
              <h3>Blogs</h3>
              <br></br>
              <h1>Welcome {user.name}!</h1>
              <p>
                <Logout />
              </p>
              {user && (
                <Togglable label={'New blog'} ref={blogFormRef}>
                  <AddBlogForm
                    setBlogs={setBlogs}
                    blogs={blogs}
                    hideBlogForm={hideBlogForm}
                    createBlog={createBlog}
                  />
                </Togglable>
              )}
            </div>
          </Container>
        </div>
      ) : (
        <LoginForm handleLogin={handleLogin} />
      )}

      <Routes>
        <Route path="/users" element={user ? <UserPage /> : null} />
        <Route path="/" element={user ? <HomePage /> : null} />
        <Route path="/users/:id" element={user ? <SingleUserPage /> : null} />
        <Route path="/blogs/:id" element={user ? <SingleBlogPage /> : null} />
      </Routes>

      <Footer />
    </div>
  )
}

export default App
