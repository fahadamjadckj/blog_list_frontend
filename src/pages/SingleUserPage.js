import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const SingleUserPage = () => {
  const id = useParams().id
  const users = useSelector((state) => state.allUsers)
  const currentUser = users.find((x) => x.id.toString() === id.toString())
  if (!currentUser) {
    return null
  }
  return (
    <div className="container">
      <br></br>
      <h2>User: {currentUser.name}</h2>
      <br></br>
      <h4>Added Blogs</h4>
      <ul>
        {currentUser.blogs.map((x) => (
          <li key={x.id}>{x.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default SingleUserPage
