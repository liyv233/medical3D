<template>
  <Transition>
    <div
      class="mask"
      v-loading="loading"
    >
      <div class="tool">
        <div class="toolTop">
          <el-icon
            :size="40"
            color="black"
            @click="handleTool(BeChooseColor, Pen, isFill)"
          >
            <Back />
          </el-icon>
          <el-icon
            :size="40"
            @click="goHome"
          >
            <HomeFilled />
          </el-icon>
        </div>
        <div class="toolContent">
          <el-collapse v-model="activeNames">
            <!-- material -->
            <el-collapse-item
              title="模型"
              name="0"
            >
              <div class="mode">
                <!-- 推理前 -->
                <div
                  class="volumes"
                  v-show="!isInference"
                >
                  <article>推理前模型</article>
                  <span>
                    <select
                      v-model="Material"
                      style="width: 5vw"
                    >
                      <option
                        v-for="material in materials"
                        :value="material.id"
                        :selected="material.id == Material ? true : false"
                        @click="handleMaterial(0, material.id)"
                      >
                        {{ material.label }}
                      </option>
                    </select>
                  </span>
                </div>
                <!-- 推理后 -->
                <div
                  class="volumes"
                  v-show="isInference"
                >
                  <article>推理完成模型</article>
                  <span>
                    <select
                      v-model="afterMaterial"
                      style="width: 5vw"
                    >
                      <option
                        v-for="material in materials"
                        :value="material.id"
                        :selected="material.id == Material ? true : false"
                        @click="handleMaterial(0, material.id)"
                      >
                        {{ material.label }}
                      </option>
                    </select>
                  </span>
                </div>
                <!-- 按钮 -->
                <div class="btn">
                  <el-button
                    type="primary"
                    @click="operations()"
                    v-show="!isInference"
                  >
                    {{ fileType == 0 ? "推理" : "肺结节" }}
                  </el-button>
                  <el-button
                    type="primary"
                    @click="uploadDialog = true"
                    v-show="isInference"
                  >
                    标注合成
                  </el-button>
                  <el-button
                    type="primary"
                    @click="keepMaxArea"
                    v-show="isInference"
                  >
                    保留最大连通域
                  </el-button>
                  <el-button
                    type="primary"
                    v-show="isInference"
                    @click="pyVisable = true"
                  >
                    后处理脚本上传
                  </el-button>
                  <el-button
                    type="primary"
                    @click="handleCountNum"
                    v-show="isInference"
                  >
                    器官计数
                  </el-button>
                  <el-button
                    type="primary"
                    v-show="isInference"
                    @click="getVolume"
                  >
                    器官体积测量
                  </el-button>
                  <el-button
                    type="primary"
                    v-show="isInference"
                    @click="getArea"
                  >
                    器官面积测量
                  </el-button>
                  <el-button
                    type="primary"
                    v-show="isInference"
                    @click="getDia"
                  >
                    器官直径测量
                  </el-button>
                </div>
              </div>
            </el-collapse-item>
            <!-- mouse -->
            <el-collapse-item
              title="右键功能"
              name="1"
            >
              <el-radio-group v-model="Mouse">
                <el-radio
                  size="large"
                  v-for="mouse in mouses"
                  :key="mouse.id"
                  :label="mouse.label"
                  @click="handleMouse(mouse.id)"
                ></el-radio>
              </el-radio-group>
            </el-collapse-item>
            <!-- screen -->
            <el-collapse-item
              title="视图"
              name="2"
            >
              <el-radio-group v-model="Screen">
                <el-radio
                  size="large"
                  v-for="screen in screens"
                  :key="screen.id"
                  :label="screen.label"
                  @click="handleScreen(screen.id)"
                ></el-radio>
              </el-radio-group>
            </el-collapse-item>
            <!-- drawing -->
            <el-collapse-item
              title="标注"
              name="3"
            >
              <div>
                <el-checkbox v-model="Pen">开启/关闭</el-checkbox>
                <el-checkbox v-model="isFill">是否填充</el-checkbox>
                <div class="selectBox">
                  <select v-model="BeChooseColor">
                    <option
                      v-for="color in colors"
                      :value="color.id"
                      :selected="color.label == BeChooseColor ? true : false"
                    >
                      {{ color.label }}
                    </option>
                  </select>
                </div>
              </div>
            </el-collapse-item>
            <!-- save -->
            <el-collapse-item
              title="保存"
              name="4"
            >
              <el-row class="mb-4">
                <el-button
                  type="primary"
                  v-for="save in saves"
                  @click="handleSave(save.id)"
                >
                  {{ save.label }}
                </el-button>
              </el-row>
            </el-collapse-item>
            <!-- 报告导出 -->
            <el-collapse-item
              title="导出报告"
              name="5"
            >
              <el-row class="mb-4">
                <el-button
                  type="primary"
                  @click="dialogVisible = true"
                >
                  生成报告
                </el-button>
              </el-row>
            </el-collapse-item>
          </el-collapse>
        </div>
      </div>
      <div
        class="other"
        @click="handleTool(BeChooseColor, Pen, isFill)"
      ></div>
      <!-- 后处理 -->
      <el-dialog
        v-model="pyVisable"
        title="后处理脚本上传"
        style="position: relative"
      >
        <el-upload
          class="upload-demo upload"
          :multiple="false"
          :on-change="changePyFile"
          :limit="1"
          :auto-upload="false"
          action="none"
          accept=".py"
        >
          <el-button type="primary">点击上传</el-button>
          <template #tip>
            <div
              class="el-upload__tip"
              style="font-size: 18px; margin-top: 4vh"
            >
              请上传后处理脚本
            </div>
          </template>
        </el-upload>
        <el-button
          type="primary"
          style="position: absolute; bottom: 10px; right: 10px"
          @click="uploadAfterFile"
        >
          确定
        </el-button>
      </el-dialog>
      <!-- 合并标注 -->
      <el-dialog
        v-model="uploadDialog"
        title="合并标注"
        style="position: relative"
      >
        <el-upload
          class="upload-demo upload"
          :multiple="false"
          :on-change="changeNewfile"
          :limit="1"
          :auto-upload="false"
          action="none"
          accept=".nii"
        >
          <el-button type="primary">点击上传</el-button>
          <template #tip>
            <div
              class="el-upload__tip"
              style="font-size: 18px; margin-top: 4vh"
            >
              请选在模型图中标注出区域并获取文件
            </div>
          </template>
        </el-upload>
        <el-button
          type="primary"
          style="position: absolute; bottom: 10px; right: 10px"
          @click="makeAll"
        >
          确定
        </el-button>
      </el-dialog>
      <!-- 文档生成 -->
      <el-dialog v-model="dialogVisible">
        <report></report>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button
              type="primary"
              @click="handleMakePDF"
            >
              确 定
            </el-button>
          </span>
        </template>
      </el-dialog>
    </div>
  </Transition>
