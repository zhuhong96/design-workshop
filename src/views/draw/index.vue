<script setup lang="ts">
import '@leafer-in/editor';
import { onMounted, ref, onUnmounted, watch } from 'vue';
import sidebar from '@/components/sidebar/index.vue';
import characters from '../common/characters.vue';
import navigation from '@/components/navigation/index.vue';
import element from '../common/element.vue';
import Images from '../common/images.vue';
import Panel from '../common/panel.vue';
import InitDraw from '@/class/init';
import { debounce } from 'lodash';
import elementResizeDetectorMaker from 'element-resize-detector';
const canvasRef = ref<HTMLCanvasElement | null>(null);
const erd = elementResizeDetectorMaker();
import useWorkspace from '@/hooks/useworkspace';
const { editCanvasResize } = useWorkspace();
// https://github.com/LvHuaiSheng/leafer-x-ruler
// https://www.leaferjs.com/

const initDraw = ref<any>(null);
// 侧边栏选中字段
const sidebarSelect = ref<string>('text');
// 是否展示侧边栏
const showSidebar = ref<boolean>(true);
// 是否第一次进入
const isFirst = ref<boolean>(true);

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
    let width = clientWidth - 322;
    const height = clientHeight - 60;
    if (newval) width = width - 260;
    editCanvasResize({
      width,
      height,
    });
  },
);

// 监听窗口变化
const onResize = () => {
  const onResizeDebounce = debounce((width: number, height: number) => {
    // initDraw.value.getApp().app.resize({ width: width - 60 - 260, height: height - 60 });
    editCanvasResize({
      width: width - 322 - 260,
      height: height - 60,
    });
  }, 100);
  erd.listenTo(document.getElementById('content'), function (element: { offsetWidth: number; offsetHeight: number }) {
    const width = element.offsetWidth;
    const height = element.offsetHeight;
    if (isFirst.value) return (isFirst.value = false);
    onResizeDebounce(width, height);
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
      <el-container>
        <el-header><navigation /></el-header>
        <el-container>
          <el-aside :width="showSidebar ? '260px' : '0'">
            <characters v-if="sidebarSelect === 'text'" />
            <element v-else-if="sidebarSelect === 'element'" />
            <Images v-else-if="sidebarSelect === 'image'" />
          </el-aside>
          <el-main style="padding: 0" class="layout-main">
            <jy-icon class="icon" type="icon-right" @click="showSidebar = !showSidebar"></jy-icon>
            <canvas id="canvas" ref="canvasRef"></canvas>
          </el-main>
          <el-aside width="260px"> <Panel /> </el-aside>
        </el-container>
      </el-container>
      <!-- <div class="draw-header">
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
        <div class="layout-attribute">
          属性
          <el-button type="danger">Danger</el-button>
          <el-link type="warning">warning</el-link>
        </div>
      </div> -->
    </div>
  </div>
</template>

<style scoped lang="less">
@import './index.less';
</style>
