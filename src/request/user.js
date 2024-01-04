import axios from './requset'

export function login(username, password) {
    return axios.post("/login", {
        username,
        password
    })
}
export function addUser(UserData) {
    return axios.post("/user", {
        ...UserData
    })
}