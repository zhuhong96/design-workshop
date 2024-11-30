import { Text, Rect, Image, Ellipse, Line } from 'leafer-ui';
import rectAttribute, { IRectAttribute } from '@/attribute/rect';
import ellipseAttribute, { IEllipseAttribute } from '@/attribute/ellipse';
import { randomColor } from '@/utils/color';
import useWorkspace from '@/hooks/useworkspace';
const { workspace, getElementXY } = useWorkspace();

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
    rect.move(getElementXY(rect));
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
    ellipse.move(getElementXY(ellipse));
  };

  // 创建文字
  const createText = () => {
    if (!workspace?.value) return;
    const text = new Text({
      editable: true,
      fill: 'rgb(50,205,121)',
      text: '吉云设计',
      fontSize: 30,
    });
    workspace.value.add(text);
    text.move(getElementXY(text));
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

  // 创建线
  const createLine = () => {
    if (!workspace?.value) return;
    const line = new Line({
      editable: true,
      width: 100,
      rotation: 45,
      strokeWidth: 5,
      cornerRadius: 30,
      stroke: randomColor(),
    });
    workspace.value.add(line);
    line.move(getElementXY(line));
  };

  return {
    createRect,
    createText,
    createImage,
    createEllipse,
    createLine,
  };
}
