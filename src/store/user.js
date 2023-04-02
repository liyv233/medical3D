import { defineStore } from "pinia";
import { ref } from "vue";

export const useUser = defineStore("user", () => {
  const isAuth = ref(false);
  function SignOut() {
    isAuth.value = false;
    router.push("/");
  }

  return { SignOut, isAuth };
});
