<template>
  <div class="common-layout">
    <el-container class="outer-container">
      <el-header>医疗3D分割</el-header>
      <el-container class="inner-container">
        <el-aside>
          <article>功能列表</article>
          <ul class="function">
            <li>推理任务列表</li>
            <li>执行推理</li>
          </ul>
        </el-aside>
        <el-main>
          <el-row class="left-container">
            <el-col>
              <article>推理任务列表</article>
              <div class="search"></div>
              <div class="table">
                <el-table
                  :data="tableData"
                  height="600"
                >
                  <el-table-column
                    fixed
                    prop="date"
                    label="任务ID"
                  />
                  <el-table-column
                    prop="name"
                    label="模型基本信息"
                  />
                  <el-table-column
                    prop="state"
                    label="状态"
                  />
                  <el-table-column
                    fixed="right"
                    label="Operations"
                  >
                    <template #default>
                      <el-button
                        link
                        type="primary"
                        size="small"
                        @click="handleClick"
                        >Detail</el-button
                      >
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </el-col>
          </el-row>
          <el-row class="right-container">
            <div class="search">
              <article>结果查询</article>
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
const tableData = [
  {
    date: "2016-05-03",
    name: "Tom",
    state: "California",
    city: "Los Angeles",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036",
    tag: "Home",
  },
  {
    date: "2016-05-02",
    name: "Tom",
    state: "California",
    city: "Los Angeles",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036",
    tag: "Office",
  },
  {
    date: "2016-05-04",
    name: "Tom",
    state: "California",
    city: "Los Angeles",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036",
    tag: "Home",
  },
  {
    date: "2016-05-01",
    name: "Tom",
    state: "California",
    city: "Los Angeles",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036",
    tag: "Office",
  },
  {
    date: "2016-05-03",
    name: "Tom",
    state: "California",
    city: "Los Angeles",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036",
    tag: "Home",
  },
  {
    date: "2016-05-02",
    name: "Tom",
    state: "California",
    city: "Los Angeles",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036",
    tag: "Office",
  },
  {
    date: "2016-05-04",
    name: "Tom",
    state: "California",
    city: "Los Angeles",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036",
    tag: "Home",
  },
  {
    date: "2016-05-01",
    name: "Tom",
    state: "California",
    city: "Los Angeles",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036",
    tag: "Office",
  },
  {
    date: "2016-05-03",
    name: "Tom",
    state: "California",
    city: "Los Angeles",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036",
    tag: "Home",
  },
  {
    date: "2016-05-02",
    name: "Tom",
    state: "California",
    city: "Los Angeles",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036",
    tag: "Office",
  },
  {
    date: "2016-05-04",
    name: "Tom",
    state: "California",
    city: "Los Angeles",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036",
    tag: "Home",
  },
  {
    date: "2016-05-01",
    name: "Tom",
    state: "California",
    city: "Los Angeles",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036",
    tag: "Office",
  },
  {
    date: "2016-05-03",
    name: "Tom",
    state: "California",
    city: "Los Angeles",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036",
    tag: "Home",
  },
  {
    date: "2016-05-02",
    name: "Tom",
    state: "California",
    city: "Los Angeles",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036",
    tag: "Office",
  },
  {
    date: "2016-05-04",
    name: "Tom",
    state: "California",
    city: "Los Angeles",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036",
    tag: "Home",
  },
  {
    date: "2016-05-01",
    name: "Tom",
    state: "California",
    city: "Los Angeles",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036",
    tag: "Office",
  },
];
</script>
<!--  -->
<style lang="less" scoped>
.outer-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  .el-header {
    height: 10vh;
    font-size: 30px;
    font-weight: 800;
    line-height: 10vh;
  }
  .inner-container {
    width: 100vw;
    height: 90vh;
    .el-aside {
      padding: 1%;
      article {
        height: 5vh;
        font-weight: 700;
        font-size: 24px;
        line-height: 5vh;
      }
      ul li {
        cursor: pointer;
        height: 6vh;
        line-height: 6vh;
        text-align: center;
        width: 80%;
        font-size: 18px;
      }
    }
    .el-main {
      padding: 0;
      display: flex;

      .left-container {
        width: 60vw;
        height: 90vh;
        article {
          height: 5vh;
          font-weight: 700;
          font-size: 28px;
          line-height: 5vh;
        }
        .table {
          padding-top: 4%;
          padding-left: 4%;
          padding-right: 4%;
        }
      }
    }
  }
}
</style>
