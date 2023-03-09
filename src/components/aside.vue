<template>
  <div class="aside">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      :collapse="isCollapse"
      :router="true"
    >
      <el-menu-item
        index=""
        class="middle"
        @click="isCollapse = !isCollapse"
      >
        <el-icon><Menu /></el-icon>
      </el-menu-item>
      <el-menu-item index="/">
        <el-icon><Plus /></el-icon>
        <template #title>导入</template>
      </el-menu-item>
      <el-menu-item index="preview">
        <el-icon><View /></el-icon>
        <template #title>预览</template>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script setup>
import { ref } from "vue";
let isCollapse = ref(true);
</script>
<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 8vw;
  min-height: 100vh;
}
.el-menu {
  height: 100vh;
  border-right: none;
  .middle {
    text-align: center;
    display: flex;
    justify-content: center;
  }
}
</style>
