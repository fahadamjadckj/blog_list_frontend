import axios from 'axios'
const baseUrl = 'http://localhost:3001/api'

const getAllUsers = async () => {
  const users = await axios.get(baseUrl + '/users')
  return users.data
}

export default {
  getAllUsers
}
