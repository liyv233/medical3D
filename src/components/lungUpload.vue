<template>
  <el-dialog
    v-model="lungDialogVisible"
    title="请上传模型"
    width="30%"
  >
    <!-- Todo：upload -->
    <el-upload
      class="upload-demo"
      :multiple="false"
      :limit="1"
      :auto-upload="false"
      accept=".nii,.nii.gz,.dcm,.raw,.mhd"
      action="none"
    >
      <el-button type="primary">选择文件</el-button>
    </el-upload>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="setLungDialogVisible(false)">取消</el-button>
        <el-button
          type="primary"
          @click="uploadToLung"
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
import { useRouter } from "vue-router";
import { useTool } from "../store/Tool";
const Tool = useTool();
const router = useRouter();
const User = useUser();
const { AddVolumesFile } = Tool;
const { setLungDialogVisible } = User;
const { volumes } = storeToRefs(Tool);
const { lungDialogVisible, fileType } = storeToRefs(User);

const uploadToLung = () => {
  AddVolumesFile(File);
  if (volumes.value.length) {
    fileType.value = 1;
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
<style lang="less" scoped></style>
