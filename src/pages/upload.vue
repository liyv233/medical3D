<template>
  <div class="upload">
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
</template>
<script setup>
import { reactive } from "vue";
import { UploadFilled } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
var File = reactive(null);
const router = useRouter();
function HandleChange(file) {
  File = file;
  console.log(File);
}
function HandleSubmit() {
  if (File) {
    router.push("/preview");
  } else {
    // Message({
    //   type: "warning",
    //   message: "请先传入文件",
    // });
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
      background: rgba(255, 255, 255, 0.205);
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
        font-size: 20px;
        text-align: center;
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
        margin-top: 30px;
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
      background-color: #7adaf1;
      text-align: center;
    }
    .btn:active {
      background-color: rgb(126, 206, 238);
    }
  }
}
</style>
