import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const postBlog = async (blogData) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, blogData, config)
  return response.data
}

const likeBlog = async (id, blogData) => {
  const config = {
    header: { Authorization: token }
  }

  const response = await axios.put(`${baseUrl}/${id}`, blogData, config)
  return response.data
}

const removeBlog = async (id) => {
  const config = {
    header: { Authorization: token }
  }
  console.log('Config', config)
  console.log('Blog ID: ', id)
  const response = await axios.delete(`${baseUrl}/${id}`, {
    headers: {
      Authorization: token
    }
  })

  return response.data
}

export default {
  getAll,
  postBlog,
  setToken,
  likeBlog,
  removeBlog
}
