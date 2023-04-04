<template>
  <div class="aside">
    <el-menu
      :default-active="router.currentRoute.value.name"
      class="el-menu-vertical-demo"
      background-color="#545c84"
      text-color="#fff"
      active-text-color="#ffd523"
      collapse
      router
      style="position: relative"
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
        v-show="volumes.length"
      >
        <el-icon><View /></el-icon>
        <template #title>预览</template>
      </el-menu-item>
      <el-menu-item
        v-show="isAuth"
        class="bottom"
        @click="handleLogOut"
      >
        <el-icon><Close /></el-icon>
        <template #title>登出</template>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script setup>
import { User } from "@element-plus/icons-vue";
import { storeToRefs } from "pinia";
import { useTool } from "../store/Tool";
import { useRouter } from "vue-router";
import { useUser } from "../store/User";
// Tool Store
const Tool = useTool();
const UserStore = useUser();
const { volumes } = storeToRefs(Tool);
const { isAuth } = storeToRefs(UserStore);
const { handleLogOut } = UserStore;
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
  max-width: 3.4vw;
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
  .bottom {
    position: absolute;
    bottom: 0;
    width: 100%;
  }
}
</style>
