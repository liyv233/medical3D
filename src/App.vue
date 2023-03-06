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

<style lang="less" scoped>
.el-card__body,
.el-main {
  padding: 0;
  overflow: hidden;
}
</style>
