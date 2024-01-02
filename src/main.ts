import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'virtual:windi.css'
import { createPinia } from 'pinia'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.use(createPinia()).use(router).mount('#app')


import http from './axios.ts'
//登录
if (!localStorage.getItem("token")) {
    http.post('/login', {
        username: 'admin',
        password: "admin"
    }).then(res => {
        //请求成功
        console.log(res.data.token)
        //本地存储保存token
        localStorage.setItem("token", res.data.token)
    }).catch(err => {
        //请求失败
        console.log(err)
    })

}
