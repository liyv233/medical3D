import { defineStore } from "pinia";
import { ref, reactive } from "vue";
export const useAside = defineStore("user", () => {
  var isUpload = ref(true);
  function handlePreView() {
    isUpload.value = !isUpload.value;
  }
  return {
    handlePreView,
    isUpload,
  };
});
