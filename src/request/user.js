import axios from './requset'

export function login(username, password) {
    return axios.post("/login", {
        username,
        password
    })
}