</template>

<script setup>
import { useTool } from "../store/Tool.js";
import { ref, reactive, getCurrentInstance, computed } from "vue";
import { storeToRefs } from "pinia";
import { useUser } from "../store/user";
import { ElMessage } from "element-plus";
import Bus from "../utils/eventbus";
import { ElNotification, ElMessageBox } from "element-plus";
import report from "../pages/report.vue";
import { useRouter } from "vue-router";
// request
const request = getCurrentInstance().proxy.$request;
// pinia
const loading = ref(false);
const userStore = useUser();
const Tool = useTool();
const { isInference, basicInfo, isAuth, isCount, fileType } =
  storeToRefs(userStore);
const {
  handleSave,
  handleScreen,
  handleMouse,
  handleTool,
  handleMaterial,
  countNum,
} = Tool;
const {
  dialogVisible,
  volumes,
  lastPos,
  imgId,
  description,
  imgName,
  baseUrl,
} = storeToRefs(Tool);
// disabled
const disabled = computed(() => {
  if (isAuth.value == true && isInference.value == true) return false;
  else return true;
});
// some define about tool
const mouses = reactive([
  { id: "none", label: "无" },
  { id: "slicer", label: "放缩" },
  { id: "pan", label: "平移" },
  { id: "measurement", label: "测量" },
  { id: "contrast", label: "对比度" },
]);
const screens = reactive([
  { id: "Axial", label: "横断面" },
  { id: "Sagittal", label: "矢状面" },
  { id: "Coronal", label: "冠状面" },
  { id: "Render", label: "3D模型" },
  { id: "ACS", label: "三视图" },
  { id: "ACSR", label: "全部展示" },
]);
const colors = reactive([
  { id: "Red", label: "红" },
  { id: "Green", label: "绿" },
  { id: "Blue", label: "蓝" },
  { id: "Yellow", label: "黄" },
  { id: "Cyan", label: "青" },
  { id: "Purple", label: "紫" },
  { id: "Erase", label: "橡皮" },
]);
const saves = reactive([
  { id: "Image", label: "仅保存标注部分" },
  { id: "Bitmap", label: "页面截图" },
]);
const materials = ref([
  { id: "freesurfer", label: "彩图" },
  { id: "gray", label: "灰度" },
]);
// model
var afterMaterial = ref("gray");
var Material = ref("gray");
var Mouse = ref("无");
var Screen = ref("全部展示");
var BeChooseColor = ref("Red");
var Pen = ref(false);
var isFill = ref(false);
const activeNames = ref(["1", "2", "3", "4", "5", "0"]);

