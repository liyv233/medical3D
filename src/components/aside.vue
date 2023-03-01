<template>
  <div class="aside">
    <el-menu
      default-active="1-4-1"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      :collapse="isCollapse"
    >
      <el-menu-item
        class="top"
        index="1"
      >
        <i class="el-icon-picture-outline-round"></i>
        <span slot="title">模型导入</span>
      </el-menu-item>
      <el-menu-item
        class="bottom"
        index="2"
      >
        <i class="el-icon-user-solid"></i>
        <span slot="title">个人中心</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "asize",
  data() {
    return { isCollapse: true };
  },
  methods: {
    handMenu() {
      this.isCollapse = !this.isCollapse;
    },
  },
};
</script>
<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 150px;
  min-height: 100vh;
}
.el-menu {
  height: 100vh;
  border-right: none;
  display: flex;
  flex-direction: column;
}
</style>
