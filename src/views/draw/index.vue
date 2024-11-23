<script setup lang="ts">
import '@leafer-in/editor';
import { onMounted, ref, onUnmounted } from 'vue';
import sidebar from '@/components/sidebar/index.vue';
import InitDraw from '@/class/init';
import { debounce } from 'lodash';
import elementResizeDetectorMaker from 'element-resize-detector';
const canvasRef = ref<HTMLCanvasElement | null>(null);
const erd = elementResizeDetectorMaker();
// https://github.com/LvHuaiSheng/leafer-x-ruler
// https://www.leaferjs.com/

const initDraw = ref<any>(null);

onMounted(() => {
  initDraw.value = new InitDraw('canvas');

  const onResize = debounce((width: number, height: number) => {
    initDraw.value.getApp().app.resize({ width: width - 60 - 60, height: height - 60 });
  }, 100);

  erd.listenTo(document.getElementById('content'), function (element: { offsetWidth: number; offsetHeight: number }) {
    const width = element.offsetWidth;
    const height = element.offsetHeight;
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
      <sidebar v-if="initDraw?.getWorkspace()" :workspace="initDraw?.getWorkspace()" />
      <!-- <img src="@/images/logo.png" alt="JiYun" style="width: 42px; border-radius: 42px" /> -->
    </div>
    <div class="draw-box">
      <div class="draw-header">456</div>
      <div class="layout-content">
        <!-- <div style="width: 60px">9666</div> -->
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
      display: flex;
      height: calc(100% - 60px);

      #canvas {
        flex: 1;
        height: 100%;
        // background-color: rgba(0, 0, 0, 0.5);
        background-color: #16161c;
      }
    }
  }
}

.btn-box > :nth-child(n + 2) {
  margin-left: 10px;
}
</style>
