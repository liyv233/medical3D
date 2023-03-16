<template>
  <div class="aside">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      :collapse="true"
      :router="true"
    >
      <el-menu-item index="">
        <el-icon><User /></el-icon>
        <template #title>用户中心</template>
      </el-menu-item>
      <el-menu-item index="/">
        <el-icon><Plus /></el-icon>
        <template #title>导入</template>
      </el-menu-item>
      <el-menu-item
        index="preview"
        :disabled="isUpload"
      >
        <el-icon><View /></el-icon>
        <template #title>预览</template>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script setup>
import { User } from "@element-plus/icons-vue";
import { ref } from "vue";
import { useAside } from "../store/Aside.js";
import { storeToRefs } from "pinia";
const Aside = useAside();
const { isUpload } = storeToRefs(Aside);
</script>
<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 6vw;
  min-height: 100vh;
}
.el-menu-vertical-demo,
.el-menu--collapse {
  width: 3.5vw;
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
