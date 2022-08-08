import { useSelector } from 'react-redux'

const Notification = () => {
  const message = useSelector((state) => {
    return state.notification
  })

  if (message === null) {
    return null
  } else {
    return <div className="notification alert alert-success">{message}</div>
  }
}

export default Notification
