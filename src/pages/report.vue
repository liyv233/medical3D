<template>
  <div
    class="content"
    :loading="loading"
  >
    <!-- 用来展示的页面 -->
    <div
      class="form"
      v-show="true"
      id="pdfDom"
    >
      <span class="title">
        <p>检 查 报 告 单</p>
      </span>
      <div class="infomation">
        <el-form
          :model="patient"
          label-position="right"
        >
          <el-col>
            <el-form-item label="医 生 ID：">
              <span>{{ patient.work_no }}</span>
            </el-form-item>
            <el-form-item label="检 查 部 位ID：">
              <span> {{ patient.checkId }}</span>
            </el-form-item>
            <el-form-item label="检 查 部 位：">
              <span>{{ patient.checkPart }}</span>
            </el-form-item>
            <el-form-item label="病 人 ID：">
              <el-input
                v-model="patient.patientId"
                placeholder="请输入患者的id"
              />
            </el-form-item>
          </el-col>
        </el-form>
      </div>
      <div class="notes">
        <article>医学影像所见：</article>
        <span>{{ patient.judgment }}</span>
      </div>
      <div class="suggestion">
        <article>医生诊断：</article>
        <el-input
          type="textarea"
          v-model="patient.suggestion"
          :disabled="!isAuth"
        ></el-input>
      </div>
    </div>
    <!-- 生成pdf的页面 -->
    <div
      class="file"
      v-show="false"
    >
      <span class="title">
        <p>检 查 报 告 单</p>
      </span>
      <div class="infomation">
        <el-form
          :model="patient"
          label-position="right"
        >
          <el-col>
            <el-form-item label="医 生 ID：">
              <span>{{ patient.work_no }}</span>
            </el-form-item>
            <el-form-item label="检 查 ID：">
              <span> {{ patient.checkId }}</span>
            </el-form-item>
            <el-form-item
              label="检 查 部 位："
              style="margin-left: 0.8vw"
            >
              <span>{{ patient.checkPart }}</span>
            </el-form-item>
            <el-form-item label="病 人 ID：">
              <el-input
                v-model="patient.patientId"
                placeholder="请输入患者的id"
              />
            </el-form-item>
          </el-col>
        </el-form>
      </div>
      <div class="notes">
        <article>医学影像所见：</article>
        <span>{{ patient.judgment }}</span>
      </div>
      <div class="suggestion">
        <article>医生诊断：</article>
        <el-input
          type="textarea"
          v-model="patient.suggestion"
          :disabled="!isAuth"
        ></el-input>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ElMessage } from "element-plus";
import { storeToRefs } from "pinia";
import { reactive, ref } from "vue";
import { useUser } from "../store/User";
import Bus from "../utils/eventbus";
import htmlToPdf from "../utils/htmlToPdf";
const User = useUser();
const { UserInfo, inferenceResult, isAuth, isInference, basicInfo } =
  storeToRefs(User);
var patient = reactive({
  work_no: isAuth.value == true ? UserInfo.value.d_name : "请先登陆",
  patientId: basicInfo.value.patientId,
  checkId: handleInference("checkId"),
  checkPart: handleInference("checkPart"),
  judgment: handleInference("judgment"),
  suggestion: isAuth.value == true ? basicInfo.value.suggestion : "请先登陆",
});
// 处理推理得出信息
function handleInference(msg) {
  if (isInference.value == true) {
    return inferenceResult[msg];
  } else {
    return "请先进行推理";
  }
}
// 是否展示打印时用的面版
var loading = ref(false);
var print = ref(false);
Bus.on("makepdf", async () => {
  if (isInference.value == true && isAuth.value == true) {
    print.value = true;
    loading.value = true;
    await htmlToPdf.getPdf(basicInfo.value.patientId + "报告单");
    loading.value = false;
    ElMessage.success("打印成功");
    return true;
  } else {
    ElMessage.error("请先登陆并推理完成");
    return false;
  }
});
</script>

<style lang="less" scoped>
.content {
  display: flex;
  justify-content: center;
  align-items: center;
  max-height: 50vh;
  .form {
    padding: 2%;
    width: 65vw;
    background-color: rgb(255, 255, 255);
    .title {
      display: block;
      width: 100%;
      text-align: center;
      border-bottom: 1px solid black;
      font-size: 32px;
      font-weight: 700;
      p {
        margin-bottom: 2.1vh;
      }
    }
    .infomation {
      margin-top: 1vh;
      margin-bottom: 2vh;
      .el-col {
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 100%;
        .el-form-item {
          margin-left: 0.2vw;
          :deep(.el-form-item__label) {
            font-style: 18px;
          }
          span {
            font-size: 17px;
          }
          .el-input {
            width: auto;
          }
        }
      }
    }
    .notes,
    .suggestion {
      margin-top: 5vh;
      border-top: 1px solid #000;
      padding-top: 2vh;
      article {
        margin-bottom: 2vh;
        font-size: 20px;
        font-weight: 700;
      }
      span {
        font-size: 18px;
      }
      :deep(.el-textarea__inner) {
        font-size: 18px;
      }
    }
  }
}
</style>
