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
</style>
