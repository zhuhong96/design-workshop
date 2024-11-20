<script setup lang="ts">
import { ref, onMounted } from "vue";
import { fabric } from "fabric";
// import {useResizeObserver} from "@vueuse/core";

// useResizeObserver('',()=>{

// })

onMounted(() => {
  // 这里是画布的宽高，下面要 +40 是因为要给标尺留出空间
  let width = 800;
  let height = 500;

  const canvas = new fabric.Canvas("canvas", {
    width: width,
    height: height,
    backgroundColor: "#fff",
  });

  // 根据缩放比率更新标尺
  let magnificationLevels = [5, 10, 20]; // 标尺的缩放比率，目前只有 5:1，10:1，20:1 三种
  let magnificationLevel = 1; // 标尺的缩放比率的索引，对应的就是 magnificationLevels 的索引
  let magnification = magnificationLevels[magnificationLevel]; // 标尺的缩放比率
  let currScaleMagnification = magnification * 10; // 标尺刻度文字显示的缩放比率
  let perScaleMagnification = magnificationLevels[magnificationLevel - 1] * 10; // 上一个标尺刻度文字显示的缩放比率

  // 创建静态画布
  const staticCanvas = new fabric.StaticCanvas("staticCanvas", {
    width: width + 40,
    height: height + 40,
    backgroundColor: "#ddd",
  });

  // 定义两个常量，用于标识标尺的方向
  const HORIZONTAL = "horizontal";
  const VERTICAL = "vertical";

  /**
   * 创建标尺
   * @param length 标尺长度
   * @param direction 标尺方向, 默认水平
   * @param zoom 标尺缩放比率, 默认 1
   */
  function createRuler(length, direction = HORIZONTAL, zoom = 1) {
    const rulerLinePoints = {
      horizontal: [0, 19, length, 19],
      vertical: [19, 0, 19, length],
    };
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
      const p = i * zoom + 20;
      const linePoints =
        direction === HORIZONTAL ? [p, 20, p, 15] : [20, p, 15, p];
      createScale(linePoints, i, direction);
    }
  }

  /**
   * 创建刻度
   * @param linePoints 刻度线的坐标
   * @param scale 刻度值
   * @param direction 刻度方向
   */
  function createScale(linePoints, scale, direction, magnification = 100) {
    const isTen = scale % magnification === 0;
    if (isTen) {
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
      _attr: {
        class: "ruler-point",
        direction,
        scale: scale,
      },
    });
    const text = new fabric.Text(isTen ? scale.toString() : "", {
      left: direction === HORIZONTAL ? linePoints[0] : 0,
      top: direction === HORIZONTAL ? 0 : linePoints[1],
      fontSize: 10,
      selectable: false,
      _attr: {
        class: "ruler-text",
        direction,
        scale: scale,
      },
    });
    staticCanvas.add(line, text);
  }

  // 初始化标尺
  createRuler(width, HORIZONTAL);
  createRuler(height, VERTICAL);

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

  staticCanvas.renderAll();

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

      moveHorizontally(e);
      moveVertically(e);
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

  // 标识线跟随
  function markerFollow(e) {
    const { layerX, layerY } = e;
    horizontalLine.set({
      top: layerY + 20,
    });

    verticalLine.set({
      left: layerX + 20,
    });

    staticCanvas.renderAll();
  }

  function dataPacket() {
    const horizontalLines = [];
    const horizontalTexts = [];
    const verticalLines = [];
    const verticalTexts = [];
    staticCanvas.getObjects().forEach((item) => {
      if (item._attr) {
        if (item._attr.direction === HORIZONTAL) {
          if (item.type === "line") {
            horizontalLines.push(item);
          } else if (item.type === "text") {
            horizontalTexts.push(item);
          }
        } else if (item._attr.direction === VERTICAL) {
          if (item.type === "line") {
            verticalLines.push(item);
          } else if (item.type === "text") {
            verticalTexts.push(item);
          }
        }
      }
    });

    return {
      horizontalLines: horizontalLines.sort(
        (a, b) => a._attr.scale - b._attr.scale
      ),
      horizontalTexts: horizontalTexts.sort(
        (a, b) => a._attr.scale - b._attr.scale
      ),
      verticalLines: verticalLines.sort(
        (a, b) => a._attr.scale - b._attr.scale
      ),
      verticalTexts: verticalTexts.sort(
        (a, b) => a._attr.scale - b._attr.scale
      ),
    };
  }

  const resetLine = (item, scale, options) => {
    if (item.type !== "line") return;
    item.set({
      ...options,
      _attr: {
        ...item._attr,
        scale,
      },
    });
  };

  const resetText = (item, num, options) => {
    if (item.type !== "text") return;
    const text = num % 100 === 0 ? num.toString() : "";
    item.set({
      ...options,
      text: text,
      _attr: {
        ...item._attr,
        scale: num,
      },
    });
  };

  // 水平移动
  function moveHorizontally(e) {
    const { horizontalLines, horizontalTexts } = dataPacket();
    const horizontal = horizontalLines.map((item) => item._attr.scale);
    let horizontalMin = Math.min(...horizontal);
    let horizontalMax = Math.max(...horizontal);

    const textOffsets = {};
    const leftMove = (line) => {
      const moveX = line.left + e.movementX;
      let scale = line._attr.scale;
      let options = {
        left: line.left + e.movementX,
      };

      if (moveX < 20) {
        scale = horizontalMax = horizontalMax + magnification;
        options = {
          left: width + moveX,
        };
      }

      textOffsets[line._attr.scale] = {
        scale,
        options,
      };
      resetLine(line, scale, options);
    };

    const rightMove = (line) => {
      const moveX = line.left + e.movementX;
      let scale = line._attr.scale;
      let options = {
        left: line.left + e.movementX,
      };

      if (moveX >= width + 20) {
        scale = horizontalMin = horizontalMin - magnification;
        options = {
          left: moveX - width,
        };
      }

      textOffsets[line._attr.scale] = {
        scale,
        options,
      };
      resetLine(line, scale, options);
    };

    let headPointer = 0;
    let tailPointer = horizontalLines.length - 1;
    while (headPointer < tailPointer) {
      const headLine = horizontalLines[headPointer];
      leftMove(headLine);
      headPointer++;

      const tailLine = horizontalLines[tailPointer];
      rightMove(tailLine);
      tailPointer--;
    }

    if (headPointer === tailPointer) {
      const headLine = horizontalLines[headPointer];
      leftMove(headLine);
    }

    for (let i = 0; i < horizontalTexts.length; i++) {
      const text = horizontalTexts[i];
      try {
        const { scale, options } = textOffsets[text._attr.scale];
        resetText(text, scale, options);
      } catch (error) {
        console.log(text._attr.scale, horizontalTexts.length, i);
      }
    }
  }

  // 垂直移动
  function moveVertically(e) {
    const { verticalLines, verticalTexts } = dataPacket();
    const vertical = verticalLines.map((item) => item._attr.scale);
    let verticalMin = Math.min(...vertical);
    let verticalMax = Math.max(...vertical);

    const verticalTextOffsets = {};
    const topMove = (line) => {
      const moveY = line.top + e.movementY;
      let scale = line._attr.scale;
      let options = {
        top: line.top + e.movementY,
      };
      if (moveY < 20) {
        scale = verticalMax = verticalMax + magnification;
        options = {
          top: height + moveY,
        };
      }

      verticalTextOffsets[line._attr.scale] = {
        scale,
        options,
      };
      resetLine(line, scale, options);
    };

    const bottomMove = (line) => {
      const moveY = line.top + e.movementY;
      let scale = line._attr.scale;
      let options = {
        top: line.top + e.movementY,
      };
      if (moveY > height + 20) {
        scale = verticalMin = verticalMin - magnification;
        options = {
          top: moveY - height,
        };
      }

      verticalTextOffsets[line._attr.scale] = {
        scale,
        options,
      };
      resetLine(line, scale, options);
    };

    let headPointer = 0;
    let tailPointer = verticalLines.length - 1;
    while (headPointer < tailPointer) {
      const headLine = verticalLines[headPointer];
      topMove(headLine);
      headPointer++;

      const tailLine = verticalLines[tailPointer];
      bottomMove(tailLine);
      tailPointer--;
    }
    if (headPointer === tailPointer) {
      const headLine = verticalLines[headPointer];
      topMove(headLine);
    }

    for (let i = 0; i < verticalTexts.length; i++) {
      const text = verticalTexts[i];
      const data = verticalTextOffsets[text._attr.scale];
      if (!data) {
        staticCanvas.getObjects().forEach((item) => {
          if (item._attr && item._attr.scale === text._attr.scale) {
            item.set({
              stroke: "red",
            });
          }
        });
        continue;
      }
      const { scale, options } = verticalTextOffsets[text._attr.scale];
      resetText(text, scale, options);
    }
  }

  canvas.on("mouse:wheel", function (opt) {
    let delta = opt.e.deltaY;
    let zoom = canvas.getZoom();
    let perZoom = zoom;
    zoom += -0.001 * delta;
    zoom = zoom.toFixed(2) * 1;

    if (zoom > 5) zoom = 5;
    if (zoom < 0.5) zoom = 0.5;
    canvas.zoomToPoint(
      {
        x: opt.e.offsetX,
        y: opt.e.offsetY,
      },
      zoom
    );

    opt.e.preventDefault();
    opt.e.stopPropagation();

    updateRuler(zoom, perZoom);
  });

  function updateRuler(zoom, perZoom) {
    // 到达一定的缩放比例，修改标尺的刻度比率
    if (2.1 > zoom && zoom > 1.9) {
      computedMagnificationLevel(0);
    } else if (1.1 > zoom && zoom > 0.9) {
      computedMagnificationLevel(1);
    } else if (0.51 > zoom && zoom > 0.49) {
      computedMagnificationLevel(2);
    }

    // 计算缩放等级
    function computedMagnificationLevel(level) {
      const resetScale = (lines, direction = HORIZONTAL) => {
        const getOptions = {
          horizontal: (item) => {
            return {
              x1: item.left,
              x2: item.left,
              y1: 20,
              y2: 15,
            };
          },
          vertical: (item) => {
            return {
              x1: 20,
              x2: 15,
              y1: item.top,
              y2: item.top,
            };
          },
        };

        for (let i = 0; i < lines.length; i++) {
          const item = lines[i];
          if (
            item._attr.scale % currScaleMagnification !== 0 &&
            item._attr.scale % perScaleMagnification === 0
          ) {
            const options = getOptions[direction](item);
            options && item.set(options);
          }
        }
      };

      const hideText = (text) => {
        if (text._attr.scale % currScaleMagnification !== 0) {
          text.set({ text: "" });
        } else {
          text.set({ text: text._attr.scale.toString() });
        }
      };

      const shrink = () => {
        let objects = staticCanvas.getObjects();
        if (!perScaleMagnification) return;

        staticCanvas.remove(
          ...objects.filter((item) => {
            if (item._attr && item._attr.scale % magnification !== 0) {
              return true;
            }
          })
        );

        const {
          horizontalLines,
          horizontalTexts,
          verticalLines,
          verticalTexts,
        } = dataPacket();
        horizontalLines.sort((a, b) => a._attr.scale - b._attr.scale);
        verticalLines.sort((a, b) => a._attr.scale - b._attr.scale);

        resetScale(horizontalLines, HORIZONTAL);
        resetScale(verticalLines, VERTICAL);

        [].concat(horizontalTexts, verticalTexts).forEach((item) => {
          if (item._attr.scale % perScaleMagnification === 0) {
            hideText(item);
          }
        });
      };

      const resetAndCreateScale = (lines, direction = HORIZONTAL) => {
        const getLinePoint = {
          horizontal: (item) => {
            return [
              item.left + magnification * zoom,
              20,
              item.left + magnification * zoom,
              15,
            ];
          },
          vertical: (item) => {
            return [
              20,
              item.top + magnification * zoom,
              15,
              item.top + magnification * zoom,
            ];
          },
        };

        const getOptions = {
          horizontal: (item) => {
            return {
              x1: item.left,
              x2: item.left,
              y1: 20,
              y2: 10,
            };
          },
          vertical: (item) => {
            return {
              x1: 20,
              x2: 10,
              y1: item.top,
              y2: item.top,
            };
          },
        };

        for (let i = 0; i < lines.length; i++) {
          const item = lines[i];
          const linePoints = getLinePoint[direction](item);
          createScale(
            linePoints,
            item._attr.scale + magnification,
            direction,
            currScaleMagnification
          );

          if (item._attr.scale % currScaleMagnification === 0) {
            const options = getOptions[direction](item);
            options && item.set(options);
          }
        }
      };

      const magnify = () => {
        const {
          horizontalLines,
          horizontalTexts,
          verticalLines,
          verticalTexts,
        } = dataPacket();
        resetAndCreateScale(horizontalLines, HORIZONTAL);
        resetAndCreateScale(verticalLines, VERTICAL);
        [].concat(horizontalTexts, verticalTexts).forEach(hideText);
      };

      perScaleMagnification = currScaleMagnification;
      const perLevel = magnificationLevel;

      magnificationLevel = level;
      magnification = magnificationLevels[magnificationLevel];
      currScaleMagnification = magnification * 10;

      if (perLevel < level) {
        shrink();
      } else if (perLevel > level) {
        magnify();
      }
    }

    // 根据缩放比例，调整标尺
    const objects = staticCanvas.getObjects();
    const length = objects.length;
    const zoomOriginX = verticalLine.left;
    const zoomOriginY = horizontalLine.top;

    for (let i = 0; i < length; i++) {
      const item = objects[i];
      if (!item._attr) continue;

      const { direction } = item._attr;
      if (direction === HORIZONTAL) {
        const perLeft = (item.left - zoomOriginX) / perZoom + zoomOriginX;
        const left = (perLeft - zoomOriginX) * zoom + zoomOriginX;
        if (left < 20) {
          staticCanvas.remove(item);
        } else if (left > staticCanvas.width - 20) {
          staticCanvas.remove(item);
        } else {
          item.set({
            left: left,
          });
        }

        continue;
      }

      if (direction === VERTICAL) {
        const perTop = (item.top - zoomOriginY) / perZoom + zoomOriginY;
        const top = (perTop - zoomOriginY) * zoom + zoomOriginY;
        if (top < 20) {
          staticCanvas.remove(item);
        } else if (top > staticCanvas.height - 20) {
          staticCanvas.remove(item);
        } else {
          item.set({
            top: top,
          });
        }
      }
    }

    // 找到最小的刻度
    const { horizontal, vertical } = staticCanvas.getObjects().reduce(
      (prev, curr) => {
        if (curr._attr) {
          if (curr._attr.direction === HORIZONTAL) {
            if (prev.horizontal.minLeft == null) {
              prev.horizontal.minLeft = curr.left;
              prev.horizontal.maxLeft = curr.left;
              prev.horizontal.minScale = curr._attr.scale;
              prev.horizontal.maxScale = curr._attr.scale;
            }

            if (curr.left < prev.horizontal.minLeft) {
              prev.horizontal.minLeft = curr.left;
              prev.horizontal.minScale = curr._attr.scale;
            }

            if (curr.left > prev.horizontal.maxLeft) {
              prev.horizontal.maxLeft = curr.left;
              prev.horizontal.maxScale = curr._attr.scale;
            }
          }

          if (curr._attr.direction === VERTICAL) {
            if (prev.vertical.minTop == null) {
              prev.vertical.minTop = curr.top;
              prev.vertical.maxTop = curr.top;
              prev.vertical.minScale = curr._attr.scale;
              prev.vertical.maxScale = curr._attr.scale;
            }

            if (curr.top < prev.vertical.minTop) {
              prev.vertical.minTop = curr.top;
              prev.vertical.minScale = curr._attr.scale;
            }

            if (curr.top > prev.vertical.maxTop) {
              prev.vertical.maxTop = curr.top;
              prev.vertical.maxScale = curr._attr.scale;
            }
          }
        }

        return prev;
      },
      {
        horizontal: {
          minLeft: null,
          maxLeft: null,
          minScale: null,
          maxScale: null,
        },
        vertical: {
          minTop: null,
          maxTop: null,
          minScale: null,
          maxScale: null,
        },
      }
    );

    while (
      (horizontal.minLeft = horizontal.minLeft - magnification * zoom) > 20
    ) {
      horizontal.minScale = horizontal.minScale - magnification;
      createScale(
        [horizontal.minLeft, 20, horizontal.minLeft, 15],
        horizontal.minScale,
        HORIZONTAL,
        currScaleMagnification
      );
    }

    while (
      (horizontal.maxLeft = horizontal.maxLeft + magnification * zoom) <
      staticCanvas.width - 20
    ) {
      horizontal.maxScale = horizontal.maxScale + magnification;
      createScale(
        [horizontal.maxLeft, 20, horizontal.maxLeft, 15],
        horizontal.maxScale,
        HORIZONTAL,
        currScaleMagnification
      );
    }

    while ((vertical.minTop = vertical.minTop - magnification * zoom) > 20) {
      vertical.minScale = vertical.minScale - magnification;
      createScale(
        [20, vertical.minTop, 15, vertical.minTop],
        vertical.minScale,
        VERTICAL,
        currScaleMagnification
      );
    }

    while (
      (vertical.maxTop = vertical.maxTop + magnification * zoom) <
      staticCanvas.height - 20
    ) {
      vertical.maxScale = vertical.maxScale + magnification;
      createScale(
        [20, vertical.maxTop, 15, vertical.maxTop],
        vertical.maxScale,
        VERTICAL,
        currScaleMagnification
      );
    }

    staticCanvas.renderAll();
  }
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
