import { App, Text, Box, Rect } from 'leafer-ui';
import { IFrame } from '@leafer-ui/interface';

export default function useSidebar(workspace: IFrame) {
  const createRect = (app?: App) => {
    // 创建矩形
    const rect = new Rect({
      width: 300,
      height: 300,
      editable: true,
      fill: 'rgb(50,205,121)',
    });
    workspace.add(rect);
  };
  // 创建文字
  const createText = (app?: App) => {
    const text = new Text({
      fill: 'rgb(50,205,121)',
      text: 'Welcome to LeaferJS',
      editable: true,
      fontSize: 30,
    });
    workspace.add(text);
  };

  return {
    createRect,
    createText,
  };
}
