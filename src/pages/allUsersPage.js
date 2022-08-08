import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const Users = ({ users }) => {
  const sorted = users.sort((a, b) => {
    return b.blogs.length - a.blogs.length
  })

  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>User</th>
            <th>Blogs</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((x) => {
            return (
              <tr key={x.id}>
                <td>
                  <Link to={`/users/${x.id}`}>{x.name}</Link>
                </td>
                <td>{x.blogs.length}</td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </div>
  )
}

const UserPage = () => {
  const users = useSelector((state) => state.allUsers)

  return (
    <div className="container">
      <br></br>
      <h2>Users</h2>
      {users.length !== 0 && <Users users={users} />}
    </div>
  )
}

export default UserPage
