import { defineStore } from "pinia";
import { ref, reactive } from "vue";
import { Niivue } from "@niivue/niivue";
export const useTool = defineStore("tool", () => {
  // var
  let v = new Niivue({
    logging: "true",
    dragAndDropEnabled: false,
    backColor: [0, 0, 0, 1],
    show3Dcrosshair: true,
    onLocationChange: handleIntensityChange,
  });
  const toolSwitch = ref(false);
  const lastPos = reactive({ vox: "", str: "" });
  const Views = reactive(v);
  const choose = ref("Red");
  const pen = ref(false);
  const fill = ref(false);
  // controler
  function CanvasInit() {
    Views.opts.multiplanarForceRender = true;
    Views.setRadiologicalConvention(false);
    Views.drawOpacity = 0.4;
    Views.setSliceMM(true);
    return Views;
  }
  function handleIntensityChange(data) {
    lastPos.vox = data.vox[0] + " , " + data.vox[1] + " , " + data.vox[2];
    let OriStr = data.string;
    let index = OriStr.indexOf("=");
    let str = OriStr.slice(index + 1);
    lastPos.str = str;
  }
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
  function handleMaterial(id) {}
  function handleFile(id) {
    switch (id) {
      case "SaveDocument":
        Views.saveDocument("all.nvd");
        return;
      case "SaveImage":
        Views.saveImage("all.nii", true);
        return;
      case "SaveBitmap":
        Views.saveScene("ScreenShot.png");
        return;
    }
  }
  return {
    CanvasInit,
    handleIntensityChange,
    handleFile,
    handleColor,
    handleScreen,
    handleMouse,
    handleTool,
    handleMaterial,
    toolSwitch,
    lastPos,
  };
});
