<template>
  <div class="signBox">
    <side style="width: 60%; height: 70%;"></side>
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
margin-top: 15vh;
  margin-left: 15%;
}
</style>