import { defineStore ,storeToRefs} from "pinia";
import { ref, reactive } from "vue";
import { Niivue } from "@niivue/niivue";
import { useUser } from "../store/user";
const userStore = useUser();
const { isFiter,isadd} = storeToRefs(userStore);
export const useTool = defineStore("tool", () => {
  // 初始化渲染器
  var View = reactive({});
  function CanvasInit() {
    View = new Niivue({
      logging: "true",
      dragAndDropEnabled: false,
      backColor: [0, 0, 0, 1],
      onLocationChange: handleIntensityChange,
    });
    View.opts.multiplanarForceRender = true;
    View.setRadiologicalConvention(false);
    View.drawOpacity = 0.4;
    View.setSliceMM(false);
    return View;
  }

  // 相关配置
  var imgName = ref("");
  function setImgName(value){
    imgName.value = value;
  }
  var baseUrl = ref("");
  var imgId = ref(0);
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
        View.opts.dragMode = View.dragModes.none;
        break;
      case "contrast":
        View.opts.dragMode = View.dragModes.contrast;
        break;
      case "measurement":
        View.opts.dragMode = View.dragModes.measurement;
        break;
      case "pan":
        View.opts.dragMode = View.dragModes.pan;
        break;
      case "slicer":
        View.opts.dragMode = View.dragModes.slicer3D;
        break;
    }
  }

  // 视图工具
  function handleScreen(id) {
    switch (id) {
      case "Axial":
        View.setSliceType(View.sliceTypeAxial);
        break;
      case "Sagittal":
        View.setSliceType(View.sliceTypeSagittal);
        break;
      case "Coronal":
        View.setSliceType(View.sliceTypeCoronal);
        break;
      case "Render":
        View.setSliceType(View.sliceTypeRender);
        break;
      case "ACS":
        View.opts.multiplanarForceRender = false;
        View.setSliceType(View.sliceTypeMultiplanar);
        break;
      case "ACSR":
        View.opts.multiplanarForceRender = true;
        View.setSliceType(View.sliceTypeMultiplanar);
        break;
    }
  }

  // 画笔颜色工具
  var choose = ref("red");
  function handleColor() {
    View.setDrawingEnabled(pen.value);
    switch (choose.value) {
      case "red":
        View.setPenValue(1, fill.value);
        break;
      case 2:
        View.setPenValue(2, fill.value);
        break;
      case 3:
        View.setPenValue(3, fill).value;
        break;
      case 4:
        View.setPenValue(4, fill.value);
        break;
      case 5:
        View.setPenValue(5, fill);
        break;
      case 6:
        View.setPenValue(6, fill);
        break;
      case 7:
        View.setPenValue(7, fill);
      case 8:
        View.setPenValue(8, fill.value);
        break;
      case 9:
        View.setPenValue(9, fill.value);
        break;
      case 10:
        View.setPenValue(10, fill).value;
        break;
      case 11:
        View.setPenValue(11, fill.value);
        break;
      case 12:
        View.setPenValue(12, fill);
        break;
      case 13:
        View.setPenValue(13, fill);
        break;
      case 14:
        View.setPenValue(14, fill);            
      case 15:
        View.setPenValue(15, fill);
        break;
      case 16:
        View.setPenValue(16, fill);  
        break;
      case 17:
        View.setPenValue(0, fill);  
        break;
    }
  }

  // 保存相关工具
  function handleSave(id) {
    switch (id) {
      case "Image":
        View.saveImage("draw.nii", true);
        return;
      case "Bitmap":
        View.saveScene("ScreenShot.png");
        return;
    }
  }
  // 更改材质
  function handleMaterial(index, id) {
    View.volumes[index].colorMap = id;
    View.updateGLVolume();
    return;
  }
  // 添加文件时的相关操作
  var volumes = ref([]);
  function AddVolumesFile(file) {
    volumes.value.push(file);
  }
  function RemoveVolumesFile() {
    volumes.value.pop();
  }
  function getVolumesFile() {
    return volumes.value;
  }

  // 器官计数
  var description = ref("");
  async function countNum() {
    var data = new FormData();
    data.append("img_name", imgName.value);
    data.append("isFiter", isFiter.value);
    data.append("isadd", isadd.value);


    const res = await fetch("http://192.168.43.145:5000/imgs/nums", {
      method: "POST",
      body: data,
    });
    return res;
  }
  // 生成报告
  const dialogVisible = ref(false);
  // url
  const url = ref("");
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
    AddVolumesFile,
    RemoveVolumesFile,
    countNum,
    setImgName,
    toolSwitch,
    lastPos,
    volumes,
    View,
    dialogVisible,
    imgName,
    baseUrl,
    imgId,
    description,
    url,
  };
});
