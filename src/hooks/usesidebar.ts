import { App, Text, Box, Rect, Image } from 'leafer-ui';
import { IFrame } from '@leafer-ui/interface';
import { ref } from 'vue';

export default function useSidebar(workspace: IFrame) {
  const workspaceFrame = ref<IFrame>(workspace);

  // 创建矩形
  const createRect = (app?: App) => {
    const rect = new Rect({
      width: 300,
      height: 300,
      editable: true,
      fill: 'rgb(50,205,121)',
    });
    workspaceFrame.value.add(rect);
  };
  // 创建文字
  const createText = (app?: App) => {
    const text = new Text({
      fill: 'rgb(50,205,121)',
      text: 'Welcome to LeaferJS',
      editable: true,
      fontSize: 30,
    });
    workspaceFrame.value.add(text);
  };

  // 创建图片
  const createImage = (app?: App) => {
    const image = new Image({
      url: new URL('../assets/sidebar/icon-tupian.png', import.meta.url).href,
      draggable: true,
      editable: true,
    });
    workspaceFrame.value.add(image);
  };

  return {
    createRect,
    createText,
    createImage,
  };
}
