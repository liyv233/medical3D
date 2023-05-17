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
            <el-form-item label="医生工号：">
              <span>{{
                isInference == true && isAuth == true
                  ? UserInfo.work_no
                  : "请先登陆并且完成推理"
              }}</span>
            </el-form-item>
            <el-form-item label="病人ID：">
              <el-input
                :disabled="disabled"
                v-model="basicInfo.patientId"
                :placeholder="holder1"
              />
            </el-form-item>
          </el-col>
        </el-form>
      </div>
      <div class="notes">
        <article>医学影像所见：</article>
        <span>{{ handleCount }}</span>
      </div>
      <div class="suggestion">
        <article>医生诊断及建议：</article>
        <el-input
          type="textarea"
          v-model="basicInfo.suggestion"
          :disabled="disabled"
          :placeholder="holder"
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
              <span>{{ basicInfo.name }}</span>
            </el-form-item>
            <el-form-item label="性 别：">
              <span> {{ basicInfo.sex }}</span>
            </el-form-item>
            <el-form-item label="病人ID：">
              <span>{{ basicInfo.patientId }}</span>
            </el-form-item>
            <el-form-item label="医生工号：">
              <span>{{ UserInfo.work_no }}</span>
            </el-form-item>
          </el-col>
        </el-form>
      </div>
      <div class="notes">
        <article>医学影像所见：</article>
        <span>{{ description }}</span>
      </div>
      <div class="suggestion">
        <article>医生诊断及建议：</article>
        <span >{{ basicInfo.suggestion }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ElMessage } from "element-plus";
import { storeToRefs } from "pinia";
import { reactive, ref, computed, getCurrentInstance, onMounted } from "vue";
import { useUser } from "../store/User";
import { useTool } from "../store/Tool.js";
import Bus from "../utils/eventbus";
import htmlToPdf from "../utils/htmlToPdf";
const User = useUser();
const Tool = useTool();
const { dialogVisible, imgId, description } = storeToRefs(Tool);
const { UserInfo, isAuth, isInference, basicInfo, isCount } = storeToRefs(User);
var patient = reactive({
  patientId: basicInfo.value.patientId,
  suggestion: isAuth.value == true ? basicInfo.value.suggestion : "请先登陆",
});
// count
const handleCount = computed(() => {
  if (isCount.value == true) return description.value;
  else return "请先进行器官计数";
});
// 是否展示打印时用的面版
const request = getCurrentInstance().proxy.$request;
Bus.on("makepdf", async () => {
  var formData = new FormData();
  formData.append("opinion", basicInfo.value.suggestion);
  formData.append("description", description.value);
  formData.append("patient_id", basicInfo.value.patientId);
  formData.append("img_id", imgId.value);
  formData.append("doctor_id", UserInfo.value.doctor_id);
  const res = await fetch("http://10.33.39.163:5000/records", {
    method: "POST",
    body: formData,
    headers: {
    'Authorization': localStorage.getItem("Authorization")

  },
  });
  const data = await res.json();
  console.log(data);
  if (data._Result__code == 200) {
    htmlToPdf.getPdf(basicInfo.value.patientId + "报告单");
    dialogVisible.value = false;
    ElMessage.success("正在保存云端成功.....");
  } else {
    ElMessage.error("保存云端记录失败.....");
  }
});
const holder = computed(() => {
  if (isAuth.value == true && isInference.value == true)
    return "请输入诊断结果";
  else return "请先登陆";
});
const holder1 = computed(() => {
  if (isAuth.value == true && isInference.value == true) return "请输入患者id";
  else return "请先登陆";
});
const disabled = computed(() => {
  if (isAuth.value == true && isInference.value == true) return false;
  else return true;
});
onMounted(() => {});
</script>

<style lang="less" scoped>
.content {
  position: relative;
  display: flex;
  max-height: 60vh;
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
      margin-bottom: 2vh;
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
    left: -10000px;
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
      margin-left: 2vw;
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
            margin-left: 2vw;
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
        margin-left: 2vw;
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
        margin-left: 2vw;
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
