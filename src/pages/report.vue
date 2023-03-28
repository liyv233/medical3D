<template>
  <div class="content">
    <div class="form"></div>
  </div>
</template>

<script setup>
import { onMounted, reactive } from "vue";
var Infomation = reactive({
  patientName: "",
  patientAge: "",
  height: "",
  kg: "",
});
onMounted(() => {
  console.log("report page");
});
</script>

<style lang="less" scoped>
.content {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  .form {
    width: 68vw;
    height: 85vh;
    background-color: rgb(255, 255, 255);
  }
}
</style>
