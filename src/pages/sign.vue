<template>
  <div class="Sign">
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
            name="username"
            id="username"
            placeholder="用户名"
          />
          <input
            type="email"
            name="emal"
            id="email"
            placeholder="邮箱"
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="密码"
          />
          <button class="signUp">注 册</button>
        </div>
      </div>
      <!-- login -->
      <div class="form-container sign-in-container">
        <div class="form">
          <h2>登 陆</h2>
          <input
            type="email"
            name="emal"
            id="email"
            placeholder="邮箱"
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="密码"
          />
          <a
            href="#"
            class="forget-password"
            >忘记密码?</a
          >
          <button class="signIn">登 陆</button>
        </div>
      </div>
      <!-- overlay container -->
      <div class="overlay_container">
        <div class="overlay">
          <!-- overlay left -->
          <div class="overlay_panel overlay_left_container">
            <h2>欢 迎 使 用</h2>
            <p>输入您的个人信息并与我们一起开始旅程</p>
            <button @click="RemoveClass()">登 陆</button>
          </div>
          <!-- overlay right -->
          <div class="overlay_panel overlay_right_container">
            <h2>欢 迎 回 来</h2>
            <p>为了与我们保持联系，请使用您的个人信息登录</p>
            <button @click="AddClass()">注 册</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useUser } from "../store/user";
import { storeToRefs } from "pinia";
const User = useUser();
const { SignIn } = storeToRefs(User);
const { handleSignIn } = User;
const container = ref(null);
function AddClass() {
  container.value.classList.add("active");
}
function RemoveClass() {
  container.value.classList.remove("active");
}
// onMounted --- debugger
onMounted(() => {});
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
          p {
            font-size: 12px;
            margin: 10px 0 15px 0;
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
