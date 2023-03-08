import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "main",
    component: () => import("../pages/show.vue"),
  },
  {
    path: "/test",
    name: "test",
    component: () => import("../pages/test.vue"),
  },
];
export default createRouter({
  history: createWebHashHistory(),
  routes: routes,
});
