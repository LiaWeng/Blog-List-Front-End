import axios from 'axios'

const baseUrl = 'http://localhost:3003/api/blogs'

const setConfig = (tokenString) => {
  const token = 'bearer ' + tokenString

  return { headers: {Authorization: token} }
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (newBlog, config) => {
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const update = async (newBlog, blogId) => {
  const response = await axios.put(`${baseUrl}/${blogId}`, newBlog)
  return response.data
}

const remove = async (blogId, config) => {

  await axios.delete(`${baseUrl}/${blogId}`, config)
}

const services = { setConfig, getAll, create, update, remove }
export default services