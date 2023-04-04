import { ElMessageBox } from "element-plus";
import { defineStore } from "pinia";
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
export const useUser = defineStore("user", () => {
  const isAuth = ref(false);
  const UserInfo = reactive({
    email: "",
    id: "",
    password: "",
    username: "",
    work_no: "",
    d_name: "",
  });
  const basicInfo = reactive({
    patientId: "",
    suggestion: "",
  });
  const isInference = ref(false);
  const inferenceResult = reactive({
    checkId: "",
    checkPart: "",
    judgment: "",
  });
  function setUserInfo(_Result__data, Authorization) {
    UserInfo.email = _Result__data.email;
    UserInfo.id = _Result__data.id;
    UserInfo.password = _Result__data.password;
    UserInfo.username = _Result__data.username;
    UserInfo.work_no = _Result__data.work_no;
    UserInfo.d_name = _Result__data.d_name;
    if (Authorization) {
      localStorage.setItem("token", Authorization);
    }
  }
  function handleLogOut() {
    let router = useRouter();
    ElMessageBox.confirm("是否登出").then(() => {
      done();
      isAuth.value = false;
      router.push("/");
    });
  }
  return {
    isAuth,
    isInference,
    UserInfo,
    inferenceResult,
    basicInfo,
    setUserInfo,
    handleLogOut,
  };
});
