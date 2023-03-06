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
      <!-- 导航 -->
      <Nav></Nav>
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
import Nav from "../components/header.vue";
import { Niivue } from "@niivue/niivue";
import { Message } from "element-ui";
export default {
  data() {
    return {
      file: null,
      Views: null,
      volumes: {
        url: "/test.nvd",
      },
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
      let index = this.volumes.url.indexOf(".");
      let str = this.volumes.url.slice(index);
      if (str === ".nvd") {
        this.Views.loadDocumentFromUrl([this.volumes.url]);
      } else {
        this.Views.loadVolumes([this.volumes]);
      }
    },
  },
  components: { Nav },
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
