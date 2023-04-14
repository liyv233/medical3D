import { createApp } from "vue";
import App from "./App.vue";
// router
import router from "./router/index";
// store
import store from "./store/store";
// axios
import Api from "./utils/request";
// element ui相关
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import "element-plus/theme-chalk/el-loading.css";
import "element-plus/theme-chalk/el-message.css";
import "element-plus/theme-chalk/el-message-box.css";
import "element-plus/theme-chalk/el-notification.css";

const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.config.globalProperties.$request = Api;
app.use(store);
app.use(router);
app.mount("#app");
