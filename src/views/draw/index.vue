<script setup lang="ts">
import '@leafer-in/editor';
import { onMounted, ref, onUnmounted } from 'vue';
import sidebar from '@/components/sidebar/index.vue';
import characters from '../common/characters.vue';
import navigation from '@/components/navigation/index.vue';
import InitDraw from '@/class/init';
import { debounce } from 'lodash';
import elementResizeDetectorMaker from 'element-resize-detector';
const canvasRef = ref<HTMLCanvasElement | null>(null);
const erd = elementResizeDetectorMaker();
// https://github.com/LvHuaiSheng/leafer-x-ruler
// https://www.leaferjs.com/

const initDraw = ref<any>(null);
// 侧边栏选中字段
const sidebarSelect = ref<string>('text');

onMounted(() => {
  initDraw.value = new InitDraw('canvas');

  const onResize = debounce((width: number, height: number) => {
    initDraw.value.getApp().app.resize({ width: width - 60 - 260, height: height - 60 });
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
      <sidebar v-model="sidebarSelect" :workspace="initDraw?.getWorkspace()" />
      <!-- <img src="@/images/logo.png" alt="JiYun" style="width: 42px; border-radius: 42px" /> -->
    </div>
    <div class="draw-box">
      <div class="draw-header">
        <navigation />
      </div>
      <div class="layout-content">
        <!-- <div style="width: 60px">9666</div> -->
        <div
          :class="[
            'layout-content-sidebar',
            {
              'layout-content-sidebar-active': sidebarSelect !== 'text',
            },
          ]"
        >
          <jy-icon class="icon" type="icon-right"></jy-icon>
          <characters />
        </div>
        <div id="canvas" ref="canvasRef"></div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import './index.less';
</style>
