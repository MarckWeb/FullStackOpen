import axios from 'axios'
const baseUrl = 'http://localhost:3000/api/notes'

let token = null

const setToken = newToken => {
  console.log(newToken)
  token = `bearer ${newToken}`
}
console.log(token)

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  console.log(newObject)

  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

const deleteData = (id, newObject) => {
  const request = axios.delete(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}


export default {
  getAll,
  create,
  update,
  deleteData,
  setToken
}