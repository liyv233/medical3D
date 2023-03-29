<template>
  <div class="content">
    <div class="form">
      <span class="title">
        <p>检 查 报 告 单</p>
      </span>
      <div class="infomation">
        <el-form
          :model="patient"
          label-position="left"
          label-width="auto"
        >
          <el-col>
            <el-form-item label="年 龄：">
              <el-input v-model="patient.name" />
            </el-form-item>
            <el-form-item label="性 别：">
              <el-input v-model="patient.sex" />
            </el-form-item>
            <el-form-item label="年 龄：">
              <el-input v-model="patient.age" />
            </el-form-item>
            <el-form-item label="病 人 ID：">
              <el-input v-model="patient.patientId" />
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="科 室：">
              <el-input v-model="patient.subjectRoom" />
            </el-form-item>
            <el-form-item label="医 生：">
              <el-input v-model="patient.doctor" />
            </el-form-item>
            <el-form-item label="来 源：">
              <el-input v-model="patient.form" />
            </el-form-item>
            <el-form-item label="检 查 ID：">
              <el-input v-model="patient.checkId" />
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="设 备：">
              <el-input v-model="patient.equipment" />
            </el-form-item>
            <el-form-item label="门 诊 号：">
              <el-input v-model="patient.clinicId" />
            </el-form-item>
            <el-form-item label="住 院 号：">
              <el-input v-model="patient.roomId" />
            </el-form-item>
            <el-form-item label="床 号：">
              <el-input v-model="patient.bedId" />
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="检 查 部 位：">
              <el-input
                v-model="patient.checkPart"
                style="width: 29vw"
              />
            </el-form-item>
          </el-col>
        </el-form>
      </div>
      <div class="notes">
        <article>诊断：</article>
        <el-input
          type="textarea"
          v-model="patient.judgment"
        ></el-input>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive } from "vue";
var patient = reactive({
  name: "",
  sex: "",
  age: "",
  patientId: "",
  subjectRoom: "",
  doctor: "",
  from: "",
  checkId: "",
  equipment: "",
  clinicId: "",
  roomId: "",
  bedId: "",
  checkPart: "",
  judgment: "",
});
onMounted(() => {});
</script>

<style lang="less" scoped>
.content {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  .form {
    padding: 2%;
    width: 68vw;
    height: 85vh;
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
        font-size: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        .el-input {
          width: auto;
        }
      }
    }
    .notes {
      margin-top: 2vh;
      border-top: 1px solid #000;
      padding-top: 2vh;
      article {
        margin-bottom: 2vh;
        font-size: 18px;
        font-weight: 700;
      }
    }
  }
}
</style>
