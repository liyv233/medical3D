<template>
  <div class="upload">
    <div class="uploadbox">
      <el-upload
        class="upload-demo"
        drag
        :multiple="false"
        :limit="1"
        :auto-upload="false"
        :on-change="AddVolumesFile"
        :on-remove="RemoveVolumesFile"
        action="none"
        accept=".nii,.nii.gz,.dcm,.raw,.mhd"
      >
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        <div class="el-upload__text">拖拽文件或者<em>点击上传</em></div>
        <template #tip>
          <div class="el-upload__tip">
            支持格式：nii、nii.gz、dcm、raw、mhd等
          </div>
        </template>
      </el-upload>
      <el-button
        round
        type="primary"
        @click="HandleSubmit()"
      >
        打开图片
      </el-button>
    </div>
  </div>
</template>
<script setup>
import { UploadFilled } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import { useTool } from "../store/Tool";
import { ElMessage } from "element-plus";
import { storeToRefs } from "pinia";
const Tool = useTool();
const { AddVolumesFile, RemoveVolumesFile } = Tool;
const { volumes } = storeToRefs(Tool);
const router = useRouter();
function HandleSubmit() {
  if (volumes.value.length) {
    router.push("/preview");
  } else {
    ElMessage({
      type: "warning",
      message: "请先选择文件",
      showClose: true,
    });
  }
}
</script>
<style lang="less" scoped>
.upload {
  height: 100vh;
  width: 100%;
  .uploadbox {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .upload-demo {
      background-image: linear-gradient(45deg, #93a5cf 0%, #e4efe9 100%);
      border-radius: 25px;
      width: 50vw;
      height: 60vh;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      border-radius: 30px;
      :deep(.el-upload-dragger) {
        width: 20vw;
        height: 25vh;
        border: none;
        background: rgba(255, 255, 255, 0.2);
        backdrop-filter: blur(8px);
        border-radius: 25px;
        box-shadow: inset 0 0 6px rgba(255, 255, 255, 0.2);
      }
      :deep(.el-upload-list__item, .is-ready) {
        transform: translate(0, 3vh);
        font-size: 20px;
        height: 4vh;
        line-height: 4vh;
        width: 10vw;
      }
      :deep(.el-upload-list__item, .is-ready):hover {
        background-color: #e4efe9;
      }
      .el-upload__text {
        font-size: 18px;
      }
      .el-upload__tip {
        transform: translate(0, 2vh);
        font-size: 18px;
      }
    }
    .upload-demo:hover {
      border-color: #409eff;
    }
    .el-button {
      transform: translate(0, -8vh);
    }
    .el-button:active {
      scale: 0.95;
    }
  }
}
</style>
