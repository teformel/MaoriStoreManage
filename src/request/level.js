import axios from '../request/requset'

export function getUserLevelList(page) {
  return axios.get(`/user_level/${page}`)
}

export function createUserLevel(data) {
  return axios.post('/user_level', data)
}

export function updateUserLevel(id, data) {
  return axios.post('/user_level/' + id, data)
}

export function deleteUserLevel(id) {
  return axios.post(`/user_level/${id}/delete`)
}

export function updateUserLevelStatus(id, status) {
  return axios.post(`/user_level/${id}/update_status`, {
    status
  })
}
