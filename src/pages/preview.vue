<template>
  <div class="content">
    <!-- 导航 -->
    <MedHeader @navChange="navChange"></MedHeader>
    <!-- 画布 -->
    <div class="Canv">
      <canvas id="nv"></canvas>
    </div>
    <!-- 底部坐标 -->
    <div class="port">
      <span>坐标:[{{ lastPos.vox || "x ,y ,z" }}]</span>
      <span>像素值:{{ lastPos.str || "?" }}</span>
    </div>
  </div>
</template>
<script setup>
import { Niivue } from "@niivue/niivue";
import MedHeader from "../components/MedHeader.vue";
import { reactive, onMounted } from "vue";
const volumes = reactive({ url: "/test.nvd" });
var Views = reactive(null);
var lastPos = reactive({
  vox: "",
  str: "",
});
// canvas pos
function handleIntensityChange(data) {
  lastPos.vox = data.vox[0] + " , " + data.vox[1] + " , " + data.vox[2];
  let OriStr = data.string;
  let index = OriStr.indexOf("=");
  let str = OriStr.slice(index);
  lastPos.str = str;
}
function Canvasinit() {
  Views = new Niivue({
    logging: "true",
    dragAndDropEnabled: false,
    backColor: [0, 0, 0, 1],
    show3Dcrosshair: true,
    onLocationChange: handleIntensityChange,
  });
  Views.opts.multiplanarForceRender = true;
  Views.setRadiologicalConvention(false);
  Views.setClipPlane([0.3, 270, 0]);
  Views.drawOpacity = 0.4;
  Views.setSliceMM(true);
  Views.attachTo("nv");
  let index = volumes.url.indexOf(".");
  let str = volumes.url.slice(index);
  if (str === ".nvd") {
    Views.loadDocumentFromUrl([volumes.url]);
  } else {
    Views.loadVolumes([volumes]);
  }
}
// nav
function navClick(event) {
  console.log(Views);
  // sliceType
  if (event.target.id === "Axial") {
    Views.setSliceType(Views.sliceTypeAxial);
  }
  if (event.target.id === "Coronal") {
    Views.setSliceType(Views.sliceTypeCoronal);
  }
  if (event.target.id === "Sagittal") {
    Views.setSliceType(Views.sliceTypeSagittal);
  }
  if (event.target.id === "Render") {
    Views.setSliceType(Views.sliceTypeRender);
  }
  if (event.target.id === "ACS") {
    Views.opts.multiplanarForceRender = false;
    Views.setSliceType(Views.sliceTypeMultiplanar);
  }
  if (event.target.id === "ACSR") {
    Views.opts.multiplanarForceRender = true;
    Views.setSliceType(Views.sliceTypeMultiplanar);
  }
  // roller
  if (event.target.id.charAt(0) === "|") {
    let str = event.target.id.substr(1);
    switch (str) {
      case "none":
        Views.opts.dragMode = Views.dragModes.none;
        break;
      case "contrast":
        Views.opts.dragMode = Views.dragModes.contrast;
        break;
      case "measurement":
        Views.opts.dragMode = Views.dragModes.measurement;
        break;
      case "pan":
        Views.opts.dragMode = Views.dragModes.pan;
        break;
      case "slicer":
        Views.opts.dragMode = Views.dragModes.slicer3D;
        break;
    }
  }
  //draw
  if (event.target.id.charAt(0) === "@") {
    if (event.target.id == "@Off") Views.setDrawingEnabled(false);
    else Views.setDrawingEnabled(true);
    if (event.target.id === "@Erase") Views.setPenValue(0, true);
    if (event.target.id === "@Red") Views.setPenValue(1, true);
    if (event.target.id === "@Green") Views.setPenValue(2, true);
    if (event.target.id === "@Blue") Views.setPenValue(3, true);
    if (event.target.id === "@Yellow") Views.setPenValue(4, true);
    if (event.target.id === "@Cyan") Views.setPenValue(5, true);
    if (event.target.id === "@Purple") Views.setPenValue(6, true);
  }
  // file
  if (event.target.id === "SaveDocument") {
    Views.saveDocument("test.nvd");
    return;
  }
  if (event.target.id === "SaveImage") {
    Views.saveImage("test.nii", false);
    return;
  }
  if (event.target.id === "SaveBitmap") {
    Views.saveScene("ScreenShot.png");
    return;
  }
}
function navChange(e) {
  navClick(e);
}
onMounted(() => {
  Canvasinit();
});
</script>

<style lang="less" scoped>
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
</style>
