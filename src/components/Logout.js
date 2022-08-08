import { useDispatch } from 'react-redux'
import { unsetUser } from '../reducers/userReducer'
import { Button } from 'react-bootstrap'

const Logout = () => {
  const dispatch = useDispatch()

  const logoutHandler = () => {
    window.localStorage.clear()
    dispatch(unsetUser())
  }

  return (
    <Button
      onClick={logoutHandler}
      className="logout"
      variant="outline-light"
      style={{ padding: 4, margin: 6 }}
    >
      Logout
    </Button>
  )
}

export default Logout
