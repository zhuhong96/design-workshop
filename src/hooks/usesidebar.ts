import { Text, Rect, Image, Ellipse } from 'leafer-ui';
import rectAttribute, { IRectAttribute } from '@/attribute/rect';
import ellipseAttribute, { IEllipseAttribute } from '@/attribute/ellipse';
import { randomColor } from '@/utils/color';
import useWorkspace from '@/hooks/useworkspace';
const { workspace } = useWorkspace();

export default function useSidebar() {
  // 创建矩形
  const createRect = (type: IRectAttribute) => {
    if (!workspace?.value) return;
    const rect = new Rect({
      editable: true,
      fill: randomColor(),
      ...rectAttribute[type],
    });
    workspace?.value.add(rect);
  };

  // 创建椭圆
  const createEllipse = (type: IEllipseAttribute) => {
    if (!workspace?.value) return;
    const ellipse = new Ellipse({
      editable: true,
      fill: randomColor(),
      width: 200,
      height: 200,
      ...ellipseAttribute[type],
    });

    workspace?.value.add(ellipse);
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
    createEllipse,
  };
}
