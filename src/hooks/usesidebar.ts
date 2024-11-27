import { Text, Rect, Image } from 'leafer-ui';
import useWorkspace from '@/hooks/useworkspace';
const { workspace } = useWorkspace();

export default function useSidebar() {
  // 创建矩形
  const createRect = () => {
    if (!workspace?.value) return;
    const rect = new Rect({
      width: 300,
      height: 300,
      editable: true,
      fill: 'rgb(50,205,121)',
    });
    workspace?.value.add(rect);
  };

  // 创建文字
  const createText = () => {
    if (!workspace?.value) return;
    const text = new Text({
      fill: 'rgb(50,205,121)',
      text: 'Welcome to LeaferJS',
      editable: true,
      fontSize: 30,
    });
    workspace.value.add(text);
  };

  // 创建图片
  const createImage = () => {
    if (!workspace?.value) return;
    const image = new Image({
      url: new URL('../assets/sidebar/icon-tupian.png', import.meta.url).href,
      draggable: true,
      editable: true,
    });
    workspace.value.add(image);
  };

  return {
    createRect,
    createText,
    createImage,
  };
}
