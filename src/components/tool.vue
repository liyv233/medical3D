<template>
  <Transition>
    <div class="mask">
      <div class="tool">
        <div class="toolTop">
          <el-icon
            :size="40"
            color="black"
            @click="handleTool(BeChooseColor, Pen, isFill)"
          >
            <Back />
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
                <div
                  class="volumes"
                  v-for="(volume, index) in volumes"
                  :key="volume.name"
                  :index="index"
                >
                  <article>{{ volume.name }}</article>
                  <span>
                    <select v-model="Material">
                      <option
                        v-for="material in materials"
                        :value="material"
                        :selected="material == Material ? true : false"
                        @click="handleMaterial(index, material)"
                      >
                        {{ material }}
                      </option>
                    </select>
                  </span>
                </div>
                <div class="btn">
                  <el-button
                    type="primary"
                    round
                    @click="Start()"
                  >
                    推理
                  </el-button>
                  <el-button
                    type="primary"
                    round
                    @click="Reasoning()"
                  >
                    调整结果
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
                  round
                  v-for="save in saves"
                  @click="handleSave(save.id)"
                >
                  {{ save.label }}
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
    </div>
  </Transition>
</template>

<script setup>
import { ref, reactive, onBeforeMount } from "vue";
import { useTool } from "../store/Tool.js";
// pinia
const Tool = useTool();
const {
  handleSave,
  handleScreen,
  handleMouse,
  handleTool,
  handleMaterial,
  getVolumesFile,
} = Tool;
// some define about tool
const mouses = reactive([
  { id: "none", label: "无" },
  { id: "slicer", label: "切片" },
  { id: "pan", label: "平移缩放" },
  { id: "measurement", label: "测量" },
  { id: "contrast", label: "色彩对比" },
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
  "actc",
  "bcgwhw",
  "bcgwhw_dark",
  "blue",
  "blue2red",
  "bluern",
  "bone",
  "bronze",
  "cividis",
  "cool",
  "copper",
  "copper2",
  "ct_airways",
  "ct_artery",
  "ct_bones",
  "ct_brain",
  "ct_brain_gray",
  "ct_cardiac",
  "ct_head",
  "ct_kidneys",
  "ct_liver",
  "ct_muscles",
  "ct_scalp",
  "ct_skull",
  "ct_soft",
  "ct_soft_tissue",
  "ct_surface",
  "ct_vessels",
  "ct_w_contrast",
  "cubehelix",
  "electric_blue",
  "freesurfer",
  "ge_color",
  "gold",
  "gray",
  "green",
  "hot",
  "hotiron",
  "hsv",
  "inferno",
  "jet",
  "linspecer",
  "magma",
  "mako",
  "nih",
  "plasma",
  "random",
  "red",
  "redyell",
  "rocket",
  "surface",
  "turbo",
  "violet",
  "viridis",
  "warm",
  "winter",
  "x_rain",
]);
// model
var Material = ref("gray");
var Mouse = ref("无");
var Screen = ref("全部展示");
var BeChooseColor = ref("Red");
var Pen = ref(false);
var isFill = ref(false);
var volumes = ref();

// open option
const activeNames = ref(["1", "2", "3", "4", "0"]);
onBeforeMount(() => {
  volumes = getVolumesFile();
});
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
    overflow: scroll;
    background-color: white;
    width: 18vw;
    height: 100vh;
    .toolTop {
      .el-icon {
        cursor: pointer;
        padding-left: 0.5vw;
        padding-top: 0.5vh;
      }
    }
    .toolContent {
      .el-collapse {
        .el-collapse-item {
          :deep(.el-collapse-item__header) {
            text-indent: 1.5em;
            font-size: 20px;
            font-weight: 700;
          }
          .el-radio-group {
            display: block;
            .el-radio {
              padding-left: 2vw;
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
                width: 40%;
                font-size: 20px;
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
</style>
