<template>
  <div class="content">
    <el-icon
      class="tool"
      :size="40"
      color="white"
      @click="handleTool()"
      ><Setting
    /></el-icon>
    <div class="Canv">
      <canvas id="nv"></canvas>
    </div>
    <div class="port">
      <div class="pos">
        <article>坐标：[{{ lastPos.vox || "x ,y ,z" }}]</article>
        <article>像素值：{{ lastPos.str || "?" }}</article>
      </div>
    </div>
  </div>
  <tool v-show="toolSwitch"></tool>
</template>
<script setup>
import { storeToRefs } from "pinia";
import { useTool } from "../store";
import tool from "../components/tool.vue";
import { reactive, onMounted } from "vue";
// fix path from loaction
const volumes = reactive({ url: "/1.nii" });
// use Store
const Tool = useTool();
var { toolSwitch, lastPos } = storeToRefs(Tool);
const { handleTool, CanvasInit } = Tool;
// attach to canvas
function Attach() {
  const Views = CanvasInit();
  Views.attachTo("nv");
  let index = volumes.url.indexOf(".");
  let str = volumes.url.slice(index);
  if (str === ".nvd") {
    Views.loadDocumentFromUrl([volumes.url]);
  } else {
    Views.loadVolumes([volumes]);
  }
}

onMounted(() => {
  Attach();
});
</script>

<style lang="less" scoped>
.content {
  z-index: 1;
  height: 100vh;
  width: 100%;
  clear: both;
  .tool {
    cursor: pointer;
    float: right;
    background-color: black;
    right: 1vw;
    top: 2vh;
  }
  .Canv {
    width: 100%;
    height: 90vh;
  }
  .port {
    width: 100%;
    height: 10vh;
    background-color: rgb(0, 0, 0);
    .pos {
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 20vw;
      height: 10vh;
      article {
        margin-left: 2vw;
        font-size: 1.4em;
        font-weight: 700;
        color: white;
      }
    }
  }
}
</style>
