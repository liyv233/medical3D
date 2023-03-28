import { defineStore } from "pinia";
import { ref } from "vue";
import router from "../router/index";
export const useUser = defineStore("user", () => {
  const isAuth = ref(false);
  function SignIn(In) {
    isAuth.value = true;
    router.push("/user");
  }
  function SignOut() {
    isAuth.value = false;
    router.push("/");
  }
  const Register = (Reg, container) => {
    container.classList.remove("active");
  };
  return { SignIn, SignOut, Register, isAuth };
});
