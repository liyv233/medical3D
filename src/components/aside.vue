<template>
  <div class="aside">
    <el-menu
      :default-active="router.currentRoute.value.name"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      collapse
      router
    >
      <el-menu-item index="user">
        <el-icon><User /></el-icon>
        <template #title>用户中心</template>
      </el-menu-item>
      <el-menu-item index="/">
        <el-icon><Plus /></el-icon>
        <template #title>导入</template>
      </el-menu-item>
      <el-menu-item
        index="preview"
        v-show="volumes.length == 0 ? false : true"
      >
        <el-icon><View /></el-icon>
        <template #title>预览</template>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script setup>
import { User } from "@element-plus/icons-vue";
import { storeToRefs } from "pinia";
import { useTool } from "../store/Tool";
import { useRouter } from "vue-router";
// Tool Store
const Tool = useTool();
const { volumes } = storeToRefs(Tool);
// Router
const router = useRouter();
</script>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 6vw;
  min-height: 100vh;
}
.el-menu-vertical-demo,
.el-menu--collapse {
  width: 3.4vw;
  min-height: 100vh;
}
.el-menu {
  height: 100vh;
  border-right: none;
  .el-menu-item {
    .el-icon {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
