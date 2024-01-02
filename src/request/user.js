import http from "../axios";

function getUserList(page,keyword){
    return http.get('/user/' + page, {
        params:{
            keyword
        }
    })
}

export default {
    getUserList
}