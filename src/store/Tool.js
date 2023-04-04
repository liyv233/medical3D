import { defineStore } from "pinia";
import { ref, reactive } from "vue";
import { Niivue } from "@niivue/niivue";
import { ElMessage } from "element-plus";

export const useTool = defineStore("tool", () => {
  // 初始化渲染器
  var Views = ref(null);
  function CanvasInit() {
    Views = new Niivue({
      logging: "true",
      dragAndDropEnabled: false,
      backColor: [0, 0, 0, 1],
      onLocationChange: handleIntensityChange,
    });
    Views.opts.multiplanarForceRender = true;
    Views.setRadiologicalConvention(false);
    Views.drawOpacity = 0.4;
    Views.setSliceMM(true);

    return Views;
  }

  // 相关配置
  var lastPos = reactive({ vox: "", str: "" });
  function handleIntensityChange(data) {
    lastPos.vox = data.vox[0] + " , " + data.vox[1] + " , " + data.vox[2];
    let OriStr = data.string;
    let index = OriStr.indexOf("=");
    let str = OriStr.slice(index + 1);
    lastPos.str = str;
  }

  // 工具栏开关
  var pen = ref(false);
  var fill = ref(false);
  var toolSwitch = ref(false);
  function handleTool(id, Pen, isFill) {
    toolSwitch.value = !toolSwitch.value;
    if (id) {
      choose.value = id;
    }
    if (Pen) {
      pen.value = Pen;
    }
    if (isFill) {
      fill.value = isFill;
    }
    handleColor();
  }

  // 鼠标右键工具
  function handleMouse(id) {
    switch (id) {
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

  // 视图工具
  function handleScreen(id) {
    switch (id) {
      case "Axial":
        Views.setSliceType(Views.sliceTypeAxial);
        break;
      case "Sagittal":
        Views.setSliceType(Views.sliceTypeSagittal);
        break;
      case "Coronal":
        Views.setSliceType(Views.sliceTypeCoronal);
        break;
      case "Render":
        Views.setSliceType(Views.sliceTypeRender);
        break;
      case "ACS":
        Views.opts.multiplanarForceRender = false;
        Views.setSliceType(Views.sliceTypeMultiplanar);
        break;
      case "ACSR":
        Views.opts.multiplanarForceRender = true;
        Views.setSliceType(Views.sliceTypeMultiplanar);
        break;
    }
  }

  // 画笔颜色工具
  var choose = ref("Red");
  function handleColor() {
    Views.setDrawingEnabled(pen.value);
    switch (choose.value) {
      case "Red":
        Views.setPenValue(1, fill.value);
        break;
      case "Green":
        Views.setPenValue(2, fill.value);
        break;
      case "Blue":
        Views.setPenValue(3, fill).value;
        break;
      case "Yellow":
        Views.setPenValue(4, fill.value);
        break;
      case "Cyan":
        Views.setPenValue(5, fill);
        break;
      case "Purple":
        Views.setPenValue(6, fill);
        break;
      case "Erase":
        Views.setPenValue(0, fill);
        break;
    }
  }

  // 保存相关工具
  async function handleSave(id) {
    switch (id) {
      case "Image":
        await Views.saveImage("test.nii", true);
        return;
      case "Bitmap":
        await Views.saveScene("ScreenShot.png");
        return;
    }
  }

  // 更改材质
  function handleMaterial(index, id) {
    Views.volumes[index].colorMap = id;
    Views.updateGLVolume();
    return;
  }

  // 添加文件时的相关操作
  var volumes = ref([]);
  function AddVolumesFile(file) {
    if (volumes.value.length == 0) {
      volumes.value.push(file);
    } else {
      RemoveVolumesFile();
      volumes.value.push(file);
    }
    ElMessage({
      type: "warning",
      message: "仅支持单文件上传",
      showClose: true,
    });
  }
  function RemoveVolumesFile() {
    volumes.value.pop();
  }
  function getVolumesFile() {
    return volumes;
  }
  // 拿到渲染器
  function getViews() {
    return Views;
  }
  // 生成报告
  const dialogVisible = ref(false);
  return {
    CanvasInit,
    handleIntensityChange,
    handleColor,
    handleScreen,
    handleMouse,
    handleTool,
    handleSave,
    handleMaterial,
    getVolumesFile,
    getViews,
    AddVolumesFile,
    RemoveVolumesFile,
    toolSwitch,
    lastPos,
    volumes,
    dialogVisible,
  };
});