// 文件打印
async function handleMakePDF() {
  loading.value = true;
  const res = await request.get(`/patients/${basicInfo.value.patientId}`);
  console.log(res);
  if (res.data._Result__code == 200) {
    basicInfo.value.name = res.data._Result__data.patient_name;
    basicInfo.value.sex = res.data._Result__data.sex;
  } else {
    ElMessage.error("患者ID错误");
  }
  loading.value = false;
  console.log(basicInfo.value);
  const flag = Bus.emit("makepdf");
  if (flag) dialogVisible.value = false;
}
// 器官计数
async function handleCountNum() {
  loading.value = true;
  const res = await countNum();
  const data = await res.json();
  if (data._Result__code == 200) {
    isCount.value = true;
    const { _Result__data } = data;
    description.value = _Result__data.description;
    ElNotification({
      title: "器官个数",
      type: "Success",
      position: "top-left",
      message: description.value,
    });
  } else {
    ElMessage.error("发生错误");
  }
  loading.value = false;
}
// 推理 或 肺结节
async function operations() {
  loading.value = true;
  var formData = new FormData();
  var currentFile = volumes.value[0].raw;
  formData.append("file", currentFile);
  var op = "";
  if (fileType.value == 0) op = "img";
  else op = "lungs";
  const res = await fetch("http://10.33.39.163:5000/" + op, {
    method: "POST",
    body: formData,
  });
  const data = await res.json();
  if (data._Result__code == 200) {
    baseUrl.value = data._Result__data.base_url;
    imgName.value = data._Result__data.img_name;
    imgId.value = data._Result__data.imgId;
    ElMessage.success("上传成功,请稍等...");
    isInference.value = true;
    let filePath = "http://10.33.39.163:5000" + baseUrl.value + imgName.value;
    Bus.emit("selectView", filePath);
  } else {
    ElMessage.error("上传失败了");
  }
  loading.value = false;
}
// 合并标注
var uploadDialog = ref(false);
var newFile;
function changeNewfile(file) {
  newFile = file;
}
async function makeAll() {
  loading.value = true;
  var formData = new FormData();
  formData.append("file", newFile.raw);
  formData.append("img_name", imgName.value);
  const res = await fetch("http://10.33.39.163:5000/imgs/graphs", {
    method: "POST",
    body: formData,
  });
  const data = await res.json();
  if (data._Result__code == 200) {
    baseUrl.value = data._Result__data.base_url;
    imgName.value = data._Result__data.img_name;
    imgId.value = data._Result__data.imgId;
    ElMessage.success("上传成功,请稍等...");
    isInference.value = true;
    let filePath = "http://10.33.39.163:5000" + baseUrl.value + imgName.value;
    Bus.emit("selectView", filePath);
  } else {
    ElMessage.error("上传失败了");
  }
  loading.value = false;
  uploadDialog.value = false;
}
// 保留最大连通域
async function keepMaxArea() {
  loading.value = true;
  var formData = new FormData();
  formData.append("img_name", imgName.value);
  let str = lastPos.value.vox.split(",");
  formData.append("x", str[0]);
  formData.append("y", str[1]);
  formData.append("z", str[2]);
  const res = await fetch("http://10.33.39.163:5000/imgs/domains", {
    method: "POST",
    body: formData,
  });
  const data = await res.json();
  if (data._Result__code == 200) {
    baseUrl.value = data._Result__data.base_url;
    imgName.value = data._Result__data.img_name;
    ElMessage.success("请稍等...");
    isInference.value = true;
    let filePath = "http://10.33.39.163:5000" + baseUrl.value + imgName.value;
    Bus.emit("selectView", filePath);
  } else {
    ElMessage.error("上传失败了");
  }
  loading.value = false;
}
// 后处理上传
var pyFile;
var pyVisable = ref(false);
function changePyFile(file) {
  pyFile = file;
}
async function uploadAfterFile() {
  loading.value = true;
  var formData = new FormData();
  formData.append("file", pyFile.raw);
  formData.append("img_name", imgName.value);
  const res = await fetch("http://10.33.39.163:5000/imgs/option", {
    method: "POST",
    body: formData,
  });
  console.log(formData);
  const data = await res.json();
  console.log(data);
  if (data._Result__code == 200) {
    baseUrl.value = data._Result__data.base_url;
    imgName.value = data._Result__data.img_name;
    ElMessage.success("上传成功,请稍等...");
    let filePath = "http://10.33.39.163:5000" + baseUrl.value + imgName.value;
    Bus.emit("selectView", filePath);
  } else {
    ElMessage.error("上传失败了");
  }
  loading.value = false;
  pyVisable.value = false;
}
// 面积
async function getArea() {
  loading.value = true;
  let formData = new FormData();
  let string = lastPos.value.vox.split(",");
  formData.append("img_name", imgName.value);
  formData.append("x", string[0]);
  formData.append("y", string[1]);
  formData.append("z", string[2]);
  const res = await fetch("http://10.33.39.163:5000/imgs/area", {
    method: "POST",
    body: formData,
  });
  const data = await res.json();
  console.log(data);
  if (data._Result__code == 200) {
    var str = data._Result__data.area;
    loading.value = false;
    ElNotification({
      title: "面积",
      type: "Success",
      position: "top-left",
      message: str,
    });
  } else {
    ElMessage.error("发生错误");
    loading.value = false;
  }
}
// 体积
async function getVolume() {
  loading.value = true;
  let formData = new FormData();
  formData.append("img_name", imgName.value);
  const res = await fetch("http://10.33.39.163:5000/imgs/volume", {
    method: "POST",
    body: formData,
  });
  const data = await res.json();
  if (data._Result__code == 200) {
    var str = data._Result__data.volumes;
    ElNotification({
      title: "体积",
      type: "Success",
      position: "top-left",
      message: str,
    });
  } else {
    ElMessage.error("发生错误");
  }
  loading.value = false;
}
// 直径
async function getDia() {
  loading.value = true;
  let formData = new FormData();
  let string = lastPos.value.vox.split(",");
  formData.append("img_name", imgName.value);
  formData.append("x", string[0]);
  formData.append("y", string[1]);
  formData.append("z", string[2]);
  const res = await fetch("http://10.33.39.163:5000/imgs/long", {
    method: "POST",
    body: formData,
  });
  const data = await res.json();
  console.log(data);
  if (data._Result__code == 200) {
    let str = data._Result__data.long;
    ElNotification({
      title: "直径",
      type: "Success",
      position: "top-left",
      message: str,
    });
  } else {
    ElMessage.error("发生错误");
  }
  loading.value = false;
}
// 返回
const router = useRouter();
const goHome = () => {
  ElMessageBox.confirm("确定回到主界面？", "Warning", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      router.push("/");
    })
    .catch((e) => {
      console.log(e);
    });
};
</script>

