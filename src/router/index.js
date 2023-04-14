import { createRouter, createWebHashHistory } from "vue-router";
import { ElMessage } from "element-plus";
import pinia from "../store/store";
import { useUser } from "../store/user";
import { storeToRefs } from "pinia";
const User = useUser(pinia);
const { isAuth } = storeToRefs(User);
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
    path: "/user",
    name: "user",
    component: () => import("../pages/user.vue"),
    meta: {
      auth: true,
    },
  },
  {
    path: "/sign",
    name: "sign",
    component: () => import("../pages/sign.vue"),
  },
];
const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
});
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.auth)) {
    if (isAuth.value == false) {
      ElMessage.error("请先登陆");
      router.push("/sign");
    } else {
      next();
    }
  } else {
    next();
  }
});
export default router;
