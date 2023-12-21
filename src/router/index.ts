import { createRouter, createWebHashHistory } from "vue-router";
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'

const routes = [
    {
        path: '/',
        component: Home
    }, {
        path: '/login',
        component: Login
    }, {
        path: '/register',
        component: Register
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router