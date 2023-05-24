<template>
  <el-dialog
    v-model="reasionDialogVisible"
    title="请上传要推理的文件"
    width="30%"
  >
    <!-- Todo：upload -->
    <el-upload
      class="upload-demo"
      :multiple="false"
      :limit="1"
      :auto-upload="false"
      :on-change="addFile"
      accept=".nii,.nii.gz,.dcm,.raw,.mhd"
      action="none"
    >
      <el-button type="primary">选择文件</el-button>
    </el-upload>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="setReasionDialogVisible(false)">取消</el-button>
        <el-button
          type="primary"
          @click="uploadToReasion"
        >
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useUser } from "../store/user";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import { useTool } from "../store/Tool";
const Tool = useTool();
const User = useUser();
const router = useRouter();
const { AddVolumesFile } = Tool;
const { setReasionDialogVisible } = User;
const { volumes } = storeToRefs(Tool);
const { reasionDialogVisible, fileType } = storeToRefs(User);

const uploadToReasion = () => {
  AddVolumesFile(File);
  if (volumes.value.length) {
    fileType.value = 0;
    router.push("/preview");
  } else {
    ElMessage({
      type: "warning",
      message: "请先选择文件",
      showClose: true,
    });
  }
};

var File = null;
const addFile = (file) => {
  ElMessage.success("上传成功");
  File = file;
};
</script>

<style lang="less">
.el-dialog {
  .el-dialog__body {
    text-align: center;
    .upload-demo {
      .el-upload-list__item-info {
        margin-top: 2%;
        width: auto;
      }
    }
  }
}
</style>
