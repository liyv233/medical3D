import Vue from "vue";
import App from "./App.vue";
import element from "element-ui";
import store from "./stores/index";
import "element-ui/lib/theme-chalk/index.css";
import router from "./router/index";
Vue.use(element);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  store,
  router,
}).$mount("#app");
