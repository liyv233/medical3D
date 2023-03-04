<template>
  <div>
    <el-container>
      <!-- 让宽度自适应 -->
      <el-aside
        width="auto"
        height="auto"
      >
        <Maside />
      </el-aside>
      <el-container>
        <el-main>
          <!-- 路由组件展示区域 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Maside from "./components/aside.vue";
export default {
  name: "App",
  components: {
    Maside,
  },
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
}
.el-main {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
}
</style>
