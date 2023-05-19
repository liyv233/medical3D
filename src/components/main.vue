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
            <li>执行推理</li>
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
                  <el-table-column label="模型基本信息">
                    <ul>
                      <li>{{ img_url }}</li>
                      <li>{{}}</li>
                    </ul>
                  </el-table-column>
                  <el-table-column
                    prop="patient_no"
                    label="患者编号"
                  />
                  <el-table-column
                    prop="opinion"
                    label="诊断部位"
                  />
                  <el-table-column
                    prop="description"
                    label="影像诊断结果"
                  />
                  <el-table-column label="操作">
                    <template #default>
                      <el-button type="primary"> 查看 </el-button>
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
                <div class="userInfo">
                  <span>
                    姓名：
                    <p>{{ UserInfo.work_no }}</p>
                  </span>
                  <span>
                    工号：
                    <p>{{ UserInfo.d_name }}</p>
                  </span>
                </div>
              </div>
            </div>
            <div class="bottom">
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
    </el-container>
  </div>
</template>
<!--  -->
<script setup>
//
import { ref, reactive, onMounted, getCurrentInstance } from "vue";
import { storeToRefs } from "pinia";
import { ElMessage } from "element-plus";
import { useUser } from "../store/user";

const User = useUser();
const { UserInfo, pageNum } = storeToRefs(User);

var request = getCurrentInstance().proxy.$request;
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

onMounted(async () => {
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
  SearchData.value = res.data._Result__data;
});
</script>

<style lang="less" scoped>
.outer-container {
  color: #ffffff;
  background-color: #121212;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  .el-header {
    background-color: #212121;
    height: 10vh;
    font-size: 30px;
    font-weight: 800;
    line-height: 10vh;
    color: #58ad5b;
  }
  .inner-container {
    width: 100vw;
    height: 90vh;
    .el-aside {
      color: #ffffff;
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
          transition: background-color 0.3s ease-in-out, border 0.3s ease-in-out;
        }
        li:hover {
          background-color: rgba(255, 255, 255, 0.205);
          color: #58ad5b;
        }
      }
    }
    .el-main {
      padding: 0;
      display: flex;
      .left-container {
        width: 70vw;
        height: 90vh;
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
            background-color: #1e1e1e;
            overflow-x: hidden;
            padding: 2% 2% 0 2%;
            height: 100%;
            width: 100%;
            ul {
              padding-left: 1%;
            }
            // 底部边框
            :deep(.el-table__inner-wrapper::before) {
              width: 100%;
              height: 0;
            }
            // 头部下边框
            :deep(.el-table__header) {
              font-size: 21px;
              thead tr th {
                background-color: #1e1e1e;
                color: aliceblue;
                border-bottom: #7e7e7e 1px solid;
              }
            }
            // 每行的下边框
            :deep(.el-table__row) {
              font-size: 18px;
              background-color: #1e1e1e;
              color: aliceblue;
              td {
                border-bottom: #7e7e7e 1px solid;
              }
              &:hover {
                background: #616161 !important;
              }
            }
            // hover样式 和 上面那个里面的&:hover一起用
            :deep(.el-table__body tr:hover > td) {
              background-color: rgba(0, 0, 0, 0) !important;
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
          color: aliceblue;
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
              // 前面插入的选项框咯
              :deep(.el-input-group__prepend) {
                width: 16%;
              }
              // 背景咯
              :deep(.el-input__wrapper) {
                background-color: #1e1e1e;
              }
              // 下选框颜色咯
              :deep(.el-input__inner) {
                color: aliceblue;
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

<!-- 用来解决element的一些不能修改的样式(在scoped中)需要单独写 -->
<style lang="less">
// 要修改一些东西需要单独开个style标签 el-select下拉框 el-label
//下拉框背景色
.el-popper.is-light.dropDown {
  background-color: #1e1e1e !important;
  border: none;
}
//下拉框的链接小方块
.dropDown.el-popper[data-popper-placement^="bottom"] .el-popper__arrow::before {
  background: #1e1e1e !important;
  border-color: #4b4b4b;
}
//鼠标移动上去的选中色
.dropDown {
  .el-select-dropdown__item.hover,
  .el-select-dropdown__item:hover {
    background: #cee4fa4f !important;
  }
  //下拉框的文本颜色
  .el-select-dropdown__item {
    color: aliceblue !important;
  }
  //选中之后的颜色
  .el-select-dropdown__item.selected {
    background: #51a8ff !important;
    color: white;
  }
}
.active {
  background-color: rgba(255, 255, 255, 0.205);
  color: #58ad5b;
}
</style>
