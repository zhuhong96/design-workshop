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
    console.log('resize');
    initDraw.getApp().app.resize({ width: width - 60, height: height - 60 });
  }, 100);

  erd.listenTo(document.getElementById('content'), function (element: { offsetWidth: number; offsetHeight: number }) {
    var width = element.offsetWidth;
    var height = element.offsetHeight;
    console.log('Size: ' + width + 'x' + height);
    onResize(width, height);
    // initDraw.getApp().app.resize({ width: width - 60, height: height - 60 });
  });

  // app = new App({
  //   view: 'canvas',
  //   ground: { type: 'draw' },
  //   tree: {},
  //   editor: {
  //     // lockRatio: true,
  //     // resizeable: false
  //   },
  //   sky: { type: 'draw', usePartRender: false },
  // });
  // ruler = new Ruler(app);
  // // 添加自定义主题
  // ruler.addTheme('custom1', {
  //   backgroundColor: '#6cb0ab',
  //   textColor: '#a45454',
  //   borderColor: '#6f4593',
  //   highlightColor: 'rgba(22,93,255,0.75)',
  // });
  // ruler.changeTheme('dark');
  // const box = new Box({
  //   width: 100,
  //   height: 100,
  //   fill: '#FF4B4B',
  //   editable: false,
  //   x: 30,
  //   y: 60,
  // });
  // const frame = new Frame({
  //   width: 600,
  //   height: 400,
  //   // overflow: 'hide',
  //   editable: false,
  //   lockRatio: true,
  // });
  // const rect = new Ellipse({
  //   x: 60,
  //   y: 60,
  //   width: 50,
  //   height: 50,
  //   fill: '#32cd79',
  //   editable: true,
  // });
  // app.tree.add(frame);
  // // app.tree.add(box);
  // frame.add(rect);
});

onUnmounted(() => {
  erd.uninstall(document.getElementById('content'));
});

/**
 * 设置辅助线主题
 * @param theme
 */
// const changeTheme = (theme: any) => {
//   ruler.changeTheme(theme);
// };
// const changeEnabled = () => {
//   ruler.enabled = !ruler.enabled;
// };
</script>

<template>
  <div id="content" class="draw">
    <div class="draw-sidebar">456++</div>
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
