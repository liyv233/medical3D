import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "main",
    component: () => import("../pages/upload.vue"),
  },
  {
    path: "/preview",
    name: "preview",
    component: () => import("../pages/preview.vue"),
  },
  {
    path: "/reg-Log",
    name: "reg-log",
    component: () => import("../pages/Reg&Log.vue"),
  },
];
export default createRouter({
  history: createWebHashHistory(),
  routes: routes,
});
