import axios from 'axios'
const baseUrl = '/api/blogs'

const getToken = (user) => `bearer ${user.token}`

const getTokenConfig = (user) => {
  return {
    headers: { Authorization: getToken(user) }
  }
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = (user, newBlog) => {
  const config = getTokenConfig(user)

  return (axios
    .post(`${baseUrl}`, newBlog, config)
    .then(response => response.data))
}

const update = (user, blog) => {
  const config = getTokenConfig(user)

  return (axios
    .put(`${baseUrl}/${blog.id}`, { ...blog, user: blog.user.id }, config)
    .then(response => response.data))
}

const remove = (user, blog) => {
  const config = getTokenConfig(user)

  return (axios
    .delete(`${baseUrl}/${blog.id}`, config))
}

export default {
  getAll,
  create,
  update,
  remove }