<template>
  <div class="content">
    <!-- 用来展示的页面 -->
    <div class="form">
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
        <span>{{ patient.description }}</span>
      </div>
      <div class="suggestion">
        <article>医生诊断及建议：</article>
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
            <el-form-item label="姓 名：">
              <span>{{ patient.name }}</span>
            </el-form-item>
            <el-form-item label="性 别：">
              <span> {{ patient.sex }}</span>
            </el-form-item>
            <el-form-item label="病人ID：">
              <span>{{ patient.patientId }}</span>
            </el-form-item>
            <el-form-item label="医生：">
              <span>{{ UserInfo.d_name }}</span>
            </el-form-item>
          </el-col>
        </el-form>
      </div>
      <div class="notes">
        <article>医学影像所见：</article>
        <span>{{ inferenceResult.description }}</span>
      </div>
      <div class="suggestion">
        <article>医生诊断及建议：</article>
        <span>{{ basicInfo.suggestion }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ElMessage } from "element-plus";
import { storeToRefs } from "pinia";
import { reactive, ref, getCurrentInstance } from "vue";
import { useUser } from "../store/User";
import { useTool } from "../store/Tool.js";
import Bus from "../utils/eventbus";
import htmlToPdf from "../utils/htmlToPdf";
const User = useUser();
const Tool = useTool();
const { dialogVisible, imgId } = storeToRefs(Tool);
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
const request = getCurrentInstance().proxy.$request;
Bus.on("makepdf", async () => {
  if (isInference.value == true && isAuth.value == true) {
    await htmlToPdf.getPdf(basicInfo.value.patientId + "报告单");
    dialogVisible.value = false;
    ElMessage.success("请稍等.....");
    var data = new FormData();
    data.append("opinion", basicInfo.suggestion);
    data.append("description", inferenceResult.description);
    data.append("patient_id", basicInfo.patientId);
    data.append("img_id", imgId.value);
    request.post("/records");
  } else {
    ElMessage.error("请先登陆并推理完成");
  }
});
</script>

<style lang="less" scoped>
.content {
  position: relative;
  display: flex;
  max-height: 50vh;
  .form {
    justify-content: center;
    align-items: center;
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
        flex-direction: column;
        justify-content: center;
        width: 100%;
        .el-form-item {
          margin-bottom: 0;
          span {
            font-size: 16px;
          }
          :deep(.el-form-item__label) {
            font-style: 16px;
          }
          .el-input {
            width: auto;
          }
        }
      }
    }
    .notes,
    .suggestion {
      margin-top: 4vh;
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
  .file {
    position: absolute;
    left: -10001px;
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
        flex-direction: column;
        justify-content: center;
        width: 100%;
        .el-form-item {
          margin-bottom: 0;
          margin-top: 4vh;
          span {
            font-size: 16px;
          }
          :deep(.el-form-item__label) {
            font-style: 16px;
          }
          .el-input {
            width: auto;
          }
        }
      }
    }
    .notes {
      margin-top: 2vh;
      border-top: 1px solid #000;
      padding-top: 2vh;
      article {
        margin-bottom: 4vh;
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
    .suggestion {
      margin-top: 20vh;
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
