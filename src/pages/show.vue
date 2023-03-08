<template>
  <div class="all">
    <div
      class="upload"
      v-show="!OpenCanvas"
    >
      <div class="uploadbox">
        <el-upload
          class="upload-demo"
          drag
          :multiple="false"
          :limit="1"
          :auto-upload="false"
          :on-change="HandleChange"
          action="none"
        >
          <el-icon class="el-icon--upload"><upload-filled /></el-icon>
          <div class="el-upload__text">拖拽文件或者<em>点击上传</em></div>
          <template #tip>
            <div class="el-upload__tip">支持格式：nii、nii.gz、dcm、</div>
          </template>
        </el-upload>
        <div
          class="btn"
          @click="HandleSubmit"
        >
          <div class="text">提交</div>
        </div>
      </div>
    </div>
    <!-- content -->
    <div
      class="content"
      v-show="OpenCanvas"
    >
      <!-- 导航 -->
      <MedHeader></MedHeader>
      <!-- 画布 -->
      <div class="Canv">
        <canvas id="nv"></canvas>
      </div>
      <!-- 底部坐标 -->
      <div class="port">
        <span>{{ lastPos.vox }}</span>
        <span>{{ lastPos.string }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { UploadFilled } from "@element-plus/icons-vue";
import MedHeader from "../components/MedHeader.vue";
import { Niivue } from "@niivue/niivue";

var volumes = reactive({ url: "/test.nvd" });
var File = reactive(null);
var Views = reactive(null);
var OpenCanvas = ref(false);

var lastPos = reactive({
  vox: "",
  str: "",
});

function handleIntensityChange(data) {
  lastPos.vox = data.vox[0] + " , " + data.vox[1] + " , " + data.vox[2];
  lastPos.str = data.str;
}

function HandleChange(file) {
  File = file;
  console.log(File);
}
function handleShow() {}

function Canvasinit() {
  Views = new Niivue({
    logging: "true",
    dragAndDropEnabled: false,
    backColor: [0, 0, 0, 1],
    show3Dcrosshair: true,
    onLocationChange: handleIntensityChange,
  });

  Views.attachTo("nv");
  Views.opts.multiplanarForceRender = true;
  Views.setRadiologicalConvention(false);
  Views.setClipPlane([0.3, 270, 0]);
  Views.drawOpacity = 0.4;
  Views.setSliceMM(true);
  let index = volumes.url.indexOf(".");
  let str = volumes.url.slice(index);
  if (str === ".nvd") {
    Views.loadDocumentFromUrl([volumes.url]);
  } else {
    Views.loadVolumes([volumes]);
  }
}

function HandleSubmit() {
  if (File) {
    OpenCanvas.value = true;
    console.log(OpenCanvas);
    Canvasinit();
  } else {
    // Message({
    //   type: "warning",
    //   message: "请先传入文件",
    // });
  }
}

onMounted(() => {});
</script>

<style lang="less" scoped>
.all {
  .upload {
    .uploadbox {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 100vh;
      width: 100%;
      .upload-demo {
        cursor: pointer;
        width: 30vw;
        height: 40vh;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        border-radius: 6px;
        border: 1px dashed #d9d9d9;
        /deep/.el-upload-dragger {
          border: none;
        }
        /deep/.el-upload-list__item,
        .is-ready {
          width: 8vw;
        }
        .el-upload__text {
          font-size: 18px;
        }
        .el-upload__tip {
          font-size: 18px;
        }
      }
      .upload-demo:hover {
        border-color: #409eff;
      }
      .btn {
        font-size: 18px;
        margin-top: 5vh;
        cursor: pointer;
        width: 8vh;
        height: 4vh;
        line-height: 4vh;
        border-radius: 2vh;
        background-color: rgb(178, 225, 243);
        text-align: center;
      }
      .btn:active {
        background-color: rgb(76, 125, 231);
      }
    }
  }
  .content {
    height: 100vh;
    width: 100vw;

    .Canv {
      width: 100vw;
      height: 88vh;
    }
    .port {
      width: 100vw;
      height: 5vh;
      background-color: rgb(0, 0, 0);
      span {
        margin-left: 2vw;
        margin-top: 1vh;
        font-size: 1.3em;
        font-weight: 700;
        color: white;
      }
    }
  }
}
</style>
