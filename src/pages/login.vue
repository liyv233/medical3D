<template>
  <div class="signBox">
    <side ></side>
  </div>
</template>

<script setup>
import side from './sign.vue'
import { storeToRefs } from "pinia";
import { useUser } from "../store/User";
import { onMounted } from 'vue'
const User = useUser();
const { isReport } = storeToRefs(User);

onMounted(() => {
  isReport.value = false ;
})
</script>

<style>
.signBox {
  margin-left: 16.5vw;
  margin-top: 7.5vh;
  width: 65vw;
  height: 75vh;
}
</style>