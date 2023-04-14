<template>
  <div class="content">
    <el-icon
      class="tool"
      :size="40"
      color="white"
      @click="handleTool()"
    >
      <Setting />
    </el-icon>
    <div class="Canv">
      <canvas
        id="nv1"
        v-show="!isInference"
      ></canvas>
      <canvas
        id="nv2"
        v-show="isInference"
      ></canvas>
    </div>
    <div class="port">
      <div class="pos">
        <article>坐标：[{{ lastPos.vox || "x ,y ,z" }}]</article>
        <article>器官id：{{ lastPos.str || "x" }}</article>
      </div>
    </div>
  </div>
  <!-- tool -->
  <tool v-show="toolSwitch"></tool>
  <!-- dialog -->
</template>

<script setup>
import { onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import { useTool } from "../store/Tool.js";
import { NVImage } from "@niivue/niivue";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import { useUser } from "../store/user";
import tool from "../components/tool.vue";
import Bus from "../utils/eventbus";
// use Store
const userStore = useUser();
const { isInference } = storeToRefs(userStore);
const Tool = useTool();
const router = useRouter();
var { toolSwitch, lastPos, volumes } = storeToRefs(Tool);
const { handleTool, getVolumesFile, CanvasInit } = Tool;
// attach to canvas
var View = CanvasInit();
async function Attach() {
  const file = getVolumesFile();
  // const View = CanvasInit();
  View.attachTo("nv1");
  const nvimage = await NVImage.loadFromFile({ file: file[0].raw });
  View.addVolume(nvimage);
}
// 组件通信

Bus.on("selectView", async (url, param) => {
  console.log(url);
  console.log(param);

  View = CanvasInit();
  View.attachTo("nv2");
  const nvimage = await NVImage.loadFromUrl({ url });
  View.addVolume(nvimage);
});
// onMounted
onMounted(async () => {
  if (volumes.value.length == 0) {
    ElMessage({
      type: "warning",
      message: "请先提交文件",
    });
    router.push("/");
  } else {
    Attach();
  }
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
  .tool:active {
    transform: scale(0.92);
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
