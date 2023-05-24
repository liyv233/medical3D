<template>
  <div class="common-layout">
    <el-container class="outer-container">
      <el-header>医疗3D分割</el-header>
      <el-container class="inner-container">
        <el-aside>
          <article>功能列表</article>
          <ul
            class="function"
            style="list-style: none"
          >
            <li class="active">推理任务列表</li>
            <li @click="setReasionDialogVisible(true)">执行推理</li>
            <li @click="setLungDialogVisible(true)">肺结节</li>
          </ul>
        </el-aside>
        <el-main>
          <el-row class="left-container">
            <el-col class="showTable">
              <article>推理任务列表</article>
              <div class="table">
                <el-table :data="SearchData">
                  <el-table-column
                    prop="id"
                    label="任务ID"
                    style="width: 10%"
                  />
                  <el-table-column
                    label="模型"
                    prop="img_url"
                  />
        
                  <el-table-column
                    prop="patient_no"
                    label="患者编号"
                  />
                  <el-table-column
                    prop="description"
                    label="影像诊断结果"
                  />
                  <el-table-column
                    prop="opinion"
                    label="影像诊断结果"
                  />
                  <el-table-column label="操作">
                    <template #default="scope">
                      <el-button type="primary" @click="seeImg(scope.row)"> 查看 </el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </el-col>
          </el-row>
          <el-row class="right-container">
            <div class="top">
              <div class="user">
                <img src="vite.svg" />
                <div
                  class="userInfo"
                  v-show="isAuth"
                >
                  <span>
                    姓名：
                    <p>{{ UserInfo.username }}</p>
                  </span>
                  <span>
                    工号：
                    <p>{{ UserInfo.work_no }}</p>
                  </span>
                </div>
                <div
                  class="userInfo"
                  v-show="!isAuth"
                  style="
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex-direction: column;
                  "
                >
                  <article style="font-size: 19px">您还没有登陆噢</article>
                  <el-button
                    type="primary"
                    style="margin-top: 15%"
                    @click="goToSign"
                  >
                    去登陆 / 注册<el-icon><ArrowRight /></el-icon>
                  </el-button>
                </div>
              </div>
            </div>
            <div class="bottom" v-if="isAuth">
              <div style="font-size: 24px; font-weight: 700">结果查询</div>
              <div class="searchBox">
                <el-input
                  placeholder="通过左侧选择查询方式"
                  v-model="inputInfomation"
                >
                  <template #prepend>
                    <el-select
                      v-model="select"
                      popper-class="dropDown"
                    >
                      <el-option
                        label="医生工号"
                        :value="0"
                      />
                      <el-option
                        label="诊断意见"
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
                </el-input>
              </div>
              <div class="btn">
                <el-button
                  type="success"
                  @click="startSearch"
                >
                  筛选
                </el-button>
              </div>
            </div>
          </el-row>
        </el-main>
      </el-container>
      <reasionUpload />
      <lungUpload />
    </el-container>
  </div>
</template>
<!--  -->
<script setup>
import { ref, onMounted, getCurrentInstance,reactive, computed} from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useUser } from "../store/user";
import { ElMessage } from "element-plus";
import { ArrowRight } from "@element-plus/icons-vue";
import reasionUpload from "./reasionUpload.vue";
import lungUpload from "./lungUpload.vue";
import {useTool} from "../store/Tool";
import Bus from "../utils/eventbus";
const User = useUser();
const { UserInfo, pageNum, isAuth , fileType} = storeToRefs(User);
const { setLungDialogVisible, setReasionDialogVisible,setSee } = User;
const Tool = useTool();
const {setImgName} = Tool;
var request = getCurrentInstance().proxy.$request;

var params = reactive({
  w_no: "",
  p_no: "",
  option: "",
  description: "",
  page: pageNum.value,
  size: 10,
});

const select = ref(0);
const inputInfomation = ref("");
const urls = [
  "/records",
  "/records/option",
  "/records/description",
  "/records/wp",
];

var SearchData = ref([]);
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
  inputInfomation.value = "";

}

const router = useRouter();
const goToSign = () => {
  router.push("/sign");
};

