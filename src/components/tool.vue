<template>
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
          <!-- drawing -->
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
          <!-- screen -->
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
          <!-- material -->
          <el-collapse-item
            title="材质"
            name="4"
          >
          </el-collapse-item>
          <!-- save -->
          <el-collapse-item
            title="保存"
            name="5"
          >
            <el-row class="mb-4">
              <el-button
                type="primary"
                round
                v-for="file in files"
                :key="file.id"
                :id="file.id"
                @click="handleFile(file.id)"
                >{{ file.label }}</el-button
              >
            </el-row>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive, onMounted } from "vue";
import { useTool } from "../store";
// pinia
const Tool = useTool();
const { handleFile, handleScreen, handleMouse, handleTool, handleMaterial } =
  Tool;

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
const files = reactive([
  { id: "SaveDocument", label: "带标注模型" },
  { id: "SaveImage", label: "仅标注部分" },
  { id: "SaveBitmap", label: "屏幕截图" },
]);
var Mouse = ref("无");
var Screen = ref("全部展示");
var BeChooseColor = ref("Red");
var Pen = ref(false);
var isFill = ref(false);

const activeNames = ref(["1", "2", "3", "4", "5"]);
onMounted(() => {});
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
  background-color: rgba(0, 0, 0, 0.377);
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
        }
      }
    }
  }
}
</style>
