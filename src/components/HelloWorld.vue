<script setup lang="ts">
import { ref, onMounted } from "vue";
import { fabric } from "fabric";

// 这里是画布的宽高，下面要 +40 是因为要给标尺留出空间
let width = 800;
let height = 500;

onMounted(() => {
  /**
   * 1.
   */
  const canvas = new fabric.Canvas("canvas", {
    width: width,
    height: height,
    backgroundColor: "#fff",
  });

  // 创建静态画布
  const staticCanvas = new fabric.StaticCanvas("staticCanvas", {
    width: width + 40,
    height: height + 40,
    backgroundColor: "#ddd",
  });

  /**
   * 2.
   */

  // length 就是标尺的长度，也是画布的宽度
  const length = 800;

  // 创建水平标尺线，top: 19 是因为要给标尺下面的线会有 1px 的偏差
  const rulerLine = new fabric.Line([0, 19, length, 19], {
    top: 19,
    left: 20,
    stroke: "#000",
    selectable: false,
    strokeWidth: 1,
  });
  staticCanvas.add(rulerLine);

  // 创建水平标尺线上的刻度
  for (let i = 0; i < length; i += 10) {
    // p 是刻度的位置，+20 是因为标尺对于画布的偏移
    const p = i + 20;
    const linePoints = [p, 20, p, 15];

    // 判断是否是 100 的倍数，如果是就需要加长刻度，并且显示数字
    const isTen = i % 100 === 0;
    if (isTen) {
      linePoints[3] = 10;
    }

    // 刻度线
    const line = new fabric.Line(linePoints, {
      stroke: "#000",
      selectable: false,
      strokeWidth: 1,
    });

    // 刻度数字
    const text = new fabric.Text(isTen ? i.toString() : "", {
      left: linePoints[0],
      top: 0,
      fontSize: 10,
      selectable: false,
    });
    staticCanvas.add(line, text);
  }

  staticCanvas.renderAll();

  /**
   * 3.
   */
  // 定义两个常量，用于标识标尺的方向
  const HORIZONTAL = "horizontal";
  const VERTICAL = "vertical";

  /**
   * 创建标尺
   * @param length 标尺长度
   * @param direction 标尺方向, 默认水平
   */
  function createRuler(length, direction = HORIZONTAL) {
    // 定义两个方向的标尺线的初始化坐标
    const rulerLinePoints = {
      horizontal: [0, 19, length, 19],
      vertical: [19, 0, 19, length],
    };

    // 创建标尺线
    const rulerLine = new fabric.Line(rulerLinePoints[direction], {
      top: 19,
      left: 19,
      stroke: "#000",
      selectable: false,
      strokeWidth: 1,
    });
    staticCanvas.add(rulerLine);

    // 创建水平标尺线上的刻度
    for (let i = 0; i < length; i += 10) {
      const p = i + 20;
      // 通过判断方向来确认刻度线的坐标
      const linePoints =
        direction === HORIZONTAL ? [p, 20, p, 15] : [20, p, 15, p];
      // 创建刻度
      createScale(linePoints, i, direction);
    }
  }

  /**
   * 创建刻度
   * @param linePoints 刻度线的坐标
   * @param scale 刻度值
   * @param direction 刻度方向
   */
  function createScale(linePoints, scale, direction) {
    const isTen = scale % 100 === 0;
    if (isTen) {
      // 判断方向来修改刻度线的长度
      if (direction === HORIZONTAL) {
        linePoints[3] = 10;
      } else {
        linePoints[2] = 10;
      }
    }
    const line = new fabric.Line(linePoints, {
      stroke: "#000",
      selectable: false,
      strokeWidth: 1,
    });
    const text = new fabric.Text(isTen ? scale.toString() : "", {
      left: direction === HORIZONTAL ? linePoints[0] : 0,
      top: direction === HORIZONTAL ? 0 : linePoints[1],
      fontSize: 10,
      selectable: false,
    });
    staticCanvas.add(line, text);
  }

  // 初始化标尺
  createRuler(width, HORIZONTAL);
  createRuler(height, VERTICAL);

  staticCanvas.renderAll();

  /**
   * 4.
   */
  // 坐标标识线
  const horizontalLine = new fabric.Line([0, 20, 40, 20], {
    stroke: "red",
    selectable: false,
    strokeWidth: 1,
  });
  staticCanvas.add(horizontalLine);

  const verticalLine = new fabric.Line([20, 0, 20, 40], {
    stroke: "red",
    selectable: false,
    strokeWidth: 1,
  });
  staticCanvas.add(verticalLine);

  /**
   * 5. 无需代码-->指向7
   */
  // canvas.on("mouse:move", function ({ e }) {
  //   const { layerX, layerY } = e;
  //   horizontalLine.set({
  //     top: layerY + 20,
  //   });

  //   verticalLine.set({
  //     left: layerX + 20,
  //   });

  //   staticCanvas.renderAll();
  // });

  /**
   * 6.理解代码
   */
  // 鼠标按下，将 isDown 设置为 true
  let isDown = false;
  canvas.on("mouse:down", function () {
    isDown = true;
  });

  // 鼠标抬起，将 isDown 设置为 false
  canvas.on("mouse:up", function (opt) {
    isDown = false;
  });

  canvas.on("mouse:move", function ({ e }) {
    // 只有在按下 alt 键的时候，并且鼠标左键也按下了，才会触发画布的平移
    if (e.altKey === true && isDown === true) {
      // fabric.Point 是一个坐标点的对象，这里用来存储鼠标移动的距离
      const delta = new fabric.Point(e.movementX, e.movementY);
      // 然后调用画布的 relativePan 方法来进行平移
      canvas.relativePan(delta);
    }

    // 这里将标识线更新封装成了一个函数
    markerFollow(e);
  });

  // 添加一个正方形来查看效果
  const rect = new fabric.Rect({
    left: 100,
    top: 100,
    width: 100,
    height: 100,
    fill: "red",
  });
  canvas.add(rect);
  canvas.renderAll();

  /**
   * 7.
   */
  const markerFollow = (e) => {
    const { layerX, layerY } = e;
    horizontalLine.set({
      top: layerY + 20,
    });

    verticalLine.set({
      left: layerX + 20,
    });

    staticCanvas.renderAll();
  };
});
</script>

<template>
  <div id="canvasWrap">
    <canvas id="staticCanvas"></canvas>
    <canvas id="canvas"></canvas>
  </div>
</template>

<style scoped>
html,
body {
  margin: 0;
  padding: 0;
  background: #ddd;
}

#canvasWrap {
  position: relative;
  width: 800px;
  height: 500px;
  padding: 20px;
}

#staticCanvas {
  position: absolute;
  left: 0;
  top: 0;
}
</style>
