import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "/",
    component: () => import("../pages/upload.vue"),
  },
  {
    path: "/preview",
    name: "preview",
    component: () => import("../pages/preview.vue"),
  },
  {
    path: "/sign",
    name: "sign",
    component: () => import("../pages/sign.vue"),
  },
];
export default createRouter({
  history: createWebHashHistory(),
  routes: routes,
});
