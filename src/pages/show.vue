<template>
  <div class="all">
    <!-- 选择文件 -->
    <div
      class="upload"
      v-show="!OpenCanvas"
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
    <!-- content -->
    <div
      class="content"
      v-show="OpenCanvas"
    >
      <!-- 控制面板 -->
      <div class="nav-box">
        <div class="view">
          <span class="view-title">视图</span>
          <div class="screen-plat">
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
          <div class="scroll-plat">
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
        <div class="view">
          <span class="view-title"> 绘画 </span>
          <div class="draw-plat">
            <span
              id="@Off"
              @click="navClick"
              >Off/On</span
            >
            <span
              id="@Red"
              @click="navClick"
              >红</span
            >
            <span
              id="@Green"
              @click="navClick"
              >绿</span
            >
            <span
              id="@Blue"
              @click="navClick"
              >蓝</span
            >
            <span
              id="@Yellow"
              @click="navClick"
              >黄</span
            >
            <span
              id="@Cyan"
              @click="navClick"
              >青</span
            >
            <span
              id="@Purple"
              @click="navClick"
              >紫</span
            >
            <span
              id="@Erase"
              @click="navClick"
              >橡皮</span
            >
          </div>
        </div>
        <div class="view">
          <span class="view-title">文件</span>
          <div class="file-plat"></div>
        </div>
      </div>
      <!-- 画布 -->
      <div class="Canv">
        <canvas id="nv"></canvas>
      </div>
      <!-- 底部坐标 -->
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
          url: "/1.nii",
        },
      ],
      OpenCanvas: true,
      select: false,
      lastPos: {
        vox: "",
        string: "",
      },
    };
  },
  methods: {
    handleIntensityChange(data) {
      this.lastPos.vox =
        data.vox[0] + " , " + data.vox[1] + " , " + data.vox[2];
      this.lastPos.string = data.string;
    },
    HandleChange(file) {
      this.file = file;
      console.log(this.file);
    },
    HandleSubmit() {
      if (this.file) {
        this.OpenCanvas = true;
        this.handleShow();
      } else {
        Message({
          type: "warning",
          message: "请先传入文件",
        });
      }
    },
    navClick(event) {
      // sliceType
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
      //draw
      if (event.target.id.charAt(0) === "@") {
        if (event.target.id == "@Off") this.Views.setDrawingEnabled(false);
        else this.Views.setDrawingEnabled(true);
        if (event.target.id === "@Erase") this.Views.setPenValue(0, true);
        if (event.target.id === "@Red") this.Views.setPenValue(1, true);
        if (event.target.id === "@Green") this.Views.setPenValue(2, true);
        if (event.target.id === "@Blue") this.Views.setPenValue(3, true);
        if (event.target.id === "@Yellow") this.Views.setPenValue(4, true);
        if (event.target.id === "@Cyan") this.Views.setPenValue(5, true);
        if (event.target.id === "@Purple") this.Views.setPenValue(6, true);
      }
    },
    init() {
      this.Views = new Niivue({
        logging: "true",
        dragAndDropEnabled: false,
        backColor: [0, 0, 0, 1],
        show3Dcrosshair: true,
        onLocationChange: this.handleIntensityChange,
      });
      this.Views.attachTo("nv");
      this.Views.opts.multiplanarForceRender = true;
      this.Views.setRadiologicalConvention(false);
      this.Views.setClipPlane([0.3, 270, 0]);
      this.Views.drawOpacity = 0.4;
      this.Views.setSliceMM(true);
      this.Views.loadVolumes(this.volumes);
    },
  },
  mounted() {
    this.init();
  },
};
</script>

<style lang="less" scoped>
.all {
  .upload {
    .uploadbox {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      min-width: 100vw;
      .upload-demo {
        cursor: pointer;
        width: 30vw;
        height: 40vh;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        border-radius: 6px;
        border: 1px dashed #d9d9d9;
        /deep/.el-upload-dragger {
          border: none;
        }
      }
      .upload-demo:hover {
        border-color: #409eff;
      }
      .btn {
        margin-top: 5vh;
        cursor: pointer;
        width: 8vh;
        height: 4vh;
        line-height: 4vh;
        border-radius: 2vh;
        background-color: rgb(178, 225, 243);
        text-align: center;
      }
      .btn:active {
        background-color: rgb(76, 125, 231);
      }
    }
  }
  .content {
    height: 100vh;
    width: 100vw;
    .nav-box {
      display: flex;
      flex-direction: row;
      width: 100vw;
      height: 7vh;
      background-color: rgb(0, 0, 0);
      .view {
        width: 8%;
        min-height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        .view-title {
          color: aliceblue;
          cursor: pointer;
          font-weight: 700;
          font-size: 1.5em;
        }
        .draw-plat {
          display: none;
          position: absolute;
          background-color: rgb(85, 85, 85);
          transform: translate(0, 27.4vh);
        }
        .screen-plat {
          display: none;
          position: absolute;
          background-color: rgb(85, 85, 85);
          transform: translate(0, 21.4vh);
        }
        .scroll-plat {
          display: none;
          position: absolute;
          background-color: rgb(85, 85, 85);
          transform: translate(0, 18.4vh);
        }
      }
      .screen-plat,
      .scroll-plat,
      .draw-plat {
        span {
          width: 5vw;
          height: 6vh;
          color: white;
          display: block;
          line-height: 6vh;
          padding: 0 0.8vw;
          cursor: pointer;
        }
        span:hover {
          background-color: rgb(167, 162, 162);
        }
      }
      .view:hover .scroll-plat {
        display: block;
        clear: both;
      }
      .view:hover .screen-plat {
        display: block;
        clear: both;
      }
      .view:hover .draw-plat {
        display: block;
        clear: both;
      }
    }
    .Canv {
      width: 100vw;
      height: 88vh;
    }
    .port {
      width: 100vw;
      height: 5vh;
      background-color: rgb(0, 0, 0);
      span {
        margin-left: 2vw;
        margin-top: 1vh;
        font-size: 1.3em;
        font-weight: 700;
        color: white;
      }
    }
  }
}
</style>
