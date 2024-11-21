<script setup lang="ts">
import { App, Rect, Text, Canvas, Line, RenderEvent, Leafer, Frame, Ellipse, Box } from 'leafer-ui';
import '@leafer-in/editor';
import { Ruler } from 'leafer-x-ruler';
import { computed, onMounted, onUnmounted, ref } from 'vue';
// import { Canvas, Line } from '@leafer-ui/core'

let app;
let ruler: any;

// 生成随机颜色
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
let timer = null;
const fps = ref(0);
// https://github.com/LvHuaiSheng/leafer-x-ruler
// https://www.leaferjs.com/
onMounted(() => {
  app = new App({
    view: 'canvas',
    ground: { type: 'draw' },
    tree: {},
    editor: {
      // lockRatio: true,
      // resizeable: false
    },
    sky: { type: 'draw', usePartRender: false },
  });
  ruler = new Ruler(app);
  // 添加自定义主题
  ruler.addTheme('custom1', {
    backgroundColor: '#6cb0ab',
    textColor: '#a45454',
    borderColor: '#6f4593',
    highlightColor: 'rgba(22,93,255,0.75)',
  });

  ruler.changeTheme('dark');

  const box = new Box({
    width: 100,
    height: 100,
    fill: '#FF4B4B',
    editable: false,
    x: 30,
    y: 60,
  });

  const frame = new Frame({
    width: 600,
    height: 400,
    // overflow: 'hide',
    editable: false,
    lockRatio: true,
  });

  const rect = new Ellipse({
    x: 60,
    y: 60,
    width: 50,
    height: 50,
    fill: '#32cd79',
    editable: true,
  });

  app.tree.add(frame);
  // app.tree.add(box);
  frame.add(rect);

  // for (let i = 0; i < 5; i++) {
  //   const randomNumber = Math.random() * (300 - 50) + 50;
  //   const rect = new Rect({
  //     x: randomNumber,
  //     y: randomNumber,
  //     width: randomNumber,
  //     height: randomNumber,
  //     fill: getRandomColor(),
  //     editable: true,
  //   });
  //   app.tree.add(rect);
  // }
  // timer = setInterval(() => {
  //   fps.value = app.FPS
  // },500)

  let width = 800;
  let height = 500;

  // const canvas = new fabric.Canvas("canvas", {
  //   width: width,
  //   height: height,
  //   backgroundColor: "pink",
  // });
});
onUnmounted(() => {
  // clearInterval(timer);
});

/**
 * 设置辅助线主题
 * @param theme
 */
const changeTheme = (theme: any) => {
  ruler.changeTheme(theme);
};
const changeEnabled = () => {
  ruler.enabled = !ruler.enabled;
};
</script>

<template>
  <div class="content">
    <div class="btn-box">
      <button class="btn" @click="changeEnabled()">启用/禁用</button>
      <button class="btn" @click="changeTheme('light')">明亮主题</button>
      <button class="btn" @click="changeTheme('dark')">暗黑主题</button>
      <div>
        <button class="btn" @click="changeTheme('custom1')">自定义主题1</button>
      </div>
      <div>
        <span>FPS：{{ fps }}</span>
      </div>
    </div>
    <div id="canvasWrap">
      <div id="canvasRef"></div>
      <canvas id="canvas"></canvas>
    </div>
  </div>
</template>

<style scoped>
.content {
  width: 100vw;
  height: 100vh;
}

.btn-box {
  height: 30px;
  display: flex;
  /* align-items: center; 纵向居中 */
  /* justify-content: center; 横向居中 */
}

#canvasWrap {
  position: relative;
  width: 800px;
  height: 500px;
  padding: 20px;
  background-color: #000;
}

#canvasRef {
  position: absolute;
  left: 0;
  top: 0;
  width: 800px;
  height: 500px;
}

#canvas {
  position: absolute;
  top: 0;
  left: 0;
}

.btn-box > :nth-child(n + 2) {
  margin-left: 10px;
}
</style>
