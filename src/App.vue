<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="auto">
        <side></side>
      </el-aside>
      <el-container>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import Side from "./components/aside.vue";
</script>

<style lang="less" scoped>
.el-main {
  background-color: aliceblue;
  padding: 0;
  margin: 0;
}
</style>
