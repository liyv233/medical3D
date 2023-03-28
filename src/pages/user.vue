<template>
  <el-row>
    <el-col :span="8">
      <el-card>
        <div class="user">
          <img src="vite.svg" />
          <div class="info">
            <span class="name">Admin</span>
            <span class="role">管理员</span>
          </div>
        </div>
        <div
          class="other"
          style="border-top: 2px solid #aaa; margin-top: 3vh; padding-top: 3vh"
        >
          <span>
            姓名：
            <p>123131</p>
          </span>
          <span>
            工号：
            <p>123123</p>
          </span>
          <span>
            科室：
            <p>123123</p>
          </span>
        </div>
      </el-card>
    </el-col>
    <el-col :span="16">
      <el-table
        stripe
        border
        :data="tableData"
      >
        <el-table-column
          prop="date"
          label="时间"
        />
        <el-table-column
          prop="name"
          label="姓名"
        />
        <el-table-column
          prop="record"
          label="记录"
        />
        <el-table-column label="操作">
          <template #default>
            <el-button
              type="primary"
              size="small"
            >
              查看
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
  </el-row>
</template>

<script setup>
import { onMounted } from "vue";
const tableData = [
  {
    date: "2016-05-03",
    name: "Tom",
    record: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-02",
    name: "Tom",
    record: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-04",
    name: "Tom",
    record: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-01",
    name: "Tom",
    record: "No. 189, Grove St, Los Angeles",
  },
];
onMounted(() => {});
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
          .role {
            margin-top: 1vh;
            color: #aaa;
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
    }
    .el-table {
      margin: 4%;
      width: 92%;
      box-shadow: 1px 1px 1px 1px #aaa;
      :deep(.cell) {
        text-align: center;
      }
    }
  }
}
</style>
