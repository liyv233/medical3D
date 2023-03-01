<template>
  <div class="all">
    <div
      class="upload"
      v-show="IsShow"
    >
      <div class="uploadbox">
        <el-upload
          ref="upload"
          class="upload-demo"
          drag
          :multiple="false"
          :limit="1"
          :auto-upload="false"
          :on-change="HandleChange"
          action="none"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div
            class="el-upload__tip"
            slot="tip"
          ></div>
        </el-upload>
        <div
          class="btn"
          @click="HandleSubmit"
        >
          <div class="text">提交</div>
        </div>
      </div>
    </div>
    <div
      class="content"
      v-show="!IsShow"
    >
      <div class="Before">
        <div class="topLeft">
          <canvas id="topLeft"></canvas>
        </div>
        <div class="topRight">
          <canvas id="topRight"></canvas>
        </div>
        <div class="bottomLeft">
          <canvas id="bottomLeft"></canvas>
        </div>
        <div class="bottomRight">
          <canvas id="bottomRight"></canvas>
        </div>
      </div>
      <div class="info">
        <el-table> </el-table>
      </div>
    </div>
  </div>
</template>
<script>
import { Niivue } from "@niivue/niivue";
import { Message } from "element-ui";
export default {
  name: "show",
  data() {
    return {
      file: null,
      nv: {
        before: {
          topLeft: new Niivue(),
          topRight: new Niivue(),
          bottomLeft: new Niivue(),
          bottomRight: new Niivue(),
        },
        after: {
          topLeft: new Niivue(),
          topRight: new Niivue(),
          bottomLeft: new Niivue(),
          bottomRight: new Niivue(),
        },
      },
      volumes: [
        {
          url: "/7.nii.gz",
        },
      ],
      IsShow: true,
      select: true,
    };
  },
  methods: {
    HandleChange(file) {
      this.file = file;
      console.log(this.file);
    },
    HandleSubmit() {
      if (this.file) {
        this.IsShow = false;
        this.handleShow();
      } else {
        Message({
          type: "warning",
          message: "请先传入文件",
        });
      }
    },
    handleShow() {
      // 左上
      this.nv.before.topLeft.attachTo("topLeft");
      this.nv.before.topLeft.setSliceType(0);
      this.nv.before.topLeft.loadVolumes(this.volumes);
      // 右上
      this.nv.before.topRight.attachTo("topRight");
      this.nv.before.topRight.setSliceType(1);
      this.nv.before.topRight.loadVolumes(this.volumes);
      // 左下
      this.nv.before.bottomLeft.attachTo("bottomLeft");
      this.nv.before.bottomLeft.setSliceType(2);
      this.nv.before.bottomLeft.loadVolumes(this.volumes);
      // 右下
      this.nv.before.bottomRight.attachTo("bottomRight");
      this.nv.before.bottomRight.setSliceType(4);
      this.nv.before.bottomRight.loadVolumes(this.volumes);
    },
  },
  mounted() {
    console.log(new Niivue().sliceTypeRender);
  },
};
</script>

<style>
.all {
  height: 100%;
}
.upload {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.upload .uploadbox {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 50%;
  height: 60%;
  background-color: #666;
  border-radius: 18px;
}
.upload .uploadbox .el-upload-dragger {
  border: none;
  background-color: #666;
}
.upload .uploadbox .el-upload-dragger .el-upload__text {
  color: aliceblue;
}
.el-upload-list__item-name {
  color: aliceblue;
}
.upload .uploadbox .btn {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 25px;
  height: 8%;
  width: 12%;
  background-color: #fff;
  cursor: pointer;
  font-size: 22px;
  font-weight: 600;
  color: rgb(125, 148, 224);
  border-radius: 10px;
}
.content {
  height: 100%;
  width: 100%;
}
.content .Before {
  display: flex;
  justify-content: space-around;
  align-content: space-around;
  flex-wrap: wrap;
  overflow: hidden;
  width: 100%;
  height: 100%;
}
.content .Before .topLeft,
.topRight,
.bottomLeft,
.bottomRight {
  width: 40%;
  height: 44%;
}
</style>