<style lang="less" scoped>
.mask {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(255, 255, 255, 0);
  z-index: 999;
  display: flex;
  flex-direction: row-reverse;
  .tool {
    scrollbar-width: none;
    overflow-y: scroll;
    background-color: white;
    width: 18vw;
    height: 100vh;
    .toolTop {
      display: flex;
      justify-content: space-between;
      .el-icon {
        cursor: pointer;
        padding-left: 0.5vw;
        padding-top: 0.5vh;
      }
    }
    .toolContent {
      .mode {
        .btn {
          display: flex;
          align-items: center;
          flex-direction: column;
        }
      }
      .el-collapse {
        .el-collapse-item {
          :deep(.el-collapse-item__header) {
            text-indent: 1.5em;
            font-size: 20px;
            font-weight: 700;
          }
          .el-radio-group {
            display: flex;
            justify-content: space-around;
            align-items: center;
            .el-radio {
              width: 28%;
            }
          }
          .el-checkbox {
            margin-top: 2vh;
            padding-left: 2vw;
          }
          .el-row {
            margin-top: 1.8vh;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
          }
          .selectBox {
            margin-top: 1vh;
            display: flex;
            justify-content: center;
            select {
              text-align: center;
              width: 6vw;
              font-size: 16px;
              font-weight: 500;
            }
          }
          .mode {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            .volumes {
              display: flex;
              flex-direction: row;
              justify-content: center;
              align-items: center;
              span {
                margin-left: 1.2vw;
                select {
                  height: 2.5vh;
                  text-align: center;
                }
              }
              article {
                width: 80%;
                font-size: 18px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
            }
            .el-button {
              margin-top: 1vh;
            }
          }
        }
      }
    }
  }
  .other {
    width: 82vw;
    height: 100vh;
  }
}
.v-enter-active,
.v-leave-active {
  transition: transform 0.4s ease;
}
.v-enter-from,
.v-leave-to {
  transform: translateX(100%);
}
.upload {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
:deep(.el-upload-list__item-info) {
  width: 5vw;
}
</style>
