<script setup lang="ts">
import '@leafer-in/editor';
import { onMounted, ref, onUnmounted } from 'vue';
// import { Canvas, Line } from '@leafer-ui/core'
import InitDraw from '@/class/init';
import { debounce } from 'lodash';
import elementResizeDetectorMaker from 'element-resize-detector';
const canvasRef = ref<HTMLCanvasElement | null>(null);
const erd = elementResizeDetectorMaker();
// https://github.com/LvHuaiSheng/leafer-x-ruler
// https://www.leaferjs.com/

onMounted(() => {
  const initDraw = new InitDraw('canvas');

  const onResize = debounce((width: number, height: number) => {
    initDraw.getApp().app.resize({ width: width - 60, height: height - 60 });
  }, 100);

  erd.listenTo(document.getElementById('content'), function (element: { offsetWidth: number; offsetHeight: number }) {
    var width = element.offsetWidth;
    var height = element.offsetHeight;
    onResize(width, height);
  });
});

onUnmounted(() => {
  erd.uninstall(document.getElementById('content'));
});
</script>

<template>
  <div id="content" class="draw">
    <div class="draw-sidebar">
      <img src="@/images/logo.png" alt="JiYun" style="width: 42px; border-radius: 42px" />
    </div>
    <div class="draw-box">
      <div class="draw-header">456</div>
      <div class="layout-content">
        <div id="canvas" ref="canvasRef"></div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.draw {
  display: flex;
  width: 100vw;
  height: 100vh;
  background-color: #0a0b10;

  .draw-sidebar {
    width: 60px;
  }

  .draw-box {
    flex: 1;
    display: flex;
    flex-direction: column;

    .draw-header {
      height: 60px;
    }

    .layout-content {
      height: calc(100% - 60px);
    }
  }
}

#canvas {
  width: 100%;
  height: 100%;
  // background-color: rgba(0, 0, 0, 0.5);
  background-color: #16161c;
}

.btn-box > :nth-child(n + 2) {
  margin-left: 10px;
}
</style>