async function seeImg(row) {
  let filePath = "http://10.33.89.159:5000/static/imgs/"+row.img_url;
  setSee(true,filePath);
  setImgName(row.img_url);
  router.push("/preview")
} 

async function init() {
  var res = await request.get("/records", {
    params: {
      w_no: UserInfo.work_no,
      p_no: "",
      option: "",
      suggestion: "",
      page: pageNum.value,
      size: 1000,
    },
  });

  let { _Result__data } = res.data;
   SearchData.value = _Result__data; 
} 

</script>

<style lang="less" scoped>
.outer-container {
  background-color: aliceblue;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  .el-header {
    background-color: #90caf9;
    height: 10vh;
    font-size: 30px;
    font-weight: 800;
    line-height: 10vh;
    color: #fff;
  }
  .inner-container {
    width: 100vw;
    height: 90vh;
    .el-aside {
      background-color: #fff;
      padding: 1%;
      article {
        height: 5vh;
        font-weight: 700;
        font-size: 24px;
        line-height: 5vh;
      }
      ul {
        margin-top: 5%;
        li {
          cursor: pointer;
          height: 6vh;
          margin-top: 5%;
          margin-left: 15%;
          line-height: 6vh;
          text-align: center;
          width: 60%;
          font-size: 20px;
          border-radius: 15px;
          transition: all 0.3s ease-in-out;
        }
        li:hover {
          background-color: rgba(0, 0, 0, 0.205);
          color: rgba(0, 0, 0, 0.507);
        }
      }
    }
    .el-main {
      padding: 0;
      display: flex;
      background-color: #f6f8fa;
      .left-container {
        width: 70vw;
        height: 90vh;
        background-color: #f6f8fa;
        margin-left: 2%;
        article {
          margin-top: 2%;
          margin-bottom: 2%;
          height: 5vh;
          font-weight: 700;
          font-size: 28px;
          line-height: 5vh;
        }
        .table {
          height: 75vh;
          width: 100%;
          overflow-y: scroll;
          .el-table {
            overflow-x: hidden;
            padding: 2% 2% 0 2%;
            height: 100%;
            width: 100%;
            // 底部边框
            :deep(.el-table__inner-wrapper::before) {
              width: 100%;
              height: 0;
            }
            :deep(.el-table__row .cell) {
              color: #000;
            }
            // 头部下边框
            :deep(.el-table__header) {
              font-size: 21px;
              thead tr th {
                color: #000;
                border-bottom: #7e7e7e 1px solid;
              }
            }
            // 每行的下边框
            :deep(.el-table__row) {
              font-size: 18px;
              color: aliceblue;
              td {
                border-bottom: #7e7e7e 1px solid;
              }
            }
            // hover样式 和 上面那个里面的&:hover一起用
            :deep(.el-table__body tr:hover > td) {
              background-color: rgba(255, 255, 255, 0) !important;
            }
          }
        }
      }
      .right-container {
        display: flex;
        flex-direction: column;
        padding-left: 2%;
        width: 30vw;
        height: 90vh;
        .top {
          display: flex;
          justify-content: center;
          padding-right: 20%;
          height: 10vh;
          margin-top: 10vh;
          margin-bottom: 10vh;
          .user {
            width: 7vw;
            height: 7vw;
            img {
              padding-top: 8%;
              width: 100%;
              height: 100%;
              border-radius: 50%;
              overflow: hidden;
            }
            .userInfo {
              padding-top: 20%;
              span {
                display: block;
                padding-bottom: 10%;
                font-weight: 700;
                font-size: 18px;
              }
            }
          }
        }
        .bottom {
          height: 40vh;
          margin-top: 20vh;
          .searchBox {
            padding: 5% 10% 0 5%;
            .el-input {
              width: 100%;
              // 前面插入的选项框
              :deep(.el-input-group__prepend) {
                width: 16%;
              }
            }
          }
          .btn {
            padding: 5% 10% 0 5%;
            display: flex;
            align-items: center;
            flex-direction: row-reverse;
          }
        }
      }
    }
  }
}
</style>
