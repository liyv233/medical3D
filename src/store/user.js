import { defineStore } from "pinia";
import { ref, reactive } from "vue";
export const useUser = defineStore("user", () => {
  const isAuth = ref(false);
  const pageNum = ref(1);
  const UserInfo = reactive({
    email: "",
    password: "",
    username: "",
    work_no: "",
    d_name: "",
  });
  const basicInfo = reactive({
    name: "",
    sex: "",
    patientId: "",
    suggestion: "",
  });
  const isInference = ref(false);
  const inferenceResult = reactive({
    description: "",
  });
  function setUserInfo(_Result__data, Authorization) {
    UserInfo.email = _Result__data.email;
    UserInfo.id = _Result__data.id;
    UserInfo.password = _Result__data.password;
    UserInfo.username = _Result__data.username;
    UserInfo.work_no = _Result__data.work_no;
    UserInfo.d_name = _Result__data.d_name;
    if (Authorization) {
      localStorage.setItem("Authorization", Authorization);
    }
  }
  return {
    isAuth,
    isInference,
    UserInfo,
    inferenceResult,
    basicInfo,
    pageNum,
    setUserInfo,
  };
});
