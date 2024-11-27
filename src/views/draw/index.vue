<script setup lang="ts">
import '@leafer-in/editor';
import { onMounted, ref, onUnmounted, watch } from 'vue';
import sidebar from '@/components/sidebar/index.vue';
import characters from '../common/characters.vue';
import navigation from '@/components/navigation/index.vue';
import element from '../common/element.vue';
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
// 是否展示侧边栏
const showSidebar = ref<boolean>(true);

onMounted(() => {
  initDraw.value = new InitDraw('canvas');
  onResize();
});

watch(
  () => showSidebar.value,
  (newval) => {
    const contentDom = document.getElementById('content') as HTMLElement;
    if (!contentDom) return;
    const clientWidth = contentDom.offsetWidth as number;
    const clientHeight = contentDom.offsetHeight as number;
    let width = clientWidth - 60;
    const height = clientHeight - 60;
    if (newval) width = width - 260;
    initDraw.value.getApp().app.resize({
      width,
      height,
    });
  },
);

// 监听窗口变化
const onResize = () => {
  const onResize = debounce((width: number, height: number) => {
    initDraw.value.getApp().app.resize({ width: width - 60 - 260, height: height - 60 });
  }, 100);
  erd.listenTo(document.getElementById('content'), function (element: { offsetWidth: number; offsetHeight: number }) {
    const width = element.offsetWidth;
    const height = element.offsetHeight;
    onResize(width, height);
  });
};

onUnmounted(() => {
  // 销毁实例
  erd.uninstall(document.getElementById('content'));
});
</script>

<template>
  <div id="content" class="draw">
    <div class="draw-sidebar">
      <sidebar v-model="sidebarSelect" />
    </div>
    <div class="draw-box">
      <div class="draw-header">
        <navigation />
      </div>
      <div class="layout-content">
        <div
          :class="[
            'layout-content-sidebar',
            {
              'layout-content-sidebar-active': !showSidebar,
            },
          ]"
        >
          <jy-icon class="icon" type="icon-right" @click="showSidebar = !showSidebar"></jy-icon>
          <characters v-if="sidebarSelect === 'text'" />
          <element v-else-if="sidebarSelect === 'element'" />
        </div>
        <div id="canvas" ref="canvasRef"></div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import './index.less';
</style>
