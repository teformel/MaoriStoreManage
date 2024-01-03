import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "virtual:windi.css";
import { createPinia } from "pinia";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.use(createPinia()).use(router).mount("#app");
