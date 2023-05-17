<template>
  <el-row>
    <el-col :span="8">
      <el-card>
        <div class="user">
          <img src="vite.svg" />
          <div class="info">
            <span class="name">{{ UserInfo.username }}</span>
          </div>
        </div>
        <div
          class="other"
          style="border-top: 2px solid #aaa; margin-top: 3vh; padding-top: 3vh"
        >
          <span>
            工号：
            <p>{{ UserInfo.work_no }}</p>
          </span>
          <span>
            科室：
            <p>{{ UserInfo.d_name }}</p>
          </span>
        </div>
      </el-card>
      <el-card>
        <el-input
          placeholder="请输入关键字..."
          v-model="inputInfomation"
        >
          <template #prepend>
            <el-select v-model="select">
              <el-option
                label="医生工号"
                :value="0"
              />
              <el-option
                label="诊断部位"
                :value="1"
              />
              <el-option
                label="影像结果"
                :value="2"
              />
              <el-option
                label="医患id"
                :value="3"
              />
            </el-select>
          </template>
          <template #append>
            <div @click="startSearch">
              <el-icon><SearchIcon /></el-icon>
            </div>
          </template>
        </el-input>
      </el-card>
    </el-col>
    <el-col :span="16">
      <el-card>
        <el-table
          stripe
          border
          :data="SearchData"
          style="width: 100%"
        >
          <el-table-column
            prop="work_no"
            label="医生工号"
          />
          <el-table-column
            prop="username"
            label="医生姓名"
          />
          <el-table-column
            prop="patient_no"
            label="患者编号"
          />
          <el-table-column
            prop="patient_name"
            label="患者姓名"
          />
          <el-table-column
            prop="opinion"
            label="诊断部位"
          />
          <el-table-column
            prop="description"
            label="影像诊断结果"
          />
        </el-table>
        <el-pagination
          layout="prev, pager, next"
          :current-page="CurrentPage"
          @current-change="handlehCurrentChange"
          :total="100"
        >
        </el-pagination>
      </el-card>
    </el-col>
  </el-row>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance, reactive } from "vue";
import { storeToRefs } from "pinia";
import { useUser } from "../store/user";
import { Search as SearchIcon } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
const User = useUser();
const { UserInfo, pageNum } = storeToRefs(User);
var select = ref(0);
const SearchData = ref([]);
var request = getCurrentInstance().proxy.$request;
const urls = [
  "/records",
  "/records/option",
  "/records/description",
  "/records/wp",
];
var inputInfomation = ref("");
var params = reactive({
  w_no: "",
  p_no: "",
  option: "",
  description: "",
  page: pageNum.value,
  size: 5,
});
async function startSearch() {
  SearchData.value = [];
  let str = inputInfomation.value;
  if (select.value == 0) {
    params.w_no = str;
  } else if (select.value == 1) {
    params.option = str;
  } else if (select.value == 2) {
    params.description = str;
  } else if (select.value == 3) {
    let key = str.split(" ");
    params.w_no = key[0];
    params.p_no = key[1];
  }
  const res = await request.get(urls[select.value], { params });
  var { _Result__data } = res.data;
  if (_Result__data.length == 0) {
    ElMessage.error("没有查到相关记录");
  }
  for (let i = 0; i < _Result__data.length; i++)
    SearchData.value.push(_Result__data[i]);
}
const CurrentPage = ref(1);
async function handlehCurrentChange(value) {
  pageNum.value = value;
  await startSearch();
}
onMounted(() => {
  request.get("/records", {
    params: {
      w_no: UserInfo.work_no,
      p_no: "",
      option: "",
      suggestion: "",
      page: pageNum.value,
      size: 5,
    },
  });
});
</script>

<style lang="less" scoped>
.el-row {
  .el-col {
    height: 100vh;
    .el-card {
      margin: 4%;
      .user {
        display: flex;
        align-items: center;
        img {
          width: 5vw;
          border-radius: 50%;
        }
        .info {
          display: flex;
          flex-direction: column;
          margin-left: 4vw;
          .name {
            font-size: 32px;
          }
        }
      }
      .other {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: start;
        span {
          display: flex;
          font-size: 18px;
          font-weight: 700;
          margin-left: 1vw;
          margin-bottom: 2vh;
          p {
            margin-left: 2vw;
          }
        }
      }
      .el-input {
        :deep(.el-input-group__prepend) {
          padding: 0;
        }
        :deep(.el-input__wrapper) {
          width: 8vw;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .el-select {
          width: 100%;
        }
        .el-icon {
          cursor: pointer;
        }
      }
      .el-table {
        :deep(.cell) {
          text-align: center;
        }
      }
      .el-pagination {
        margin-top: 3vh;
        display: flex;
        justify-content: center;
      }
    }
  }
}
</style>
