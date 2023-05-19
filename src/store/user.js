import { defineStore } from "pinia";
import { ref, reactive } from "vue";
export const useUser = defineStore("user", () => {
  const reasionDialogVisible = ref(false);
  const lungDialogVisible = ref(false);
  const isAuth = ref(false);
  const pageNum = ref(1);
  const UserInfo = reactive({
    email: "",
    username: "",
    work_no: "",
    d_name: "",
    doctor_id: "",
  });
  const basicInfo = reactive({
    name: "",
    sex: "",
    patientId: "",
    suggestion: "",
  });
  const isCount = ref(false);
  const isInference = ref(false);
  const fileType = ref(0);
  function setUserInfo(_Result__data, Authorization) {
    UserInfo.email = _Result__data.email;
    UserInfo.id = _Result__data.id;
    UserInfo.password = _Result__data.password;
    UserInfo.username = _Result__data.username;
    UserInfo.work_no = _Result__data.work_no;
    UserInfo.doctor_id = _Result__data.doctor_id;
    UserInfo.d_name = _Result__data.d_name;
    if (Authorization) {
      localStorage.setItem("Authorization", Authorization);
    }
  }
  function setReasionDialogVisible(value) {
    reasionDialogVisible.value = value;
  }
  function setLungDialogVisible(value) {
    lungDialogVisible.value = value;
  }
  return {
    isAuth,
    isInference,
    UserInfo,
    basicInfo,
    pageNum,
    isCount,
    lungDialogVisible,
    reasionDialogVisible,
    fileType,
    setReasionDialogVisible,
    setLungDialogVisible,
    setUserInfo,
  };
});
