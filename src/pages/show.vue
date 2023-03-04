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
      <div class="Views">
        <div
          class="leftView"
          alt="鼠标滚轮可以操作"
        >
          <div class="top">
            <canvas id="top"></canvas>
          </div>
          <div class="middle">
            <canvas id="middle"></canvas>
          </div>
          <div class="bottom">
            <canvas id="bottom"></canvas>
          </div>
        </div>
        <div class="rightView">
          <canvas id="right"></canvas>
        </div>
      </div>
      <div class="info"></div>
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
      Views: {
        left: {
          top: null,
          middle: null,
          bottom: null,
        },
        right: null,
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
    init() {
      // 左边三个
      this.Views.left.top = new Niivue().setSliceType(0);
      this.Views.left.middle = new Niivue().setSliceType(1);
      this.Views.left.bottom = new Niivue().setSliceType(2);
      // 右边
      this.Views.right = new Niivue().setSliceType(4);
    },
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
      this.Views.left.top.attachTo("top");
      this.Views.left.middle.attachTo("middle");
      this.Views.left.bottom.attachTo("bottom");
      // 协同
      this.Views.left.top.syncWith(this.Views.left.middle);
      this.Views.left.middle.syncWith(this.Views.left.bottom);

      this.Views.right.attachTo("right");

      this.Views.left.top.loadVolumes(this.volumes);
      this.Views.left.middle.loadVolumes(this.volumes);
      this.Views.left.bottom.loadVolumes(this.volumes);
      this.Views.right.loadVolumes(this.volumes);
    },
  },
  mounted() {
    this.init();
  },
};
</script>

<style>
.all {
  height: 100%;
  width: 100%;
}
.upload {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
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
.content .Views {
  padding-top: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-content: space-around;
  width: 100%;
  height: 100%;
}
.content .Views .leftView {
  width: 38%;
  height: 92%;
}
.content .Views .leftView .top,
.middle,
.bottom {
  width: 100%;
  height: 33%;
}
.content .Views .rightView {
  width: 58%;
  height: 92%;
}
</style>
