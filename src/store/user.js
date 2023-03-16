import { defineStore } from "pinia";
import { ref } from "vue";

export const useUser = defineStore("user", () => {
  const SignIn = ref(false);
  function handleSignIn() {
    SignIn.value = !SignIn.value;
  }
  return {
    SignIn,
    handleSignIn,
  };
});
