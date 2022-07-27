const Logout = ({ setUser }) => {

  const logoutHandler = () => {
    window.localStorage.clear()
    setUser(null)
  }

  return (

    <button onClick={logoutHandler}>Logout</button>

  )
}

export default Logout