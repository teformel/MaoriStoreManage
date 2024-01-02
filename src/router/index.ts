import { createRouter, createWebHashHistory } from "vue-router";
import Home2 from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Home from '../layout/Home.vue'
import GoodList from '../pages/goods/GoodList.vue'
import GoodCategory from '../pages/goods/GoodCategory.vue'
import UserList from '../pages/user/UserList.vue'
import UserLevel from '../pages/user/UserLevel.vue'
import PictureList from '../pages/picture/PictureList.vue'
import PictureCategory from '../pages/picture/PictureCategory.vue'
const routes = [
    {
        path: '/',
        component: Home,
        children: [
            {
                path: 'goodlist',
                component: GoodList,
            }, {
                path: 'goodcategory',
                component: GoodCategory,
            }, {
                path: 'userlist',
                component: UserList,
            }, {
                path: 'userlevel',
                component: UserLevel
            }, {
                path: 'piclist',
                component: PictureList
            }, {
                path: 'piccategory',
                component: PictureCategory
            }
        ]
    }, {
        path: '/login',
        component: Login
    }, {
        path: '/register',
        component: Register
    }, {
        path: '/home2',
        component: Home2
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router