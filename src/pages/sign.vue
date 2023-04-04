<template>
  <div
    class="Sign"
    v-loading="loading"
  >
    <div
      class="container"
      ref="container"
    >
      <!-- register -->
      <div class="form-container sign-up-container">
        <div class="form">
          <h2>注 册</h2>
          <input
            type="text"
            placeholder="用户名"
            v-model="Reg.username"
          />
          <input
            type="tel"
            placeholder="手机号"
            v-model="Reg.phone"
          />
          <input
            type="password"
            placeholder="密码"
            v-model="Reg.password"
          />
          <button
            class="signUp"
            @click="Register(Reg)"
          >
            注 册
          </button>
        </div>
      </div>
      <!-- login -->
      <div class="form-container sign-in-container">
        <div class="form">
          <h2>登 陆</h2>
          <input
            type="tel"
            placeholder="手机号"
            v-model="In.phone"
          />
          <input
            type="password"
            placeholder="密码"
            v-model="In.password"
          />
          <span
            class="forget-password"
            @click="forget"
            style="cursor: pointer"
            >忘记密码?
          </span>
          <button
            class="signIn"
            @click="SignIn(In)"
          >
            登 陆
          </button>
        </div>
      </div>
      <!-- overlay container -->
      <div class="overlay_container">
        <div class="overlay">
          <!-- overlay left -->
          <div class="overlay_panel overlay_left_container">
            <h2>欢 迎 使 用</h2>
            <button @click="RemoveClass()">登 陆</button>
          </div>
          <!-- overlay right -->
          <div class="overlay_panel overlay_right_container">
            <h2>欢 迎 回 来</h2>
            <button @click="AddClass()">注 册</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { ref, reactive, getCurrentInstance } from "vue";
import { useUser } from "../store/User";
import { ElMessage } from "element-plus";
const User = useUser();
const { isAuth } = storeToRefs(User);
const { setUserInfo } = User;
const container = ref(null);
function AddClass() {
  container.value.classList.add("active");
}
function RemoveClass() {
  container.value.classList.remove("active");
}
// 登陆、注册
const router = useRouter();
var In = reactive({
  phone: "",
  password: "",
});
var Reg = reactive({
  username: "",
  phone: "",
  password: "",
});
const instance = getCurrentInstance();

// 登陆
var loading = ref(false);
async function SignIn(In) {
  loading.value = true;
  let data = new FormData();
  for (let i in In) {
    data.append(i, In[i]);
  }
  const response = await instance.proxy.$request.post("/login", data);
  console.log(response);
  const { _Result__data } = response.data;
  loading.value = false;
  // 用户数据
  setUserInfo(_Result__data, response.data._Result__msg);
  if (response.data._Result__code == 200) {
    ElMessage.success("登陆成功，即将跳转");
    router.push("/user");
    isAuth.value = true;
  } else if (response.data._Result__code == 201) {
    if (response.data._Result__msg == "用户名或者密码错误！")
      ElMessage.error("账号或者密码错误！");
    else ElMessage.error("该用户不存在！");
  } else {
    ElMessage.error("出错了");
  }
}
// 注册
async function Register(Reg) {
  loading.value = true;
  var data = new FormData();
  for (let i in Reg) {
    data.append(i, Reg[i]);
  }
  const response = await instance.proxy.$request.post("/register", data);
  loading.value = false;
  if (response.data._Result__code == 200) {
    ElMessage.success("注册成功，将为你跳转到登陆界面。");
    container.value.classList.remove("active");
  } else if (response.data._Result__code == 201) {
    ElMessage.error("该用户已经存在。");
    container.value.classList.remove("active");
  } else {
    ElMessage.error("出错了");
  }
}
// 密码
function forget() {}
</script>

<style lang="less" scoped>
.Sign {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  .container {
    position: relative;
    width: 55%;
    height: 55%;
    background-color: rgb(255, 255, 255);
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.2);
    border-radius: 1.5%;
    overflow: hidden;
    .form-container {
      position: absolute;
      top: 0;
      width: 50%;
      height: 100%;
      background-color: rgb(255, 255, 255);
      transition: all 0.6s ease-in-out;
      .form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 100%;
        .forget-password {
          display: inline-block;
          height: 3vh;
          line-height: 3vh;
          text-decoration: none;
          color: #bbb;
          text-transform: capitalize;
          font-size: 12px;
        }
        .forget-password:hover {
          color: lightslategray;
          border-bottom: 2px solid #ff4b2b;
        }
        input {
          width: 80%;
          margin: 0.7vh 0;
          padding: 1.6vh 1vw;
          background-color: #eee;
          border: none;
        }
        button {
          cursor: pointer;
          background: #ff4b2b;
          padding: 1vh 2vw;
          border: 1px solid transparent;
          border-radius: 2vw;
          text-transform: uppercase;
          color: white;
          margin-top: 0.7vh;
          outline: none;
          transition: transform 80;
        }
        button:active {
          transform: scale(0.95);
        }
      }
    }
    .overlay_container {
      position: absolute;
      top: 0;
      width: 50%;
      height: 100%;
      z-index: 100;
      right: 0;
      overflow: hidden;
      transition: all 0.6s ease-in-out;
      .overlay {
        position: absolute;
        width: 200%;
        height: 100%;
        left: -100%;
        background-color: #aecefd;
        .overlay_panel {
          position: absolute;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 50%;
          height: 100%;
          color: white;
          text-align: center;
          button {
            cursor: pointer;
            background-color: transparent;
            border: 1px solid white;
            padding: 1vh 2vw;
            border-radius: 2vw;
            text-transform: uppercase;
            color: white;
            margin-top: 0.7vh;
            outline: none;
            transition: transform 80;
          }
          button:active {
            transform: scale(0.95);
          }
        }
        .overlay_right_container {
          right: 0;
        }
      }
    }
  }
  .container.active .sign-up-container {
    transform: translateX(100%);
    z-index: 5;
  }
  .container.active .sign-in-container {
    transform: translateX(100%);
  }
  .container.active .overlay_container {
    transform: translateX(-100%);
  }
  .container.active .overlay {
    transform: translateX(50%);
  }
  h2 {
    margin-bottom: 10px;
    font-size: 32px;
    text-transform: capitalize;
  }
}
</style>
