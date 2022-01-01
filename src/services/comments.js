import axios from 'axios'

const baseUrl = 'http://localhost:3003/api/comments'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (comment) => {
  const response = await axios.post(baseUrl, comment)
  return response.data
}

const services = { getAll, create }

export default services