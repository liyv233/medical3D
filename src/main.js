import { createApp } from "vue";
import router from "./router/index";
import App from "./App.vue";
import { createPinia } from "pinia";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import "element-plus/theme-chalk/el-loading.css";
import "element-plus/theme-chalk/el-message.css";

const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.use(createPinia());
app.use(router);
app.mount("#app");
