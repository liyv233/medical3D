import { defineStore } from "pinia";
import { ref } from "vue";

export const UseUser = defineStore("user", () => {
  const SignIn = ref(false);
  function handleSignIn() {
    SignIn.value = !SignIn.value;
  }
  return {
    SignIn,
    handleSignIn,
  };
});
