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
      <div class="nav-box">
        <div class="view">
          <span class="view-title">视图</span>

          <div class="plat">
            <span
              @click="navClick"
              id="Axial"
              >Axial</span
            >
            <span
              @click="navClick"
              id="Sagittal"
              >Sagittal</span
            >
            <span
              @click="navClick"
              id="Coronal"
              >Coronal</span
            >
            <span
              @click="navClick"
              id="Render"
              >Render</span
            >
            <span
              @click="navClick"
              id="ACS"
              >ACS</span
            >
            <span
              @click="navClick"
              id="ACSR"
              >ACSR</span
            >
          </div>
        </div>

        <div class="view">
          <span class="view-title">滚轮</span>

          <div class="plat">
            <span
              @click="navClick"
              id="|slicer"
              >切片</span
            >
            <span
              @click="navClick"
              id="|pan"
              >平移/缩放</span
            >
            <span
              @click="navClick"
              id="|measurement"
              >测量</span
            >
            <span
              @click="navClick"
              id="|contrast"
              >色彩对比</span
            >
            <span
              @click="navClick"
              id="|none"
              >none</span
            >
          </div>
        </div>
      </div>
      <div class="Views">
        <canvas id="nv"></canvas>
      </div>
      <div class="port">
        <span>{{ lastPos.vox }}</span>
        <span>{{ lastPos.string }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { Niivue } from "@niivue/niivue";
import { Message } from "element-ui";
export default {
  data() {
    return {
      file: null,
      Views: null,
      volumes: [
        {
          url: "/0f593c1e-4bb8-470f-a87b-fee3dbd3b3ed.nii.gz",
        },
      ],
      IsShow: false,
      select: true,
      lastPos: {
        vox: "",
        string: "",
      },
    };
  },
  methods: {
    init() {
      this.Views = new Niivue({
        logging: "true",
        dragAndDropEnabled: false,
        backColor: [0, 0, 0, 1],
        show3Dcrosshair: true,
        onLocationChange: this.handleIntensityChange,
      });

      this.Views.attachTo("nv");
      this.Views.setPenValue(1, true);
      this.Views.opts.multiplanarForceRender = true;
      this.Views.loadVolumes(this.volumes);
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
    handleIntensityChange(data) {
      this.lastPos.vox =
        data.vox[0] + " , " + data.vox[1] + " , " + data.vox[2];
      this.lastPos.string = data.string;
    },
    navClick(event) {
      // view
      if (event.target.id === "Axial") {
        this.Views.setSliceType(this.Views.sliceTypeAxial);
      }
      if (event.target.id === "Coronal") {
        this.Views.setSliceType(this.Views.sliceTypeCoronal);
      }
      if (event.target.id === "Sagittal") {
        this.Views.setSliceType(this.Views.sliceTypeSagittal);
      }
      if (event.target.id === "Render") {
        this.Views.setSliceType(this.Views.sliceTypeRender);
      }
      if (event.target.id === "ACS") {
        this.Views.opts.multiplanarForceRender = false;
        this.Views.setSliceType(this.Views.sliceTypeMultiplanar);
      }
      if (event.target.id === "ACSR") {
        this.Views.opts.multiplanarForceRender = true;
        this.Views.setSliceType(this.Views.sliceTypeMultiplanar);
      }

      // roller
      if (event.target.id.charAt(0) === "|") {
        let str = event.target.id.substr(1);
        switch (str) {
          case "none":
            this.Views.opts.dragMode = this.Views.dragModes.none;
            break;
          case "contrast":
            this.Views.opts.dragMode = this.Views.dragModes.contrast;
            break;
          case "measurement":
            this.Views.opts.dragMode = this.Views.dragModes.measurement;
            break;
          case "pan":
            this.Views.opts.dragMode = this.Views.dragModes.pan;
            break;
          case "slicer":
            this.Views.opts.dragMode = this.Views.dragModes.slicer3D;
            break;
        }
      }
    },
  },
  mounted() {
    this.init();
  },
};
</script>

<style lang="less" scoped>
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
  transform: translate(-1vw, -1.8vh);
  height: 100%;
  width: 102%;
  background-color: aqua;

  .nav-box {
    width: 100%;
    height: 4%;
    display: flex;

    background-color: #000000;

    .view {
      margin-left: 3vw;

      height: 100%;
      text-align: center;
      line-height: 3.8vh;

      .view-title {
        cursor: pointer;
        color: rgb(4, 146, 136);
        font-weight: 700;
        font-size: 1.3em;
      }

      .plat {
        position: absolute;
        transform: translate(-1vw, -0.4vh);
        z-index: 99 !important;
        display: none;

        background-color: #045656;

        color: white;

        span {
          display: block;
          padding: 0 0.5vw;
          text-align: center;
          cursor: pointer;
        }
        span:hover {
          background-color: rgb(15, 114, 81);
        }
      }
    }
    .view:hover .plat {
      display: block;
      clear: both;
    }
  }

  .Views {
    width: 100%;
    height: 90%;

    #nv {
      width: 100%;
      height: 100%;
      background-color: rgb(255, 230, 0);
    }
  }
  .port {
    float: left;
    transform: translate(2vw, -3vh);
    width: 25vw;
    height: 2vh;

    span {
      font-size: 1em;
      font-weight: 700;
      color: white;
      margin-left: 1vw;
    }
  }
}
</style>
