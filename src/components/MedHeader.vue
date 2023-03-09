<template>
  <div class="nav-box">
    <div class="view">
      <span class="view-title">视图</span>
      <div class="screen plat">
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
      <div class="scroll plat">
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
      <div class="draw plat">
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
      <div class="file plat">
        <span
          id="SaveDocument"
          @click="navClick"
          >带画笔保存</span
        >
        <span
          id="SaveBitmap"
          @click="navClick"
          >保存截图</span
        >
        <span
          id="SaveImage"
          @click="navClick"
          >SaveImage</span
        >
      </div>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(["navChange"]);
const Views = defineProps(["Views"]);
function navClick(e) {
  emit("navChange", e);
}
</script>

<style lang="less" scoped>
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
    .plat {
      display: none;
      position: absolute;
      background-color: rgb(85, 85, 85);
    }
    .draw {
      transform: translate(0, 27.4vh);
    }
    .screen {
      transform: translate(0, 21.4vh);
    }
    .scroll {
      transform: translate(0, 18.4vh);
    }
    .file {
      transform: translate(0, 12.4vh);
    }
  }
  .screen,
  .scroll,
  .draw,
  .file {
    span {
      width: 6.5vw;
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
  .view:hover .plat {
    display: block;
    clear: both;
  }
}
</style>
