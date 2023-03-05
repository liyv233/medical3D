import VueRouter from "vue-router";
import Vue from "vue";
Vue.use(VueRouter);

// import show from "../pages/show.vue";
import test from '../pages/test.vue'
export default new VueRouter({
  routes: [
    {
      path: "/",
      component: test,
    },
  ],
});
